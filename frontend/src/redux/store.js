import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userProfileReducer from "./userProfileSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
     profile: userProfileReducer,
  },
});

export default store;
