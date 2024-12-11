// pages/api/chatgpt
export const GET = async () => {
    
}
/*
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export interface Data {
  state?: string
  access_token?: string
  expires_in: Date
  refresh_token?: string
}


export const GET = async (req :NextRequest, res:NextResponse) => {

    const openai = new OpenAI({
        organization: process.env.ORG_ID,
        project: process.env.PROJ_ID,
    });

    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Say this is a test" }],
        stream: true,
    });

    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }

    res.json();

}*/