
// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useRouter, useParams, useSearchParams } from "next/navigation";

// import {
//   Container,
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,

//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";

// import {
//   FaTrash,
//       FaFileAlt, 
//   FaDownload,
//   FaUpload,
//   FaFolder,
//   FaPencilAlt,
//   FaCheckCircle,
// } from "react-icons/fa";

// const ClientFileUpload = () => {
//   const router = useRouter();
//   const params = useParams();
//   const searchParams = useSearchParams();

//   /* ---------------- URL PARAM ---------------- */
//   const savedRefId = params?.savedRefId;

//   /* ---------------- QUERY PARAMS ---------------- */
//   const financial_year = searchParams.get("financial_year");
 
//   /* ---------------- REFS ---------------- */
//   const fileInputRef = useRef(null);
//   const editFileInputRef = useRef(null);

//   /* ---------------- STATE ---------------- */
//   const [fileToReplaceSno, setFileToReplaceSno] = useState(null);
//   const [fileList, setFileList] = useState([]);
//   const [file, setFile] = useState(null);
//   const [linkName, setLinkName] = useState("");
//   const [previewURL, setPreviewURL] = useState(null);
//   const [previewType, setPreviewType] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   /* ---------------- EFFECT ---------------- */

// /*===========================*/
// const [isDragging, setIsDragging] = useState(false);
// const [filePreviewUrl, setFilePreviewUrl] = useState(null);
// const handleFileSelect = (selectedFile) => {
//   if (!selectedFile) return;

//   setFile(selectedFile);
//   setLinkName(selectedFile.name);

//   if (selectedFile.type.startsWith("image/")) {
//     setFilePreviewUrl(URL.createObjectURL(selectedFile));
//   } else {
//     setFilePreviewUrl(null);
//   }
// };

// const handleDragOver = (e) => {
//   e.preventDefault();
//   setIsDragging(true);
// };

// const handleDragLeave = () => {
//   setIsDragging(false);
// };

// const handleDrop = (e) => {
//   e.preventDefault();
//   setIsDragging(false);
//   handleFileSelect(e.dataTransfer.files[0]);
// };


// /*===================================*/



//   useEffect(() => {
//     if (!savedRefId) return;

//     console.log("savedRefId:", savedRefId);
//     console.log("financial_year:", financial_year);

//     // fetchFiles(savedRefId);
//   }, [savedRefId, financial_year, ]);

//   /* ---------------- HANDLERS (PLACEHOLDER) ---------------- */
//   // const handleUpload = async () => {
//   //   // keep your existing upload logic here
//   //   setShowModal(true);
//   // };



//   const handleUpload = async (e) => {
//   e.preventDefault();
//   if (!file) return;

//   const categoryToUse =
//     letterUploaded === 0 ? letterCategoryCode : selectedCategory;

//   const nextCount =
//     fileList.filter(f => f.categary_cd === categoryToUse).length + 1;

//   const formData = new FormData();
//   formData.append("ref_id", ref_id);
//   formData.append("financial_year", financial_year);
//   formData.append("categary_cd", categoryToUse);
//   formData.append("nextCount", nextCount);
//   formData.append("user_id", user_id);
//   formData.append("user_name", user_name);
//   formData.append("file", file);

//   try {
//     await axios.post(
//       "http://localhost:3080/api/post-files",
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     setFile(null);
//     setPreviewURL(null);
//     setFileSize(null);
//     fileInputRef.current.value = "";

//     setShowModal(true);
//     await fetchCategories();
//     fetchFiles();

//   } catch (err) {
//     console.error("Upload failed:", err);
//   }
// };

//   /* ========================delete================================ */
//   const deleteFile = async (sno) => {
//     // keep your existing delete logic here
//     console.log("delete sno:", sno);
//   };

//   /* ======================================================== */

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* HEADER */}
//       <Card
//         sx={{
//           mb: 4,
//           background: "linear-gradient(135deg,#667eea,#764ba2)",
//           color: "#fff",
//           borderRadius: 3,
//         }}
//       >
//         <CardContent>
//           <Box display="flex" alignItems="center" gap={2}>
//             <FaFolder size={32} />
//             <Box>
//               <Typography variant="h5" fontWeight="bold">
//                 File Management
//               </Typography>
//               <Typography variant="body2" opacity={0.8}>
//                 Upload and manage your documents
//               </Typography>
//             </Box>
//           </Box>

//           <Box mt={3} display="flex" gap={3}>
//             <Paper sx={{ p: 2, flex: 1 }}>
//               <Typography variant="caption">Reference ID</Typography>
//               <Typography fontWeight="bold">{savedRefId}</Typography>
//             </Paper>

//             <Paper sx={{ p: 2 }}>
//               <Typography variant="caption">Financial Year</Typography>
//               <Typography fontWeight="bold">{financial_year}</Typography>
//             </Paper>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* UPLOAD */}
//       <Card sx={{ mb: 4, borderRadius: 3 }}>
//         <CardContent>
//           <Box textAlign="center" mb={3}>
//             <FaUpload size={26} />
//             <Typography variant="h6" fontWeight="bold">
//               Upload Initial Letter
//             </Typography>
//           </Box>

