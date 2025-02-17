import React from 'react';

import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Term_Condition = () => {
  return (
    <div>
      <Navbar />
      
      {/* Page Title */}
      <div className="py-10 bg-gray-100 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Terms and Conditions</h1>
      </div>

      {/* Terms and Conditions Content */}
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Introduction</h2>
        <p className="text-gray-600 mb-6">
          Welcome to our website! These terms and conditions outline the rules and regulations for the use of our website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">1. Agreement to Terms</h2>
        <p className="text-gray-600 mb-6">
          By accessing and using this website, you agree to comply with and be bound by these terms and conditions. If you do not agree with these terms, please do not use the site.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. Use of Website</h2>
        <p className="text-gray-600 mb-6">
          You agree to use this website in accordance with all applicable laws and regulations. Unauthorized use of this website may result in legal action.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">3. Privacy Policy</h2>
        <p className="text-gray-600 mb-6">
          We respect your privacy. Please refer to our Privacy Policy for more details about how we handle your personal information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">4. Limitation of Liability</h2>
        <p className="text-gray-600 mb-6">
          We are not liable for any damages arising from the use of this website or the content provided herein.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">5. Modifications</h2>
        <p className="text-gray-600 mb-6">
          We reserve the right to modify, update, or discontinue the website and its contents at any time without prior notice.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">6. Governing Law</h2>
        <p className="text-gray-600 mb-6">
          These terms and conditions are governed by the laws of [Your Country/Region]. Any disputes will be subject to the jurisdiction of the courts in [Your Jurisdiction].
        </p>

        {/* You can add more sections as needed */}
      </div>

      <Footer />
    </div>
  );
};

export default Term_Condition;
