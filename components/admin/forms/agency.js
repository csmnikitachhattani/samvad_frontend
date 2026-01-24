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
  Divider,
  MenuItem,
} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
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
      "&.Mui-focused fieldset": { borderColor: "#030236" },
    },
  };
  const handleServiceChange = (event) => {
    const {
      target: { value },
    } = event;

    setFormData((prev) => ({
      ...prev,
      serviceIds: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const [services, setServices] = useState([]);
  const handleAddAgency = async () => {

    try {
      const updateObject = {
        agencyName: formData.agencyName,
        ownerName: formData.ownerName,
        gstin: formData.gstin,
        address: formData.address,
        district: formData.district,
        city: formData.city,
        state: formData.state,
        district: formData.district,
        contact_person: formData.contact_person,
        phone: formData.phone,
        email: formData.email,
        validityFrom: formData.validityFrom,
        validityTo: formData.validityTo,
        isActive: formData.isActive,
        serviceIds: formData.serviceIds,
        createdByUserId: formData.createdByUserId,
        createdByUserName: "Nikita",
        createdByUserTypeCd: formData.createdByUserTypeCd,
        createdByUserTypeName: formData.createdByUserTypeName,
        createdIpAddress: formData.createdIpAddress
      };
      console.log(updateObject)
      const result = await adminServices.createAgency(updateObject);
      console.log("User Updated:", result);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };
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
    async function fetchDistrict() {
      try {
        const response = await commonServices.getDistrict();
        setDistricts(response.data?.data || []);
        console.log(response.data?.data)
      } catch (error) {
        console.error("Failed to fetch states", error);
      }
    }
    fetchStates();
    fetchDistrict();
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
            <Grid item size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Agency Name" onChange={handleChange} value={formData.agencyName} name="agencyName" sx={inputStyle} />
            </Grid>

            <Grid item size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Owner Name" onChange={handleChange} value={formData.ownerName} name="ownerName" sx={inputStyle} />
            </Grid>

            <Grid item size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="GSTIN" onChange={handleChange} value={formData.gstin} name="gstin" sx={inputStyle} />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                multiline
                sx={inputStyle}
                onChange={handleChange}
                rows={3}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 4 }}>
              <TextField
                select
                label="States"
                name="State_Code"
                value={formData.state}
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
            <Grid item size={{ xs: 12, md: 4 }}>
              <TextField fullWidth

                sx={inputStyle} label="City" onChange={handleChange} value={formData.city} name="city" />
            </Grid>

            <Grid item size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="District"
                select
                name="district"
                value={formData.district}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ color: "#030236" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle} >
                {districts.map((s) => (
                  <MenuItem key={s.district_code} value={s.district_code}>
                    {s.district_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* <Divider flexItem sx={{ my: 2 }} /> */}

            <Grid item size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Contact Person" value={formData.contactPerson}     onChange={handleChange} sx={inputStyle} name="contactPerson" />
            </Grid>

            <Grid item size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Phone" value={formData.phone}  onChange={handleChange} sx={inputStyle} name="phone" />
            </Grid>

            <Grid item size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Email" sx={inputStyle} value={formData.email}     onChange={handleChange} name="email" type="email" />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Validity From"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="validityFrom"
                value={formData.validityFrom}     
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Validity To"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="validityTo"
                value={formData.validityTo}    
                 onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <Select
                multiple
                value={formData.serviceIds}
                onChange={handleServiceChange}
                input={<OutlinedInput label="Service" />}
                MenuProps={MenuProps}
                fullWidth
                sx={inputStyle}
              >
                {services.map((s) => (
                  <MenuItem key={s.serviceId} value={s.serviceId} >
                    {/* <Checkbox checked={formData.serviceIds.includes(s.serviceId)} /> */}
                    {/* <ListItemText primary={s.serviceName} /> */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        width: "100%",
                      }}
                    >

                      <ListItemText primary={s.serviceName} />
                    </Box>
                  </MenuItem>
                ))}
              </Select>


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
                onClick={handleAddAgency}
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
