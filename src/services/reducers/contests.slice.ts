import {createSlice} from '@reduxjs/toolkit';

const contestSlice = createSlice({
  name: 'contests',
  initialState: {
    data: {},
  },
  reducers: {
    getData: state => {
      return state;
    },
  },
});
export const {getData} = contestSlice.actions;
export default contestSlice.reducer;
