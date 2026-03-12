"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import parse from "html-react-parser";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

// MUI Imports
import {
  Box, Card, CardContent, Typography, TextField, Select, MenuItem,
  FormControl, InputLabel, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Pagination, Chip,
  CircularProgress, Alert, Stack, Divider, Avatar, IconButton,
  Tooltip, Badge, InputAdornment, alpha, createTheme, ThemeProvider,
  CssBaseline, GlobalStyles,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import FilterListIcon from "@mui/icons-material/FilterList";
import AttachFileIcon from "@mui/icons-material/AttachFile";

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary:   { main: "#6EE7B7", contrastText: "#0F1117" },
    secondary: { main: "#818CF8" },
    error:     { main: "#F87171" },
    warning:   { main: "#FBBF24" },
    background:{ default: "#ffffff", paper: "#1A1D2E" },
    text:      { primary: "#E2E8F0", secondary: "#94A3B8" },
  },
  typography: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    h5: { fontWeight: 700, letterSpacing: "-0.5px" },
    h6: { fontWeight: 600 },
    body2: { fontSize: "0.8rem" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#eaebef",
          color: "#313131",
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(110,231,183,0.2)",
          padding: "12px 16px",
          whiteSpace: "nowrap",
        },
        body: {
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          padding: "10px 16px",
          fontSize: "0.82rem",
          color: "#CBD5E1",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(239, 248, 244, 0.04)",
            transition: "background-color 0.15s ease",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.06)",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.12)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(110,231,183,0.4)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6EE7B7",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: "none", fontWeight: 600 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600, fontSize: "0.72rem" },
      },
    },
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
const RECORDS_PER_PAGE = 10;

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
};

const statusColor = (status) => {
  const s = (status || "").toString().toLowerCase();

  if (s.includes("accept")) return "success";
  if (s.includes("reject") || s.includes("unaccept")) return "error";
  if (s.includes("process")) return "warning";
  if (s.includes("forward")) return "info";
  return "default";
};

