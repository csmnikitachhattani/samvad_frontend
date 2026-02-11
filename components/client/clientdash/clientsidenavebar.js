"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
  const [openProfile, setOpenProfile] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #0F2027, #203A43, #2C5364)",
        boxShadow: "4px 0 12px rgba(0,0,0,0.35)",
        height: "100%", 
        overflow: "hidden"
      }}
    >
      <List disablePadding sx={{ p: 1 }}>
        {[
          { label: "Dashboard", path: "/newrequest" },
          { label: "Notice Board", path: "/client/noticeboard" },
          {
            label: "Create New Request / Upload Your Work Order",
            path: "/client/clientnewrequist",
          },
          { label: "Inbox", path: "/client/newrequest" },
          { label: "Submited Requests", path: "/newrequest" },
          { label: "Draft Request", path: "/forwardto" },
          { label: "Under Processing Request", path: "/Forward-Request" },
          { label: "Accepted Request", path: "/Forward-Request" },
          { label: "Published Advertisement", path: "/Forward-Request" },
          { label: "Report", path: "/client/report" },

          { label: "Check Status", path: "/client/newsratelist" },
          { label: "News Paper Rate List", path: "/client/newsratelist" },
          {
            label: "Generated Bill List / Outstanding / Payment Details",
            path: "/Forward-Request",
          },
        ].map((item, index) => (
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
                  lineHeight: 1.4,
                }}
              />
            )}
          </ListItemButton>
        ))}
        <Divider
          sx={{
            my: 1.5,
            borderColor: "rgba(255,255,255,0.15)",
          }}
        />

        {[{ label: "About Us", path: "/aboutus" }, { label: "Help Desk", path: "/helpdesk" }].map(
          (item, index) => (
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
          )
        )}
      </List>
    </Box>
  );
};

export default ClientSideNavbar;
