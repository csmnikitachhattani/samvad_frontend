import axiosClient from "@/lib/axiosClient";

const commonService = {
  getStates: () =>
    axiosClient.get(`/ManageMaster/getstatename`),
    
  getDistrict: () =>
     axiosClient.get(`/ManageMaster/getdistrictname`),
};


export default commonService;
