"use client";
import React from "react";
import Dashboard from "@/components/Newspaper/dashboard"
import NoticeBoard from "@/components/Newspaper/noticeboard"
import {
  Box,
  Card,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function ReleaseOrderListing() {
  // Mock data
  const mockData = [
    { id: 1, title: "Dainik Bhaskar" },
    { id: 2, title: "Patrika" },
    { id: 3, title: "Navbharat Times" },
    { id: 4, title: "Haribhoomi" },
    { id: 5, title: "The Hitavada" },
  ];

  return (
  <Box>
    <Box sx={{width: "100%"}}>
      <Dashboard />
    </Box>
    <Box>
    <Divider sx={{ mb: 3 }} />
      <NoticeBoard />
    </Box>
  </Box>
  );
}

export default ReleaseOrderListing;
