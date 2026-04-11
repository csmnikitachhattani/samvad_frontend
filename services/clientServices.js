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
    const { deptCode} = req
    console.log("hgdkjkd", req)
    try {
      const res = await axiosClient.get(`/ManageMaster/getofficelevel/${deptCode}`);
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
  },
  getAvakFilesList: async()=>{
    try  {
      const res = await axiosClient.get("/Client/getavakfiles");
      return res
    }
    catch (err){
      throw err
    }
  },
  getCounterFilesList: async()=>{
    try  {
      const res = await axiosClient.get("/Client/getcounterfiles");
      return res
    }
    catch (err){
      throw err
    }
  },
  getClientName: async(req)=>{
    const {client_cd, base_dept_cd, office_cd, office_level_cd, district_cd, section_cd} = req
    console.log(req)
    try {
      const res = await axiosClient.get(`/Client/GetClientName?client_cd=${client_cd}&base_dept_code=${base_dept_cd}&office_code=${office_cd}&office_level_code=${office_level_cd}&district_code=${district_cd}&section_code=${section_cd}`);
      return res
    }
    catch (err){
      throw err
    }
  },
  getClientRequest: async(req)=>{
    const {user_id, financial_year,ref_id, category} = req
    try {
      const res = await axiosClient.get(`/Client/getclientadvtrequests?user_id=${user_id}&financial_year=${financial_year}&action=get_by_id&ref_id=${ref_id}&category=${category}`);
      return res
    }
    catch (err){
      throw err
    }
  }

};

export default clientServices;