// ─── Component ────────────────────────────────────────────────────────────────
const Report = () => {
  const financial_year = typeof window !== "undefined" ? localStorage.getItem("financial_year") : null;
  const user_id        = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  const [actionType, setactionType]           = useState("get");
  const [data, setData]               = useState([]);
  const [search, setSearch]           = useState("");
  const [loading, setLoading]         = useState(false);
  const [category, setCategory]       = useState("02");
  const [categoryList, setCategoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // ── API ──
  const loadCategory = useCallback(async () => {
    try {
      const res = await axios.get("http://103.79.34.50:8083/api/Client/getavakcategories");
      setCategoryList(res.data?.data || res.data || []);
      // console.log("Category List:", res.data?.data || res.data || []);
    } catch (err) {
      console.error("Category Load Error:", err);
      setCategoryList([]);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // const res = await axios.get("http://localhost:3080/api/get-client-advt-request", {
      const res = await axios.get("http://103.79.34.50:8083/api/Client/getclientadvtrequests", {
        params: {
financial_year: financial_year, user_id:user_id, action:actionType, 
category: category },
      });
      setData(res.data?.data || []);
      console.log("Fetched Data:", res.data?.data || res.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [financial_year, user_id, actionType, category]);

  useEffect(() => { loadCategory(); }, [loadCategory]);
  useEffect(() => { if (actionType && category) fetchData(); }, [fetchData]);

  // ── Filter ──
  const filteredData = useMemo(() =>
    data.filter((item) => {
      const ref_IdMatch   = (item.ref_Id || "").toLowerCase().includes(search.toLowerCase());
      const categoryMatch = category ? Number(item.ref_Category_Id) === Number(category) : true;
      return ref_IdMatch && categoryMatch;
    }),
    [data, search, category]
  );

  // ── Pagination ──
  const totalPages  = Math.ceil(filteredData.length / RECORDS_PER_PAGE);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * RECORDS_PER_PAGE;
    return filteredData.slice(start, start + RECORDS_PER_PAGE);
  }, [filteredData, currentPage]);

  // ── Export ──
  const getExportData = () =>
    currentRows.map((item, index) => ({
      "Sn": (currentPage - 1) * RECORDS_PER_PAGE + index + 1,
      "Ref ID": item.ref_Id,
      "Subject": item.subject,
      "Tender Amount": item.tender_Amt,
      "Letter No": item.letter_No,
      "Letter Date": formatDate(item.letter_Date),
      "Schedule Date": formatDate(item.schedule_Date),
      "Category": item.ref_Category_Text,
      "National NP": item.print_In_National_Np,
      "State NP": item.print_In_State_Np,
      "Local NP": item.print_In_Local_Np,
      "Other NP": item.print_In_Other_Np,
      "Status": item.status,
    }));

  const exportCurrentPageExcel = () => {
    if (!currentRows.length) return;
    const ws = XLSX.utils.json_to_sheet(getExportData());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Page_${currentPage}`);
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf], { type: "application/octet-stream" }), `Client_Advt_Request_Page_${currentPage}.xlsx`);
  };

  const exportCurrentPagePDF = () => {
    if (!currentRows.length) { alert("No data to export"); return; }
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    doc.setFontSize(14);
    doc.text(`Client Advertisement Requests (Page ${currentPage})`, 14, 15);
    doc.autoTable({
      head: [["Sn","Ref ID","Subject","Tender","Letter Date","Schedule Date","Category","Status"]],
      body: currentRows.map((item, index) => [
        (currentPage - 1) * RECORDS_PER_PAGE + index + 1,
        item.ref_Id || "", item.subject || "", item.tender_Amt || "",
        formatDate(item.letter_Date), formatDate(item.schedule_Date),
        item.ref_Category_Text || "", item.status || "",
      ]),
      startY: 22,
      styles: { fontSize: 8 },
      theme: "grid",
    });
    doc.save(`Client_Advt_Request_Page_${currentPage}.pdf`);
  };

  // ── actionTypes ──
  const handleEdit   = (id) => console.log("Edit:", id);
  const handleDelete = (id) => console.log("Delete:", id);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        "@import": "url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap')",
        body: { background: "#fcfcfc" },
        "::-webkit-scrollbar": { width: 6, height: 6 },
        "::-webkit-scrollbar-track": { background: "transparent" },
        "::-webkit-scrollbar-thumb": { background: "#334155", borderRadius: 3 },
      }} />

      <Box sx={{ minHeight: "100vh", background: "#ffffff", p: { xs: 2, md:   2} }}>

        {/* ── Header ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Avatar sx={{ bgcolor: alpha("#1a9e69", 0.15), width: 48, height: 48 }}>
            <AnnouncementIcon sx={{ color: "#010e09" }} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: "#11171f" }}>
              {/* Client Advertisement Requests */}
              Report
            </Typography>
            {/* <Typography variant="body2" sx={{ color: "#64748B" }}>
              Finacial Year {financial_year || "—"}
            </Typography> */}
          </Box>

          <Box sx={{ ml: "auto", display: "flex", gap: 1.5 }}>
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={exportCurrentPageExcel}
              size="small"
              sx={{
                bgcolor: alpha("#064b63", 0.15),
                color: "#222524",
                border: "1px solid",
                borderColor: alpha("#141a17", 0.3),
                "&:hover": { bgcolor: alpha("#111715", 0.25) },
              }}
            >
              Excel
            </Button>
            <Button
              variant="contained"
              startIcon={<PictureAsPdfIcon />}
              onClick={exportCurrentPagePDF}
              size="small"
              sx={{
                bgcolor: alpha("#F87171", 0.12),
                color: "#F87171",
                border: "1px solid",
                borderColor: alpha("#F87171", 0.3),
                "&:hover": { bgcolor: alpha("#F87171", 0.22) },
              }}
            >
              PDF
            </Button>
          </Box>
        </Box>

        {/* ── Filter Card ── */}
      
        <Card
  sx={{
    mb: 3,
    background: "#eff0f5",
    color: "#11171f",
    "& .MuiInputLabel-root": {
      color: "#11171f",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#11171f",
    },
    "& .MuiOutlinedInput-input": {
      color: "#11171f",
    },
    "& .MuiSelect-select": {
      color: "#11171f",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#94a3b8",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1a9e69",
    },
    "& .MuiSelect-icon": {
  color: "#11171f",
},
  }}
>
          <CardContent sx={{ p: "12px !important" }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <FilterListIcon sx={{ color: "#171b19", fontSize: 18 }} />
              <Typography variant="body2" sx={{ color: "#0f1b2d", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Filters
              </Typography>
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
                >
                  <MenuItem value=""><em>All Categories</em></MenuItem>
                  {categoryList.map((c) => (
                    <MenuItem key={c.catId} value={c.catId}>
                      {c.catText?.split("-")[0]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel>actionType / Status</InputLabel>
                <Select
                  label="actionType / Status"
                  value={actionType}
                  onChange={(e) => { setactionType(e.target.value); setCurrentPage(1); }}
                >
                  <MenuItem value="get">Get All</MenuItem>
                  <MenuItem value="get_forwarded">Forwarded</MenuItem>
                  <MenuItem value="get_not_forwarded">Not Forwarded</MenuItem>
                  <MenuItem value="get_under_process">Under Process</MenuItem>
                  <MenuItem value="get_all_accepted">Accepted</MenuItem>
                  <MenuItem value="get_all_unaccepted">Unaccepted</MenuItem>
                </Select>
              </FormControl>

              <TextField
                size="small"
                label="Search Reference ID"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#171818", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1, maxWidth: 340 }}
              />

              <Box sx={{ ml: "auto !important", display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ color: "#42454a" , fontWeight: 800 }}>
                  {filteredData.length} records
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* ── Table ── */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#6EE7B7" }} />
          </Box>
        )}

        {!loading && currentRows.length === 0 && (
          <Alert severity="info" sx={{ background: alpha("#818CF8", 0.1), color: "#C7D2FE", border: "1px solid", borderColor: alpha("#818CF8", 0.2) }}>
            No records found for the selected filters.
          </Alert>
        )}

        {!loading && currentRows.length > 0 && (
          <Card sx={{ background: "#ffffff", overflow: "hidden" }}>
            <TableContainer component={Paper} sx={{ background: "transparent", boxShadow: "none", height:"100vh" }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    {["Sn","Ref ID","Subject","Tender Amt","Letter No / Date","Schedule Date","Category","Print on NP","Attachment","Status","action"].map((h) => (
                      <TableCell key={h}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentRows.map((item, idx) => (
                    // <TableRow key={item.ref_Id}>
                    <TableRow
  key={item.ref_Id}
  sx={{
    borderBottom: "1px solid rgba(148, 163, 184, 0.15)", // visible soft border
    transition: "all 0.2s ease",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(110, 231, 183, 0.08)", // smooth green hover (matches your theme)
      borderBottom: "1px solid rgba(148, 163, 184, 0.35)", // stronger on hover
    },
  }}
>
                      <TableCell sx={{ color: "#171818", width: 40 }}>
                        {(currentPage - 1) * RECORDS_PER_PAGE + idx + 1}
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: "#1D4ED8", fontWeight: 700, fontFamily: "monospace" }}>
                          {item.ref_Id}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ maxWidth: 180 }}>
                        <Tooltip title={item.subject} arrow>
                          <Typography variant="body2" sx={{
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160,color: "#313232" 
                          }}>
                            {item.subject}
                          </Typography>
                        </Tooltip>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: "#040404", fontWeight: 700 }}>
                          {item.tender_Amt ? `₹ ${item.tender_Amt}` : "—"}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 ,color: "#313232"}}>{item.letter_No} /</Typography>
                        <Typography variant="caption" sx={{ color: "#313232" }}>{formatDate(item.letter_Date)}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: "#313232" }}>{formatDate(item.schedule_Date)}</Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={item.ref_Category_Text || "—"}
                          size="small"
                          sx={{ bgcolor: alpha("#4254f2", 0.15), color: "#122058", border: "1px solid", borderColor: alpha("#3142e0", 0.25) }}
                        />
                      </TableCell>

                      <TableCell>
                        <Stack spacing={0.3}>
                          {[
                            { label: "National", val: item.print_In_National_Np },
                            { label: "State",    val: item.print_In_State_Np },
                            { label: "Local",    val: item.print_In_Local_Np },
                            { label: "Others",  val: item.print_In_Other_Np },
                          ].map(({ label, val }) => (
                            <Typography key={label} variant="caption" sx={{ color: "#94A3B8" }}>
                              <Box component="span" sx={{ color: "#64748B" }}>{label}: </Box>
                              {val || "0"}
                            </Typography>
                          ))}
                        </Stack>
                      </TableCell>

                      <TableCell>
                        {item.count_attachment ? (
                          <Badge badgeContent={parse(String(item.count_attachment))} color="secondary">
                            <AttachFileIcon sx={{ color: "#818CF8", fontSize: 18 }} />
                          </Badge>
                        ) : (
                          <Typography variant="caption" sx={{ color: "#334155" }}>—</Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={item.status || "—"}
                          size="small"
                          color={statusColor(item.status)}
                          variant="outlined"
                        />
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(item.ref_Id)}
                              sx={{
                                color: "#FBBF24",
                                bgcolor: alpha("#FBBF24", 0.08),
                                "&:hover": { bgcolor: alpha("#FBBF24", 0.18) },
                              }}
                            >
                              <EditIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(item.ref_Id)}
                              sx={{
                                color: "#F87171",
                                bgcolor: alpha("#F87171", 0.08),
                                "&:hover": { bgcolor: alpha("#F87171", 0.18) },
                              }}
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* ── Footer ── */}
            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 1.5 }}>
              <Typography variant="caption" sx={{ color: "#475569" }}>
                Showing {(currentPage - 1) * RECORDS_PER_PAGE + 1}–{Math.min(currentPage * RECORDS_PER_PAGE, filteredData.length)} of {filteredData.length}
              </Typography>
              {totalPages > 1 && (
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, val) => setCurrentPage(val)}
                  size="small"
                  sx={{
                    "& .MuiPaginationItem-root": { color: "#64748B", borderColor: "rgba(255,255,255,0.08)" },
                    "& .Mui-selected": { bgcolor: alpha("#6EE7B7", 0.18), color: "#6EE7B7", borderColor: alpha("#6EE7B7", 0.4) },
                  }}
                  variant="outlined"
                  shape="rounded"
                />
              )}
            </Box>
          </Card>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Report;