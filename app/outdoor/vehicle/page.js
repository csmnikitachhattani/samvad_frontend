"use client";
import React, { useState } from "react";
import VehickeList from '@/components/outdoor/Vehicle/table'
import CreateEditModal from '@/components/outdoor/Vehicle/createEditModal'


import {
  Box,
} from "@mui/material";

const DisplayBoardTable = () => {
  const [data, setData] = useState([]);

 

  return (
    <Box sx={{}}>
        <CreateEditModal />
        <VehickeList />
    </Box>
  );
};

export default DisplayBoardTable;