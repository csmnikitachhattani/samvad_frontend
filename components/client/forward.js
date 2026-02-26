


// // "use client";

// // import React, { useEffect, useState, useMemo } from "react";
// // import axios from "axios";
// // import { useRouter, useSearchParams } from "next/navigation";

// // import {
// //   Container,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableRow,
// //   TableContainer,
// //   Paper,
// //   Button,
// //   Checkbox,
// //   CircularProgress,
// //   Stack,
// //   Pagination,
// //   Chip,
// //   TextField,
// //   Toolbar,
// //   IconButton,
// //   Tooltip,
// // } from "@mui/material";

// // import DownloadIcon from "@mui/icons-material/Download";
// // import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// // import TableViewIcon from "@mui/icons-material/TableView";
// // import FileDownloadIcon from "@mui/icons-material/FileDownload";

// // const ForwardTo = () => {
// //   const router = useRouter(); // ✅ instead of useNavigate
// //   const searchParams = useSearchParams(); // ✅ instead of useLocation

// //   const actionType = searchParams.get("action") || "get";

// //   const [data, setData] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [loading, setLoading] = useState(false);

// //   const recordsPerPage = 10;

// //   const { financial_year, user_id, user_name } = useMemo(
// //     () => ({
// //       financial_year: localStorage.getItem("financial_year") || "",
// //       user_id: localStorage.getItem("user_id") || "",
// //       user_name: localStorage.getItem("user_name") || "",
// //     }),
// //     []
// //   );

// //   const formatDate = (dateString) => {
// //     if (!dateString) return "-";
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString("en-CA");
// //   };

// //   // ================= FETCH DATA =================
// //   const fetchData = async () => {
// //     if (!financial_year || !user_id) return;

// //     try {
// //       setLoading(true);

// //       const res = await axios.get(
// //         "http://103.79.34.50:8083/api/Client/getclientadvtrequests",
// //         {
// //           params: {
// //             financial_year,
// //             user_id,
// //             user_name,
// //             action: "get_not_forwarded",
// //             category: "02",
// //           },
// //         }
// //       );

// //       const responseData =
// //         res.data?.data ||
// //         res.data?.result ||
// //         (Array.isArray(res.data) ? res.data : []);

// //       setData(responseData || []);

// //       setCurrentPage(1);
// //     } catch (err) {
// //       console.error("Fetch Error:", err);
// //       setData([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [actionType, financial_year, user_id, user_name]);

// //   // ================= EDIT =================
// //   const handleEdit = async (ref_Id) => {
// //     try {
// //       const response = await axios.get(
// //         `http://localhost:3080/api/get-client-advt-request/${ref_Id}`,
// //         {
// //           params: {
// //             financial_year,
// //             user_id,
// //             user_name,
// //             action: "get_by_id",
// //           },
// //         }
// //       );

// //       const rowData =
// //         response.data?.data ||
// //         response.data?.result ||
// //         response.data;

// //       navigate(`/newrequest`, {
// //         state: { action: "update", rowData },
// //       });
// //     } catch (error) {
// //       console.error("Edit Error:", error);
// //       alert("Failed to fetch record details");
// //     }
// //   };

// //   // ================= DELETE =================
// //   const handleDelete = async (ref_Id) => {
// //     if (!window.confirm(`Delete Ref ID ${ref_Id}?`)) return;

// //     try {
// //       const res = await axios.delete(
// //         `http://localhost:3080/api/client-advt-request/${ref_Id}`,
// //         {
// //           data: {
// //             ref_Id,
// //             financial_year,
// //             user_id,
// //             user_name,
// //             action: "delete",
// //           },
// //         }
// //       );

// //       const status = res.data?.status ?? res.data?.success;

// //       if (status === 1 || status === true) {
// //         setData((prev) => prev.filter((row) => row.ref_Id !== ref_Id));
// //         alert(`Deleted successfully (Ref ID: ${ref_Id})`);
// //       } else {
// //         alert(res.data?.message || "Delete failed");
// //       }
// //     } catch (err) {
// //       console.error("Delete Error:", err);
// //       alert("Server error while deleting");
// //     }
// //   };

// //   // ================= SEARCH FILTER (NO API CHANGE) =================
// //   const filteredData = useMemo(() => {
// //     return data.filter((row) =>
// //       `${row.ref_Id} ${row.subject} ${row.letter_No}`
// //         .toLowerCase()
// //         .includes(search.toLowerCase())
// //     );
// //   }, [data, search]);

// //   // ================= PAGINATION =================
// //   const indexOfLastRecord = currentPage * recordsPerPage;
// //   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
// //   const currentRecords = filteredData.slice(
// //     indexOfFirstRecord,
// //     indexOfLastRecord
// //   );
// //   const totalPages = Math.ceil(filteredData.length / recordsPerPage);

// //   const getTitle = () => {
// //     switch (actionType) {
// //       case "get_all_accepted":
// //         return "Accepted to Samvad";
// //       case "get_forwarded":
// //         return "Submitted to Samvad";
// //       case "get_not_forwarded":
// //         return "Forward To Samvad";
// //       case "get_under_process":
// //         return "Under Processing Request";
// //       default:
// //         return "Requests";
// //     }
// //   };

// //   // ================= EXPORT EXCEL =================
// //   const exportToExcel = () => {
// //     const csvContent = [
// //       ["Ref ID", "Subject", "Letter No", "Category", "Tender Amt"],
// //       ...filteredData.map((row) => [
// //         row.ref_Id,
// //         row.subject,
// //         row.letter_No,
// //         row.ref_Category_Text,
// //         row.tender_Amt,
// //       ]),
// //     ]
// //       .map((e) => e.join(","))
// //       .join("\n");

