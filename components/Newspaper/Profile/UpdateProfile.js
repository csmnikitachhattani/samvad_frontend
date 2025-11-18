import React, {useEffect, useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import PublicIcon from "@mui/icons-material/Public";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import newspaperService from "@/services/newspaperService";

function UpdateProfile() {
  const [formData, setFormData] = useState({
    publicationName: "",
    editorName: "",
    email: "",
    mobile: "",
    address: "",
    district: "",
    state: "",
    userId: "",
    user_name: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [newspaper, setNewspaper] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await newspaperService.getNewspapers("00020");
    console.log(res)
    setFormData(res.data?.data);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.publicationName.trim()) {
      newErrors.publicationName = "Publication name is required";
    }
    if (!formData.editorName.trim()) {
      newErrors.editorName = "Editor name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.district.trim()) {
      newErrors.district = "District is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Updated Profile:", formData);
      setSnackbar({ 
        open: true, 
        message: "Profile updated successfully!", 
        severity: "success" 
      });
    } else {
      setSnackbar({ 
        open: true, 
        message: "Please fix the errors in the form", 
        severity: "error" 
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      publicationName: "",
      editorName: "",
      email: "",
      mobile: "",
      address: "",
      district: "",
      state: "",
      userId: "",
      username: "",
    });
    setErrors({});
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ fontFamily: "'Inter', sans-serif" }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3,
          color: "#1F2937",
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.25rem",
        }}
      >
        Update Newspaper Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <TextField
              label="User Id"
              name="userId"
              value={formData.user_id}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.publicationName}
              helperText={errors.publicationName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>
         { /* user Name */}
         <Grid item xs={12} sm={6}>
            <TextField
              label="User Name"
              name="user name"
              value={formData.user_name}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>

          {/* Publication Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Newspaper Name"
              name="newspaperName"
              value={formData.user_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.publicationName}
              helperText={errors.publicationName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>

          {/* Editor Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Editor Name"
              name="editorName"
              value={formData.editorName}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.editorName}
              helperText={errors.editorName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email ID"
              name="email"
              type="email"
              value={formData.email_id}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>

          {/* Mobile */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.contact_no}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.mobile}
              helperText={errors.mobile}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>
          
          {/* Fax Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fax Number"
              name="fax_no"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.mobile}
              helperText={errors.mobile}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>
              
          {/* Landmark */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>
          {/* Address */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={3}
              error={!!errors.address}
              helperText={errors.address}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 2 }}>
                    <LocationOnIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>

          {/* District */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.district}
              helperText={errors.district}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.state}
              helperText={errors.state}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PublicIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFF8F1",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFF8F1",
                    "& fieldset": {
                      borderColor: "#FF7A00",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E65100",
                  fontWeight: 600,
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
            sx={{
              borderRadius: "10px",
              borderColor: "#9CA3AF",
              color: "#6B7280",
              fontWeight: 600,
              textTransform: "none",
              px: 3,
              py: 1,
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#6B7280",
                backgroundColor: "#F3F4F6",
                transform: "translateY(-2px)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveIcon />}
            sx={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #FF7A00 0%, #E65100 100%)",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              px: 3,
              py: 1,
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 4px 12px rgba(230, 81, 0, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #E65100 0%, #D84315 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(230, 81, 0, 0.4)",
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            width: "100%",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UpdateProfile;