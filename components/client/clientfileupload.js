// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   Stack,
//   Select,
//   MenuItem,
//   TextField,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";

// import {
//   Upload,
//   Delete,
//   Download,
//   Edit,
//   CheckCircle,
// } from "@mui/icons-material";

// const ClientFileUpload = () => {
//   const router = useRouter();
//   const params = useSearchParams();

//   const ref_id = params.get("ref_id");
//   const financial_year = params.get("financial_year");
//   const user_id = params.get("user_id");
//   const user_name = params.get("user_name");

//   const fileInputRef = useRef(null);
//   const editFileInputRef = useRef(null);

//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [letterCategoryCode, setLetterCategoryCode] = useState("");
//   const [letterUploaded, setLetterUploaded] = useState(0);

//   const [fileList, setFileList] = useState([]);
//   const [file, setFile] = useState(null);
//   const [linkName, setLinkName] = useState("");

//   const [previewURL, setPreviewURL] = useState(null);
//   const [previewType, setPreviewType] = useState("");

//   const [replaceSno, setReplaceSno] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // ================= FETCH CATEGORIES =================
//   const fetchCategories = async () => {
//     if (!ref_id || !financial_year) return;

//     const res = await axios.get(
//       "http://localhost:3080/api/upload-categories",
//       { params: { ref_id, financial_year } }
//     );

//     const data = res.data?.data || [];
//     setCategories(data);

//     const letter = data.find(c =>
//       c.cat_name.toLowerCase().includes("letter")
//     );

//     if (letter) {
//       setLetterCategoryCode(letter.cat_cd);

//       const check = await axios.get(
//         `http://localhost:3080/api/files/${ref_id}/${financial_year}/${letter.cat_cd}`
//       );

//       const count = check.data?.data?.length || 0;
//       setLetterUploaded(count);

//       if (count === 0) setSelectedCategory(letter.cat_cd);
//       else setSelectedCategory(data.find(c => c.cat_cd !== letter.cat_cd)?.cat_cd);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // ================= FETCH FILES =================
//   const fetchFiles = async () => {
//     if (!selectedCategory) return;

//     const res = await axios.get(
//       `http://localhost:3080/api/files/${ref_id}/${financial_year}/${selectedCategory}`
//     );
//     setFileList(res.data?.data || []);
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, [selectedCategory, letterUploaded]);

//   // ================= UPLOAD =================
//   const handleUpload = async () => {
//     if (!file) return;

//     const categoryToUse =
//       letterUploaded === 0 ? letterCategoryCode : selectedCategory;

//     const formData = new FormData();
//     formData.append("ref_id", ref_id);
//     formData.append("financial_year", financial_year);
//     formData.append("categary_cd", categoryToUse);
//     formData.append("user_id", user_id);
//     formData.append("user_name", user_name);
//     formData.append("file", file);

//     await axios.post(
//       "http://localhost:3080/api/post-files",
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     setFile(null);
//     setPreviewURL(null);
//     setLinkName("");
//     setShowSuccess(true);

//     fetchCategories();
//     fetchFiles();
//   };

//   // ================= DELETE =================
//   const deleteFile = async (sno) => {
//     if (!confirm("Delete this file?")) return;

//     await axios.delete(
//       `http://localhost:3080/api/files/delete/${ref_id}/${financial_year}/${sno}`,
//       { data: { user_id } }
//     );

//     fetchCategories();
//     fetchFiles();
//   };

//   // ================= EDIT =================
//   const handleEditFile = async (e) => {
//     const newFile = e.target.files[0];
//     if (!newFile || !replaceSno) return;

//     const original = fileList.find(f => f.sno === replaceSno);
//     if (!original) return;

//     const formData = new FormData();
//     formData.append("ref_id", ref_id);
//     formData.append("financial_year", financial_year);
//     formData.append("sno", replaceSno);
//     formData.append("link_name", original.link_name);
//     formData.append("user_id", user_id);
//     formData.append("user_name", user_name);
//     formData.append("file", newFile);

//     await axios.put("http://localhost:3080/api/files", formData);

