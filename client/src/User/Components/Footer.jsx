import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

//* images :
import Logo from '../../assets/logo.png';
import GooglePlayStore from '../../assets/google-play.webp';
import AppleStore from '../../assets/apple-store.webp';

const Footer = () => {
    const items = [
        {
            heading: 'EYEGLASSES',
            route: [
                { name: 'Men', to: '/eye-glasses/gender/male' },
                { name: 'Women', to: '/eye-glasses/gender/women' },
                { name: 'Kids', to: '/eye-glasses/gender/kids' },
                { name: 'Fastrack', to: '/eye-glasses/brand/fastrack' },
                { name: 'Rimless', to: '/eye-glasses/frame-style/rimless' },
                { name: 'Titan', to: '/eye-glasses/brand/titan' }
            ]
        },
        {
            heading: 'SUNGLASSES',
            route: [
                { name: 'Men', to: '/eye-glasses/gender/male' },
                { name: 'Women', to: '/eye-glasses/gender/women' },
                { name: 'Fastrack', to: '/eye-glasses/brand/fastrack' },
                { name: 'Rimless', to: '/eye-glasses/frame-style/rimless' }
            ]
        },
        {
            heading: 'CONTACT LENSES',
            route: [
                { name: 'Bausch & Lomb', to: '/contact-lenses/brand/bausch_and_lomb' },
                { name: 'Johnson & Johnson', to: '/eye-glasses/brand/johnson_and_johnson' },
                { name: 'Alcon', to: '/eye-glasses/brand/alcon_vision' }
            ]
        },
        {
            heading: 'ACCOUNT',
            route: [
                { name: 'Our Policies', to: '/our-policies' },
                { name: 'My Account', to: '/' },
                { name: 'Create an Account', to: '/signin' }
            ]
        },
        {
            heading: 'ABOUT OPTI-FLOW',
            route: [
                { name: 'About Us', to: '/about-us' },
                { name: 'Blog', to: '/blog' },
                { name: 'Term & Conditions', to: '/term-and-condition' },
                { name: 'Contact Us', to: '/contact-us' }
            ]
        }
    ];

    return (
        <footer className="bg-black text-white py-10">
            {/* Navigation Sections */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4">
                {items.map((item, index) => (
                    <div key={index} className="space-y-4">
                        <h3 className="text-lg font-semibold text-yellow-500">{item.heading}</h3>
                        <ul className="space-y-2">
                            {item.route.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.to} className="hover:text-gray-400">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Contact and Social Section */}
            <div className="mt-10 px-4">
                <div className="flex flex-col lg:flex-row items-center lg:justify-evenly space-y-8 lg:space-y-0">
                    {/* Logo and Social Media */}
                    <div className="flex flex-col items-center text-center space-y-5">
                        <img src={Logo} className="bg-white rounded-full h-28 w-28" alt="Logo" />
                        <div className="flex gap-5">
                            <FaInstagram className="text-pink-600 h-8 w-8 hover:cursor-pointer" />
                            <FaTwitter className="text-blue-500 h-8 w-8 hover:cursor-pointer" />
                            <FaYoutube className="text-red-600 h-8 w-8 hover:cursor-pointer" />
                        </div>
                    </div>

                    {/* App Download and Contact Info */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-xl text-yellow-500 mb-2">DOWNLOAD OPTI-FLOW APP</h2>
                        <div className="flex justify-center lg:justify-start gap-5 mb-4">
                            <img src={GooglePlayStore} alt="Google Play Store" className="h-10 cursor-pointer" />
                            <img src={AppleStore} alt="Apple Store" className="h-10 cursor-pointer" />
                        </div>
                        <h2 className="text-xl text-yellow-500 mb-2">REACH US AT</h2>
                        <p>deom@optiflow.com</p>
                        <p>0000-000-0000</p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center mt-10 text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Opti-Flow. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
