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
    axiosClient.get(`/gst/${user_id}`),

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

  updateGSTDetail: async (updateData) => {
    try {
      const payload = {
        action: "update",
        user_id: updateData.user_id,
        GST_legalName: updateData.GST_legalName,
        GST_number: updateData.GST_number,
        GST_StateID: updateData.GST_StateID,
        GST_StateText: updateData.GST_StateText,
        GST_DateOfRegistration: updateData.GGST_DateOfRegistration,
        GST_TaxpayerType: updateData.GST_TaxpayerType,
        ip_address: updateData.ip_address,
        by_user_id: updateData.by_user_id || "",
        by_user_name: updateData.by_user_name || "",
      };

      const res = await axiosClient.post(`/gst/update`, payload);
      return res.data;
    } catch (err) {
      throw err; // interceptor will format
    }
  },

  


};

export default newspaperService;
