import { combineReducers } from "@reduxjs/toolkit";
import realeaseReducer from "@/store/modules/newspaper/realeaseSlice";
import vehicleReducer from "@/store/modules/outdoor/vehicleSlice"
import displayReducer from "@/store/modules/outdoor/displaySlice"
import notification from  "@/store/modules/snackbar/notificationSlice"
import adminControllerReducer from "@/store/modules/admin/controller"
  

const rootReducer = combineReducers({
  realease: realeaseReducer,
  vehicle : vehicleReducer,
  display : displayReducer,
  notification : notification,
  adminController : adminControllerReducer,

});

export default rootReducer;
