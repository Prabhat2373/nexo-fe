'use client';
import React from 'react';

import { useLazyGetProfileQuery } from '@/services/rtk/profileApi';
import { LoginUser } from '@/services/slices/userSlice';
import { RootState } from '@/services/store';
import Cookies from 'cookies-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RedirectContainer = () => {
  const params = useSearchParams();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = user?.isLoggedIn;
  const dispatch = useDispatch();
  const [getProfile, { isLoading, data }] = useLazyGetProfileQuery();
  // console.log("profile", data);
  const token = params ? params?.get('token') : null;

  useEffect(() => {
    if (token) {
      Cookies.set('token', token);
      getProfile('');
    }
  }, [token]);

  useEffect(() => {
    if (data?.data && !isLoggedIn) {
      dispatch(LoginUser(data?.data));
    }
    if (isLoggedIn) {
      router.push('/');
    }
  }, [data, isLoggedIn]);

  return (
    <>
      <Suspense>
        <div>Redirecting..</div>
      </Suspense>
    </>
  );
};

export default RedirectContainer;
