import { configureStore } from "@reduxjs/toolkit";
import {
  noteListReducer,
  noteCreateReducer,
  noteUpdateReducer,
  noteDeleteReducer,
} from "./reducers/notesReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const rootReducer = {
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
  userUpdate: userUpdateReducer,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
