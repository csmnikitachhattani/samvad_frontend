"use client";
import React from "react";
import Form from "@/components/admin/forms/agency"
import {
  Box,
  Divider,
} from "@mui/material";

function AdminIndex() {
  return (
  <Box>
    <Box sx={{width: "100%"}}>
      <Form />
    </Box>
  </Box>
  );
}

export default AdminIndex;
