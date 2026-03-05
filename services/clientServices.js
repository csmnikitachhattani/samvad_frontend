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
      const res = await axiosClient.get("/Client/avak_list", {});
      return res;
    } catch (err) {
      throw err; // interceptor will format it
    }
  },


};

export default clientServices;
