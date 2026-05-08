"use client";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Link from "next/link";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 68;

const menuItems = [
  { label: "Dashboard", path: "/admin", icon: <DashboardIcon sx={{ fontSize: "1.3rem" }} /> },
  { label: "Agency", path: "/admin/agency", icon: <PersonIcon sx={{ fontSize: "1.3rem" }} /> },
  { label: "Agency User", path: "/admin/agency/agencyuser", icon: <PersonIcon sx={{ fontSize: "1.3rem" }} /> },
  { label: "Vehicle Boards", path: "/admin/vehicle", icon: <DescriptionIcon sx={{ fontSize: "1.3rem" }} /> },
  { label: "Mini Bus Boards", path: "/admin/bus", icon: <DescriptionIcon sx={{ fontSize: "1.3rem" }} /> },
  { label: "Request", path: "/admin/request", icon: <DescriptionIcon sx={{ fontSize: "1.3rem" }} /> },
  { label: "Avak", path: "/admin/avak", icon: <DescriptionIcon sx={{ fontSize: "1.3rem" }} /> },
  { label: "Counter", path: "/admin/counter", icon: <DescriptionIcon sx={{ fontSize: "1.3rem" }} /> },
  { label: "Allocated", path: "/admin/allocation", icon: <DescriptionIcon sx={{ fontSize: "1.3rem" }} /> },
  { label: "Workorders", path: "/admin/workorder", icon: <DescriptionIcon sx={{ fontSize: "1.3rem" }} /> },
  { label: "Bill Entry", path: "/newspaper/bill-entry", icon: <DescriptionIcon sx={{ fontSize: "1.3rem" }} /> },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => pathname.startsWith(path);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        minWidth: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        transition: "width 0.3s ease, min-width 0.3s ease",
        color: "#fff",
        background: "#030236",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        boxShadow: "4px 0 12px rgba(0,0,0,0.35)",
        p: isCollapsed ? 1 : 2.5,
      }}
    >
      {/* ── Toggle Button ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: isCollapsed ? "center" : "flex-end",
          mb: 1,
          flexShrink: 0,
        }}
      >
        <Tooltip title={isCollapsed ? "Expand" : "Collapse"} placement="right">
          <IconButton
            onClick={() => {
              setIsCollapsed((prev) => !prev);
              // close any open submenu when collapsing
              if (!isCollapsed) setOpenMenu(null);
            }}
            size="small"
            sx={{
              color: "#fff",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Top Section (header + scrollable list) ── */}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>

        {/* ── Avatar Header ── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: isCollapsed ? 1.5 : 3,
            pb: isCollapsed ? 1.5 : 3,
            flexShrink: 0,
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Avatar
            sx={{
              width: isCollapsed ? 40 : 80,
              height: isCollapsed ? 40 : 80,
              mb: isCollapsed ? 0 : 1.5,
              bgcolor: "rgba(255,255,255,0.25)",
              border: isCollapsed
                ? "2px solid rgba(255,255,255,0.35)"
                : "3px solid rgba(255,255,255,0.5)",
              fontSize: isCollapsed ? "1rem" : "2rem",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            AP
          </Avatar>

          {!isCollapsed && (
            <>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: "1.15rem", textAlign: "center", mb: 0.5 }}
              >
                Admin Portal
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.85rem", opacity: 0.9, textAlign: "center" }}
              >
                Admin Dashboard
              </Typography>
            </>
          )}
        </Box>

        {/* ── Scrollable Menu List ── */}
        <List
          sx={{
            px: 0,
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": { width: 4 },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.2)",
              borderRadius: 4,
            },
          }}
        >
          {menuItems.map((item) => {
            const hasSubmenu = Array.isArray(item.submenu);
            const active = isActive(item.path);

            return (
              <Box key={item.label}>
                <Tooltip title={isCollapsed ? item.label : ""} placement="right">
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
                      mb: 0.5,
                      py: 1,
                      px: isCollapsed ? 1 : 1.2,
                      gap: isCollapsed ? 0 : 1.5,
                      justifyContent: isCollapsed ? "center" : "flex-start",
                      bgcolor:
                        active || openMenu === item.label
                          ? "rgba(255,255,255,0.25)"
                          : "transparent",
                      border:
                        active || openMenu === item.label
                          ? "1px solid rgba(255,255,255,0.4)"
                          : "1px solid transparent",
                      transition: "all 0.3s",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.2)",
                        transform: "translateX(6px)",
                      },
                    }}
                  >
                    {/* Icon */}
                    <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                      {item.icon}
                    </Box>

                    {/* Label */}
                    {!isCollapsed && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontWeight: 600, fontSize: "0.75rem" }}
                      />
                    )}

                    {/* Submenu arrow */}
                    {!isCollapsed && hasSubmenu &&
                      (openMenu === item.label ? <ExpandLess /> : <ExpandMore />)
                    }
                  </ListItemButton>
                </Tooltip>

                {/* ── Submenu (hidden when collapsed) ── */}
                {hasSubmenu && !isCollapsed && (
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
                            "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
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

      {/* ── Logout — pinned bottom ── */}
      <Box sx={{ flexShrink: 0 }}>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.25)", mb: 2, mt: 1 }} />

        {isCollapsed ? (
          <Tooltip title="Logout" placement="right">
            <IconButton
              onClick={logout}
              sx={{
                width: "100%",
                borderRadius: "12px",
                py: 1,
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.25s ease",
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            fullWidth
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={logout}
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: "12px",
              py: 1,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "0.95rem",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.25)",
                boxShadow: "none",
                transform: "translateY(-2px)",
              },
              transition: "all 0.25s ease",
            }}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
}