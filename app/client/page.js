"use client";
import React from "react";
import NoticeBoard from "@/components/client/noticeboard";
import Report from "@/components/client/report"
import { Box, Divider } from "@mui/material";

function ReleaseOrderListing() {
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
      <Box sx={{ width: "100%" }}>
            <NoticeBoard />

      </Box>
      <Box>
        <Report/>
      </Box>
      
    </Box>
  );
}

export default ReleaseOrderListing;
