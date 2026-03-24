


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
        financial_year :financial_year||"2024-2025",
        // categary_cd: "07",
        avak_ref_id: avak_ref_id,
      };

      const res = await axios.get(
        "http://103.79.34.50:8083/api/Client/getavakfiles",
        { params }
      );

      console.table(res.data);
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
              var fileUrl = '';
//              const fileUrl = `${BASE_FILE_URL}/${
//   file.file_path === '#' ? file.link_name : file.file_path
// }`;
if (file.file_path && file.file_path !== "#") {
  // ✅ File from server
   fileUrl = `${BASE_FILE_URL}/${file.file_path}`;
} else if (file.file_data) {
  // ✅ Base64 file
   fileUrl = `data:${file.content_type};base64,${file.file_data}`;
} else {
  // fallback (optional)
    fileUrl = "";
}

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