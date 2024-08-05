import * as Yup from "yup";

export const loginValidator = Yup.object().shape({
  email: Yup.string()
    .email("Please Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerValidation = Yup.object().shape({
  email: Yup.string()
    .email("Please Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  name: Yup.string().required("Name is required"),
});
