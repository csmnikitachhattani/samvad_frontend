"use client";
import React from "react";
import Dashboard from "@/components/Newspaper/dashboard"
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
    <Box>
      <Dashboard />
    </Box>
    <Card
      sx={{
        p: 3,
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mb: 2,
          bgcolor: "#000",
          color: "#fff",
          p: 1.2,
          borderRadius: "8px",
        }}
      >
        Release Order Listing
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8f9fa" }}>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                Newspaper Title
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                    transition: "0.3s ease",
                  },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{row.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary">
          Showing {mockData.length} newspaper titles
        </Typography>
      </Box>
    </Card>
  </Box>
  );
}

export default ReleaseOrderListing;
