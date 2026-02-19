"use client";
import React from "react";
import Table from "@/components/admin/workorder/table"
import {
  Box,
  Divider,
} from "@mui/material";

function WorkOrderIndex() {
  return (
  <Box>
    <Box sx={{width: "100%"}}>
      <Table />
    </Box>
  </Box>
  );
}

export default WorkOrderIndex;
