"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosClient from "@/lib/axiosClient";
import adminServices from "@/services/adminServices";
import { toggleCreateModal } from "@/store/modules/outdoor/vehicleSlice.js";
import { useRouter } from "next/navigation";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";
import { useSelector, useDispatch } from "react-redux";
import { vehicleField } from "@/lib/rules";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Box, Typography, MenuItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

// ─── Shared field style ───────────────────────────────────────────────────────
const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "&:hover": { backgroundColor: "#FFF8F1" },
    "&.Mui-focused": {
      backgroundColor: "#FFF8F1",
      "& fieldset": { borderColor: "#FF7A00", borderWidth: "2px" },
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#E65100", fontWeight: 600 },
};

const INITIAL_DATA = {
  agencyId: "", vehicleNo: "", ownerName: "",
  fitnessUpto: "", insuranceUpto: "",
  rcPhotoFile: null, rcPhotoPath: "",
  createdBy: "", createdIpAddress: "", specification: "",
};

export default function VehicleModal({ onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const ModalShow = useSelector((state) => state.vehicle.ModalShow);

  const [vendors, setVendors] = useState([]);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(INITIAL_DATA);
  const [preview, setPreview] = useState(null);   // ← image preview URL
  const fileInputRef = useRef(null);

  // ─── Fetch vendors on mount ───────────────────────────────────────────────
  useEffect(() => {
    adminServices.getVendorList('08')
      .then((r) => setVendors(r.result))
      .catch((e) => console.error("Failed to fetch vendors", e));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!data.agencyId) {
      newErrors.agencyId = "Agency is required.";
    }

    if (!data.vehicleNo?.trim()) {
      newErrors.vehicleNo = "Vehicle number is required.";
    } else if (!vehicleField.pattern.value.test(data.vehicleNo)) {
      newErrors.vehicleNo = vehicleField.pattern.message;
    }

    if (!data.ownerName?.trim()) {
      newErrors.ownerName = "Owner name is required.";
    }

    if (!data.fitnessUpto) {
      newErrors.fitnessUpto = "Fitness date is required.";
    }

    if (!data.insuranceUpto) {
      newErrors.insuranceUpto = "Insurance date is required.";
    }

    if (!data.rcPhotoFile) {
      newErrors.rcPhotoFile = "RC Photo is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Cleanup object URL on unmount / file change ──────────────────────────
  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const closeModal = () => dispatch(toggleCreateModal({ show: false }));

  const resetForm = () => {
    setData(INITIAL_DATA);
    setErrors({});
    setPreview(null);
  };

  async function getPublicIP() {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const json = await res.json();
      return json.ip;
    } catch {
      return "0.0.0.0";
    }
  }

  // ─── Change handler ───────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Vehicle number validation
    if (name === "vehicleNo") {
      if (!value) {
        setErrors((prev) => ({ ...prev, vehicleNo: vehicleField.required.message }));
      } else if (!vehicleField.pattern.value.test(value)) {
        setErrors((prev) => ({ ...prev, vehicleNo: vehicleField.pattern.message }));
      } else {
        setErrors((prev) => ({ ...prev, vehicleNo: "" }));
      }
    }

    // File / image preview
    if (name === "rcPhotoFile" && files?.[0]) {
      const file = files[0];
      if (preview) URL.revokeObjectURL(preview);         // release old URL
      setPreview(URL.createObjectURL(file));             // create new preview
      setData((prev) => ({ ...prev, rcPhotoFile: file }));
      return;
    }

    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ─── Remove selected image ────────────────────────────────────────────────
  const handleRemoveImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setData((prev) => ({ ...prev, rcPhotoFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const createVehicle = async () => {
    if (!validateForm()) return;

    try {
      const ip = await getPublicIP();
      const formData = new FormData();

      formData.append("AgencyId", data.agencyId);
      formData.append("VehicleNo", data.vehicleNo);
      formData.append("OwnerName", data.ownerName);
      formData.append("FitnessUpto", data.fitnessUpto || "2026-01-26T14:20:06.038Z");
      formData.append("InsuranceUpto", data.insuranceUpto || "2026-01-26T14:20:06.038Z");
      formData.append("Specification", data.specification);
      formData.append("CreatedBy", "01");
      formData.append("CreatedIpAddress", ip);

      if (data.rcPhotoFile) {
        formData.append("RcPhotoFile", data.rcPhotoFile);
      }

      await axiosClient.post(
        "http://103.79.34.50:8083/api/ManageMaster/createledVehicle",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      dispatch(showNotification({ message: "Saved successfully!", severity: "success" }));
      router.push("/admin/vehicle");
      resetForm();
      closeModal();
    } catch (error) {
      console.error("Create vehicle failed:", error);
      // dispatch(showNotification({ message: "Save failed!", severity: "error" }));
      dispatch(
        showNotification({
          message: error.response?.data?.message || "Save failed!",
          severity: "error",
        })
      );
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <Dialog open={ModalShow} onClose={closeModal} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#0f4c3a", color: "#fff", fontWeight: 600 }}>
        Vehicle Registration Details
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#f4fbf9", mt: 1 }}>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>

            {/* Agency */}
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField select label="Agency" name="agencyId" fullWidth size="small"
                value={data.agencyId} onChange={handleChange} sx={fieldStyle}
                error={!!errors.agencyId} helperText={errors.agencyId}
              >
                {vendors.length > 0 ? vendors.map((v) => (
                  <MenuItem key={v.AgencyID} value={v.AgencyID}>{v.AgencyName}</MenuItem>
                )) : (
                    <MenuItem disabled>
                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>No available Vendors</Typography>
                    </MenuItem>
                  )}
              </TextField>
            </Grid>

            {/* Vehicle Number */}
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Vehicle Number" name="vehicleNo" fullWidth size="small"
                value={data.vehicleNo.toUpperCase()} onChange={handleChange}
                error={!!errors.vehicleNo} helperText={errors.vehicleNo} sx={fieldStyle}

              />
            </Grid>

            {/* Owner Name */}
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField label="Owner Name" name="ownerName" fullWidth size="small"
                value={data.ownerName} onChange={handleChange} sx={fieldStyle}
                error={!!errors.ownerName} helperText={errors.ownerName}
              />
            </Grid>

            {/* Fitness Upto */}
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
                error={!!errors.fitnessUpto}
                helperText={errors.fitnessUpto}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                  // max: new Date(new Date().setMonth(new Date().getMonth() + 6))
                  //   .toISOString()
                  //   .split("T")[0],
                }}
              />
            </Grid>

            {/* Insurance Upto */}
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
                error={!!errors.insuranceUpto}
                helperText={errors.insuranceUpto}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                  // max: new Date(new Date().setMonth(new Date().getMonth() + 6))
                  //   .toISOString()
                  //   .split("T")[0],
                }}
              />
            </Grid>

            {/* Specification */}
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField label="Specification" name="specification" fullWidth size="small"
                InputLabelProps={{ shrink: true }} value={data.specification} onChange={handleChange}
              />
            </Grid>

            {/* ── RC Photo Upload + Preview ── */}
            <Grid item size={{ xs: 12 }}>
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: preview ? "#0f4c3a" : "#b2dfdb",
                  borderRadius: "12px",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                  backgroundColor: preview ? "#e6f3ef" : "#f4fbf9",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Preview image */}
                {preview ? (
                  <Box sx={{ position: "relative", width: "100%", maxWidth: 320 }}>
                    <Box
                      component="img"
                      src={preview}
                      alt="RC Photo Preview"
                      sx={{
                        width: "100%",
                        maxHeight: 200,
                        objectFit: "contain",
                        borderRadius: "8px",
                        border: "1px solid #b2dfdb",
                        display: "block",
                      }}
                    />
                    {/* File name */}
                    <Typography
                      variant="caption"
                      sx={{ display: "block", textAlign: "center", mt: 0.5, color: "#4a7c59" }}
                    >
                      {data.rcPhotoFile?.name}
                    </Typography>
                    {/* Remove button */}
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleRemoveImage}
                      sx={{ mt: 1, display: "flex", mx: "auto" }}
                    >
                      Remove
                    </Button>
                  </Box>
                ) : (
                    <>
                      <CloudUploadIcon sx={{ fontSize: 40, color: "#0f4c3a", opacity: 0.6 }} />
                      <Typography variant="body2" sx={{ color: "#4a7c59" }}>
                        Click below to upload RC Photo
                    </Typography>
                    </>
                  )}

                {/* Upload button — always visible so user can change */}
                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                  sx={{
                    borderColor: "#0f4c3a",
                    color: "#0f4c3a",
                    "&:hover": { borderColor: "#1f7a63", backgroundColor: "#e6f3ef" },
                  }}
                >
                  {preview ? "Change Photo" : "Upload RC Photo"}
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    name="rcPhotoFile"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>
                {errors.rcPhotoFile && (
                  <Typography variant="caption" color="error">
                    {errors.rcPhotoFile}
                  </Typography>
                )}
              </Box>
            </Grid>

          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "#f4fbf9", p: 2 }}>
        <Button variant="outlined" onClick={closeModal}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#0f4c3a", "&:hover": { backgroundColor: "#1f7a63" } }}
          onClick={createVehicle}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}