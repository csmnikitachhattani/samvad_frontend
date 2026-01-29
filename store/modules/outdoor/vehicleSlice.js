import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    value: 0,
    ModalShow: false,
    statusModalShow: false,
    
  },
  reducers: {
    toggleCreateModal: (state, action) =>{
      console.log("calling store function ")
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




                                        





export const { toggleCreateModal, } = vehicleSlice.actions;
export default vehicleSlice.reducer;
