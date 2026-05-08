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
  Skeleton,
  InputAdornment,
  Divider,
  Badge,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import {
  toggleUploadModal,
  toggleStatusModal,
} from "@/store/modules/newspaper/realeaseSlice.js";
import {
  publishRO,
  getRODetails,
} from "@/store/modules/newspaper/realeaseSlice.js";
import { useSelector, useDispatch } from "react-redux";
import UploadProof from "./UploadProof";
import StatusModal from "./StatusModal";
import ROService from "@/services/ROServices";

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Published: { color: "#16a34a", bg: "#dcfce7", dot: "#22c55e" },
  Pending: { color: "#d97706", bg: "#fef3c7", dot: "#f59e0b" },
  Approved: { color: "#2563eb", bg: "#dbeafe", dot: "#3b82f6" },
  Rejected: { color: "#dc2626", bg: "#fee2e2", dot: "#ef4444" },
  Draft: { color: "#6b7280", bg: "#f3f4f6", dot: "#9ca3af" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Draft;
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        px: "10px",
        py: "4px",
        borderRadius: "20px",
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.color}22`,
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: cfg.dot,
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: cfg.color,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {status || "Unknown"}
      </Typography>
    </Box>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, accent }) {
  return (
    <Card
      elevation={0}
      sx={{
        p: "18px 22px",
        borderRadius: "14px",
        border: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: "#fff",
        flex: 1,
        minWidth: 160,
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "12px",
          backgroundColor: `${accent}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accent,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1.2, color: "#111" }}>
          {value}
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", color: "#888", fontWeight: 500, mt: "2px" }}>
          {label}
        </Typography>
      </Box>
    </Card>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <TableRow>
      {[80, 200, 180, 120, 90, 90, 120, 120, 100].map((w, i) => (
        <TableCell key={i}>
          <Skeleton variant="rounded" width={w} height={20} sx={{ borderRadius: 6 }} />
        </TableCell>
      ))}
    </TableRow>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────
