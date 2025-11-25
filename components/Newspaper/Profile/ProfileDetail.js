import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Card,
  Typography,
  Divider,
  Chip,
  Avatar,
  Grid,
} from "@mui/material";
import UpdateProfile from "./UpdateProfile";
import BankDetails from "./BankDetails";
import GSTDetail from "./GSTDetail";
import ForgotPassword from "./ForgotPassword";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import newspaperService from "@/services/newspaperService";
import BankDetailsView from "./BankDetailsView";

function ProfileDetail() {
  const [activeTab, setActiveTab] = useState(1);
  const [newspaper, setNewspaper] = useState(null);
  const [formData, setFormData] = useState({
    NewspaperName: "",
    editorName: "",
    email: "",
    mobile: "",
    address: "",
    district: "",
    state: "",
    userId: "",
    user_name: "",
    landmark: "",
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await newspaperService.getNewspapers("00020");
    setFormData(res.data?.data);
  };

  return (
    <Box 
      sx={{ 
        p: 3, 
        backgroundColor: "#FFF8F1", 
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Breadcrumb */}
      <Box sx={{ mb: 2.5 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: "#6B7280",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
          }}
        >
          Home › Profile
        </Typography>
      </Box>

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ 
            color: "#E65100", 
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Profile Management
        </Typography>
        <Chip
          icon={<CalendarTodayIcon sx={{ fontSize: "1rem" }} />}
          label="Financial Year: 2022–2023"
          sx={{
            backgroundColor: "#FF7A00",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.875rem",
            px: 1,
            height: "38px",
            boxShadow: "0 3px 8px rgba(255, 122, 0, 0.3)",
            fontFamily: "'Inter', sans-serif",
            "& .MuiChip-icon": {
              color: "#fff",
            },
          }}
        />
      </Box>

      {/* Main Card */}
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* Modern Tabs */}
        <Box sx={{ backgroundColor: "#FAFAFA", px: 2.5, pt: 2.5 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              minHeight: "48px",
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.9rem",
                fontFamily: "'Inter', sans-serif",
                borderRadius: "12px 12px 0 0",
                mx: 0.5,
                minHeight: 48,
                color: "#6B7280",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#FFE0B2",
                  color: "#E65100",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#FFFFFF",
                color: "#E65100 !important",
                fontWeight: 600,
                boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Tab label="View Profile" />
            <Tab label="Update Profile" />
            <Tab label="Change Password" />
            <Tab label="Bank Details" />
            <Tab label="GST Details" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Box>
            <Box>
              {/* Profile Header */}
              <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  mb: 3,
                  pb: 3,
                  borderBottom: "2px solid #FFE0B2",
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "linear-gradient(135deg, #FF7A00 0%, #E65100 100%)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    mr: 3,
                    boxShadow: "0 4px 12px rgba(230, 81, 0, 0.3)",
                  }}
                >
                  SP
                </Avatar>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ 
                      color: "#1F2937", 
                      fontWeight: 700,
                      mb: 0.5,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {formData.np_name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      size="small"
                      label="Last Updated: 25 Nov 2022"
                      sx={{
                        backgroundColor: "#FFF3E0",
                        color: "#E65100",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              {/* Profile Details Grid */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "12px",
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #F3F4F6",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#FFF3E0",
                        borderColor: "#FFE0B2",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                      <BusinessIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: "#6B7280", 
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          textTransform: "uppercase",
                          fontSize: "0.75rem",
                          letterSpacing: "0.5px",
                        }}
                      >
                        User Name
                      </Typography>
                    </Box>
                    <Typography 
                      sx={{ 
                        color: "#1F2937", 
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {formData.user_name} - {formData.District_Text}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "12px",
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #F3F4F6",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#FFF3E0",
                        borderColor: "#FFE0B2",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                      <EmailIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: "#6B7280", 
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          textTransform: "uppercase",
                          fontSize: "0.75rem",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Email ID
                      </Typography>
                    </Box>
                    <Typography 
                      sx={{ 
                        color: "#1F2937", 
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {formData.email_id}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "12px",
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #F3F4F6",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#FFF3E0",
                        borderColor: "#FFE0B2",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                      <PhoneIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: "#6B7280", 
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          textTransform: "uppercase",
                          fontSize: "0.75rem",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Mobile Number
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography 
                        sx={{ 
                          color: "#1F2937", 
                          fontWeight: 500,
                          fontSize: "0.95rem",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {formData.contact_no}
                        
                      </Typography>
                      <Chip
                        icon={<VerifiedIcon sx={{ fontSize: "0.9rem" }} />}
                        label="Verified"
                        size="small"
                        sx={{
                          backgroundColor: "#D1FAE5",
                          color: "#065F46",
                          fontWeight: 600,
                          fontSize: "0.7rem",
                          height: "22px",
                          fontFamily: "'Inter', sans-serif",
                          "& .MuiChip-icon": {
                            color: "#059669",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "12px",
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #F3F4F6",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#FFF3E0",
                        borderColor: "#FFE0B2",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                      <LocationOnIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: "#6B7280", 
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          textTransform: "uppercase",
                          fontSize: "0.75rem",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Fax No
                      </Typography>
                    </Box>
                    <Typography 
                      sx={{ 
                        color: "#1F2937", 
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1.6,
                      }}
                    >
                      {formData.fax_no}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "12px",
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #F3F4F6",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#FFF3E0",
                        borderColor: "#FFE0B2",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                      <LocationOnIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: "#6B7280", 
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          textTransform: "uppercase",
                          fontSize: "0.75rem",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Location
                      </Typography>
                    </Box>
                    <Typography 
                      sx={{ 
                        color: "#1F2937", 
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1.6,
                      }}
                    >
                      {formData.loginaddr}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "12px",
                      backgroundColor: "#FAFAFA",
                      border: "1px solid #F3F4F6",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#FFF3E0",
                        borderColor: "#FFE0B2",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                      <LocationOnIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: "#6B7280", 
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          textTransform: "uppercase",
                          fontSize: "0.75rem",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Location
                      </Typography>
                    </Box>
                    <Typography 
                      sx={{ 
                        color: "#1F2937", 
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1.6,
                      }}
                    >
                      Raipur, Raipur District
                      Chhattisgarh
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <BankDetailsView />
            </Box>
            </Box>
          )}

          {activeTab === 1 && <UpdateProfile />}
          {activeTab === 2 && <ForgotPassword />}
          {activeTab === 3 && <BankDetails />}
          {activeTab === 4 && <GSTDetail />}
        </Box>
      </Card>
    </Box>
  );
}

export default ProfileDetail;