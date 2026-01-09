"use client";
import { Box } from "@mui/material";
import Sidebar from "@/components/client/clientdash/clientsidenav";


export default function NewspaperLayout({ children }) {
  return (
  
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#F8FAFC" }}>
      {/* Sidebar Panel (Fixed Width) */}
      <Box
        // sx={{
        //   width: 260,
        //   flexShrink: 0,
        //   color: "#fff",
        //   background: "linear-gradient(180deg, #FF7A00 0%, #FF3D00 100%)", // 🍊 Bright Orange Gradient
        //   display: "flex",
        //   flexDirection: "column",
        // }}
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