"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";
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
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import adminServices from "@/services/adminServices";

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
  verticalAlign: "middle",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

const isExpiringSoon = (dateStr) => {
  if (!dateStr) return false;
  const diff = new Date(dateStr) - new Date();
  return diff > 0 && diff < 1000 * 60 * 60 * 24 * 90; // within 90 days
};

const isExpired = (dateStr) => {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
};

// ── Bus Number Badge ──────────────────────────────────────────────────────────
function BusNoBadge({ value }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.7,
        px: 1.4,
        py: 0.6,
        borderRadius: "8px",
        backgroundColor: "#e8eaf6",
        border: "1px solid #c5cae9",
        fontWeight: 800,
        fontSize: "0.82rem",
        color: "#010a2a",
        letterSpacing: "0.5px",
        fontFamily: "monospace",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="13" rx="2" stroke="#010a2a" strokeWidth="2.2"/>
        <circle cx="7" cy="18" r="1.5" fill="#010a2a"/>
        <circle cx="17" cy="18" r="1.5" fill="#010a2a"/>
      </svg>
      {value || "—"}
    </Box>
  );
}

// ── Validity pill ─────────────────────────────────────────────────────────────
function ValidityPill({ label, date }) {
  const expired = isExpired(date);
  const soon = isExpiringSoon(date);
  const color = expired ? "#dc2626" : soon ? "#d97706" : "#15803d";
  const bg = expired ? "#fef2f2" : soon ? "#fffbeb" : "#f0fdf4";
  const border = expired ? "#fecaca" : soon ? "#fde68a" : "#bbf7d0";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.2,
        px: 1.2,
        py: 0.6,
        borderRadius: "8px",
        backgroundColor: bg,
        border: `1px solid ${border}`,
      }}
    >
      <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px" }}>
        {label}
      </Typography>
      <Typography variant="caption" fontWeight={700} sx={{ color, fontSize: "0.76rem", whiteSpace: "nowrap" }}>
        {expired ? "⚠ Expired" : soon ? "⏳ " + fmt(date) : fmt(date)}
      </Typography>
    </Box>
  );
}

// ── Doc thumbnail ─────────────────────────────────────────────────────────────
function DocThumb({ path, label, accent }) {
  const BASE = "http://103.79.34.50:8083";
  const ext = path?.split(".").pop()?.toLowerCase();
  const isImg = ["jpg", "jpeg", "png", "webp"].includes(ext);

  return (
    <Tooltip title={`View ${label}`} placement="top">
      <Box
        component="a"
        href={path ? BASE + path : "#"}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.6,
          px: 1.1,
          py: 0.5,
          borderRadius: "7px",
          backgroundColor: `${accent}12`,
          border: `1px solid ${accent}28`,
          textDecoration: "none",
          transition: "all 0.15s ease",
          "&:hover": { backgroundColor: `${accent}22`, transform: "translateY(-1px)" },
        }}
      >
        {isImg ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke={accent} strokeWidth="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill={accent}/>
            <path d="M21 15l-5-5L5 21" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
            <path d="M14 2v6h6" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
        <Typography variant="caption" fontWeight={600} sx={{ color: accent, fontSize: "0.7rem" }}>
          {label}
        </Typography>
      </Box>
    </Tooltip>
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
          <Skeleton variant="text" width={j === 6 ? 90 : "75%"} height={18} sx={{ borderRadius: 4 }} />
          {j === 0 && <Skeleton variant="text" width="50%" height={14} sx={{ borderRadius: 4, mt: 0.5 }} />}
        </TableCell>
      ))}
    </TableRow>
  ));
}

