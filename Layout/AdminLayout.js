"use client";
import { Box } from "@mui/material";
import Sidebar from "@/components/admin/layout/sidebar";
import Header from "@/components/Newspaper/header";

export default function AdminLayout({ children }) {
  return (
  
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#F8FAFC" }}>
      {/* Sidebar Panel (Fixed Width) */}
      <Box
        sx={{
          width: 260,
          flexShrink: 0,
          color: "#fff",
          background: "#030236",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content Area (Scrolls) */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* <Header /> */}
        <Box sx={{ flexGrow: 1, mt: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