// //     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
// //     const link = document.createElement("a");
// //     link.href = URL.createObjectURL(blob);
// //     link.download = "requests.csv";
// //     link.click();
// //   };

// //   // ================= EXPORT PDF (Simple Print) =================
// //   const exportToPDF = () => {
// //     window.print();
// //   };

// //   // ================= STATUS CHIP =================
// //   const getStatusChip = () => {
// //     switch (actionType) {
// //       case "get_all_accepted":
// //         return <Chip label="Accepted" color="success" size="small" />;
// //       case "get_forwarded":
// //         return <Chip label="Forwarded" color="info" size="small" />;
// //       case "get_under_process":
// //         return <Chip label="Pending" color="warning" size="small" />;
// //       default:
// //         return <Chip label="Draft" size="small" />;
// //     }
// //   };

// //   return (
  
// //       <Card elevation={5} sx={{ borderRadius: 3 }}>
// //         <CardContent>
// //           {/* HEADER */}
// //           <Stack
// //             direction="row"
// //             justifyContent="space-between"
// //             alignItems="center"
// //             mb={2}
// //           >
// //             <Typography variant="h5" fontWeight="bold" color="error">
// //               {getTitle()}
// //             </Typography>
// //             {getStatusChip()}
// //           </Stack>

// //           {/* TOOLBAR */}
// //           <Toolbar
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               flexWrap: "wrap",
// //               gap: 2,
// //               p: 0,
// //               mb: 2,
// //             }}
// //           >
// //             <TextField
// //               size="small"
// //               label="Search Ref ID / Subject / Letter No"
// //               variant="outlined"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               sx={{ minWidth: 300 }}
// //             />

// //             <Stack direction="row" spacing={1}>
// //               <Tooltip title="Export Excel">
// //                 <IconButton color="success" onClick={exportToExcel}>
// //                   <TableViewIcon />
// //                 </IconButton>
// //               </Tooltip>

// //               <Tooltip title="Export PDF">
// //                 <IconButton color="error" onClick={exportToPDF}>
// //                   <PictureAsPdfIcon />
// //                 </IconButton>
// //               </Tooltip>
// //             </Stack>
// //           </Toolbar>

// //           {/* LOADER */}
// //           {loading && (
// //             <Stack alignItems="center" my={2}>
// //               <CircularProgress color="error" />
// //             </Stack>
// //           )}

// //           {/* TABLE */}
// //           <TableContainer component={Paper} elevation={3}>
// //             <Table size="small">
// //               <TableHead>
// //                 <TableRow sx={{ backgroundColor: "#f1f3f4" }}>
// //                   <TableCell><b>Ref ID</b></TableCell>
// //                   <TableCell><b>Subject</b></TableCell>
// //                   <TableCell><b>Letter No</b></TableCell>
// //                   <TableCell><b>Category</b></TableCell>
// //                   <TableCell><b>Letter Date</b></TableCell>
// //                   <TableCell><b>Scheduled Publish Date</b></TableCell>
// //                   <TableCell><b>Tender Amt</b></TableCell>
// //                   <TableCell align="center"><b>Attachment</b></TableCell>
// //                   <TableCell align="center"><b>Action</b></TableCell>
// //                   <TableCell align="center"><b>Forward</b></TableCell>
// //                 </TableRow>
// //               </TableHead>

// //               <TableBody>
// //                 {!loading && currentRecords.length > 0 ? (
// //                   currentRecords.map((row, index) => (
// //                     <TableRow key={row.ref_Id || index} hover>
// //                       <TableCell>
// //                         <Chip label={row.ref_Id} color="primary" size="small" />
// //                       </TableCell>
// //                       <TableCell>{row.subject || "-"}</TableCell>
// //                       <TableCell>{row.letter_No || "-"}</TableCell>
// //                       <TableCell>
// //                         <Chip
// //                           label={row.ref_Category_Text || "-"}
// //                           color="secondary"
// //                           size="small"
// //                         />
// //                       </TableCell>
// //                       <TableCell>{formatDate(row.letter_Date)}</TableCell>
// //                       <TableCell>{formatDate(row.schedule_Date)}</TableCell>
// //                       <TableCell>{row.tender_Amt || "-"}</TableCell>

// //                       {/* ATTACHMENT BUTTON */}
// //                       <TableCell align="center">
// //                         {/* <IconButton color="primary">
// //                           <FileDownloadIcon />
// //                         </IconButton> */}
// //                       </TableCell>

// //                       {/* ACTION BUTTONS */}
// //                       <TableCell align="center">
// //                         <Stack direction="row" spacing={1} justifyContent="center">
// //                           <Button
// //                             variant="contained"
// //                             color="warning"
// //                             size="small"
// //                             onClick={() => handleEdit(row.ref_Id)}
// //                           >
// //                             Edit
// //                           </Button>
// //                           <Button
// //                             variant="contained"
// //                             color="error"
// //                             size="small"
// //                             onClick={() => handleDelete(row.ref_Id)}
// //                           >
// //                             Delete
// //                           </Button>
// //                         </Stack>
// //                       </TableCell>

// //                       <TableCell align="center">
// //                         <Checkbox color="primary" />
// //                       </TableCell>
// //                     </TableRow>
// //                   ))
// //                 ) : (
// //                   <TableRow>
// //                     <TableCell colSpan={10} align="center">
// //                       {loading ? "Loading..." : "No data found"}
// //                     </TableCell>
// //                   </TableRow>
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>

