"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  Tooltip,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import clientServices from "@/services/clientServices";
import ControllerModal from "@/components/admin/common/controller"
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "@/store/modules/admin/controller";

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
  py: 1.8,
  verticalAlign: "top",
};

// ── Content category badge ─────────────────────────────────────────────────────
const CATEGORY_STYLES = {
  outdoor_media: { bg: "#e8eaf6", color: "#010a2a", border: "#c5cae9", label: "Outdoor Media" },
  classified:    { bg: "#fef3c7", color: "#92400e", border: "#fde68a", label: "Classified" },
  printing:      { bg: "#ecfdf5", color: "#065f46", border: "#a7f3d0", label: "Printing" },
  electronic:    { bg: "#ede9fe", color: "#5b21b6", border: "#c4b5fd", label: "Electronic" },
};

function CategoryBadge({ value }) {
  const s = CATEGORY_STYLES[value] || { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb", label: value || "—" };
  return (
    <Chip
      label={s.label}
      size="small"
      sx={{
        borderRadius: "7px",
        backgroundColor: s.bg,
        color: s.color,
        fontWeight: 600,
        fontSize: "0.7rem",
        border: `1px solid ${s.border}`,
        height: 22,
      }}
    />
  );
}

// ── Letter type badge ──────────────────────────────────────────────────────────
const LETTER_STYLES = {
  incoming:  { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  outgoing:  { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  internal:  { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  circular:  { bg: "#fdf4ff", color: "#7e22ce", border: "#e9d5ff" },
};

function LetterTypeBadge({ value }) {
  const s = LETTER_STYLES[value] || { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
  return (
    <Chip
      label={value ? value.charAt(0).toUpperCase() + value.slice(1) : "—"}
      size="small"
      sx={{
        borderRadius: "7px",
        backgroundColor: s.bg,
        color: s.color,
        fontWeight: 600,
        fontSize: "0.7rem",
        border: `1px solid ${s.border}`,
        height: 22,
      }}
    />
  );
}

// ── Mode of receiving pill ─────────────────────────────────────────────────────
function ModePill({ value }) {
  const icons = {
    hand: "✋",
    post: "📮",
    email: "📧",
    courier: "📦",
    fax: "📠",
  };
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 1.2,
        py: 0.3,
        borderRadius: "7px",
        backgroundColor: "#f8f9fb",
        border: "1px solid #e4e6ef",
        fontSize: "0.75rem",
        color: "#374151",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: "0.75rem" }}>{icons[value] || "📋"}</span>
      {value ? value.charAt(0).toUpperCase() + value.slice(1) : "—"}
    </Box>
  );
}

// ── Action buttons ─────────────────────────────────────────────────────────────
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

// ── Skeleton loader ────────────────────────────────────────────────────────────
function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i}>
      {Array.from({ length: 9 }).map((__, j) => (
        <TableCell key={j} sx={{ borderBottom: "1px solid #f0f1f6" }}>
          <Skeleton variant="text" width={j === 8 ? 80 : "75%"} height={18} sx={{ borderRadius: 4 }} />
          {j === 2 && <Skeleton variant="text" width="50%" height={14} sx={{ borderRadius: 4, mt: 0.5 }} />}
        </TableCell>
      ))}
    </TableRow>
  ));
}

