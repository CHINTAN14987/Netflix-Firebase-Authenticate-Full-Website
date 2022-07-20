import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchFilter: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
