
"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  Typography,
  Container,
  Alert,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

// Validation regex patterns
const validationPatterns = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  phone: /^[6-9]\d{9}$/,
  userName: /^[a-zA-Z\s]{3,50}$/,
};

const SimpleAgencyUserForm = () => {
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const dialogContentRef = useRef(null);

  const [formData, setFormData] = useState({
    agencyName: "",
    agencyId: "",
    userName: "",
    contactNo: "",
    emailId: "",
    address: "",
    loginUserTypeCd: "",
    loginUserTypeName: "",
    districtCode: "",
    stdCode: "",
    landlineNo: "",
    faxNo: "",
  });

  /* ================= FETCH AGENCY ================= */
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const res = await axios.get(
          "http://103.79.34.50:8083/api/ManageMaster/allagency",
        );
        setAgencies(res.data.result || []);
      } catch (error) {
        console.error("Error fetching agencies", error);
      }
    };
    fetchAgencies();
  }, []);

  /* ================= VALIDATION ================= */
  const validateField = (name, value) => {
    switch (name) {
      case "agencyName":
        return !value ? "Agency is required" : "";
      case "userName":
        if (!value) return "Owner name is required";
        if (!validationPatterns.userName.test(value))
          return "Only letters allowed (3–50 chars)";
        return "";
      case "contactNo":
        if (!value) return "Contact number is required";
        if (!validationPatterns.phone.test(value))
          return "Invalid mobile number";
        return "";
      case "emailId":
        if (!value) return "Email is required";
        if (!validationPatterns.email.test(value)) return "Invalid email";
        return "";
      case "address":
        if (!value) return "Address is required";
        return "";
      default:
        return "";
    }
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "agencyName") {
      const selectedAgency = agencies.find((a) => a.agencyName === value);

      if (selectedAgency) {
        setFormData({
          agencyName: selectedAgency.agencyName,
          agencyId: selectedAgency.agencyID || "",
          userName: selectedAgency.agencyName || "",
          contactNo: selectedAgency.phone || "",
          emailId: selectedAgency.email || "",
          address: selectedAgency.address || "",
          loginUserTypeCd: selectedAgency.loginUserTypeCd || "",
          loginUserTypeName: selectedAgency.loginUserTypeName || "",
          districtCode: selectedAgency.district || "",
          stdCode: selectedAgency.state || "",
          landlineNo: selectedAgency.landlineNo || "",
          faxNo: selectedAgency.faxNo || "",
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "agencyName",
      "userName",
      "contactNo",
      "emailId",
      "address",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://103.79.34.50:8083/api/Login/agencyloginregistartion",
        formData,
        { headers: { "Content-Type": "application/json" } },
      );

      setSuccessMessage(
        <>
          <Typography variant="h6" gutterBottom>
            {response.data.message}
          </Typography>
          <Typography>User ID: {response.data.user_Id}</Typography>
          <Typography>Password: {response.data.password}</Typography>
        </>,
      );

      setOpenSuccessModal(true);
      setErrors({});

      setFormData({
        agencyName: "",
        agencyId: "",
        userName: "",
        contactNo: "",
        emailId: "",
        address: "",
        loginUserTypeCd: "",
        loginUserTypeName: "",
        districtCode: "",
        stdCode: "",
        landlineNo: "",
        faxNo: "",
      });
    } catch (err) {
      setErrors({
        submit:
          err.response?.data?.message ||
          "Failed to submit form. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= PRINT ================= */
  const handlePrint = () => {
    const content = dialogContentRef.current.innerHTML;

    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Agency User Credentials</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 24px;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  /* ================= UI ================= */
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Outdoor Agency Login Creation
        </Typography>

        {errors.submit && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.submit}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                select
                fullWidth
                required
                name="agencyName"
                label="Select Agency"
                value={formData.agencyName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.agencyName)}
                helperText={errors.agencyName}
              >
                <MenuItem value="">
                  <em>Select an agency</em>
                </MenuItem>
                {agencies.map((agency) => (
                  <MenuItem key={agency.agencyID} value={agency.agencyName}>
                    {agency.agencyName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {[
              ["userName", "User Name"],
              ["contactNo", "Mobile Number"],
              ["emailId", "Email Address"],
              ["address", "Address"],
              ].map(([name, label]) => (
              <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={name}>
                <TextField
                  fullWidth
                  required
                  name={name}
                  label={label}
                  value={formData[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors[name])}
                  helperText={errors[name]}
                  multiline={name === "address"}
                  rows={name === "address" ? 3: 1}
                />
              </Grid>
            ))}
            <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                name="faxNo"
                label="Fax Number"
                value={formData.faxNo}
                onChange={handleChange}
              />
            </Grid>



 <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                name="loginUserTypeName"
                label="User Type Name"
                value={formData.loginUserTypeName}
                onChange={handleChange}
              />
            </Grid>

       

       <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                name="stdCode"
                label="STD Code"
                value={formData.stdCode}
                onChange={handleChange}
              />
            </Grid>

           <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                name="landlineNo"
                label="Landline Number"
                value={formData.landlineNo}
                onChange={handleChange}
              />
            </Grid>

          </Grid>

          <Button
            sx={{ mt: 3 }}
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Paper>

      {/* SUCCESS DIALOG */}
      <Dialog
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent dividers ref={dialogContentRef}>
          <Alert severity="success">{successMessage}</Alert>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" onClick={handlePrint}>
            Print
          </Button>
          <Button variant="outlined" onClick={() => setOpenSuccessModal(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SimpleAgencyUserForm;

