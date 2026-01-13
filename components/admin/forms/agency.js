import { useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  Grid,
  Paper
} from "@mui/material";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
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

    const payload = {
      ...formData,
      validityFrom: new Date(formData.validityFrom).toISOString(),
      validityTo: new Date(formData.validityTo).toISOString()
    };

    console.log("Payload:", payload);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" mb={3}>
        Create Agency
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Agency Name" name="agencyName" onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Owner Name" name="ownerName" onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="GSTIN" name="gstin" onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={3}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="City" name="city" onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="District" name="district" onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="State" name="state" onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Contact Person" name="contactPerson" onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Phone" name="phone" onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Validity From"
              type="date"
              name="validityFrom"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Validity To"
              type="date"
              name="validityTo"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Services</Typography>
            {[1, 2, 3].map((id) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox onChange={() => handleServiceChange(id)} />
                }
                label={`Service ${id}`}
              />
            ))}
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
              }
              label="Active"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AgencyForm;
