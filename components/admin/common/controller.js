"use client";
import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Button, TextField, Typography, MenuItem, IconButton, Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "@/store/modules/admin/controller";

// ── Field style ───────────────────────────────────────────────────────────────
const field = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8f9fb",
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    "& fieldset": { borderColor: "#e4e6ef", borderWidth: "1.5px" },
    "&:hover": {
      backgroundColor: "#f3f4f8",
      "& fieldset": { borderColor: "#c5cadc" },
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 0 0 3px rgba(1,10,42,0.08)",
      "& fieldset": { borderColor: "#010a2a", borderWidth: "1.5px" },
    },
  },
  "& .MuiInputLabel-root": { color: "#9ca3af", fontSize: "0.875rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#010a2a" },
  "& .MuiInputBase-input": { color: "#111827", fontWeight: 500 },
};

// ── Sample options — replace with your actual API data ────────────────────────
const FORWARD_TO_OPTIONS = [
  { value: "dept_01", label: "Department — Finance" },
  { value: "dept_02", label: "Department — Legal" },
  { value: "dept_03", label: "Department — Operations" },
  { value: "user_01", label: "User — Admin Officer" },
  { value: "user_02", label: "User — Section Head" },
];

const ACTION_OPTIONS = [
  { value: "03", label: "Mark" },
  { value: "04", label: "Allocate Vendor" },
  { value: "05", label: "Generate Notesheet" },
  { value: "06", label: "Approve" },
  { value: "07", label: "Generate RO" },
  { value: "16", label: "Forward" },
  { value: "17", label: "Cancel" },
  { value: "20", label: "Cancel Alloted Vendor" },
  { value: "21", label: "Delete Alloted Vendor" },
];


// ── ForwardDialog ─────────────────────────────────────────────────────────────
export default function ForwardDialog({ open, onClose, onSubmit, refId }) {
  const dispatch = useDispatch();
  const {ModalShow :ModalShow , ref_id } = useSelector((state) => state.adminController);
  const [form, setForm] = useState({
    forward_to: "",
    action: "",
    reason: "",
    remark: "",
  });

  const closeUploadDialog = () => {
    dispatch(toggleModal({
      show: false,
    }))
  }
  const handleSubmit = async () => {
    try {
      const payload = {
        //ref_id:      refId,                // from parent prop
        forward_to:  form.forward_to,
        forward_to_type_cd: forward_to_type_cd,
        forward_by_section_cd: forward_by,
        forward_to_section_cd : forward_to,
        action_cd:      form.action,
        reason:      form.reason,
        remark:      form.remark,
        avak_ref_id_list: ref_id,
        forward_time: forward_time,
        forward_date: forward_date,
        financial_year: financial_year,
        status_reason_cd: "",
      };
  
      const response = await axiosClient.post(
        "/api/Client/avak-forward",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Forward SUCCESS:", response.data);
      onSubmit?.(payload);
      handleClose();
    } catch (error) {
      console.error("Forward ERROR:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

//   const handleSubmit = () => {
//     onSubmit?.(form);
//     handleClose();
//   };

  const handleClose = () => {
    setForm({ forward_to: "", action: "", reason: "", remark: "" });
    onClose?.();
  };

  const isValid = form.forward_to && form.action && form.reason.trim();

  return (
    <Dialog
      open={ModalShow}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          border: "1.5px solid #e9eaf0",
          boxShadow: "0 20px 60px rgba(1,10,42,0.14)",
          overflow: "hidden",
        },
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          px: 3,
          py: 2.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #010a2a 0%, #0d1b4b 100%)",
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1.5px solid rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Box>
          <Box>
            <Typography variant="body1" fontWeight={700} sx={{ color: "#fff", letterSpacing: "-0.1px" }}>
              Forward Request
            </Typography>
            {refId && (
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem" }}>
                Ref: {refId}
              </Typography>
            )}
          </Box>
        </Box>

        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "rgba(255,255,255,0.6)",
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* ── Body ── */}
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Box display="flex" flexDirection="column" gap={2.5}>

          {/* 1. Forward To */}
          <TextField
            select
            fullWidth
            label="Forward To"
            name="forward_to"
            value={form.forward_to}
            onChange={handleChange}
            sx={field}
          >
            {FORWARD_TO_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box sx={{
                    width: 7, height: 7, borderRadius: "50%",
                    backgroundColor: "#010a2a", flexShrink: 0,
                  }} />
                  {opt.label}
                </Box>
              </MenuItem>
            ))}
          </TextField>

          {/* 2. Action */}
          <TextField
            select
            fullWidth
            label="Action"
            name="action"
            value={form.action}
            onChange={handleChange}
            sx={field}
          >
            {ACTION_OPTIONS.map((opt) => {
              const colors = {
                approve: "#15803d", reject: "#dc2626",
                hold: "#d97706", forward: "#4f46e5", return: "#6b7280",
              };
              return (
                <MenuItem key={opt.value} value={opt.value}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box sx={{
                      width: 7, height: 7, borderRadius: "50%",
                      backgroundColor: colors[opt.value] || "#010a2a", flexShrink: 0,
                    }} />
                    {opt.label}
                  </Box>
                </MenuItem>
              );
            })}
          </TextField>

          {/* 3. Reason */}
          <TextField
            fullWidth
            label="Reason *"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Enter reason for this action…"
            sx={field}
          />

          {/* 4. Remark */}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Remark"
            name="remark"
            value={form.remark}
            onChange={handleChange}
            placeholder="Any additional remarks (optional)…"
            sx={{
              ...field,
              "& .MuiOutlinedInput-root": {
                ...field["& .MuiOutlinedInput-root"],
                alignItems: "flex-start",
              },
            }}
          />
        </Box>
      </DialogContent>

      <Divider sx={{ borderColor: "#f0f1f6" }} />

      {/* ── Footer ── */}
      <DialogActions sx={{ px: 3, py: 2, gap: 1.5 }}>
        <Typography variant="caption" sx={{ color: "#9ca3af", flex: 1 }}>
          * Required fields
        </Typography>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: "10px", textTransform: "none", fontWeight: 600,
            fontSize: "0.875rem", borderColor: "#d1d5db", color: "#374151", px: 2.5,
            "&:hover": { borderColor: "#9ca3af", backgroundColor: "#f9fafb" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isValid}
          sx={{
            px: 3.5, borderRadius: "10px", textTransform: "none",
            fontWeight: 700, fontSize: "0.875rem",
            background: "#010a2a",
            boxShadow: "0 4px 14px rgba(1,10,42,0.35)",
            "&:hover": { background: "#0d1b4b", boxShadow: "0 6px 20px rgba(1,10,42,0.45)", transform: "translateY(-1px)" },
            "&.Mui-disabled": { backgroundColor: "#e5e7eb", color: "#9ca3af", boxShadow: "none" },
            transition: "all 0.2s ease",
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}