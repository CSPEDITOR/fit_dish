import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userProfileReducer from "./userProfileSlice";
import avoidFoodReducer from "./avoidFoodSlice";
import diseaseReducer from "./diseaseSlice";
 import foodDetailReducer from "./foodDetailSlice";
import food from "./foodSlice";




export const store = configureStore({
  reducer: {
    user: userReducer,
     profile: userProfileReducer,
     avoidFood: avoidFoodReducer,
    disease: diseaseReducer, 
    foods: food,
 foodDetail: foodDetailReducer,

    

  },
});

export default store;
