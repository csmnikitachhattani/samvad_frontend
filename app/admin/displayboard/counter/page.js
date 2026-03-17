
// "use client";

// import React, { useEffect, useState, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
//   Button,
//   CircularProgress,
//   Pagination,
//   Chip,
//   TextField,
//   InputAdornment,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
  
// } from "@mui/material";

// import VisibilityIcon from "@mui/icons-material/Visibility";
// import SearchIcon from "@mui/icons-material/Search";
// import { Alert } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { data } from "react-router-dom";

// const theme = createTheme({
//   typography: {
//     fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
//   },
// });

// const DisplayBoardAvakList = () => {
//   const router = useRouter();

//   const [avaks, setAvaks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [openModal, setOpenModal] = useState(false);
// const [modalMessage, setModalMessage] = useState("");
// const [avakFiles, setAvakFiles] = useState([]);

//   const recordsPerPage = 10;

//   useEffect(() => {
//     fetchAvakList();
//   }, []);

//   const fetchAvakList = async () => {
//     try {
//       const res = await axios.get(
//         "http://103.79.34.50:8083/api/Client/avak-list",
//         {
//           params: {
//             finYear: "2024-2025",
//             userId: "00100",
//             dataType: "AvakList",
//           },
//         }
//       );

//       setAvaks(res.data || []);
//       console.log("API Response:", res.data);
//     } catch (err) {
//       console.error("AVAK List Error:", err);
//       setAvaks([]);
//     } finally {
//       setLoading(false);
//     }
//   };



//   const [openFilesModal, setOpenFilesModal] = useState(false);
//   const [filesData, setFilesData] = useState([]);
//   const [filesLoading, setFilesLoading] = useState(false);
  
//   useEffect(() => {
//    fetchFiles("2024000004");
//   }, []);
//  // FETCH ATTACHMENTS
//   const handleViewFiles = async (financial_year,avak_ref_id ,categary_cd: "07") => {
//     try {
//       const params = {
//      financial_year: "2024-2025",
//         categary_cd: "07",
//         avak_ref_id: avak_ref_id,
//       };

//       const res = await axios.get(
//         "http://103.79.34.50:8083/api/Client/getavakfiles",
//         { params }
//       );

//       setAvakFiles(res?.data?.data || []);
//       setFilesModal(true);
//     } catch (err) {
//       console.error("File fetch error", err);
//       setAvakFiles([]);
//     }
//   };
//   // Filter records
//   const filtered = useMemo(() => {
//     return avaks.filter((row) =>
//       `${row.subject || ""} ${row.client_name || ""} ${row.avak_ref_id || ""}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//   }, [avaks, search]);

//   // Pagination
//   const indexOfLast = currentPage * recordsPerPage;
//   const indexOfFirst = indexOfLast - recordsPerPage;
//   const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / recordsPerPage);

  

//   const handleSelect = (avakRefId, category) => {

//   switch (category) {

//     case "07":
//       router.push(`/admin/displayboard/counter/${avakRefId}`);
//       break;

//     case "09":
//       router.push(`/admin/LedVehicle/counter/${avakRefId}`);
//       break;

//     default:
//       setModalMessage("This category is not allowed.");
//       setOpenModal(true);
//       break;
//   }

// };

//   const colHead = {
//     fontWeight: 700,
//     fontSize: "0.7rem",
//     letterSpacing: "0.08em",
//     textTransform: "uppercase",
//     color: "#374151",
//     py: 1.4,
//     px: 2,
//     borderBottom: "2px solid #E5E7EB",
//     bgcolor: "#F8FAFC",
//   };

//   const colCell = {
//     fontSize: "0.83rem",
//     color: "#1F2937",
//     py: 1.3,
//     px: 2,
//     borderBottom: "1px solid #F1F5F9",
//   };

//   return (
//     <ThemeProvider theme={theme}>

//       {/* HEADER */}
//       <Box sx={{ mb: 3 }}>
//         <Dialog
//   open={openModal}
//   onClose={() => setOpenModal(false)}
//   maxWidth="xs"
//   fullWidth
// >
//   <DialogTitle sx={{ color: "#DC2626", fontWeight: 700 }}>
//     Error
//   </DialogTitle>

//   <DialogContent>
//     <Typography>
//       {modalMessage}
//     </Typography>
//   </DialogContent>

