import { configureStore } from '@reduxjs/toolkit';
import addBoxerReducer from '../features/addBoxerSlice';
import searchBoxerReducer from '../features/searchBoxerSlice';
import selectBoxerReducer from '../features/selectBoxerSlice';

export const store = configureStore({
  reducer: {
    addBoxer: addBoxerReducer,
    searchBoxer: searchBoxerReducer,
    selectBoxer: selectBoxerReducer,
  },
});
