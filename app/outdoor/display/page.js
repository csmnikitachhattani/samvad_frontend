"use client";
import React, { useEffect, useState } from "react";
import outdoorService from "@/services/outdoorServices";
import CreateEditModal from "@/components/outdoor/display/createEditModal"

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";

const DisplayBoardTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await outdoorService.getalldisplayboards();
        setData(response?.result || []);
      } catch (error) {
        console.error("Failed to fetch display boards", error);
      }
    };
    fetchBoards();
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: "#fafafa", minHeight: "100vh" }}>
      {/* Header */}
      <Typography 
        variant="h5" 
        fontWeight={600} 
        mb={3}
        sx={{ 
          color: "#111827",
          letterSpacing: "-0.02em"
        }}
      >
        Display Boards
      </Typography>

      {/* Card */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <TableContainer sx={{ maxHeight: "75vh" }}>
          <Table stickyHeader size="medium">
            {/* Header */}
            <TableHead>
              <TableRow>
                {[
                  "ID",
                  "Board No",
                  "Agency",
                  "Location",
                  "State",
                  "District",
                  "Facing",
                  "Status",
                  "Timing",
                  "Rate",
                  "Validity",
                  "Image",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.813rem",
                      backgroundColor: "#fafafa",
                      color: "#6b7280",
                      borderBottom: "1px solid #e5e7eb",
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      py: 2,
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={12} 
                    align="center"
                    sx={{ 
                      py: 8,
                      color: "#9ca3af",
                      fontSize: "0.938rem"
                    }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  <TableRow
                    key={item.displayBoardID}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f9fafb",
                      },
                      borderBottom: index === data.length - 1 ? "none" : "1px solid #f3f4f6",
                    }}
                  >
                    <TableCell sx={{ color: "#9ca3af", fontSize: "0.875rem" }}>
                      {item.displayBoardID}
                    </TableCell>

                    <TableCell sx={{ 
                      fontWeight: 600,
                      color: "#111827",
                      fontSize: "0.875rem"
                    }}>
                      {item.displayBoardNo}
                    </TableCell>

                    <TableCell sx={{ color: "#374151", fontSize: "0.875rem" }}>
                      {item.agencyName}
                    </TableCell>
                    
                    <TableCell sx={{ color: "#374151", fontSize: "0.875rem" }}>
                      {item.locationName}
                    </TableCell>
                    
                    <TableCell sx={{ color: "#6b7280", fontSize: "0.875rem" }}>
                      {item.stateName}
                    </TableCell>
                    
                    <TableCell sx={{ color: "#6b7280", fontSize: "0.875rem" }}>
                      {item.districtName}
                    </TableCell>
                    
                    <TableCell sx={{ color: "#374151", fontSize: "0.875rem" }}>
                      {item.facing}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        size="small"
                        label={item.isAvailable ? "Available" : "Unavailable"}
                        sx={{
                          backgroundColor: item.isAvailable ? "#f0fdf4" : "#f9fafb",
                          color: item.isAvailable ? "#166534" : "#6b7280",
                          border: `1px solid ${item.isAvailable ? "#bbf7d0" : "#e5e7eb"}`,
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: "24px",
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ 
                      color: "#6b7280",
                      fontSize: "0.813rem",
                      whiteSpace: "nowrap"
                    }}>
                      {item.startTime} – {item.endTime}
                    </TableCell>

                    <TableCell sx={{ 
                      fontWeight: 600,
                      color: "#111827",
                      fontSize: "0.875rem"
                    }}>
                      ₹{item.ratePerMonth?.toLocaleString()}
                    </TableCell>

                    <TableCell sx={{ 
                      fontSize: "0.813rem",
                      color: "#6b7280",
                      lineHeight: 1.6
                    }}>
                      {item.validityFrom}
                      <br />
                      {item.validityTo}
                    </TableCell>

                    {/* Image */}
                    <TableCell>
                      {item.imagepath ? (
                        <Avatar
                          src={item.imagepath}
                          variant="rounded"
                          sx={{ 
                            width: 64, 
                            height: 40,
                            border: "1px solid #e5e7eb"
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 64,
                            height: 40,
                            borderRadius: 1,
                            border: "1px solid #e5e7eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#d1d5db",
                            fontSize: "0.75rem"
                          }}
                        >
                          —
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <CreateEditModal />
    </Box>
  );
};

export default DisplayBoardTable;