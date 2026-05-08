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
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 56;

const navItemStyle = {
  color: "#E6EDF3",
  fontSize: "13px",
  borderRadius: "8px",
  mx: 0.5,
  my: 0.3,
  transition: "all 0.25s ease",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingLeft: "18px",
  },
  "&.Mui-selected": {
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
    color: "#FFFFFF",
    fontWeight: 600,
    borderLeft: "3px solid #F4C430",
  },
  "&.Mui-selected:hover": {
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))",
  },
};

const menuItems = [
  { label: "Dashboard", path: "/newrequest" },
  { label: "Notice Board", path: "/client/noticeboard" },
  {
    label: "Create New Request / Upload Your Work Order",
    path: "/client/clientnewrequist",
  },
  {
    label: "Draft Request",
    path: "/client/forward",
    action: "get_not_forwarded",
  },
  {
    label: "Rejected List / Inbox",
    path: "/client/forward",
    action: "get_rejected",
  },
  {
    label: "Under Processing Request",
    path: "/client/forward",
    action: "get_under_process",
  },
  {
    label: "Accepted Request",
    path: "/client/forward",
    action: "get_all_accepted",
  },
  {
    label: "Unaccepted Request",
    path: "/client/forward",
    action: "get_all_unaccepted",
  },
  { label: "Completed Work", path: "/Forward-Request" },
  { label: "Report", path: "/client/report" },
  { label: "News Paper Rate List", path: "/client/newsratelist" },
  {
    label: "Generated Bill List / Outstanding / Payment Details",
    path: "/Forward-Request",
  },
];

const footerItems = [
  { label: "About Us", path: "/aboutus" },
  { label: "Help Desk", path: "/helpdesk" },
];

const ClientSideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isActive = (path, action) => {
    if (action) {
      return pathname === path && searchParams.get("action") === action;
    }
    return pathname === path;
  };

  const handleLogout = () => {
    // Clear your auth tokens/session here
    localStorage.removeItem("token");
    sessionStorage.clear();
    router.push("/login");
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
      }}
    >
      {/* Toggle Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: isCollapsed ? "center" : "flex-end",
          px: isCollapsed ? 0 : 1,
          pt: 1,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Tooltip
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          placement="right"
        >
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

      {/* Nav Items */}
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        <List disablePadding sx={{ p: 1 }}>
          {menuItems.map((item, index) => {
            const href = item.action
              ? `${item.path}?action=${item.action}`
              : item.path;

            return (
              <ListItemButton
                key={index}
                component={Link}
                href={href}
                selected={isActive(item.path, item.action)}
                sx={navItemStyle}
              >
                {!isCollapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "13px",
                      letterSpacing: "0.3px",
                      lineHeight: 1.4,
                    }}
                  />
                )}
              </ListItemButton>
            );
          })}

          <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.15)" }} />

          {footerItems.map((item, index) => (
            <ListItemButton
              key={index}
              component={Link}
              href={item.path}
              selected={isActive(item.path)}
              sx={navItemStyle}
            >
              {!isCollapsed && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "13px",
                    letterSpacing: "0.3px",
                  }}
                />
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Logout Button — pinned to bottom */}
      <Box
        sx={{
          p: 1,
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Tooltip title="Logout" placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              ...navItemStyle,
              color: "#FF6B6B",
              borderRadius: "8px",
              justifyContent: isCollapsed ? "center" : "flex-start",
              "&:hover": {
                backgroundColor: "rgba(255,107,107,0.12)",
                paddingLeft: isCollapsed ? undefined : "18px",
              },
            }}
          >
            <LogoutIcon fontSize="small" />
            {!isCollapsed && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: "13px",
                  letterSpacing: "0.3px",
                  ml: 1.5,
                  color: "#FF6B6B",
                  fontWeight: 500,
                }}
                sx={{ ml: 1.5 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ClientSideNav;