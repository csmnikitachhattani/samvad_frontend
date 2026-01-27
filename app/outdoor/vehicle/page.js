"use client";
<<<<<<< HEAD
import React, { useState } from "react";
import VehickeList from '@/components/outdoor/Vehicle/table'
import CreateEditModal from '@/components/outdoor/Vehicle/createEditModal'


=======
import React, { useEffect, useState } from "react";
import outdoorService from "@/services/outdoorServices";
import CreateEditModal from '@/components/outdoor/vehicle/createEditModal'
import VehicleTables from '@/components/outdoor/vehicle/VehicleList'
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
import {
  Box,
} from "@mui/material";

const DisplayBoardTable = () => {
  const [data, setData] = useState([]);

 

  return (
<<<<<<< HEAD
    <Box sx={{}}>
        <CreateEditModal />
        <VehickeList />
=======
    <Box sx={{ p: 4, backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <VehicleTables />
      <CreateEditModal />
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
    </Box>
  );
};

export default DisplayBoardTable;