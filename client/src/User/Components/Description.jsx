import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa"; 

const Description = () => {
    const [openIndex, setOpenIndex] = useState(null); // Track the index of the open question

    const Texts = [
        {
            title: "About Opti Flow",
            description:"Opti Flow is an innovative solution that optimizes performance through advanced algorithms for superior visual clarity. Designed with precision, it redefines user experiences by enhancing adaptability and reliability in every situation, ensuring that you see the world in its truest colors.",
        },
        {
            title: "Range of Sunglasses",
            description:"From aviator sunglasses to trendy cateye sunglasses, our diverse range of sunglasses is designed to harmonize with the latest fashion trends while embodying timeless elegance. However, it's not just about looking fabulous. Our sunglasses provide exceptional protection for the eyes, giving you the freedom to step out and enjoy a bright sunny day!  "
        },
        {
            title: "Range of Frames & Lenses",
            description:
                "We offer a wide variety of frames and lenses designed to provide comfort, durability, and superior vision quality. Our frames come in versatile designs to suit every personality, while lenses are available with advanced features like anti-glare, scratch resistance, and custom prescriptions.",
        },
        {
            title: "Range of Contact Lenses",
            description:
                "Our contact lenses are designed for comfort and clarity, providing an optimal fit for your eyes. Available in daily, bi-weekly, and monthly variants, they ensure hydration and breathability for long hours, catering to diverse needs including astigmatism and multifocal requirements.",
        },
        {
            title: "Range of Computer Glasses",
            description:
                "Protect your eyes from digital strain with our specially designed computer glasses that reduce blue light exposure. With stylish frames and advanced lens technology, these glasses are perfect for those who spend extended hours on digital devices, offering both functionality and flair.",
        },
        {
            title: "Frequently Asked Questions",
            description:
                "Here you will find answers to the most frequently asked questions regarding our products and services. From warranty policies to tips for maintaining your eyewear, we've compiled all the essential information to help you make informed decisions.",
        },
    ];
    
    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle the specific question
    };

    return (
        <>
            <div className="w-full mx-auto p-6 border-none text-gray-400 border shadow-lg bg-black mt-10 flex flex-col items-center justify-center">
                <div className=" w-[80%] h-full">
                    {Texts.map((text, index) => (
                        <div key={index} className="mb-4">
                            <div className="border-b-2 border-gray-400 pb-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold">{text.title}</h2>
                                    <button
                                        onClick={() => toggleAnswer(index)} // Only toggle the clicked question
                                        className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
                                    >
                                        {openIndex === index ? (
                                            <FaCaretUp size={20} /> // Show "up" icon when answer is visible
                                        ) : (
                                            <FaCaretDown size={20} /> // Show "down" icon when answer is hidden
                                        )}
                                    </button>
                                </div>

                                {/* Answer section */}
                                <div
                                    className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="text-gray-300 mt-2">{text.description}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Description;
