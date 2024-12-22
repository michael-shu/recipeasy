import React from 'react';
import Form from '../../components/Form';
import * as fs from 'fs';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const file = fs.readFileSync(process.cwd() + '/app/food.json', 'utf8');
const data = JSON.parse(file);

const Page = async () => {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <Form ingredients={data.ingredients} cuisines={data.cuisines}/>
  );
};

export default Page;