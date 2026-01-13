"use client";
import { Box, List, ListItemButton, ListItemText, Divider, Button, Avatar, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard"

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;
  const menuItems = [
    { 
      label: "Dashboard", 
      path: "/newspaper",
      icon: <DashboardIcon sx={{ mr: 2, fontSize: "1.4rem" }} /> 
    },
    {
      label: "Profile",
      path: "/newspaper/profile",
      icon: <PersonIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Release Order",
      path: "/newspaper/release-order",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Bill Entry",
      path: "/newspaper/bill-entry",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    // Add more items here
  ];

  return (
    <Box
      sx={{
        // width intentionally removed here — parent sets width
        color: "#fff",
        background: "linear-gradient(180deg, #FF7A00 0%, #FF3D00 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",    // *use 100%* so it fills the parent's height
        p: 2.5,
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      {/* Top Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
            pb: 3,
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 1.5,
              bgcolor: "rgba(255, 255, 255, 0.25)",
              border: "3px solid rgba(255, 255, 255, 0.5)",
              fontSize: "2rem",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            NP
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.15rem", textAlign: "center", mb: 0.5 }}>
            Admin Portal
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.85rem", opacity: 0.9, textAlign: "center" }}>
            Admin Dashboard
          </Typography>
        </Box>

        <List sx={{ px: 0 }}>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.path}
          onClick={() => router.push(item.path)}
          sx={{
            borderRadius: "12px",
            mb: 0.5,
            py: 1,
            px: 1,
            bgcolor: isActive(item.path) ? "rgba(255,255,255,0.25)" : "transparent",
            border: isActive(item.path) ? "1px solid rgba(255,255,255,0.4)" : "1px solid transparent",
            transition: "all 0.3s",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)", transform: "translateX(6px)" },
          }}
        >
          {item.icon}
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontWeight: isActive(item.path) ? 600 : 500,
              fontSize: "0.75rem",
            }}
          />
        </ListItemButton>
      ))}
    </List>
      </Box>

      {/* Bottom Section */}
      <Box>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.25)", mb: 2 }} />
        <Button
          fullWidth
          variant="contained"
          startIcon={<LogoutIcon />}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.15)",
            color: "#fff",
            borderRadius: "12px",
            py: 1,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "0.95rem",
            border: "1px solid rgba(255,255,255,0.3)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.25)", transform: "translateY(-2px)" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
