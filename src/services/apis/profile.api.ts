import {ILoginRequest, IValidateRequest} from '@/screens/Login/LoginTypes';
import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../redux.config';

export const profileService = createApi({
  reducerPath: 'profile',
  baseQuery,
  tagTypes: ['Profile'],
  endpoints: build => ({
    userDetails: build.query<any, any>({
      query: () => ({
        method: 'GET',
        url: 'auth/user/',
      }),
    }),
  }),
});

const {useUserDetailsQuery} = profileService;
const profileReducerPath = profileService.reducerPath;
export {useUserDetailsQuery, profileReducerPath};
export type {ILoginRequest, IValidateRequest};
