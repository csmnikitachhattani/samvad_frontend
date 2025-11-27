"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
//import { increment, decrement } from "@/store/modules/newspaper/realeaseSlice.js";
import { useSelector, useDispatch} from "react-redux";
import { toggleUploadModal } from "@/store/modules/newspaper/realeaseSlice.js";
export default function UploadProofDialog({ open, setOpen, onUpload }) {
  const [file, setFile] = useState(null);
  const [remarks, setRemarks] = useState("");
  const uploadModalShow = useSelector((state) => state.realease.uploadModalShow);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const uploadData = {
      file,
      remarks,
    };

    onUpload(uploadData); // send to parent
    setOpen(false);
    setFile(null);
    setRemarks("");
   
  };
  const dispatch = useDispatch();
  return (
    <Dialog open={uploadModalShow} onClose={() => dispatch(toggleUploadModal())} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        Upload Proof
        <IconButton
          onClick={() => dispatch(toggleUploadModal())}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ textTransform: "none", borderRadius: "10px" }}
          >
            Choose File
            <input hidden type="file" onChange={handleFileChange} />
          </Button>

          {file && (
            <Typography sx={{ fontSize: 14, color: "green" }}>
              Selected: {file.name}
            </Typography>
          )}

          <TextField
            label="Remarks (optional)"
            fullWidth
            multiline
            rows={2}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>

        <Button variant="contained" onClick={handleUpload}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
