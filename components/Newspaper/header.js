"use client";
import { Box, Typography, Avatar, IconButton, Tooltip } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#F1F5F9",
        p: 2,
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        mb: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT SIDE — Title */}
      <Typography
        variant="h6"
        sx={{
          color: "#1E293B",
          fontWeight: 600,
          letterSpacing: "0.5px",
        }}
      >
        Newspaper Management Panel
      </Typography>

      {/* RIGHT SIDE — Navbar Items */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Tooltip title="Notifications">
          <IconButton size="small" sx={{ color: "#E65100" }}>
            <NotificationsNoneIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Profile">
          <Avatar sx={{ bgcolor: "#FF6F00", width: 32, height: 32 }}>
            <AccountCircleIcon />
          </Avatar>
        </Tooltip>

        <Tooltip title="Logout">
          <IconButton
            size="small"
            sx={{
              color: "#E65100",
              "&:hover": { color: "#D84315" },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
