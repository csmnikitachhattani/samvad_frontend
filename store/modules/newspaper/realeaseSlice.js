import { createSlice } from "@reduxjs/toolkit";

const realeaseSlice = createSlice({
  name: "realease",
  initialState: {
    value: 0,
    uploadModalShow: false,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    toggleUploadModal: (state) =>{
      console.log(state.uploadModalShow)
      state.uploadModalShow = !state.uploadModalShow
      console.log(state.uploadModalShow)
    }
  },
});

export const { increment, decrement, toggleUploadModal } = realeaseSlice.actions;
export default realeaseSlice.reducer;
