import axiosClient from "@/lib/axiosClient";

const commonService = {
  getStates: () =>
    axiosClient.get(`/states`),
};

export default commonService;
