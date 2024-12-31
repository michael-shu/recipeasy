import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function PrivatePage() {

  const gatherData = async () => {
    // Create Supabase client
    const supabase = await createClient();

    // Fetch the user data
    const { data: userData, error: userError } = await supabase.auth.getUser();

    // Redirect to sign-in if the user is not authenticated
    if (userError || !userData?.user) {
      redirect('/sign-in');
    }

    const user = userData.user;

    // Fetch the recipe IDs associated with the user
    const { data: recipeIdData, error: recipeIdError } = await supabase
      .from('users-to-recipes')
      .select('recipe_id')
      .eq('user_id', user.id);

    if (recipeIdError) {
      console.error('Error fetching recipe IDs:', recipeIdError);
      return <div>Error loading recipes.</div>;
    }

    const recipeIds = recipeIdData?.map(item => item.recipe_id) || [];

    // Fetch the recipes by IDs
    const { data: recipes, error: recipeError } = await supabase
      .from('recipes')
      .select('*')
      .in('id', recipeIds);

    if (recipeError) {
      console.error('Error fetching recipes:', recipeError);
      return <div>Error loading recipes.</div>;
    }

    return {user: user, recipes: recipes};
  }

  const data = await gatherData();
  const user = data.user;
  const recipes = data.recipes;


  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      {/* User Profile Section */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <h1 className="mt-4 text-2xl font-bold text-gray-700">Welcome,</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Username:</span>
            <span className="text-gray-800">{user?.email.split('@')[0]}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Joined:</span>
            <span className="text-gray-800">{user?.created_at || 'Unknown'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Status:</span>
            <span className="text-green-600 font-semibold">Active</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      {/* Saved Recipes Section */}
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
                <button onClick={() => removeRecipe(recipe)}>Remove Recipe</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Go save some recipes!</p>
        )}
      </div>
    </div>
  );
}
