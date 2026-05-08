"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DraftsIcon from "@mui/icons-material/Drafts";
import InboxIcon from "@mui/icons-material/Inbox";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 68;

const menuItems = [
  { label: "Dashboard", path: "/newrequest", icon: <DashboardIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Notice Board", path: "/client/noticeboard", icon: <AnnouncementIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Create New Request / Upload Your Work Order", path: "/client/clientnewrequist", icon: <AddCircleOutlineIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Draft Request", path: "/client/forward", action: "get_not_forwarded", icon: <DraftsIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Rejected List / Inbox", path: "/client/forward", action: "get_rejected", icon: <InboxIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Under Processing Request", path: "/client/forward", action: "get_under_process", icon: <HourglassEmptyIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Accepted Request", path: "/client/forward", action: "get_all_accepted", icon: <CheckCircleOutlineIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Unaccepted Request", path: "/client/forward", action: "get_all_unaccepted", icon: <CancelOutlinedIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Completed Work", path: "/Forward-Request", icon: <TaskAltIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Report", path: "/client/report", icon: <BarChartIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "News Paper Rate List", path: "/client/newsratelist", icon: <NewspaperIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Generated Bill List / Outstanding / Payment Details", path: "/Forward-Request", icon: <ReceiptLongIcon sx={{ fontSize: "1.2rem" }} /> },
];

const footerItems = [
  { label: "About Us", path: "/aboutus", icon: <InfoOutlinedIcon sx={{ fontSize: "1.2rem" }} /> },
  { label: "Help Desk", path: "/helpdesk", icon: <HeadsetMicOutlinedIcon sx={{ fontSize: "1.2rem" }} /> },
];

const ClientSideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isActive = (path, action) => {
    if (action) return pathname === path && searchParams.get("action") === action;
    return pathname === path;
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   sessionStorage.clear();
  //   router.push("/login");
  // };
  
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };


  const NavItem = ({ item }) => {
    const href = item.action ? `${item.path}?action=${item.action}` : item.path;
    const active = isActive(item.path, item.action);

    return (
      <Tooltip title={isCollapsed ? item.label : ""} placement="right">
        <ListItemButton
          component={Link}
          href={href}
          sx={{
            borderRadius: "12px",
            mb: 0.5,
            py: 1,
            px: 1.2,
            gap: 1.5,
            justifyContent: isCollapsed ? "center" : "flex-start",
            bgcolor: active ? "rgba(255,255,255,0.18)" : "transparent",
            border: active ? "1px solid rgba(255,255,255,0.35)" : "1px solid transparent",
            color: active ? "#FFFFFF" : "#CBD5E1",
            transition: "all 0.25s ease",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.12)",
              transform: "translateX(4px)",
              color: "#FFFFFF",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: active ? "#F4C430" : "inherit",
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            {item.icon}
          </Box>
          {!isCollapsed && (
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: "0.75rem",
                fontWeight: active ? 700 : 500,
                letterSpacing: "0.2px",
                lineHeight: 1.4,
              }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    );
  };

  return (
    <Box
      sx={{
        width: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        minWidth: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        transition: "width 0.3s ease, min-width 0.3s ease",
        background: "linear-gradient(180deg, #0F2027, #203A43, #2C5364)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "4px 0 12px rgba(0,0,0,0.35)",
        p: 1.5,
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      {/* ── Avatar Header ── */}
      {!isCollapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
            pb: 2,
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            flexShrink: 0,
          }}
        >
          <Avatar
            sx={{
              width: 68,
              height: 68,
              mb: 1.2,
              bgcolor: "rgba(255,255,255,0.15)",
              border: "3px solid rgba(255,255,255,0.35)",
              fontSize: "1.6rem",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            CL
          </Avatar>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "1rem", color: "#FFFFFF", textAlign: "center", mb: 0.3 }}
          >
            Client Portal
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", textAlign: "center" }}
          >
            Client Dashboard
          </Typography>
        </Box>
      )}

      {/* ── Collapsed Avatar ── */}
      {isCollapsed && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1.5, flexShrink: 0 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.35)",
              fontSize: "1rem",
              fontWeight: 700,
            }}
          >
            CL
          </Avatar>
        </Box>
      )}

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
            onClick={() => setIsCollapsed((prev) => !prev)}
            size="small"
            sx={{
              color: "#E6EDF3",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Scrollable Nav List ── */}
      <Box
        sx={{
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
        <List disablePadding>
          {menuItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}

          <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.12)" }} />

          {footerItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </List>
      </Box>

      {/* ── Logout — pinned bottom ── */}
      <Box sx={{ flexShrink: 0, mt: 1 }}>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.15)", mb: 1.5 }} />
        {isCollapsed ? (
          <Tooltip title="Logout" placement="right">
            <IconButton
              onClick={handleLogout}
              sx={{
                width: "100%",
                borderRadius: "12px",
                py: 1,
                color: "#FF6B6B",
                border: "1px solid rgba(255,107,107,0.3)",
                "&:hover": {
                  bgcolor: "rgba(255,107,107,0.12)",
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
            onClick={handleLogout}
            sx={{
              bgcolor: "rgba(255,107,107,0.15)",
              color: "#FF6B6B",
              borderRadius: "12px",
              py: 1,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "0.88rem",
              border: "1px solid rgba(255,107,107,0.35)",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "rgba(255,107,107,0.25)",
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
};

export default ClientSideNav;