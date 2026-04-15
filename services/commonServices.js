import axiosClient from "@/lib/axiosClient";

const commonService = {
  getStates: () =>
    axiosClient.get(`/ManageMaster/getstatename`),
    
  getDistrict: () =>
     axiosClient.get(`/ManageMaster/getdistrictname`),

  getFinYearList: async (payload) =>{
      //const {type} = payload
      try {
        const res = await axiosClient.get(`/ManageMaster/getallFinancialYear`);
        return res;
      } catch (err) {
        console.log("answer")
        throw err; // interceptor will format it
      }
    },
};




export default commonService;
