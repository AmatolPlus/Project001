import {BASE_URL} from './service.config';

import pickBy from 'lodash/pickBy';
import map from 'lodash/map';

import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {get} from '@/utils/storage';

function customParamsSerializer(params: any) {
  const cleanedParams = pickBy(params, v => {
    return v === null || v === undefined;
  });
  const finalParams = map(cleanedParams, (value, key) => {
    if (Array.isArray(value)) {
      return value.map(v => `${key}[]=${v}`).join('&');
    } else {
      return `${key}=${value}`;
    }
  }).join('&');
  return finalParams;
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: headers => {
    const token = get('token');

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
  paramsSerializer: customParamsSerializer,
});

export {customParamsSerializer, baseQuery};
