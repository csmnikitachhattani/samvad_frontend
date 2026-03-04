"use client";
import React from "react";
import DisplayAllocationForm from "@/components/admin/counter/displayAllocationForm";

import {
  Box,
  Divider,
} from "@mui/material";

function AdminIndex() {
  return (
  <Box>
    <Box sx={{width: "100%"}}>
      <DisplayAllocationForm />
     
    </Box>
  </Box>
  );
}

export default AdminIndex;