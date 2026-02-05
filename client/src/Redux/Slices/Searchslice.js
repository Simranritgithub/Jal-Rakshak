import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  debouncedSearch: "",

};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setDebouncedSearch: (state, action) => {
      state.debouncedSearch = action.payload;
    }
  }
});

export const { setSearchTerm, setDebouncedSearch, setReports } =
  searchSlice.actions;

export default searchSlice.reducer;
