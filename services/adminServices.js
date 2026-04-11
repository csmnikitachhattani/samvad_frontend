import axiosClient from "@/lib/axiosClient";

const adminService = {
  getServices: async (cat) => {
    try {
      const res = await axiosClient.get(`/ManageMaster/getservicetype/?avak_cate_id=${cat}`);
      return res.data;
    } catch (err) {
      throw err; 
    }
  },
  getAgency: async () => {
    try {
      const res = await axiosClient.get("/ManageMaster/allagency");
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  createAgency: async (updateData) => {
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
    try {
      const res = await axiosClient.get("/ManageMaster/get-all-bus");
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getcounter: async () => {
    try {
      const res = await axiosClient.get("/OutDoorMediaTransaction/getodmlvcounter");
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getcounterDetail: async (id) => {
    try {
      const res = await axiosClient.get(`/OutDoorMediaTransaction/getodmlvcounter?id=${id}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getVendorList: async (id) => {
    try {
      const res = await axiosClient.get(`/ManageMaster/getagencybyserviceid/${id}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getClientRecord: async (payload) => {
    try {
      const res = await axiosClient.post(`/Client/get-client-request-record/`, payload);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getClientRequestList: async () => {
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
    try {
      const res = await axiosClient.post(`/OutDoorMediaTransaction/odm-lv-notesheet-process`, payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  ApprovedNotesheet: async (payload) =>{
    try {
      const res = await axiosClient.post(`/OutDoorMediaTransaction/odm-lv-approve-job-allocation`, payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  proceedWorkload: async (payload) =>{
    try {
      const res = await axiosClient.post(`/OutDoorMediaTransaction/odm-lv-generate-ro`, payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getOdmRateCategory: async (payload) =>{
    try {
      const res = await axiosClient.post('/OutDoorMediaTransaction/odm-lv-get-rate-parameters', payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getOdmRateTender: async (payload) =>{
    try {
      const res = await axiosClient.post('/OutDoorMediaTransaction/odm-lv-get-rate-parameters', payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getOdmRateWorkTypes: async (payload) =>{
    try {
      const res = await axiosClient.post('/OutDoorMediaTransaction/odm-lv-get-rate-parameters', payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getOdmRateDuration: async (payload) =>{
    try {
      const res = await axiosClient.post('/OutDoorMediaTransaction/odm-lv-get-rate-parameters', payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getOdmRateWorkList: async (payload) =>{
    try {
      const res = await axiosClient.post('/OutDoorMediaTransaction/odm-lv-get-rate-parameters', payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getOdmRateList: async (payload) =>{
    try {
      const res = await axiosClient.post('/OutDoorMediaTransaction/odm-lv-get-rate-allocation', payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getLEDvehicleRate: async (payload) =>{
    const {type} = payload
    try {
      const res = await axiosClient.get(`/OutDoorMediaTransaction/GetHordingDurationByTypee?type=${type}`);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  }, 
  getAllocationList: async (payload) =>{
    //const {type} = payload
    try {
      const res = await axiosClient.get(`OutDoorMediaTransaction/ODM_LV_SelectAllListAvailibility_BetweenDate`,payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  }, 
};
export default adminService;
