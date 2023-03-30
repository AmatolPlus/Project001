import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './reducers/login.slice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});
