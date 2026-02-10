import axiosClient from "@/lib/axiosClient";

const adminService = {
  getServices: async () => {
    console.log("newspaper information")
    try {
    //   const payload = {
    //     action: "update",
    //     user_id,
    //     'financial_year': '2025-2026',
    //     ...updateData,
    //   };
      const res = await axiosClient.get("http://103.79.34.50:8083/api/ManageMaster/getservicetype");
      return res.data;
    } catch (err) {
      throw err; // interceptor will format it
    }
  },
  getAgency: async () => {
    console.log("get all agencncy")
    try {
      const res = await axiosClient.get("http://103.79.34.50:8083/api/ManageMaster/allagency");
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  createAgency: async (updateData) => {
    console.log("newspaper information", updateData)
    try {
      const payload = {
        
        ...updateData,
      };

      const res = await axiosClient.post("http://103.79.34.50:8083/api/ManageMaster/createagency", payload);
      return res.data;
    } catch (err) {
      throw err; // interceptor will format it
    }
  },
  getcounter: async () => {
    console.log("get all agencncy")
    try {
      const res = await axiosClient.get("http://103.79.34.50:8083/api/OutDoorMediaTransaction/getoutdoorcounter");
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getcounterDetail: async (id) => {
    console.log("get counter detail")
    try {
      const res = await axiosClient.get(`http://103.79.34.50:8083/api/OutDoorMediaTransaction/getoutdoorcounter?id=${id}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getVendorList: async (id) => {
    console.log("get counter detail")
    try {
      const res = await axiosClient.get(`http://103.79.34.50:8083/api/ManageMaster/getagencybyid${id}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  


};

export default adminService;
