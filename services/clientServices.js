import axiosClient from "@/lib/axiosClient";

const clientServices = {
  getalldepartment: async () => {
    try {
      const res = await axiosClient.get("/ManageMaster/getdepartmentname");
      return res.data;
    } catch (err) {
      throw err; 
    }
  },

  getClientData: async ()=>{
    try {
      const res = await axiosClient.get("/Client/get-client-detail_by_sno/2");
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },
 
  getAdvtCaption: async ()=>{
    try {
      const res = await axiosClient.get("/ManageMaster/getallAdvtCaptions");
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },

  getAdvtCategory: async ()=>{
    try {
      const res = await axiosClient.get("/Client/getavakcategories");
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },

  getAdvtList: async (params)=>{
    const {fin_year, datatype, } = params
    try {
      const res = await axiosClient.get("/Client/avak-list?dataType=AvakList");
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },

  getAvakDetail: async (payload)=>{
    console.log("Workorder VehicleS")
    //const {fin_year, avak_ref_id, } = params
    try {
      const res = await axiosClient.post("/Client/get-avak-record", payload);
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },

  getallReceivingModes: async ()=>{
    try {
      const res = await axiosClient.get("/ManageMaster/getallReceivingModeTypes");
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },
  getallLetterTypes: async ()=>{
    try {
      const res = await axiosClient.get("/ManageMaster/getalllettertype");
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },

};

export default clientServices;
