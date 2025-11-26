import axiosClient from "@/lib/axiosClient";

const commonService = {
  getStates: () =>
    axiosClient.get(`/states`),
    
  getDistrict: () =>
     axiosClient.get(`/district`),
};


export default commonService;
