"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputAdornment,
  Grid,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import commonServices from "@/services/commonServices";
import { toggleCreateModal } from "@/store/modules/outdoor/vehicleSlice.js";
import { useRouter } from "next/navigation";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  agencyID: "",
  LocationName: "",
  district: "",
  state: "",
  city: "",
  LocationType: "",
  DisplayLandmark:"",
  DisplayBoardSize: "",
  BoardLatitude: "",
  BoardLongitude: '',
  Facing: '',
  pincode: "",
  latitude: "",
  longitude: "",
  validityFrom:"",
  validityTo:"",
  StartTime:'',
  EndTime: "", 
  isActive: true,
};

const CreateLocationDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const ModalShow = useSelector((state) => state.vehicle.ModalShow);
const closeUploadDialog = () =>{
  dispatch(toggleCreateModal({
    show: false,  
  }))
}
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
const [states, setStates] = useState([]);
const [districts, setDistricts] = useState([]);
 
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&:hover": { backgroundColor: "#FFF8F1" },
      "&.Mui-focused fieldset": { borderColor: "#030236" },
    },
  };

  const createVehicle = async () => {
    try {
      const formData = new FormData();
      formData.append("AgencyId", data.agencyId);
      formData.append("VehicleNo", data.vehicleNo);
      formData.append("OwnerName", data.ownerName);
      formData.append("FitnessUpto", "2026-01-26T14:20:06.038Z");
      formData.append("InsuranceUpto", "2026-01-26T14:20:06.038Z");
      if (data.rcPhotoFile) formData.append("RcPhotoFile", data.rcPhotoFile);
      formData.append("CreatedBy", data.createdBy);
      formData.append("CreatedIpAddress", data.createdIpAddress);

      const response = await axiosClient.post(
        "http://103.79.34.50:8083/api/ManageMaster/createledVehicle",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      closeUploadDialog();
      return response;
    } catch (error) {
      console.error("Create vehicle failed:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axios.post("/api/location/create", formData);

      onClose();
      setFormData(initialState);
    } catch (error) {
      console.error("Create Location Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={ModalShow} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle
        sx={{
          backgroundColor: "#0f4c3a",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        Create Display Board 
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1} py={3}>
        <Grid item size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Agency ID" onChange={handleChange} value={formData.agencyID} name="agencyID" sx={inputStyle} />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Location Name" onChange={handleChange} value={formData.LocationName} name="LocationName" sx={inputStyle} />
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
              <TextField
                select
                label="States"
                name="state"
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

          <Grid item size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Location Type" onChange={handleChange} value={formData.LocationType} name="LocationType" sx={inputStyle} />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Display Landmark" onChange={handleChange} value={formData.DisplayLandmark} name="DisplayLandmark" sx={inputStyle} />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Display Board Size" onChange={handleChange} value={formData.DisplayBoardSize} name="DisplayBoardSize" sx={inputStyle} />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Board Latitude" onChange={handleChange} value={formData.BoardLatitude} name="BoardLatitude" sx={inputStyle} />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Board Longitude" onChange={handleChange} value={formData.BoardLongitude} name="BoardLongitude" sx={inputStyle} />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Facing" onChange={handleChange} value={formData.Facing} name="Facing" sx={inputStyle} />
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
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                name="StartTime"
                value={formData.StartTime}     
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Start End"
                type="time"
                InputLabelProps={{ shrink: true }}
                name="StartEnd"
                value={formData.StartEnd}    
                 onChange={handleChange}
                sx={inputStyle}
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

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLocationDialog;
