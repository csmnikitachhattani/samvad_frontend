import React, { useEffect, useState } from "react";
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  ListItemText
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import adminServices from "@/services/adminServices";
import commonServices from "@/services/commonServices";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300
    }
  }
};

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
  const [districts, setDistricts] = useState([]);
  const [services, setServices] = useState([]);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&:hover": { backgroundColor: "#FFF8F1" },
      "&.Mui-focused fieldset": { borderColor: "#030236" }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleServiceChange = (event) => {
    const {
      target: { value }
    } = event;

    setFormData((prev) => ({
      ...prev,
      serviceIds: typeof value === "string" ? value.split(",") : value
    }));
  };

  const handleAddAgency = async () => {
    try {
      const payload = {
        //...formData
        agencyName: formData.agencyName,
        ownerName : formData.ownerName,
        gstin:formData.gstin,
        address: formData.address,
        district: formData.district,
        city : formData.city,
        state: formData.state,
        district:formData.district,
        contact_person:formData.contact_person,
        phone: formData.phone,
        email: formData.email,
        validityFrom: formData.validityFrom,
        validityTo:formData.validityTo,
        isActive: formData.isActive,
        serviceIds: formData.serviceIds,
        createdByUserId: formData.createdByUserId,
        createdByUserName: formData.createdByUserName,
        createdByUserTypeCd: formData.createdByUserTypeCd,
        createdByUserTypeName: formData.createdByUserTypeName,
        createdIpAddress: formData.createdIpAddress
      };

      const result = await adminServices.createAgency(payload);
      console.log("Agency Created:", result);
    } catch (error) {
      console.error("Error creating agency:", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const statesRes = await commonServices.getStates();
        setStates(statesRes?.data?.data || []);

        const districtRes = await commonServices.getDistrict();
        setDistricts(districtRes?.data?.data || []);

        const serviceRes = await adminServices.getServices();
        setServices(serviceRes?.result || []);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 6 }}>
      <Paper elevation={4} sx={{ width: "90%", mx: "auto", borderRadius: 3 }}>
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
          <Typography variant="body2">
            Enter agency details and service configuration
          </Typography>
        </Box>

        {/* Form */}
        <Box sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item size={{xs:12, md:4}}>
              <TextField
                fullWidth
                label="Agency Name"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item size={{xs:12, md:4}}>
              <TextField
                fullWidth
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item size={{xs:12, md:4}}>
              <TextField
                fullWidth
                label="GSTIN"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item size={{xs:12}}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item size={{xs:12, md:4}}>
              <TextField
                select
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  )
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

            <Grid item size={{xs:12, md:4}}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item size={{xs:12, md:4}}>
              <TextField
                select
                fullWidth
                label="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
                sx={inputStyle}
              >
                {districts.map((d) => (
                  <MenuItem key={d.district_code} value={d.district_code}>
                    {d.district_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth label="Contact Person"  value={formData.contact_person} sx={inputStyle} name="contactPerson" />
            </Grid>

            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth label="Phone" type="number" value={formData.phone}  sx={inputStyle} name="phone" />
            </Grid>

            <Grid item size={{ xs:12, md:4}}>
              <TextField fullWidth label="Email" value={formData.email}  sx={inputStyle} name="email" type="email" />
            </Grid>
            {/* SERVICES MULTI SELECT */}
            <Grid item size={{xs:12,}}>
              <FormControl fullWidth sx={inputStyle}>
                <InputLabel>Services</InputLabel>
                <Select
                  multiple
                  value={formData.serviceIds}
                  onChange={handleServiceChange}
                  input={<OutlinedInput label="Services" />}
                  renderValue={(selected) =>
                    services
                      .filter((s) => selected.includes(s.serviceId))
                      .map((s) => s.serviceName)
                      .join(", ")
                  }
                  MenuProps={MenuProps}
                >
                  {services.map((s) => (
                    <MenuItem key={s.serviceId} value={s.serviceId}>
                      <Checkbox
                        checked={formData.serviceIds.includes(s.serviceId)}
                      />
                      <ListItemText primary={s.serviceName} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item size={{ xs:12, md:6}}>
              <TextField
                fullWidth
                label="Validity From"
                type="date"
                value={formData.validityTo}
                InputLabelProps={{ shrink: true }}
                name="validityFrom"
                sx={inputStyle}
              />
            </Grid>

            <Grid item size={{ xs:12, md:6}}>
              <TextField
                fullWidth
                label="Validity To"
                value={formData.validityFrom}
                type="date"
                InputLabelProps={{ shrink: true }}
                name="validityTo"
                sx={inputStyle}
              />
            </Grid>
            {/* STATUS */}
            <Grid item size={{xs:12}}>
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
            
            {/* SUBMIT */}
            <Grid item xs={12} textAlign="right">
              <Button
                variant="contained"
                size="large"
                onClick={handleAddAgency}
                sx={{
                  px: 4,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #f9c74f 0%, #f9844a 100%)"
                }}
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
