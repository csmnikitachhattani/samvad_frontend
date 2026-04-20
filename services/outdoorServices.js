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
      const res = await axiosClient.post("http://103.79.34.50:8083/api/ManageMaster/get-all-led-vehicle", {});
      return res.data;
    } catch (err) {
      throw err; // interceptor will format it
    }
  },
  getOutdoorWorkorderList: async (payload)=>{
    console.log("Workorder VehicleS")
    const {agencyId} = payload
    try {
      const res = await axiosClient.get(`http://103.79.34.50:8083/api/OutDoorMediaTransaction/getlvworkorder?agencyId=${agencyId}`, {});
      return res;
    } catch (err) {
      throw err; // interceptor will format it
    }
  },
  getAgencyVehicle : async (selected)=>{
    console.log("get all VehicleS", selected)
    try {
      const payload = {
        "agencyIds": selected
      }
      const res = await axiosClient.post("http://103.79.34.50:8083/api/ManageMaster/get-all-led-vehicle", payload);
      return res.data;
    } catch (err) {
      throw err; // interceptor will format it
    }
  },

  createVehicle: async (updateData) => {
    console.log("newspaper information", updateData)
    try {
      const payload = {
        ...updateData,
      };
      const res = await axiosClient.post("http://103.79.34.50:8083/api/ManageMaster/createledVehicle", payload);
      return res.data;
    } catch (err) {
      throw err; // interceptor will format it
    }
  },

  workorderPrint: async (payload) =>{
    const {job_no, avak_ref, fin_year} = payload
    try {
      const  {} = payload ;
      const res = await axiosClient.get(`/OutDoorMediaTransaction/lv-work-order-printt?financial_year=${fin_year}&job_no=${job_no}&avak_ref_id=${avak_ref}`, );
      return res.data;
    } catch (err) {
      throw err; // interceptor will format it
    }
  }

};

export default outdoorService;
