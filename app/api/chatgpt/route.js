// pages/api/chatgpt
export const maxDuration = 60;
import {NextResponse } from 'next/server';
import OpenAI from 'openai';

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const client = new OpenAI({
    organization: process.env.ORG_ID,
    project: process.env.PROJ_ID,
});

// Function to perform a Tavily search
const tavilySearch = async (query) => {
    try {
        //console.log(query);
        const response = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: TAVILY_API_KEY,
                query,
                search_depth: 'basic',
                include_answer: false,
                include_images: false,
                include_image_descriptions: false,
                include_raw_content: false,
                max_results: 5,
            })
        });

        const data = await response.json();
        //console.info(data);
        return data.results;
    } catch (error) {
        console.error('Tavily search error:', error);
        return null;
    }
};

const getHtml = async (url) => {

}

// Function to wait for a run to complete
async function waitForRunCompletion(threadId, runId) {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const run = await client.beta.threads.runs.retrieve(threadId, runId);
        //console.log(`Current run status: ${run.status}`);
        if (['completed', 'failed', 'requires_action'].includes(run.status)) {
            return run;
        }
    }
}

// Function to handle tool output submission
async function submitToolOutputs(threadId, runId, toolsToCall) {
    const toolOutputArray = [];
    for (const tool of toolsToCall) {
        let output = null;
        const toolCallId = tool.id;
        const functionName = tool.function.name;
        const functionArgs = JSON.parse(tool.function.arguments);

        if (functionName === "tavily_search") {
            const search = await tavilySearch(functionArgs.query);
            output = JSON.stringify(search);
        }

        if (output) {
            toolOutputArray.push({ tool_call_id: toolCallId, output });
        }
    }

    return await client.beta.threads.runs.submitToolOutputs(
        threadId,
        runId, {
        tool_outputs: toolOutputArray
    }
    );
}

// Function to return messages from a thread
async function returnMessagesFromThread(threadId) {
    const messagesList = await client.beta.threads.messages.list(threadId);
    const most_recent_message = messagesList.body.data[0];

    //console.info("this is the most recent message deconstructed: ", most_recent_message.content[0].text.value);
    let mostRecentMessageText = '';
    if (most_recent_message && Array.isArray(most_recent_message.content)) {
        mostRecentMessageText = most_recent_message.content
            .map(contentPart => contentPart.text?.value || '') // Extract `value` or fallback to empty string
            .join(' '); // Combine parts into a single string, if needed
    }

    //console.info("Most recent message:", mostRecentMessageText);
    return mostRecentMessageText;
}

export const POST = async (req) => {

    const body = await req.json();

    const ingredients = body.ingredients;
    const cuisines = body.cuisines;

    if (ingredients === undefined || cuisines === undefined) {
        return NextResponse.json({ error: "Ingredients/Cuisines must have at least one item" }, { status: 400 });
    }
    console.log(ingredients);
    console.log(cuisines);

    const message = "Ingredients:" + ingredients + " cuisines: " + cuisines +  " Give me 5 pages, with urls, titles and descriptions, wrapped in json";

    const assistantPromptInstruction = `You are a culinary assistant designed to help users discover recipes. The user will provide two 
        types of input: a list of ingredients they have and the type of cuisine they desire. 
        Based on this input, generate a list of 5 recipes that match their preferences.
        Each recipe should include the following details:
        Title: A catchy and descriptive name for the recipe.
        Description: A brief summary highlighting the dish's appeal or key flavors.
        URL: A link to a detailed recipe from a credible online source.
        Your output should be a list formatted as a JSON object with the following structure:

        A "recipes" key containing an array of recipe objects.
        Each recipe object includes "title", "description", and "url" fields.
        For example:

        If the user inputs:
        Ingredients: "chicken, garlic, and lemon"
        Cuisine: "Mediterranean"
        You might suggest recipes like:

        Title: "Lemon Garlic Chicken with Fresh Herbs"
        Description: "A zesty and aromatic chicken dish perfect for a Mediterranean-inspired dinner."
        URL: "https://example.com/lemon-garlic-chicken"

        Title: "Mediterranean Lemon Chicken Salad"
        Description: "A light and refreshing salad combining chicken, lemon, and garlic with crisp greens."
        URL: "https://example.com/mediterranean-chicken-salad"

        Focus on variety, relevance, and quality in your suggestions. Make sure each recipe aligns well with the input provided by the user.
        You must use the provided Tavily search API function to find relevant online information. 
        You should never use your own knowledge to answer questions.
        Please include relevant URL sources at the end of your answers.`;

    const assistant = await client.beta.assistants.create({
        name: "Recipe Distributor",
        instructions: assistantPromptInstruction,
        tools: [
            { "type": "function",
                "function": {
                    "name": "getHtml",
                    "description": "Pull html from a website for getting directions",
                    "paramters": {
                        
                    }
                }

             },
            {
                "type": "function",
                "function": {
                    "name": "tavily_search",
                    "description": "Get information on recent events from the web.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "query": { 
                                "type": "string", 
                                "description": "The search query to use. For example: 'Latest news on Nvidia stock performance'" },
                        },
                        "required": ["query"]
                    }
                }
            }
        ],
        model: "gpt-4o",
    });

    const assistantId = assistant.id;
    console.log(`Assistant ID: ${assistantId}`);

    // Create a thread
    const thread = await client.beta.threads.create();
    console.log(`Thread: ${JSON.stringify(thread)}`);

        // Ongoing conversation loop
        while (true) {
            //const userInput = require('readline-sync').question('You: ');
            //if (userInput.toLowerCase() === 'exit') break;
            try{    
            // Create a message
            await client.beta.threads.messages.create(
                thread.id,
                {
                    role: "user",
                    content: message
                }
            );
    
            // Create a run
            const run = await client.beta.threads.runs.create(
                thread.id,
                {
                    assistant_id: assistantId
                }
            );
            console.log(`Run ID: ${run.id}`);
    
            // Wait for run to complete
            const completedRun = await waitForRunCompletion(thread.id, run.id);
            //console.info("completed run", completedRun)
    
            if (completedRun.status === 'failed') {
                console.error(completedRun.error);
                continue;
            } else if (completedRun.status === 'requires_action') {
                console.info("These are the tool calls required I think", completedRun.required_action.submit_tool_outputs.tool_calls);
                await submitToolOutputs(thread.id, completedRun.id, completedRun.required_action.submit_tool_outputs.tool_calls);
                console.info("ok, we just finished submitting tool output I think");
                await waitForRunCompletion(thread.id, completedRun.id);
            }
        } catch (e) {
            return NextResponse.json({ error: e }, { status: 408 });
        }
    
        // Print messages from the thread
        const response = await returnMessagesFromThread(thread.id);
        console.log("this is response, ", response);
        return NextResponse.json(response);
    } 
}