import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../redux.config';
import {method} from 'lodash';

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
    getCredit: build.mutation({
      query: () => ({
        method: 'POST',
        url: 'credit_request/',
      }),
    }),
    walletTransactions: build.query({
      query: page => ({
        method: 'GET',
        url: `wallet/transactions/?page=${page}`,
      }),
    }),
  }),
});

export const walletReducerPath = walletService.reducerPath;

export const {
  useWalletAmountQuery,
  useWalletTransactionsQuery,
  useGetCreditMutation,
} = walletService;
