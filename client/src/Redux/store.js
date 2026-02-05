import searchReducer from './Slices/Searchslice.js';
import { configureStore } from "@reduxjs/toolkit";


export const store= configureStore({
  reducer: {
    search: searchReducer
  }
});