"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Stack,
  Paper,
  Pagination,
  Tooltip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { toggleUploadModal, toggleStatusModal } from "@/store/modules/newspaper/realeaseSlice.js";
import { useSelector, useDispatch } from "react-redux";
import UploadProof from './UploadProof'
import StatusModal from './StatusModal'

const MOCK_RELEASE_ORDERS = [
    {
      id: "RO-0012",
      title: "City Marathon 2025",
      department: "Editorial",
      releaseDate: "2025-11-06",
      publishDate: "2025-11-08",
      status: "Published",
      bill_status: "Processed",
      proof: "proof.pdf",
      amount: 12000,
      createdBy: "Ashish R.",
    },
    {
      id: "RO-0013",
      title: "New Ad Campaign",
      department: "Ads",
      releaseDate: "2025-11-05",
      publishDate: "2025-11-07",
      status: "Pending",
      bill_status: "Under Process",
      proof: null,
      amount: 20000,
      createdBy: "Nikita C.",
    },
    {
      id: "RO-0014",
      title: "Local Festival Story",
      department: "News",
      releaseDate: "2025-11-06",
      publishDate: "2025-11-09",
      status: "Rejected",
      bill_status: "Cancelled",
      proof: null,
      amount: 0,
      createdBy: "Raj P.",
    },
    {
      id: "RO-0015",
      title: "Sponsored Travel Feature",
      department: "Editorial",
      releaseDate: "2025-11-01",
      publishDate: "2025-11-03",
      status: "Published",
      bill_status: "Processed",
      proof: "travel-proof.pdf",
      amount: 15000,
      createdBy: "Priya S.",
    },
    {
      id: "RO-0016",
      title: "Weekly Business Roundup",
      department: "Business",
      releaseDate: "2025-10-30",
      publishDate: "2025-11-01",
      status: "Published",
      bill_status: "Approved",
      proof: "business.pdf",
      amount: 8000,
      createdBy: "Nikita C.",
    },
    {
      id: "RO-0017",
      title: "Tech Expo Coverage",
      department: "News",
      releaseDate: "2025-11-10",
      publishDate: null,
      status: "Pending",
      bill_status: "Verification Pending",
      proof: null,
      amount: 5000,
      createdBy: "Rohit K.",
    },
    {
      id: "RO-0018",
      title: "Sports Weekly Highlights",
      department: "Sports",
      releaseDate: "2025-11-02",
      publishDate: "2025-11-05",
      status: "Published",
      bill_status: "Paid",
      proof: "sports.pdf",
      amount: 6000,
      createdBy: "Amit S.",
    },
    {
      id: "RO-0019",
      title: "Real Estate Market Update",
      department: "Business",
      releaseDate: "2025-11-03",
      publishDate: "2025-11-04",
      status: "Pending",
      bill_status: "Payment Pending",
      proof: null,
      amount: 4500,
      createdBy: "Nikita C.",
    },
    {
      id: "RO-0020",
      title: "Health Awareness Column",
      department: "Lifestyle",
      releaseDate: "2025-10-29",
      publishDate: "2025-10-31",
      status: "Published",
      bill_status: "Sent to Client",
      proof: "health.pdf",
      amount: 3000,
      createdBy: "Priya S.",
    },
    {
      id: "RO-0021",
      title: "Government Policy Review",
      department: "Editorial",
      releaseDate: "2025-11-07",
      publishDate: null,
      status: "Rejected",
      bill_status: "Not Applicable",
      proof: null,
      amount: 0,
      createdBy: "Ashish R.",
    },
  ];
  
const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const statusColor = (status) => {
  if (status === "Published") return "success";
  if (status === "Pending") return "warning";
  if (status === "Rejected") return "error";
  return "default";
};

