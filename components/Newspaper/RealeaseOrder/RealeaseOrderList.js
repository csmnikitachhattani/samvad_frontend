"use client";
import React, { useMemo, useState, useEffect } from "react";
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
import ROService from "@/services/ROServices";

const MOCK_RELEASE_ORDERS = [
  
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
  const [Rodata , setRoData] = useState([])
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    try {
      const res = await ROService.getROList('000019');
      console.log(res?.data.data)
      let rodata = res?.data?.data
      setRoData(rodata)
    } catch (err) {
      console.error("Error loading GST:", err);
    }
  };
  // states
  const formatINR = (value) => `₹ ${Number(value).toLocaleString("en-IN")}`;
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("releaseDate");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const data = MOCK_RELEASE_ORDERS;

  // derived counts
  // const counts = useMemo(() => {
  //   const total = data.length;
  //   const published = data.filter((r) => r.status === "Published").length;
  //   const pending = data.filter((r) => r.status === "Pending").length;
  //   const rejected = data.filter((r) => r.status === "Rejected").length;
  //   return { total, published, pending, rejected };
  // }, [data]);

  // // filtered, searched, sorted list
  // const filtered = useMemo(() => {
  //   let list = data.slice();

  //   // search by id or title (case-insensitive)
  //   if (query.trim()) {
  //     const q = query.trim().toLowerCase();
  //     list = list.filter(
  //       (r) =>
  //         r.id.toLowerCase().includes(q) ||
  //         (r.title && r.title.toLowerCase().includes(q)) ||
  //         (r.createdBy && r.createdBy.toLowerCase().includes(q))
  //     );
  //   }

  //   // filter by status
  //   if (statusFilter !== "All") {
  //     list = list.filter((r) => r.status === statusFilter);
  //   }

  //   // sort
  //   list.sort((a, b) => {
  //     const valA = sortBy === "amount" ? a.amount : a[sortBy] || "";
  //     const valB = sortBy === "amount" ? b.amount : b[sortBy] || "";
  //     if (sortBy === "releaseDate" || sortBy === "publishDate") {
  //       const da = a[sortBy] ? new Date(a[sortBy]).getTime() : 0;
  //       const db = b[sortBy] ? new Date(b[sortBy]).getTime() : 0;
  //       return sortDir === "asc" ? da - db : db - da;
  //     }
  //     if (typeof valA === "number" && typeof valB === "number") {
  //       return sortDir === "asc" ? valA - valB : valB - valA;
  //     }
  //     return sortDir === "asc"
  //       ? String(valA).localeCompare(String(valB))
  //       : String(valB).localeCompare(String(valA));
  //   });

  //   return list;
  // }, [data, query, statusFilter, sortBy, sortDir]);

  // const pageCount = Math.ceil(filtered.length / rowsPerPage);
  // const pageRows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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


      {/* Table */}
      <Paper>
      <Paper>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>RO No.</TableCell>
        <TableCell>Subject</TableCell>
        <TableCell>Client Name</TableCell>
        <TableCell>Publish Date</TableCell>
        <TableCell>Total Rate</TableCell>
        <TableCell>Content Size(L*W)</TableCell>
        <TableCell>Published Proof</TableCell>
        <TableCell align="right">Update Publish Status</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {Rodata?.map((row, index) => (
        <TableRow key={index} hover>
          <TableCell>
          <Typography sx={{ fontWeight: 600, width: '100px' }}>{row.np_news_cd}</Typography>
          </TableCell>
          {/* Subject */}
          <TableCell>
            <Typography sx={{ fontWeight: 600, width: '250px' }}>{row.subject.substring(0,50)}</Typography>
            <Typography variant="caption" color="text.secondary">
              RO Date: {row.ro_date || "—"}
            </Typography>
          </TableCell>

          {/* Client Name */}
          <TableCell>
            <Typography sx={{ fontWeight: 600, width: '250px' }}>{row.client_name.substring(0,50)}</Typography>
          </TableCell>

          {/* Publish Date */}
          <TableCell>
            {row.sch_pub_date ? row.sch_pub_date : "Not Published"}
          </TableCell>

          {/* Total Rate */}
          <TableCell>
          <Typography>{formatINR(row.total_rate)}</Typography>
          </TableCell>

          {/* Total Rate */}
          <TableCell>
            <Typography>{row.size_row} X {row.size_col}</Typography>
          </TableCell>

          {/* Proof Upload / View */}
          <TableCell>
            {row.proof ? (
              <Button
                startIcon={<FilePresentIcon />}
                size="small"
                onClick={() => alert(`Download proof: ${row.proof}`)}
              >
                {row.proof}
              </Button>
            ) : (
              <Button
                startIcon={<UploadFileIcon />}
                size="small"
                onClick={() => dispatch(toggleUploadModal())}
              >
                Upload Publish Copy
              </Button>
            )}
          </TableCell>

          {/* Actions */}
          <TableCell align="right">
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <IconButton
                size="small"
                color="primary"
                onClick={() => handleView(row)}
              >
                <VisibilityIcon />
              </IconButton>
              <Button
  onClick={() => dispatch(toggleStatusModal())}
  sx={{
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "6px 18px",
    borderRadius: "30px",
    background: "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)",
    color: "#fff",
    boxShadow: "0 3px 10px rgba(255, 152, 0, 0.3)",
    transition: "all 0.25s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #FB8C00 0%, #EF6C00 100%)",
      boxShadow: "0 4px 14px rgba(255, 152, 0, 0.45)",
      transform: "translateY(-2px)",
    },
  }}
>
  Update
</Button>

            </Stack>
          </TableCell>

        </TableRow>
      ))}
    </TableBody>
  </Table>
</Paper>


        
      </Paper>
      <StatusModal />
      <UploadProof />
    </Box>
  );
}

