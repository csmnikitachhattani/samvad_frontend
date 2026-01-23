"use client";
import React from "react";
import Dashboard from "@/components/admin/dashboard"
import NoticeBoard from "@/components/Newspaper/noticeboard"
import {
  Box,
  Divider,
} from "@mui/material";

function AdminIndex() {
  return (
  <Box>
    <Box sx={{width: "100%"}}>
      <Dashboard />
    </Box>
  </Box>
  );
}

export default AdminIndex;
