import axiosClient from "@/lib/axiosClient";

const adminService = {
  getServices: async (cat) => {
    console.log("newspaper information")
    try {
      const res = await axiosClient.get(`/ManageMaster/getservicetype/?avak_cate_id=${cat}`);
      return res.data;
    } catch (err) {
      throw err; 
    }
  },
  getAgency: async () => {
    console.log("get all agencncy")
    try {
      const res = await axiosClient.get("/ManageMaster/allagency");
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

      const res = await axiosClient.post("/ManageMaster/createagency", payload);
      return res.data;
    } catch (err) {
      throw err; // interceptor will format it
    }
  },
  getMiniBusList: async () => {
    console.log("get all mini bus")
    try {
      const res = await axiosClient.get("/ManageMaster/get-all-bus");
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getcounter: async () => {
    console.log("get all agencncy")
    try {
      const res = await axiosClient.get("/OutDoorMediaTransaction/getodmlvcounter");
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getcounterDetail: async (id) => {
    console.log("get counter detail")
    try {
      const res = await axiosClient.get(`/OutDoorMediaTransaction/getodmlvcounter?id=${id}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getVendorList: async (id) => {
    console.log("get counter detail")
    try {
      const res = await axiosClient.get(`/ManageMaster/getagencybyserviceid/${id}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getClientRecord: async (payload) => {
    console.log("get counter detail")
    try {
      const res = await axiosClient.post(`/Client/get-client-request-record/`, payload);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getClientRequestList: async () => {
    console.log("get request Client List")
    try {
      const res = await axiosClient.get(`/Client/getclientadvtrequests?financial_year=2024-2025&action=get_forwarded&user_id=00100`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getAllocationtList: async () => {
    console.log("get request Client List")
    try {
      const res = await axiosClient.get(`/OutDoorMediaTransaction/getlvjoballocation`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getAllocationRecord: async (job_id, avakRefId) =>{
    console.log("get Allocation detail")
    try {
      const res = await axiosClient.get(`/OutDoorMediaTransaction/getsubrecordswithtotals?avakRefId=${avakRefId}&jobNo=${job_id}`);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  submitNotesheet: async (payload) =>{
    console.log("post notesheet detail")
    try {
      const res = await axiosClient.post(`/OutDoorMediaTransaction/lvnotesheetprocess`, payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  ApprovedNotesheet: async (payload) =>{
    console.log("post notesheet detail")
    try {
      const res = await axiosClient.post(`/OutDoorMediaTransaction/approveledvehicle`, payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  proceedWorkload: async (payload) =>{
    console.log("post notesheet detail")
    try {
      const res = await axiosClient.post(`/OutDoorMediaTransaction/lvworkorder`, payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },

 
};
export default adminService;
