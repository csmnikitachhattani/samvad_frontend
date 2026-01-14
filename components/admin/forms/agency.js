import React, {useEffect, useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  InputAdornment,
  Grid,
  Paper,
  Divider,
  MenuItem,
} from "@mui/material";
import adminServices from "@/services/adminServices";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import commonServices from "@/services/commonServices";
const AgencyForm = () => {
  const [formData, setFormData] = useState({
    agencyName: "",
    ownerName: "",
    gstin: "",
    address: "",
    city: "",
    district: "",
    state: "",
    contactPerson: "",
    phone: "",
    email: "",
    validityFrom: "",
    validityTo: "",
    serviceIds: [],
    isActive: true
  });
  const [states, setStates] = useState([]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&:hover": { backgroundColor: "#FFF8F1" },
      "&.Mui-focused fieldset": { borderColor: "#FF7A00" },
    },
  };
  const handleServiceChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      serviceIds: prev.serviceIds.includes(id)
        ? prev.serviceIds.filter((s) => s !== id)
        : [...prev.serviceIds, id]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const [services, setServices] = useState([]);
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
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await adminServices.getServices();
        setServices(response?.result || []);
        console.log(response)
      } catch (error) {
        console.error("Failed to fetch states", error);
      }
    }
    fetchServices();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          width: '90%',
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 4,
            py: 3,
            background: "linear-gradient(135deg, #e0e0e0 0%, #f9c74f 100%)"
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Create Agency
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter agency details and service configuration
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth label="Agency Name" name="agencyName" sx={{height: "40px"}} />
            </Grid>

            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth label="Owner Name" name="ownerName" />
            </Grid>

            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth label="GSTIN" name="gstin" />
            </Grid>

            <Grid item size={{ xs:12}}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
              />
            </Grid>

            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth
            
            sx={inputStyle}label="City" name="city" />
            </Grid>

            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth label="District" name="district" />
            </Grid>

            <Grid item size={{ xs:12, md:4}}>
            <TextField
            select
            label="States"
            name="State_Code"
            value={formData.State_Code}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: "#030236" }} />
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

            {/* <Divider flexItem sx={{ my: 2 }} /> */}

            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth label="Contact Person" name="contactPerson" />
            </Grid>

            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth label="Phone" name="phone" />
            </Grid>

            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth label="Email" name="email" type="email" />
            </Grid>

            <Grid item size={{ xs:12, md:6}}>
              <TextField
                fullWidth
                label="Validity From"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="validityFrom"
              />
            </Grid>

            <Grid item size={{ xs:12, md:6}}>
              <TextField
                fullWidth
                label="Validity To"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="validityTo"
              />
            </Grid>

            {/* Services */}
            <Grid item size={{ xs:12,}}>
              <Typography fontWeight={500} mb={1}>
                Services
              </Typography>
              <Paper
                variant="outlined"
                sx={{ p: 2, borderRadius: 2, backgroundColor: "#fafafa" }}
              >
               
                {services.map((service) => (
                  <FormControlLabel
                    key={service.serviceId}
                    control={
                      <Checkbox onChange={() => handleServiceChange(id)} />
                    }
                    label={`Service ${service.serviceName}`}
                  />
                ))}
              </Paper>
            </Grid>

            {/* Status */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isActive}
                    name="isActive"
                    onChange={handleChange}
                  />
                }
                label="Active Agency"
              />
            </Grid>

            {/* Submit */}
            <Grid item xs={12} textAlign="right">
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #f9c74f 0%, #f9844a 100%)"
                }}
                type="submit"
              >
                Save Agency
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AgencyForm;
