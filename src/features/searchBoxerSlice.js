import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchNewBoxerOpen: "",
};

export const searchBoxerSlice = createSlice({
  name: "searchBoxer",
  initialState,
  reducers: {
    searchAllBoxers: (state, action) => {
      state.searchNewBoxerOpen = action.payload;
    },
  },
});

export const { searchAllBoxers } = searchBoxerSlice.actions;

export const selectSearchBoxer = (state) => state.searchBoxer.searchNewBoxerOpen;

export default searchBoxerSlice.reducer;
