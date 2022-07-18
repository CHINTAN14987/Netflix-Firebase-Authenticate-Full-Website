import { configureStore } from "@reduxjs/toolkit";
import TokenReducer from "./TokenSlice";
const store = configureStore({ reducer: { token: TokenReducer } });
export default store;