//   <DialogActions>
//     <Button
//       onClick={() => setOpenModal(false)}
//       variant="contained"
//       sx={{
//         backgroundColor: "#DC2626",
//         "&:hover": { backgroundColor: "#B91C1C" }
//       }}
//     >
//       OK
//     </Button>
//   </DialogActions>
// </Dialog>
//      <Box
//           sx={{
//             height: 3,
//             width: 48,
//             background: "linear-gradient(90deg,#1D4ED8,#60A5FA)",
//             borderRadius: 2,
//             mb: 2,
//           }}
//         />

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//           }}
//         >
//           <Typography
//             sx={{
//               fontWeight: 700,
//               fontSize: "1.6rem",
//               color: "#0F172A",
//             }}
//           >
//             AVAK Records
//           </Typography>

//           <Chip
//             label={`${filtered.length} Records`}
//             sx={{
//               fontWeight: 600,
//               bgcolor: "#EFF6FF",
//               color: "#1D4ED8",
//             }}
//           />
//         </Box>
//       </Box>

//       {/* SEARCH */}
//       <Box sx={{ mb: 2 }}>
//         <TextField
//           placeholder="Search subject, client, ref..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           size="small"
//           sx={{
//             width: 340,
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "9px",
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: "#94A3B8" }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {/* TABLE */}
//       <Box
//         sx={{
//           bgcolor: "#fff",
//           borderRadius: "14px",
//           border: "1px solid #E2E8F0",
//           overflow: "hidden",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//         }}
//       >
//         {loading && (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress size={20} />
//           </Box>
//         )}

//         <TableContainer>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {[
//                   "SN",
//                   "Avak Ref",
//                   "Attachemets",
//                   "Letter No",
//                   "Subject",
//                   "Client Name",
//                   "Received Date",
//                   "Letter Type",
//                   "Receiving Mode",
//                   "Tender Amt",
//                   "Category",
//                   "Action",
//                 ].map((col) => (
//                   <TableCell key={col} sx={colHead}>
//                     {col}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {currentRecords.map((row, index) => (
//                 <TableRow key={row.avak_ref_id} hover>
//                   <TableCell sx={colCell}>
//                     {indexOfFirst + index + 1}
//                   </TableCell>

//                   <TableCell sx={colCell}>
//                     <Chip
//                       label={row.avak_ref_id}
//                       size="small"
//                       sx={{
//                         bgcolor: "#EFF6FF",
//                         color: "#1D4ED8",
//                         fontWeight: 600,
//                       }}
//                     />
//                     <Button
//                       size="small"
//                       color="primary"  fontSize="small"
//                       startIcon={<VisibilityIcon fontSize="small" />}
//                       onClick={() =>
//                         handleViewFiles(row.ref_Id, row.financial_Year)
//                       }
//                     >
//                       Files
//                     </Button>
//                   </TableCell>
                  

//                   <TableCell sx={colCell}>{row.upload_doc_path}</TableCell>
//                   <TableCell sx={colCell}>{row.letter_no}</TableCell>
//                   <TableCell sx={colCell}>{row.subject}</TableCell>
//                   <TableCell sx={colCell}>{row.client_name}</TableCell>
//                   <TableCell sx={colCell}>{row.received_date}</TableCell>
//                   <TableCell sx={colCell}>{row.letter_type}</TableCell>
//                   <TableCell sx={colCell}>{row.receiving_mode}</TableCell>

//                   <TableCell sx={{ ...colCell, fontWeight: 700 }}>
//                     Rs.{row.tender_amt} /-
//                   </TableCell>

//                   {/* <TableCell sx={colCell}>{row.cat_text}

//                   </TableCell> */}
//                   <TableCell sx={colCell}>
//   {row.cat_text}

//   <input
//     type="hidden"
//     value={row.Avak_category}
//     name="Avak_category"
//   />
// </TableCell>

//                   <TableCell sx={colCell}>
//                     <Button
//                       size="small"
//                       sx={{
//                         background:
//                           "linear-gradient(135deg,#1D4ED8,#3B82F6)",
//                         color: "#fff",
//                         textTransform: "none",
//                         borderRadius: "6px",
//                         px: 2,
//                       }}
//                       onClick={() => handleSelect(row.avak_ref_id,row.Avak_category)}
//                     >
//                       Go
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* PAGINATION */}
//         {totalPages > 1 && (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               px: 3,
//               py: 2,
//               borderTop: "1px solid #F1F5F9",
//             }}
//           >
//             <Typography fontSize="0.8rem">
//               Showing {indexOfFirst + 1}-
//               {Math.min(indexOfLast, filtered.length)} of{" "}
//               {filtered.length}
//             </Typography>

