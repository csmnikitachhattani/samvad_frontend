"use client";

import React from "react";
import { Box } from "@mui/material";
import RealeaseOrder from "@/components/Newspaper/RealeaseOrder/RealeaseOrderList";
import { increment, decrement } from "@/store/modules/newspaper/realeaseSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function NewspaperPage() {
  const value = useSelector((state) => state.realease.value);
  const dispatch = useDispatch();

  return (
    <Box sx={{ p: 0 }}>
      <p>{value}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <RealeaseOrder />
    </Box>
  );
}
