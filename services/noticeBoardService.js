import axiosClient from "@/lib/axiosClient";

const noticeBoardService = {
  getNotices: () =>
    axiosClient.get(`/newspaper/notice-board`),
};

export default noticeBoardService;