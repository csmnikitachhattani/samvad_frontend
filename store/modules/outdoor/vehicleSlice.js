import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ROService from "@/services/ROServices";
//import axios from "axios";
import axiosClient from "@/lib/axiosClient";

const vehicleSlice = createSlice({
  name: "realease",
  initialState: {
    value: 0,
    uploadModalShow: false,
    statusModalShow: false,
    roDetails:{
      financial_year:'',
      avak_ref_id:'',
      advt_no:'',
    }
  },
  reducers: {
    toggleUploadModal: (state, action) =>{
      state.uploadModalShow = !state.uploadModalShow
      state.roDetails= action?.payload || {}
    },
    toggleStatusModal: (state, action) =>{
      state.statusModalShow = !state.statusModalShow
      state.roDetails= action?.payload || {}
      console.log(state.roDetails)
    },
    
  },
});




                                        





export const { increment, decrement, toggleUploadModal, toggleStatusModal } = vehicleSlice.actions;
export default vehicleSlice.reducer;
