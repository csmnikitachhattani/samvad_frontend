"use client";

import React from "react";
import { AppBar, Toolbar, Box, Typography, Avatar } from "@mui/material";
import ClientSideNavbar from "./clientsidenavebar";

const ClientSideNav = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #0F2027, #203A43, #2C5364)",
          height: "100%", 
          overflow: "hidden"
      }}
    >
      <Box>
        <ClientSideNavbar />
      </Box>
    </Box>
  );
};

export default ClientSideNav;
