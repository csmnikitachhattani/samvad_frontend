import React, { useState, useEffect } from "react";
import {
  Box,
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
import newspaperService from "@/services/newspaperService";

export default function BankDetailsForm() {
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

  const labelStyle = {
    fontSize: "14px",
    fontWeight: 600,
    color: "#6B7280",
    marginBottom: "4px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  const valueStyle = {
    fontSize: "16px",
    fontWeight: 500,
    color: "#111827",
    backgroundColor: "#FFF8F1",
    padding: "10px 14px",
    borderRadius: "10px",
  };

  return (
    <Box sx={{ fontFamily: "'Inter', sans-serif", marginTop: "30px", border: "1px solid #e5e5e5", padding: "10px" }}>
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
        <Grid item xs={12} sm={6}>
          <Typography sx={labelStyle}>
            <NumbersIcon sx={{ color: "#FF7A00" }} /> Account No.
          </Typography>
          <Typography sx={valueStyle}>{formData.account_no || "-"}</Typography>
        </Grid>

        {/* Account Holder Name */}
        <Grid item xs={12} sm={6}>
          <Typography sx={labelStyle}>
            <PersonIcon sx={{ color: "#FF7A00" }} /> Account Holder Name
          </Typography>
          <Typography sx={valueStyle}>{formData.account_holder_name || "-"}</Typography>
        </Grid>

        {/* State */}
        <Grid item xs={12} sm={6}>
          <Typography sx={labelStyle}>
            <PublicIcon sx={{ color: "#FF7A00" }} /> State
          </Typography>
          <Typography sx={valueStyle}>{formData.state || "-"}</Typography>
        </Grid>

        {/* District */}
        <Grid item xs={12} sm={6}>
          <Typography sx={labelStyle}>
            <MapIcon sx={{ color: "#FF7A00" }} /> District
          </Typography>
          <Typography sx={valueStyle}>{formData.district || "-"}</Typography>
        </Grid>

        {/* Bank Name */}
        <Grid item xs={12} sm={6}>
          <Typography sx={labelStyle}>
            <AccountBalanceIcon sx={{ color: "#FF7A00" }} /> Bank Name
          </Typography>
          <Typography sx={valueStyle}>{formData.bank_name || "-"}</Typography>
        </Grid>

        {/* Branch Name */}
        <Grid item xs={12} sm={6}>
          <Typography sx={labelStyle}>
            <BusinessIcon sx={{ color: "#FF7A00" }} /> Branch Name
          </Typography>
          <Typography sx={valueStyle}>{formData.branch_name || "-"}</Typography>
        </Grid>

        {/* IFSC Code */}
        <Grid item xs={12} sm={6}>
          <Typography sx={labelStyle}>
            <NumbersIcon sx={{ color: "#FF7A00" }} /> IFSC Code
          </Typography>
          <Typography sx={valueStyle}>{formData.ifsc_code || "-"}</Typography>
        </Grid>

        {/* MICR Code */}
        <Grid item xs={12} sm={6}>
          <Typography sx={labelStyle}>
            <NumbersIcon sx={{ color: "#FF7A00" }} /> MICR Code
          </Typography>
          <Typography sx={valueStyle}>{formData.micr_code || "-"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
