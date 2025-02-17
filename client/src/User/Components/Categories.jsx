import React, { useState } from "react";

import MenContactLenseImg from '../../assets/men-contact-lenses.jpg'
import MenComputerGlassImg from '../../assets/men-computer-glass.avif'
import MenEyeGlassImg from '../../assets/men-eyeglass.avif'
import MenReadingGlassImg from '../../assets/men-reading-glass.jpg'
import MenSunGlassImg from '../../assets/men-sunglasses.jpg'
import GlassAccessoriies from '../../assets/glass accessories.jpg'

import WomenContactLenseImg from '../../assets/women-contact-lenses.webp'
import WomenComputerGlassImg from '../../assets/women-computer-glass.jpg'
import WomenEyeGlassImg from '../../assets/women-glasses.jpg'
import WomenReadingGlassImg from '../../assets/women-reading-glass.jpg'
import WomenSunGlassImg from '../../assets/women-sunglass.jpg'

import KidSunglassesImg from '../../assets/kids-sunglass.jpg'
import KidGlassesImg from '../../assets/kids-glass.jpg'


const Categories = () => {
    // State to manage the selected category filter
    const [selectedCategory, setSelectedCategory] = useState("Men");

    // All category data
    const allCategories = [
        {
            name: "Men Eyewear",
            imageUrl: MenEyeGlassImg,
            type: "Men",
        },
        {
            name: "Sunglasses",
            imageUrl: MenSunGlassImg,
            type: "Men",
        },
        {
            name: "Computer Glasses",
            imageUrl: MenComputerGlassImg,
            type: "Men",
        },
        {
            name: "Reading Glasses",
            imageUrl: MenReadingGlassImg,
            type: "Men",
        },
        {
            name: "Contact lenses",
            imageUrl: MenContactLenseImg,
            type: "Men",
        },
        {
            name: "Accessories",
            imageUrl: GlassAccessoriies,
            type: "Men",
        },

        {
            name: "Women Eyewear",
            imageUrl: WomenEyeGlassImg,
            type: "Women",
        },
        {
            name: "Sunglasses",
            imageUrl:WomenSunGlassImg,
            type: "Women",
        },
        {
            name: "Computer Glasses",
            imageUrl: WomenComputerGlassImg,
            type: "Women",
        },
        {
            name: "Reading Glasses",
            imageUrl: WomenReadingGlassImg,
            type: "Women",
        },
        {
            name: "Contact lenses",
            imageUrl: WomenContactLenseImg,
            type: "Women",
        },
        {
            name: "Accessories",
            imageUrl: GlassAccessoriies,
            type: "Women",
        },

        {
            name: "Kids Eyewear",
            imageUrl: KidGlassesImg,
            type: "Kids",
        },
        {
            name: "Kids Sunglasses",
            imageUrl:KidSunglassesImg,
            type: "Kids",
        },
    ];

    // Filter categories based on the selected type
    const filteredCategories = allCategories.filter(
        (category) => category.type === selectedCategory
    );

    return (
        <div className="mt-10 min-h-screen">
            {/* Category Filter */}
            <div className="max-w-7xl mx-auto p-8">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-700">
                    Explore Our Categories
                </h2>

                <div className="mb-10 flex gap-10 items-center">
                    <button
                        className={`px-4 py-2 text-lg rounded-lg text-black ${selectedCategory === "Men" ? "border-b-4 border-green-500  " : "bg-white"
                            } hover:bg-gray-200`}
                        onClick={() => setSelectedCategory("Men")}
                    >
                        Men
                    </button>
                    <button
                        className={`px-4 py-2 text-lg rounded-lg text-black ${selectedCategory === "Women" ? "border-b-4 border-green-500 " : "bg-white"
                            } hover:bg-gray-200`}
                        onClick={() => setSelectedCategory("Women")}
                    >
                        Women
                    </button>
                    <button
                        className={`px-4 py-2 text-lg rounded-lg text-black ${selectedCategory === "Kids" ? "border-b-4 border-green-500 " : "bg-white"
                            } hover:bg-gray-200`}
                        onClick={() => setSelectedCategory("Kids")}
                    >
                        Kids
                    </button>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCategories.map((category) => (
                        <div
                            key={category.name}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={category.imageUrl}
                                alt={category.name}
                                className="w-full h-52 object-cover cursor-pointer"
                            />
                            <h3 className="text-xl flex justify-center items-center cursor-pointer font-semibold text-gray-800 mb-3">
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* If no categories match */}
                {filteredCategories.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">
                        No categories found for "{selectedCategory}"
                    </p>

                )}
            </div>
        </div>
    );
};

export default Categories;