// //           {/* PAGINATION */}
// //           {totalPages > 1 && (
// //             <Stack alignItems="center" mt={3}>
// //               <Pagination
// //                 count={totalPages}
// //                 page={currentPage}
// //                 onChange={(e, value) => setCurrentPage(value)}
// //                 color="primary"
// //                 shape="rounded"
// //               />
// //             </Stack>
// //           )}
// //         </CardContent>
// //       </Card>
   
// //   );
// // };

// // export default ForwardTo;




// "use client";
// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   Container,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
//   Button,
//   CircularProgress,
//   Stack,
//   Pagination,
//   Chip,
//   TextField,
//   IconButton,
//   Tooltip,
//   Box,
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import TableViewIcon from "@mui/icons-material/TableView";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import SearchIcon from "@mui/icons-material/Search";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const theme = createTheme({
//   typography: {
//     fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
//   },
//   palette: {
//     primary: { main: "#0F4C81" },
//     secondary: { main: "#E8572A" },
//   },
// });

// const ForwardTo = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const actionType = searchParams.get("action") || "get";

//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const recordsPerPage = 10;

//   const { financial_year, user_id, user_name } = useMemo(
//     () => ({
//       financial_year: localStorage.getItem("financial_year") || "",
//       user_id: localStorage.getItem("user_id") || "",
//       user_name: localStorage.getItem("user_name") || "",
//     }),
//     []
//   );

//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-CA");
//   };

//   const fetchData = async () => {
//     if (!financial_year || !user_id) return;
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         "http://103.79.34.50:8083/api/Client/getclientadvtrequests",
//         {
//           params: {
//             financial_year,
//             user_id,
//             user_name,
//             action: "get_not_forwarded",
//             category: "02",
//           },
//         }
//       );
//       const responseData =
//         res.data?.data ||
//         res.data?.result ||
//         (Array.isArray(res.data) ? res.data : []);
//       setData(responseData || []);
//       setCurrentPage(1);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [actionType, financial_year, user_id, user_name]);

//   const handleEdit = async (ref_Id) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3080/api/get-client-advt-request/${ref_Id}`,
//         { params: { financial_year, user_id, user_name, action: "get_by_id" } }
//       );
//       const rowData =
//         response.data?.data || response.data?.result || response.data;
//       navigate(`/newrequest`, { state: { action: "update", rowData } });
//     } catch (error) {
//       console.error("Edit Error:", error);
//       alert("Failed to fetch record details");
//     }
//   };

//   const handleDelete = async (ref_Id) => {
//     if (!window.confirm(`Delete Ref ID ${ref_Id}?`)) return;
//     try {
//       const res = await axios.delete(
//         `http://localhost:3080/api/client-advt-request/${ref_Id}`,
//         { data: { ref_Id, financial_year, user_id, user_name, action: "delete" } }
//       );
//       const status = res.data?.status ?? res.data?.success;
//       if (status === 1 || status === true) {
//         setData((prev) => prev.filter((row) => row.ref_Id !== ref_Id));
//         alert(`Deleted successfully (Ref ID: ${ref_Id})`);
//       } else {
//         alert(res.data?.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error("Delete Error:", err);
//       alert("Server error while deleting");
//     }
//   };

//   const filteredData = useMemo(() => {
//     return data.filter((row) =>
//       `${row.ref_Id} ${row.subject} ${row.letter_No}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//   }, [data, search]);

//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(filteredData.length / recordsPerPage);

//   const getTitle = () => {
//     switch (actionType) {
//       case "get_all_accepted": return "Accepted to Samvad";
//       case "get_forwarded": return "Submitted to Samvad";
//       case "get_not_forwarded": return "Forward To Samvad";
//       case "get_under_process": return "Under Processing Request";
//       default: return "Requests";
//     }
//   };

//   const exportToExcel = () => {
//     const csvContent = [
//       ["Ref ID", "Subject", "Letter No", "Category", "Tender Amt"],
//       ...filteredData.map((row) => [
//         row.ref_Id, row.subject, row.letter_No,
//         row.ref_Category_Text, row.tender_Amt,
//       ]),
//     ]
//       .map((e) => e.join(","))
//       .join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "requests.csv";
//     link.click();
//   };

//   const exportToPDF = () => window.print();

//   const getStatusChip = () => {
//     const chipSx = {
//       fontFamily: "'DM Sans', sans-serif",
//       fontWeight: 700,
//       fontSize: "0.7rem",
//       letterSpacing: "0.08em",
//       textTransform: "uppercase",
//       height: 26,
//       borderRadius: "4px",
//     };
//     switch (actionType) {
//       case "get_all_accepted":
//         return <Chip label="Accepted" sx={{ ...chipSx, bgcolor: "#D1FAE5", color: "#065F46" }} />;
//       case "get_forwarded":
//         return <Chip label="Forwarded" sx={{ ...chipSx, bgcolor: "#DBEAFE", color: "#1E40AF" }} />;
//       case "get_under_process":
//         return <Chip label="Processing" sx={{ ...chipSx, bgcolor: "#FEF3C7", color: "#92400E" }} />;
//       default:
//         return <Chip label="Pending" sx={{ ...chipSx, bgcolor: "#FFE4E6", color: "#9F1239" }} />;
//     }
//   };

//   const colHead = {
//     fontFamily: "'DM Sans', sans-serif",
//     fontWeight: 700,
//     fontSize: "0.7rem",
//     letterSpacing: "0.1em",
//     textTransform: "uppercase",
//     color: "#11376c",
//     py: 1.5,
//     px: 2,
//     borderBottom: "1px solid #1E293B",
//     whiteSpace: "nowrap",
//   };

//   const colCell = {
//     fontFamily: "'DM Sans', sans-serif",
//     fontSize: "0.82rem",
//     color: "#090a0a",
//     py: 1.4,
//     px: 2,
//     borderBottom: "1px solid #959393",
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <link
//         href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap"
//         rel="stylesheet"
//       />

//       {/* PAGE WRAPPER */}
//       {/* <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(160deg, #0A1628 0%, #e6e9ed 50%, #0A1628 100%)",
//           py: 4,
//           px: { xs: 2, md: 4 },
//         }}
//       > */}
//         {/* HEADER SECTION */}
//         <Box sx={{ mb: 3 }}>
//           {/* Top accent bar */}
//           <Box
//             sx={{
//               height: 3,
//               width: 60,
//               background: "linear-gradient(90deg, #E8572A, #FF8C5A)",
//               borderRadius: 2,
//               mb: 2,
//             }}
//           />

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "flex-start",
//               justifyContent: "space-between",
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//           >
//             <Box>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
//                 <Typography
//                   sx={{
//                     fontFamily: "'Space Mono', monospace",
//                     fontSize: { xs: "1.3rem", md: "1.7rem" },
//                     fontWeight: 700,
//                     color: "#1f4f80",
//                     letterSpacing: "-0.02em",
//                   }}
//                 >
//                   {getTitle()}
//                 </Typography>
//                 {getStatusChip()}
//               </Box>
//               <Typography
//                 sx={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: "0.8rem",
//                   color: "#64748B",
//                   letterSpacing: "0.05em",
//                 }}
//               >
//                 FY: {financial_year} &nbsp;·&nbsp; {filteredData.length} records
//               </Typography>
//             </Box>

//             {/* EXPORT ACTIONS */}
//             <Stack direction="row" spacing={1} alignItems="center">
//               <Tooltip title="Export CSV">
//                 <IconButton
//                   onClick={exportToExcel}
//                   sx={{
//                     bgcolor: "#1E293B",
//                     color: "#94A3B8",
//                     border: "1px solid #2D3748",
//                     borderRadius: "8px",
//                     width: 38,
//                     height: 38,
//                     "&:hover": { bgcolor: "#0F4C81", color: "#fff", borderColor: "#0F4C81" },
//                     transition: "all 0.2s",
//                   }}
//                 >
//                   <TableViewIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip title="Export PDF">
//                 <IconButton
//                   onClick={exportToPDF}
//                   sx={{
//                     bgcolor: "#1E293B",
//                     color: "#94A3B8",
//                     border: "1px solid #2D3748",
//                     borderRadius: "8px",
//                     width: 38,
//                     height: 38,
//                     "&:hover": { bgcolor: "#E8572A", color: "#fff", borderColor: "#E8572A" },
//                     transition: "all 0.2s",
//                   }}
//                 >
//                   <PictureAsPdfIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip title="Download">
//                 <IconButton
//                   sx={{
//                     bgcolor: "#1E293B",
//                     color: "#94A3B8",
//                     border: "1px solid #2D3748",
//                     borderRadius: "8px",
//                     width: 38,
//                     height: 38,
//                     "&:hover": { bgcolor: "#2D3748", color: "#fff" },
//                     transition: "all 0.2s",
//                   }}
//                 >
//                   <FileDownloadIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//             </Stack>
//           </Box>
//         </Box>

//         {/* SEARCH BAR */}
//         <Box sx={{ mb: 2.5 }}>
//           <TextField
//             placeholder="Search by Ref ID, Subject, Letter No…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             size="small"
//             InputProps={{
//               startAdornment: (
//                 <SearchIcon sx={{ color: "#475569", mr: 1, fontSize: 18 }} />
//               ),
//             }}
//             sx={{
//               width: { xs: "100%", sm: 360 },
//               "& .MuiOutlinedInput-root": {
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: "0.85rem",
//                 bgcolor: "#111827",
//                 color: "#CBD5E1",
//                 borderRadius: "8px",
//                 "& fieldset": { borderColor: "#1E293B" },
//                 "&:hover fieldset": { borderColor: "#334155" },
//                 "&.Mui-focused fieldset": { borderColor: "#0F4C81" },
//               },
//               "& input::placeholder": { color: "#475569" },
//             }}
//           />
//         </Box>

//         {/* TABLE */}
//         <Box
//           sx={{
//             bgcolor: "#ffffff",
//             borderRadius: "12px",
//             border: "1px solid #bdbdbd",
//             overflow: "hidden",
//             boxShadow: "0 8px 32px #bdbdbd",
//           }}
//         >
//           {/* Loading bar */}
//           {loading && (
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 px: 3,
//                 py: 2,
//                 borderBottom: "1px solid #bdbdbd",
//                 bgcolor: "#acadb0",
//               }}
//             >
//               {/* <CircularProgress size={16} sx={{ color: "#E8572A" }} /> */}
//               <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#c3c8cf" }}>
//                 Fetching records…
//               </Typography>
//             </Box>
//           )}

//           <TableContainer sx={{ maxHeight: "100vh" }}>
//             <Table stickyHeader size="small">
//               <TableHead>
//                 <TableRow>
//                   {[
//                     "Ref ID", "Subject", "Letter No", "Category",
//                     "Letter Date", "Scheduled Publish", "Tender Amt", "Attachment", "Actions", "Forward",
//                   ].map((col) => (
//                     <TableCell key={col} sx={{ ...colHead, bgcolor: "#d9dcdf !important" }}>
//                       {col}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {!loading && currentRecords.length > 0 ? (
//                   currentRecords.map((row, index) => (
//                     <TableRow
//                       key={row.ref_Id || index}
//                       sx={{
//                         "&:hover": { bgcolor: "#dde0e3" },
//                         "&:hover .action-btns": { opacity: 1 },
//                         transition: "background 0.15s",
//                       }}
//                     >
//                       <TableCell sx={{ ...colCell }}>
//                         <Box
//                           sx={{
//                             display: "inline-block",
//                             fontFamily: "'Space Mono', monospace",
//                             fontSize: "0.75rem",
//                             color: "#1f2327",
//                             bgcolor: "rgba(199, 199, 199, 0.08)",
//                             px: 1,
//                             py: 0.3,
//                             borderRadius: "4px",
//                             border: "1px solid rgba(96,165,250,0.15)",
//                           }}
//                         >
//                           {row.ref_Id || "-"}
//                         </Box>
//                       </TableCell>
//                       <TableCell sx={{ ...colCell, maxWidth: 180 }}>
//                         <Typography
//                           sx={{
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontSize: "0.82rem",
//                             color: "#a0a3a8",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             whiteSpace: "nowrap",
//                             maxWidth: 170,
//                           }}
//                           title={row.subject}
//                         >
//                           {row.subject || "-"}
//                         </Typography>
//                       </TableCell>
//                       <TableCell sx={colCell}>{row.letter_No || "-"}</TableCell>
//                       <TableCell sx={colCell}>
//                         <Chip
//                           label={row.ref_Category_Text || "-"}
//                           size="small"
//                           sx={{
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontSize: "0.68rem",
//                             fontWeight: 600,
//                             height: 22,
//                             borderRadius: "4px",
//                             bgcolor: "rgba(15,76,129,0.25)",
//                             color: "#1e1f21",
//                             border: "1px solid rgba(15,76,129,0.4)",
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell sx={{ ...colCell, fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#94A3B8" }}>
//                         {formatDate(row.letter_Date)}
//                       </TableCell>
//                       <TableCell sx={{ ...colCell, fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#94A3B8" }}>
//                         {formatDate(row.schedule_Date)}
//                       </TableCell>
//                       <TableCell sx={{ ...colCell, color: "#1e1f21", fontWeight: 600 }}>
                        
//                         {row.tender_Amt ? `₹ ${row.tender_Amt}` : "-"}
//                       </TableCell>
//                       <TableCell sx={colCell}>
//                         {/* Attachment placeholder */}
//                         <Box sx={{ color: "#334155", fontSize: "0.75rem" }}>—</Box>
//                       </TableCell>
//                       <TableCell sx={colCell}>
//                         <Stack direction="row" spacing={0.8} className="action-btns" sx={{ opacity: 0.85, transition: "opacity 0.2s" }}>
//                           <Button
//                             size="small"
//                             onClick={() => handleEdit(row.ref_Id)}
//                             sx={{
//                               fontFamily: "'DM Sans', sans-serif",
//                               fontWeight: 700,
//                               fontSize: "0.68rem",
//                               textTransform: "none",
//                               letterSpacing: "0.03em",
//                               color: "#60A5FA",
//                               bgcolor: "rgba(96,165,250,0.08)",
//                               border: "1px solid rgba(96,165,250,0.2)",
//                               px: 1.5,
//                               py: 0.3,
//                               minWidth: "auto",
//                               borderRadius: "5px",
//                               "&:hover": {
//                                 bgcolor: "rgba(96,165,250,0.18)",
//                                 borderColor: "#60A5FA",
//                               },
//                             }}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             size="small"
//                             onClick={() => handleDelete(row.ref_Id)}
//                             sx={{
//                               fontFamily: "'DM Sans', sans-serif",
//                               fontWeight: 700,
//                               fontSize: "0.68rem",
//                               textTransform: "none",
//                               letterSpacing: "0.03em",
//                               color: "#F87171",
//                               bgcolor: "rgba(248,113,113,0.08)",
//                               border: "1px solid rgba(248,113,113,0.2)",
//                               px: 1.5,
//                               py: 0.3,
//                               minWidth: "auto",
//                               borderRadius: "5px",
//                               "&:hover": {
//                                 bgcolor: "rgba(248,113,113,0.18)",
//                                 borderColor: "#F87171",
//                               },
//                             }}
//                           >
//                             Delete
//                           </Button>
//                         </Stack>
//                       </TableCell>


//                       <TableCell sx={colCell}>
//                         <Button
//                           size="small"
//                           sx={{
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontWeight: 700,
//                             fontSize: "0.68rem",
//                             textTransform: "none",
//                             letterSpacing: "0.03em",
//                             color: "#fff",
//                             background: "linear-gradient(135deg, #E8572A 0%, #FF7A4A 100%)",
//                             px: 1.8,
//                             py: 0.4,
//                             minWidth: "auto",
//                             borderRadius: "5px",
//                             boxShadow: "0 2px 8px rgba(232,87,42,0.3)",
//                             "&:hover": {
//                               background: "linear-gradient(135deg, #D04A1E 0%, #E8572A 100%)",
//                               boxShadow: "0 4px 12px rgba(232,87,42,0.5)",
//                             },
//                           }}
//                         >
//                           Forward
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={10} align="center" sx={{ py: 6, borderBottom: "none" }}>
//                       <Typography
//                         sx={{
//                           fontFamily: "'DM Sans', sans-serif",
//                           color: "#334155",
//                           fontSize: "0.9rem",
//                         }}
//                       >
//                         {loading ? "Loading…" : "No records found"}
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* FOOTER / PAGINATION */}
//           {totalPages > 1 && (
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 px: 3,
//                 py: 1.5,
//                 borderTop: "1px solid #b9bbc0",
//                 bgcolor: "#ffffff",
//               }}
//             >
//               <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#475569" }}>
//                 Showing {indexOfFirstRecord + 1}–{Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length}
//               </Typography>
//               <Pagination
//                 count={totalPages}
//                 page={currentPage}
//                 onChange={(_, value) => setCurrentPage(value)}
//                 size="small"
//                 sx={{
//                   "& .MuiPaginationItem-root": {
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: "0.78rem",
//                     color: "#64748B",
//                     border: "1px solid #1E293B",
//                     bgcolor: "transparent",
//                     borderRadius: "5px",
//                     "&:hover": { bgcolor: "#5f6164", color: "#0c0d0d" },
//                     "&.Mui-selected": {
//                       bgcolor: "#0F4C81",
//                       color: "#fff",
//                       borderColor: "#0F4C81",
//                       fontWeight: 700,
//                     },
//                   },
//                 }}
//               />
//             </Box>
//           )}
//         </Box>
//       {/* /</Box> */}
//     </ThemeProvider>
//   );
// };

// export default ForwardTo;

// ===============================
"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
  CircularProgress,
  Stack,
  Pagination,
  Chip,
  TextField,
  IconButton,
  Tooltip,
  Box,
  Checkbox,
   Dialog,
  DialogTitle,
  DialogContent,
  Grid,


} from "@mui/material";


import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

// import {useState } from "react";




import VisibilityIcon from "@mui/icons-material/Visibility";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";


// =============================================
const ForwardTo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const actionType = searchParams.get("action") || "get";

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 10;

  const { financial_year, user_id, user_name } = useMemo(
    () => ({
      financial_year: localStorage.getItem("financial_year") || "",
      user_id: localStorage.getItem("user_id") || "",
      user_name: localStorage.getItem("user_name") || "",
    }),
    []
  );

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  const fetchData = async () => {
    if (!financial_year || !user_id) return;
    try {
      setLoading(true);
      const res = await axios.get(
        "http://103.79.34.50:8083/api/Client/getclientadvtrequests",
        {
          params: {
            financial_year,
            user_id,
            user_name,
            action: actionType,
             category: "02",
          },
        }
      );
      const responseData =
        res.data?.data ||
        res.data?.result ||
        (Array.isArray(res.data) ? res.data : []);
      setData(responseData || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Fetch Error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [actionType, financial_year, user_id, user_name]);

  const handleEdit = async (ref_Id) => {
    try {
      const response = await axios.get(
        `http://localhost:3080/api/get-client-advt-request/${ref_Id}`,
        { params: { financial_year, user_id, user_name, action: "get_by_id" } }
      );
      const rowData =
        response.data?.data || response.data?.result || response.data;
      router.push(`/newrequest?action=update&ref_Id=${ref_Id}`);
    } catch (error) {
      console.error("Edit Error:", error);
      alert("Failed to fetch record details");
    }
  };

  const handleDelete = async (ref_Id) => {
    if (!window.confirm(`Delete Ref ID ${ref_Id}?`)) return;
    try {
      const res = await axios.delete(
        `http://localhost:3080/api/client-advt-request/${ref_Id}`,
        { data: { ref_Id, financial_year, user_id, user_name, action: "delete" } }
      );
      const status = res.data?.status ?? res.data?.success;
      if (status === 1 || status === true) {
        setData((prev) => prev.filter((row) => row.ref_Id !== ref_Id));
        alert(`Deleted successfully (Ref ID: ${ref_Id})`);
      } else {
        alert(res.data?.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Server error while deleting");
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      `${row.ref_Id} ${row.subject} ${row.letter_No}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const getTitle = () => {
    switch (actionType) {
      case "get_all_accepted": return "Accepted to Samvad";
      case "get_forwarded": return "Submitted to Samvad";
      case "get_not_forwarded": return "Forward To Samvad";
      case "get_under_process": return "Under Processing Request";
      default: return "Requests";
    }
  };

  const exportToExcel = () => {
    const csvContent = [
      ["Ref ID", "Subject", "Letter No", "Category", "Tender Amt"],
      ...filteredData.map((row) => [
        row.ref_Id,row.financial_Year, row.subject, row.letter_No,
        row.ref_Category_Text, row.tender_Amt,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "requests.csv";
    link.click();
  };

  const exportToPDF = () => window.print();

  const getStatusChip = () => {
    const base = {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      fontSize: "0.68rem",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      height: 24,
      borderRadius: "6px",
    };
    switch (actionType) {
      case "get_all_accepted":
        return <Chip label="Accepted" sx={{ ...base, bgcolor: "#DCFCE7", color: "#15803D", border: "1px solid #BBF7D0" }} />;
      case "get_forwarded":
        return <Chip label="Forwarded" sx={{ ...base, bgcolor: "#DBEAFE", color: "#1D4ED8", border: "1px solid #BFDBFE" }} />;
      case "get_under_process":
        return <Chip label="Processing" sx={{ ...base, bgcolor: "#FEF9C3", color: "#A16207", border: "1px solid #FEF08A" }} />;
      default:
        return <Chip label="Pending" sx={{ ...base, bgcolor: "#FEE2E2", color: "#B91C1C", border: "1px solid #FECACA" }} />;
    }
  };

  // ── column styles ──────────────────────────────────────────────────────────
  const colHead = {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 700,
    fontSize: "0.7rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#374151",
    py: 1.4,
    px: 2,
    borderBottom: "2px solid #E5E7EB",
    whiteSpace: "nowrap",
    bgcolor: "#F8FAFC !important",
  };

  const colCell = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.83rem",
    color: "#1F2937",
    py: 1.3,
    px: 2,
    borderBottom: "1px solid #F1F5F9",
  };



const theme = createTheme({
  typography: {
    fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
  },
  palette: {
    primary: { main: "#1D4ED8" },
    secondary: { main: "#E8572A" },
  },
});

// =====Attachment show=============
const BASE_FILE_URL =
  "http://103.79.34.50:8083/Uploads/Client";

const [openFilesModal, setOpenFilesModal] = useState(false);
const [filesData, setFilesData] = useState([]);
const [filesLoading, setFilesLoading] = useState(false);

// ===============================================
const handleViewFiles = async (refId, financialYear) => {
  try {
    setFilesLoading(true);
    setOpenFilesModal(true);

    const res = await axios.get(
      `http://103.79.34.50:8083/api/Client/get-files/${refId}/${financialYear}`
      // add ?categary_cd=02 if needed
    );

    if (res.data?.status === 1) {
      setFilesData(res.data.data || []);
    } else {
      setFilesData([]);
    }
  } catch (error) {
    console.error("File fetch error:", error);
    setFilesData([]);
  } finally {
    setFilesLoading(false);
  }
};

const groupedFiles = filesData.reduce((acc, file) => {
  const category = file.cat_name || "Others";
  if (!acc[category]) acc[category] = [];
  acc[category].push(file);
  return acc;
}, {});



  // ── icon button style ──────────────────────────────────────────────────────
  const iconBtnSx = (hoverColor) => ({
    width: 34,
    height: 34,
    borderRadius: "8px",
    bgcolor: "#F1F5F9",
    color: "#64748B",
    border: "1px solid #E2E8F0",
    "&:hover": { bgcolor: hoverColor, color: "#fff", borderColor: hoverColor },
    transition: "all 0.18s",
  });

  return (
    <ThemeProvider theme={theme}>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <Box sx={{ mb: 3 }}>
        {/* accent bar */}
        <Box sx={{ height: 3, width: 48, background: "linear-gradient(90deg,#1D4ED8,#60A5FA)", borderRadius: 2, mb: 2 }} />

        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.4 }}>
              <Typography
                sx={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "1.25rem", md: "1.6rem" },
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                }}
              >
                {getTitle()}
              </Typography>
              {getStatusChip()}
            </Box>
            <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "#94A3B8", letterSpacing: "0.04em" }}>
              FY: {financial_year}&nbsp;&nbsp;·&nbsp;&nbsp;{filteredData.length} records
            </Typography>
          </Box>

          {/* export buttons */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Export CSV">
              <IconButton onClick={exportToExcel} sx={iconBtnSx("#16A34A")}>
                <TableViewIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export PDF">
              <IconButton onClick={exportToPDF} sx={iconBtnSx("#DC2626")}>
                <PictureAsPdfIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton sx={iconBtnSx("#1D4ED8")}>
                <FileDownloadIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Box>

      {/* ── SEARCH ─────────────────────────────────────────────────────────── */}
      <Box sx={{ mb: 2.5 }}>
        <TextField
          placeholder="Search by Ref ID, Subject, Letter No…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 17 }} />,
          }}
          sx={{
            width: { xs: "100%", sm: 340 },
            "& .MuiOutlinedInput-root": {
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.84rem",
              bgcolor: "#fff",
              color: "#1F2937",
              borderRadius: "9px",
              "& fieldset": { borderColor: "#E2E8F0" },
              "&:hover fieldset": { borderColor: "#CBD5E1" },
              "&.Mui-focused fieldset": { borderColor: "#1D4ED8", borderWidth: 1.5 },
            },
            "& input::placeholder": { color: "#94A3B8", opacity: 1 },
          }}
        />
      </Box>

      {/* ── TABLE CARD ─────────────────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "14px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
        }}
      >
        {/* loading strip */}
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 3, py: 1.5, bgcolor: "#EFF6FF", borderBottom: "1px solid #DBEAFE" }}>
            <CircularProgress size={14} sx={{ color: "#1D4ED8" }} />
            <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "#1D4ED8", fontWeight: 500 }}>
              Fetching records…
            </Typography>
          </Box>
        )}

        <TableContainer sx={{ maxHeight: "100vh" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {[
                  "Ref ID", "Financial Year", "Subject", "Letter No", "Category",
                  "Letter Date", "Scheduled Publish", "Tender Amt",
                  "Attachment", "Actions", "Forward",
                ].map((col) => (
                  <TableCell key={col} sx={colHead}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {!loading && currentRecords.length > 0 ? (
                currentRecords.map((row, index) => (
                  <TableRow
                    key={row.ref_Id || index}
                    sx={{
                      "&:hover": { bgcolor: "#F8FAFC" },
                      transition: "background 0.12s",
                    }}
                  >
                    {/* Ref ID */}
                    <TableCell sx={colCell}>
                      <Box
                        sx={{
                          display: "inline-block",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.73rem",
                          fontWeight: 600,
                          color: "#1D4ED8",
                          bgcolor: "#EFF6FF",
                          px: 1,
                          py: 0.3,
                          borderRadius: "5px",
                          border: "1px solid #DBEAFE",
                        }}
                      >
                        {row.ref_Id || "—"}
                      </Box>
                    </TableCell>
 <TableCell sx={{ ...colCell, color: "#6B7280" }}>{row.financial_Year || "—"}</TableCell>
                    {/* Subject */}
                    <TableCell sx={{ ...colCell, maxWidth: 180 }}>
                      <Typography
                        sx={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.82rem",
                          color: "#374151",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 170,
                        }}
                        title={row.subject}
                      >
                        {row.subject || "—"}
                      </Typography>
                    </TableCell>

                    {/* Letter No */}
                    <TableCell sx={{ ...colCell, color: "#6B7280" }}>{row.letter_No || "—"}</TableCell>

                    {/* Category */}
                    <TableCell sx={colCell}>
                      <Chip
                        label={row.ref_Category_Text || "—"}
                        size="small"
                        sx={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.67rem",
                          fontWeight: 600,
                          height: 21,
                          borderRadius: "5px",
                          bgcolor: "#F0FDF4",
                          color: "#15803D",
                          border: "1px solid #BBF7D0",
                        }}
                      />
                    </TableCell>

                    {/* Letter Date */}
                    <TableCell sx={{ ...colCell, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.74rem", color: "#6B7280" }}>
                      {formatDate(row.letter_Date)}
                    </TableCell>

                    {/* Schedule Date */}
                    <TableCell sx={{ ...colCell, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.74rem", color: "#6B7280" }}>
                      {formatDate(row.schedule_Date)}
                    </TableCell>

                    {/* Tender Amt */}
                    <TableCell sx={{ ...colCell, fontWeight: 600, color: "#0F172A" }}>
                      {row.tender_Amt ? `₹ ${row.tender_Amt}` : "—"}
                    </TableCell>

                    {/* Attachment */}
                    {/* <TableCell sx={colCell}>
                      <Box sx={{ color: "#CBD5E1", fontSize: "0.8rem" }}></Box>
                    </TableCell> */}
                    

<TableCell sx={colCell}>
  <IconButton
    color="primary"
    onClick={() =>
      handleViewFiles(row.ref_Id, row.financial_Year) // adjust field names if needed
    }
  >
    <VisibilityIcon />
  </IconButton>
</TableCell>

                    {/* Actions */}
                    <TableCell sx={colCell}>
                      <Stack direction="row" spacing={0.7}>
                        <Button
                          size="small"
                          onClick={() => handleEdit(row.ref_Id)}
                          sx={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.68rem",
                            textTransform: "none",
                            color: "#1D4ED8",
                            bgcolor: "#EFF6FF",
                            border: "1px solid #BFDBFE",
                            px: 1.4,
                            py: 0.3,
                            minWidth: "auto",
                            borderRadius: "6px",
                            "&:hover": { bgcolor: "#DBEAFE", borderColor: "#1D4ED8" },
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleDelete(row.ref_Id)}
                          sx={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.68rem",
                            textTransform: "none",
                            color: "#DC2626",
                            bgcolor: "#FEF2F2",
                            border: "1px solid #FECACA",
                            px: 1.4,
                            py: 0.3,
                            minWidth: "auto",
                            borderRadius: "6px",
                            "&:hover": { bgcolor: "#FEE2E2", borderColor: "#DC2626" },
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>

                    {/* Forward */}
                    <TableCell sx={colCell}>
                      <Button
                        size="small"
                        sx={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.68rem",
                          textTransform: "none",
                          letterSpacing: "0.02em",
                          color: "#fff",
                          background: "linear-gradient(135deg,#1D4ED8 0%,#3B82F6 100%)",
                          px: 1.8,
                          py: 0.4,
                          minWidth: "auto",
                          borderRadius: "6px",
                          boxShadow: "0 1px 4px rgba(29,78,216,0.25)",
                          "&:hover": {
                            background: "linear-gradient(135deg,#1E40AF 0%,#2563EB 100%)",
                            boxShadow: "0 3px 10px rgba(29,78,216,0.35)",
                          },
                        }}
                      >
                        Forward
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={{ py: 7, borderBottom: "none" }}>
                    <Typography sx={{ fontFamily: "'Outfit', sans-serif", color: "#94A3B8", fontSize: "0.9rem" }}>
                      {loading ? "Loading…" : "No records found"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ── PAGINATION ───────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 1.5,
              borderTop: "1px solid #F1F5F9",
              bgcolor: "#FAFAFA",
            }}
          >
            <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "#94A3B8" }}>
              Showing {indexOfFirstRecord + 1}–{Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length}
            </Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, v) => setCurrentPage(v)}
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.78rem",
                  color: "#64748B",
                  border: "1px solid #E2E8F0",
                  bgcolor: "#fff",
                  borderRadius: "6px",
                  "&:hover": { bgcolor: "#F1F5F9" },
                  "&.Mui-selected": {
                    bgcolor: "#1D4ED8",
                    color: "#fff",
                    borderColor: "#1D4ED8",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#1E40AF" },
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>
      <Dialog
  open={openFilesModal}
  onClose={() => setOpenFilesModal(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle sx={{ fontWeight: "bold", color: "error.main" }}>
    View Attachments
  </DialogTitle>

  <DialogContent dividers sx={{ height: 450 }}>
    {filesLoading ? (
      <Box textAlign="center" mt={5}>
        <CircularProgress color="error" />
      </Box>
    ) : filesData.length === 0 ? (
      <Typography align="center">No files found</Typography>
    ) : (
      Object.entries(groupedFiles).map(([category, files]) => (
        <Box key={category} mb={3}>
          {/* Category Title */}
          <Typography
            variant="h6"
            sx={{ mb: 1, color: "#1976d2", fontWeight: 600 }}
          >
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
                      textAlign: "center",
                      height: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fafafa",
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
                          objectFit: "contain",
                          borderRadius: "6px",
                        }}
                      />
                    ) : isPdf ? (
                      <Box>
                        <PictureAsPdfIcon
                          sx={{ fontSize: 50, color: "red" }}
                        />
                        <Typography variant="caption" display="block">
                          PDF File
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <InsertDriveFileIcon
                          sx={{ fontSize: 50, color: "#607d8b" }}
                        />
                        <Typography variant="caption" display="block">
                          File
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* File Size in MB */}
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 0.5 }}
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


export default ForwardTo;
