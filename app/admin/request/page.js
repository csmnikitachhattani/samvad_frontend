"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import adminServices from "@/services/adminServices";
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

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" }) : "—";

const fmtCurrency = (n) =>
  n != null ? `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "—";

// ── Status badge ──────────────────────────────────────────────────────────────
const STATUS_STYLE = {
  Forwarded:  { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  Pending:    { bg: "#fffbeb", color: "#92400e", border: "#fde68a" },
  Rejected:   { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
  Approved:   { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
};

function StatusBadge({ value }) {
  const s = STATUS_STYLE[value] || { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
  return (
    <Chip
      label={value || "—"}
      size="small"
      sx={{
        borderRadius: "7px",
        backgroundColor: s.bg,
        color: s.color,
        fontWeight: 700,
        fontSize: "0.68rem",
        border: `1px solid ${s.border}`,
        height: 22,
      }}
    />
  );
}

// ── NP print summary ──────────────────────────────────────────────────────────
function NpSummary({ national, local, state, other }) {
  const items = [
    { label: "Natl", value: national },
    { label: "Local", value: local },
    { label: "State", value: state },
    { label: "Other", value: other },
  ].filter((i) => i.value != null && i.value > 0);

  if (items.length === 0) return <Typography variant="caption" sx={{ color: "#d1d5db" }}>—</Typography>;

  return (
    <Box display="flex" flexWrap="wrap" gap={0.5}>
      {items.map(({ label, value }) => (
        <Box
          key={label}
          sx={{
            display: "inline-flex", alignItems: "center", gap: 0.4,
            px: 0.9, py: 0.3, borderRadius: "6px",
            backgroundColor: "#f0f4ff", border: "1px solid #c7d2fe",
          }}
        >
          <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.65rem", fontWeight: 600 }}>{label}</Typography>
          <Typography variant="caption" sx={{ color: "#4f46e5", fontWeight: 800, fontSize: "0.7rem" }}>{value}</Typography>
        </Box>
      ))}
    </Box>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i}>
      {Array.from({ length: 7 }).map((__, j) => (
        <TableCell key={j} sx={{ borderBottom: "1px solid #f0f1f6", py: 2 }}>
          <Skeleton variant="text" width={j === 6 ? 90 : "75%"} height={18} sx={{ borderRadius: 4 }} />
          {(j === 0 || j === 1) && <Skeleton variant="text" width="50%" height={14} sx={{ borderRadius: 4, mt: 0.5 }} />}
        </TableCell>
      ))}
    </TableRow>
  ));
}

// ── Main component ─────────────────────────────────────────────────────────────
const RequestTable = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [financialYear, setFinancialYear] = useState("");
  const [userId,        setUserId]        = useState("");
  const [user_name,     setUserName]      = useState("");
  const [userTypeCd,   setUserTypeCd]      = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const financialYearLS = localStorage.getItem("financialYear");
    const userIdLS = localStorage.getItem("userid");
    const userNameLS = localStorage.getItem("user_name");
    const userTypeCdLS = localStorage.getItem("usertypecode");
  
    setFinancialYear(financialYearLS);
    setUserId(userIdLS);
    setUserName(userNameLS);
    setUserTypeCd(userTypeCdLS);
  
    const getIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setFormData(p => ({ ...p, ip_address: data.ip }));
      } catch {
        console.error("IP fetch failed");
      }
    };
  
    getIP();
  
    async function fetchData() {
      console.log("data", userIdLS, financialYearLS);
  
      const payload = {
        userId: userIdLS,
        financialYear: financialYearLS
      };
  
      try {
        const res = await adminServices.getClientRequestList(payload);
        setData(res?.data || res || []);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);

  const filteredRows = data.filter((row) => {
    const term = search.toLowerCase();
    return (
      (row.ref_Id || "").toLowerCase().includes(term) ||
      (row.subject || "").toLowerCase().includes(term) ||
      (row.client_Cd || "").toLowerCase().includes(term) ||
      (row.letter_No || "").toLowerCase().includes(term) ||
      (row.status || "").toLowerCase().includes(term)
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
          px: 3, py: 2.5,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 2,
          background: "linear-gradient(135deg, #fafbff 0%, #f5f6fa 100%)",
          borderBottom: "1.5px solid #ebebf0",
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box sx={{
            width: 38, height: 38, borderRadius: "11px", background: "#010a2a",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(1,10,42,0.28)",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 12h6M9 16h4M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#111827", letterSpacing: "-0.2px" }}>
              Client Requests
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {loading ? "Loading…" : `${filteredRows.length} request${filteredRows.length !== 1 ? "s" : ""} found`}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={1.5}>
          <TextField
            size="small"
            placeholder="Search ref ID, subject, client…"
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
        </Box>
      </Box>

      {/* ── Table ── */}
      <TableContainer sx={{ maxHeight: 560 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {["Ref / Category", "Subject & Client", "Dates", "Schedule", "Amount", "NP Print", "Status & Actions"].map((h) => (
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
                .map((row) => (
                  <TableRow
                    key={row.ref_Id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#fafbff" },
                      "&:last-child td": { borderBottom: "none" },
                      transition: "background 0.15s ease",
                    }}
                  >
                    {/* Ref / Category */}
                    <TableCell sx={{ ...bodyCell, minWidth: 160 }}>
                      <Box
                        sx={{
                          display: "inline-flex", alignItems: "center", gap: 0.5,
                          px: 1.3, py: 0.5, borderRadius: "8px",
                          backgroundColor: "#e8eaf6", border: "1px solid #c5cae9",
                          fontWeight: 800, fontSize: "0.75rem", color: "#010a2a",
                          fontFamily: "monospace", mb: 0.8,}}
                      >
                        {row.ref_Id}
                      </Box>
                      <Box display="flex" gap={0.5} flexWrap="wrap">
                        <Chip
                          label={`Cat   ${row.ref_Category_Text} || ${row.ref_Category_Id}`}
                          size="small"
                          sx={{ borderRadius: "6px", backgroundColor: "#f0f4ff", color: "#4f46e5", fontWeight: 700, fontSize: "0.67rem", border: "1px solid #c7d2fe", height: 20 }}
                        />
                        <Chip
                          label={`Caption ${row.caption_Cd}  ` }
                          size="small"
                          sx={{ borderRadius: "6px", backgroundColor: "#fdf4ff", color: "#7e22ce", fontWeight: 600, fontSize: "0.67rem", border: "1px solid #e9d5ff", height: 20 }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.5 }}>
                        FY {row.financial_Year}
                      </Typography>
                    </TableCell>

                    {/* Subject & Client */}
                    <TableCell sx={{ ...bodyCell, minWidth: 200 }}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: "#111827", fontSize: "0.83rem", lineHeight: 1.3 }}>
                        {row.subject || "—"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.3 }}>
                        Client: <span style={{ color: "#374151", fontWeight: 600 }}>{row.client_Cd}</span>
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        Letter: <span style={{ color: "#374151", fontWeight: 600 }}>{row.letter_No}</span>
                      </Typography>
                      {row.remarks && (
                        <Tooltip title={row.remarks}>
                          <Typography variant="caption" sx={{ color: "#b0b5c4", display: "block", fontSize: "0.68rem", mt: 0.2, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {row.remarks}
                          </Typography>
                        </Tooltip>
                      )}
                    </TableCell>

                    {/* Dates */}
                    <TableCell sx={{ ...bodyCell, minWidth: 130 }}>
                      <Box display="flex" flexDirection="column" gap={0.5}>
                        <Box>
                          <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase" }}>Letter</Typography>
                          <Typography variant="body2" fontWeight={600} sx={{ color: "#374151", fontSize: "0.8rem" }}>{fmt(row.letter_Date)}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase" }}>Entry</Typography>
                          <Typography variant="body2" fontWeight={600} sx={{ color: "#374151", fontSize: "0.8rem" }}>
                            {fmt(row.entry_Date)}
                            <span style={{ color: "#9ca3af", fontWeight: 400, fontSize: "0.68rem", marginLeft: 4 }}>{row.entry_Time?.trim()}</span>
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Schedule */}
                    <TableCell sx={{ ...bodyCell, minWidth: 120 }}>
                      <Box
                        sx={{
                          display: "inline-flex", flexDirection: "column",
                          px: 1.2, py: 0.8, borderRadius: "8px",
                          backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0",
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>Schedule</Typography>
                        <Typography variant="body2" fontWeight={700} sx={{ color: "#15803d", fontSize: "0.8rem" }}>
                          {fmt(row.schedule_Date)}
                        </Typography>
                      </Box>
                      {row.fixed_Date && (
                        <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.5, fontSize: "0.68rem" }}>
                          Fixed: {row.fixed_Date}
                        </Typography>
                      )}
                    </TableCell>

                    {/* Amount */}
                    <TableCell sx={{ ...bodyCell, minWidth: 100 }}>
                      <Typography variant="body2" fontWeight={800} sx={{ color: "#15803d", fontSize: "0.88rem" }}>
                        {fmtCurrency(row.tender_Amt)}
                      </Typography>
                      {row.avak_Ref_Id && (
                        <Typography variant="caption" sx={{ color: "#6366f1", display: "block", fontWeight: 600, mt: 0.3 }}>
                          Avak: {row.avak_Ref_Id}
                        </Typography>
                      )}
                    </TableCell>

                    {/* NP Print */}
                    <TableCell sx={{ ...bodyCell, minWidth: 140 }}>
                      <NpSummary
                        national={row.print_In_National_Np}
                        local={row.print_In_Local_Np}
                        state={row.print_In_State_Np}
                        other={row.print_In_Other_Np}
                      />
                      {row.print_In_Other_Remark && (
                        <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.5, fontSize: "0.68rem" }}>
                          {row.print_In_Other_Remark}
                        </Typography>
                      )}
                      {row.count_Attachment != null && (
                        <Box display="flex" alignItems="center" gap={0.4} mt={0.5}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.41 17.41A2 2 0 016.59 14.6l8.49-8.49" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.68rem", fontWeight: 600 }}>
                            {row.count_Attachment} attachment{row.count_Attachment !== 1 ? "s" : ""}
                          </Typography>
                        </Box>
                      )}
                    </TableCell>

                    {/* Status & Actions */}
                    <TableCell sx={{ ...bodyCell, minWidth: 150 }}>
                      <Stack spacing={0.8} alignItems="flex-start">
                        <StatusBadge value={row.status} />
                        {/* {row.forward_Status === "Y" && (
                          <Chip label="Forwarded" size="small" sx={{ borderRadius: "6px", backgroundColor: "#f0fdf4", color: "#15803d", fontWeight: 600, fontSize: "0.67rem", border: "1px solid #bbf7d0", height: 20 }} />
                        )} */}
                        {!row.avak_Ref_Id && (
                        <Button
                          size="small"
                          variant="contained"
                          sx={actionBtn("#010a2a", "#e8eaf6")}
                          onClick={() => router.push(`/admin/avak/create/${row.ref_Id}`)}
                        >
                          Create Avak
                        </Button>
                         )} 
                        {row.reject_Remark && (
                          <Tooltip title={row.reject_Remark}>
                            <Typography variant="caption" sx={{ color: "#dc2626", fontSize: "0.68rem", cursor: "help" }}>
                              ⚠ Rejection note
                            </Typography>
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 7, border: "none" }}>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
                    <Box sx={{ width: 52, height: 52, borderRadius: "14px", backgroundColor: "#f3f4f8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <SearchIcon sx={{ fontSize: 26, color: "#c4c9d8" }} />
                    </Box>
                    <Typography variant="body2" fontWeight={600} sx={{ color: "#6b7280" }}>
                      {search ? `No results for "${search}"` : "No requests found"}
                    </Typography>
                    {search && <Typography variant="caption" sx={{ color: "#9ca3af" }}>Try adjusting your search terms</Typography>}
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
          rowsPerPageOptions={[5, 10, 25, 50]}
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

export default RequestTable;