//     setReplaceSno(null);
//     fetchFiles();
//   };

//   // ================= FILE SELECT =================
//   const onFileSelect = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreviewURL(URL.createObjectURL(selected));
//     setPreviewType(selected.type);
//     setLinkName(`${ref_id}_${Date.now()}`);
//   };

//   return (
//     <Box p={4} bgcolor="#f5f5f5">
//       {/* SUCCESS DIALOG */}
//       <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
//         <DialogTitle>
//           <CheckCircle color="success" /> Upload Successful
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={() => setShowSuccess(false)}>OK</Button>
//         </DialogActions>
//       </Dialog>

//       {/* UPLOAD CARD */}
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" textAlign="center" mb={3}>
//             {letterUploaded === 0 ? "Upload Letter" : "Upload Documents"}
//           </Typography>

//           <Grid container spacing={2} justifyContent="center">
//             <Grid item xs={12} md={4}>
//               {letterUploaded === 0 ? (
//                 <TextField value="Letter" fullWidth disabled />
//               ) : (
//                 <Select
//                   fullWidth
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   {categories.map(c => (
//                     <MenuItem key={c.cat_cd} value={c.cat_cd}>
//                       {c.cat_name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="File Name"
//                 value={linkName}
//                 onChange={(e) => setLinkName(e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={8}>
//               <input
//                 type="file"
//                 hidden
//                 ref={fileInputRef}
//                 onChange={onFileSelect}
//               />
//               <Button
//                 fullWidth
//                 variant="contained"
//                 startIcon={<Upload />}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 Browse File
//               </Button>
//             </Grid>
//           </Grid>

//           {previewURL && (
//             <Box mt={3} textAlign="center">
//               {previewType.startsWith("image/") ? (
//                 <img src={previewURL} height={200} />
//               ) : (
//                 <Typography>{file?.name}</Typography>
//               )}
//             </Box>
//           )}

//           <Stack alignItems="center" mt={3}>
//             <Button
//               variant="contained"
//               color="success"
//               size="large"
//               disabled={!file}
//               onClick={handleUpload}
//             >
//               Upload
//             </Button>
//           </Stack>
//         </CardContent>
//       </Card>

//       {/* FILE TABLE */}
//       <Card>
//         <CardContent>
//           <Typography variant="h6" mb={2}>
//             Uploaded Files
//           </Typography>

//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>#</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Size (MB)</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {fileList.map((f, i) => (
//                 <TableRow key={f.sno}>
//                   <TableCell>{i + 1}</TableCell>
//                   <TableCell>{f.link_name}</TableCell>
//                   <TableCell>
//                     {(f.file_size_in_bytes / 1024 / 1024).toFixed(2)}
//                   </TableCell>
//                   <TableCell>{f.content_type}</TableCell>
//                   <TableCell>
//                     <Stack direction="row" spacing={1}>
//                       <Button
//                         href={`http://localhost:3080/${f.file_path}`}
//                         target="_blank"
//                       >
//                         <Download />
//                       </Button>
//                       <Button
//                         color="error"
//                         onClick={() => deleteFile(f.sno)}
//                       >
//                         <Delete />
//                       </Button>
//                       <Button
//                         color="warning"
//                         onClick={() => {
//                           setReplaceSno(f.sno);
//                           editFileInputRef.current.click();
//                         }}
//                       >
//                         <Edit />
//                       </Button>
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* EDIT INPUT */}
//       <input
//         type="file"
//         hidden
//         ref={editFileInputRef}
//         onChange={handleEditFile}
//       />

//       {/* NAV BUTTONS */}
//       <Stack direction="row" justifyContent="center" mt={4} spacing={2}>
//         <Button variant="contained" color="error" onClick={() => router.back()}>
//           Back
//         </Button>
//         <Button
//           variant="contained"
//           onClick={() => router.push("/forwardto")}
//         >
//           Next
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default ClientFileUpload;




// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   Stack,
//   Select,
//   MenuItem,
//   TextField,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Dialog,
//   DialogTitle,
//   DialogActions,
//   CircularProgress,
// } from "@mui/material";

// import {
//   Upload,
//   Delete,
//   Download,
//   Edit,
//   CheckCircle,
// } from "@mui/icons-material";

// const ClientFileUpload = () => {
//   const router = useRouter();
//   const params = useSearchParams();

//   const ref_id = params.get("ref_id");
//   const financial_year = params.get("financial_year");
//   const user_id = params.get("user_id");
//   const user_name = params.get("user_name");

//   const fileInputRef = useRef(null);
//   const editFileInputRef = useRef(null);

//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [letterCategoryCode, setLetterCategoryCode] = useState("");
//   const [letterUploaded, setLetterUploaded] = useState(0);

//   const [fileList, setFileList] = useState([]);
//   const [file, setFile] = useState(null);
//   const [linkName, setLinkName] = useState("");

//   const [previewURL, setPreviewURL] = useState(null);
//   const [previewType, setPreviewType] = useState("");

//   const [replaceSno, setReplaceSno] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ================= FETCH CATEGORIES =================
//   const fetchCategories = async () => {
//     if (!ref_id || !financial_year) return;

//     const res = await axios.get(
//       "http://localhost:3080/api/upload-categories",
//       { params: { ref_id, financial_year } }
//     );

//     const data = res.data?.data || [];
//     setCategories(data);

//     const letter = data.find((c) =>
//       c.cat_name.toLowerCase().includes("letter")
//     );

//     if (letter) {
//       setLetterCategoryCode(letter.cat_cd);

//       const check = await axios.get(
//         `http://localhost:3080/api/files/${ref_id}/${financial_year}/${letter.cat_cd}`
//       );

//       const count = check.data?.data?.length || 0;
//       setLetterUploaded(count);

//       if (count === 0) {
//         setSelectedCategory(letter.cat_cd);
//       } else {
//         const next = data.find((c) => c.cat_cd !== letter.cat_cd);
//         setSelectedCategory(next?.cat_cd || "");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // ================= FETCH FILES =================
//   const fetchFiles = async () => {
//     if (!selectedCategory) return;

//     const res = await axios.get(
//       `http://localhost:3080/api/files/${ref_id}/${financial_year}/${selectedCategory}`
//     );
//     setFileList(res.data?.data || []);
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, [selectedCategory, letterUploaded]);

//   // ================= FILE SELECT =================
//   const onFileSelect = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     // 5MB validation
//     if (selected.size > 5 * 1024 * 1024) {
//       alert("File size should be under 5MB");
//       return;
//     }

//     setFile(selected);
//     setPreviewURL(URL.createObjectURL(selected));
//     setPreviewType(selected.type);
//     setLinkName(`${ref_id}_${Date.now()}`);
//   };

//   // ================= UPLOAD =================
//   const handleUpload = async () => {
//     if (!file || !linkName) return;

//     setLoading(true);

//     const categoryToUse =
//       letterUploaded === 0 ? letterCategoryCode : selectedCategory;

//     const formData = new FormData();
//     formData.append("ref_id", ref_id);
//     formData.append("financial_year", financial_year);
//     formData.append("categary_cd", categoryToUse);
//     formData.append("link_name", linkName); // ✅ FIXED
//     formData.append("user_id", user_id);
//     formData.append("user_name", user_name);
//     formData.append("file", file);

//     await axios.post("http://localhost:3080/api/post-files", formData);

//     setFile(null);
//     setPreviewURL(null);
//     setLinkName("");
//     setShowSuccess(true);
//     setLoading(false);

//     fetchCategories();
//     fetchFiles();
//   };

//   // ================= DELETE =================
//   const deleteFile = async (sno) => {
//     if (!confirm("Delete this file?")) return;

//     await axios.delete(
//       `http://localhost:3080/api/files/delete/${ref_id}/${financial_year}/${sno}`,
//       { data: { user_id } }
//     );

//     fetchCategories();
//     fetchFiles();
//   };

//   // ================= EDIT =================
//   const handleEditFile = async (e) => {
//     const newFile = e.target.files[0];
//     if (!newFile || !replaceSno) return;

//     const original = fileList.find((f) => f.sno === replaceSno);
//     if (!original) return;

//     const formData = new FormData();
//     formData.append("ref_id", ref_id);
//     formData.append("financial_year", financial_year);
//     formData.append("sno", replaceSno);
//     formData.append("link_name", original.link_name);
//     formData.append("user_id", user_id);
//     formData.append("user_name", user_name);
//     formData.append("file", newFile);

//     await axios.put("http://localhost:3080/api/files", formData);

//     setReplaceSno(null);
//     fetchFiles();
//   };

//   return (
//     <Box p={4} bgcolor="#f5f5f5">
//       {/* SUCCESS DIALOG */}
//       <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
//         <DialogTitle>
//           <CheckCircle color="success" /> Upload Successful
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={() => setShowSuccess(false)}>OK</Button>
//         </DialogActions>
//       </Dialog>

//       {/* UPLOAD CARD */}
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" align="center" mb={3}>
//             {letterUploaded === 0 ? "Upload Letter" : "Upload Documents"}
//           </Typography>

//           <Grid container spacing={2} justifyContent="center">
//             <Grid item xs={12} md={4}>
//               {letterUploaded === 0 ? (
//                 <TextField value="Letter" fullWidth disabled />
//               ) : (
//                 <Select
//                   fullWidth
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   {categories.map((c) => (
//                     <MenuItem key={c.cat_cd} value={c.cat_cd}>
//                       {c.cat_name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="File Name"
//                 value={linkName}
//                 onChange={(e) => setLinkName(e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={8}>
//               <input
//                 type="file"
//                 hidden
//                 ref={fileInputRef}
//                 onChange={onFileSelect}
//               />
//               <Button
//                 fullWidth
//                 variant="contained"
//                 startIcon={<Upload />}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 Browse File
//               </Button>
//             </Grid>
//           </Grid>

//           {previewURL && (
//             <Box mt={3} textAlign="center">
//               {previewType.startsWith("image/") ? (
//                 <img src={previewURL} height={200} />
//               ) : (
//                 <Typography>{file?.name}</Typography>
//               )}
//             </Box>
//           )}

//           <Stack alignItems="center" mt={3}>
//             <Button
//               variant="contained"
//               color="success"
//               size="large"
//               disabled={!file || loading}
//               onClick={handleUpload}
//             >
//               {loading ? <CircularProgress size={24} /> : "Upload"}
//             </Button>
//           </Stack>
//         </CardContent>
//       </Card>

//       {/* FILE TABLE */}
//       <Card>
//         <CardContent>
//           <Typography variant="h6" mb={2}>
//             Uploaded Files
//           </Typography>

//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>#</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Size (MB)</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {fileList.map((f, i) => (
//                 <TableRow key={f.sno}>
//                   <TableCell>{i + 1}</TableCell>
//                   <TableCell>{f.link_name}</TableCell>
//                   <TableCell>
//                     {(f.file_size_in_bytes / 1024 / 1024).toFixed(2)}
//                   </TableCell>
//                   <TableCell>{f.content_type}</TableCell>
//                   <TableCell>
//                     <Stack direction="row" spacing={1}>
//                       <Button
//                         href={`http://localhost:3080/${f.file_path}`}
//                         target="_blank"
//                       >
//                         <Download />
//                       </Button>
//                       <Button color="error" onClick={() => deleteFile(f.sno)}>
//                         <Delete />
//                       </Button>
//                       <Button
//                         color="warning"
//                         onClick={() => {
//                           setReplaceSno(f.sno);
//                           editFileInputRef.current.click();
//                         }}
//                       >
//                         <Edit />
//                       </Button>
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* EDIT FILE INPUT */}
//       <input
//         type="file"
//         hidden
//         ref={editFileInputRef}
//         onChange={handleEditFile}
//       />

//       {/* NAV BUTTONS */}
//       <Stack direction="row" justifyContent="center" mt={4} spacing={2}>
//         <Button variant="contained" color="error" onClick={() => router.back()}>
//           Back
//         </Button>
//         <Button variant="contained" onClick={() => router.push("/forwardto")}>
//           Next
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default ClientFileUpload;

// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";

// import {
//   Container,
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Select,
//   MenuItem,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// import {
//   FaTrash,
//   FaDownload,
//   FaUpload,
//   FaCheckCircle,
//   FaFolder,
//   FaPencilAlt,
// } from "react-icons/fa";

// const ClientFileUpload = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // ✅ get data from URL params
//   const ref_id = searchParams.get("ref_id");
//   const financial_year = searchParams.get("financial_year");
//   const user_id = searchParams.get("user_id");
//   const user_name = searchParams.get("user_name");

//   const fileInputRef = useRef(null);
//   const editFileInputRef = useRef(null);

//   const [fileToReplaceSno, setFileToReplaceSno] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const [file, setFile] = useState(null);
//   const [linkName, setLinkName] = useState("");
//   const [letterUploaded, setLetterUploaded] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [previewURL, setPreviewURL] = useState(null);
//   const [previewType, setPreviewType] = useState("");
//   const [fileSize, setFileSize] = useState(null);

//   /* ================= LOGIC UNCHANGED ================= */
//   /* your existing API / upload / delete logic remains same */

//   return (
//     <Box sx={{ background: "#f5f5f5", minHeight: "100vh", py: 4 }}>
//       <Container maxWidth="lg">

//         {/* SUCCESS MODAL */}
//         <Dialog open={showModal} onClose={() => setShowModal(false)}>
//           <DialogTitle sx={{ textAlign: "center" }}>
//             <FaCheckCircle color="#38ef7d" size={40} />
//           </DialogTitle>
//           <DialogContent>
//             <Typography align="center" fontWeight="bold">
//               File Uploaded Successfully!
//             </Typography>
//           </DialogContent>
//           <DialogActions sx={{ justifyContent: "center" }}>
//             <Button variant="contained" onClick={() => setShowModal(false)}>
//               Continue
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* HEADER */}
//         <Card sx={{ mb: 4 }}>
//           <CardContent>
//             <Grid container spacing={2} alignItems="center">
//               <Grid item>
//                 <FaFolder size={32} />
//               </Grid>
//               <Grid item>
//                 <Typography variant="h5" fontWeight="bold">
//                   File Management
//                 </Typography>
//                 <Typography variant="body2">
//                   Upload and manage your documents
//                 </Typography>
//               </Grid>
//             </Grid>

//             <Grid container spacing={2} mt={2}>
//               <Grid item md={3}>
//                 <Typography variant="caption">Reference ID</Typography>
//                 <Typography fontWeight="bold">{ref_id}</Typography>
//               </Grid>
//               <Grid item md={3}>
//                 <Typography variant="caption">Financial Year</Typography>
//                 <Typography fontWeight="bold">{financial_year}</Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* UPLOAD FORM */}
//         <Card sx={{ mb: 4 }}>
//           <CardContent>
//             <Typography align="center" variant="h6" fontWeight="bold" mb={3}>
//               {letterUploaded > 0 ? "Upload Documents" : "Upload Initial Letter"}
//             </Typography>

//             <Grid container spacing={3} justifyContent="center">
//               <Grid item md={4}>
//                 <Typography fontWeight="bold">Category *</Typography>
//                 {letterUploaded === 0 ? (
//                   <TextField fullWidth value="Letter" disabled />
//                 ) : (
//                   <Select
//                     fullWidth
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                   >
//                     {categories.map((c) => (
//                       <MenuItem key={c.cat_cd} value={c.cat_cd}>
//                         {c.cat_name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 )}
//               </Grid>

//               <Grid item md={4}>
//                 <Typography fontWeight="bold">File Name *</Typography>
//                 <TextField
//                   fullWidth
//                   value={linkName}
//                   onChange={(e) => setLinkName(e.target.value)}
//                 />
//               </Grid>

//               <Grid item md={8}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   size="large"
//                   startIcon={<FaUpload />}
//                   onClick={() => fileInputRef.current.click()}
//                 >
//                   Browse File
//                 </Button>

//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   hidden
//                   onChange={(e) => {
//                     const f = e.target.files[0];
//                     if (!f) return;
//                     setFile(f);
//                     setPreviewURL(URL.createObjectURL(f));
//                     setPreviewType(f.type);
//                     setFileSize((f.size / (1024 * 1024)).toFixed(2));
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* FOOTER BUTTONS */}
//         <Box textAlign="center" mt={4}>
//           <Button onClick={() => router.back()} sx={{ mr: 2 }}>
//             Back
//           </Button>
//           <Button variant="contained" onClick={() => router.push("/forwardto")}>
//             Next
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default ClientFileUpload;



// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import {
//   Container,
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   IconButton,
//   Paper
// } from "@mui/material";

// import {
//   FaTrash,
//   FaDownload,
//   FaUpload,
//   FaFileAlt,
//   FaCheckCircle,
//   FaFolder,
//   FaPencilAlt,
// } from "react-icons/fa";

// const ClientFileUpload = () => {
//   /* ================= LOGIC UNCHANGED ================= */
//   const fileInputRef = useRef(null);
//   const editFileInputRef = useRef(null);

//   const [fileToReplaceSno, setFileToReplaceSno] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const [file, setFile] = useState(null);
//   const [linkName, setLinkName] = useState("");
//   const [letterUploaded, setLetterUploaded] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [previewURL, setPreviewURL] = useState(null);
//   const [previewType, setPreviewType] = useState("");
//   const [fileSize, setFileSize] = useState(null);

//   /* ================= UI START ================= */

//   return (
//     <Box sx={{ minHeight: "100vh", background: "#f5f5f5", py: 4 }}>
//       <Container maxWidth="lg">

//         {/* ================= SUCCESS MODAL ================= */}
//         <Dialog open={showModal} onClose={() => setShowModal(false)}>
//           <DialogTitle sx={{ textAlign: "center" }}>
//             <FaCheckCircle size={40} color="#38ef7d" />
//           </DialogTitle>
//           <DialogContent>
//             <Typography align="center" fontWeight="bold">
//               File Uploaded Successfully!
//             </Typography>
//           </DialogContent>
//           <DialogActions sx={{ justifyContent: "center" }}>
//             <Button variant="contained" onClick={() => setShowModal(false)}>
//               Continue
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* ================= HEADER ================= */}
//         <Card sx={{ mb: 4 }}>
//           <CardContent>
//             <Grid container alignItems="center" spacing={2}>
//               <Grid item>
//                 <FaFolder size={30} />
//               </Grid>
//               <Grid item>
//                 <Typography variant="h5" fontWeight="bold">
//                   File Management
//                 </Typography>
//                 <Typography variant="body2">
//                   Upload and manage your documents
//                 </Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* ================= UPLOAD FORM ================= */}
//         <Card sx={{ mb: 4 }}>
//           <CardContent>
//             <Typography align="center" variant="h6" fontWeight="bold" mb={3}>
//               {letterUploaded > 0 ? "Upload Documents" : "Upload Initial Letter"}
//             </Typography>

