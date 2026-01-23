"use client";
import React, { useState } from "react";
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


const VehicleModal = ({open=true, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
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
                value={formData.agencyId}
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
                value={formData.vehicleNo}
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
                value={formData.ownerName}
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
                value={formData.fitnessUpto}
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
                value={formData.insuranceUpto}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Created By"
                name="createdBy"
                fullWidth
                size="small"
                value={formData.createdBy}
                onChange={handleChange}
              />
            </Grid>

            <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Created IP Address"
                name="createdIpAddress"
                fullWidth
                size="small"
                value={formData.createdIpAddress}
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
          onClick={() => onSubmit(formData)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleModal;
