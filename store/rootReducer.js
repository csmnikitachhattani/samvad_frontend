import { combineReducers } from "@reduxjs/toolkit";
import realeaseReducer from "@/store/modules/newspaper/realeaseSlice";
import vehicleReducer from "@/store/modules/outdoor/vehicleSlice"
import notification from  "@/store/modules/snackbar/notificationSlice"
  

const rootReducer = combineReducers({
  realease: realeaseReducer,
  vehicle : vehicleReducer,
  notification : notification,
});

export default rootReducer;
