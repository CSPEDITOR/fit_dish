import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userProfileReducer from "./userProfileSlice";
import avoidFoodReducer from "./avoidFoodSlice";
import diseaseReducer from "./diseaseSlice";



export const store = configureStore({
  reducer: {
    user: userReducer,
     profile: userProfileReducer,
     avoidFood: avoidFoodReducer,
    disease: diseaseReducer, 

  },
});

export default store;
