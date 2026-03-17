"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Chip,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Tooltip,
  Stack,
  Badge,
  CircularProgress,
   Dialog,
  DialogTitle,
  DialogContent,
  Grid
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import VisibilityIcon from "@mui/icons-material/Visibility";


import SearchIcon from "@mui/icons-material/Search";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

/* ─── Theme ─── */

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#000000", secondary: "#ffffff" },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
  },
  shape: { borderRadius: 12 },
});

/* ─── Columns (UNCHANGED) ─── */
const COLUMNS = [
  { id: "job_id", label: "Job ID" },
  { id: "financial_year", label: "Financial Year" },
  { id: "client_ref_id", label: "Client Ref" },
  { id: "avak_ref_id", label: "Avak Ref" },
  { id: "ref_no", label: "Ref No" },
  //   { id: "od_servicetype_id", label: "Service Type" },
  { id: "subject", label: "Subject" },
  //   { id: "client_cd", label: "Client Code" },
  { id: "client_name", label: "Client Name" },
  //   { id: "is_client_dpr", label: "Client DPR" },
  //   { id: "startDate", label: "Start Date" },
  //   { id: "endDate", label: "End Date" },
  //   { id: "ref_date", label: "Ref Date" },
  //   { id: "receipt_date", label: "Receipt Date" },
  { id: "action", label: "Action" },
];

const DATE_FIELDS = ["startDate", "endDate", "ref_date", "receipt_date"];

/* ─── Helpers ─── */
const formatDate = (val) => {
  if (!val) return "—";
  const d = new Date(val);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const compareValues = (a, b, key, order) => {
  let av = a[key];
  let bv = b[key];

  if (av == null) return 1;
  if (bv == null) return -1;

  if (DATE_FIELDS.includes(key)) {
    av = new Date(av).getTime();
    bv = new Date(bv).getTime();
  } else if (!isNaN(av) && !isNaN(bv)) {
    av = Number(av);
    bv = Number(bv);
  } else {
    av = String(av).toLowerCase();
    bv = String(bv).toLowerCase();
  }

  if (av < bv) return order === "asc" ? -1 : 1;
  if (av > bv) return order === "asc" ? 1 : -1;
  return 0;
};

const truncateText = (text, maxLength = 50) => {
  if (!text) return "—";
  const str = String(text);
  return str.length > maxLength ? str.slice(0, maxLength) + " ..." : str;
};

export default function JobDataTable() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("job_id");
  const [order, setOrder] = useState("asc");

  const [openFilesModal, setOpenFilesModal] = useState(false);
const [filesData, setFilesData] = useState([]);
const [filesLoading, setFilesLoading] = useState(false);

const groupedFiles = useMemo(() => {
  return filesData.reduce((acc, file) => {
    const category = file.category || "Documents";
    if (!acc[category]) acc[category] = [];
    acc[category].push(file);
    return acc;
  }, {});
}, [filesData]);


  /* ─── API CALL ─── */
  const fetchJobs = async () => {
    try {
      setLoading(true);

      // 🔴 Replace with your actual API endpoint
      const res = await axios.get(
       
        "http://103.79.34.50:8083/api/OutDoorMediaTransaction/getoutdoordbcounter",
      );

      // If API returns { data: [...] }
      setRows(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) =>
      Object.values(r || {}).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    );
  }, [rows, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => compareValues(a, b, orderBy, order));
  }, [filtered, orderBy, order]);

  const paginated = useMemo(() => {
    return sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sorted, page, rowsPerPage]);

// ===================Handle Edit =====================
  const handleEdit = (row) => {
    console.log("Edit clicked:", row);

    // Navigate to edit page with job_id
    router.push(`/admin/counter/edit/${row.job_id}`);
  };
// ===================Handle Allocation=====================
  const handleAllocation = (row) => {
    console.log("Allocation clicked:", row);

    // Navigate to allocation page
    router.push(`/admin/counter/allocation/${row.job_id}`);
  };

  const handleSort = (col) => {
    if (orderBy === col) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(col);
      setOrder("asc");
    }
  };


  const handleRefresh = () => {
    fetchJobs();
    setPage(0);
  };

// ===================Handle View File=====================

  const BASE_URL = "http://103.79.34.50:8083";

