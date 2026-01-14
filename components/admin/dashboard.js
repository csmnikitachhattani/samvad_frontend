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
import { useRouter, usePathname } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
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
        {/* QUICK ACTIONS */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" fontWeight="bold" mb={2}>
    Quick Actions
  </Typography>

  <Grid container spacing={3}>
    {[
      {
        title: "Create Agency",
        desc: "Add and manage advertising agencies",
        icon: Users,
        color: "#6366f1",
        btn: "Add Agency",
        path: "/admin/agency"
      },
      {
        title: "Create Newspaper",
        desc: "Register newspapers & editions",
        icon: FileText,
        color: "#22c55e",
        btn: "Add Newspaper",
      },
      {
        title: "Create Client",
        desc: "Manage advertiser clients",
        icon: UserPlus,
        color: "#f59e0b",
        btn: "Add Client",
      },
      {
        title: "Create RO",
        desc: "Release new advertisement orders",
        icon: Calendar,
        color: "#ec4899",
        btn: "Create RO",
      },
    ].map((item, i) => (
      <Grid item size={{xs:12, sm:6, md:3}} key={i}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "0.3s",
            ":hover": {
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
              transform: "translateY(-4px)",
            },
          }}
        >
          <Box>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                bgcolor: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <item.icon color="white" size={22} />
            </Box>

            <Typography fontWeight="bold" color="#111827">
              {item.title}
            </Typography>

            <Typography variant="body2" color="gray" mt={0.5}>
              {item.desc}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            sx={{
              mt: 3,
              borderRadius: "12px",
              textTransform: "none",
              borderColor: item.color,
              color: item.color,
              ":hover": {
                bgcolor: item.color,
                color: "white",
              },
            }}
            onClick={() => router.push(item.path)}
            fullWidth
            
          >
            {item.btn}
          </Button>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>

    </Box>
  );
}
