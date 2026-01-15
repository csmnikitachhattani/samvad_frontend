"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Stack,
  Select,
  MenuItem,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from "@mui/material";

import {
  Upload,
  Delete,
  Download,
  Edit,
  CheckCircle,
} from "@mui/icons-material";

const ClientFileUpload = () => {
  const router = useRouter();
  const params = useSearchParams();

  const ref_id = params.get("ref_id");
  const financial_year = params.get("financial_year");
  const user_id = params.get("user_id");
  const user_name = params.get("user_name");

  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [letterCategoryCode, setLetterCategoryCode] = useState("");
  const [letterUploaded, setLetterUploaded] = useState(0);

  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [linkName, setLinkName] = useState("");

  const [previewURL, setPreviewURL] = useState(null);
  const [previewType, setPreviewType] = useState("");

  const [replaceSno, setReplaceSno] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    if (!ref_id || !financial_year) return;

    const res = await axios.get(
      "http://localhost:3080/api/upload-categories",
      { params: { ref_id, financial_year } }
    );

    const data = res.data?.data || [];
    setCategories(data);

    const letter = data.find((c) =>
      c.cat_name.toLowerCase().includes("letter")
    );

    if (letter) {
      setLetterCategoryCode(letter.cat_cd);

      const check = await axios.get(
        `http://localhost:3080/api/files/${ref_id}/${financial_year}/${letter.cat_cd}`
      );

      const count = check.data?.data?.length || 0;
      setLetterUploaded(count);

      if (count === 0) {
        setSelectedCategory(letter.cat_cd);
      } else {
        const next = data.find((c) => c.cat_cd !== letter.cat_cd);
        setSelectedCategory(next?.cat_cd || "");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================= FETCH FILES =================
  const fetchFiles = async () => {
    if (!selectedCategory) return;

    const res = await axios.get(
      `http://localhost:3080/api/files/${ref_id}/${financial_year}/${selectedCategory}`
    );
    setFileList(res.data?.data || []);
  };

  useEffect(() => {
    fetchFiles();
  }, [selectedCategory, letterUploaded]);

  // ================= FILE SELECT =================
  const onFileSelect = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // 5MB validation
    if (selected.size > 5 * 1024 * 1024) {
      alert("File size should be under 5MB");
      return;
    }

    setFile(selected);
    setPreviewURL(URL.createObjectURL(selected));
    setPreviewType(selected.type);
    setLinkName(`${ref_id}_${Date.now()}`);
  };

  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (!file || !linkName) return;

    setLoading(true);

    const categoryToUse =
      letterUploaded === 0 ? letterCategoryCode : selectedCategory;

    const formData = new FormData();
    formData.append("ref_id", ref_id);
    formData.append("financial_year", financial_year);
    formData.append("categary_cd", categoryToUse);
    formData.append("link_name", linkName); // ✅ FIXED
    formData.append("user_id", user_id);
    formData.append("user_name", user_name);
    formData.append("file", file);

    await axios.post("http://localhost:3080/api/post-files", formData);

    setFile(null);
    setPreviewURL(null);
    setLinkName("");
    setShowSuccess(true);
    setLoading(false);

    fetchCategories();
    fetchFiles();
  };

  // ================= DELETE =================
  const deleteFile = async (sno) => {
    if (!confirm("Delete this file?")) return;

    await axios.delete(
      `http://localhost:3080/api/files/delete/${ref_id}/${financial_year}/${sno}`,
      { data: { user_id } }
    );

    fetchCategories();
    fetchFiles();
  };

  // ================= EDIT =================
  const handleEditFile = async (e) => {
    const newFile = e.target.files[0];
    if (!newFile || !replaceSno) return;

    const original = fileList.find((f) => f.sno === replaceSno);
    if (!original) return;

    const formData = new FormData();
    formData.append("ref_id", ref_id);
    formData.append("financial_year", financial_year);
    formData.append("sno", replaceSno);
    formData.append("link_name", original.link_name);
    formData.append("user_id", user_id);
    formData.append("user_name", user_name);
    formData.append("file", newFile);

    await axios.put("http://localhost:3080/api/files", formData);

    setReplaceSno(null);
    fetchFiles();
  };

  return (
    <Box p={4} bgcolor="#f5f5f5">
      {/* SUCCESS DIALOG */}
      <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
        <DialogTitle>
          <CheckCircle color="success" /> Upload Successful
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setShowSuccess(false)}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* UPLOAD CARD */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" align="center" mb={3}>
            {letterUploaded === 0 ? "Upload Letter" : "Upload Documents"}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              {letterUploaded === 0 ? (
                <TextField value="Letter" fullWidth disabled />
              ) : (
                <Select
                  fullWidth
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <MenuItem key={c.cat_cd} value={c.cat_cd}>
                      {c.cat_name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="File Name"
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={onFileSelect}
              />
              <Button
                fullWidth
                variant="contained"
                startIcon={<Upload />}
                onClick={() => fileInputRef.current.click()}
              >
                Browse File
              </Button>
            </Grid>
          </Grid>

          {previewURL && (
            <Box mt={3} textAlign="center">
              {previewType.startsWith("image/") ? (
                <img src={previewURL} height={200} />
              ) : (
                <Typography>{file?.name}</Typography>
              )}
            </Box>
          )}

          <Stack alignItems="center" mt={3}>
            <Button
              variant="contained"
              color="success"
              size="large"
              disabled={!file || loading}
              onClick={handleUpload}
            >
              {loading ? <CircularProgress size={24} /> : "Upload"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* FILE TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Uploaded Files
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Size (MB)</TableCell>
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
                    {(f.file_size_in_bytes / 1024 / 1024).toFixed(2)}
                  </TableCell>
                  <TableCell>{f.content_type}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        href={`http://localhost:3080/${f.file_path}`}
                        target="_blank"
                      >
                        <Download />
                      </Button>
                      <Button color="error" onClick={() => deleteFile(f.sno)}>
                        <Delete />
                      </Button>
                      <Button
                        color="warning"
                        onClick={() => {
                          setReplaceSno(f.sno);
                          editFileInputRef.current.click();
                        }}
                      >
                        <Edit />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* EDIT FILE INPUT */}
      <input
        type="file"
        hidden
        ref={editFileInputRef}
        onChange={handleEditFile}
      />

      {/* NAV BUTTONS */}
      <Stack direction="row" justifyContent="center" mt={4} spacing={2}>
        <Button variant="contained" color="error" onClick={() => router.back()}>
          Back
        </Button>
        <Button variant="contained" onClick={() => router.push("/forwardto")}>
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default ClientFileUpload;