const handleViewFiles = async (row) => {
  try {
    setFilesLoading(true);

    if (!row.upload_doc_path) {
      setFilesData([]);
      setOpenFilesModal(true);
      return;
    }

    const filePath = row.upload_doc_path;
    const fileName = filePath.split("/").pop();

    const fileObj = {
      link_name: `${BASE_URL}/${filePath}`,   // ✅ base url added
      content_type: fileName.toLowerCase().endsWith(".pdf")
        ? "application/pdf"
        : "image/jpeg",
      file_size_in_bytes: 0,
      category: "Uploaded Document",
    };

    setFilesData([fileObj]);
    setOpenFilesModal(true);

  } catch (err) {
    console.error("File fetch error", err);
    setFilesData([]);
  } finally {
    setFilesLoading(false);
  }
};


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 3 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" gap={2} mb={3}>
          <WorkOutlineIcon sx={{ color: "#818cf8" }} />
          <Typography variant="h6" fontWeight={700}>
            Display Board Job Records
          </Typography>

          <Stack direction="row" gap={1.5} ml="auto" alignItems="center">
            {/* Total Records Badge - Attractive */}
            <Chip
              label={`Total Records: ${filtered.length}`}
              size="small"
              sx={{
                bgcolor: "#f1f5f9",
                color: "#000",
                fontWeight: 600,
                borderRadius: "999px",
                px: 1,
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                "& .MuiChip-label": {
                  px: 1,
                },
              }}
            />

            {/* Refresh Button - Attractive Badge Style */}
            <Tooltip title="Refresh Data">
              <IconButton
                onClick={handleRefresh}
                sx={{
                  bgcolor: "#e0f2fe",
                  color: "#000",
                  borderRadius: "999px",
                  width: 36,
                  height: 36,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#bae6fd",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Export Button - Attractive Badge Style */}
            <Tooltip title="Export Data">
              <IconButton
                sx={{
                  bgcolor: "#dcfce7",
                  color: "#000",
                  borderRadius: "999px",
                  width: 36,
                  height: 36,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#bbf7d0",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <FileDownloadOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <TextField
          size="small"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{
            width: 320, // 🔹 small fixed width (change 250/300/350 as needed)
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "999px",
              bgcolor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(8px)",
              color: "#181717",
              fontWeight: 500,
              transition: "all 0.25s ease",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)",
              },
              "&:hover fieldset": {
                borderColor: "#6366f1",
              },
              "&.Mui-focused": {
                bgcolor: "rgba(99,102,241,0.08)",
                boxShadow: "0 0 0 2px rgba(99,102,241,0.35)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#080bc0",
                borderWidth: "1.5px",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(41, 18, 193, 0.6)",
              opacity: 1,
            },
          }}
          InputProps={{
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearch("");
                    setPage(0);
                  }}
                  sx={{ color: "#a91a1a" }}
                >
                  ✕
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Table */}
        <Paper>
          <TableContainer sx={{ maxHeight: 560 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(135deg, #ffffff, #f3f3f3)",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#000000",
                      background: "white",
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      letterSpacing: "0.6px",
                    }}
                  >
                    SN
                  </TableCell>

                  {COLUMNS.map((col) => (
                    <TableCell
                      key={col.id}
                      sx={{
                       color: "#000000",
                      background: "white",
                        fontWeight: 800,
                        fontSize: "0.8rem",
                        letterSpacing: "0.6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col.id === "action" ? (
                        col.label
                      ) : (
                        <TableSortLabel
                          active={orderBy === col.id}
                          direction={orderBy === col.id ? order : "asc"}
                          onClick={() => handleSort(col.id)}
                          sx={{
                            color: "#000000 !important",
                            fontWeight: 800,
                            "& .MuiTableSortLabel-icon": {
                              color: "#f2f3f4 !important",
                            },
                          }}
                        >
                          {col.label}
                        </TableSortLabel>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={COLUMNS.length + 1} align="center">
                      <CircularProgress size={28} />
                    </TableCell>
                  </TableRow>
                ) : paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={COLUMNS.length + 1} align="center">
                      No Data Found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((row, idx) => (
                    // <TableRow key={row.job_id || idx} hover>
                    <TableRow
                      key={row.job_id || idx}
                      hover
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#8d2e13", // light gray hover
                        },
                        "&:hover .MuiTableCell-root": {
                          backgroundColor: "#989fac", // apply to all cells
                        },
                      }}
                    >
                      <TableCell>{page * rowsPerPage + idx + 1}</TableCell>

                      {COLUMNS.map((col) => (
                        <TableCell
                          key={col.id}
                          sx={{
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {col.id === "action" ? (
                            <Stack direction="row" spacing={1}>
                              {/* Edit Button */}
                              <Tooltip title="Edit Job" arrow>
                                <Chip
                                  label="Edit"
                                  size="small"
                                  clickable
                                  onClick={() => handleEdit(row)}
                                  sx={{
                                    bgcolor: "#facc15", // premium yellow
                                    color: "#000",
                                    fontWeight: 600,
                                    borderRadius: "999px",
                                    px: 1,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      bgcolor: "#eab308",
                                      transform: "scale(1.05)",
                                      boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
                                    },
                                  }}
                                />
                              </Tooltip>

                              {/* Allocation Button */}
                              <Tooltip title="Go to Allocation" arrow>
                                <Chip
                                  label=" Go to Allocation"
                                  size="small"
                                  clickable
                                  onClick={() => handleAllocation(row)}
                                  sx={{
                                    bgcolor: "#6366f1", // primary premium
                                    color: "#fff",
                                    fontWeight: 600,
                                    borderRadius: "999px",
                                    px: 1,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      bgcolor: "#4f46e5",
                                      transform: "scale(1.05)",
                                      boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
                                    },
                                  }}
                                />
                              </Tooltip>
                            </Stack>
                          ) : DATE_FIELDS.includes(col.id) ? (
                            formatDate(row[col.id])
                          ) : col.id === "subject" ? (
                            <Tooltip title={row?.[col.id] || ""} arrow>
                              <Typography
                                sx={{
                                  maxWidth: 160,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  fontWeight: 500,
                                }}
                              >
                                {truncateText(row?.[col.id], 30)}
                              </Typography>
                            </Tooltip>
                          // ) : (
                          //   (row?.[col.id] ?? "—")
                          // )}
                          ) : col.id === "job_id" ? (
  <Stack direction="row" spacing={1} alignItems="center">
    <Typography fontWeight={600}>{row.job_id}</Typography>

<Button
  size="small"
  startIcon={<VisibilityIcon />}
  onClick={() => handleViewFiles(row)}
  sx={{
    textTransform: "none",
    fontSize: "0.7rem",
    minWidth: "auto",
  }}
>
  Files
</Button>
  </Stack>
) : (
  row?.[col.id] ?? "—"
)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
            sx={{
              /* Label text (Rows per page, 1–10 of 100) */
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#0a0b0c",
                  letterSpacing: "0.3px",
                },

              /* Select dropdown */
              "& .MuiSelect-select": {
                bgcolor: "rgba(255,255,255,0.06)",
                borderRadius: "8px",
                px: 1.5,
                py: 0.5,
                fontWeight: 600,
                color: "#141415",
              },

              /* Dropdown icon */
              "& .MuiSvgIcon-root": {
                color: "#090909",
              },

              /* Pagination buttons (next/prev) */
              "& .MuiIconButton-root": {
                color: "#e2e8f0",
                bgcolor: "rgba(255,255,255,0.04)",
                borderRadius: "10px",
                mx: 0.5,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#6366f1",
                  color: "#fff",
                  transform: "scale(1.05)",
                },
                "&.Mui-disabled": {
                  color: "rgba(255,255,255,0.2)",
                  bgcolor: "transparent",
                },
              },
            }}
          />
        </Paper>
      </Box>
  


<Dialog
  open={openFilesModal}
  onClose={() => setOpenFilesModal(false)}
  fullWidth
  maxWidth="md"
>
  {/* Header */}
  <DialogTitle
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: 600,
      background: "#f5f7fb",
      borderBottom: "1px solid #eee",
    }}
  >
    View Attachments

    <IconButton
      onClick={() => setOpenFilesModal(false)}
      size="small"
      sx={{
        background: "#ab0000",
        "&:hover": { background: "#931d1d" },
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  {/* Content */}
  <DialogContent dividers sx={{ background: "#fafbff" }}>
    {filesLoading ? (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    ) : filesData.length === 0 ? (
      <Typography align="center" sx={{ py: 4 }}>
        No files found
      </Typography>
    ) : (
      Object.entries(groupedFiles).map(([category, files]) => (
        <Box key={category} mb={4}>
          {/* Category Title */}
          <Typography
            sx={{
              mb: 2,
              fontWeight: 600,
              color: "#1a237e",
              borderLeft: "4px solid #3949ab",
              pl: 1,
            }}
          >
            {category}
          </Typography>

          {/* File Grid */}
          <Grid container spacing={2}>
            {files.map((file, index) => {
              const fileUrl = file.link_name;

              const isImage = file.content_type?.startsWith("image");
              const isPdf = file.content_type === "application/pdf";

              return (
                <Grid item xs={6} md={3} key={index}>
                  <Box
                    onClick={() => window.open(fileUrl, "_blank")}
                    sx={{
                      borderRadius: 2,
                      border: "1px solid #e0e0e0",
                      background: "#fff",
                      p: 1,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                        transform: "scale(1.03)",
                      },
                    }}
                  >
                    {/* Preview */}
                    <Box
                      sx={{
                        height: 110,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      {isImage ? (
                        <img
                          src={fileUrl}
                          alt="preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            borderRadius: 6,
                          }}
                        />
                      ) : isPdf ? (
                        <PictureAsPdfIcon
                          sx={{ fontSize: 55, color: "#d32f2f" }}
                        />
                      ) : (
                        <InsertDriveFileIcon
                          sx={{ fontSize: 55, color: "#09abf6" }}
                        />
                      )}
                    </Box>

                    {/* File Name */}
                    <Typography
                      variant="caption"
                      noWrap
                      sx={{ fontWeight: 500 }}
                    >
                      {file.link_name?.split("/").pop()}
                    </Typography>

                    {/* File Size */}
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      {(file.file_size_in_bytes / (1024 * 1024)).toFixed(2)} MB
                    </Typography>
                  </Box>
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
}
