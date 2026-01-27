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
    router.push("/loginpage");
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        background: "linear-gradient(90deg, #0F2027, #203A43)",
        zIndex: 1201,
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: 64,
        }}
      >
        {/* Left Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Sidebar Toggle */}
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            sx={{
              color: "#E6EDF3",
              display: { lg: "none" },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.5px",
              color: "#F4C430",
            }}
          >
            Dashboard
          </Typography>
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Notifications */}
          <IconButton
            sx={{
              color: "#E6EDF3",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <Badge badgeContent={1} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          {/* Messages */}
          <IconButton
            sx={{
              color: "#E6EDF3",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <Badge badgeContent={1} color="primary">
              <MailOutlineIcon />
            </Badge>
          </IconButton>

          {/* User Menu */}
          <Button
            onClick={handleMenuOpen}
            sx={{
              color: "#E6EDF3",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                width: 32,
                height: 32,
                border: "2px solid rgba(255,255,255,0.4)",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", md: "block" },
                fontWeight: 500,
              }}
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
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: "10px",
                minWidth: 160,
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              },
            }}
          >
            <MenuItem onClick={() => router.push("/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => router.push("/settings")}>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{ color: "#d32f2f", fontWeight: 500 }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ClientHeader;