//             <Pagination
//               count={totalPages}
//               page={currentPage}
//               onChange={(e, v) => setCurrentPage(v)}
//               size="small"
//             />
//           </Box>
//         )}
//       </Box>

// {/* ================================test============ */}
// <Dialog
//   open={openFilesModal}
//   onClose={() => setOpenFilesModal(false)}

//   fullWidth
//   size="small"
// >
//   {/* Header with Close Button */}
//   <DialogTitle
//     sx={{
//       fontWeight: "bold",
//       color: "error.main",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     }}
//   >
//     View Attachments

//     <Button
//       variant="outlined"
//       color="error"
//       size="small"
//       onClick={() => setOpenFilesModal(false)}
//       sx={{ textTransform: "none", fontWeight: 600 }}
//     >
//       Close
//     </Button>
//   </DialogTitle>

//   <DialogContent dividers sx={{ height: 450 }}>
//     {filesLoading ? (
//       <Box
//         sx={{
//           // display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100%",
//         }}
//       >
//         <CircularProgress color="error" />
//       </Box>
//     ) : filesData.length === 0 ? (
//       <Typography align="center">No files found</Typography>
//     ) : (
//       Object.entries(groupedFiles).map(([category, files]) => (
//         <Box key={category} mb={3}>
//           {/* Category Title */}
//           <Typography
//             variant=""
//             sx={{ mb: 1, color: "#1976d2", fontWeight: 600 }}
//           >
//             {category}
//           </Typography>

//           <Grid container spacing={2}>
//             {files.map((file, index) => {
//               const fileUrl = `${BASE_FILE_URL}/${file.link_name}`;
//               const isImage = file.content_type?.startsWith("image");
//               const isPdf = file.content_type === "application/pdf";

//               return (
//                 <Grid item xs={6} md={3} key={index}>
//                   <Box
//                     sx={{
//                       border: "1px solid #e0e0e0",
//                       borderRadius: 2,
//                       p: 1,
//                       height: 150,
//                       display: "flex",
//                       alignItems: "center",      // Vertical center
//                       justifyContent: "center",  // Horizontal center
//                       backgroundColor: "#fafafa",
//                       cursor: "pointer",
//                       textAlign: "center",
//                     }}
//                     onClick={() => window.open(fileUrl, "_blank")}
//                   >
//                     {isImage ? (
//                       <Box
//                         sx={{
//                           width: "100%",
//                           height: "100%",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <img
//                           src={fileUrl}
//                           alt={file.link_name}
//                           style={{
//                             maxWidth: "100%",
//                             maxHeight: "120px",
//                             objectFit: "contain",
//                             borderRadius: "6px",
//                           }}
//                         />
//                       </Box>
//                     ) : isPdf ? (
//                       <Box>
//                         <PictureAsPdfIcon
//                           sx={{ fontSize: 50, color: "red" }}
//                         />
//                         <Typography variant="caption" display="block">
//                           PDF File
//                         </Typography>
//                       </Box>
//                     ) : (
//                       <Box>
//                         <InsertDriveFileIcon
//                           sx={{ fontSize: 50, color: "#607d8b" }}
//                         />
//                         <Typography >
//                           File
//                         </Typography>
//                       </Box>
//                     )}
//                   </Box>

//                   {/* File Size */}
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       display: "block",
//                       mt: 0.5,
//                       textAlign: "center",
//                     }}
//                   >
//                     {(file.file_size_in_bytes / (1024 * 1024)).toFixed(2)} MB
//                   </Typography>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </Box>
//       ))
//     )}
//   </DialogContent>
// </Dialog>



//     </ThemeProvider>
//   );
// };

// export default DisplayBoardAvakList;





"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
  CircularProgress,
  Pagination,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
  },
});

const BASE_FILE_URL = "http://103.79.34.50:8083";

