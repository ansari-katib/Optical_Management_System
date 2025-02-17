import React from 'react';

import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

//* images:
import opticalImg_1 from '../../assets/carousal1.webp';
import opticalImg_2 from '../../assets/carousal2.webp';
import opticalImg_3 from '../../assets/carousal3.webp';
import opticalImg_4 from '../../assets/carousal4.webp';
import opticalImg_5 from '../../assets/carousal5.webp';
import opticalImg_6 from '../../assets/carousal6.webp';
import opticalImg_7 from '../../assets/carousal7.webp';

const SpecialOffer = () => {
    const images = [
        opticalImg_1,
        opticalImg_2,
        opticalImg_3,
        opticalImg_4,
        opticalImg_5,
        opticalImg_6,
        opticalImg_7,
    ];

    return (
        <>
            <Navbar />
            <div className="p-10 shadow-2xl w-full max-w-6xl mx-auto mt-10 mb-10">                
                {/* Grid Layout for Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                        >
                            <img
                                src={image}
                                alt={`Special Offer ${index + 1}`}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">Special Offer {index + 1}</h3>
                                <p className="mt-2 text-gray-500">Enjoy this special offer for a limited time.</p>
                                <button className="mt-4 bg-amber-400 text-black py-2 px-6 rounded-md">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SpecialOffer;
