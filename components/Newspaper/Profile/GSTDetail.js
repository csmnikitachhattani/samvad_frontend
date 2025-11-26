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
import commonServices from "@/services/commonServices";

function GstDetail() {
  const [formData, setFormData] = useState({
    GST_number: "",
    GST_legalName: "",
    GST_StateID: "",
    GST_StateText: "",
    GST_DateOfRegistration: "",
    GST_TaxpayerType: "",
  });

  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const taxpayerTypes = ["Regular", "Composite", "Casual", "Tax Deductor"];

  // Get user GST details
  useEffect(() => {
    loadUser();
  }, []);

  // Load all states
  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await commonServices.getStates();
        setStates(response.data?.data || []);
        console.log(response.data?.data)
      } catch (error) {
        console.error("Failed to fetch states", error);
      }
    }
    fetchStates();
  }, []);

  // Load GST detail of user
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };
  
  const loadUser = async () => {
    try {
      const res = await newspaperService.getNewspapersGSTDetails("00019");
      let data = res?.data?.data
      if (res?.data?.data) {
      setFormData({
        ...data,
        GST_DateOfRegistration: formatDate(data.GST_DateOfRegistration)
      });
    }
    } catch (err) {
      console.error("Error loading GST:", err);
    }
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // When state is selected, update both value + Text
    if (name === "GST_StateID") {
      const stateObj = states.find((s) => s.state_code == value);
      setFormData({
        ...formData,
        GST_StateID: value,
        GST_StateText: stateObj?.state_name || "",
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.GST_number.trim()) newErrors.GST_number = "GSTIN is required";
    if (!formData.GST_legalName.trim()) newErrors.GST_legalName = "Legal name required";
    if (!formData.GST_StateID) newErrors.GST_StateID = "Select a state";
    if (!formData.GST_DateOfRegistration) newErrors.GST_DateOfRegistration = "Date required";
    if (!formData.GST_TaxpayerType.trim()) newErrors.GST_TaxpayerType = "Taxpayer type required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update GST Detail API
  const handleUpdateGSTDetail = async () => {
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fix the errors before submitting",
        severity: "error",
      });
      return;
    }
    console.log("date",formData.GST_DateOfRegistration)
    try {
      const updateObject = {
        action: "update",
        user_id: "00019",
        GST_legalName: formData.GST_legalName,
        GST_number: formData.GST_number,
        GST_StateID: formData.GST_StateID,
        GST_StateText: formData.GST_StateText,
        GST_DateOfRegistration: formData.GST_DateOfRegistration,
        GST_TaxpayerType: formData.GST_TaxpayerType,
        ip_address: "192.168.29.1",
      };

      await newspaperService.updateGSTDetail(updateObject);

      setSnackbar({
        open: true,
        message: "GST details updated successfully!",
        severity: "success",
      });
    } catch (err) {
      console.log("Error updating GST detail:", err.message);

      setSnackbar({
        open: true,
        message: "Failed to update GST details",
        severity: "error",
      });
    }
  };

  // Reset
  const handleReset = () => {
    setFormData({
      GST_number: "",
      GST_legalName: "",
      GST_StateID: "",
      GST_StateText: "",
      GST_DateOfRegistration: "",
      GST_TaxpayerType: "",
    });
    setErrors({});
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box sx={{ fontFamily: "'Inter', sans-serif" }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
        GST Details
      </Typography>

      {/* FORM */}
      <Grid container spacing={5}>
        {/* GST Number */}
        <Grid item xs={12}>
          <TextField
            label="GSTIN / Provisional ID"
            name="GST_number"
            value={formData.GST_number}
            onChange={handleChange}
            fullWidth
            error={!!errors.GST_number}
            helperText={errors.GST_number || "Case sensitive"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon sx={{ color: "#FF7A00" }} />
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
            name="GST_legalName"
            value={formData.GST_legalName}
            onChange={handleChange}
            fullWidth
            error={!!errors.GST_legalName}
            helperText={errors.GST_legalName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#FF7A00" }} />
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
            name="GST_StateID"
            value={formData.GST_StateID}
            onChange={handleChange}
            fullWidth
            error={!!errors.GST_StateID}
            helperText={errors.GST_StateID}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: "#FF7A00" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          >
            {states.map((s) => (
              <MenuItem key={s.state_code} value={s.state_code}>
                {s.state_name}
              </MenuItem>
            ))}
          </TextField>

        </Grid>

        {/* Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Date of Registration"
            name="GST_DateOfRegistration"
            value={formData.GST_DateOfRegistration}
            onChange={handleChange}
            fullWidth
            error={!!errors.GST_DateOfRegistration}
            helperText={errors.GST_DateOfRegistration}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon sx={{ color: "#FF7A00" }} />
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
            name="GST_TaxpayerType"
            value={formData.GST_TaxpayerType}
            onChange={handleChange}
            fullWidth
            error={!!errors.GST_TaxpayerType}
            helperText={errors.GST_TaxpayerType}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndIcon sx={{ color: "#FF7A00" }} />
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

      {/* ACTION BUTTONS */}
      <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleReset} sx={cancelBtnStyle}>
          Reset
        </Button>

        <Button variant="contained" startIcon={<SaveIcon />} sx={submitBtnStyle} onClick={handleUpdateGSTDetail}>
          Submit
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

/* ---------- Styles ---------- */

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "&:hover": { backgroundColor: "#FFF8F1" },
    "&.Mui-focused fieldset": { borderColor: "#FF7A00" },
  },
};

const cancelBtnStyle = {
  borderRadius: "10px",
  textTransform: "none",
  px: 3,
};

const submitBtnStyle = {
  borderRadius: "10px",
  textTransform: "none",
  px: 3,
  background: "linear-gradient(135deg, #FF7A00, #E65100)",
};

export default GstDetail;

