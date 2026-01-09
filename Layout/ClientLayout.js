"use client";
import { Box } from "@mui/material";
import Sidebar from "@/components/client/clientdash/clientsidenav";
import ClientFooter from "@/components/client/clientdash/clientfooter"
import Header from "@/components/client/clientdash/clientheader";


export default function NewspaperLayout({ children }) {
  return (
  <Box>
 <Header/>
  

    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#F8FAFC" }}>
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
    <ClientFooter/>
   
    </Box>
    
  );
}