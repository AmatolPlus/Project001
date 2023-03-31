import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducers/reducers';
import logger from 'redux-logger';
import {contestMiddleWare} from './apis/contests.api';
import {loginMiddleware} from './apis/login.api';

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger, contestMiddleWare, loginMiddleware),
});
