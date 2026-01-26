"use client";
import React, { useEffect, useState } from "react";
import outdoorService from "@/services/outdoorServices";
import CreateEditModal from '@/components/outdoor/vehicle/createEditModal'
import VehicleTables from '@/components/outdoor/vehicle/VehicleList'
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
      <VehicleTables />
      <CreateEditModal />
    </Box>
  );
};

export default DisplayBoardTable;