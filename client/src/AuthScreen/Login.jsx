import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import loginImage from "../assets/login-page.jpg";
import { LoginValidationSchema } from "../Schema/ValidationSchema";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/list-users");

      if (response.status === 201) {
        const users = response.data.users;
        const user = users.find(
          (u) => u.email === values.email && u.password === values.password
        );
        if (user) {
          toast.success("Login Successful!");
          resetForm();
          localStorage.setItem('currentUser', JSON.stringify(user));
          if (user.userType === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/home");
          }
        } else {
          toast.error("Invalid email or password. Please try again!");
        }
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <ToastContainer />
      <div className="w-full max-w-md bg-white/50 backdrop-blur-md rounded-lg shadow-md p-6 sm:p-8 opacity-90">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login to Optiflow
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                {isSubmitting ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <a href="/signin" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </p>
              <a
                href="/forget-password"
                className="text-blue-600 text-xs flex justify-end items-center"
              >
                Forget password
              </a>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
