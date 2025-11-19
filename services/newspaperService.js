import axiosClient from "@/lib/axiosClient";

const newspaperService = {
  getNewspapers: (user_id) =>
    axiosClient.get(`/npuser/${user_id}`),

  getNewspapersBankDetails: (user_id) =>
    axiosClient.get(`/npuser/bank/${user_id}`),

  getNewspapersGSTDetails: (user_id) =>
    axiosClient.get(`/npuser/gst/${user_id}`),

  updateNpUser: async (userId, updateData) => {
    try {
      const res = await axiosClient.patch(`/npuser/edit/${userId}`, updateData);
      return res.data;
    } catch (err) {
      throw err; // already formatted by interceptor
    }
  }
};

export default newspaperService;
