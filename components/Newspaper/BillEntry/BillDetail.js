"use client";
import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

const BillDetailCard = () => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "12px",
        padding: 1,
        border: "2px solid #F97316",
        background: "#fff",
        boxShadow: "none",
      }}
    >
      <CardContent>

        {/* Title */}
        <Typography
          fontWeight="bold"
          fontSize={18}
          color="#F97316"
          mb={2}
          sx={{ borderLeft: "4px solid #F97316", paddingLeft: "8px" }}
        >
          Bill Detail
        </Typography>

        {/* RO DETAILS */}
        <Box mb={3}>
          <Typography
            fontWeight="600"
            color="#F97316"
            mb={1}
            fontSize={15}
          >
            RO DETAILS
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <DetailRow label="Publish Size" value="8 X 8 SC" />
              <DetailRow label="Publish Date" value="20/11/2025" />
              <DetailRow label="Printing Type" value="B & W" />
            </Grid>
            <Grid item xs={6}>
              <DetailRow label="Printing Page" value="Normal Page" />
              <DetailRow label="Rate Type" value="CSEB RATE" />
              <DetailRow label="Bill Rate" value="71.08" />
              <DetailRow label="Bill Amount" value="4549.12" />
            </Grid>
          </Grid>
        </Box>

        {/* GST DETAILS */}
        <Box>
          <Typography
            fontWeight="600"
            color="#F97316"
            mb={1}
            fontSize={15}
          >
            GST DETAILS
          </Typography>

          <DetailRow label="GST Legal Name" value="PRAGATI PRAKASHAN PVT LTD" />
          <DetailRow label="GST Number" value="22AABCP3698R2ZQ" />
          <DetailRow label="GST State" value="Chhattisgarh" />
        </Box>

      </CardContent>
    </Card>
  );
};

export default BillDetailCard;

/* Helper Component */
const DetailRow = ({ label, value }) => (
  <Box display="flex" alignItems="center" mb={0.8}>
    <Typography
      width="130px"
      fontWeight={600}
      color="#444"
      fontSize={14}
    >
      {label} :
    </Typography>
    <Typography fontSize={14} color="#222">
      {value}
    </Typography>
  </Box>
);
