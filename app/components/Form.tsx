'use client';
import { useState } from "react";
//import Ingredients from './Ingredients';
//import Cuisines from './Cuisines';
import React from 'react';
import FormSection from './FormSection';

const Form = ({ ingredients, cuisines }: { ingredients: string[], cuisines: string[] }) => {

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(step + 1);
  };
  const handleBack = () => {
    setStep(step - 1);
  };
  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
  };
  const handleRemoveCuisine = (cuisine: string) => {
    setSelectedCuisines(selectedCuisines.filter((item) => item !== cuisine));
  };
  const handleSubmit = () => {
    console.log(selectedIngredients);
    console.log(selectedCuisines);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-blue-300 shadow-lg rounded-lg p-6 w-full max-w-6xl">
        <h1 className="flex justify-between text-2xl font-bold text-black text-center mb-4">
        <button
            onClick={handleBack}
            disabled={step === 0}
            className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md transition-colors ${
              step === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Back
          </button>
          
          {(step === 0) && "Choose Ingredients"}
          {(step === 1) && "Select Cuisines"}
          {(step === 2) && "Confirm Submit"}
          <button
            onClick={handleNext}
            disabled={step === 2}
            className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md transition-colors ${
              step === 2
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}   
          >
            Next
          </button>
        </h1>
        <div className="mb-4">
          {/*step === 0 && <Ingredients ingredients={ingredients} setIngredients={setSelectedIngredients}/>*/}
          {step === 0 && <FormSection name={"ingredient"} setItems={setSelectedIngredients} items={ingredients}/>}
          {/*step === 1 && <Cuisines cuisines={cuisines} setCuisines={setSelectedCuisines}/>*/}
          {step === 1 && <FormSection name={"cuisine"} setItems={setSelectedCuisines} items={cuisines}/>}
          <div>
            <div className="grid grid-cols-2 m-4">
              <div>
                <h1>Selected Ingredients</h1>
              {selectedIngredients.map((ingredient, index) => {
                return(
                  <span
                            key={index}
                            className="flex items-center bg-orange-200 text-black px-3 py-1 rounded-full text-sm shadow-md"
                        >
                            {ingredient}
                            <button
                                type="button"
                                onClick={() => handleRemoveIngredient(ingredient)}
                                className="ml-2 text-red-600 font-bold hover:text-red-800"
                            >
                                ×
                            </button>
                        </span>
                )
              })}
              </div>
              <div>
                <h1>Selected Cuisines</h1>
              {selectedCuisines.map((cuisine, index) => {
                return(
                  <span
                            key={index}
                            className="flex items-center bg-orange-200 text-black px-3 py-1 rounded-full text-sm shadow-md"
                        >
                            {cuisine}
                            <button
                                type="button"
                                onClick={() => handleRemoveCuisine(cuisine)}
                                className="ml-2 text-red-600 font-bold hover:text-red-800"
                            >
                                ×
                            </button>
                        </span>
                )
              })}
              </div>
          </div>
          <button onClick={handleSubmit}
          >What is going on bro...</button>

        </div>
          
        </div>
      </div>
    </div>
  );
};

export default Form;