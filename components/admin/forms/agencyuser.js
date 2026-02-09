

'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';

// Validation regex patterns
const validationPatterns = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  phone: /^[6-9]\d{9}$/,
  userName: /^[a-zA-Z\s]{3,50}$/,
};

const SimpleAgencyUserForm = () => {
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    agencyName: '',
    agencyId: '',
    userName: '',
    contactNo: '',
    emailId: '',
    address: '',
    loginUserTypeCd: '',
    loginUserTypeName: '',
    districtCode: '',
    stdCode: '',
    landlineNo: '',
    faxNo: '',
  });

  console.log("formData" + JSON.stringify(formData));
  /* ================= FETCH AGENCY ================= */
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const res = await axios.get(
          'http://103.79.34.50:8083/api/ManageMaster/allagency'
        );
        setAgencies(res.data.result || []);
      } catch (error) {
        console.error('Error fetching agencies', error);
      }
    };
    fetchAgencies();
  }, []);

  /* ================= VALIDATION ================= */
  const validateField = (name, value) => {
    switch (name) {
      case 'agencyName':
        return !value ? 'Agency is required' : '';
      case 'userName':
        if (!value) return 'User name is required';
        if (!validationPatterns.userName.test(value))
          return 'Only letters allowed (3–50 chars)';
        return '';
      case 'contactNo':
        if (!value) return 'Contact number is required';
        if (!validationPatterns.phone.test(value))
          return 'Invalid mobile number';
        return '';
      case 'emailId':
        if (!value) return 'Email is required';
        if (!validationPatterns.email.test(value))
          return 'Invalid email';
        return '';
      // case 'address':
        if (!value) return 'Address is required';
        if (value.length < 10) return 'Minimum 10 characters';
        return '';
      default:
        return '';
    }
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("value" + value)
    if (name === 'agencyName') {
      const selectedAgency = agencies.find(
        (a) => a.agencyName === value
      );
      // selectedAgency{"agencyID":4,"agencyName":"Angenvy","ownerName":"kjhjkhjkh","gstin":"bbnmb","address":"hvnvbnv","city":"raipur","district":"017","state":"","contactPerson":null,"phone":"7999493840","email":"26nikitachhattani@gmail.com","validityFrom":"2026-01-05T00:00:00","validityTo":"2026-01-20T00:00:00","isActive":true,"serviceIds":[],"modifiedByUserId":0,"modifiedByUserName":null,"modifiedByUserTypeCd":null,"modifiedByUserTypeName":null,"modifiedIpAddress":null}

      console.log("selectedAgency" + JSON.stringify(selectedAgency));
      if (selectedAgency) {
        setFormData({
          agencyName: selectedAgency.agencyName,
          agencyId: selectedAgency.agencyID || '',
          userName: selectedAgency.ownerName || '',
          contactNo: selectedAgency.phone || '',
          emailId: selectedAgency.email || '',
          address: selectedAgency.address || '',
          loginUserTypeCd: selectedAgency.loginUserTypeCd || '',
          loginUserTypeName: selectedAgency.loginUserTypeName || '',
          districtCode: selectedAgency.district || '',
          stdCode: selectedAgency.state || '',
          landlineNo: selectedAgency.landlineNo || '',
          faxNo: selectedAgency.faxNo || '',
        });
      }
    } 

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
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
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const requiredFields = [
  //     'agencyName',
  //     'userName',
  //     'contactNo',
  //     'emailId',
  //     'address',
  //   ];

  //   const newErrors = {};
  //   requiredFields.forEach((field) => {
  //     const err = validateField(field, formData[field]);
  //     if (err) newErrors[field] = err;
  //   });

  //   if (Object.keys(newErrors).length) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     console.log('Submitting:', formData);
  //     await new Promise((r) => setTimeout(r, 1500));
  //     setSuccess(true);

  //     setTimeout(() => {
  //       setFormData({
  //         agencyName: '',
  //         agencyId: '',
  //         userName: '',
  //         contactNo: '',
  //         emailId: '',
  //         address: '',
  //         loginUserTypeCd: '',
  //         loginUserTypeName: '',
  //         districtCode: '',
  //         stdCode: '',
  //         landlineNo: '',
  //         faxNo: '',
  //       });
  //       setSuccess(false);
  //     }, 2000);
  //   } catch (err) {
  //     setErrors({ submit: 'Failed to submit form' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };



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
    console.log("Submitting:", formData);

    const response = await axios.post(
      "http://103.79.34.50:8083/api/Login/agencyloginregistartion", 
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response:", response.data);

    setSuccess(true);

    // reset form after success
    setTimeout(() => {
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
      setSuccess(false);
    }, 2000);

  } catch (err) {
    console.error(err);

    setErrors({
      submit:
        err.response?.data?.message ||
        "Failed to submit form. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};

  /* ================= UI ================= */
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Agency User Registration
        </Typography>

        {success && <Alert severity="success">Registration successful!</Alert>}
        {errors.submit && <Alert severity="error">{errors.submit}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Agency */}
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
                  <MenuItem
                    key={agency.agencyId}
                    value={agency.agencyName}
                  >
                    {agency.agencyName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* User Name */}
         <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                required
                name="userName"
                label="User Name"
                value={formData.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.userName)}
                helperText={errors.userName}
              />
            </Grid>

            {/* Contact */}
           <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                required
                name="contactNo"
                label="Mobile Number"
                value={formData.contactNo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.contactNo)}
                helperText={errors.contactNo}
              />
            </Grid>

            {/* Email */}
           <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                required
                name="emailId"
                label="Email Address"
                value={formData.emailId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.emailId)}
                helperText={errors.emailId}
              />
            </Grid>

            {/* Address */}
           <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.address)}
                helperText={errors.address}
              />
            </Grid>

            {/* Optional fields (unchanged) */}
            <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                name="loginUserTypeCd"
                label="User Type Code"
                value={formData.loginUserTypeCd}
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
                name="districtCode"
                label="District Code"
                value={formData.districtCode}
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

   <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                name="faxNo"
                label="Fax Number"
                value={formData.faxNo}
                onChange={handleChange}
              />
            </Grid>

        
          </Grid>
           <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <Button  sx={{ mt: 2 }}

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
                  'Submit'
                )}
              </Button>
            </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SimpleAgencyUserForm;
