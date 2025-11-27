import { createSlice } from "@reduxjs/toolkit";

const realeaseSlice = createSlice({
  name: "realease",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = realeaseSlice.actions;
export default realeaseSlice.reducer;
