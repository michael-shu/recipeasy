import React from 'react';

type recipe = {
  title: string,
  description: string,
  url: string,
  directions: string
};

const Recipes = ({recipes} : {recipes: recipe[]}) => {
  return (
    <div className="w-full m-10 p-10 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Saved Recipes</h2>
        {recipes && recipes.length > 0 ? (
          <ul className="space-y-4">
            {recipes.map((recipe, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">{recipe.title}</h3>
                <p className="text-gray-600">{recipe.description}</p>
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:underline"
                >
                  View Recipe
                </a>
                <button>Remove Recipe</button>
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