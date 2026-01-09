"use client";

import { Box } from "@mui/material";
import ClientLayout from "@/Layout/ClientLayout";


export default function DashboardLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", // ✅ ensures full screen height
        overflow: "hidden", // ✅ prevents layout shifting
      }}
    >
      {/*  */}
      <ClientLayout />
  

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#f9fafb",
          overflowY: "auto", // ✅ allows scrolling only inside main content
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
