import { configureStore } from "@reduxjs/toolkit";
import TokenReducer from "./TokenSlice";
import searchReducer from "./searchSlice";
const store = configureStore({
  reducer: { token: TokenReducer, search: searchReducer },
});
export default store;
