

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

  /* ========= SAFE LOCAL STORAGE ========= */
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("user_id") || "");
      setUserName(localStorage.getItem("user_name") || "");
    }
  }, []);

  /* ========= PARAMS ========= */
  const savedRefId = params?.savedRefId;
  const financial_year = searchParams.get("financial_year");

  /* ========= REFS ========= */
  const fileInputRef = useRef(null);

  /* ========= STATE ========= */
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [linkName, setLinkName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [letterCategoryCode, setLetterCategoryCode] = useState("");
  const [letterUploaded, setLetterUploaded] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  /* ========= FILE HANDLERS ========= */
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

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  /* ========= API ========= */
  const fetchCategories = async () => {
    if (!savedRefId || !financial_year) return;

    try {
      const res = await axios.get(
        "http://localhost:3080/api/upload-categories",
        { params: { savedRefId, financial_year } }
      );

      const data = res.data.data || [];
      setCategories(data);

      const letter = data.find(c =>
        c.cat_name.toLowerCase().includes("letter")
      );

      if (letter) {
        setLetterCategoryCode(letter.cat_cd);

        const check = await axios.get(
          `http://localhost:3080/api/files/${savedRefId}/${financial_year}/${letter.cat_cd}`
        );

        const uploadedCount = check?.data?.data?.length || 0;
        setLetterUploaded(uploadedCount);

        if (uploadedCount === 0) {
          setSelectedCategory(letter.cat_cd);
        } else {
          const next = data.find(c => c.cat_cd !== letter.cat_cd);
          setSelectedCategory(next ? next.cat_cd : letter.cat_cd);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFiles = async (category) => {
    if (!category) return;

    try {
      const res = await axios.get(
        `http://localhost:3080/api/files/${savedRefId}/${financial_year}/${category}`
      );
      setFileList(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!file || !userId) return;

    const categoryToUse =
      letterUploaded === 0 ? letterCategoryCode : selectedCategory;

    const nextCount =
      fileList.filter(f => f.categary_cd === categoryToUse).length + 1;

    const formData = new FormData();
    formData.append("ref_id", savedRefId);
    formData.append("financial_year", financial_year);
    formData.append("categary_cd", categoryToUse);
    formData.append("nextCount", nextCount);
    formData.append("user_id", userId);
    formData.append("user_name", userName);
    formData.append("file", file);

    await axios.post(
      "http://localhost:3080/api/post-files",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    setFile(null);
    setLinkName("");
    setFilePreviewUrl(null);
    fileInputRef.current.value = "";

    setShowModal(true);
    fetchFiles(categoryToUse);
  };

  useEffect(() => {
    fetchCategories();
  }, [savedRefId, financial_year]);

  useEffect(() => {
    if (selectedCategory) fetchFiles(selectedCategory);
  }, [selectedCategory]);

  /* ========= UI ========= */
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
              Upload Documents
            </Typography>
          </Box>

          <Box display="flex" gap={3} mb={3}>
            <TextField label="Category" value="Letter" disabled fullWidth />
            <TextField label="File Name" value={linkName} fullWidth />
          </Box>

          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={e => handleFileSelect(e.target.files[0])}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mb: 3 }}
            onClick={() => fileInputRef.current.click()}
          >
            Browse
          </Button>
          <Paper
            onClick={() => fileInputRef.current.click()}
            onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            sx={{
              height: 240,
              border: "2px dashed",
              borderColor: file ? "success.main" : "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Box textAlign="center">
              {!file ? (
                <>
                  <FaUpload size={40} />
                  <Typography fontWeight="bold">
                    Drag & Drop file here
                  </Typography>
                </>
              ) : (
                <>
                  {filePreviewUrl ? (
                    <img src={filePreviewUrl} height={120} />
                  ) : (
                    <FaFileAlt size={40} />
                  )}
                  <Typography fontWeight="bold">{file.name}</Typography>
                </>
              )}
            </Box>
          </Paper>

          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              size="large"
              disabled={!file}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Paper>
        <Typography sx={{ p: 2, background: "#222", color: "#fff" }}>
          Uploaded Files
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fileList.map((f, i) => (
              <TableRow key={f.sno}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{f.link_name}</TableCell>
                <TableCell>
                  <Button
                    href={`http://localhost:3080/${f.file_path}`}
                    target="_blank"
                  >
                    <FaDownload />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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




