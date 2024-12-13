'use client';
import { useState } from "react";

const Input = ({name, items, setItems}: {name:string,  items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>}) => {

    //Value to filter items
    const [itemFilterValue, setItemFilterValue] = useState("");

    //The items that have been clicked by the user
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleAddItem = (item: string) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleRemoveItem = (selectedItem: string) => {
        setSelectedItems(selectedItems.filter((item) => item !== selectedItem));
    };

    const filterItems = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemFilterValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setItems(selectedItems);
    };

    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9844a', '#f9c74f'];

    return (
        <div className="flex">
            
            <form
                onSubmit={handleSubmit}
                className="bg-amber-500 shadow-lg rounded-lg p-6 w-full"
            >
                
                <p className="text-2xl rounded-xl bg-gray-200 p-2 font-bold text-gray-800 mb-4 w-fit">
                    Select your {name}s
                </p>
                <div className="flex bg-white flex-wrap gap-2 mb-4 border border-gray-300 rounded-md px-4 py-2">
                    {selectedItems.map((item, index) => (
                        <span
                            key={index}
                            className="flex items-center bg-orange-200 text-black px-3 py-1 rounded-full text-sm shadow-md"
                        >
                            {item}
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(item)}
                                className="ml-2 text-red-600 font-bold hover:text-red-800"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        value={itemFilterValue}
                        onChange={filterItems}
                        placeholder="Type to search items"
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
                    Save {name}s
                </button>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    {items.filter((item) => item.includes(itemFilterValue))
                        .slice(0, 9)
                        .map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleAddItem(item)}
                                    className="rounded-lg px-4 py-2 text-white border-2
                              shadow-md 
                               transition-transform transform
                               hover:scale-105 active:scale-95 focus:outline-none focus:ring-2
                                focus:ring-orange-400"

                                    style={{
                                        backgroundColor: colors[index % colors.length],
                                    }}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    
                        <button
                            className="px-6 py-3 rounded-full text-white font-semibold shadow-md 
                               transition-transform transform hover:scale-105 active:scale-95 
                               bg-gradient-to-r from-[#f3722c] to-[#f8961e] hover:from-[#f9844a] hover:to-[#f9c74f] 
                               focus:outline-none focus:ring-4 focus:ring-[#f9c74f]/50"
                        >
                            And {items.length} More
                        </button>
                </div>
            </form>
        </div>
    );
};

export default Input;
