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
  endpoints: (build: { mutation: (arg0: { query: ((body: any) => { method: string; url: string; body: any; }) | ((body: any) => { method: string; url: string; body: any; }) | ((body: any) => { method: string; url: string; body: any; }) | ((body: any) => { method: string; url: string; body: any; }) | ((body: any) => { method: string; url: string; }) | ((body: any) => { method: string; url: string; body: any; }) | ((body: any) => { method: string; url: string; body: any; }); }) => any; query: (arg0: { query: () => { method: string; url: string; }; }) => any; }) => ({
    login: build.mutation<any, ILoginRequest>({
      query: (body: any) => ({
        method: 'POST',
        url: 'auth/login/',
        body,
      }),
    }),
    validateOtp: build.mutation<any, IValidateRequest>({
      query: (body: any) => ({
        method: 'POST',
        url: 'auth/validate_otp/',
        body,
      }),
    }),
    resendOtp: build.mutation<any, IResendRequest>({
      query: (body: any) => ({
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
    updateUserDetails: build.mutation({
      query: (body: any) => ({
        method: 'PUT',
        url: 'auth/user/',
        body,
      }),
    }),
    resetPassword: build.mutation({
      query: (body: any) => ({
        method: 'Post',
        url: 'auth/reset_password/',
        body,
      }),
    }),
    confirmResetPassword: build.mutation({
      query: (body: any) => ({
        method: 'Post',
        url: 'auth/reset_password/confirm/',
      })
    }),
    updatePassword: build.mutation({
      query: (body: any) => ({
        method: 'POST',
        url: 'auth/password_change/',
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
  useUpdatePasswordMutation,
  useUpdateUserDetailsMutation,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation,
} = loginService;
const loginReducerPath = loginService.reducerPath;
export {
  useLoginMutation,
  useValidateOtpMutation,
  useResendOtpMutation,
  useUpdatePasswordMutation,
  loginReducerPath,
  useUpdateUserDetailsMutation,
  useUserDetailsQuery,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation,
};
export type {ILoginRequest, IValidateRequest};
