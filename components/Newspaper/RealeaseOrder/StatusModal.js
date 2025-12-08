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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusModal } from "@/store/modules/newspaper/realeaseSlice.js";

export default function StatusUpdateDialog({
  open,
  setOpen,
  onSave,
  roData,
}) {
  const [statusData, setStatusData] = useState({
    status: "",
    rejectReason: "",
    publishDate: "",
  });

  const [errors, setErrors] = useState({
    publishDate: "",
    rejectReason: "",
  });

  const statusModalShow = useSelector((state) => state.realease.statusModalShow);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleStatusModal());
    setOpen(false);
    setErrors({ publishDate: "", rejectReason: "" });
  };

  // VALIDATION
  const validate = () => {
    let newErrors = { publishDate: "", rejectReason: "" };
    let valid = true;

    // If status = Published → validate date
    if (statusData.status === "Published") {
      if (!statusData.publishDate) {
        newErrors.publishDate = "Publish date is required";
        valid = false;
      }
    }

    // If status = Rejected → validate reject reason
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
    if (!validate()) return; // stop if validation fails
    onSave(statusData);
    handleClose();
  };

  return (
    <Dialog
      open={statusModalShow}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 0.5 },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.2rem",
          borderBottom: "1px solid #eee",
          pb: 1,
        }}
      >
        Update Status
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent dividers sx={{ background: "#fffaf2" }}>
        <Stack spacing={2.5}>
          {/* RO DETAILS */}
          <TextField
            label="RO No"
            value={roData?.ro_no || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="RO Date"
            value={roData?.ro_date || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          {/* STATUS SELECT */}
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusData.status}
              onChange={(e) => {
                setStatusData((prev) => ({
                  ...prev,
                  status: e.target.value,
                  // clear fields when switching status
                  publishDate: "",
                  rejectReason: "",
                }));
                setErrors({ publishDate: "", rejectReason: "" });
              }}
            >
              <MenuItem value="Published">Published</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>

          {/* PUBLISH DATE (only if Published selected) */}
          {statusData.status === "Published" && (
            <TextField
              label="Publish Date"
              type="date"
              fullWidth
              value={statusData.publishDate}
              InputLabelProps={{ shrink: true }}
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
        </Stack>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>
        <Button
          onClick={handleClose}
          sx={{
            textTransform: "capitalize",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            textTransform: "capitalize",
            background: "linear-gradient(135deg, #FFA726 0%, #FB8C00 100%)",
            color: "#FFF",
            px: 3,
            "&:hover": {
              background:
                "linear-gradient(135deg, #FB8C00 0%, #F57C00 100%)",
            },
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
