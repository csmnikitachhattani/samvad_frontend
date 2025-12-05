import axiosClient from "@/lib/axiosClient";
// :{
//     user_id: "00020",
//     fin_year: "2024-2025",
//     np_cd: "00019",
//     ip_address: "1.1.1.1",
//   }
const ROService = {
  getROList: (user_id) =>
    axiosClient.get(`/ro/list/`),
};

export default ROService;