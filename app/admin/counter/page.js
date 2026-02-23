"use client";
import React from "react";
import {useEffect } from 'react'
import Table from "@/components/admin/counter/table";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

function AdminIndex() {
  const router = useRouter();
  async function getPublicIP() {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    console.log(data.ip);
  }
  useEffect(()=>{
    getPublicIP()
  })
  
  return (
    <Box>
      {/* Top bar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => router.push("/admin/counter/create")}
          sx={{  background: "#010a2a",
          color: "#fff",
          textTransform: "capitalize",}}
        >
          Create Counter
        </Button>
      </Box>

      {/* Table */}
      <Box sx={{ width: "100%" }}>
        <Table />
      </Box>
    </Box>
  );
}

export default AdminIndex;
