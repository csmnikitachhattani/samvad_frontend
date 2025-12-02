import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import NumbersIcon from "@mui/icons-material/Numbers";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import BankSubDetail from "@/components/Newspaper/Profile/BankSubDetail"
import newspaperService from "@/services/newspaperService";

export default function BankDetailsForm() {
  // Using backend API keys so inputs stay controlled
  const [formData, setFormData] = useState({
    account_no: "",
    account_holder_name: "",
    state: "",
    district: "",
    bank_name: "",
    branch_name: "",
    ifsc_code: "",
    micr_code: "",
    status: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await newspaperService.getNewspapersBankDetails("000019");
    setFormData(res?.data?.data[0] || {});
  };

  const handleUpdateBankDetail = async () => {
    try {
      const updateObject = {
        action: "edit",
        user_id: "00020",
        np_cd: "000019",
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
  };

  // Reset form
  const handleCancel = () => {
    setFormData({
      account_no: "",
      account_holder_name: "",
      state: "",
      district: "",
      bank_name: "",
      branch_name: "",
      ifsc_code: "",
      micr_code: "",
      status: "",
    });
  };

  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
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
          fontSize: "1.25rem",
        }}
      >
        Bank Details
      </Typography>

      <Grid container spacing={3}>
        {/* Account Number */}
        <Grid item size={{xs:12, sm:4}} >
          <TextField
            label="Account No."
            name="account_no"
            value={formData.account_no || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon sx={{ color: "#FF7A00" }} />
                </InputAdornment>
              ),
            }}
            sx={fieldStyle}
          />
        </Grid>

        {/* Account Holder Name */}
        <Grid item size={{xs:12, sm:4}}>
          <TextField
            label="Account Holder Name"
            name="account_holder_name"
            value={formData.account_holder_name || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#FF7A00" }} />
                </InputAdornment>
              ),
            }}
            sx={fieldStyle}
          />
        </Grid>

        {/* State */}
        <Grid item size={{xs:12, sm:4}}>
          <TextField
            label="State"
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon sx={{ color: "#FF7A00" }} />
                </InputAdornment>
              ),
            }}
            sx={fieldStyle}
          />
        </Grid>

        {/* District */}
        <Grid item size={{xs:12, sm:4}}>
          <TextField
            label="District"
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MapIcon sx={{ color: "#FF7A00" }} />
                </InputAdornment>
              ),
            }}
            sx={fieldStyle}
          />
        </Grid>

        {/* Bank Name */}
        <Grid item size={{xs:12, sm:4}}>
          <TextField
            label="Bank Name"
            name="bank_name"
            value={formData.bank_name || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={{ color: "#FF7A00" }} />
                </InputAdornment>
              ),
            }}
            sx={fieldStyle}
          />
        </Grid>

        {/* Branch Name */}
        <Grid item size={{xs:12, sm:4}}>
          <TextField
            label="Branch Name"
            name="branch_name"
            value={formData.branch_name || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon sx={{ color: "#FF7A00" }} />
                </InputAdornment>
              ),
            }}
            sx={fieldStyle}
          />
        </Grid>

        {/* IFSC Code */}
        <Grid item size={{xs:12, sm:4}}>
          <TextField
            label="IFSC Code"
            name="ifsc_code"
            value={formData.ifsc_code || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon sx={{ color: "#FF7A00" }} />
                </InputAdornment>
              ),
            }}
            sx={fieldStyle}
          />
        </Grid>

        {/* MICR Code */}
        <Grid item size={{xs:12, sm:4}}>
          <TextField
            label="MICR Code"
            name="micr_code"
            value={formData.micr_code || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon sx={{ color: "#FF7A00" }} />
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
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleUpdateBankDetail}
          sx={{
            background: "linear-gradient(135deg, #FF7A00 0%, #E65100 100%)",
          }}
        >
          Save Changes
        </Button>
      </Box>

      {/* <Box >
        <BankSubDetail />
      </Box> */}
    </Box>
  );
}
