import * as Yup from "yup";
 
export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const SignInValidationSchema = Yup.object({
    name: Yup.string()
      .min(2 , "name should be at list 2 characters")
      .max(15 , "name should be maximum 15 character"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    
});

export const ForgetPasswordValidationSchema = Yup.object({
    email : Yup.string()
       .email("Invalid email address")
       .required("Email is required")
})