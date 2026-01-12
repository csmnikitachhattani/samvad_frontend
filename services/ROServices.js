import axiosClient from "@/lib/axiosClient";

const ROService = {
  getROList: (user_id) =>
    axiosClient.get(`/newspaper/ro/list/`),


  getROActionList: async ()=>{
    try {
      const res = await axiosClient.get('/newspaper/ro/actions/list')
      console.log(res.data)
      return res.data
    }
    catch (err){
      throw err;
    }
  },

  getRODetails: async (updateData) => {
    console.log("running")
      try {
        const payload = {
          avak_ref_id : updateData.avak_ref_id, 
          advt_no: updateData.advt_no,
          financial_year: updateData.financial_year,
        };
    
        const res = await axiosClient.get(
          "/ro/details",
          payload
        );
        console.log("getting update report", res)
        return res.data;
      } catch (err) {
        throw err;
      }
    },
};







export default ROService;