const DisplayBoardAvakList = () => {
  const router = useRouter();

  const [avaks, setAvaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [openFilesModal, setOpenFilesModal] = useState(false);
  const [filesData, setFilesData] = useState([]);
  const [filesLoading, setFilesLoading] = useState(false);

  const recordsPerPage = 10;

  useEffect(() => {
    fetchAvakList();
  }, []);

  // FETCH AVAK LIST
  const fetchAvakList = async () => {
    try {
      const res = await axios.get(
        "http://103.79.34.50:8083/api/Client/avak-list",
        {
          params: {
            finYear: "2024-2025",
            userId: "00100",
            dataType: "AvakList",
          },
        }
      );

      setAvaks(res.data || []);
    } catch (err) {
      console.error("AVAK List Error:", err);
      setAvaks([]);
    } finally {
      setLoading(false);
    }
  };

  // FETCH FILES
  const handleViewFiles = async (financial_year, avak_ref_id) => {
    try {
      setFilesLoading(true);

      const params = {
        financial_year :"2024-2025" ||financial_year,
        categary_cd: "07",
        avak_ref_id: avak_ref_id,
      };

      const res = await axios.get(
        "http://103.79.34.50:8083/api/Client/getavakfiles",
        { params }
      );

      setFilesData(res.data || []);
      setOpenFilesModal(true);

    } catch (err) {
      console.error("File fetch error", err);
      setFilesData([]);
    } finally {
      setFilesLoading(false);
    }
  };

  // GROUP FILES
  const groupedFiles = useMemo(() => {
    return filesData.reduce((acc, file) => {
      const category = file.category_name || "Other Files";
      if (!acc[category]) acc[category] = [];
      acc[category].push(file);
      return acc;
    }, {});
  }, [filesData]);

  // FILTER SEARCH
  const filtered = useMemo(() => {
    return avaks.filter((row) =>
      `${row.subject || ""} ${row.client_name || ""} ${row.avak_ref_id || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [avaks, search]);

  // PAGINATION
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  // CATEGORY NAVIGATION
  const handleSelect = (avakRefId, category) => {
    switch (category) {
      case "07":
        router.push(`/admin/displayboard/counter/${avakRefId}`);
        break;

      case "09":
        router.push(`/admin/LedVehicle/counter/${avakRefId}`);
        break;

      default:
        setModalMessage("This category is not allowed.");
        setOpenModal(true);
        break;
    }
  };

  const colHead = {
    fontWeight: 700,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    color: "#374151",
    bgcolor: "#F8FAFC",
  };

  const colCell = {
    fontSize: "0.83rem",
    color: "#1F2937",
  };

  return (
    <ThemeProvider theme={theme}>

      {/* HEADER */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "1.6rem" }}>
          AVAK Records
        </Typography>

        <Chip
          label={`${filtered.length} Records`}
          sx={{ bgcolor: "#EFF6FF", color: "#1D4ED8", mt: 1 }}
        />
      </Box>

      {/* SEARCH */}
      <Box sx={{ mb: 2 }}>
        <TextField
          placeholder="Search subject, client, ref..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ width: 340 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* TABLE */}
      <Box sx={{ bgcolor: "#fff", borderRadius: "14px" }}>
        {loading && (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress size={20} />
          </Box>
        )}

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "SN",
                  "Avak Ref",
                  "Letter No",
                  "Subject",
                  "Client Name",
                  "Received Date",
                  "Tender Amt",
                  "Category",
                  "Action",
                ].map((col) => (
                  <TableCell key={col} sx={colHead}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {currentRecords.map((row, index) => (
                <TableRow key={row.avak_ref_id} hover>

                  <TableCell sx={colCell}>
                    {indexOfFirst + index + 1}
                  </TableCell>

                  <TableCell sx={colCell}>
                    <Chip
                      label={row.avak_ref_id}
                      size="small"
                      sx={{ bgcolor: "#EFF6FF", color: "#1D4ED8" }}
                    />

                    <Button
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() =>
                        handleViewFiles(row.financial_Year, row.avak_ref_id)
                      }
                    >
                      Files
                    </Button>
                  </TableCell>

                  <TableCell sx={colCell}>{row.letter_no}</TableCell>
                  <TableCell sx={colCell}>{row.subject}</TableCell>
                  <TableCell sx={colCell}>{row.client_name}</TableCell>
                  <TableCell sx={colCell}>{row.received_date}</TableCell>

                  <TableCell sx={{ ...colCell, fontWeight: 700 }}>
                    Rs.{row.tender_amt}
                  </TableCell>

                  <TableCell sx={colCell}>{row.cat_text}</TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      sx={{
                        background:
                          "linear-gradient(135deg,#1D4ED8,#3B82F6)",
                        color: "#fff",
                      }}
                      onClick={() =>
                        handleSelect(row.avak_ref_id, row.Avak_category)
                      }
                    >
                      Go
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography fontSize="0.8rem">
              Showing {indexOfFirst + 1} -{" "}
              {Math.min(indexOfLast, filtered.length)} of {filtered.length}
            </Typography>

            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, v) => setCurrentPage(v)}
              size="small"
            />
          </Box>
        )}
      </Box>

      {/* FILES MODAL */}
      {/* <Dialog
        open={openFilesModal}
        onClose={() => setOpenFilesModal(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>View Attachments</DialogTitle>

        <DialogContent dividers>

          {filesLoading ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          ) : filesData.length === 0 ? (
            <Typography align="center">No files found</Typography>
          ) : (
            Object.entries(groupedFiles).map(([category, files]) => (
              <Box key={category} mb={3}>

                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  {category}
                </Typography>

                <Grid container spacing={2}>
                  {files.map((file, index) => {

                    const fileUrl = `${BASE_FILE_URL}/${file.link_name}`;
                    const isImage = file.content_type?.startsWith("image");
                    const isPdf = file.content_type === "application/pdf";

                    return (
                      <Grid item xs={6} md={3} key={index}>

                        <Box
                          sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 2,
                            p: 1,
                            height: 150,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => window.open(fileUrl, "_blank")}
                        >

                          {isImage ? (
                            <img
                              src={fileUrl}
                              alt={file.link_name}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "120px",
                              }}
                            />
                          ) : isPdf ? (
                            <PictureAsPdfIcon
                              sx={{ fontSize: 50, color: "red" }}
                            />
                          ) : (
                            <InsertDriveFileIcon
                              sx={{ fontSize: 50 }}
                            />
                          )}

                        </Box>

                        <Typography
                          variant="caption"
                          display="block"
                          align="center"
                        >
                          {(file.file_size_in_bytes / (1024 * 1024)).toFixed(2)} MB
                        </Typography>

                      </Grid>
                    );
                  })}
                </Grid>

              </Box>
            ))
          )}

        </DialogContent>
      </Dialog> */}


      <Dialog
  open={openFilesModal}
  onClose={() => setOpenFilesModal(false)}
  fullWidth
  maxWidth="md"
>
  <DialogTitle
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    View Attachments

    {/* <IconButton
      onClick={() => setOpenFilesModal(false)}
      size="small"
    >
      <CloseIcon />
    </IconButton> */}
   <IconButton
         onClick={() => setOpenFilesModal(false)}
         size="small"
         sx={{
           background: "#ab0000",
           color:"white",
           "&:hover": { background: "#931d1d" },
         }}
       >
         <CloseIcon />
       </IconButton>
  </DialogTitle>

  <DialogContent dividers>
    {filesLoading ? (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    ) : filesData.length === 0 ? (
      <Typography align="center">No files found</Typography>
    ) : (
      Object.entries(groupedFiles).map(([category, files]) => (
        <Box key={category} mb={3}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>
            {category}
          </Typography>

          <Grid container spacing={2}>
            {files.map((file, index) => {
              const fileUrl = `${BASE_FILE_URL}/${file.link_name}`;
              const isImage = file.content_type?.startsWith("image");
              const isPdf = file.content_type === "application/pdf";

              return (
                <Grid item xs={6} md={3} key={index}>
                  <Box
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      p: 1,
                      height: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => window.open(fileUrl, "_blank")}
                  >
                    {isImage ? (
                      <img
                        src={fileUrl}
                        alt={file.link_name}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "120px",
                        }}
                      />
                    ) : isPdf ? (
                      <PictureAsPdfIcon
                        sx={{ fontSize: 50, color: "red" }}
                      />
                    ) : (
                      <InsertDriveFileIcon
                        sx={{ fontSize: 50 }}
                      />
                    )}
                  </Box>

                  <Typography
                    variant="caption"
                    display="block"
                    align="center"
                  >
                    {(file.file_size_in_bytes / (1024 * 1024)).toFixed(2)} MB
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))
    )}
  </DialogContent>
</Dialog>

    </ThemeProvider>
  );
};

export default DisplayBoardAvakList;