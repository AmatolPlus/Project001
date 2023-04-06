import {
  ILoginRequest,
  IResendRequest,
  IValidateRequest,
} from '@/screens/Login/LoginTypes';
import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../redux.config';

export const loginService = createApi({
  reducerPath: 'login',
  baseQuery,
  tagTypes: ['Login'],
  endpoints: build => ({
    login: build.mutation<any, ILoginRequest>({
      query: body => ({
        method: 'POST',
        url: 'auth/login/',
        body,
      }),
    }),
    validateOtp: build.mutation<any, IValidateRequest>({
      query: body => ({
        method: 'POST',
        url: 'auth/validate_otp/',
        body,
      }),
    }),
    resendOtp: build.mutation<any, IResendRequest>({
      query: body => ({
        method: 'POST',
        url: 'auth/resend_otp/',
        body,
      }),
    }),
    userDetails: build.query({
      query: () => ({
        method: 'GET',
        url: 'auth/user/',
      }),
    }),
    updateUserDetails: build.query({
      query: body => ({
        method: 'PUT',
        url: 'auth/user/',
        body,
      }),
    }),
  }),
});

const {
  useLoginMutation,
  useValidateOtpMutation,
  useUserDetailsQuery,
  useResendOtpMutation,
  useUpdateUserDetailsQuery,
} = loginService;
const loginReducerPath = loginService.reducerPath;
export {
  useLoginMutation,
  useValidateOtpMutation,
  useResendOtpMutation,
  loginReducerPath,
  useUpdateUserDetailsQuery,
  useUserDetailsQuery,
};
export type {ILoginRequest, IValidateRequest};
