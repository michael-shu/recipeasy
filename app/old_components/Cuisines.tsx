'use client';
import { useState } from "react";

const Input = ({cuisines, setCuisines}: { cuisines: string[], setCuisines: React.Dispatch<React.SetStateAction<string[]>>}) => {

    //Value to filter cuisines
    const [cuisineFilterValue, setCuisineFilterValue] = useState("");

    //The cuisines that have been clicked by the user
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

    const [visibleCuisines, setVisibleCuisines] = useState(36); // Show 12 genres initially

    // Show More/Show All button handler
    const handleShowMore = () => {
        setVisibleCuisines(Object.keys(cuisines).length); // Show all genres
    };

    const handleAddCuisine = (cuisine: string) => {
        if (!selectedCuisines.includes(cuisine)) {
            setSelectedCuisines([...selectedCuisines, cuisine]);
        }
    };

    const handleRemoveCuisine = (cuisine: string) => {
        setSelectedCuisines(selectedCuisines.filter((item) => item !== cuisine));
    };

    const filterCuisines = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCuisineFilterValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCuisines(selectedCuisines);
    };

    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9844a', '#f9c74f'];

    return (
        <div className="flex min-h-screen">
            
            <form
                onSubmit={handleSubmit}
                className="bg-amber-500 shadow-lg rounded-lg p-6 w-full"
            >
                
                <h1 className="text-2xl rounded-lg bg-white p-2 font-bold text-gray-800 text-center mb-4">
                    Select the cuisines you&apos;d like to cook with
                </h1>
                <div className="flex bg-white flex-wrap gap-2 mb-4 border border-gray-300 rounded-md px-4 py-2">
                    {selectedCuisines.map((cuisine, index) => (
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
                    ))}
                    <input
                        type="text"
                        value={cuisineFilterValue}
                        onChange={filterCuisines}
                        placeholder="Type to search cuisines"
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
                    Save Cuisines
                </button>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    {cuisines.filter((cuisine) => cuisine.includes(cuisineFilterValue))
                        .slice(0, visibleCuisines)
                        .map((cuisine, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleAddCuisine(cuisine)}
                                    className="rounded-lg px-4 py-2 text-white border-2
                              shadow-md 
                               transition-transform transform
                               hover:scale-105 active:scale-95 focus:outline-none focus:ring-2
                                focus:ring-orange-400"

                                    style={{
                                        backgroundColor: colors[index % colors.length],
                                    }}
                                >
                                    {cuisine}
                                </button>
                            );
                        })}
                    {visibleCuisines < cuisines.length && (
                        <button
                            onClick={handleShowMore}
                            className="px-6 py-3 rounded-full text-white font-semibold shadow-md 
                               transition-transform transform hover:scale-105 active:scale-95 
                               bg-gradient-to-r from-[#f3722c] to-[#f8961e] hover:from-[#f9844a] hover:to-[#f9c74f] 
                               focus:outline-none focus:ring-4 focus:ring-[#f9c74f]/50"
                        >
                            Show All
                        </button>

                    )}
                </div>
            </form>
        </div>
    );
};

export default Input;
