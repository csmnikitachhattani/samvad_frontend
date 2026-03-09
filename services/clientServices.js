import axiosClient from "@/lib/axiosClient";

const clientServices = {
  getalldepartment: async () => {
    console.log("get all display Board")
    try {
      const res = await axiosClient.get("/ManageMaster/getdepartmentname");
      return res.data;
    } catch (err) {
      throw err; 
    }
  },
 
  getAdvtCaption: async ()=>{
    console.log("Workorder VehicleS")
    try {
      const res = await axiosClient.get("/ManageMaster/getallAdvtCaptions");
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },

  getAdvtCategory: async ()=>{
    console.log("Workorder VehicleS")
    try {
      const res = await axiosClient.get("/Client/getavakcategories");
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },

  getAdvtList: async (params)=>{
    console.log("Workorder VehicleS")
    const {fin_year, datatype, } = params
    try {
      const res = await axiosClient.get("/Client/avak-list?finYear=2025-2026&userId=1001&dataType=AvakList");
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },


};

export default clientServices;
