import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducers/reducers';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {loginService} from './apis/login.api';
import {contestService} from './apis/contests.api';

export const store = configureStore({
  reducer,
  middleware: gDM =>
    gDM().concat(loginService.middleware, contestService.middleware),
});

setupListeners(store.dispatch);
