import axiosClient from "@/lib/axiosClient";

const adminService = {
  getServices: async () => {
    console.log("newspaper information")
    try {
    //   const payload = {
    //     action: "update",
    //     user_id,
    //     'financial_year': '2025-2026',
    //     ...updateData,
    //   };
      const res = await axiosClient.get("http://103.79.34.50:8083/api/ManageMaster/getservicetype");
      return res.data;
    } catch (err) {
      throw err; // interceptor will format it
    }
  },



};

export default adminService;
