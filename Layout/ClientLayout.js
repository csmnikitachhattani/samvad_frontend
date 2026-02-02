"use client";
import { Box } from "@mui/material";
import Sidebar from "@/components/client/clientdash/clientsidenav";
export default function ClientLayout({ children }) {
  return (
    <Box sx={{  bgcolor: "#F8FAFC", height: "100%", overflow:'hidden' }}>
      {/* Sidebar Panel (Fixed Width) */}
      <Box sx ={{height: "100%", overflow:'hidden'}}>
        <Sidebar />
       
      </Box>

      {/* Main Content Area (Scrolls) */}
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <Header /> */}
        <Box sx={{  mt: 2 }}>{children}</Box>
      </Box>
    </Box>
 

    
  );
}