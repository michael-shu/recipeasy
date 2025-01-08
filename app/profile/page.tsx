import { redirect } from 'next/navigation';
import { createClient } from "@/utils/supabase/server";
import Profile from './Profile';
import Recipes from './Recipes';
import { User } from '@supabase/auth-js'; // Import Supabase's User type
import { recipe } from '@/utils/global.types';

type GetUserResult = {
  user?: User;
  recipes?: recipe[];
  error?: string;
};

const getUser = async (): Promise<GetUserResult> => {
  // Create Supabase client
  const supabase = await createClient();

  // Fetch the user data
  const { data: userData, error: userError } = await supabase.auth.getUser();

  // Redirect to sign-in if the user is not authenticated
  if (userError || !userData?.user) {
    redirect('/sign-in');
    return { error: 'User not authenticated' };
  }

  console.log(userData);


  const user = userData.user;

  // Fetch the recipe IDs associated with the user
  const { data: recipeIdData, error: recipeIdError } = await supabase
    .from('users-to-recipes')
    .select('recipe_id')
    .eq('user_id', user.id);

  if (recipeIdError) {
    console.error('Error fetching recipe IDs:', recipeIdError);
    return { error: 'Error fetching recipe IDs' };
  }

  const recipeIds = recipeIdData?.map(item => item.recipe_id) || [];

  // Fetch the recipes by IDs
  const { data: recipes, error: recipeError } = await supabase
    .from('recipes')
    .select('*')
    .in('id', recipeIds);

  if (recipeError) {
    console.error('Error fetching recipes:', recipeError);
    return { error: 'Error fetching recipes' };
  }

  return { user, recipes };
};

export default async function PrivatePage() {

  const data = await getUser();

  if (data.user === undefined) {
    return <div>There was an error fetching your data</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      {/* User Profile Section */}
      {data.user.email ? (
        <Profile email={data.user.email} />
      ) : (
        <div>Error: Email is missing for the user.</div>
      )}

      {data.recipes ? (
        <Recipes user_id={data.user.id} recipes={data.recipes} />
      ) : (
        <div>Error: Email is missing for the user.</div>
      )}
    </div>
  );
}
