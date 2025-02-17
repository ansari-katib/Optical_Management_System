import React from "react";
import BackImg from "../assets/optical-img.jpg";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ForgetPasswordValidationSchema } from "../Schema/ValidationSchema";

const ForgetPassword = () => {
  const handleSubmit = (values) => {
    console.log("Forget password email", values);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgetPasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md bg-white/50 backdrop-blur-md shadow-lg rounded-lg p-6">
            <h1 className="text-3xl text-yellow-700 font-bold text-center mb-4">
              Forget Password
            </h1>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Enter your email to reset your password:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:outline-none"
                required
                aria-label="Email for password reset"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition duration-300"
            >
              {isSubmitting ? "Submitting.." : "Submit"}
            </button>
            <div className="mt-4 text-center">
              <a
                href="/"
                className="text-blue-500 text-sm hover:underline"
              >
                Back
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPassword;
