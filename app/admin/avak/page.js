"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, TextField, Button,
  Typography, Stack, InputAdornment, Chip, Tooltip, Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import clientServices from "@/services/clientServices";
import ControllerModal from "@/components/admin/common/controller";
import { useDispatch } from "react-redux";
import { toggleModal } from "@/store/modules/admin/controller";

// ── Styles ────────────────────────────────────────────────────────────────────
const searchField = {
  minWidth: 260,
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px", backgroundColor: "#f8f9fb", fontSize: "0.85rem",
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
  fontWeight: 700, fontSize: "0.68rem", color: "#9ca3af",
  textTransform: "uppercase", letterSpacing: "0.5px",
  backgroundColor: "#fafbff", borderBottom: "1.5px solid #f0f1f6",
  whiteSpace: "nowrap", py: 1.4,
};

const bodyCell = {
  borderBottom: "1px solid #f5f6fa",
  py: 1.6, verticalAlign: "middle",
};

const actionBtn = (color, bg) => ({
  borderRadius: "7px", textTransform: "none", fontWeight: 600,
  fontSize: "0.72rem", px: 1.3, py: 0.5, minWidth: 0,
  backgroundColor: bg, color, boxShadow: "none",
  border: `1px solid ${color}20`,
  "&:hover": { backgroundColor: color, color: "#fff" },
  transition: "all 0.15s ease",
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" }) : "—";

const fmtAmount = (n) =>
  n ? `₹${Number(n).toLocaleString("en-IN")}` : "—";

// ── Tiny label+value inline pair ──────────────────────────────────────────────
function LabelVal({ label, value, valueColor = "#374151" }) {
  return (
    <Box display="flex" alignItems="baseline" gap={0.6}>
      <Typography variant="caption" sx={{ color: "#b0b5c4", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography variant="caption" fontWeight={600} sx={{ color: valueColor, fontSize: "0.75rem" }}>
        {value}
      </Typography>
    </Box>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function TableSkeleton() {
  return Array.from({ length: 6 }).map((_, i) => (
    <TableRow key={i}>
      {Array.from({ length: 7 }).map((__, j) => (
        <TableCell key={j} sx={{ borderBottom: "1px solid #f5f6fa", py: 1.6 }}>
          <Skeleton variant="text" width={j === 6 ? 60 : "70%"} height={16} sx={{ borderRadius: 4 }} />
          {j < 3 && <Skeleton variant="text" width="45%" height={13} sx={{ borderRadius: 4, mt: 0.4 }} />}
        </TableCell>
      ))}
    </TableRow>
  ));
}

// ── Main ──────────────────────────────────────────────────────────────────────
const AvakTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [financialYear, setFinancialYear] = useState("");
  const [userId,        setUserId]        = useState("");
  const [user_name,     setUserName]      = useState("");
  const [userTypeCd,   setUserTypeCd]      = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const financialYearLS = localStorage.getItem("financialYear");
    const userIdLS = localStorage.getItem("userid");
    const userNameLS = localStorage.getItem("username");
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
  }, []);


  useEffect(() => {
    async function fetchData() {
      const payload ={
        fin_year : financialYear || localStorage.getItem("financialYear"),
        datatype: "AvakList",
        userId: localStorage.getItem("userid")
      }
      try {
        const res = await clientServices.getAdvtList(payload);
        setData(res.data || []);
      } catch (err) {
        console.error("Failed to fetch avak list", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  // ── useMemo for filtered + paginated rows ──────────────────────────────────
  const filteredRows = useMemo(() => {
    const term = search.toLowerCase();
    if (!term) return data;
    return data.filter((row) =>
      (row.letter_no     || "").toLowerCase().includes(term) ||
      (row.client_name   || "").toLowerCase().includes(term) ||
      (row.district      || "").toLowerCase().includes(term) ||
      (row.subject       || "").toLowerCase().includes(term)
    );
  }, [data, search]);

  const visibleRows = useMemo(
    () => filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, page, rowsPerPage]
  );

  return (
    <Paper elevation={0} sx={{ mt: 3, borderRadius: "18px", border: "1.5px solid #e9eaf0", overflow: "hidden", backgroundColor: "#fff" }}>

      {/* ── Header ── */}
      <Box sx={{
        px: 3, py: 2, display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 2,
        background: "linear-gradient(135deg, #fafbff 0%, #f5f6fa 100%)",
        borderBottom: "1.5px solid #ebebf0",
      }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box sx={{
            width: 36, height: 36, borderRadius: "10px", background: "#010a2a",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 3px 10px rgba(1,10,42,0.25)",
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M16 13H8M16 17H8" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#111827" }}>Avak List</Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {loading ? "Loading…" : `${filteredRows.length} record${filteredRows.length !== 1 ? "s" : ""}`}
            </Typography>
          </Box>
        </Box>

        <TextField
          size="small"
          placeholder="Search letter, client, district…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          sx={searchField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* ── Table ── */}
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {["#", "Subject / Letter", "Client", "Category", "Amount", "Dates", "Actions"].map((h, i) => (
                <TableCell key={h} align={i === 4 ? "right" : "left"} sx={headCell}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableSkeleton />
            ) : visibleRows.length > 0 ? (
              visibleRows.map((row, index) => (
                <TableRow key={row.avak_ref_id || index} hover sx={{
                  "&:hover": { backgroundColor: "#fafbff" },
                  "&:last-child td": { borderBottom: "none" },
                  transition: "background 0.12s ease",
                }}>

                  {/* # */}
                  <TableCell sx={{ ...bodyCell, width: 44, pl: 2 }}>
                    <Typography variant="caption" fontWeight={700} sx={{ color: "#c5cae9" }}>
                      {page * rowsPerPage + index + 1}
                     
                    </Typography>
                  </TableCell>

                  {/* Subject / Letter */}
                  <TableCell sx={{ ...bodyCell, minWidth: 180 }}>
                    <Tooltip title={row.subject || ""} placement="top">
                      <Typography variant="body2" fontWeight={700} sx={{
                        color: "#111827", fontSize: "0.82rem", lineHeight: 1.3,
                        maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {row.subject || "—"}
                      </Typography>
                    </Tooltip>
                    <Box display="flex" alignItems="center" gap={0.8} mt={0.5}>
                      <Typography variant="caption" fontWeight={600} sx={{ color: "#6b7280", fontFamily: "monospace", fontSize: "0.75rem" }}>
                        {row.letter_no || "—"}
                      </Typography>
                      {row.letter_type && (
                        <Chip label={row.letter_type} size="small" sx={{
                          borderRadius: "5px", backgroundColor: "#eff6ff", color: "#1d4ed8",
                          fontWeight: 600, fontSize: "0.65rem", border: "1px solid #bfdbfe", height: 18,
                        }} />
                      )}
                    </Box>
                    {/* <Typography variant="caption" sx={{ color: "#b0b5c4", fontSize: "0.7rem" }}>
                      Recv: {row.received_date}
                    </Typography> */}
                    <Typography variant="caption" sx={{ color: "#b0b5c4", fontSize: "0.7rem" }} >
                   avak no: { row.avak_ref_id}
                    </Typography>
                  </TableCell>

                  {/* Client */}
                  <TableCell sx={{ ...bodyCell, minWidth: 160 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ color: "#111827", fontSize: "0.82rem" }}>
                      {row.client_name || "—"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#9ca3af", display: "block" }}>
                      {[row.baseDept, row.district].filter(Boolean).join(" · ") || "—"}
                    </Typography>
                  </TableCell>

                  {/* Category */}
                  <TableCell sx={{ ...bodyCell, minWidth: 120 }}>
                    <Chip
                      label={row.cat_text || "—"}
                      size="small"
                      sx={{
                        borderRadius: "7px", height: 22,
                        backgroundColor: "#e8eaf6", color: "#010a2a",
                        fontWeight: 600, fontSize: "0.7rem", border: "1px solid #c5cae9",
                      }}
                    />
                    <Box display="flex" alignItems="center" gap={0.5} mt={0.6}>
                      <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.68rem" }}>
                        {row.receiving_mode || "—"} · {row.total_pages || 0} pg
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Amount */}
                  <TableCell align="right" sx={{ ...bodyCell, minWidth: 100 }}>
                    <Typography variant="body2" fontWeight={700} sx={{
                      color: row.tender_amt ? "#15803d" : "#d1d5db", fontSize: "0.84rem",
                    }}>
                      {fmtAmount(row.tender_amt)}
                    </Typography>
                  </TableCell>

                  {/* Dates */}
                  <TableCell sx={{ ...bodyCell, minWidth: 120 }}>
                    {/* <LabelVal label="Pub" value={fmt(row.caption_publish_date)} /> */}
                    <LabelVal label="Pub" value={row.caption_publish_date} /> 
                    <LabelVal label="Rcv" value={row.received_date} />
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={{ ...bodyCell, minWidth: 120 }}>
                    <Stack direction="row" spacing={0.7} flexWrap="wrap" gap={0.7}>
                      <Button size="small" variant="contained"
                        sx={actionBtn("#010a2a", "#e8eaf6")}
                        onClick={() => dispatch(toggleModal({ show: true, ref_id: row.avak_ref_id }))}>
                        Forward
                      </Button>
                      <Button size="small" variant="contained"
                        sx={actionBtn("#10b981", "#ecfdf5")}
                        onClick={() => router.push(`/admin/counter/create/${row.avak_ref_id}`)}>
                        Process
                      </Button>
                      {/* <Button size="small" variant="contained"
                        sx={actionBtn("#ef4444", "#fef2f2")}>
                        Delete
                      </Button> */}
                    </Stack>
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6, border: "none" }}>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    <Box sx={{ width: 48, height: 48, borderRadius: "12px", backgroundColor: "#f3f4f8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <SearchIcon sx={{ fontSize: 24, color: "#c4c9d8" }} />
                    </Box>
                    <Typography variant="body2" fontWeight={600} sx={{ color: "#6b7280" }}>
                      {search ? `No results for "${search}"` : "No records found"}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Pagination ── */}
      <Box sx={{ borderTop: "1.5px solid #f5f6fa" }}>
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            "& .MuiTablePagination-displayedRows": { color: "#6b7280", fontSize: "0.82rem" },
            "& .MuiTablePagination-selectLabel": { color: "#9ca3af", fontSize: "0.82rem" },
          }}
        />
      </Box>
      <ControllerModal />
    </Paper>
  );
};

export default AvakTable;