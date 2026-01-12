"use client";

import React from "react";
import Image from "next/image";
import { Box, Grid, Typography, Link } from "@mui/material";
import NICLOGO from "@/public/images/256px-NIC_logo.svg.png";

const ClientFooter = () => {
  const currentYear = new Date().getFullYear();
  const appVersion = "v1.0.0";

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#272757",
        color: "#fff",
        py: 2,
        mt: "auto",
        boxShadow: 1,
      }}
    >
      <Grid
        container
        alignItems="center"
        spacing={2}
        sx={{ textAlign: { xs: "center", lg: "left" } }}
      >
        {/* Left - Copyright */}
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ display: "flex", justifyContent: { xs: "center", lg: "flex-start" } }}
        >
          <Typography variant="body2">
            © {currentYear} creativeLabs.
            <Box component="span" sx={{ ml: 1 }}>
              Version {appVersion}
            </Box>
          </Typography>
        </Grid>

        {/* Center - Logo */}
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Image
            src={NICLOGO}
            alt="NIC Logo"
            height={48}
            style={{ width: "auto" }}
            priority
          />
        </Grid>

        {/* Right - Powered By */}
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ display: "flex", justifyContent: { xs: "center", lg: "flex-end" } }}
        >
          <Typography variant="body2">
            Powered by{" "}
            <Link
              href="https://coreui.io/react"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ color: "#fff", fontWeight: 600 }}
            >
              CoreUI React Client Template
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientFooter;
