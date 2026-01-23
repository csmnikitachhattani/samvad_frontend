import axiosClient from "@/lib/axiosClient";

const commonService = {
  getStates: () =>
    axiosClient.get(`/newspaper/states`),
    
  getDistrict: () =>
     axiosClient.get(`/newspaper/district`),
};


export default commonService;
