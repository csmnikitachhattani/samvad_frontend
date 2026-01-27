"use client";
import React, { useState } from "react";
<<<<<<< HEAD
=======
import axiosClient from "@/lib/axiosClient";
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
<<<<<<< HEAD


const VehicleModal = ({open=true, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
=======
const VehicleModal = ({open, onClose, onSubmit }) => {
  const [data, setData] = useState({
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
    agencyId: "",
    vehicleNo: "",
    ownerName: "",
    fitnessUpto: "",
    insuranceUpto: "",
    rcPhotoFile: null,
    rcPhotoPath: "",
    createdBy: "",
    createdIpAddress: "",
  });
<<<<<<< HEAD

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
=======
  const createVehicle = async (payload) => {
    const formData = new FormData();
  
    // Required fields
    formData.append("AgencyId", data.agencyId);
    formData.append("VehicleNo", data.vehicleNo);
    formData.append("OwnerName", data.ownerName);
    formData.append("FitnessUpto", '2026-01-26T14:20:06.038Z');
    formData.append("InsuranceUpto", '2026-01-26T14:20:06.038Z');
  
    // File
    if (data.rcPhotoFile) {
      formData.append("RcPhotoFile", data.rcPhotoFile);
    }
  
    // Optional / audit fields
    formData.append("CreatedBy", data.createdBy);
    formData.append("CreatedIpAddress", data.createdIpAddress);
  
    return axiosClient.post("http://103.79.34.50:8083/api/ManageMaster/createledVehicle", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  

  const handleChange = (e) => {
    console.log("chnages")
    const { name, value, files } = e.target;
    setData({
      ...data,
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
      [name]: files ? files[0] : value,
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#0f4c3a",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        Vehicle Registration Details
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#f4fbf9", mt: 1 }}>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Agency ID"
                name="agencyId"
                fullWidth
                size="small"
<<<<<<< HEAD
                value={formData.agencyId}
=======
                value={data.agencyId}
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
                onChange={handleChange}
                sx={fieldStyle}
              />
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Vehicle Number"
                name="vehicleNo"
                fullWidth
                size="small"
<<<<<<< HEAD
                value={formData.vehicleNo}
=======
                value={data.vehicleNo}
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
                onChange={handleChange}
                sx={fieldStyle}

              />
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Owner Name"
                name="ownerName"
                fullWidth
                size="small"
<<<<<<< HEAD
                value={formData.ownerName}
=======
                value={data.ownerName}
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
                onChange={handleChange}
                sx={fieldStyle}
              />
            </Grid>
            <Grid item size={{xs:12}}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  height: "40px",
                  borderColor: "#0f4c3a",
                  color: "#0f4c3a",
                  "&:hover": {
                    borderColor: "#1f7a63",
                    backgroundColor: "#e6f3ef",
                  },
                }}
              >
                Upload RC Photo
                <input
                  type="file"
                  hidden
                  name="rcPhotoFile"
                  onChange={handleChange}
                />
              </Button>
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Fitness Upto"
                type="date"
                name="fitnessUpto"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
<<<<<<< HEAD
                value={formData.fitnessUpto}
=======
                value={data.fitnessUpto}
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
                onChange={handleChange}
              />
            </Grid>

            <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Insurance Upto"
                type="date"
                name="insuranceUpto"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
<<<<<<< HEAD
                value={formData.insuranceUpto}
=======
                value={data.insuranceUpto}
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Created By"
                name="createdBy"
                fullWidth
                size="small"
<<<<<<< HEAD
                value={formData.createdBy}
=======
                value={data.createdBy}
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
                onChange={handleChange}
              />
            </Grid>

            <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Created IP Address"
                name="createdIpAddress"
                fullWidth
                size="small"
<<<<<<< HEAD
                value={formData.createdIpAddress}
=======
                value={data.createdIpAddress}
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          backgroundColor: "#f4fbf9",
          p: 2,
        }}
      >
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0f4c3a",
            "&:hover": { backgroundColor: "#1f7a63" },
          }}
<<<<<<< HEAD
          onClick={() => onSubmit(formData)}
=======
          onClick={() => createVehicle()}
>>>>>>> 8041c6cd433059a7319010c5b33f3f88022ef1a7
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleModal;
