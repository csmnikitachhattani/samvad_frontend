"use client";
import React from "react";
import Dashboard from "@/components/admin/dashboard"
import NoticeBoard from "@/components/Newspaper/noticeboard"
import {
  Box,
  Divider,
} from "@mui/material";

function OutdoorIndex() {
  return (
  <Box>
    <Box sx={{width: "100%"}}>
      <Dashboard />
    </Box>
    <Box>
    <Divider sx={{ mb: 3 }} />
      <NoticeBoard />
    </Box>
  </Box>
  );
}

export default OutdoorIndex;
