import LoginContainer from "@/containers/auth/LoginContainer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login ",
  description: "Login ",
};

const LoginPageIndex = () => {
  return <LoginContainer />;
};

export default LoginPageIndex;
