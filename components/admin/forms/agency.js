import { useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  Grid,
  Paper,
  Divider
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
    console.log(formData);
  };

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
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Agency Name" name="agencyName" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Owner Name" name="ownerName" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="GSTIN" name="gstin" />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="City" name="city" />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="District" name="district" />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="State" name="state" />
            </Grid>

            <Divider flexItem sx={{ my: 2 }} />

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Contact Person" name="contactPerson" />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Phone" name="phone" />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Email" name="email" type="email" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Validity From"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="validityFrom"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Validity To"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="validityTo"
              />
            </Grid>

            {/* Services */}
            <Grid item xs={12}>
              <Typography fontWeight={500} mb={1}>
                Services
              </Typography>
              <Paper
                variant="outlined"
                sx={{ p: 2, borderRadius: 2, backgroundColor: "#fafafa" }}
              >
                {[1, 2, 3].map((id) => (
                  <FormControlLabel
                    key={id}
                    control={
                      <Checkbox onChange={() => handleServiceChange(id)} />
                    }
                    label={`Service ${id}`}
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
