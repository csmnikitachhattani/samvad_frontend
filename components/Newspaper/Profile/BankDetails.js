import React, { useState, useEffect } from "react";
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
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import NumbersIcon from "@mui/icons-material/Numbers";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import newspaperService from "@/services/newspaperService";

export default function BankDetailsForm() {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    state: "",
    district: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    micrCode: "",
  });
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await newspaperService.getNewspapersBankDetails("000020");
    setFormData(res?.data?.data[0]);
  };
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleUpdateBankDetail = async () => {
    try {
      const updateObject = {
        action: "update",               // REQUIRED for your stored procedure
        user_id: "00020",               // or dynamic ID
        np_cd: "000019",                // pass np_cd if needed
        bank_name: formData.bank_name,
        account_no: formData.account_no,
        account_holder_name: formData.account_holder_name,
        ifsc_code: formData.ifsc_code,
        micr_code: formData.micr_code,
        district: formData.district,
        branch_name: formData.branch_name,
        status: formData.status,
        financial_year: "2025-2026",
      };
  
      const result = await newspaperService.updateBankDetail(updateObject);
  
      console.log("Bank Detail Updated:", result);
    } catch (err) {
      console.log("Error updating bank detail:", err.message);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    // if (!formData.account_no.trim())
    //   newErrors.account_no = "Account number is required";
    // else if (!/^\d{9,20}$/.test(formData.account_no))
    //   newErrors.account_nos = "Account number must be 9–20 digits";

    // if (!formData.accountHolderName.trim())
    //   newErrors.accountHolderName = "Account holder name is required";

    // if (!formData.state.trim()) newErrors.state = "State is required";
    // if (!formData.district.trim()) newErrors.district = "District is required";
    // if (!formData.bankName.trim()) newErrors.bankName = "Bank name is required";
    // if (!formData.branchName.trim())
    //   newErrors.branchName = "Branch name is required";

    // if (!formData.ifscCode.trim()) newErrors.ifscCode = "IFSC code is required";
    // else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode))
    //   newErrors.ifscCode = "Invalid IFSC format (e.g., SBIN0001234)";

    // if (!formData.micrCode.trim())
    //   newErrors.micrCode = "MICR code is required";
    // else if (!/^\d{9}$/.test(formData.micrCode))
    //   newErrors.micrCode = "MICR code must be 9 digits";

    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Bank Details Submitted:", formData);
      setSnackbar({
        open: true,
        message: "Bank details updated successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      accountNumber: "",
      accountHolderName: "",
      state: "",
      district: "",
      bankName: "",
      branchName: "",
      ifscCode: "",
      micrCode: "",
    });
    setErrors({});
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fieldStyle = {
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
        Bank Details
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Account Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Account No."
              name="accountNumber"
              value={formData.account_no}
              onChange={handleChange}
              fullWidth
              
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={fieldStyle}
            />
          </Grid>

          {/* Account Holder Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Account Holder Name"
              name="accountHolderName"
              value={formData.account_holder_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.accountHolderName}
              helperText={errors.accountHolderName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={fieldStyle}
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
              sx={fieldStyle}
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
              sx={fieldStyle}
            />
          </Grid>

          {/* Bank Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Bank Name"
              name="bankName"
              value={formData.bank_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.bankName}
              helperText={errors.bankName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBalanceIcon
                      sx={{ color: "#FF7A00", fontSize: "1.2rem" }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={fieldStyle}
            />
          </Grid>

          {/* Branch Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Branch Name"
              name="branchName"
              value={formData.branch_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.branchName}
              helperText={errors.branchName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon
                      sx={{ color: "#FF7A00", fontSize: "1.2rem" }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={fieldStyle}
            />
          </Grid>

          {/* IFSC Code */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="IFSC Code"
              name="ifscCode"
              value={formData.ifsc_code}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.ifscCode}
              helperText={errors.ifscCode}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={fieldStyle}
            />
          </Grid>

          {/* MICR Code */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="MICR Code"
              name="micrCode"
              value={formData.micr_code}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.micrCode}
              helperText={errors.micrCode}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersIcon sx={{ color: "#FF7A00", fontSize: "1.2rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={fieldStyle}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
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
              "&:hover": {
                borderColor: "#6B7280",
                backgroundColor: "#F3F4F6",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveIcon />}
            onClick={handleUpdateBankDetail}
            sx={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #FF7A00 0%, #E65100 100%)",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              px: 3,
              py: 1,
              boxShadow: "0 4px 12px rgba(230, 81, 0, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #E65100 0%, #D84315 100%)",
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
