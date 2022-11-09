import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addNewBoxerOpen: false
};


export const addBoxerSlice = createSlice({
  name: 'addBoxer',
  initialState,
  reducers: {
    addNewBoxer: (state, action) => {
      state.addNewBoxerOpen = true;
    },
    closeNewBoxer: (state, action) => {
      state.addNewBoxerOpen = false;
    }
  },
});

export const { addNewBoxer, closeNewBoxer } = addBoxerSlice.actions;


export const selectAddBoxer = (state) => state.addBoxer.addNewBoxerOpen;


export default addBoxerSlice.reducer;