// ── Main component ─────────────────────────────────────────────────────────────
const BusTable = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await adminServices.getMiniBusList();
        //const res = await axiosClient.get("http://103.79.34.50:8083/api/ManageMaster/get-all-bus");
        console.log(res)
        setData(res);
      } catch (error) {
        console.error("Failed to fetch work orders", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await outdoorServices.getOutdoorWorkorderList();
//         console.log(response)
//         setData(response.data);
//         setData([
//           {
//             BusId: 2,
//             AgencyId: 1,
//             BusType: 1,
//             BusNo: "str",
//             OwnerName: "string",
//             RcPhotoPath: "/Uploads/BusPrintingRC/27-02-2026/20260227162132_aea4078a.png",
//             FitnessPath: "/Uploads/BusPrintingFitness/27-02-2026/20260227162132_723d9edc.png",
//             InsurancePath: "/Uploads/BusPrintingInsurance/27-02-2026/20260227162132_3e71c2a6.png",
//             FitnessUpto: "2026-02-27T00:00:00",
//             InsuranceUpto: "2026-02-27T00:00:00",
//             IsActive: true,
//             CreatedDate: "2026-02-27T16:21:32.65",
//             CreatedBy: 1,
//             CreatedIpAddress: "103.67.89.90",
//             ModifiedDate: "2026-02-27T16:21:32.65",
//             ModifiedBy: null,
//             ModifiedIpAddress: null,
//             AgencyName: "Vehicle-Agency",
//           },
//           {
//             BusId: 1,
//             AgencyId: 1,
//             BusType: 1,
//             BusNo: "CG042345",
//             OwnerName: "Bus Owner",
//             RcPhotoPath: "/Uploads/BusPrintingRC/27-02-2026/20260227160011_1e20b963.jpg",
//             FitnessPath: "/Uploads/BusPrintingFitness/27-02-2026/20260227160011_2abd5c94.jpeg",
//             InsurancePath: "/Uploads/BusPrintingInsurance/27-02-2026/20260227160011_7f35cb23.jpeg",
//             FitnessUpto: "2030-02-27T00:00:00",
//             InsuranceUpto: "2029-02-27T00:00:00",
//             IsActive: true,
//             CreatedDate: "2026-02-27T16:00:11.893",
//             CreatedBy: 1,
//             CreatedIpAddress: "100.12.12.12",
//             ModifiedDate: "2026-02-27T16:00:11.893",
//             ModifiedBy: null,
//             ModifiedIpAddress: null,
//             AgencyName: "Vehicle-Agency",
//           },
//         ]);
//       } catch (error) {
//         console.error("Failed to fetch buses", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

  const filteredRows = data.filter((row) => {
    const term = search.toLowerCase();
    return (
      (row.BusNo || "").toLowerCase().includes(term) ||
      (row.OwnerName || "").toLowerCase().includes(term) ||
      (row.AgencyName || "").toLowerCase().includes(term)
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
              <rect x="2" y="5" width="20" height="13" rx="2" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
              <path d="M2 10h20" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
              <circle cx="7" cy="18" r="1.5" fill="white"/>
              <circle cx="17" cy="18" r="1.5" fill="white"/>
            </svg>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#111827", letterSpacing: "-0.2px" }}>
              Mini Bus List
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {loading ? "Loading…" : `${filteredRows.length} bus${filteredRows.length !== 1 ? "es" : ""} found`}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          <TextField
            size="small"
            placeholder="Search bus no, owner, agency…"
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
            onClick={() => router.push("/admin/bus/new")}
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
            + Register Bus
          </Button>
        </Box>
      </Box>

      {/* ── Table ── */}
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {["Bus", "Agency / Owner", "Documents", "Fitness", "Insurance", "Audit", "Actions"].map((h) => (
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
                    key={row.BusId}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#fafbff" },
                      "&:last-child td": { borderBottom: "none" },
                      transition: "background 0.15s ease",
                    }}
                  >
                    {/* Bus */}
                    <TableCell sx={{ ...bodyCell, minWidth: 160 }}>
                      <BusNoBadge value={row.BusNo} />
                      <Box display="flex" alignItems="center" gap={0.6} mt={0.8}>
                        <Chip
                          label={`Type ${row.BusType}`}
                          size="small"
                          sx={{ borderRadius: "6px", backgroundColor: "#f0f4ff", color: "#4f46e5", fontWeight: 700, fontSize: "0.67rem", border: "1px solid #c7d2fe", height: 20 }}
                        />
                        <Chip
                          label={row.IsActive ? "Active" : "Inactive"}
                          size="small"
                          sx={{
                            borderRadius: "6px",
                            backgroundColor: row.IsActive ? "#f0fdf4" : "#f9fafb",
                            color: row.IsActive ? "#15803d" : "#9ca3af",
                            fontWeight: 700,
                            fontSize: "0.67rem",
                            border: `1px solid ${row.IsActive ? "#bbf7d0" : "#e5e7eb"}`,
                            height: 20,
                          }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ color: "#b0b5c4", mt: 0.4, display: "block" }}>
                        ID: {row.BusId}
                      </Typography>
                    </TableCell>

                    {/* Agency / Owner */}
                    <TableCell sx={{ ...bodyCell, minWidth: 160 }}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: "#111827", fontSize: "0.82rem" }}>
                        {row.AgencyName || "—"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.2 }}>
                        ID: {row.AgencyId}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="12" cy="7" r="4" stroke="#9ca3af" strokeWidth="2"/>
                        </svg>
                        <Typography variant="caption" fontWeight={600} sx={{ color: "#374151", fontSize: "0.77rem" }}>
                          {row.OwnerName || "—"}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Documents */}
                    <TableCell sx={{ ...bodyCell, minWidth: 150 }}>
                      <Stack spacing={0.6}>
                        <DocThumb path={row.RcPhotoPath} label="RC Photo" accent="#010a2a" />
                        <DocThumb path={row.FitnessPath} label="Fitness Cert" accent="#8b5cf6" />
                        <DocThumb path={row.InsurancePath} label="Insurance" accent="#f59e0b" />
                      </Stack>
                    </TableCell>

                    {/* Fitness */}
                    <TableCell sx={{ ...bodyCell, minWidth: 130 }}>
                      <ValidityPill label="Fitness Upto" date={row.FitnessUpto} />
                    </TableCell>

                    {/* Insurance */}
                    <TableCell sx={{ ...bodyCell, minWidth: 130 }}>
                      <ValidityPill label="Insurance Upto" date={row.InsuranceUpto} />
                    </TableCell>

                    {/* Audit */}
                    <TableCell sx={{ ...bodyCell, minWidth: 160 }}>
                      <Box display="flex" flexDirection="column" gap={0.4}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", width: 36 }}>By</Typography>
                          <Typography variant="caption" fontWeight={600} sx={{ color: "#374151" }}>{row.CreatedBy}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", width: 36 }}>On</Typography>
                          <Typography variant="caption" fontWeight={600} sx={{ color: "#374151" }}>{fmt(row.CreatedDate)}</Typography>
                        </Box>
                        <Tooltip title={row.CreatedIpAddress}>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 0.4,
                              mt: 0.2,
                              px: 1,
                              py: 0.3,
                              borderRadius: "6px",
                              backgroundColor: "#f3f4f6",
                              border: "1px solid #e5e7eb",
                              width: "fit-content",
                              cursor: "default",
                            }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="2"/>
                              <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.68rem", fontWeight: 600 }}>
                              {row.CreatedIpAddress}
                            </Typography>
                          </Box>
                        </Tooltip>
                        {row.ModifiedBy && (
                          <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.68rem", mt: 0.2 }}>
                            Modified: {fmt(row.ModifiedDate)}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>

                    {/* Actions */}
                    <TableCell sx={{ ...bodyCell, minWidth: 130 }}>
                      <Stack spacing={0.8} alignItems="stretch">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => router.push(`/admin/bus/${row.BusId}`)}
                          sx={actionBtn("#010a2a", "#e8eaf6")}
                        >
                          View / Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={actionBtn("#f59e0b", "#fffbeb")}
                        >
                          Renew Docs
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={actionBtn("#ef4444", "#fef2f2")}
                        >
                          Deactivate
                        </Button>
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
                      {search ? `No results for "${search}"` : "No buses registered"}
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

export default BusTable;