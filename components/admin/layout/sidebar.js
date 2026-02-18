// "use client";
// import { Box, List, ListItemButton, ListItemText, Divider, Button, Avatar, Typography } from "@mui/material";
// import { useRouter, usePathname } from "next/navigation";
// import PersonIcon from "@mui/icons-material/Person";
// import DescriptionIcon from "@mui/icons-material/Description";
// import LogoutIcon from "@mui/icons-material/Logout";
// import DashboardIcon from "@mui/icons-material/Dashboard"


// import Collapse from "@mui/material/Collapse";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useState } from "react";


// export default function Sidebar() {
//   const router = useRouter();
//   const pathname = usePathname();

// const [openMenu, setOpenMenu] = useState(null);

// // better active check for nested routes
// const isActive = (path) => pathname.startsWith(path);
//   const menuItems = [
//     { 
//       label: "Dashboard", 
//       path: "/admin",
//       icon: <DashboardIcon sx={{ mr: 2, fontSize: "1.4rem" }} /> 
//     },
//     {
//       label: "Master",
//       path: "/admin/profile",
//       icon: <PersonIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
//     },
//     {
//       label: "Agency",
//       path: "/admin/agency",
//       icon: <PersonIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
//     },
//     {
//       label: "Counter",
//       path: "/admin/counter",
//       icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
//     },
//     {
//       label: "Bill Entry",
//       path: "/newspaper/bill-entry",
//       icon: <DescriptionIcon sx={{ mr: 2, fontSize: "1.4rem" }} />,
//     },
   
//   ];

//   return (
//     <Box
//       sx={{
      
//         color: "#fff",
//         background: "#030236",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         height: "100%",    
//         p: 2.5,
//         fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
//       }}
//     >
//       {/* Top Section */}
//       <Box>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             mb: 3,
//             pb: 3,
//             borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
//           }}
//         >
//           <Avatar
//             sx={{
//               width: 80,
//               height: 80,
//               mb: 1.5,
//               bgcolor: "rgba(255, 255, 255, 0.25)",
//               border: "3px solid rgba(255, 255, 255, 0.5)",
//               fontSize: "2rem",
//               fontWeight: 600,
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             AP
//           </Avatar>
//           <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.15rem", textAlign: "center", mb: 0.5 }}>
//             Admin Portal
//           </Typography>
//           <Typography variant="body2" sx={{ fontSize: "0.85rem", opacity: 0.9, textAlign: "center" }}>
//             Admin Dashboard
//           </Typography>
//         </Box>

  

//     <List sx={{ px: 0 }}>
//   {menuItems.map((item) => {
//     const hasSubmenu = Array.isArray(item.submenu);

//     return (
//       <Box key={item.label}>
//         {/* Parent Menu */}
//         <ListItemButton
//           onClick={() => {
//             if (hasSubmenu) {
//               setOpenMenu(openMenu === item.label ? null : item.label);
//             } else {
//               router.push(item.path);
//             }
//           }}
//           sx={{
//             borderRadius: "12px",
//             mb: 0.5,py: 1,px: 1,bgcolor:isActive(item.path) || openMenu === item.label
//                 ? "rgba(255,255,255,0.25)"
//                 : "transparent",
//             border:
//               isActive(item.path) || openMenu === item.label
//                 ? "1px solid rgba(255,255,255,0.4)"
//                 : "1px solid transparent",
//             transition: "all 0.3s",
//             "&:hover": {
//               bgcolor: "rgba(255,255,255,0.2)",
//               transform: "translateX(6px)",
//             },
//           }}
//         >
//           {item.icon}
//           <ListItemText
//             primary={item.label}
//             primaryTypographyProps={{
//               fontWeight: 600,
//               fontSize: "0.75rem",
//             }}
//           />
//           {hasSubmenu &&
//             (openMenu === item.label ? <ExpandLess /> : <ExpandMore />)}
//         </ListItemButton>

