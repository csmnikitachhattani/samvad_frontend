"use client";
import React from "react";
import NoticeBoard from "@/components/client/noticeboard";
import Report from "@/components/client/report"
import ForwardTo from "@/components/client/forwaded"
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
    <Box>
        <Box><CreateNewRequest/><RequestForm/></Box>
      <Box sx={{ width: "100%" }}>
        
            <NoticeBoard />

      </Box>
      {/* <Box>
        <Report/>
      </Box>
      <Box><ForwardTo/></Box>
      
    
      <Box><ClientFileUpload/></Box>
      <Box><NewsRateList/></Box>
     */}
    </Box>
  );
}

export default ClientModule;
