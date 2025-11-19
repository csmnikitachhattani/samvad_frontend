"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import NumbersIcon from "@mui/icons-material/Numbers";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import newspaperService from "@/services/newspaperService";




function GstDetail() {
  const [formData, setFormData] = useState({
    gstin: "",
    legalName: "",
    state: "",
    dateOfRegistration: "",
    taxpayerType: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const states = [
    "Chhattisgarh",
    "Madhya Pradesh",
    "Maharashtra",
    "Uttar Pradesh",
    "Gujarat",
  ];

  const taxpayerTypes = [
    "Regular",
    "Composition",
    "Casual",
    "Non-Resident",
  ];
  useEffect(() => {
    loadUser();
  }, []);
  
  const loadUser = async () => {
    const res = await newspaperService.getNewspapersGSTDetails("00020");
    console.log(res)
    setFormData(res.data?.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.gstin.trim()) newErrors.gstin = "GSTIN is required";
    if (!formData.legalName.trim()) newErrors.legalName = "Legal name is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.dateOfRegistration) newErrors.dateOfRegistration = "Date of registration is required";
    if (!formData.taxpayerType.trim()) newErrors.taxpayerType = "Taxpayer type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted GST Data:", formData);
      setSnackbar({
        open: true,
        message: "GST details submitted successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please fix the errors before submitting",
        severity: "error",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      gstin: "",
      legalName: "",
      state: "",
      dateOfRegistration: "",
      taxpayerType: "",
    });
    setErrors({});
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

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
        GST Details
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          {/* GSTIN */}
          <Grid item xs={12} sm={12}>
            <TextField
              label="GSTIN / Provisional ID"
              name="gstin"
              value={formData.GST_number}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.gstin}
              helperText={errors.gstin || "Case sensitive"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={inputStyle}
            />
          </Grid>

          {/* Legal Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Legal Name (as per GST certificate)"
              name="legalName"
              value={formData.GST_legalName}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.legalName}
              helperText={errors.legalName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={inputStyle}
            />
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="State (as per GST certificate)"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              error={!!errors.state}
              helperText={errors.state}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={inputStyle}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Date of Registration */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Registration"
              type="date"
              name="dateOfRegistration"
              value={formData.dateOfRegistration}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.dateOfRegistration}
              helperText={errors.dateOfRegistration}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={inputStyle}
            />
          </Grid>

          {/* Taxpayer Type */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Taxpayer Type"
              name="taxpayerType"
              value={formData.taxpayerType}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.taxpayerType}
              helperText={errors.taxpayerType}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIndIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={inputStyle}
            >
              {taxpayerTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleReset}
            sx={cancelBtnStyle}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveIcon />}
            sx={submitBtnStyle}
          >
            Submit
          </Button>
        </Box>
      </Box>

      {/* Bottom Note */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" sx={{ color: "red", lineHeight: 1.8 }}>
          छ. ग. संवाद को विज्ञापन प्रविष्ट करने वाले कार्यालय/पत्रिकाओं का GST No. अनिवार्य है यदि आपके कार्यालय द्वारा GST No. लिया गया है तो विवरण एंट्री करें अन्यथा <strong>नहीं</strong> पर टिक करें।  
          GST No. नहीं देने पर प्रकाशन की जिम्मेदारी संवाद की नहीं होगी।
          <br />
          <strong>नोट:</strong> कृपया जानकारी सही दें, अन्यथा गलत जानकारी के कारण समस्या होने पर संवाद की कोई जिम्मेदारी नहीं होगी।
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          सहायता हेतु संपर्क करें: 9300002855 (आशीष राजपूत)
        </Typography>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%", fontFamily: "'Inter', sans-serif" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// ---- Styles ----
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.3s ease",
    "&:hover": { backgroundColor: "#FFF8F1" },
    "&.Mui-focused": {
      backgroundColor: "#FFF8F1",
      "& fieldset": { borderColor: "#FF7A00", borderWidth: "2px" },
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#E65100",
    fontWeight: 600,
  },
};

const cancelBtnStyle = {
  borderRadius: "10px",
  borderColor: "#9CA3AF",
  color: "#6B7280",
  fontWeight: 600,
  textTransform: "none",
  px: 3,
  py: 1,
  fontFamily: "'Inter', sans-serif",
  "&:hover": {
    borderColor: "#6B7280",
    backgroundColor: "#F3F4F6",
    transform: "translateY(-2px)",
  },
};

const submitBtnStyle = {
  borderRadius: "10px",
  background: "linear-gradient(135deg, #FF7A00 0%, #E65100 100%)",
  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  px: 3,
  py: 1,
  fontFamily: "'Inter', sans-serif",
  boxShadow: "0 4px 12px rgba(230, 81, 0, 0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #E65100 0%, #D84315 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(230, 81, 0, 0.4)",
  },
};

export default GstDetail;
