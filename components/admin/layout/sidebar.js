"use client";
import { Box, List, ListItemButton, ListItemText, Divider, Button, Avatar, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard"
import MenuService from "@/services/MenuServices";

import Link from "next/link";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";


export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  

const [openMenu, setOpenMenu] = useState(null);
const [fullMenu, setFullMenu] = useState([])

// better active check for nested routes
const isActive = (path) => pathname.startsWith(path);
  const Items = [
    { 
      label: "Dashboard", 
      path: "/admin",
      icon: <DashboardIcon sx={{ mr: 2, fontSize: "1.4rem" }} /> 
    },
    {
      label: "Agency",
      path: "/admin/agency",
      icon: <PersonIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Agency User",
      path: "/admin/agency/agencyuser",
      icon: <PersonIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    // {
    //   label: "Display Boards",
    //   path: "/admin/display",
    //   icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    // },
    {
      label: "Display Boards",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
      submenu: [
        {
          label: " Display Board Avk List",
          path: "/admin/displayboard/counter",
        },
        {
          label: "Counter List",
          path: "/admin/displayboard",
        },
        {
          label: "Notsheet",
          path: "/admin/display/reports",
        },
      ],
    },
    {
      label: "Vehicle Boards",
      path: "/admin/vehicle",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Mini Bus Boards",
      path: "/admin/bus",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "request",
      path: "/admin/request",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Avak",
      path: "/admin/avak",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Counter",
      path: "/admin/counter",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Allocated",
      path: "/admin/allocation",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Workorders",
      path: "/admin/workorder",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
    {
      label: "Bill Entry",
      path: "/newspaper/bill-entry",
      icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
    },
   
  ];
  const menu = [
    {
      name: "Master",
      children: [
        {
          name: "Agency",
          url: "/admin/agency",
          children: [
            {
              name: "Create",
              url: "/admin/agency/create",
            },
          ],
        },
        {
          name: "Vehicle",
          url: "/admin/vehicle",
         
        },
        {
          name: "Display",
          url: "/admin/display",
        },
        {
          name: "Bus",
          url: "/admin/bus",
        },
      ],
    },
    {
      name: "Main",
      children: [
        {
          name: "Request",
          url: "/admin/request",
        },
        {
          name: "Avak",
          url: "/admin/avak",
        },
        {
          name: "Counter",
          url: "/admin/counter",
         
        },
        {
          name: "Allocation",
          url: "/admin/allocation",
        },
        {
          name: "Workorders",
          url: "/admin/workorder",
        },
      ],
    },
  ];
  const [menuItems, setMenuItems] = useState([]);
  const transformMenuData = (data) => {
  return data.map(menu => ({
    label: menu.menu_nm,
    path: "/admin", // parent click fallback
    submenu: menu.submenus?.flatMap(sub =>
      sub.forms.map(form => ({
        label: form.form_display_name,
        path: `/admin/${form.form_path_name}`, // dynamic route
      }))
    ) || [],
  }));
};
  const fetchMenuOptions = async () => {
    try {
      
      const response = await MenuService.getFullMenu();
      console.log(response)
      const formatted = transformMenuData(response.data);
      setMenuItems(formatted);
    } catch (err) {
      //setError("Failed to load allocation records");
      console.error(err);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(()=>{
    fetchMenuOptions()
  }, [])

  const SidebarItem = ({ item, depth = 0 }) => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
   
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.url && pathname === item.url;
   
    return (
      <div style={{ marginLeft: depth > 0 ? 12 : 0 }}>
   
        {/* ── Row ── */}
        <div
          onClick={() => hasChildren && setOpen(!open)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: depth === 0 ? "9px 12px" : "7px 12px",
            borderRadius: 10,
            cursor: hasChildren ? "pointer" : "default",
            marginBottom: 2,
            transition: "background 0.15s ease",
            backgroundColor: isActive
              ? "rgba(255,255,255,0.12)"
              : "transparent",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
          }}
          onMouseLeave={(e) => {
            if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {/* Active indicator bar */}
          {isActive && (
            <div style={{
              position: "absolute",
              left: 0, top: "20%", bottom: "20%",
              width: 3,
              borderRadius: "0 3px 3px 0",
              backgroundColor: "#fff",
            }} />
          )}
   
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
            {/* Depth dot for children */}
            {depth > 0 && (
              <div style={{
                width: isActive ? 6 : 4,
                height: isActive ? 6 : 4,
                borderRadius: "50%",
                
                backgroundColor: isActive ? "#fff" : "rgba(255,255,255,0.3)",
                flexShrink: 0,
                transition: "all 0.15s ease",
              }} />
            )}
   
            {item.url ? (
              <Link
                href={item.url}
                style={{
                  textDecoration: "none",
                  fontSize: depth === 0 ? "0.85rem" : "0.8rem",
                  fontWeight: isActive ? 700 : depth === 0 ? 600 : 500,
                  color: isActive ? "#fff" : depth === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  transition: "color 0.15s ease",
                  letterSpacing: depth === 0 ? "-0.1px" : "0",
                }}
              >
                {item.name}
              </Link>
            ) : (
              <span style={{
                fontSize: depth === 0 ? "0.85rem" : "0.8rem",
                fontWeight: hasChildren ? 600 : 500,
                color: open ? "#fff" : "rgba(255,255,255,0.75)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "color 0.15s ease",
                letterSpacing: depth === 0 ? "-0.1px" : "0",
              }}>
                {item.name}
              </span>
            )}
          </div>
   
          {/* Chevron */}
          {hasChildren && (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderRadius: 6,
              backgroundColor: open ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}>
              {open
                ? <ChevronDown size={12} color="rgba(255,255,255,0.7)" />
                : <ChevronRight size={12} color="rgba(255,255,255,0.4)" />}
            </div>
          )}
        </div>
   
        {/* ── Children ── */}
        {hasChildren && open && (
          <div style={{
            marginLeft: 8,
            paddingLeft: 12,
            borderLeft: "1.5px solid rgba(255,255,255,0.08)",
            marginBottom: 4,
          }}>
            {item.children.map((child, i) => (
              <SidebarItem key={i} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };
  return (
    <Box
      sx={{
      
        color: "#fff",
        background: "#030236",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",    
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
            AP
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.15rem", textAlign: "center", mb: 0.5 }}>
            Admin Portal
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.85rem", opacity: 0.9, textAlign: "center" }}>
            Admin Dashboard
          </Typography>
        </Box>


    <List sx={{ px: 0 }}>

    {Items.map((item, i) => (
        <SidebarItem key={i} item={item} />
      ))}

{menuItems.map((item) => {
    const hasSubmenu = Array.isArray(item.submenu);

    return (
      <Box key={item.label}>
        {/* Parent Menu */}
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
            mb: 0.5,py: 1,px: 1,bgcolor:isActive(item.path) || openMenu === item.label
                ? "rgba(255,255,255,0.25)"
                : "transparent",
            border:
              isActive(item.path) || openMenu === item.label
                ? "1px solid rgba(255,255,255,0.4)"
                : "1px solid transparent",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
              transform: "translateX(6px)",
            },
          }}
        >
          {item.icon}
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
          {hasSubmenu &&
            (openMenu === item.label ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>

        {/* Submenu */}
        {hasSubmenu && (
          <Collapse in={openMenu === item.label}>
            <List sx={{ pl: 4 }}>
              {item.submenu.map((sub) => (
                <ListItemButton
                  key={sub.path}
                  onClick={() => router.push(sub.path)}
                >
                  <ListItemText primary={sub.label} />
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
            py: 1,
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