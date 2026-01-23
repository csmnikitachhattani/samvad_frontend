import axiosClient from "@/lib/axiosClient";

const outdoorService = {
  getalldisplayboards: async () => {
    console.log("get all display Board")
    try {
      const res = await axiosClient.get("http://103.79.34.50:8083/api/ManageMaster/getalldisplayboards");
      return res.data;
    } catch (err) {
      throw err; 
    }
  },
  getAllvehicle : async ()=>{
    console.log("get all VehicleS")
    try {
      const res = await axiosClient.get("http://103.79.34.50:8083/api/ManageMaster/get-all-ledVehicle");
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
};

export default outdoorService;
