'use client';
import { useState } from "react";
//import Ingredients from './Ingredients';
//import Cuisines from './Cuisines';
import React from 'react';
import FormSection from './FormSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading';

type recipe = {
  title: string,
  description: string,
  url: string
};

const Form = ({ ingredients, cuisines }: { ingredients: string[], cuisines: string[] }) => {

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [recipes, setRecipes] = useState<recipe[]>([]);

  const handleSubmit = async () => {

    if (selectedIngredients.length === 0 || selectedCuisines.length === 0) {
      toast.warn('Please select and save at least one Cuisine and Ingredient', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setSubmitted(true);
    setLoading(true);
    //needed since this is client side

    const url = "https://recipeasy-zeta.vercel.app/";

    const res = await fetch(url + "api/chatgpt",
      {
        method: "POST",
        body: JSON.stringify({ "ingredients": selectedIngredients, "cuisines": selectedCuisines })
      }
    );

    const data = await res.json();

    const jsonMatch = data.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      const jsonString = jsonMatch[1]; // Captures the JSON between the ```json markers

      // Parse the JSON string into an object
      const jsonObject = JSON.parse(jsonString);

      // Separate text and JSON object
      //console.log('JSON Object:', jsonObject); // Parsed JSON object

      setRecipes(jsonObject.recipes);
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col items-center justify-center text-center bg-gray-100">
      <div className="shadow-lg rounded-lg p-6 w-full max-w-6xl">

        {!submitted &&
          <div className="mb-4 space-y-4">
            {/*step === 0 && <Ingredients ingredients={ingredients} setIngredients={setSelectedIngredients}/>*/}
            <FormSection name={"ingredient"} setItems={setSelectedIngredients} items={ingredients} />
            {/*step === 1 && <Cuisines cuisines={cuisines} setCuisines={setSelectedCuisines}/>*/}
            <FormSection name={"cuisine"} setItems={setSelectedCuisines} items={cuisines} />

            <ToastContainer
            />
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-slate-600
              text-white font-bold rounded-lg shadow-lg
              hover:scale-105
               transition-transform transform active:scale-95 focus:outline-none
                focus:ring-4 focus:ring-gray-700"
            >
              Let&apos;s find some recipes!
            </button>

          </div>
        }

        {submitted &&
          <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-5xl mx-auto px-4">
              <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Delicious Recipes</h1>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                {recipes.map((recipe, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">{recipe.title}</h2>
                      <p className="text-gray-700 mb-4">{recipe.description}</p>
                      <a
                        href={recipe.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        Visit webpage
                      </a>
                    </div>
                    <div className="mt-6 flex gap-2">
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
                        Save to profile
                      </button>
                      <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                        View steps
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );


};

export default Form;