"use client";

import React from "react";
import { AppBar, Toolbar, Box, Typography, Avatar } from "@mui/material";
import ClientSideNavbar from "./clientsidenavebar";

const ClientSideNav = () => {
  return (
    <Box sx={{ backgroundColor: "#272757", minHeight: "100vh" }}>
      {/* Top Branding Bar */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ backgroundColor: "#272757", zIndex: 1201 }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            gap: 1.5,
          }}
        >
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd1Y_LHU5cIbQ1GOxw3x6yJVNv9IiGdsJQqZkFC0BnQBsRzJg2Z1Zg2pddadXpycxaDzo&usqp=CAU"
            sx={{ width: 40, height: 40 }}
          />

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#ff4d4d" }}
          >
            CG Samvad
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Box>
        <ClientSideNavbar />
      </Box>
    </Box>
  );
};

export default ClientSideNav;
