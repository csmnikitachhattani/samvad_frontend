import React from "react";
import { Box } from "@mui/material";
import RealeaseOrder from "@/components/Newspaper/RealeaseOrder/RealeaseOrderList";

import NewspaperLayout from "@/Layout/NewspaperLayout";
export default function NewspaperPage() {
  return (
    
    <Box sx={{ p: 0 }}>
      <RealeaseOrder />
    </Box>
    
  );
}

