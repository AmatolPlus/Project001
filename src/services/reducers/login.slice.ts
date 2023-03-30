import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userData: {},
  },
  reducers: {
    saveUserInfo: (state, action) => {
      state = {
        ...state,
        userData: action.payload,
      };
    },
  },
});
export const {saveUserInfo} = loginSlice.actions;
export default loginSlice.reducer;
