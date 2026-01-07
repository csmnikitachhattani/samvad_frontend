"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useRouter } from "next/navigation";

const ClientHeader = ({ toggleSidebar }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const user = {
    name: "SJ",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd1Y_LHU5cIbQ1GOxw3x6yJVNv9IiGdsJQqZkFC0BnQBsRzJg2Z1Zg2pddadXpycxaDzo&usqp=CAU",
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // TODO: clear auth/session
    router.push("/loginpage");
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{ backgroundColor: "#272757", zIndex: 1201 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Sidebar Toggle (Mobile) */}
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            sx={{ color: "#fff", display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" fontWeight="bold">
            Dashboard
          </Typography>
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Notifications */}
          <IconButton sx={{ color: "#fff" }}>
            <Badge badgeContent={1} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          {/* Messages */}
          <IconButton sx={{ color: "#fff" }}>
            <Badge badgeContent={1} color="primary">
              <MailOutlineIcon />
            </Badge>
          </IconButton>

          {/* User Menu */}
          <Button
            onClick={handleMenuOpen}
            sx={{
              color: "#fff",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar src={user.avatar} sx={{ width: 30, height: 30 }} />
            <Typography
              variant="body2"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              {user.name}
            </Typography>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => router.push("/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => router.push("/settings")}>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ClientHeader;
