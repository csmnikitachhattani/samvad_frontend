"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import outdoorServices from "@/services/outdoorServices";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  Chip,
  Skeleton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// ── Shared styles ─────────────────────────────────────────────────────────────
const searchField = {
  minWidth: 300,
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8f9fb",
    fontSize: "0.85rem",
    "& fieldset": { borderColor: "#e4e6ef", borderWidth: "1.5px" },
    "&:hover fieldset": { borderColor: "#c5cadc" },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 0 0 3px rgba(1,10,42,0.08)",
      "& fieldset": { borderColor: "#010a2a", borderWidth: "1.5px" },
    },
  },
  "& .MuiInputBase-input": { color: "#111827" },
};

const headCell = {
  fontWeight: 700,
  fontSize: "0.7rem",
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
  backgroundColor: "#f8f9fb",
  borderBottom: "1.5px solid #e9eaf0",
  whiteSpace: "nowrap",
  py: 1.6,
};

const bodyCell = {
  borderBottom: "1px solid #f0f1f6",
  py: 2,
  verticalAlign: "top",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      })
    : "—";

const fmtCurrency = (n) =>
  n != null ? `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "—";

// ── Mini components ───────────────────────────────────────────────────────────
function WoNumberBadge({ value }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        px: 1.4,
        py: 0.5,
        borderRadius: "8px",
        backgroundColor: "#e8eaf6",
        border: "1px solid #c5cae9",
        fontWeight: 700,
        fontSize: "0.78rem",
        color: "#010a2a",
        whiteSpace: "nowrap",
        letterSpacing: "0.2px",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path d="M9 12h6M9 16h4M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="#010a2a" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
      {value || "—"}
    </Box>
  );
}

function DateRangePill({ start, end }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 1.2,
        py: 0.4,
        borderRadius: "8px",
        backgroundColor: "#f0fdf4",
        border: "1px solid #bbf7d0",
        fontSize: "0.74rem",
        fontWeight: 600,
        color: "#15803d",
        whiteSpace: "nowrap",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke="#15803d" strokeWidth="2"/>
        <path d="M16 2v4M8 2v4M3 10h18" stroke="#15803d" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {fmt(start)} → {fmt(end)}
    </Box>
  );
}

function FinancialRow({ label, value, highlight }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
      <Typography variant="caption" sx={{ color: "#9ca3af", whiteSpace: "nowrap" }}>
        {label}
      </Typography>
      <Typography
        variant="caption"
        fontWeight={highlight ? 800 : 600}
        sx={{ color: highlight ? "#15803d" : "#374151" }}
      >
        {value}
      </Typography>
    </Box>
  );
}

// ── Action button ─────────────────────────────────────────────────────────────
const actionBtn = (color = "#010a2a", bg = "#e8eaf6") => ({
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.75rem",
  px: 1.5,
  py: 0.6,
  backgroundColor: bg,
  color: color,
  boxShadow: "none",
  border: `1px solid ${color}22`,
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: color,
    color: "#fff",
    boxShadow: `0 3px 10px ${color}35`,
    transform: "translateY(-1px)",
  },
  transition: "all 0.18s ease",
});

// ── Skeleton ──────────────────────────────────────────────────────────────────
function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i}>
      {Array.from({ length: 7 }).map((__, j) => (
        <TableCell key={j} sx={{ borderBottom: "1px solid #f0f1f6", py: 2 }}>
          <Skeleton variant="text" width={j === 6 ? 90 : "80%"} height={18} sx={{ borderRadius: 4 }} />
          {(j === 1 || j === 4) && (
            <Skeleton variant="text" width="55%" height={14} sx={{ borderRadius: 4, mt: 0.5 }} />
          )}
        </TableCell>
      ))}
    </TableRow>
  ));
}

// ── Main component ─────────────────────────────────────────────────────────────
const WorkOrderTable = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await outdoorServices.getOutdoorWorkorderList();
        console.log(response)
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch work orders", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredRows = data.filter((row) => {
    const term = search.toLowerCase();
    return (
      (row.wo_no || "").toLowerCase().includes(term) ||
      (row.job_no || "").toLowerCase().includes(term) ||
      (row.wo_subject || "").toLowerCase().includes(term) ||
      (row.vendor_name || "").toLowerCase().includes(term) ||
      (row.avak_ref_id || "").toLowerCase().includes(term)
    );
  });

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        borderRadius: "18px",
        border: "1.5px solid #e9eaf0",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          background: "linear-gradient(135deg, #fafbff 0%, #f5f6fa 100%)",
          borderBottom: "1.5px solid #ebebf0",
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "11px",
              background: "#010a2a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(1,10,42,0.28)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12h6M9 16h4" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#111827", letterSpacing: "-0.2px" }}>
              Work Orders
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {loading ? "Loading…" : `${filteredRows.length} record${filteredRows.length !== 1 ? "s" : ""} found`}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          <TextField
            size="small"
            placeholder="Search WO No, Job, Subject, Vendor…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            sx={searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 17, color: "#9ca3af" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => router.push("/admin/work-order/new")}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.8rem",
              px: 2.5,
              background: "#010a2a",
              boxShadow: "0 3px 10px rgba(1,10,42,0.28)",
              whiteSpace: "nowrap",
              "&:hover": { background: "#0d1b4b", transform: "translateY(-1px)" },
              transition: "all 0.18s ease",
            }}
          >
            + New WO
          </Button>
        </Box>
      </Box>

      {/* ── Table ── */}
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {["WO Details", "Job / AVAK", "Vendor", "Duration", "Financials", "Entry Info", "Actions"].map((h) => (
                <TableCell key={h} sx={headCell}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableSkeleton />
            ) : filteredRows.length > 0 ? (
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#fafbff" },
                      "&:last-child td": { borderBottom: "none" },
                      transition: "background 0.15s ease",
                    }}
                  >
                    {/* WO Details */}
                    <TableCell sx={{ ...bodyCell, minWidth: 200 }}>
                      <WoNumberBadge value={row.wo_no} />
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ color: "#111827", mt: 0.8, fontSize: "0.82rem", lineHeight: 1.3 }}
                      >
                        {row.wo_subject || "—"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.3 }}>
                        {fmt(row.wo_date)} · FY {row.financial_year}
                      </Typography>
                    </TableCell>

                    {/* Job / AVAK */}
                    <TableCell sx={{ ...bodyCell, minWidth: 150 }}>
                      <Box display="flex" flexDirection="column" gap={0.5}>
                        <Box display="flex" alignItems="center" gap={0.6}>
                          <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", width: 34 }}>Job</Typography>
                          <Typography variant="caption" fontWeight={700} sx={{ color: "#374151" }}>{row.job_no || "—"}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.6}>
                          <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", width: 34 }}>Avak</Typography>
                          <Typography variant="caption" fontWeight={700} sx={{ color: "#374151" }}>{row.avak_ref_id || "—"}</Typography>
                        </Box>
                        {row.dpr_job_ref_no && (
                          <Box display="flex" alignItems="center" gap={0.6}>
                            <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", width: 34 }}>DPR</Typography>
                            <Typography variant="caption" fontWeight={700} sx={{ color: "#374151" }}>{row.dpr_job_ref_no}</Typography>
                          </Box>
                        )}
                        <Box display="flex" gap={0.5} mt={0.3}>
                          <Chip
                            label={`Svc ${row.od_servicetype_id}`}
                            size="small"
                            sx={{ borderRadius: "6px", backgroundColor: "#f0f4ff", color: "#4f46e5", fontWeight: 700, fontSize: "0.67rem", border: "1px solid #c7d2fe", height: 20 }}
                          />
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Vendor */}
                    <TableCell sx={{ ...bodyCell, minWidth: 160 }}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: "#111827", fontSize: "0.82rem" }}>
                        {row.vendor_name || "—"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.3 }}>
                        ID: {row.vendor_id}
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={0.2} mt={0.5}>
                        <Typography variant="caption" sx={{ color: "#b0b5c4", fontSize: "0.7rem" }}>
                          Client: <span style={{ color: "#6b7280", fontWeight: 600 }}>{row.client_cd}</span>
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#b0b5c4", fontSize: "0.7rem" }}>
                          Grp: <span style={{ color: "#6b7280", fontWeight: 600 }}>{row.client_grp_cd}</span>
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Duration */}
                    <TableCell sx={{ ...bodyCell, minWidth: 180 }}>
                      <DateRangePill start={row.start_date} end={row.end_date} />
                    </TableCell>

                    {/* Financials */}
                    <TableCell sx={{ ...bodyCell, minWidth: 190 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: "10px",
                          backgroundColor: "#f8f9fb",
                          border: "1px solid #e9eaf0",
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <FinancialRow label={`Commission (${row.commision_Percentage}%)`} value={fmtCurrency(row.commission_amount)} />
                        <FinancialRow label="With Commission" value={fmtCurrency(row.amount_with_commission)} />
                        <FinancialRow label={`GST (${row.gst_percentage}%)`} value={fmtCurrency(row.gst_amount)} />
                        <Box sx={{ borderTop: "1px dashed #e4e6ef", pt: 0.5, mt: 0.2 }}>
                          <FinancialRow label="Total Amount" value={fmtCurrency(row.toatl_amount)} highlight />
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Entry Info */}
                    <TableCell sx={{ ...bodyCell, minWidth: 140 }}>
                      <Typography variant="caption" fontWeight={600} sx={{ color: "#374151", display: "block" }}>
                        {row.entry_by_username || "—"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.2 }}>
                        ID: {row.entry_by_user_id}
                      </Typography>
                      <Tooltip title={row.entry_ip_address} placement="top">
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.4,
                            mt: 0.5,
                            px: 1,
                            py: 0.3,
                            borderRadius: "6px",
                            backgroundColor: "#f3f4f6",
                            border: "1px solid #e5e7eb",
                            cursor: "default",
                          }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="2"/>
                            <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.68rem", fontWeight: 600 }}>
                            {row.entry_ip_address}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </TableCell>

                    {/* Actions */}
                    <TableCell sx={{ ...bodyCell, minWidth: 130 }}>
                      <Stack spacing={0.8} alignItems="stretch">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => router.push(`/admin/work-order/${row.wo_no}`)}
                          sx={actionBtn("#010a2a", "#e8eaf6")}
                        >
                          View / Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => router.push(`/admin/work-order/${row.wo_no}/details`)}
                          sx={actionBtn("#6366f1", "#eef2ff")}
                        >
                          Detail List
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={actionBtn("#10b981", "#ecfdf5")}
                        >
                          Approve
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 7, border: "none" }}>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "14px",
                        backgroundColor: "#f3f4f8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SearchIcon sx={{ fontSize: 26, color: "#c4c9d8" }} />
                    </Box>
                    <Typography variant="body2" fontWeight={600} sx={{ color: "#6b7280" }}>
                      {search ? `No results for "${search}"` : "No records found"}
                    </Typography>
                    {search && (
                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        Try adjusting your search terms
                      </Typography>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Pagination ── */}
      <Box sx={{ borderTop: "1.5px solid #f0f1f6" }}>
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{
            "& .MuiTablePagination-toolbar": { px: 2 },
            "& .MuiTablePagination-displayedRows": { color: "#6b7280", fontSize: "0.82rem" },
            "& .MuiTablePagination-selectLabel": { color: "#9ca3af", fontSize: "0.82rem" },
          }}
        />
      </Box>
    </Paper>
  );
};

export default WorkOrderTable;