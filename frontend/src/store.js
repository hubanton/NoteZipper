import { configureStore } from "@reduxjs/toolkit";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const rootReducer = {
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
