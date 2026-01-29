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
  const recordsPerPage = 15;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://103.79.34.50:3080/api/get-news-rate");
      setData(res.data || []);
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
          "NP Name": np.NP,
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
    <Box p={4}>
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        mb={4}
        sx={{ background: "#D1A980", color: "#313647", p: 2, borderRadius: 1 }}
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
        <Stack alignItems="center" mt={5}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead sx={{ background: "#f1f1f1" }}>
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
                                {np.NP}
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
// import jsPDF from "jspdf";
// import "jspdf-autotable";

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
//   TextField,
// } from "@mui/material";

// const NewsRatesList = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters
//   const [search, setSearch] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 15;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [search, fromDate, toDate, data]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://103.79.34.50:3080/api/get-news-rate");
//       setData(res.data || []);
//       setFilteredData(res.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔍 APPLY FILTERS
//   const applyFilters = () => {
//     let result = [...data];

//     if (search) {
//       result = result.filter((np) =>
//         np.NP.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (fromDate || toDate) {
//       result = result
//         .map((np) => ({
//           ...np,
//           rates: np.rates.filter((r) => {
//             const rateFrom = new Date(r.from_date);
//             return (
//               (!fromDate || rateFrom >= new Date(fromDate)) &&
//               (!toDate || rateFrom <= new Date(toDate))
//             );
//           }),
//         }))
//         .filter((np) => np.rates.length > 0);
//     }

//     setFilteredData(result);
//     setCurrentPage(1);
//   };

//   // 📄 PDF EXPORT
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Newspaper Rate List", 14, 15);

//     const rows = [];

//     filteredData.forEach((np) => {
//       np.rates.forEach((r, i) => {
//         rows.push([
//           np.sr_no,
//           np.NP,
//           i + 1,
//           r.rate_category_name,
//           r.cc_rate,
//           r.sc_rate,
//           r.no_of_circulation,
//           r.from_date,
//           r.to_date,
//         ]);
//       });
//     });

//     doc.autoTable({
//       head: [
//         [
//           "Sr",
//           "Newspaper",
//           "Sno",
//           "Category",
//           "CC Rate",
//           "SC Rate",
//           "Circulation",
//           "From",
//           "To",
//         ],
//       ],
//       body: rows,
//       startY: 20,
//     });

//     doc.save("Newspaper_Rates.pdf");
//   };

//   // 📄 EXCEL EXPORT
//   const exportExcel = () => {
//     const rows = [];
//     filteredData.forEach((np) => {
//       np.rates.forEach((r, i) => {
//         rows.push({
//           "Sr No": np.sr_no,
//           Newspaper: np.NP,
//           Sno: i + 1,
//           Category: r.rate_category_name,
//           "CC Rate": r.cc_rate,
//           "SC Rate": r.sc_rate,
//           Circulation: r.no_of_circulation,
//           From: r.from_date,
//           To: r.to_date,
//         });
//       });
//     });

//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.json_to_sheet(rows);
//     XLSX.utils.book_append_sheet(wb, ws, "Rates");
//     XLSX.writeFile(wb, "NewspaperRates.xlsx");
//   };

//   // Pagination
//   const totalPages = Math.ceil(filteredData.length / recordsPerPage);
//   const currentData = filteredData.slice(
//     (currentPage - 1) * recordsPerPage,
//     currentPage * recordsPerPage
//   );

//   return (
//     <Box p={4}>
//       <Typography
//         variant="h5"
//         textAlign="center"
//         mb={3}
//         fontWeight="bold"
//         color="blacl"
//       >
//         Newspaper Rate List
//       </Typography>

//       {/* FILTER BAR */}
//       <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={3}>
//         <TextField
//           label="Search Newspaper"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           fullWidth
//         />

//         <TextField
//           type="date"
//           label="From Date"
//           InputLabelProps={{ shrink: true }}
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//         />

//         <TextField
//           type="date"
//           label="To Date"
//           InputLabelProps={{ shrink: true }}
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//         />

//         <Button variant="contained" onClick={exportExcel}>
//           Excel
//         </Button>

//         <Button variant="contained" color="error" onClick={exportPDF}>
//           PDF
//         </Button>
//       </Stack>

//       {/* TABLE */}
//       {loading ? (
//         <Stack alignItems="center" mt={4}>
//           <CircularProgress />
//         </Stack>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Sr</TableCell>
//                 <TableCell>Newspaper</TableCell>
//                 <TableCell>Sno</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell align="right">CC</TableCell>
//                 <TableCell align="right">SC</TableCell>
//                 <TableCell align="right">Circulation</TableCell>
//                 <TableCell>From</TableCell>
//                 <TableCell>To</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {currentData.map((np) =>
//                 np.rates.map((r, i) => (
//                   <TableRow key={`${np.np_cd}-${i}`}>
//                     <TableCell>{np.sr_no}</TableCell>
//                     <TableCell>{np.NP}</TableCell>
//                     <TableCell>{i + 1}</TableCell>
//                     <TableCell>{r.rate_category_name}</TableCell>
//                     <TableCell align="right">{r.cc_rate}</TableCell>
//                     <TableCell align="right">{r.sc_rate}</TableCell>
//                     <TableCell align="right">{r.no_of_circulation}</TableCell>
//                     <TableCell>{r.from_date}</TableCell>
//                     <TableCell>{r.to_date}</TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default NewsRatesList;