//             <Grid container spacing={3} justifyContent="center">
//               <Grid item md={4}>
//                 <Typography fontWeight="bold">Category *</Typography>
//                 {letterUploaded === 0 ? (
//                   <TextField fullWidth value="Letter" disabled />
//                 ) : (
//                   <Select
//                     fullWidth
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                   >
//                     {categories.map((c) => (
//                       <MenuItem key={c.cat_cd} value={c.cat_cd}>
//                         {c.cat_name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 )}
//               </Grid>

//               <Grid item md={4}>
//                 <Typography fontWeight="bold">File Name *</Typography>
//                 <TextField
//                   fullWidth
//                   value={linkName}
//                   onChange={(e) => setLinkName(e.target.value)}
//                 />
//               </Grid>

//               <Grid item md={8}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   startIcon={<FaUpload />}
//                   onClick={() => fileInputRef.current.click()}
//                 >
//                   Browse File
//                 </Button>

//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   hidden
//                   onChange={(e) => {
//                     const f = e.target.files[0];
//                     if (!f) return;
//                     setFile(f);
//                     setPreviewURL(URL.createObjectURL(f));
//                     setPreviewType(f.type);
//                     setFileSize((f.size / (1024 * 1024)).toFixed(2));
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* ================= FILE TABLE ================= */}
//         <Paper>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>S.No</TableCell>
//                 <TableCell>File Name</TableCell>
//                 <TableCell>Size</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell align="center">Action</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {fileList.map((f, i) => (
//                 <TableRow key={f.sno}>
//                   <TableCell>{i + 1}</TableCell>
//                   <TableCell>{f.link_name}</TableCell>
//                   <TableCell>
//                     {(f.file_size_in_bytes / (1024 * 1024)).toFixed(2)} MB
//                   </TableCell>
//                   <TableCell>{f.content_type}</TableCell>
//                   <TableCell align="center">
//                     <IconButton
//                       href={`http://localhost:3080/${f.file_path}`}
//                       target="_blank"
//                       color="success"
//                     >
//                       <FaDownload />
//                     </IconButton>