//         {/* Submenu */}
//         {hasSubmenu && (
//           <Collapse in={openMenu === item.label} timeout="auto" unmountOnExit>
//             <List sx={{ pl: 4 }}>
//               {item.submenu.map((sub) => (
//                 <ListItemButton
//                   key={sub.path}
//                   onClick={() => router.push(sub.path)}
//                   sx={{
//                     borderRadius: "10px",
//                     mb: 0.5,
//                     py: 0.75,
//                     bgcolor: isActive(sub.path)
//                       ? "rgba(255,255,255,0.2)"
//                       : "transparent",
//                     "&:hover": {
//                       bgcolor: "rgba(255,255,255,0.15)",
//                     },
//                   }}
//                 >
//                   <ListItemText
//                     primary={sub.label}
//                     primaryTypographyProps={{
//                       fontSize: "0.7rem",
//                       fontWeight: isActive(sub.path) ? 600 : 500,
//                     }}
//                   />
//                 </ListItemButton>
//               ))}
//             </List>
//           </Collapse>
//         )}
//       </Box>
//     );
//   })}
// </List>

//       </Box>

//       {/* Bottom Section */}
//       <Box>
//         <Divider sx={{ bgcolor: "rgba(255,255,255,0.25)", mb: 2 }} />
//         <Button
//           fullWidth
//           variant="contained"
//           startIcon={<LogoutIcon />}
//           sx={{
//             bgcolor: "rgba(255, 255, 255, 0.15)",
//             color: "#fff",
//             borderRadius: "12px",
//             py: 1,
//             fontWeight: 600,
//             textTransform: "none",
//             fontSize: "0.95rem",
//             border: "1px solid rgba(255,255,255,0.3)",
//             "&:hover": { bgcolor: "rgba(255,255,255,0.25)", transform: "translateY(-2px)" },
//           }}
//         >
//           Logout
//         </Button>
//       </Box>
//     </Box>
//   );
// }


// ==============dynamic========================================================



"use client";

