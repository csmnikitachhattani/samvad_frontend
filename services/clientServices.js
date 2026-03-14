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
  getOfficeLevels: async (req)=>{
    const {distCode, de} = req
    try {
      const res = await axiosClient.get(`/ManageMaster/getofficelevel/B010`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getClientSection: async (req)=>{
    const {distCode, deptCode} = req
    try {
      const res = await axiosClient.get(`/ManageMaster/getclientsection/${distCode}/${deptCode}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getOfficers: async (req)=>{
    const {distCode, deptCode} = req
    try {
      const res = await axiosClient.get(`/ManageMaster/getofficer/${distCode}/${deptCode}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getOfficeNames: async (req)=>{
    const {distCode, deptCode} = req
    console.log("data",req)
    try {
      const res = await axiosClient.get(`/manageMaster/getofficename/${distCode}/${deptCode}`);
      return res.data;
    } catch (err) {
      console.log("answer")
      throw err; // interceptor will format it
    }
  },
  getClientData: async (client)=>{
    try {
      const res = await axiosClient.get(`/Client/get-client-detail_by_sno/${client}`);
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
  getFilesDetails: async()=>{
    try {
      const res = await axiosClient.get("/Client/get-files");
      return res;
    } catch (err) {
      throw err; // interceptor will format it"
    }
  },
  getClientName: async()=>{
    try {
      const res = await axiosClient.get("/Client/GetClientName");
      return res
    }
    catch (err){
      throw err
    }
  },
  getForwardUsers: async()=>{
    try {
      const res = await axiosClient.get("/Client/getForwardUsers?forward_by_user_id=00141");
      return res
    }
    catch (err){
      throw err
    }
  },
  getActionList: async()=>{
    try  {
      const res = await axiosClient.get("/Client/getActionList");
      return res
    }
    catch (err){
      throw err
    }
  }

};

export default clientServices;
