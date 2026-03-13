import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const adminControllerSlice = createSlice({
  name: "vehicle",
  initialState: {
    value: 0,
    ModalShow: false,
    statusModalShow: false,
    
  },
  reducers: {
    toggleModal: (state, action) =>{
      state.ModalShow= action?.payload?.show 
      console.log(state.ModalShow)

    },
    toggleStatusModal: (state, action) =>{
      state.statusModalShow = !state.statusModalShow
      state.roDetails= action?.payload || {}
      console.log(state.roDetails)
    },
    
  },
});




                                        





export const { toggleModal, } = adminControllerSlice.actions;
export default adminControllerSlice.reducer;
