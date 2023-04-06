import {createSlice} from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'contests',
  initialState: {
    walletAmount: {},
  },
  reducers: {
    getData: state => {
      return state;
    },
  },
});
export const {getData} = walletSlice.actions;
export default walletSlice.reducer;
