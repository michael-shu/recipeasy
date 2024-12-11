import React from 'react';
import Form from '../components/Form';
import * as fs from 'fs';


const file = fs.readFileSync(process.cwd() + '/app/food.json', 'utf8');
const data = JSON.parse(file);

const Page = () => {

  return (
    <Form ingredients={data.ingredients} cuisines={data.cuisines}/>
  );
};

export default Page;