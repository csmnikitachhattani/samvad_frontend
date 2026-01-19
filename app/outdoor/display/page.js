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
    <Box p={3}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Display Board List
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Board No</TableCell>
              <TableCell>Agency</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>State</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Facing</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Timing</TableCell>
              <TableCell>Rate / Month</TableCell>
              <TableCell>Validity</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow hover key={item.displayBoardID}>
                  <TableCell>{item.displayBoardID}</TableCell>

                  <TableCell>
                    <Typography fontWeight={600} color="primary">
                      {item.displayBoardNo}
                    </Typography>
                  </TableCell>

                  <TableCell>{item.agencyName}</TableCell>
                  <TableCell>{item.locationName}</TableCell>
                  <TableCell>{item.stateName}</TableCell>
                  <TableCell>{item.districtName}</TableCell>
                  <TableCell>{item.facing}</TableCell>

                  <TableCell>
                    <Chip
                      label={item.isAvailable ? "Available" : "Not Available"}
                      color={item.isAvailable ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {item.startTime} – {item.endTime}
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={600} color="success.main">
                      ₹ {item.ratePerMonth}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {item.validityFrom}
                    <br />
                    → {item.validityTo}
                  </TableCell>

                  <TableCell>
                    {item.imagepath ? (
                      <Avatar
                        variant="rounded"
                        src={item.imagepath}
                        sx={{ width: 70, height: 45 }}
                      />
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
    </Box>
  );
};

export default DisplayBoardTable;
