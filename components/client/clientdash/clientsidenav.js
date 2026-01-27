"use client";

import React from "react";
import { AppBar, Toolbar, Box, Typography, Avatar } from "@mui/material";
import ClientSideNavbar from "./clientsidenavebar";

const ClientSideNav = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0F2027, #203A43, #2C5364)",
      }}
    >
      {/* Top Branding Bar */}
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          background:
            "linear-gradient(90deg, #0F2027, #203A43)",
          zIndex: 1201,
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            gap: 1.5,
            py: 1,
          }}
        >
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd1Y_LHU5cIbQ1GOxw3x6yJVNv9IiGdsJQqZkFC0BnQBsRzJg2Z1Zg2pddadXpycxaDzo&usqp=CAU"
            sx={{
              width: 42,
              height: 42,
              border: "2px solid rgba(255,255,255,0.4)",
            }}
          />

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "#F4C430",
              letterSpacing: "1px",
            }}
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
