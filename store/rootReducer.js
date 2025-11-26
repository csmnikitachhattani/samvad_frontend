import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../modules/auth/authSlice";
import userReducer from "../modules/user/userSlice";
import productReducer from "../modules/products/productSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productReducer,
});

export default rootReducer;
