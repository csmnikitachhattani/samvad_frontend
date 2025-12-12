import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ROService from "@/services/ROServices";
//import axios from "axios";
import axiosClient from "@/lib/axiosClient";

const realeaseSlice = createSlice({
  name: "realease",
  initialState: {
    value: 0,
    uploadModalShow: false,
    statusModalShow: false,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    toggleUploadModal: (state) =>{
      state.uploadModalShow = !state.uploadModalShow
    },
    toggleStatusModal: (state, action) =>{
      console.log(action?.payload)
      state.statusModalShow = !state.statusModalShow
    }
  },
});
export const publishRO = createAsyncThunk(
  "release/publishRO",
  async ({ avak_ref_id, advt_no }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(
        "/ro/details",
        payload
      );
      console.log(res)
      return res.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data || "Publish failed");
    }
  }
);
export const getRODetails = createAsyncThunk(
  "release/getRODetails",
  async (data, { rejectWithValue }) => {
    const { financial_year,avak_ref_id, advt_no,} = data
    console.log(data)
    try {
      //const response = await axios.get(`http://localhost:4000/api/ro/details/${data?.avak_ref_id}`);
      const res = await axiosClient.get(`/ro/details/`, {  params: {
        financial_year,
        avak_ref_id,
        advt_no,
      },}
      )
      console.log(res)
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unable to fetch details");
    }
  }
);


export const { increment, decrement, toggleUploadModal, toggleStatusModal } = realeaseSlice.actions;
export default realeaseSlice.reducer;
