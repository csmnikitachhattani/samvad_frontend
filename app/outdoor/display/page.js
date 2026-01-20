"use client";
import React, { useEffect, useState } from "react";
import outdoorService from "@/services/outdoorServices";

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
    <Box
      sx={{
        p: 4,
        background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
        sx={{ letterSpacing: "0.3px" }}
      >
        📊 Display Boards Overview
      </Typography>

      {/* Card */}
      <Paper
        elevation={6}
        sx={{
          borderRadius: "22px",
          overflow: "hidden",
          p: 2,
        }}
      >
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader>
            {/* Table Header */}
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
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #6366f1, #4f46e5)",
                      color: "#fff",
                      borderBottom: "none",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow
                    key={item.displayBoardID}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f1f5f9",
                      },
                    }}
                  >
                    <TableCell>{item.displayBoardID}</TableCell>

                    <TableCell>
                      <Typography fontWeight={700} color="#4f46e5">
                        {item.displayBoardNo}
                      </Typography>
                    </TableCell>

                    <TableCell>{item.agencyName}</TableCell>
                    <TableCell>{item.locationName}</TableCell>
                    <TableCell>{item.stateName}</TableCell>
                    <TableCell>{item.districtName}</TableCell>
                    <TableCell>{item.facing}</TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        label={
                          item.isAvailable ? "Available" : "Not Available"
                        }
                        sx={{
                          borderRadius: "999px",
                          px: 1.5,
                          fontWeight: 600,
                          backgroundColor: item.isAvailable
                            ? "#dcfce7"
                            : "#fee2e2",
                          color: item.isAvailable ? "#166534" : "#991b1b",
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      {item.startTime} – {item.endTime}
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={700} color="#16a34a">
                        ₹ {item.ratePerMonth}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {item.validityFrom}
                      <br />
                      → {item.validityTo}
                    </TableCell>

                    {/* Image */}
                    <TableCell>
                      {item.imagepath ? (
                        <Paper
                          elevation={4}
                          sx={{
                            borderRadius: "14px",
                            overflow: "hidden",
                            width: 76,
                            height: 50,
                          }}
                        >
                          <Avatar
                            src={item.imagepath}
                            variant="square"
                            sx={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </Paper>
                      ) : (
                        "-"
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
