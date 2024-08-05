import { globalRoutes } from '@/config/global.routes';
import { toast } from 'react-toastify';
import { MiddlewareAPI } from 'redux';

export const rtkErrorHandler = (api: MiddlewareAPI) => (next) => (action) => {
  try {
    if (action?.payload?.timezone && typeof localStorage != 'undefined') {
      localStorage.setItem('timezone', action?.payload?.timezone);
    }

    console.log('actionpayload', action?.payload);
    // Handle Un-Authenticated
    if (
      !globalRoutes.includes(window.location.pathname) &&
      !window.location.pathname.includes('reset-password/') &&
      (action.payload?.message == 'Unauthenticated.' || action.payload?.status === 401)
    ) {
      toast.error(action.payload.data.message?.trim() ?? 'Please login to continue', {
        autoClose: false
      });
      window.location.replace('/login');
      return next(action);
    }
    if (action.payload.data?.status === 401) {
      toast.error(action.payload.data.message?.trim() ?? 'Please login to continue', {
        autoClose: false
      });
      return next(action);
    }
    console.log('action.payload.data', action.payload.data);
    if (
      window.location.pathname !== '/verify' &&
      action.payload?.status === 403 &&
      action.payload.data.message?.trim() === '2FA verification required'
    ) {
      return window.location.replace('/verify');
    }
    if (window.location.pathname !== '/auth/mfa' && action.payload?.status === 407) {
      return window.location.replace('/auth/mfa');
    }
    if (window.location.pathname !== '/maintenance' && action.payload?.status === 503) {
      return window.location.replace('/maintenance');
    }

    if (action.payload?.status === 403 && window.location.pathname !== '/verify') {
      toast.error(action.payload.data.message?.trim() ?? 'Exception Occured!', {
        autoClose: false
      });

      return next(action);
    }
    if (action.payload?.status === 404) {
      toast.error(action.payload.data.message?.trim() ?? 'Page Not Found!', {
        autoClose: false
        // position: 'top-right',
      });
      return next(action);
    }
    if (action.payload?.status === 400) {
      toast.error(action.payload.data.message?.trim() ?? 'Something Went Wrong.', {
        autoClose: false
        // position: 'top-right',
      });
      return next(action);
    }

    console.log('actionpayload', action.payload);
    if (action.payload?.status === 413) {
      toast.error('Content too large', {
        autoClose: false
      });
      return next(action);
    }
    // Handle Server Error
    if (
      action.payload?.status === 500 &&
      action?.payload?.data?.message !== '2FA verification required' &&
      window.location.pathname !== '/verify'
    ) {
      // if (process.env.NEXT_PUBLIC_DISABLE_DEBUG) {
      //   return next(action)
      // }

      toast.error(action.payload?.data?.message ?? "Oops! Something wen't wrong", {
        autoClose: false
      });
      return next(action);
    }
    return next(action);
  } catch (e: any) {
    console.log('rtk error', e?.message);
    return next(action);
  }
  // return next(action)
};
