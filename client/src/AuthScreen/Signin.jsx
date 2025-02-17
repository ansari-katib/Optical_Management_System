import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import signinImage from "../assets/signin-page.jpg";
import { SignInValidationSchema } from "../Schema/ValidationSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/create-user", values);
      if (response.status === 201) { 
        toast.success("Signup successful :)");
        resetForm(); 
        setTimeout(() => navigate("/"), 2000); 
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again!";
      toast.error(errorMessage); 
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${signinImage})` }}
    >
      <ToastContainer />
      <div className="w-full max-w-md bg-white/50 backdrop-blur-md rounded-lg shadow-md p-6 sm:p-8 opacity-90">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Sign up for Optiflow
        </h2>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={SignInValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-b-4 focus:border-yellow-400 focus:outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-b-4 focus:border-yellow-400 focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-b-4 focus:border-yellow-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-7 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                {isSubmitting ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  "Sign in"
                )}
              </button>
              <p className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <a href="/" className="text-blue-500 hover:underline">
                  Login
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
