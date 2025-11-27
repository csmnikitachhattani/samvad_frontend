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
import { toggleStatusModal } from "@/store/modules/newspaper/realeaseSlice.js";
import { useSelector, useDispatch } from "react-redux";
export default function StatusUpdateDialog({ open, setOpen, onSave }) {
  const [statusData, setStatusData] = useState({
    status: "",
    rejectReason: "",
  });
  const statusModalShow = useSelector((state) => state.realease.statusModalShow);
  const handleSave = () => {
    onSave(statusData);
    setOpen(false);
  };

  return (
    <Box>
      <Dialog open={statusModalShow} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Update Status
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            {/* STATUS DROPDOWN */}
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={statusData.status}
                onChange={(e) =>
                  setStatusData({ ...statusData, status: e.target.value })
                }
              >
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>

            {/* REJECTION REASON FIELD – only show when Rejected */}
            {statusData.status === "Rejected" && (
              <TextField
                label="Rejection Reason"
                fullWidth
                multiline
                rows={3}
                value={statusData.rejectReason}
                onChange={(e) =>
                  setStatusData({ ...statusData, rejectReason: e.target.value })
                }
              />
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
