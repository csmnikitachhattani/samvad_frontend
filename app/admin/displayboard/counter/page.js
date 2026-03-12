
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
//   Stack,
//   Pagination,
//   Chip,
//   TextField,
// } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const theme = createTheme({
//   typography: {
//     fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
//   },
// });

// const DisplayBoardAvakList = () => {
//   const [avaks, setAvaks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;

//   const router = useRouter();

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
//       console.log("fhgsjk :" , res)
//     } catch (err) {
//       console.error("AVAK List Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter
//   const filtered = useMemo(() => {
//     return avaks.filter((row) =>
//       `${row.subject} ${row.client_name} ${row.avak_ref_id}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//   }, [avaks, search]);

//   // Pagination
//   const indexOfLast = currentPage * recordsPerPage;
//   const indexOfFirst = indexOfLast - recordsPerPage;
//   const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / recordsPerPage);

//   // const handleSelect = (avakRefId) => {
//   //   window.location.href = `/displayboard/counter/id=${avakRefId}`;
//   // };
//   const handleSelect = (avakRefId) => {
//   router.push(`/displayboard/counter/${avakRefId}`);
// };

//   // column styles (same as ForwardTo)
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

//       <link
//         href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
//         rel="stylesheet"
//       />

//       {/* HEADER */}
//       <Box sx={{ mb: 3 }}>
//         <Box
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
//           InputProps={{
//             startAdornment: (
//               <SearchIcon sx={{ color: "#94A3B8", mr: 1 }} />
//             ),
//           }}
//           sx={{
//             width: 340,
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "9px",
//             },
//           }}
//         />
//       </Box>

//       {/* TABLE CARD */}
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
//             <CircularProgress size={18} />
//           </Box>
//         )}

//         <TableContainer>
//           <Table stickyHeader>

//             <TableHead>
//               <TableRow>
//                 {[
//                   "SN",
//                   "Avak Ref",
//                       "Letter No",
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
//                   </TableCell>
// <TableCell sx={colCell}>{row.letter_no}</TableCell>
//                   <TableCell sx={colCell}>{row.subject}</TableCell>
//                   <TableCell sx={colCell}>{row.client_name}</TableCell>
//                   <TableCell sx={colCell}>{row.received_date}</TableCell>
                  
//                   <TableCell sx={colCell}>{row.letter_type}</TableCell>
//                   <TableCell sx={colCell}>{row.receiving_mode}</TableCell>
//                   {/* <TableCell sx={colCell}>Rs.{row.tender_amt}</TableCell> */}
//                 <TableCell sx={{ ...colCell, fontWeight: 700 }}>
//   Rs.{row.tender_amt} /-
// </TableCell>
//                   <TableCell sx={colCell}>{row.category}</TableCell>


//                   {/* <TableCell sx={colCell}>
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
//                       onClick={() =>
//                         handleSelect(row.avak_ref_id)
//                       }
//                     >
//                 Go
//                     </Button>
//                   </TableCell> */}

//                   <TableCell sx={colCell}>
//   <Button
//     size="small"
//     sx={{
//       background: "linear-gradient(135deg,#1D4ED8,#3B82F6)",
//       color: "#fff",
//       textTransform: "none",
//       borderRadius: "6px",
//       px: 2,
//     }}
//     onClick={() => handleSelect(row.avak_ref_id)}
//   >
//     Go
//   </Button>
// </TableCell>

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
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
  },
});

const DisplayBoardAvakList = () => {
  const router = useRouter();

  const [avaks, setAvaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    fetchAvakList();
  }, []);

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
      console.log("API Response:", res.data);
    } catch (err) {
      console.error("AVAK List Error:", err);
      setAvaks([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter records
  const filtered = useMemo(() => {
    return avaks.filter((row) =>
      `${row.subject || ""} ${row.client_name || ""} ${row.avak_ref_id || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [avaks, search]);

  // Pagination
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  // Navigate to counter page
  const handleSelect = (avakRefId) => {
    router.push(`/admin/displayboard/counter/${avakRefId}`);
  };

  const colHead = {
    fontWeight: 700,
    fontSize: "0.7rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#374151",
    py: 1.4,
    px: 2,
    borderBottom: "2px solid #E5E7EB",
    bgcolor: "#F8FAFC",
  };

  const colCell = {
    fontSize: "0.83rem",
    color: "#1F2937",
    py: 1.3,
    px: 2,
    borderBottom: "1px solid #F1F5F9",
  };

  return (
    <ThemeProvider theme={theme}>
      {/* HEADER */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            height: 3,
            width: 48,
            background: "linear-gradient(90deg,#1D4ED8,#60A5FA)",
            borderRadius: 2,
            mb: 2,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.6rem",
              color: "#0F172A",
            }}
          >
            AVAK Records
          </Typography>

          <Chip
            label={`${filtered.length} Records`}
            sx={{
              fontWeight: 600,
              bgcolor: "#EFF6FF",
              color: "#1D4ED8",
            }}
          />
        </Box>
      </Box>

      {/* SEARCH */}
      <Box sx={{ mb: 2 }}>
        <TextField
          placeholder="Search subject, client, ref..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            width: 340,
            "& .MuiOutlinedInput-root": {
              borderRadius: "9px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#94A3B8" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* TABLE */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "14px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
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
                  "Letter Type",
                  "Receiving Mode",
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
                      sx={{
                        bgcolor: "#EFF6FF",
                        color: "#1D4ED8",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  <TableCell sx={colCell}>{row.letter_no}</TableCell>
                  <TableCell sx={colCell}>{row.subject}</TableCell>
                  <TableCell sx={colCell}>{row.client_name}</TableCell>
                  <TableCell sx={colCell}>{row.received_date}</TableCell>
                  <TableCell sx={colCell}>{row.letter_type}</TableCell>
                  <TableCell sx={colCell}>{row.receiving_mode}</TableCell>

                  <TableCell sx={{ ...colCell, fontWeight: 700 }}>
                    Rs.{row.tender_amt} /-
                  </TableCell>

                  <TableCell sx={colCell}>{row.category}</TableCell>

                  <TableCell sx={colCell}>
                    <Button
                      size="small"
                      sx={{
                        background:
                          "linear-gradient(135deg,#1D4ED8,#3B82F6)",
                        color: "#fff",
                        textTransform: "none",
                        borderRadius: "6px",
                        px: 2,
                      }}
                      onClick={() => handleSelect(row.avak_ref_id)}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 3,
              py: 2,
              borderTop: "1px solid #F1F5F9",
            }}
          >
            <Typography fontSize="0.8rem">
              Showing {indexOfFirst + 1}-
              {Math.min(indexOfLast, filtered.length)} of{" "}
              {filtered.length}
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
    </ThemeProvider>
  );
};

export default DisplayBoardAvakList;