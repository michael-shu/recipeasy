'use client';
import { useState } from "react";

const Input = ({ ingredients, setIngredients}: { ingredients: string[], setIngredients: React.Dispatch<React.SetStateAction<string[]>>}) => {

    //Value to filter ingredients
    const [ingredientFilterValue, setIngredientFilterValue] = useState("");

    //The ingredients that have been clicked by the user
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    const [visibleIngredients, setVisibleIngredients] = useState(36); // Show 12 genres initially

    // Show More/Show All button handler
    const handleShowMore = () => {
        if (visibleIngredients === 36) {
            setVisibleIngredients(visibleIngredients + 24); // Show 4 more rows (24 ingredients)
        } else if (visibleIngredients === 60) {
            setVisibleIngredients(visibleIngredients + 24); // Show 4 more rows (24 ingredients)
        }
        else {
            setVisibleIngredients(Object.keys(ingredients).length); // Show all genres
        }
    };

    const handleAddIngredient = (ingredient: string) => {
        if (!selectedIngredients.includes(ingredient)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const handleRemoveIngredient = (ingredient: string) => {
        setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
    };

    const filterIngredients = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredientFilterValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIngredients(selectedIngredients);
    };

    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9844a', '#f9c74f'];

    return (
        <div className="flex min-h-screen">
            
            <form
                onSubmit={handleSubmit}
                className="bg-amber-500 shadow-lg rounded-lg p-6 w-full"
            >
                <h1 className="text-2xl bg-white rounded-lg p-2 font-bold text-gray-800 text-center mb-4">
                    Select the ingredients you&apos;d like to cook with
                </h1>
                
                
                <div className="bg-white flex flex-wrap gap-2 mb-4 border border-gray-300 rounded-md px-4 py-2">
                    {selectedIngredients.map((ingredient, index) => (
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
                    ))}
                    <input
                        type="text"
                        value={ingredientFilterValue}
                        onChange={filterIngredients}
                        placeholder="Type to search ingredients"
                        className="flex-1 focus:outline-none text-black"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg text-white font-bold shadow-lg 
             bg-gradient-to-r from-[#ff4e50] to-[#fc913a] hover:from-[#fc913a] hover:to-[#f9d423] 
             transition-transform transform hover:scale-105 active:scale-95 
             focus:outline-none focus:ring-4 focus:ring-[#f9d423]/50 mb-5 justify-self-center"
                >
                    Save Ingredients
                </button>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    {ingredients.filter((ingredient) => ingredient.includes(ingredientFilterValue))
                        .slice(0, visibleIngredients)
                        .map((ingredient, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleAddIngredient(ingredient)}
                                    className="rounded-lg px-1 py-2 text-white border-2
                              shadow-md 
                               transition-transform transform
                               hover:scale-105 active:scale-95 focus:outline-none focus:ring-2
                                focus:ring-orange-400"

                                    style={{
                                        backgroundColor: colors[index % colors.length],
                                    }}
                                >
                                    {ingredient}
                                </button>
                            );
                        })}
                    {visibleIngredients < ingredients.length && (
                        <button
                            onClick={handleShowMore}
                            className="px-6 py-3 rounded-full text-white font-semibold shadow-md 
                               transition-transform transform hover:scale-105 active:scale-95 
                               bg-gradient-to-r from-[#f3722c] to-[#f8961e] hover:from-[#f9844a] hover:to-[#f9c74f] 
                               focus:outline-none focus:ring-4 focus:ring-[#f9c74f]/50"
                        >
                            {visibleIngredients === 84 ? 'Show All' : 'Show More'}
                        </button>

                    )}
                </div>
            </form>
        </div>
    );
};

export default Input;
