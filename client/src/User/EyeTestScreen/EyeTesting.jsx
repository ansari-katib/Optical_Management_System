import React from "react";

//* Components :
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

//* images
import EyeTestingImg from "../../assets/eye-testing.jpg";

const EyeTesting = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">

                {/* Content Section */}
                <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-xl">
                    <h1 className="text-4xl md:text-3xl font-bold text-yellow-800 mb-4">
                        Schedule a free in-store Eye Test
                    </h1>
                    <p className="text-gray-600 mb-2">
                        Fill in your details and we'll help you schedule your 20-steps
                    </p>
                    <p className="text-gray-600 font-semibold mb-6">
                        ZERO-error Eye Test
                    </p>

                    {/* Form Section */}
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            required
                            className="w-full mt-4 px-4 py-2 border-b-2 rounded-lg focus:outline-none focus:border-b-4 focus:border-yellow-500"
                        />

                        <input
                            type="email"
                            placeholder="Enter Email"
                            required
                            className="w-full px-4 mt-10 py-2 border-b-2 rounded-lg focus:outline-none focus:border-b-4 focus:border-yellow-500"
                        />

                        <input
                            type="number"
                            placeholder="Enter Age"
                            required
                            className="w-full px-4 mt-10 py-2 border-b-2 rounded-lg focus:outline-none focus:border-b-4 focus:border-yellow-500"
                        />

                        <input
                            type="tel"
                            placeholder="Enter Phone"
                            required
                            className="w-full px-4 mt-10 py-2 border-b-2 rounded-lg focus:outline-none focus:border-b-4 focus:border-yellow-500"
                        />

                        <input
                            type="text"
                            placeholder="Enter Pincode"
                            required
                            className="w-full px-4 mt-10 py-2 border-b-2 rounded-lg focus:outline-none focus:border-b-4 focus:border-yellow-500"
                        />
                    </form>

                    <button
                        className="mt-10 w-full bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-200"
                    >
                        Book Free Eye Test
                    </button>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                    <img
                        src={EyeTestingImg}
                        alt="eye testing"
                        className="rounded-lg shadow-2xl max-w-full md:max-w-md"
                    />
                </div>

            </div>

            <Footer />
        </>
    );
};

export default EyeTesting;
