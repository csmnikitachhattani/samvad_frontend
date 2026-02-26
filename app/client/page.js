"use client";
import React from "react";
import { Suspense } from "react";
import NoticeBoard from "@/components/client/noticeboard";
import Report from "@/components/client/report"
import ForwardTo from "@/components/client/forward"
import RequestForm from "@/components/client/requestform"
import CreateNewRequest from "@/components/client/createnewrequest";
import NewsRateList from "@/components/client/newsratelist";
import { Box, Divider } from "@mui/material";
import ClientFileUpload from "@/components/client/clientfileupload";

function ClientModule() {
  // Mock data
  const mockData = [
    { id: 1, title: "Dainik Bhaskar" },
    { id: 2, title: "Patrika" },
    { id: 3, title: "Navbharat Times" },
    { id: 4, title: "Haribhoomi" },
    { id: 5, title: "The Hitavada" },
  ];

  return (
    <Suspense fallback={<div>Loading client module...</div>}>       
      <Box sx={{ width: "100%" }}>
            <NoticeBoard />
      </Box>
    </Suspense>
  );
}

export default ClientModule;
