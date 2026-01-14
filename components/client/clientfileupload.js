
"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, useParams, useSearchParams } from "next/navigation";

import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import {
  FaTrash,
      FaFileAlt, 
  FaDownload,
  FaUpload,
  FaFolder,
  FaPencilAlt,
  FaCheckCircle,
} from "react-icons/fa";

const ClientFileUpload = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  /* ---------------- URL PARAM ---------------- */
  const savedRefId = params?.savedRefId;

  /* ---------------- QUERY PARAMS ---------------- */
  const financial_year = searchParams.get("financial_year");
 
  /* ---------------- REFS ---------------- */
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  /* ---------------- STATE ---------------- */
  const [fileToReplaceSno, setFileToReplaceSno] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [linkName, setLinkName] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const [previewType, setPreviewType] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ---------------- EFFECT ---------------- */

/*===========================*/
const [isDragging, setIsDragging] = useState(false);
const [filePreviewUrl, setFilePreviewUrl] = useState(null);
const handleFileSelect = (selectedFile) => {
  if (!selectedFile) return;

  setFile(selectedFile);
  setLinkName(selectedFile.name);

  if (selectedFile.type.startsWith("image/")) {
    setFilePreviewUrl(URL.createObjectURL(selectedFile));
  } else {
    setFilePreviewUrl(null);
  }
};

const handleDragOver = (e) => {
  e.preventDefault();
  setIsDragging(true);
};

const handleDragLeave = () => {
  setIsDragging(false);
};

const handleDrop = (e) => {
  e.preventDefault();
  setIsDragging(false);
  handleFileSelect(e.dataTransfer.files[0]);
};


/*===================================*/



  useEffect(() => {
    if (!savedRefId) return;

    console.log("savedRefId:", savedRefId);
    console.log("financial_year:", financial_year);

    // fetchFiles(savedRefId);
  }, [savedRefId, financial_year, ]);

  /* ---------------- HANDLERS (PLACEHOLDER) ---------------- */
  // const handleUpload = async () => {
  //   // keep your existing upload logic here
  //   setShowModal(true);
  // };



  const handleUpload = async (e) => {
  e.preventDefault();
  if (!file) return;

  const categoryToUse =
    letterUploaded === 0 ? letterCategoryCode : selectedCategory;

  const nextCount =
    fileList.filter(f => f.categary_cd === categoryToUse).length + 1;

  const formData = new FormData();
  formData.append("ref_id", ref_id);
  formData.append("financial_year", financial_year);
  formData.append("categary_cd", categoryToUse);
  formData.append("nextCount", nextCount);
  formData.append("user_id", user_id);
  formData.append("user_name", user_name);
  formData.append("file", file);

  try {
    await axios.post(
      "http://localhost:3080/api/post-files",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    setFile(null);
    setPreviewURL(null);
    setFileSize(null);
    fileInputRef.current.value = "";

    setShowModal(true);
    await fetchCategories();
    fetchFiles();

  } catch (err) {
    console.error("Upload failed:", err);
  }
};

  /* ========================delete================================ */
  const deleteFile = async (sno) => {
    // keep your existing delete logic here
    console.log("delete sno:", sno);
  };

  /* ======================================================== */

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* HEADER */}
      <Card
        sx={{
          mb: 4,
          background: "linear-gradient(135deg,#667eea,#764ba2)",
          color: "#fff",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <FaFolder size={32} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                File Management
              </Typography>
              <Typography variant="body2" opacity={0.8}>
                Upload and manage your documents
              </Typography>
            </Box>
          </Box>

          <Box mt={3} display="flex" gap={3}>
            <Paper sx={{ p: 2, flex: 1 }}>
              <Typography variant="caption">Reference ID</Typography>
              <Typography fontWeight="bold">{savedRefId}</Typography>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="caption">Financial Year</Typography>
              <Typography fontWeight="bold">{financial_year}</Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>

      {/* UPLOAD */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Box textAlign="center" mb={3}>
            <FaUpload size={26} />
            <Typography variant="h6" fontWeight="bold">
              Upload Initial Letter
            </Typography>
          </Box>

          <Box display="flex" gap={3} mb={3}>
            <TextField label="Category" value="Letter" disabled fullWidth />
            <TextField
              label="File Name"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              fullWidth
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mb: 3 }}
            onClick={() => fileInputRef.current.click()}
          >
            Browse
          </Button>
 {/* <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={(e) => {
              const f = e.target.files[0];
              if (!f) return;
              setFile(f);
              setPreviewURL(URL.createObjectURL(f));
              setPreviewType(f.type);
            }}
          />  */}

          <input
  type="file"
  hidden
  ref={fileInputRef}
  onChange={(e) => handleFileSelect(e.target.files[0])}
/> 


<Paper
  onClick={() => fileInputRef.current.click()}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
  sx={{
    height: 240,
    border: "2px dashed",
    borderColor: file
      ? "success.main"
      : isDragging
      ? "primary.main"
      : "#ccc",
    backgroundColor: file
      ? "rgba(46,125,50,0.08)"
      : isDragging
      ? "rgba(25,118,210,0.08)"
      : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
>
  <Box textAlign="center">
    {!file && (
      <>
        <FaUpload size={40} />
        <Typography fontWeight="bold">
          Drag & Drop file here
        </Typography>
        <Typography variant="caption">
          or click to browse
        </Typography>
      </>
    )}

    {file && (
      <>
        {filePreviewUrl ? (
          <img
            src={filePreviewUrl}
            alt="preview"
            style={{
              maxHeight: 120,
              marginBottom: 8,
              borderRadius: 6,
            }}
          />
        ) : (
          <FaFileAlt size={40} color="green" />
        )}

        <Typography fontWeight="bold">{file.name}</Typography>
        <Typography variant="caption">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </Typography>
      </>
    )}



  </Box>
</Paper>


          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              size="large"
              disabled={!file || !linkName}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* FILE TABLE */}
      <Paper>
        <Typography sx={{ p: 2, background: "#222", color: "#fff" }}>
          Uploaded Files
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fileList.map((f, i) => (
              <TableRow key={f.sno}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{f.link_name}</TableCell>
                <TableCell>
                  {(f.file_size_in_bytes / 1024 / 1024).toFixed(2)} MB
                </TableCell>
                <TableCell>{f.content_type}</TableCell>
                <TableCell>
                  <Button
                    color="success"
                    href={`http://localhost:3080/${f.file_path}`}
                    target="_blank"
                  >
                    <FaDownload />
                  </Button>
                  <Button color="error" onClick={() => deleteFile(f.sno)}>
                    <FaTrash />
                  </Button>
                  <Button
                    color="warning"
                    onClick={() => {
                      setFileToReplaceSno(f.sno);
                      editFileInputRef.current.click();
                    }}
                  >
                    <FaPencilAlt />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {fileList.length === 0 && (
          <Typography textAlign="center" py={3} color="text.secondary">
            No files uploaded.
          </Typography>
        )}
      </Paper>

      {/* SUCCESS MODAL */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>
          <FaCheckCircle color="green" /> Success
        </DialogTitle>
        <DialogContent>
          <Typography>File Uploaded Successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Continue</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientFileUpload;

// ========================================================
