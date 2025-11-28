"use client";
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const AdvertisementCard = () => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 420,
        borderLeft: "5px solid #F97316", // Orange primary highlight
        borderRadius: "14px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        background: "#fff",
      }}
    >
      <CardContent>
        {/* Header */}
        <Typography
          fontWeight="bold"
          fontSize={18}
          color="#F97316"
          mb={2}
        >
          RO No: 459852
        </Typography>

        {/* Row - Subject */}
        <Box mb={1}>
          <Typography fontWeight={600} color="text.secondary">
            Subject:
          </Typography>
          <Typography>TENDER</Typography>
        </Box>

        {/* Row - Client */}
        <Box mb={1}>
          <Typography fontWeight={600} color="text.secondary">
            Client:
          </Typography>
          <Typography>
            EXECUTIVE ENGINEER SSI DIV – II <br />
            CGPPD, RAIPUR
          </Typography>
        </Box>

        {/* Row - NP Name */}
        <Box>
          <Typography fontWeight={600} color="text.secondary">
            NP Name:
          </Typography>
          <Typography>AMRIT SANDESH – RAIPUR</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdvertisementCard;
