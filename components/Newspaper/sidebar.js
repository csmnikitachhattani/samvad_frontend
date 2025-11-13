"use client";
import { Box, List, ListItemButton, ListItemText, Divider, Button, Avatar, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <Box
      sx={{
        // width intentionally removed here — parent sets width
        color: "#fff",
        background: "linear-gradient(180deg, #FF7A00 0%, #FF3D00 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",    // *use 100%* so it fills the parent's height
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
            NP
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.15rem", textAlign: "center", mb: 0.5 }}>
            Newspaper Portal
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.85rem", opacity: 0.9, textAlign: "center" }}>
            Admin Dashboard
          </Typography>
        </Box>

        <List sx={{ px: 0 }}>
          <ListItemButton
            onClick={() => router.push("/newspaper/profile")}
            sx={{
              borderRadius: "12px",
              mb: 1,
              py: 1.5,
              px: 2,
              bgcolor: isActive("/newspaper/profile") ? "rgba(255,255,255,0.25)" : "transparent",
              border: isActive("/newspaper/profile") ? "1px solid rgba(255,255,255,0.4)" : "1px solid transparent",
              transition: "all 0.3s",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)", transform: "translateX(6px)" },
            }}
          >
            <PersonIcon sx={{ mr: 2, fontSize: "1.4rem" }} />
            <ListItemText primary="Profile" primaryTypographyProps={{ fontWeight: isActive("/newspaper/profile") ? 600 : 500, fontSize: "0.95rem" }} />
          </ListItemButton>

          <ListItemButton
            onClick={() => router.push("/newspaper/release-order")}
            sx={{
              borderRadius: "12px",
              py: 1.5,
              px: 2,
              bgcolor: isActive("/newspaper/release-order") ? "rgba(255,255,255,0.25)" : "transparent",
              border: isActive("/newspaper/release-order") ? "1px solid rgba(255,255,255,0.4)" : "1px solid transparent",
              transition: "all 0.3s",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)", transform: "translateX(6px)" },
            }}
          >
            <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />
            <ListItemText primary="Release Order" primaryTypographyProps={{ fontWeight: isActive("/newspaper/release-order") ? 600 : 500, fontSize: "0.95rem" }} />
          </ListItemButton>
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
            py: 1.2,
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
