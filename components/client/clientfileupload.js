"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { getUserIP } from "../../services/userip";

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
  MenuItem,
  Tooltip,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";

import {
  FaUpload,
  FaFolder,
  FaDownload,
  FaCheckCircle,
  FaFileAlt,
  FaTrash,
  FaPencilAlt,
  FaEye,
} from "react-icons/fa";

/* ===== VIRTUAL MATTER (Fallback) ===== */
const VIRTUAL_MATTER = {
  categoryCd: "01",
  categoryName: "Matter",
};

const ClientFileUpload = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  /* ========= USER ========= */
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("user_id") || "00100");
      setUserName(localStorage.getItem("user_name") || "");
    }
  }, []);

  /* ========= PARAMS ========= */
  const savedRefId = params?.savedRefId;
  const financialYear = searchParams.get("financialYear");

  /* ========= REFS ========= */
  const fileInputRef = useRef(null);

  /* ========= STATE ========= */
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [linkName, setLinkName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [letterCategoryCode, setLetterCategoryCode] = useState("");
  const [matterCategoryCode, setMatterCategoryCode] = useState("");
  const [letterUploaded, setLetterUploaded] = useState(0);

  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  const [fileToReplaceSno, setFileToReplaceSno] = useState(null);
  const editFileInputRef = useRef(null);

  /* ========= FILE HANDLERS ========= */
  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setLinkName(selectedFile.name);

    if (selectedFile.type?.startsWith("image/")) {
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
    if (!savedRefId || !financialYear) return;

    try {
      const res = await axios.get(
        "http://103.79.34.50:8083/api/Client/get-upload-categories",
        {
          params: { ref_id: savedRefId, financial_year: financialYear },
        },
      );

      const data = res?.data?.data || [];
      setCategories(data);

      // Detect Letter & Matter categories
      const letter = data.find((c) =>
        c?.categoryName?.toLowerCase()?.includes("letter"),
      );

      const matter = data.find((c) =>
        c?.categoryName?.toLowerCase()?.includes("matter"),
      );

      if (letter) {
        setLetterCategoryCode(letter.categoryCd);

        // Check if letter is already uploaded
        const check = await axios.get(
          `http://103.79.34.50:8083/api/Client/get-files/${savedRefId}/${financialYear}`,
        );

        const uploadedCount = check?.data?.data?.length || 0;
        setLetterUploaded(uploadedCount);

        // --------- AUTO-SELECT LOGIC ---------
        if (uploadedCount > 0) {
          // Letter already uploaded → auto-select Matter or virtual Matter
          setSelectedCategory(matter?.categoryCd || VIRTUAL_MATTER.categoryCd);
        } else {
          // Letter NOT uploaded → auto-select Letter
          setSelectedCategory(letter.categoryCd);
        }
      }

      if (matter) {
        setMatterCategoryCode(matter.categoryCd);
      }
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  const fetchFiles = async () => {
    if (!savedRefId || !financialYear) return;

    try {
      const res = await axios.get(
        `http://103.79.34.50:8083/api/Client/get-files/${savedRefId}/${financialYear}`,
      );
      console.log("Fetching Files URL:", res);
      setFileList(res?.data?.data || []);
    } catch (err) {
      console.error("Fetch files error:", err);
    }
  };

  const handleUpload = async () => {
    if (!file || !userId) return;
    const userIp = await getUserIP();
    const categoryToUse =
      letterUploaded === 0 ? letterCategoryCode : selectedCategory;

    const nextCount =
      fileList.filter((f) => f.categary_cd === categoryToUse).length + 1;

    const formData = new FormData();
    formData.append("savedRefId", savedRefId);
    formData.append("financialYear", financialYear);
    formData.append("categary_cd", categoryToUse);
    formData.append("nextCount", nextCount);
    formData.append("user_id", userId);
    formData.append("user_name", userName);
    formData.append("file", file);
    formData.append("UserIp", userIp);

    await axios.post(
      "http://103.79.34.50:8083/api/Client/uploadfile",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    // After letter upload auto-switch to matter
    if (categoryToUse === letterCategoryCode) {
      setLetterUploaded(1);
      setSelectedCategory(matterCategoryCode || VIRTUAL_MATTER.categoryCd);
    }

    setFile(null);
    setLinkName("");
    setFilePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    setShowModal(true);
    fetchFiles(categoryToUse);
  };

  /* ========= EFFECTS ========= */
  useEffect(() => {
    fetchCategories();
  }, [savedRefId, financialYear]);

  useEffect(() => {
    if (selectedCategory) {
      fetchFiles(selectedCategory);
    }
  }, [selectedCategory]);

  /* ========= NORMALIZED CATEGORIES ========= */
  const normalizedCategories = useMemo(() => {
    const list = [...categories];

    const hasMatter = list.some((c) =>
      c?.categoryName?.toLowerCase()?.includes("matter"),
    );

    if (letterUploaded > 0 && !hasMatter) {
      list.push(VIRTUAL_MATTER);
    }

    return list;
  }, [categories, letterUploaded]);

  const letterCategoryName = useMemo(() => {
    const cat = categories.find((c) => c.categoryCd === letterCategoryCode);
    return cat?.categoryName || "Letter";
  }, [categories, letterCategoryCode]);

  // ============update==================
  const handleEditFileChange = async (e) => {
    const newFile = e.target.files[0];

    if (!newFile || !fileToReplaceSno) return;

    try {
      const originalFile = fileList.find(
        (f) => Number(f.sno) === Number(fileToReplaceSno),
      );

      if (!originalFile) {
        alert("File record not found!");
        return;
      }
      // ✅ Extract nextCount from filename (last underscore)
      const extractNextCount = (fileName) => {
        const base = fileName.split(".")[0]; // remove extension
        const parts = base.split("_"); // split by _
        return Number(parts[parts.length - 1]); // last value
      };

      const nextCount = extractNextCount(originalFile.link_name);
      const userIp = await getUserIP();
      // console.log("Extracted nextCount:", nextCount);
      const formData = new FormData();

      // 🔥 Correct field names according to your backend
      formData.append("savedRefId", savedRefId);
      formData.append("financialYear", financialYear);
      formData.append("categary_cd", originalFile.categary_cd);
      formData.append("nextCount", nextCount);
      formData.append("sno", originalFile.sno);
      formData.append("user_id", userId);
      formData.append("user_name", userName);
      formData.append("file", newFile);
      formData.append("UserIp", userIp);

      const res = await axios.put(
        "http://103.79.34.50:8083/api/Client/updatefile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (res.data?.status === 1) {
        alert("File updated successfully!");

        // Refresh file list for the same category
        await fetchFiles(originalFile.categary_cd);
      } else {
        alert(res.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Error updating file");
    } finally {
      setFileToReplaceSno(null);
      if (editFileInputRef.current) {
        editFileInputRef.current.value = "";
      }
    }
  };
  const startEditProcess = (sno) => {
    setFileToReplaceSno(sno);
    editFileInputRef.current.click();
  };

  // ===========delete==================
  const handleDeleteFile = async (sno) => {
    if (!sno) return;

    const originalFile = fileList.find((f) => Number(f.sno) === Number(sno));

    if (!originalFile) {
      alert("File record not found!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const userIp = await getUserIP();
      const url = `http://103.79.34.50:8083/api/Client/deletefile/${savedRefId}/${financialYear}/${originalFile.sno}`;
      console.log("Delete URL:", url);
      const bodyData = {
        userId: userId,
        userName: userName,
        userIp: userIp,
      };

      const res = await axios.delete(url, {
        data: bodyData, // 🔥 DELETE must send body like this in axios
        headers: { "Content-Type": "application/json" },
      });

      if (res.data?.status === 1) {
        alert("File deleted successfully!");
        await fetchFiles(originalFile.categary_cd);
      } else {
        alert(res.data?.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Error deleting file");
    }
  };

  const handleNext = () => {
    // You can change the next route here
    router.push(`/client/forward`);
  };

  // =================Byte to MB===================
  const formatBytesToMB = (bytes) => {
    if (!bytes) return "0 MB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  /* ========= UI ========= */
  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      {/* Header Card */}
      {/* <Card
        sx={{
          mb: 3,
          background: "linear-gradient(135deg,#667eea,#764ba2)",
          color: "#fff",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <FaFolder size={20} />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                File Management
              </Typography>
              <Typography variant="body2" opacity={0.8} fontSize={10}>
                Upload and manage your documents
              </Typography>
            </Box>
          </Box>

          <Box mt={1} display="flex" gap={13}>
            <Paper sx={{ p: 1, flex: 1 }}>
              <Typography variant="caption">Reference ID</Typography>
              <Typography fontWeight="bold">{savedRefId}</Typography>
            </Paper>
            <Paper sx={{ p: 1 }}>
              <Typography variant="caption">Financial Year</Typography>
              <Typography fontWeight="bold">{financialYear}</Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card> */}


<Card
  sx={{
    mb: 3,
    borderRadius: 2,
    // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    background: "rgb(32, 57, 66)",
    color: "#fff",
    color: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    position: "relative",
    overflow: "hidden",
  }}
>
  <CardContent sx={{ p:   1 }}>
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      
      {/* Icon Circle */}
      <Box
        sx={{
          width: 45,
          height: 45,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(6px)",
        }}
      >
        <FaFolder size={20} />
      </Box>

      {/* Title */}
      <Box>
        <Typography variant="h6" fontWeight="600">
          File Management
        </Typography>
        <Typography
          variant="body2"
          sx={{ opacity: 0.85, fontSize: 12, letterSpacing: 0.5 }}
        >
          Upload and manage your documents
        </Typography>
      </Box>
    </Box>

    {/* Info Boxes */}
    <Box
      mt={1}
      display="flex"
      gap={2}
      flexWrap="wrap"
    >
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          maxWidth: 250,
          p: 1,
          borderRadius: 2,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          color: "#fff",
        }}
      >
        <Typography
          variant="caption"
          sx={{ opacity: 0.8, letterSpacing: 0.5 }}
        >
          Reference ID
        </Typography>
        <Typography fontWeight="bold" fontSize={11}>
          {savedRefId}
        </Typography>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          maxWidth: 250,
          p: 1,
          borderRadius: 2,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          color: "#fff",
        }}
      >
        <Typography
          variant="caption"
          sx={{ opacity: 0.8, letterSpacing: 0.5 }}
        >
          Financial Year
        </Typography>
        <Typography fontWeight="bold" fontSize={16}>
          {financialYear}
        </Typography>
      </Paper>
    </Box>
  </CardContent>
</Card>
 



<Stack direction={{ xs: "column", md: "row" }} spacing={3}>
  
  {/* Upload Section */}
  <Box flex={1}>
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Box textAlign="center" mb={0}>
          {/* <FaUpload size={26} /> */}
          <Typography variant="h6" fontWeight="bold">
            Upload Documents
          </Typography>
        </Box>

        <Box display="flex" gap={2} mb={3}>
          {letterUploaded === 0 ? (
            <TextField label="Category" value="Letter" disabled fullWidth />
          ) : (
            <TextField
              select
              size="small"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              fullWidth
            >
              {normalizedCategories.map((cat) => (
                <MenuItem key={cat.categoryCd} value={cat.categoryCd}>
                  {cat.categoryName}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            label="File Name"
            size="small"
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            fullWidth
          />
        </Box>

        <input
          hidden
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={() => fileInputRef.current?.click()}
        >
          Browse
        </Button>

        <Paper
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          sx={{
            height: 180,
            border: "2px dashed",
            borderColor: file ? "success.main" : "#ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            mt: 2,
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
                  <img src={filePreviewUrl} height={120} alt="preview" />
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
            disabled={!file}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Box>

  {/* Uploaded Files Table */}
  <Box flex={1.5}>
    <Paper>
      <Typography sx={{ p: 1, background: "rgb(32, 57, 66)", color: "#fff" }}>
        Uploaded Files
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>S.No</strong></TableCell>
            <TableCell><strong>File Name</strong></TableCell>
            <TableCell><strong>File Size</strong></TableCell>
            <TableCell><strong>File Type</strong></TableCell>
            <TableCell align="center"><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {fileList.map((f, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{f.link_name}</TableCell>
              <TableCell>
                {formatBytesToMB(f.file_size_in_bytes)}
              </TableCell>
              <TableCell>{f.content_type}</TableCell>

              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">

                  <Tooltip title="View File">
                    <IconButton
                      color="success"
                      component="a"
                      href={`http://103.79.34.50:8083/Uploads/Client/${f.link_name}`}
                      target="_blank"
                    >
                      <FaEye size={16} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Replace File">
                    <IconButton
                      color="warning"
                      onClick={() => startEditProcess(f.sno)}
                    >
                      <FaPencilAlt size={16} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete File">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteFile(f.sno)}
                    >
                      <FaTrash size={16} />
                    </IconButton>
                  </Tooltip>

                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

    <input
      type="file"
      hidden
      ref={editFileInputRef}
      onChange={handleEditFileChange}
    />

          {/* Navigation Buttons */}
      <Box  textAlign="center" mt={3}>
        {/* Back Button */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.back()}
          sx={{
            px: 4,
            py: 1,
         marginRight: 2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          ← Back
        </Button>

        {/* Next Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNext()}
          sx={{
            px: 4,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Next →
        </Button>
      </Box>
  </Box>

</Stack>
{/* =================================== */}
   {/* Upload Card */}
       {/* <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent>
         <Box textAlign="center" mb={3}>
           <FaUpload size={26} />
         <Typography variant="h6" fontWeight="bold">
          Upload Documents
          </Typography>
          </Box>

          <Box display="flex" gap={3} mb={3}>
            {letterUploaded === 0 ? (
              <TextField label="Category" value="Letter" disabled fullWidth />
            ) : (
              <TextField
                select
                size="small"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                fullWidth
              >
                {normalizedCategories.map((cat) => (
                  <MenuItem key={cat.categoryCd} value={cat.categoryCd}>
                    {cat.categoryName}
                </MenuItem>
              ))}
            </TextField>
          )}
             <TextField
               label="File Name"
               size="small"
               value={linkName}
               fullWidth
             />
           </Box>
           <input
             hidden
             type="file"
             ref={fileInputRef}
             onChange={(e) => handleFileSelect(e.target.files[0])}
           />

           <Button
             fullWidth
             variant="contained"
             onClick={() => fileInputRef.current?.click()}
           >
             Browse
           </Button>
           <Paper
             onClick={() => fileInputRef.current?.click()}
             onDragOver={(e) => {
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
               mt: 2,
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
                     <img src={filePreviewUrl} height={120} alt="preview" />
                   ) : (
                   <FaFileAlt size={40} />
                 )}
                 <Typography fontWeight="bold">{file.name}</Typography>
               </>
             )}
           </Box>
         </Paper>
         <Box textAlign="center" mt={3}>
             <Button variant="contained" disabled={!file} onClick={handleUpload}>
               Upload
             </Button>
           </Box>
         </CardContent>
       </Card>
// =================Files Table==================  
       <Paper>
         <Typography sx={{ p: 2, background: "#222", color: "#fff" }}>
           Uploaded Files
         </Typography>

         <Table>
           <TableHead>
             <TableRow>
               <TableCell>
                 <strong>S.No</strong>
               </TableCell>
               <TableCell>
                 <strong>File Name</strong>
               </TableCell>
               <TableCell>
                 <strong>File Size</strong>
               </TableCell>
               <TableCell>
                 <strong>File Type</strong>
               </TableCell>
               <TableCell>
                 <strong>Action</strong>
             </TableCell>
           </TableRow>
         </TableHead>
           <TableBody>
             {fileList.map((f, i) => (
               <TableRow key={i}>
                 <TableCell>{i + 1}</TableCell>
                 <TableCell>{f.link_name}</TableCell>
                 <TableCell>{formatBytesToMB(f.file_size_in_bytes)}</TableCell>
                 <TableCell>{f.content_type}</TableCell>
 // =============Actions with Download, Edit, Delete Buttons=============  
                 <TableCell align="center">
                   <Stack direction="row" spacing={1} justifyContent="center">
                 
                     <Tooltip title="Download File" arrow>
                       <IconButton
                         color="success"
                        component="a"
                        href={`http://103.79.34.50:8083/Uploads/Client/${f.link_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          border: "1px solid",
                          borderColor: "success.main",
                          "&:hover": {
                            backgroundColor: "success.main",
                            color: "#fff",
                          },
                        }}
                      >     

 //======================= <FaDownload size={16} /> 
                        <FaEye size={16} />
                      </IconButton>
                    </Tooltip>

 //=================Edit Button ======================= 
                    <Tooltip title="Edit / Replace File" arrow>
                      <IconButton
                        color="warning"
                        onClick={() => startEditProcess(f.sno)}
                        sx={{
                          border: "1px solid",
                          borderColor: "warning.main",
                          "&:hover": {
                            backgroundColor: "warning.main",
                            color: "#fff",
                          },
                        }}
                      >
                        <FaPencilAlt size={16} />
                      </IconButton>

                       <input
                         type="file"
                         hidden
                         ref={editFileInputRef}
                         onChange={handleEditFileChange}
                       />
                     </Tooltip>

{/* // ======================Delete Button ====================   
                     <Tooltip title="Delete File" arrow>
                       <IconButton
                         color="error"
                         onClick={() => handleDeleteFile(f.sno)}
                         sx={{
                           border: "1px solid",
                           borderColor: "error.main",
                           "&:hover": {
                             backgroundColor: "error.main",
                             color: "#fff",
                           },
                         }}
                       >
                         <FaTrash size={16} />
                       </IconButton>
                     </Tooltip>
                   </Stack>
                 </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>

    </Paper> */}

      {/* =============================== */}
      {/* Success Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>
          <FaCheckCircle color="green" /> Success
        </DialogTitle>
        <DialogContent>File Uploaded Successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Continue</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientFileUpload; 