//           <Box display="flex" gap={3} mb={3}>
//             <TextField label="Category" value="Letter" disabled fullWidth />
//             <TextField
//               label="File Name"
//               value={linkName}
//               onChange={(e) => setLinkName(e.target.value)}
//               fullWidth
//             />
//           </Box>

//           <Button
//             fullWidth
//             variant="contained"
//             size="large"
//             sx={{ mb: 3 }}
//             onClick={() => fileInputRef.current.click()}
//           >
//             Browse
//           </Button>
//  {/* <input
//             type="file"
//             hidden
//             ref={fileInputRef}
//             onChange={(e) => {
//               const f = e.target.files[0];
//               if (!f) return;
//               setFile(f);
//               setPreviewURL(URL.createObjectURL(f));
//               setPreviewType(f.type);
//             }}
//           />  */}

//           <input
//   type="file"
//   hidden
//   ref={fileInputRef}
//   onChange={(e) => handleFileSelect(e.target.files[0])}
// /> 


// <Paper
//   onClick={() => fileInputRef.current.click()}
//   onDragOver={handleDragOver}
//   onDragLeave={handleDragLeave}
//   onDrop={handleDrop}
//   sx={{
//     height: 240,
//     border: "2px dashed",
//     borderColor: file
//       ? "success.main"
//       : isDragging
//       ? "primary.main"
//       : "#ccc",
//     backgroundColor: file
//       ? "rgba(46,125,50,0.08)"
//       : isDragging
//       ? "rgba(25,118,210,0.08)"
//       : "transparent",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//   }}
// >
//   <Box textAlign="center">
//     {!file && (
//       <>
//         <FaUpload size={40} />
//         <Typography fontWeight="bold">
//           Drag & Drop file here
//         </Typography>
//         <Typography variant="caption">
//           or click to browse
//         </Typography>
//       </>
//     )}

//     {file && (
//       <>
//         {filePreviewUrl ? (
//           <img
//             src={filePreviewUrl}
//             alt="preview"
//             style={{
//               maxHeight: 120,
//               marginBottom: 8,
//               borderRadius: 6,
//             }}
//           />
//         ) : (
//           <FaFileAlt size={40} color="green" />
//         )}

//         <Typography fontWeight="bold">{file.name}</Typography>
//         <Typography variant="caption">
//           {(file.size / 1024 / 1024).toFixed(2)} MB
//         </Typography>
//       </>
//     )}



//   </Box>
// </Paper>


//           <Box textAlign="center" mt={3}>
//             <Button
//               variant="contained"
//               size="large"
//               disabled={!file || !linkName}
//               onClick={handleUpload}
//             >
//               Upload
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* FILE TABLE */}
//       <Paper>
//         <Typography sx={{ p: 2, background: "#222", color: "#fff" }}>
//           Uploaded Files
//         </Typography>

//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>S.No</TableCell>
//               <TableCell>File Name</TableCell>
//               <TableCell>Size</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {fileList.map((f, i) => (
//               <TableRow key={f.sno}>
//                 <TableCell>{i + 1}</TableCell>
//                 <TableCell>{f.link_name}</TableCell>
//                 <TableCell>
//                   {(f.file_size_in_bytes / 1024 / 1024).toFixed(2)} MB
//                 </TableCell>
//                 <TableCell>{f.content_type}</TableCell>
//                 <TableCell>
//                   <Button
//                     color="success"
//                     href={`http://localhost:3080/${f.file_path}`}
//                     target="_blank"
//                   >
//                     <FaDownload />
//                   </Button>
//                   <Button color="error" onClick={() => deleteFile(f.sno)}>
//                     <FaTrash />
//                   </Button>
//                   <Button
//                     color="warning"
//                     onClick={() => {
//                       setFileToReplaceSno(f.sno);
//                       editFileInputRef.current.click();
//                     }}
//                   >
//                     <FaPencilAlt />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {fileList.length === 0 && (
//           <Typography textAlign="center" py={3} color="text.secondary">
//             No files uploaded.
//           </Typography>
//         )}
//       </Paper>

//       {/* SUCCESS MODAL */}
//       <Dialog open={showModal} onClose={() => setShowModal(false)}>
//         <DialogTitle>
//           <FaCheckCircle color="green" /> Success
//         </DialogTitle>
//         <DialogContent>
//           <Typography>File Uploaded Successfully!</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setShowModal(false)}>Continue</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default ClientFileUpload;

