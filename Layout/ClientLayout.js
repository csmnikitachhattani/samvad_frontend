"use client";
import { Box } from "@mui/material";
import Sidebar from "@/components/client/clientdash/clientsidenav";


export default function ClientLayout({ children }) {
  return (


  

    <Box sx={{  bgcolor: "#F8FAFC" }}>
      {/* Sidebar Panel (Fixed Width) */}
      <Box>
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