"use client";

import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusModal } from "@/store/modules/newspaper/realeaseSlice.js";

export default function StatusUpdateDialog({ open, onSave, roData }) {
  const [statusData, setStatusData] = useState({
    status: "",
    rejectReason: "",
    publishDate: "",
  });
  

  const [remarks, setRemarks] = useState('');
  const [errors, setErrors] = useState({
    publishDate: "",
    rejectReason: "",
  });

  const statusModalShow = useSelector((state) => state.realease.statusModalShow);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleStatusModal());
    setErrors({ publishDate: "", rejectReason: "" });
  };

  // VALIDATION
  const validate = () => {
    let newErrors = { publishDate: "", rejectReason: "" };
    let valid = true;

    if (statusData.status === "Published") {
      if (!statusData.publishDate) {
        newErrors.publishDate = "Publish date is required";
        valid = false;
      }
    }

    if (statusData.status === "Rejected") {
      if (!statusData.rejectReason.trim()) {
        newErrors.rejectReason = "Rejection reason is required";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(statusData);
    handleClose();
  };

  return (
    <Dialog
  open={statusModalShow}
  onClose={() => dispatch(toggleStatusModal())}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 3,
      p: 2,
      maxHeight: "90vh",
    },
  }}
>
  <DialogTitle
    sx={{
      fontWeight: 700,
      fontSize: "1.3rem",
      pb: 1,
    }}
  >
    Update RO Status
  </DialogTitle>

  <IconButton
    onClick={() => dispatch(toggleStatusModal())}
    sx={{
      position: "absolute",
      right: 12,
      top: 12,
    }}
  >
    <CloseIcon />
  </IconButton>

  <DialogContent dividers sx={{ mt: 1 }}>
    <Box display="flex" flexDirection="column" gap={3}>
      
      {/* Static Value Section */}
      <Box
        sx={{
          background: "#F8F9FA",
          borderRadius: 2,
          p: 2,
          border: "1px solid #E0E0E0",
        }}
      >
        <Typography fontSize={14} color="text.secondary">
          RO Number
        </Typography>
        <Typography fontWeight={600} fontSize={16}>
          26/05/1998
        </Typography>

        <Box mt={2}>
          <Typography fontSize={14} color="text.secondary">
            Client Name
          </Typography>
          <Typography fontWeight={600} fontSize={16}>
            Tender
          </Typography>
        </Box>
      </Box>

      {/* Status Field */}
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={statusData.status}
          onChange={(e) => setStatusData({ status: e.target.value,
            publishDate: "",
            rejectReason: "",})}
          sx={{
            borderRadius: 2,
          }}
        >
          <MenuItem value="Published">Published</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      </FormControl>

      {/* Remarks */}
      <TextField
        label="Remarks"
        multiline
        minRows={3}
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />
      {statusData.status === "Published" && (
            <TextField
              label="Publish Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={statusData.publishDate}
              error={Boolean(errors.publishDate)}
              helperText={errors.publishDate}
              inputProps={{
                min: roData?.ro_date,
                max: new Date().toISOString().split("T")[0],
              }}
              onChange={(e) =>
                setStatusData((prev) => ({
                  ...prev,
                  publishDate: e.target.value,
                }))
              }
            />
          )}

          {/* REJECTION REASON */}
          {statusData.status === "Rejected" && (
            <TextField
              label="Rejection Reason"
              fullWidth
              multiline
              rows={3}
              value={statusData.rejectReason}
              error={Boolean(errors.rejectReason)}
              helperText={errors.rejectReason}
              onChange={(e) =>
                setStatusData((prev) => ({
                  ...prev,
                  rejectReason: e.target.value,
                }))
              }
            />
          )}


    </Box>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button
      variant="outlined"
      onClick={() => dispatch(toggleStatusModal())}
      sx={{ borderRadius: 2, textTransform: "none" }}
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      // onClick={handleSubmit}
      sx={{
        borderRadius: 2,
        textTransform: "none",
        background: "linear-gradient(135deg, #FFA726 0%, #FB8C00 100%)",
        color: "#FFF",
        px: 3,
      }}
    >
      Update Status
    </Button>
  </DialogActions>
</Dialog>

  );
}

