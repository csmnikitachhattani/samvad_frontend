import { combineReducers } from "@reduxjs/toolkit";
import realeaseReducer from "@/store/modules/newspaper/realeaseSlice";
import vehicleReducer from "@/store/modules/outdoor/vehicleSlice"

const rootReducer = combineReducers({
  realease: realeaseReducer,
  vehicle : vehicleReducer,
});

export default rootReducer;
