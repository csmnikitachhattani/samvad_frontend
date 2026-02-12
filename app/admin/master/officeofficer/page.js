"use client";
import React from "react";
import OfficeOfficer from "@/components/admin/master/officeofficer/officeofficer"
import {
  Box,
 
} from "@mui/material";

function AdminIndex() {
  return (
  <Box>
    <Box sx={{width: "100%"}}>
      <OfficeOfficer />
    </Box>
  </Box>
  );
}

export default AdminIndex;
