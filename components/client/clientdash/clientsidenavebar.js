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
  color: "#fff",
  fontSize: "13px",
  borderBottom: "1px solid wheat",
  "&.active": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
};

const ClientSideNavbar = ({ isCollapsed }) => {
  const pathname = usePathname();
  const [openProfile, setOpenProfile] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {[
          { label: "Dashboard", path: "/newrequest" },
          { label: "Notice Board", path: "/client/noticeboard" },
          {
            label: "Create New Request / Upload Your Work Order",
            path: "/newrequest",
          },
          { label: "Inbox", path: "/newrequest" },
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
                primaryTypographyProps={{ fontSize: "13px" }}
              />
            )}
          </ListItemButton>
        ))}

        {/* Profile Dropdown (Optional – enabled) */}
        {/* 
        <ListItemButton
          onClick={() => setOpenProfile(!openProfile)}
          sx={{ ...navItemStyle, display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon fontSize="small" />
            {!isCollapsed && <Typography fontSize="13px">Profile</Typography>}
          </Box>
          {!isCollapsed &&
            (openProfile ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </ListItemButton>

        <Collapse in={openProfile} timeout="auto" unmountOnExit>
          <Box sx={{ ml: 2 }}>
            {[
              { label: "View Profile", path: "/view-profile" },
              { label: "Update Profile", path: "/update-profile" },
              { label: "Verify Mobile Number", path: "/verify-mobile" },
              { label: "Change Password", path: "/change-password" },
            ].map((item, index) => (
              <ListItemButton
                key={index}
                component={Link}
                href={item.path}
                selected={isActive(item.path)}
                sx={{ ...navItemStyle, borderBottom: "none" }}
              >
                {!isCollapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: "13px" }}
                  />
                )}
              </ListItemButton>
            ))}
          </Box>
        </Collapse>
        */}

        <Divider sx={{ borderColor: "wheat" }} />

        {[
          { label: "About Us", path: "/aboutus" },
          { label: "Help Desk", path: "/helpdesk" },
        ].map((item, index) => (
          <ListItemButton
            key={index}
            component={Link}
            href={item.path}
            selected={isActive(item.path)}
            sx={{
              ...navItemStyle,
              borderTop: "1px solid wheat",
            }}
          >
            {!isCollapsed && (
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: "13px" }}
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ClientSideNavbar;
