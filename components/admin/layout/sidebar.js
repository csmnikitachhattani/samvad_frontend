"use client";
import { Box, List, ListItemButton, ListItemText, Divider, Button, Avatar, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard"


import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";


export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

const [openMenu, setOpenMenu] = useState(null);

// better active check for nested routes
const isActive = (path) => pathname.startsWith(path);
  const menuItems = [
    { 
      label: "Dashboard", 
      path: "/admin",
      icon: <DashboardIcon sx={{ mr: 2, fontSize: "1.4rem" }} /> 
    },
    {
      label: "Agency",
      path: "/admin/agency",
      icon: <PersonIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Agency User",
      path: "/admin/agency/agencyuser",
      icon: <PersonIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Display Boards",
      path: "/admin/display",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Vehicle Boards",
      path: "/admin/vehicle",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Mini Bus Boards",
      path: "/admin/bus",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "request",
      path: "/admin/request",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Avak",
      path: "/admin/avak",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Counter",
      path: "/admin/counter",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Allocated",
      path: "/admin/allocation",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Workorders",
      path: "/admin/workorder",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Bill Entry",
      path: "/newspaper/bill-entry",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
   
  ];

  return (
    <Box
      sx={{
      
        color: "#fff",
        background: "#030236",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",    
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
            AP
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.15rem", textAlign: "center", mb: 0.5 }}>
            Admin Portal
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.85rem", opacity: 0.9, textAlign: "center" }}>
            Admin Dashboard
          </Typography>
        </Box>

  

    <List sx={{ px: 0 }}>
  {menuItems.map((item) => {
    const hasSubmenu = Array.isArray(item.submenu);

    return (
      <Box key={item.label}>
        {/* Parent Menu */}
        <ListItemButton
          onClick={() => {
            if (hasSubmenu) {
              setOpenMenu(openMenu === item.label ? null : item.label);
            } else {
              router.push(item.path);
            }
          }}
          sx={{
            borderRadius: "12px",
            mb: 0.5,py: 1,px: 1,bgcolor:isActive(item.path) || openMenu === item.label
                ? "rgba(255,255,255,0.25)"
                : "transparent",
            border:
              isActive(item.path) || openMenu === item.label
                ? "1px solid rgba(255,255,255,0.4)"
                : "1px solid transparent",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
              transform: "translateX(6px)",
            },
          }}
        >
          {item.icon}
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
          {hasSubmenu &&
            (openMenu === item.label ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>

        {/* Submenu */}
        {hasSubmenu && (
          <Collapse in={openMenu === item.label} timeout="auto" unmountOnExit>
            <List sx={{ pl: 4 }}>
              {item.submenu.map((sub) => (
                <ListItemButton
                  key={sub.path}
                  onClick={() => router.push(sub.path)}
                  sx={{
                    borderRadius: "10px",
                    mb: 0.5,
                    py: 0.75,
                    bgcolor: isActive(sub.path)
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  <ListItemText
                    primary={sub.label}
                    primaryTypographyProps={{
                      fontSize: "0.7rem",
                      fontWeight: isActive(sub.path) ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  })}
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