import axiosClient from "@/lib/axiosClient";

const ROService = {
  getROList: (user_id) =>
    axiosClient.get(`/NewsPaper/getROList?user_id=00020&fin_year=2024-2025&np_cd=000019&action=get&page=1&limit=20`),


  getROActionList: async ()=>{
    try {
      const res = await axiosClient.get('/newspaper/ro/actions/list/')
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