export default function ReleaseOrderListing() {
  // states
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("releaseDate");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const data = MOCK_RELEASE_ORDERS;

  // derived counts
  const counts = useMemo(() => {
    const total = data.length;
    const published = data.filter((r) => r.status === "Published").length;
    const pending = data.filter((r) => r.status === "Pending").length;
    const rejected = data.filter((r) => r.status === "Rejected").length;
    return { total, published, pending, rejected };
  }, [data]);

  // filtered, searched, sorted list
  const filtered = useMemo(() => {
    let list = data.slice();

    // search by id or title (case-insensitive)
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          (r.title && r.title.toLowerCase().includes(q)) ||
          (r.createdBy && r.createdBy.toLowerCase().includes(q))
      );
    }

    // filter by status
    if (statusFilter !== "All") {
      list = list.filter((r) => r.status === statusFilter);
    }

    // sort
    list.sort((a, b) => {
      const valA = sortBy === "amount" ? a.amount : a[sortBy] || "";
      const valB = sortBy === "amount" ? b.amount : b[sortBy] || "";
      if (sortBy === "releaseDate" || sortBy === "publishDate") {
        const da = a[sortBy] ? new Date(a[sortBy]).getTime() : 0;
        const db = b[sortBy] ? new Date(b[sortBy]).getTime() : 0;
        return sortDir === "asc" ? da - db : db - da;
      }
      if (typeof valA === "number" && typeof valB === "number") {
        return sortDir === "asc" ? valA - valB : valB - valA;
      }
      return sortDir === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    return list;
  }, [data, query, statusFilter, sortBy, sortDir]);

  const pageCount = Math.ceil(filtered.length / rowsPerPage);
  const pageRows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  /* -------------------------
     Actions
     ------------------------- */
  const handleExportCSV = () => {
    // simple CSV export
    const headers = [
      "RO ID",
      "Title",
      "Department",
      "Release Date",
      "Publish Date",
      "Ro Status",
      "Bill Status",
      "Proof",
      "Amount",
      "Created By",
    ];
    const rows = filtered.map((r) => [
      r.id,
      r.title,
      r.department,
      r.releaseDate || "",
      r.publishDate || "",
      r.status,
      r.bill_status,
      r.proof || "",
      r.amount,
      r.createdBy,
    ]);
    const csvContent = [headers, ...rows].map((e) => e.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `release-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNewRO = () => {
    // placeholder
    alert("New RO action (open modal / navigate to form)");
  };

  const handleView = (row) => {
    alert(`View ${row.id} — implement details modal or page`);
  };

  const handleEdit = (row) => {
    alert(`Edit ${row.id} — implement edit flow`);
  };


  const toggleSortDir = (key) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("desc");
    }
  };
  
  const dispatch = useDispatch();
  return (
    <Box sx={{ p: 3 }}>
      {/* Breadcrumb */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Home / Release Orders
      </Typography>

      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Release Orders Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track all newspaper release orders
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExportCSV}>
            Export
          </Button>
          {/* <Button variant="contained" startIcon={<AddIcon />} onClick={handleNewRO} sx={{ background: "linear-gradient(135deg,#FF7A00,#E65100)" }}>
            New RO
          </Button> */}
        </Stack>
      </Box>


      {/* Controls */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              placeholder="Search by RO ID, title or user..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3} md={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">Sort</Typography>
              <Button variant={sortBy === "releaseDate" ? "contained" : "outlined"} size="small" onClick={() => toggleSortDir("releaseDate")}>
                Release Date {sortBy === "releaseDate" && (sortDir === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
              </Button>
              <Button variant={sortBy === "amount" ? "contained" : "outlined"} size="small" onClick={() => toggleSortDir("amount")}>
                Amount {sortBy === "amount" && (sortDir === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3} sx={{ textAlign: { xs: "left", md: "right" } }}>
            <Tooltip title="Advanced filters">
              <IconButton><FilterListIcon /></IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>RO ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Client Name </TableCell>
              {/* <TableCell>Release Date</TableCell> */}
              <TableCell>Publish Date</TableCell>
              <TableCell>Ro Status</TableCell>
              <TableCell>Bill Status</TableCell>
              <TableCell>Proof</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  No results found
                </TableCell>
              </TableRow>
            )}

            {pageRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontWeight: 700 }}>{row.id}
                <div>{formatDate(row.releaseDate)}</div>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 600 }}>{row.title}</Typography>
                  <Typography variant="caption" color="text.secondary">Created by {row.createdBy}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={row.department} size="small" />
                </TableCell>
                {/* <TableCell>{formatDate(row.releaseDate)}</TableCell> */}
                <TableCell>
                  {row.publishDate
                    ? formatDate(row.publishDate)    // if date exists
                    : "not published"}
                </TableCell>
                <TableCell>
                  <Chip label={row.bill_status} size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={row.status} color={statusColor(row.status)} size="small" />
                </TableCell>
                <TableCell>
                  {row.proof ? (
                    <Button startIcon={<FilePresentIcon />} size="small" onClick={() => alert(`Download ${row.proof}`)}>
                      {row.proof}
                    </Button>
                  ) : (
                      <Button startIcon={<UploadFileIcon />} size="small" onClick={() => dispatch(toggleUploadModal())}>
                        Upload
                      </Button>
                    )}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" color="primary" onClick={() => handleView(row)}>
                      <VisibilityIcon />
                    </IconButton>
                    <Button onClick={() => dispatch(toggleStatusModal())} sx={{textTransform: 'capitalize', background: "linear-gradient(135deg, #FFA726 0%, #FB8C00 100%)", color: "#FFF" }}>change Status</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {(page - 1) * rowsPerPage + 1} - {Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}
          </Typography>

          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, v) => setPage(v)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      </Paper>
      <StatusModal />
      <UploadProof />
    </Box>
  );
}

