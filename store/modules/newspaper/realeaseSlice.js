import { createSlice } from "@reduxjs/toolkit";

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
    toggleStatusModal: (state) =>{
      state.statusModalShow = !state.statusModalShow
    }
  },
});

export const { increment, decrement, toggleUploadModal, toggleStatusModal } = realeaseSlice.actions;
export default realeaseSlice.reducer;
