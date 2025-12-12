import axiosClient from "@/lib/axiosClient";
// :{
//     user_id: "00020",
//     fin_year: "2024-2025",
//     np_cd: "00019",
//     ip_address: "1.1.1.1",
//   }
const ROService = {
  getROList: (user_id) =>
    axiosClient.get(`/ro/list/`),

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