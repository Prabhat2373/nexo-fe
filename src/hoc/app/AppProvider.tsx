"use client";
import { ThemeProvider } from "@/contexts/app/theme-provider";
import { useLazyGetProfileQuery } from "@/services/rtk/profileApi";
import { LoginUser, LogoutUser } from "@/services/slices/userSlice";
import { RootState, store } from "@/services/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createWrapper } from "next-redux-wrapper";
import { ConfirmModalProvider } from "@/contexts/app/modal-context";

import { useRouter } from "next/navigation";

// export const wrapper = createWrapper(store);

const AppProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [getProfile] = useLazyGetProfileQuery();
  const router = useRouter();
  useEffect(() => {
    getProfile("").then((res) => {
      console.log("accountres", res);
      if (res?.data?.status !== "error") {
        dispatch(LoginUser(res?.data?.data));
      }
      if (res?.data?.status == "error") {
        dispatch(LogoutUser());
        router.push("/auth/login");
      }
    });
  }, []);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ConfirmModalProvider>{children}</ConfirmModalProvider>
        <ToastContainer draggable theme="colored" closeOnClick />
      </ThemeProvider>
    </>
  );
};

export default AppProvider;