// ── Main component ─────────────────────────────────────────────────────────────
const AvakTable = () => {
  const dispatch = useDispatch();
  //const ModalShow = useSelector((state) => state.adminController.ModalShow);
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with actual API call
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await clientServices.getAdvtList({fin_year:'2024-2025', datatype:'AvakList',});
        setData(res.data);
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
      (row.letterNo || "").toLowerCase().includes(term) ||
      (row.client || "").toLowerCase().includes(term) ||
      (row.district || "").toLowerCase().includes(term) ||
      (row.officer || "").toLowerCase().includes(term)
    );
  });

  const fmt = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" }) : "—";

  const fmtAmount = (n) =>
    n ? `₹${Number(n).toLocaleString("en-IN")}` : "—";

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
      {/* ── Header bar ── */}
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
        {/* Title */}
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
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#111827", letterSpacing: "-0.2px" }}>
              Avak List
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {loading ? "Loading…" : `${filteredRows.length} record${filteredRows.length !== 1 ? "s" : ""} found`}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          {/* Search */}
          <TextField
            size="small"
            placeholder="Search by letter, client, district…"
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
          {/* Add New */}
          <Button
            variant="contained"
            size="small"
            onClick={() => router.push("/admin/client-attachment/new")}
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
            + New Entry
          </Button>
        </Box>
      </Box>

      {/* ── Table ── */}
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {["#", "Letter No", "Client", "Category", "Tender Amt", "Dates", "Office / Officer", "Mode / Pages", "Actions"].map((h, i) => (
                <TableCell key={h} align={i === 4 ? "right" : "left"} sx={headCell}>
                  {h}
                </TableCell>
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
                    key={row.id || index}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#fafbff" },
                      "&:last-child td": { borderBottom: "none" },
                      transition: "background 0.15s ease",
                    }}
                  >
                    {/* # */}
                    <TableCell sx={{ ...bodyCell, minWidth: 48 }}>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: "8px",
                          backgroundColor: "#e8eaf6",
                          border: "1px solid #c5cae9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          color: "#010a2a",
                        }}
                      >
                        {page * rowsPerPage + index + 1}
                      </Box>
                    </TableCell>

                    {/* Letter No */}
                    <TableCell sx={{ ...bodyCell, minWidth: 150 }}>
                    <Typography variant="body2" fontWeight={700} sx={{ color: "#111827", fontSize: "0.82rem" }}>
                        {row.subject|| "—"}
                      </Typography>
                      <Typography variant="body2" fontWeight={700} sx={{ color: "#111827", fontSize: "0.82rem" }}>
                        {row.letter_no|| "—"}
                      </Typography>
                      <Box display="flex" gap={0.6} mt={0.5} flexWrap="wrap">
                        <LetterTypeBadge value={row.letter_type} />
                      </Box>
                      <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.4 }}>
                        Recv: {fmt(row.received_date)}
                      </Typography>
                    </TableCell>

                    {/* Client */}
                    <TableCell sx={{ ...bodyCell, minWidth: 170 }}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: "#111827", fontSize: "0.82rem", lineHeight: 1.3 }}>
                        {row.client || "—"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.3 }}>
                        {row.baseDept}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#b0b5c4" }}>
                        {row.district}
                      </Typography>
                    </TableCell>

                    {/* Category */}
                    <TableCell sx={{ ...bodyCell, minWidth: 140 }}>
                      <Stack spacing={0.6}>
                        <CategoryBadge value={row.cat_text} />
                        <Chip
                          label={row.cat_text ? row.cat_text.charAt(0).toUpperCase() + row.cat_text.slice(1) : "—"}
                          size="small"
                          sx={{
                            borderRadius: "7px",
                            backgroundColor: "#f3f4f6",
                            color: "#6b7280",
                            fontWeight: 600,
                            fontSize: "0.68rem",
                            border: "1px solid #e5e7eb",
                            height: 20,
                            width: "fit-content",
                          }}
                        />
                      </Stack>
                    </TableCell>

                    {/* Tender Amount */}
                    <TableCell align="right" sx={{ ...bodyCell, minWidth: 110 }}>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{ color: row.tenderAmount ? "#15803d" : "#d1d5db", fontSize: "0.82rem" }}
                      >
                        {fmtAmount(row.tenderAmount)}
                      </Typography>
                    </TableCell>

                    {/* Dates */}
                    <TableCell sx={{ ...bodyCell, minWidth: 130 }}>
                      <Box display="flex" flexDirection="column" gap={0.5}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", width: 30 }}>Pub</Typography>
                          <Typography variant="caption" sx={{ color: "#374151", fontWeight: 600 }}>{fmt(row.caption_publish_date)}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", width: 30 }}>Rcv</Typography>
                          <Typography variant="caption" sx={{ color: "#374151", fontWeight: 600 }}>{fmt(row.received_date)}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Office / Officer */}
                    <TableCell sx={{ ...bodyCell, minWidth: 170 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ color: "#111827", fontSize: "0.82rem" }}>
                        {row.office || "—"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", display: "block" }}>
                        {row.section}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#6366f1", fontWeight: 600 }}>
                        {row.officer}
                      </Typography>
                    </TableCell>

                    {/* Mode / Pages */}
                    <TableCell sx={{ ...bodyCell, minWidth: 120 }}>
                      <Stack spacing={0.6} alignItems="flex-start">
                        <ModePill value={row.receiving_mode} />
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 600 }}>
                            {row.total_pages} pages
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* Actions */}
                    <TableCell sx={{ ...bodyCell, minWidth: 140 }}>
                      <Stack spacing={0.8} alignItems="stretch">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() =>  dispatch(toggleModal({
                            show: true,
                          }))}
                          sx={actionBtn("#010a2a", "#e8eaf6")}
                        >
                          View / Edit
                        </Button>
                        
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => router.push(`/admin/counter/create/${row.avak_ref_id}`)}
                          sx={actionBtn("#10b981", "#ecfdf5")}
                        >
                          Process to counter
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={actionBtn("#ef4444", "#fef2f2")}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 7, border: "none" }}>
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
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            "& .MuiTablePagination-toolbar": { px: 2 },
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