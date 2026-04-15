"use client";

import { Box } from "@mui/material";
import Sidebar from "@/Layout/AdminLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem("loginusertypename");

    if (!userType || userType !== "Department") {
      router.push("/auth/login"); // redirect if not authorized
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#f9fafb",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}