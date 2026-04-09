"use client";
import React, { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import adminServices from "@/services/adminServices";
import { toggleCreateModal } from "@/store/modules/outdoor/vehicleSlice.js";
import { useRouter } from "next/navigation";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";
import { useSelector, useDispatch } from "react-redux";
import { vehicleField } from '@/lib/rules'
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
  MenuItem
} from "@mui/material";

const VehicleModal = ({ open = true, onClose, onSubmit }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ModalShow = useSelector((state) => state.vehicle.ModalShow);
  const [vendors, setVendors] = useState([])
  const [errors, setErrors] = useState({})

  const closeUploadDialog = () => {
    dispatch(toggleCreateModal({
      show: false,
    }))
  }
  const [data, setData] = useState({
    agencyId: "",
    vehicleNo: "",
    ownerName: "",
    fitnessUpto: "",
    insuranceUpto: "",
    rcPhotoFile: null,
    rcPhotoPath: "",
    createdBy: "",
    createdIpAddress: "",
    specification: "",
  });
  const createVehicle = async () => {
    try {
      const formData = new FormData();

      // Required fields
      formData.append("AgencyId", data.agencyId);
      formData.append("VehicleNo", data.vehicleNo);
      formData.append("OwnerName", data.ownerName);
      formData.append("FitnessUpto", "2026-01-26T14:20:06.038Z");
      formData.append("InsuranceUpto", "2026-01-26T14:20:06.038Z");
      formData.append("InsuranceUpto", data.specification);
      // File
      if (data.rcPhotoFile) {
        formData.append("RcPhotoFile", data.rcPhotoFile);
      }

      // Optional / audit fields
      formData.append("CreatedBy", '01');
      formData.append("CreatedIpAddress", getPublicIP());

      const response = await axiosClient.post(
        "http://103.79.34.50:8083/api/ManageMaster/createledVehicle",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      
      );
      dispatch(showNotification({ message: "Saved successfully!", severity: "success" }));
      router.push("/admin/vehicle");
      resetForm()
      closeUploadDialog();

      return response;
    } catch (error) {
      console.error("Create vehicle failed:", error);
      throw error; // rethrow so caller can handle toast/snackbar
    }
  };

   function resetForm(){
    setData({
      agencyId: "",
      vehicleNo: "",
      ownerName: "",
      fitnessUpto: "",
      insuranceUpto: "",
      rcPhotoFile: null,
      rcPhotoPath: "",
      createdBy: "",
      createdIpAddress: "",
    })
  }
  async function fetchServiceTypes() {
    try {
      const response = await adminServices.getVendorList(1);
      setVendors(response.result);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }
  useEffect(() => {
    fetchServiceTypes()
  }, [])
  async function getPublicIP() {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    console.log(data.ip);
    return data.ip
  }
  const handleChange = (e) => {
   
    const { name, value, files } = e.target; 
    console.log("changes", value, name)
    if (name === "vehicleNo") {
      if (!value) {
        setErrors({ ...errors, vehicleNo: vehicleField.required.message })
      } else if (!vehicleField.pattern.value.test(value)) {
        setErrors({ ...errors, vehicleNo: vehicleField.pattern.message })
      }
      else {
        setErrors({ ...errors, vehicleNo: ""}) 
      }
    }
    setData({
      ...data,
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
    <Dialog open={ModalShow} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#0f4c3a",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        Vehicle Registration Details {ModalShow}
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#f4fbf9", mt: 1 }}>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                select
                label="Agency ID"
                name="agencyId"
                fullWidth
                size="small"
                value={data.agencyId}
                onChange={handleChange}
                sx={fieldStyle}
              >
                {vendors.length > 0 ? (
                  vendors.map((vendor) => (
                    <MenuItem key={vendor.AgencyID} value={vendor.AgencyID}>
                      {vendor.AgencyName}
                    </MenuItem>
                  ))
                ) : (
                    <MenuItem disabled>
                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        No available Vendors
        </Typography>
                    </MenuItem>
                  )}
              </TextField>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Vehicle Number"
                name="vehicleNo"
                fullWidth
                size="small"
                value={data.vehicleNo.toUpperCase()}
                onChange={handleChange}
                sx={fieldStyle}
                error={!!errors.vehicleNo} 
                helperText={errors.vehicleNo}       

              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Owner Name"
                name="ownerName"
                fullWidth
                size="small"
                value={data.ownerName}
                onChange={handleChange}
                sx={fieldStyle}
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
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
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Fitness Upto"
                type="date"
                name="fitnessUpto"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={data.fitnessUpto}
                onChange={handleChange}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Insurance Upto"
                type="date"
                name="insuranceUpto"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={data.insuranceUpto}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item size={{ xs: 12, md: 12 }}>
              <TextField
                label="Specification"
                name="specification"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={data.specification}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Created By"
                name="createdBy"
                fullWidth
                size="small"
                value={data.createdBy}
                onChange={handleChange}
              />
            </Grid>

            <Grid item size={{xs:12, md:6}}>
              <TextField
                label="Created IP Address"
                name="createdIpAddress"
                fullWidth
                size="small"
                value={data.createdIpAddress}
                onChange={handleChange}
              />
            </Grid> */}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          backgroundColor: "#f4fbf9",
          p: 2,
        }}
      >
        <Button onClick={onClose} variant="outlined"
          onClick={() => closeUploadDialog()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0f4c3a",
            "&:hover": { backgroundColor: "#1f7a63" },
          }}
          onClick={() => createVehicle()}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleModal;
