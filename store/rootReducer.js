import { combineReducers } from "@reduxjs/toolkit";
import realeaseReducer from "@/store/modules/newspaper/realeaseSlice";

const rootReducer = combineReducers({
  realease: realeaseReducer,
});

export default rootReducer;