const formatINR = (v) =>
  `₹ ${Number(v).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

const getAfterSlash = (str) => str?.split("/").pop() ?? str;

const ROWS_PER_PAGE = 10;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ReleaseOrderListing() {
  const [Rodata, setRoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => { loadUser(); }, []);

  const loadUser = async () => {
    try {
      const res = await ROService.getROList("000019");
      setRoData(res?.data?.data || []);
    } catch (err) {
      console.error("Error loading RO:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUploadDialog = (avak_ref_id, advt_no, ro_number) => {
    const payload = {
      show: true, avak_ref_id, advt_no,
      financial_year: "2024-2025",
      np_news_cd: getAfterSlash(ro_number),
      ro_no: ro_number, user_id: "00020",
    };
    dispatch(toggleUploadModal(payload));
    dispatch(getRODetails(payload));
  };

  const ToggleStatusDialog = (avak_ref_id, advt_no, ro_number) => {
    const payload = {
      show: true, avak_ref_id, advt_no,
      financial_year: "2024-2025",
      np_news_cd: getAfterSlash(ro_number),
      ro_no: ro_number, user_id: "00020",
    };
    dispatch(toggleStatusModal(payload));
    dispatch(getRODetails(payload));
  };

  // ── Derived stats ────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = Rodata.length;
    const published = Rodata.filter((r) => r.ro_status === "Published").length;
    const pending = Rodata.filter((r) => r.ro_status === "Pending").length;
    const revenue = Rodata.reduce((a, r) => a + Number(r.total_rate || 0), 0);
    return { total, published, pending, revenue };
  }, [Rodata]);

  // ── Filtering ────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let d = Rodata;
    if (statusFilter !== "All") d = d.filter((r) => r.ro_status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter(
        (r) =>
          r.subject?.toLowerCase().includes(q) ||
          r.client_name?.toLowerCase().includes(q) ||
          r.np_news_cd?.toLowerCase().includes(q)
      );
    }
    return d;
  }, [Rodata, search, statusFilter]);

  const paginated = useMemo(
    () => filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE),
    [filtered, page]
  );
  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);

  const statuses = ["All", ...Array.from(new Set(Rodata.map((r) => r.ro_status).filter(Boolean)))];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: "0.78rem" }}>
        Home &nbsp;/&nbsp; Release Orders
      </Typography>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.6rem",
              color: "#111",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Release Orders
          </Typography>
          <Typography variant="body2" sx={{ color: "#888", mt: "4px" }}>
            Manage and track all newspaper release orders
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<DownloadIcon sx={{ fontSize: "1rem" }} />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.82rem",
              borderRadius: "10px",
              px: 2,
              py: "7px",
              borderColor: "#e0e0e0",
              color: "#444",
              "&:hover": { borderColor: "#bbb", backgroundColor: "#fafafa" },
            }}
          >
            Export CSV
          </Button>
        </Stack>
      </Box>

      {/* ── Stat Cards ─────────────────────────────────────────────────── */}
      {!loading && (
        <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap" }}>
          <StatCard label="Total ROs" value={stats.total} icon={<NewspaperIcon fontSize="small" />} accent="#2563eb" />
          <StatCard label="Published" value={stats.published} icon={<CheckCircleOutlineIcon fontSize="small" />} accent="#16a34a" />
          <StatCard label="Pending" value={stats.pending} icon={<PendingActionsIcon fontSize="small" />} accent="#d97706" />
          <StatCard label="Total Revenue" value={formatINR(stats.revenue)} icon={<TrendingUpIcon fontSize="small" />} accent="#7c3aed" />
        </Stack>
      )}

      {/* ── Filter Bar ─────────────────────────────────────────────────── */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: "12px 16px",
          mb: 0,
          borderRadius: "14px 14px 0 0",
          border: "1px solid #ebebeb",
          borderBottom: "none",
          backgroundColor: "#fff",
          flexWrap: "wrap",
        }}
      >
        <TextField
          placeholder="Search by RO, subject, client…"
          size="small"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: "1rem", color: "#aaa" }} />
              </InputAdornment>
            ),
            sx: { borderRadius: "10px", fontSize: "0.83rem", backgroundColor: "#f9f9f9" },
          }}
          sx={{ minWidth: 240, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8e8e8" } }}
        />

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {statuses.map((s) => (
            <Chip
              key={s}
              label={s}
              size="small"
              onClick={() => { setStatusFilter(s); setPage(1); }}
              sx={{
                fontWeight: 600,
                fontSize: "0.75rem",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: statusFilter === s ? "#111" : "#f3f4f6",
                color: statusFilter === s ? "#fff" : "#555",
                border: "none",
                "&:hover": { backgroundColor: statusFilter === s ? "#333" : "#e5e7eb" },
                transition: "all 0.15s ease",
              }}
            />
          ))}
        </Stack>

        <Typography sx={{ ml: "auto", fontSize: "0.78rem", color: "#aaa", whiteSpace: "nowrap" }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </Typography>
      </Paper>

      {/* ── Table ──────────────────────────────────────────────────────── */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #ebebeb",
          borderTop: "none",
          borderRadius: "0 0 14px 14px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fafafa" }}>
                {[
                  "RO No.",
                  "Subject / Date",
                  "Client",
                  "Publish Date",
                  "Total Rate",
                  "Size (L × W)",
                  "Status",
                  "Published Proof",
                  "Actions",
                ].map((h, i) => (
                  <TableCell
                    key={h}
                    align={i === 8 ? "right" : "left"}
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      color: "#888",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: "1px solid #f0f0f0",
                      py: "12px",
                      px: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading
                ? [...Array(8)].map((_, i) => <SkeletonRow key={i} />)
                : paginated.length === 0
                ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <NewspaperIcon sx={{ fontSize: "2.5rem", color: "#ddd" }} />
                        <Typography sx={{ color: "#bbb", fontWeight: 600, fontSize: "0.9rem" }}>
                          No release orders found
                        </Typography>
                        <Typography sx={{ color: "#ddd", fontSize: "0.78rem" }}>
                          Try adjusting your search or filter
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
                : paginated.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#fafbff" },
                      "&:last-child td": { borderBottom: "none" },
                      transition: "background 0.12s ease",
                    }}
                  >
                    {/* RO No */}
                    <TableCell sx={{ px: "16px", py: "14px", borderBottom: "1px solid #f5f5f5" }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          color: "#1d4ed8",
                          fontFamily: "monospace",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {row.np_news_cd}
                      </Typography>
                    </TableCell>

                    {/* Subject */}
                    <TableCell sx={{ px: "16px", py: "14px", borderBottom: "1px solid #f5f5f5", maxWidth: 260 }}>
                      <Tooltip title={row.subject} arrow>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "0.84rem",
                            color: "#111",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: 240,
                          }}
                        >
                          {row.subject}
                        </Typography>
                      </Tooltip>
                      <Typography sx={{ fontSize: "0.72rem", color: "#aaa", mt: "2px" }}>
                        {row.ro_date || "—"}
                      </Typography>
                    </TableCell>

                    {/* Client */}
                    <TableCell sx={{ px: "16px", py: "14px", borderBottom: "1px solid #f5f5f5", maxWidth: 200 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar
                          sx={{
                            width: 28,
                            height: 28,
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            backgroundColor: "#e0e7ff",
                            color: "#4338ca",
                            flexShrink: 0,
                          }}
                        >
                          {row.client_name?.[0]?.toUpperCase()}
                        </Avatar>
                        <Tooltip title={row.client_name} arrow>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.83rem",
                              color: "#333",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: 160,
                            }}
                          >
                            {row.client_name}
                          </Typography>
                        </Tooltip>
                      </Stack>
                    </TableCell>

                    {/* Publish Date */}
                    <TableCell sx={{ px: "16px", py: "14px", borderBottom: "1px solid #f5f5f5" }}>
                      <Typography sx={{ fontSize: "0.82rem", color: row.sch_pub_date ? "#333" : "#bbb", fontWeight: row.sch_pub_date ? 500 : 400 }}>
                        {row.sch_pub_date || "Not scheduled"}
                      </Typography>
                    </TableCell>

                    {/* Total Rate */}
                    <TableCell sx={{ px: "16px", py: "14px", borderBottom: "1px solid #f5f5f5" }}>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#111" }}>
                        {formatINR(row.total_rate)}
                      </Typography>
                    </TableCell>

                    {/* Size */}
                    <TableCell sx={{ px: "16px", py: "14px", borderBottom: "1px solid #f5f5f5" }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          px: "10px",
                          py: "3px",
                          borderRadius: "8px",
                          backgroundColor: "#f3f4f6",
                          fontFamily: "monospace",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#555",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.size_row} × {row.size_col}
                      </Box>
                    </TableCell>

                    {/* Status */}
                    <TableCell sx={{ px: "16px", py: "14px", borderBottom: "1px solid #f5f5f5" }}>
                      <StatusBadge status={row.ro_status} />
                    </TableCell>

                    {/* Published Proof */}
                    <TableCell sx={{ px: "16px", py: "14px", borderBottom: "1px solid #f5f5f5" }}>
                      {row.proof ? (
                        <Button
                          startIcon={<FilePresentIcon sx={{ fontSize: "0.9rem" }} />}
                          size="small"
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.78rem",
                            borderRadius: "8px",
                            color: "#16a34a",
                            backgroundColor: "#dcfce7",
                            px: "10px",
                            py: "4px",
                            "&:hover": { backgroundColor: "#bbf7d0" },
                          }}
                        >
                          View Proof
                        </Button>
                      ) : (
                        <Button
                          startIcon={<UploadFileIcon sx={{ fontSize: "0.9rem" }} />}
                          size="small"
                          onClick={() =>
                            toggleUploadDialog(row.avak_ref_id, row.advt_no, row.np_news_cd)
                          }
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.78rem",
                            borderRadius: "8px",
                            color: "#6366f1",
                            backgroundColor: "#eef2ff",
                            px: "10px",
                            py: "4px",
                            "&:hover": { backgroundColor: "#e0e7ff" },
                          }}
                        >
                          Upload
                        </Button>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right" sx={{ px: "16px", py: "14px", borderBottom: "1px solid #f5f5f5" }}>
                      <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                        <Tooltip title="View details" arrow>
                          <IconButton
                            size="small"
                            sx={{
                              color: "#888",
                              "&:hover": { backgroundColor: "#f3f4f6", color: "#333" },
                              borderRadius: "8px",
                            }}
                          >
                            <VisibilityIcon sx={{ fontSize: "1rem" }} />
                          </IconButton>
                        </Tooltip>

                        <Button
                          onClick={() =>
                            ToggleStatusDialog(row.avak_ref_id, row.advt_no, row.np_news_cd)
                          }
                          size="small"
                          sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "0.78rem",
                            px: "14px",
                            py: "5px",
                            borderRadius: "8px",
                            backgroundColor: "#111",
                            color: "#fff",
                            whiteSpace: "nowrap",
                            "&:hover": { backgroundColor: "#333" },
                            transition: "background 0.15s ease",
                          }}
                        >
                          Update Status
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>

        {/* ── Pagination ──────────────────────────────────────────────── */}
        {!loading && filtered.length > ROWS_PER_PAGE && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: "16px",
              py: "12px",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Typography sx={{ fontSize: "0.78rem", color: "#aaa" }}>
              Showing {(page - 1) * ROWS_PER_PAGE + 1}–
              {Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, v) => setPage(v)}
              size="small"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "0.78rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                },
                "& .Mui-selected": {
                  backgroundColor: "#111 !important",
                  color: "#fff",
                },
              }}
            />
          </Box>
        )}
      </Paper>

      <StatusModal />
      <UploadProof />
    </Box>
  );
}