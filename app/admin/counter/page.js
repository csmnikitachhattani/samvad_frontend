"use client";
import React from "react";
import Table from "@/components/admin/table"
import {
  Box,
  Divider,
} from "@mui/material";

function AdminIndex() {
  return (
  <Box>
    <Box sx={{width: "100%"}}>
      <Table />
    </Box>
  </Box>
  );
}

export default AdminIndex;
