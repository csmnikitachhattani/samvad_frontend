import axiosClient from "@/lib/axiosClient";

const newspaperService = {
  getNewspapers: (user_id) =>
    axiosClient.get(`/npuser/${user_id}`),

  getNewspapersBankDetails: (user_id, action = "get") => {
    return axiosClient.get(`/bank-detail/${user_id}`, {
      payload: { action },
    });
  },

  getNewspapersGSTDetails: (user_id) =>
    axiosClient.get(`/npuser/gst/${user_id}`),

  updateNpUser: async (userId, updateData) => {
    try {
      const res = await axiosClient.patch(`/npuser/edit/${userId}`, updateData);
      return res.data;
    } catch (err) {
      throw err; // already formatted by interceptor
    }
  },
  updateProfile: async (user_id, updateData) => {
    console.log("newspaper information", updateData)
    try {
      const payload = {
        action: "update",
        user_id,
        'financial_year': '2025-2026',
        ...updateData,
      };

      const res = await axiosClient.post("http://localhost:5000/api/np-profile", payload);
      return res.data;
    } catch (err) {
      throw err; // interceptor will format it
    }
  },

  updateBankDetail: async (updateData) => {
    try {
      const payload = {
        action: updateData.action,
        user_id: updateData.user_id,
        np_cd: updateData.np_cd,
        financial_year: updateData.financial_year,
        ...updateData
      };
  
      const res = await axiosClient.post(
        "/np/bank-detail",
        payload
      );
      console.log("getting update report", res)
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  


};

export default newspaperService;
