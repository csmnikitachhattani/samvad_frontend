"use client";
import React, { useEffect, useState } from "react";
import outdoorService from "@/services/outdoorServices";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
        const response = await outdoorService.getAllvehicle();
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
      {/* <Typography 
        variant="h5" 
        fontWeight={600} 
        mb={3}
        sx={{ 
          color: "#111827",
          letterSpacing: "-0.02em"
        }}
      >
        Vehicle Boards 
      </Typography> */}
      <Box
  sx={{
    mb: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
  <Typography
    variant="h5"
    fontWeight={600}
    sx={{ color: "#111827", letterSpacing: "-0.02em" }}
  >
    Vehicle Boards
  </Typography>

  <Button
    variant="contained"
    startIcon={<AddIcon />}
    sx={{
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 2,
      px: 2.5,
      backgroundColor: "#111827",
      "&:hover": {
        backgroundColor: "#000000",
      },
    }}
    onClick={() => {
      // open create vehicle dialog
      console.log("Create Vehicle Clicked");
    }}
  >
    Create Vehicle
  </Button>
</Box>


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
                  "Vehicle No",
                  "Agency",
                  "Owner Name",
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
                      {item.VehicleId}
                    </TableCell>

                    <TableCell sx={{ 
                      fontWeight: 600,
                      color: "#111827",
                      fontSize: "0.875rem"
                    }}>
                      {item.VehicleNo}
                    </TableCell>

                    <TableCell sx={{ color: "#374151", fontSize: "0.875rem" }}>
                      {item.AgencyName}
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
                      {item.FitnessUpto}
                      <br />
                      {item.InsuranceUpto}
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
    </Box>
  );
};

export default DisplayBoardTable;