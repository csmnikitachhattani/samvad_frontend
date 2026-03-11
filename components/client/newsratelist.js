"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";

const NewsRatesList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // const res = await axios.get("http://103.79.34.50:3080/api/get-news-rate");
      const res = await axios.get("http://103.79.34.50:8083/api/Client/getNewsPaperWithRates");
      setData(res.data || []);
      console.log("newsrate list:", res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Export Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    let rows = [];

    data.forEach((np) => {
      np.rates.forEach((r, i) => {
        rows.push({
          "Sr No.": np.sr_no,
          "NP Name": np.np,
          Sno: i + 1,
          Category: r.rate_category_name,
          "CC Rate ₹": r.cc_rate,
          "SC Rate ₹": r.sc_rate,
          Circulation: r.no_of_circulation,
          "From Date": r.from_date,
          "To Date": r.to_date,
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "NewsRates");
    XLSX.writeFile(wb, "NewspaperRates.xlsx");
  };

  // Pagination logic
  const totalPages = Math.ceil(data.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);

  const getPageNumbers = () => {
    let pages = [];
    pages.push(1);

    if (currentPage > 3) pages.push("...");

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return [...new Set(pages)];
  };

  return (
    <Box p={2}>
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        mb={4}
        sx={{ background: "rgb(32, 57, 66)", color: "#e0e0e3", p: 1, borderRadius: 1 }}
      >
        News Paper Rate List
      </Typography>

      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          sx={{
            background: "#00bcd4",
            color: "#fff",
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontWeight: "bold",
          }}
        >
          Total {data.length}
        </Typography>

        <Button variant="outlined" color="success" onClick={exportToExcel}>
          Export Excel
        </Button>
      </Stack>

      {/* Table */}
      {loading ? (
        <Stack alignItems="center" mt={1}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: "80vh",pb:10 }}>
            <Table size="small" stickyHeader >
              <TableHead sx={{ background: "#d3cbcb", "& th": {
      background: "#d3cbcb",
      fontWeight: "bold"
    } }}>
                <TableRow> 
                  <TableCell align="center">Sr No</TableCell>
                  <TableCell align="center">News Paper</TableCell>
                  <TableCell align="center">Sno</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">CC Rate ₹</TableCell>
                  <TableCell align="right">SC Rate ₹</TableCell>
                  <TableCell align="right">Circulation</TableCell>
                  <TableCell align="center">From</TableCell>
                  <TableCell align="center">To</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {currentData.map((np, idx) => (
                  <React.Fragment key={np.np_cd}>
                    {np.rates.map((r, i) => {
                      const bg = idx % 2 === 0 ? "#ffffff" : "#f5f5f5";

                      return (
                        <TableRow key={i} sx={{ background: bg }}>
                          {i === 0 && (
                            <>
                              <TableCell
                                rowSpan={np.rates.length}
                                align="center"
                                sx={{ fontWeight: "bold" }}
                              >
                                {np.sr_no}
                              </TableCell>

                              <TableCell
                                rowSpan={np.rates.length}
                                align="center"
                                sx={{ fontWeight: "bold" }}
                              >
                                {np.np}
                              </TableCell>
                            </>
                          )}

                          <TableCell align="center">{i + 1}</TableCell>
                          <TableCell>{r.rate_category_name}</TableCell>
                          <TableCell align="right">{r.cc_rate}</TableCell>
                          <TableCell align="right">{r.sc_rate}</TableCell>
                          <TableCell align="right">
                            {r.no_of_circulation}
                          </TableCell>
                          <TableCell align="center">{r.from_date}</TableCell>
                          <TableCell align="center">{r.to_date}</TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Stack direction="row" justifyContent="center" mt={3} spacing={1}>
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>

            {getPageNumbers().map((num, i) =>
              num === "..." ? (
                <Button key={i} disabled>
                  ...
                </Button>
              ) : (
                <Button
                  key={i}
                  variant={num === currentPage ? "contained" : "outlined"}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </Button>
              ),
            )}

            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default NewsRatesList;



// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";

// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Stack,
//   Chip,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import NewspaperIcon from "@mui/icons-material/Newspaper";

// const NewsRatesList = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 15;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://103.79.34.50:8083/api/Client/getNewsPaperWithRates");
//       setData(res.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportToExcel = () => {
//     const wb = XLSX.utils.book_new();
//     let rows = [];
//     data.forEach((np) => {
//       np.rates.forEach((r, i) => {
//         rows.push({
//           "Sr No.": np.sr_no,
//           "NP Name": np.NP,
//           Sno: i + 1,
//           Category: r.rate_category_name,
//           "CC Rate ₹": r.cc_rate,
//           "SC Rate ₹": r.sc_rate,
//           Circulation: r.no_of_circulation,
//           "From Date": r.from_date,
//           "To Date": r.to_date,
//         });
//       });
//     });
//     const ws = XLSX.utils.json_to_sheet(rows);
//     XLSX.utils.book_append_sheet(wb, ws, "NewsRates");
//     XLSX.writeFile(wb, "NewspaperRates.xlsx");
//   };

//   const totalPages = Math.ceil(data.length / recordsPerPage);
//   const currentData = data.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

//   return (
//     <Box p={4} sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//       {/* Hero Header */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           mb: 4,
//           borderRadius: 4,
//           background: "linear-gradient(90deg, #1e293b 0%, #334155 100%)",
//           color: "white",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Box>
//           <Typography variant="h4" fontWeight="800" letterSpacing="-0.5px">
//             Newspaper Rate Directory
//           </Typography>
//           <Typography variant="body2" sx={{ opacity: 0.8 }}>
//             Manage and export advertising rates for all publications
//           </Typography>
//         </Box>
//         <Stack direction="row" spacing={2}>
//           <Chip 
//             label={`Total: ${data.length} Papers`} 
//             sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white", fontWeight: "bold" }} 
//           />
//           <Button
//             variant="contained"
//             startIcon={<DownloadIcon />}
//             onClick={exportToExcel}
//             sx={{
//               bgcolor: "#38bdf8",
//               "&:hover": { bgcolor: "#0ea5e9" },
//               borderRadius: "10px",
//               textTransform: "none",
//               fontWeight: "bold",
//             }}
//           >
//             Export XLSX
//           </Button>
//         </Stack>
//       </Paper>

//       {loading ? (
//         <Stack alignItems="center" mt={10}>
//           <CircularProgress thickness={5} size={60} sx={{ color: "#38bdf8" }} />
//           <Typography mt={2} color="textSecondary">Fetching latest rates...</Typography>
//         </Stack>
//       ) : (
//         <>
//           <TableContainer 
//             component={Paper} 
//             sx={{ 
//               borderRadius: 4, 
//               boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//               overflow: "hidden" 
//             }}
//           >
//             <Table size="medium">
//               <TableHead>
//                 <TableRow sx={{ bgcolor: "#f1f5f9" }}>
//                   <TableCell align="center" sx={{ fontWeight: "700", color: "#475569" }}>#</TableCell>
//                   <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Publication</TableCell>
//                   <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Category</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "700", color: "#475569" }}>CC Rate</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "700", color: "#475569" }}>SC Rate</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "700", color: "#475569" }}>Circulation</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "700", color: "#475569" }}>Validity Period</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {currentData.map((np, idx) => (
//                   <React.Fragment key={np.np_cd}>
//                     {np.rates.map((r, i) => (
//                       <TableRow 
//                         key={i} 
//                         sx={{ 
//                           "&:hover": { bgcolor: "#f8fafc" },
//                           transition: "0.2s"
//                         }}
//                       >
//                         {i === 0 && (
//                           <>
//                             <TableCell 
//                               rowSpan={np.rates.length} 
//                               align="center"
//                               sx={{ borderRight: "1px solid #e2e8f0", fontWeight: "bold", color: "#64748b" }}
//                             >
//                               {np.sr_no}
//                             </TableCell>
//                             <TableCell 
//                               rowSpan={np.rates.length}
//                               sx={{ borderRight: "1px solid #e2e8f0" }}
//                             >
//                               <Stack direction="row" alignItems="center" spacing={1}>
//                                 <NewspaperIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
//                                 <Typography fontWeight="600" color="#1e293b">{np.NP}</Typography>
//                               </Stack>
//                             </TableCell>
//                           </>
//                         )}
//                         <TableCell>
//                           <Chip 
//                             label={r.rate_category_name} 
//                             size="small" 
//                             sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: "600" }} 
//                           />
//                         </TableCell>
//                         <TableCell align="right">
//                           <Typography fontWeight="bold" color="#059669">₹{r.cc_rate}</Typography>
//                         </TableCell>
//                         <TableCell align="right">
//                           <Typography fontWeight="bold" color="#059669">₹{r.sc_rate}</Typography>
//                         </TableCell>
//                         <TableCell align="right">
//                           <Typography color="#64748b">{Number(r.no_of_circulation).toLocaleString()}</Typography>
//                         </TableCell>
//                         <TableCell align="center">
//                           <Typography variant="caption" sx={{ display: "block", color: "#94a3b8" }}>
//                             {r.from_date} — {r.to_date}
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Styled Pagination */}
//           <Stack direction="row" justifyContent="center" mt={5} spacing={1} pb={5}>
//             <Button
//               variant="outlined"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => p - 1)}
//               sx={{ borderRadius: 2, textTransform: "none" }}
//             >
//               Previous
//             </Button>

//             {/* Simple Dynamic Page Dots could be added here, but using your logic */}
//             <Typography sx={{ alignSelf: "center", px: 2, fontWeight: "bold", color: "#64748b" }}>
//               Page {currentPage} of {totalPages}
//             </Typography>

//             <Button
//               variant="outlined"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((p) => p + 1)}
//               sx={{ borderRadius: 2, textTransform: "none" }}
//             >
//               Next
//             </Button>
//           </Stack>
//         </>
//       )}
//     </Box>
//   );
// };

// export default NewsRatesList;