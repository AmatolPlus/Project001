import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../redux.config';

export interface ILoginRequest {
  username: string | undefined;
  mobile_number: number | string | undefined;
  country_code: string | undefined;
  referral_code: string | undefined;
}

export interface IValidateRequest {
  auth_token: string | undefined;
  otp: string | undefined;
}

export interface IResendRequest {
  auth_token: string | undefined;
}

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
  }),
});

const {useLoginMutation, useValidateOtpMutation, useResendOtpMutation} =
  loginService;
const loginReducerPath = loginService.reducerPath;
export {
  useLoginMutation,
  useValidateOtpMutation,
  useResendOtpMutation,
  loginReducerPath,
};
