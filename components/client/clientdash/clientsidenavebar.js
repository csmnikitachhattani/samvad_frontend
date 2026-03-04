"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

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

const ClientSideNavbar = ({ isCollapsed }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (path, action) => {
    if (action) {
      return pathname === path && searchParams.get("action") === action;
    }
    return pathname === path;
  };

  const menuItems = [
    { label: "Dashboard", path: "/newrequest" },
    { label: "Notice Board", path: "/client/noticeboard" },
    {
      label: "Create New Request / Upload Your Work Order",
      path: "/client/clientnewrequist", // fixed typo
    },
    { label: "Rejected List / Inbox", 
       path: "/client/forward",
      action: "get_rejected", },

    // Requests with query params (Next.js way instead of state)
    {
      label: "Submited Requests",
      path: "/client/forward",
      action: "get_forwarded",
    },
    {
      label: "Draft Request",
      path: "/client/forward",
      action: "get_not_forwarded",
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

    { label: "Published Advertisement", path: "/Forward-Request" },
    { label: "Report", path: "/client/report" },
    // { label: "Check Status", path: "/client/newsratelist" },
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

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #0F2027, #203A43, #2C5364)",
        boxShadow: "4px 0 12px rgba(0,0,0,0.35)",
        height: "100%",
        overflowY: "auto", // allow scroll instead of hidden
      }}
    >
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

        <Divider
          sx={{
            my: 1.5,
            borderColor: "rgba(255,255,255,0.15)",
          }}
        />

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
  );
};

export default ClientSideNavbar;