import {
  Box,
  List,
  Divider,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import "./sidebar.css";
import { useRouter, usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [menuItems, setMenuItems] = useState([]);
  const [openMap, setOpenMap] = useState({});

  const isActive = (path) => {
    if (!path) return false;
    return pathname?.toLowerCase().includes(path.replace("./", "").toLowerCase());
  };

  // const getIcon = (label) => {
  //   const text = label?.toLowerCase() || "";

  //   if (text.includes("home") || text.includes("dashboard")) {
  //     return <DashboardIcon sx={{ mr: 1.5, fontSize: "1.2rem" }} />;
  //   }
  //   if (text.includes("master") || text.includes("profile")) {
  //     return <PersonIcon sx={{ mr: 1.5, fontSize: "1.2rem" }} />;
  //   }
  //   return <DescriptionIcon sx={{ mr: 1.5, fontSize: "1.2rem" }} />;
  // };


  const getIcon = (label) => {
    const text = label?.toLowerCase() || "";

    if (text.includes("home") || text.includes("dashboard")) {
      return <div sx={{ mr: 1.5, fontSize: "1.2rem" }} />;
    }
    if (text.includes("master") || text.includes("profile")) {
      return <Box sx={{ mr: 1.5, fontSize: "1.2rem" }} />;
    }
    return <Box sx={{ mr: 1.5, fontSize: "1.2rem" }} />;
  };
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const userId = localStorage.getItem("userid");
      const userTypeCd = localStorage.getItem("usertypecode");

      if (!userId || !userTypeCd) {
        setMenuItems([]);
        return;
      }

      const response = await axios.get(
        "http://103.79.34.50:8083/api/Login/getusermenu",
        {
          params: { userId, userTypeCd },
        }
      );

      const menuHtml =
        response?.data?.fullMenuHtml || response?.data || "";

      if (!menuHtml) return;

      const parsed = parseMenuRecursive(menuHtml);
      setMenuItems(parsed);
    } catch (error) {
      console.error("Menu API Error:", error);
    }
  };

  // RECURSIVE PARSER (Supports unlimited nested submenu)
  const parseMenuRecursive = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const processUl = (ul) => {
      const items = [];
      const children = Array.from(ul.children);

      for (let i = 0; i < children.length; i++) {
        const el = children[i];

        if (el.tagName !== "LI") continue;

        // Get label
        let label = "";
        let path = "#";

        const anchor = el.querySelector(":scope > a");
        const divText = el.querySelector(":scope > .menu-left");

        if (anchor) {
          label = anchor.textContent.trim();
          path = anchor.getAttribute("href") || "#";
        } else if (divText) {
          label = divText.textContent.trim();
        } else {
          label = el.textContent.trim();
        }

        // Check next sibling UL (submenu)
        let submenu = [];
        const next = el.nextElementSibling;

        if (next && next.tagName === "UL") {
          submenu = processUl(next);
        }

        items.push({
          id: label + i + Math.random(),
          label,
          path,
          submenu: submenu.length ? submenu : null,
        });
      }

      return items;
    };

    const rootUls = doc.querySelectorAll("ul.menu");
    let finalMenu = [];

    rootUls.forEach((ul) => {
      finalMenu = [...finalMenu, ...processUl(ul)];
    });

    return finalMenu;
  };

  const toggleMenu = (id) => {
    setOpenMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNavigation = (path) => {
    if (!path || path === "#") return;

    if (path.includes(".aspx")) {
      window.location.href = path.replace("./", "/");
    } else if (path.startsWith("http")) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  };

  // Recursive Render Function
  const renderMenu = (items, level = 0) => {
    return items.map((item) => {
      const isOpen = openMap[item.id];
      const hasSubmenu = item.submenu && item.submenu.length > 0;

      return (
        <Box key={item.id}>
          <Box
            className="menu-item"
            onClick={() =>
              hasSubmenu
                ? toggleMenu(item.id)
                : handleNavigation(item.path)
            }
            sx={{
              pl: 1 + level * 2,
              bgcolor:
                isActive(item.path) || isOpen
                  ? "rgba(255,255,255,0.25)"
                  : "transparent",
              borderRadius: "8px",
              cursor: "pointer",
              mb: 0.5,
              transition: "0.3s",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 1,
                px: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {getIcon(item.label)}
                <Typography
                  sx={{ fontSize: "0.8rem", fontWeight: 600 }}
                >
                  {item.label}
                </Typography>
              </Box>

              {hasSubmenu && (
                <span
                  className="material-icons"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "0.3s",
                    fontSize: "18px",
                  }}
                >
                  expand_more
                </span>
              )}
            </Box>
          </Box>

          {hasSubmenu && isOpen && (
            <Box sx={{ ml: 1 }}>
              {renderMenu(item.submenu, level + 1)}
            </Box>
          )}
        </Box>
      );
    });
  };

  return (
    <Box
      sx={{
        color: "#fff",
        background: "#030236",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        p: 2,
      }}
    >
      <Box>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
            pb: 2,
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Avatar sx={{ width: 70, height: 70, mb: 1 }}>
            AP
          </Avatar>
          <Typography fontWeight={700}>Admin Portal</Typography>
          <Typography fontSize="0.8rem" opacity={0.8}>
           Admin Dhashboard
          </Typography>
        </Box>

        {/*  Dynamic Nested Menu */}
        <List disablePadding>
          {menuItems.length > 0
            ? renderMenu(menuItems)
            : (
              <Typography sx={{ p: 2, fontSize: "0.8rem" }}>
                Loading Menu...
              </Typography>
            )}
        </List>
      </Box>

      {/* Logout */}
      <Box>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />
        <Button
          fullWidth
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={() => {
            localStorage.removeItem("userid");
            localStorage.removeItem("usertypecode");
            window.location.href = "/";
          }}
          sx={{
            bgcolor: "rgba(255,255,255,0.15)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
