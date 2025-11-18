import axiosClient from "@/lib/axiosClient";

const noticeBoardService = {
  getNotices: () =>
    axiosClient.get(`/notice-board`),
};

export default noticeBoardService;