// // ========================================================



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

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    if (!ref_id || !financial_year) return;

    try {
      const res = await axios.get(
        "http://localhost:3080/api/upload-categories",
        {
          params: { ref_id, financial_year },
        }
      );

      const data = res.data.data || [];
      setCategories(data);

      const letter = data.find((c) =>
        c.cat_name.toLowerCase().includes("letter")
      );
      if (letter) {
        setLetterCategoryCode(letter.cat_cd);

        // Check if letter has been uploaded
        const check = await axios.get(
          `http://localhost:3080/api/files/${ref_id}/${financial_year}/${letter.cat_cd}`
        );
        const uploadedCount = check?.data.data.length || 0;
        setLetterUploaded(uploadedCount);

        // Set initial selected category after checking upload status
        if (uploadedCount > 0 && data.length > 0) {
          // If letter is uploaded, select the first *other* category (or the first one if all are "matter")
          const firstOtherCategory = data.find(c => c.cat_cd !== letter.cat_cd);
          setSelectedCategory(firstOtherCategory ? firstOtherCategory.cat_cd : data[0].cat_cd);
        } else if (uploadedCount === 0) {
          // If letter is not uploaded, set the selection to letter code
          setSelectedCategory(letter.cat_cd);
        }

      }
      
      const matter = data.find((c) =>
        c.cat_name.toLowerCase().includes("matter")
      );
      if (matter) setMatterCategoryCode(matter.cat_cd);


    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ---------------- FETCH FILES ----------------
  const fetchFiles = async () => {
    // Only fetch files for the selected category
    if (!selectedCategory) return;

    try {
      const res = await axios.get(
        `http://localhost:3080/api/files/${ref_id}/${financial_year}/${selectedCategory}`
      );
      setFileList(res.data.data || []);
    } catch (err) {
      console.error("Fetch files error:", err);
    }
  };

  useEffect(() => {
    // Re-fetch files whenever selectedCategory changes
    fetchFiles();
  }, [selectedCategory, letterUploaded]);



    const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      
      if (selected) {
        setPreviewURL(URL.createObjectURL(selected));
        setPreviewType(selected.type);
      }
      // Auto-generate next file name
      setLinkName(generateNextFileName(letterUploaded === 0 ? letterCategoryCode : selectedCategory)); 
      setFileSize((selected.size / (1024 * 1024)).toFixed(2));
    }
  };


  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    // Save file 
    setFile(selected);

    // Preview
    setPreviewURL(URL.createObjectURL(selected));
    setPreviewType(selected.type);

    // File size in MB
    // setFileSize((selected.size / (1024 * 1024)).toFixed(2));

    // Auto-generate next file name based on current context
    setLinkName(generateNextFileName(letterUploaded === 0 ? letterCategoryCode : selectedCategory));

  };


  // ⬅️ CORRECTED EDIT LOGIC: Triggered by file selection from the hidden input
  const handleEditFileChange = async (e) => {
    const newFile = e.target.files[0];

    // Ensure we have a file and a record to replace
    if (!newFile || !fileToReplaceSno) {
      // Reset the hidden input value to allow the same file to be selected again
      if (editFileInputRef.current) editFileInputRef.current.value = ""; 
      return;
    }

    // console.log("dekhon",fileList);
    // Find the original file data to get its link_name for the update payload
    const originalFile = fileList.find(f => f.sno === fileToReplaceSno);

    if (!originalFile) {
        console.error("Original file data not found for SNO:", fileToReplaceSno);
        if (editFileInputRef.current) editFileInputRef.current.value = "";
        return;
    }
console.log(originalFile.linkName)
    try {
      const formData = new FormData();

      // REQUIRED FIELDS for the backend API to identify and log the update
      formData.append("ref_id", ref_id); // Use ref_id from component state
      formData.append("financial_year", financial_year); // Use financial_year from component state
      formData.append("sno", fileToReplaceSno); // The SNO of the record to update
      formData.append("link_name", originalFile.link_name); // The existing link_name
      formData.append("user_id", user_id);
      formData.append("user_name", user_name);

      // THE NEW FILE
      formData.append("file", newFile);

      const res = await axios.put(
        "http://localhost:3080/api/files",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status === 1) {
        alert("File updated successfully!");
        fetchFiles(); // Refresh the file list
      } else {
        alert(res.data.message || "Failed to update file.");
      }

    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating file.");
    } finally {
      // Reset the file-specific states after the attempt
      setFileToReplaceSno(null);
      if (editFileInputRef.current) editFileInputRef.current.value = "";
    }
  };

  // ---------------- Auto File Name ----------------
  const generateNextFileName = (cat_cd) => {
    // Filter fileList by the category code that the *new* file will be uploaded to
    const filesInCurrentCat = fileList.filter(f => f.categary_cd === cat_cd);
    const count = filesInCurrentCat.length + 1;

    // Use a category name prefix for better naming (optional, but good practice)
    const categoryName = categories.find(c => c.cat_cd === cat_cd)?.cat_name || 'DOC';

    return `${ref_id}_${categoryName.toUpperCase()}_${count}`;
  };

  // ---------------- UI Handlers ----------------
  const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value);
      setFile(null); // Clear file and link name when category changes
      setLinkName("");
      setPreviewURL(null);
      setPreviewType("");
      setFileSize(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // Determine the current file/link state to display in the input fields
  const currentFile = file;
  const currentLinkName = linkName;
  const currentFileInputRef = fileInputRef;

  // ⬅️ NEW FUNCTION to trigger the edit process
  const startEditProcess = (sno) => {
    setFileToReplaceSno(sno);
    editFileInputRef.current.click(); // This will trigger the file selection dialog
  };

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
  formData.append("linkName",linkName);

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

// // ========================================================