//                     <IconButton color="error">
//                       <FaTrash />
//                     </IconButton>

//                     <IconButton
//                       color="warning"
//                       onClick={() => {
//                         setFileToReplaceSno(f.sno);
//                         editFileInputRef.current.click();
//                       }}
//                     >
//                       <FaPencilAlt />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>

//         {/* ================= HIDDEN EDIT INPUT ================= */}
//         <input
//           type="file"
//           ref={editFileInputRef}
//           hidden
//         />

//         {/* ================= FOOTER ================= */}
//         <Box textAlign="center" mt={4}>
//           <Button sx={{ mr: 2 }} variant="outlined">
//             Back
//           </Button>
//           <Button variant="contained">
//             Next
//           </Button>
//         </Box>

//       </Container>
//     </Box>
//   );
// };

// export default ClientFileUpload;


// =======================================
"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
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
  FaDownload,
  FaUpload,
  FaFileAlt,
  FaCheckCircle,
  FaFolder,
  FaPencilAlt,
} from "react-icons/fa";

const ClientFileUpload = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { ref_id, financial_year, user_id, user_name } = state || {};

  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const [fileToReplaceSno, setFileToReplaceSno] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fileList, setFileList] = useState([]);

  const [file, setFile] = useState(null);
  const [linkName, setLinkName] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const [previewType, setPreviewType] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ---------------- EXISTING LOGIC (UNCHANGED) ---------------- */
  // fetchCategories, fetchFiles, handleUpload, deleteFile,
  // drag & drop handlers, edit logic, generateNextFileName
  // ⛔ NOT REPEATED HERE (use exactly what you already have)
  /* ----------------------------------------------------------- */

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      {/* HEADER CARD */}
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
              <Typography fontWeight="bold">{ref_id}</Typography>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="caption">Financial Year</Typography>
              <Typography fontWeight="bold">{financial_year}</Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>

      {/* UPLOAD CARD */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>

          <Box textAlign="center" mb={3}>
            <FaUpload size={26} color="#1976d2" />
            <Typography variant="h6" fontWeight="bold">
              Upload Initial Letter
            </Typography>
          </Box>

          <Box display="flex" gap={3} justifyContent="center" mb={3}>

            <TextField
              label="Category"
              value="Letter"
              disabled
              fullWidth
            />

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

          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={(e) => {
              const f = e.target.files[0];
              if (!f) return;
              setFile(f);
              setPreviewURL(URL.createObjectURL(f));
              setPreviewType(f.type);
            }}
          />

          {/* DRAG DROP */}
          <Paper
            sx={{
              height: 200,
              border: "2px dashed #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <Box textAlign="center">
              <FaUpload size={40} />
              <Typography>Drag & Drop Files Here</Typography>
              <Typography variant="caption">or click to browse</Typography>
            </Box>
          </Paper>

          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              size="large"
              disabled={!file || !linkName}
              onClick={handleUpload}
            >
              Upload Letter
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* FILE TABLE */}
      <Paper>
        <Typography
          sx={{ p: 2, background: "#222", color: "#fff", fontWeight: "bold" }}
        >
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
            No files uploaded in this category.
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
