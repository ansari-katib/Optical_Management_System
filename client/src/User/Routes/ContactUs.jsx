import React from "react";
import { FaClock, FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ContactUs = () => {
    return (
        <>
            <Navbar />
            <div className="w-full bg-gray-100 text-gray-800 p-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                <div className="grid gap-6 w-full max-w-3xl">
                    {/* Working Hours */}
                    <div className="flex items-center bg-white p-4 rounded shadow hover:shadow-lg hover:bg-gray-200 transition-all duration-300">
                        <FaClock className="text-yellow-500 text-2xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">Working Hours</h2>
                            <p className="text-gray-600">Monday to Friday: 9 AM - 6 PM</p>
                        </div>
                    </div>

                    {/* WhatsApp Contact */}
                    <div className="flex items-center bg-white p-4 rounded shadow hover:shadow-lg hover:bg-gray-200 transition-all duration-300">
                        <FaWhatsapp className="text-green-500 text-2xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">WhatsApp</h2>
                            <p className="text-gray-600">Chat with us: +00 00000 00000</p>
                        </div>
                    </div>

                    {/* Phone Contact */}
                    <div className="flex items-center bg-white p-4 rounded shadow hover:shadow-lg hover:bg-gray-200 transition-all duration-300">
                        <FaPhoneAlt className="text-blue-500 text-2xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">Call Us</h2>
                            <p className="text-gray-600">Reach us at: +00 00000 00000</p>
                        </div>
                    </div>

                    {/* Email Contact */}
                    <div className="flex items-center bg-white p-4 rounded shadow hover:shadow-lg hover:bg-gray-200 transition-all duration-300">
                        <FaEnvelope className="text-red-500 text-2xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">Email</h2>
                            <p className="text-gray-600">Write to us: contact@optiflow.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
