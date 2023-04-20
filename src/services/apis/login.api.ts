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
    uploadProfilePic: build.mutation({
      query: body => ({
        method: 'POST',
        url: 'auth/user/upload_profile_image/',
        body,
      }),
    }),
    updateUserDetails: build.mutation({
      query: body => ({
        method: 'PUT',
        url: 'auth/user/',
        body,
      }),
    }),
    resetPassword: build.mutation({
      query: body => ({
        method: 'Post',
        url: 'auth/reset_password/',
        body,
      }),
    }),
    confirmResetPassword: build.mutation({
      query: body => ({
        method: 'Post',
        url: 'auth/reset_password/confirm/',
        body,
      }),
    }),
    updatePassword: build.mutation({
      query: body => ({
        method: 'POST',
        url: 'auth/password_change/',
        body,
      }),
    }),
    loginWithPin: build.mutation({
      query: body => ({
        method: 'POST',
        url: 'auth/login/password/',
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
  useLoginWithPinMutation,
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
  useLoginWithPinMutation,
};
export type {ILoginRequest, IValidateRequest};
