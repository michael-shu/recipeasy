'use client';
import React, { useState } from 'react';
import { recipe } from '@/utils/global.types';
import { createClient } from '@/utils/supabase/client';

const Recipes = ({ recipes, user_id }: { recipes: recipe[], user_id: string }) => {

  const [recipeState, setRecipeState] = useState(recipes);

  const handleRemove = async (recipe_id: number, index: number) => {

    setRecipeState(recipeState.splice(index, 1));

    const supabase = createClient();

    const { error } = await supabase
      .from('users-to-recipes')
      .delete()
      .eq('user_id', user_id)
      .eq('recipe_id', recipe_id);
    if (error) {
      throw new Error(error.message);
    }
}

return (
  <div className="w-full m-10 p-10 bg-white rounded-lg shadow-md">
    <h2 className="text-xl font-bold text-gray-700 mb-4">Your Recipes</h2>
    {recipes && recipes.length > 0 ? (
      <ul className="space-y-4">
        {recipes.map((recipe, index) => (
           <li
           key={index}
           className="p-6 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6 hover:shadow-lg transition-shadow duration-300"
         >
           <div className="flex-grow">
             <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
             <p className="text-gray-700 text-sm mb-4">{recipe.description}</p>
             <a
               href={recipe.url}
               target="_blank"
               rel="noopener noreferrer"
               className="text-indigo-600 font-semibold hover:underline"
             >
               View Webpage
             </a>
           </div>
           <button
             onClick={() => handleRemove(recipe.id, index)}
             className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400"
           >
             Remove Recipe
           </button>
         </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">Go save some recipes!</p>
    )}
  </div>
)
}

export default Recipes