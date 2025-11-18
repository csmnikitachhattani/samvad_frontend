import axiosClient from "@/lib/axiosClient";

const newspaperService = {
  getNewspapers: (user_id) =>
    axiosClient.get(`/npuser/${user_id}`),
};

export default newspaperService;
