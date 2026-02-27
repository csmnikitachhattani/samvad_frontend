"use client";
import React from "react";
import Table from "@/components/admin/table"
import { useRouter } from "next/navigation";
import {
  Box,
  Divider,
  Button
} from "@mui/material";

function AdminIndex() {
  const router = useRouter();
  return (
  <Box>

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
          onClick={() => router.push("/admin/agency/create")}
          sx={{  background: "#010a2a",
          color: "#fff",
          textTransform: "capitalize",
          borderRadius: "8px",
          padding: "4px, 10px"
        }}
        >
          Create Agency
        </Button>
      </Box>
    <Box sx={{width: "100%"}}>
      <Table />
    </Box>
  </Box>
  );
}

export default AdminIndex;
