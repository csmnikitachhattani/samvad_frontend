"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Paper,
} from "@mui/material";

import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  DollarSign,
  ShoppingCart,
  UserPlus,
  Calendar,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: "Total RO",
      value: "45,231",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "#6366f1",
    },
    {
      title: "Published RO",
      value: "2,345",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "#a855f7",
    },
    {
      title: "Pending RO",
      value: "1,234",
      change: "-5.2%",
      trend: "down",
      icon: ShoppingCart,
      color: "#ec4899",
    },
    {
      title: "Rejected RO",
      value: "456",
      change: "+12.5%",
      trend: "up",
      icon: UserPlus,
      color: "#3b82f6",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb" }}>
      {/* HEADER */}
      <Box
        sx={{
          bgcolor: "white",
          border: "1px solid #e5e7eb",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </IconButton>

          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              width: 260,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          <IconButton>
            <Bell size={20} />
          </IconButton>

          <Button
            variant="contained"
            sx={{
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              textTransform: "none",
            }}
          >
            New Project
          </Button>
        </Box>
      </Box>

      {/* MAIN CONTENT */}
      <Box sx={{ p: 2 }}>
        {/* Welcome Section */}
        <Box mb={4}>
          <Typography variant="h5" fontWeight="bold" color="#1f2937">
            Welcome back, Client  👋
          </Typography>
          <Typography color="gray">Here’s what’s happening today.</Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={2} justifyContent="space-between">
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                  width: "300px",
                  ":hover": {
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: "12px",
                      bgcolor: stat.color,
                      display: "flex",
                    }}
                  >
                    <stat.icon size={20} color="white" />
                  </Box>

                  <IconButton size="small">
                    <MoreVertical size={20} />
                  </IconButton>
                </Box>

                <Typography color="gray" variant="subtitle2">
                  {stat.title}
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mt: 1, color: "#1f2937" }}
                >
                  {stat.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
