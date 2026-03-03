import axiosClient from "@/lib/axiosClient";

const adminService = {
  getServices: async () => {
    console.log("newspaper information")
    try {
      const res = await axiosClient.get("http://103.79.34.50:8083/api/ManageMaster/getservicetype");
      return res.data;
    } catch (err) {
      throw err; 
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
  getMiniBusList: async () => {
    console.log("get all mini bus")
    try {
      const res = await axiosClient.get("http://103.79.34.50:8083/api/ManageMaster/get-all-bus");
      return res.data;
    } catch (err) {
      console.log("answer")
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
      const res = await axiosClient.get(`http://103.79.34.50:8083/api/ManageMaster/getagencybyserviceid/${id}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getAllocationRecord: async (job_id, avakRefId) =>{
    console.log("get Allocation detail")
    try {
      const res = await axiosClient.get(`http://103.79.34.50:8083/api/OutDoorMediaTransaction/getsubrecordswithtotals?avakRefId=${avakRefId}&jobNo=${job_id}`);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  submitNotesheet: async (payload) =>{
    console.log("post notesheet detail")
    try {
      const res = await axiosClient.post(`http://103.79.34.50:8083/api/OutDoorMediaTransaction/lvnotesheetprocess`, payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  ApprovedNotesheet: async (payload) =>{
    console.log("post notesheet detail")
    try {
      const res = await axiosClient.post(`http://103.79.34.50:8083/api/OutDoorMediaTransaction/approveledvehicle`, payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  proceedWorkload: async (payload) =>{
    console.log("post notesheet detail")
    try {
      const res = await axiosClient.post(`http://103.79.34.50:8083/api/OutDoorMediaTransaction/lvworkorder`, payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  }

 
};
export default adminService;
