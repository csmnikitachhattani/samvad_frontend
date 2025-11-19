import axiosClient from "@/lib/axiosClient";

const newspaperService = {
  getNewspapers: (user_id) =>
    axiosClient.get(`/npuser/${user_id}`),
    
  getNewspapersBankDetails: (user_id) =>
      axiosClient.get(`/npuser/bank/${user_id}`),

  getNewspapersGSTDetails: (user_id) =>
      axiosClient.get(`/npuser/gst/${user_id}`),
};
export default newspaperService;