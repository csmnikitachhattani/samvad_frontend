"use client";

import { Box } from "@mui/material";
import ClientLayout from "@/Layout/ClientLayout";
import ClientFooter from "@/components/client/clientdash/clientfooter"
import Header from "@/components/client/clientdash/clientheader";


export default function DashboardLayout({ children }) {
  return (
    <Box>
    <Header/>
    <Box
      sx={{
        display: "flex",
        // ✅ ensures full screen height
        // overflow: "hidden", // ✅ prevents layout shifting
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
    <ClientFooter/>
    </Box>
  );
}
