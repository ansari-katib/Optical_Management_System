import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AboutUs = () => {
    // State to store dynamic content for the page
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        // Simulating an API call or fetching from a JSON file or database
        const fetchAboutData = () => {
            const data = {
                story: {
                    title: "Our Story",
                    content: [
                        "Optiflow was founded with a simple goal: to provide high-quality optical glasses that cater to the modern lifestyle.",
                        "Our journey began with a vision to offer eyewear that not only enhances your vision but also complements your style.",
                        "We are committed to offering a wide range of glasses for all tastes, needs, and ages, ensuring you always look and feel your best.",
                        "With cutting-edge technology and fashionable designs, Optiflow is at the forefront of eyewear innovation.",
                        "We collaborate with top designers to bring you the best frames and lenses that combine comfort, durability, and style."
                    ]
                },
                mission: {
                    title: "Our Mission & Values",
                    content: [
                        "At Optiflow, our mission is to provide every individual with the eyewear that best suits their needs, offering comfort, clarity, and style.",
                        "We believe that eyewear should do more than correct vision – it should also express personality.",
                        "We aim to create products that cater to every individual’s unique needs and preferences."
                    ],
                    values: [
                        "Quality: We offer high-quality glasses and lenses that stand the test of time.",
                        "Innovation: We stay ahead of trends and continuously introduce new designs and technology.",
                        "Customer-Centric: We put our customers' needs first, ensuring satisfaction with every purchase.",
                        "Affordability: High-quality eyewear shouldn't be expensive, and we ensure our products are reasonably priced.",
                        "Style: We believe that eyewear is an extension of your personality and strive to offer fashionable options."
                    ]
                }
            };
            setAboutData(data);
        };

        fetchAboutData();
    }, []);

    // If data is not loaded, show a loading message
    if (!aboutData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center px-4">
                <div className="w-full md:w-11/12 lg:w-10/12 xl:w-8/12">
                    {/* About Us Section */}
                    <div className="container mx-auto p-6 md:p-10">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-semibold text-gray-800">About Optiflow Optical Glasses</h1>
                            <p className="text-xl text-gray-600 mt-4">
                                Your trusted source for stylish and functional eyewear
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Left Section: Our Story */}
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-800">{aboutData.story.title}</h2>
                                {aboutData.story.content.map((paragraph, index) => (
                                    <p key={index} className="text-lg text-gray-700">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Right Section: Mission & Values */}
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-800">{aboutData.mission.title}</h2>
                                {aboutData.mission.content.map((paragraph, index) => (
                                    <p key={index} className="text-lg text-gray-700">
                                        {paragraph}
                                    </p>
                                ))}
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-semibold text-gray-800">Our Core Values</h3>
                                    <ul className="list-disc pl-5 text-lg text-gray-700">
                                        {aboutData.mission.values.map((value, index) => (
                                            <li key={index}>{value}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Contact CTA Section */}
                        <div className="bg-gray-800 text-white p-8 mt-16 text-center">
                            <h2 className="text-3xl font-bold">Want to Know More?</h2>
                            <p className="text-lg mt-4">Get in touch with us for more details about our products and services.</p>
                            <Link
                                to="/contact-us"
                                className="mt-4 inline-block bg-amber-400 text-black py-2 px-6 rounded-md text-lg"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AboutUs;
