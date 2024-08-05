'use client';
import { ThemeProvider } from '@/contexts/app/theme-provider';
import { useLazyGetProfileQuery } from '@/services/rtk/profileApi';
import { LoginUser } from '@/services/slices/userSlice';
import { RootState, store } from '@/services/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createWrapper } from 'next-redux-wrapper';
import { ConfirmModalProvider } from '@/contexts/app/modal-context';

// export const wrapper = createWrapper(store);

const AppProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [getProfile] = useLazyGetProfileQuery();

  useEffect(() => {
    getProfile('').then((res) => {
      console.log('accountres', res);
      if (res?.data?.status !== 'error') {
        dispatch(LoginUser(res?.data?.data));
      }
    });
  }, []);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ConfirmModalProvider>{children}</ConfirmModalProvider>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
};

export default AppProvider;
