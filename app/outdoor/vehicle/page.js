"use client";
import React, { useEffect, useState } from "react";
import outdoorService from "@/services/outdoorServices";
import CreateEditModal from '@/components/outdoor/vehicle/createEditModal'
import VehicleTables from '@/components/outdoor/vehicle/VehicleList'
import {
  Box,
} from "@mui/material";

const DisplayBoardTable = () => {
  const [data, setData] = useState([]);

 

  return (
    <Box sx={{ p: 4, backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <VehicleTables />
      <CreateEditModal />
    </Box>
  );
};

export default DisplayBoardTable;