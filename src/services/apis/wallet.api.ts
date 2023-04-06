import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../redux.config';

export const walletService = createApi({
  reducerPath: 'wallet',
  baseQuery,
  endpoints: build => ({
    walletAmount: build.query({
      query: () => ({
        method: 'GET',
        url: 'wallet/earned_amount/',
      }),
    }),
  }),
});

export const walletReducerPath = walletService.reducerPath;

export const {useWalletAmountQuery} = walletService;
