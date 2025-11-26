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
    NewspaperName: "",
    editorName: "",
    email_id: "",
    mobile: "",
    loginaddr: "",
    District_Text: "",
    state: "",
    userId: "",
    user_name: "",
    landmark: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await newspaperService.getNewspapers("00020");
    setFormData(res.data?.data);
  };
  const handleUpdateNpUser = async () => {
    try {
      const updateObject = {
        District_Text:formData.District_Text,
        email_id: formData.email_id,
        user_name:formData.user_name,
        address: formData.loginaddr,
        contact_no:formData.contact_no,
        fax_no: formData.fax_no
      };
      const result = await newspaperService.updateProfile('00020', updateObject);
      console.log("User Updated:", result);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const handleChange = (e) => {
    console.log("email validations")
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.NewspaperName.trim()) {
      newErrors.NewspaperName = "Publication name is required";
    }
    if (!formData.email_id.trim()) {
      newErrors.email_id = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email_id)) {
      newErrors.email_id = "Invalid email format";
    }
    // if (!formData.address.trim()) {
    //   newErrors.address = "Address is required";
    // }
    // if (!formData.District_Text.trim()) {
    //   newErrors.District_Text = "District is required";
    // }
    // if (!formData.state.trim()) {
    //   newErrors.state = "State is required";
    // }

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
      // NewspaperName: "",
      // editorName: "",
      email_id: "",
      contact_no: "",
      loginaddr: "",
      District_Text: "",
      state_text: "",
      user_id: "",
      user_name: "",
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
        <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="User Id"
              name="userId"
              value={formData.user_id}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.NewspaperName}
              helperText={errors.NewspaperName}
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
         <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Newspaper Name"
              name="newspaperName"
              value={formData.user_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.NewspaperName}
              helperText={errors.NewspaperName}
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
          {/* Email */}
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Fax Number"
              name="fax_no"
              value={formData.fax_no}
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
          <Grid item xs={12} sm={6} md={4}>
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
        

          {/* District */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="District"
              name="district"
              value={formData.District_Text}
              onChange={handleChange}
              fullWidth
              required
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
          <Grid item xs={12} sm={6} md={4}>
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
            {/* Address */}
            <Grid item sm={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.loginaddr}
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
            onClick={handleUpdateNpUser}
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