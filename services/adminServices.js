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
  getcounter: async (financial_year) => {
    console.log(financial_year)

    try {
      const res = await axiosClient.get(`/OutDoorMediaTransaction/getodmlvcounter?financial_year=${financial_year}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getWorkorders: async () => {
    try {
      const res = await axiosClient.get("/OutDoorMediaTransaction/odm_lv_pending-ro-list");
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
  getClientRequestList: async (payload) => {
  const {userId,financialYear} = payload
    try {
      const res = await axiosClient.get(`/Client/getclientadvtrequests?financial_year=${financialYear}&action=get_admin_request&user_id=${userId}`);
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
  getAllocationRecordWorkorder: async (job_id, avakRefId, vendor_id) =>{
    console.log("get Allocation detail")
    try {
      const res = await axiosClient.get(`/OutDoorMediaTransaction/getsubrecordswithtotals?avakRefId=${avakRefId}&jobNo=${job_id}&vendorId=${vendor_id}`);
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
      const res = await axiosClient.post(`/OutDoorMediaTransaction/ODM_LV_SelectAllListAvailibility_BetweenDate`,payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getNoteSheetPrintDetail: async (payload) =>{
    const {job_no, avak_ref, fin_year} = payload
    try {
      const res = await axiosClient.get(`/OutDoorMediaTransaction/odm-lv-joballocation-notesheet-print?financial_year=${fin_year}&job_no=${job_no}&avak_ref_id=${avak_ref}`);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  }, 
  finalAllocatePost: async (payload) =>{
    //const {job_no, avak_ref, fin_year} = payload
    try {
      const res = await axiosClient.post(`/OutDoorMediaTransaction/odm-lv-allocate-vendor`, payload);
      return res;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  }, 
};
export default adminService;
