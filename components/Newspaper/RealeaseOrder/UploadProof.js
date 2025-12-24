import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Stack,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useSelector, useDispatch } from "react-redux";
import axiosClient from "@/lib/axiosClient";
import { toggleUploadModal } from "@/store/modules/newspaper/realeaseSlice.js";
export default function UploadProofDialog({ open, setOpen, onUpload }) {
  const [file, setFile] = useState(null);
  const [remarks, setRemarks] = useState("");  
  const uploadModalShow = useSelector((state) => state.realease.uploadModalShow);
  const { financial_year, avak_ref_id, advt_no, ro_no, user_id, np_news_cd } = useSelector((state) => state.realease.roDetails);
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

    onUpload(uploadData);
    setOpen(false);
    setFile(null);
    setRemarks("");
  };
  const uploadPublishProof = async (file) => {
    const formData = new FormData();
  
    formData.append("file", file); // 🔴 important
    formData.append("advt_no", advt_no);
    formData.append("fin_year", financial_year);
    formData.append("ro_no", ro_no);
    formData.append("ip_address", "127.0.0.1");
  
    try {
      const res = await axiosClient.post(
        "/ro/publish-precheck/",
        formData
      );
  
      const data = await res.json();
      console.log(data);
  
    } catch (err) {
      console.error(err);
    }
  };
  
  const dispatch = useDispatch();
  return (
    <Dialog 
      open={uploadModalShow} 
      onClose={() => setOpen(false)} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          fontWeight: 600,
          fontSize: 20,
          pb: 1,
          background: "linear-gradient(135deg, #FF7043 0%, #F4511E 100%)",
          color: "white",
          mb: 6,
        }}
      >
        Upload Proof
        <IconButton
          onClick={() => dispatch(toggleUploadModal())}
          sx={{ 
            position: "absolute", 
            right: 8, 
            top: 8,
            color: "white",
            "&:hover": {
              background: "rgba(255,255,255,0.1)",
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2, mT: 20 }}>
      <Box
            sx={{
              background: "#F8F9FA",
              borderRadius: 2,
              p: 2,
              border: "1px solid #E0E0E0",
              mb: 5,
            }}
          >
            <Typography fontSize={14} color="text.secondary">
              RO Number
        </Typography>
            <Typography fontWeight={600} fontSize={16}>
              {ro_no}
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
        <Stack spacing={3}>
          {/* Upload Area */}


          <Paper
            elevation={0}
            sx={{
              border: "2px dashed",
              borderColor: file ? "#667eea" : "#e0e0e0",
              borderRadius: 2,
              p: 3,
              textAlign: "center",
              background: file ? "rgba(102, 126, 234, 0.05)" : "#fafafa",
              transition: "all 0.3s ease",
              marginTop: "20px",
              cursor: "pointer",
              "&:hover": {
                borderColor: "#667eea",
                background: "rgba(102, 126, 234, 0.08)",
              }
            }}
          >
            <Box component="label" sx={{ cursor: "pointer", display: "block", margin: '10px, 5px' }}>
              <input 
                hidden 
                type="file" 
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              
              {!file ? (
                <>
                  <UploadFileIcon 
                    sx={{ 
                      fontSize: 48, 
                      color: "#667eea",
                      mb: 1 
                    }} 
                  />
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                    Click to upload file
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    PDF, JPG, PNG, DOC (Max 10MB)
                  </Typography>
                </>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 28 }} />
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "#4caf50" }}>
                      File Selected
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <InsertDriveFileIcon sx={{ fontSize: 16, color: "#666" }} />
                      <Typography variant="caption" color="text.secondary">
                        {file.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>

        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <Button 
          onClick={() => setOpen(false)}
          sx={{ 
            textTransform: "none",
            color: "#666",
            fontWeight: 500,
            px: 3,
          }}
        >
          Cancel
        </Button>

        <Button 
          variant="contained" 
          onClick={uploadPublishProof
          }
          disabled={!file}
          sx={{ 
            textTransform: "none",
            background: "linear-gradient(135deg, #FF7043 0%, #F4511E 100%)",
            fontWeight: 500,
            px: 3,
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #5568d3 0%, #63418b 100%)",
              boxShadow: "0 6px 16px rgba(102, 126, 234, 0.4)",
            },
            "&:disabled": {
              background: "#e0e0e0",
              color: "#999",
            }
          }}
        >
          Upload Proof
        </Button>
      </DialogActions>
    </Dialog>
  );
}