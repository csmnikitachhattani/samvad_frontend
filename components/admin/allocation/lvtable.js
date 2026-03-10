'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import adminServices from "@/services/adminServices";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Stack,
  Divider,
  Collapse,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const fmtCurrency = (n) =>
  n != null ? `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "—";

// ── Search field ──────────────────────────────────────────────────────────────
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

// ── Stat block ────────────────────────────────────────────────────────────────
function StatBlock({ label, value, highlight, sub }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
      <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={800} sx={{ color: highlight ? "#15803d" : "#111827", fontSize: "0.88rem" }}>
        {value}
      </Typography>
      {sub && <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.68rem" }}>{sub}</Typography>}
    </Box>
  );
}

// ── Finance row ───────────────────────────────────────────────────────────────
function FinRow({ label, value, bold, green }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" py={0.35}>
      <Typography variant="caption" sx={{ color: "#9ca3af" }}>{label}</Typography>
      <Typography variant="caption" fontWeight={bold ? 800 : 600} sx={{ color: green ? "#15803d" : "#374151" }}>
        {value}
      </Typography>
    </Box>
  );
}

// ── Vehicle allocation card ───────────────────────────────────────────────────
function AllocationCard({ item, index }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        border: "1.5px solid #e8eaf6",
        backgroundColor: index % 2 === 0 ? "#fafbff" : "#fff",
        transition: "all 0.15s ease",
        "&:hover": { borderColor: "#c7d2fe", boxShadow: "0 2px 12px rgba(99,102,241,0.08)" },
      }}
    >
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} flexWrap="wrap">

        {/* Left: ID + vehicle */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box sx={{
            width: 36, height: 36, borderRadius: "10px",
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 3px 8px rgba(99,102,241,0.28)", flexShrink: 0,
          }}>
            <Typography variant="caption" fontWeight={800} sx={{ color: "#fff", fontSize: "0.75rem" }}>
              #{item.allocation_id}
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems="center" gap={0.8}>
              <Typography variant="body2" fontWeight={700} sx={{ color: "#111827" }}>
                Vehicle ID {item.led_vehicle_id}
              </Typography>
              <Chip label={item.vendor_cate || "—"} size="small" sx={{
                borderRadius: "6px", backgroundColor: "#fdf4ff", color: "#7e22ce",
                fontWeight: 600, fontSize: "0.66rem", border: "1px solid #e9d5ff", height: 20,
              }} />
            </Box>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>{item.vendor_name} · ID {item.vendor_id}</Typography>
          </Box>
        </Box>

        {/* Right: stats */}
        <Box display="flex" gap={3} flexWrap="wrap">
          <StatBlock label="Rate" value={fmtCurrency(item.rate)} />
          <StatBlock label="Vehicles" value={item.no_of_vehicle} />
          <StatBlock label="Programmes" value={item.no_of_programme} />
          <StatBlock label="Total Rate" value={fmtCurrency(item.total_rate)} highlight />
        </Box>
      </Box>

      {/* Date range */}
      <Box display="flex" alignItems="center" gap={0.6} mt={1.5}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="3" stroke="#9ca3af" strokeWidth="2.2"/>
          <path d="M3 10h18" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 600, fontSize: "0.74rem" }}>
          {fmt(item.start_date)} → {fmt(item.end_date)}
        </Typography>
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="caption" sx={{ color: "#b0b5c4", fontSize: "0.67rem" }}>by</Typography>
          <Typography variant="caption" fontWeight={700} sx={{ color: "#6366f1", fontSize: "0.72rem" }}>{item.entry_by_username}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ── Work Order Card ───────────────────────────────────────────────────────────
function WorkOrderCard({ row, router }) {
  const [open, setOpen] = useState(false);
  const detailCount = row.detailList?.length || 0;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "18px",
        border: "1.5px solid #ebebf0",
        overflow: "hidden",
        mb: 2.5,
        backgroundColor: "#fff",
        transition: "box-shadow 0.2s ease",
        "&:hover": { boxShadow: "0 4px 24px rgba(1,10,42,0.07)" },
      }}
    >
      {/* ── Card Header ── */}
      <Box
        sx={{
          px: 3, py: 2.2,
          background: "linear-gradient(135deg, #fafbff 0%, #f4f5fa 100%)",
          borderBottom: "1.5px solid #f0f0f5",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 1.5,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          {/* WO badge */}
          <Box sx={{
            px: 1.8, py: 0.7, borderRadius: "9px",
            backgroundColor: "#010a2a", border: "1px solid #010a2a",
            fontWeight: 800, fontSize: "0.8rem", color: "#fff",
            letterSpacing: "0.4px", fontFamily: "monospace",
            boxShadow: "0 3px 8px rgba(1,10,42,0.25)",
            whiteSpace: "nowrap",
          }}>
            {row.wo_no}
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#111827", lineHeight: 1.2 }}>
              {row.wo_subject || "—"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {fmt(row.wo_date)} · FY {row.financial_year}
            </Typography>
          </Box>
        </Box>

        {/* Right side chips + actions */}
        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
          <Chip label={`Job ${row.job_no}`} size="small" sx={{ borderRadius: "7px", backgroundColor: "#f8f9fb", color: "#6b7280", fontWeight: 600, fontSize: "0.68rem", border: "1px solid #e4e6ef", height: 22 }} />
          <Chip label={`Avak ${row.avak_ref_id}`} size="small" sx={{ borderRadius: "7px", backgroundColor: "#f8f9fb", color: "#6b7280", fontWeight: 600, fontSize: "0.68rem", border: "1px solid #e4e6ef", height: 22 }} />
          <Chip label={`Svc ${row.od_servicetype_id}`} size="small" sx={{ borderRadius: "7px", backgroundColor: "#f0f4ff", color: "#4f46e5", fontWeight: 700, fontSize: "0.68rem", border: "1px solid #c7d2fe", height: 22 }} />
          <Button size="small" variant="outlined"
            onClick={() => router.push(`/admin/work-order/${row.wo_no}`)}
            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600, fontSize: "0.75rem", borderColor: "#e4e6ef", color: "#374151", px: 1.5, py: 0.4, "&:hover": { borderColor: "#010a2a", color: "#010a2a", backgroundColor: "#f4f5f9" } }}>
            Edit
          </Button>
          <Button size="small" variant="contained"
            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 700, fontSize: "0.75rem", background: "#010a2a", px: 1.5, py: 0.5, boxShadow: "0 2px 6px rgba(1,10,42,0.25)", "&:hover": { background: "#0d1b4b" } }}>
            Generate Notesheet
          </Button>
        </Box>
      </Box>

      {/* ── Card Body ── */}
      <Box sx={{ px: 3, py: 2.5 }}>
        <Grid container spacing={3}>

          {/* Vendor block */}
          <Grid item size={{xs:12, sm:6, md:3}}>
            <Box sx={{ p: 2, borderRadius: "12px", backgroundColor: "#f8f9fb", border: "1px solid #e9eaf0", height: "100%" }}>
              <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700, display: "block", mb: 1 }}>
                Vendor
              </Typography>
              <Typography variant="body2" fontWeight={700} sx={{ color: "#111827" }}>{row.vendor_name}</Typography>
              <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.3 }}>ID: {row.vendor_id}</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" flexDirection="column" gap={0.3}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>Client</Typography>
                  <Typography variant="caption" fontWeight={600} sx={{ color: "#374151" }}>{row.client_cd}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>Grp</Typography>
                  <Typography variant="caption" fontWeight={600} sx={{ color: "#374151" }}>{row.client_grp_cd}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>Office</Typography>
                  <Typography variant="caption" fontWeight={600} sx={{ color: "#374151" }}>{row.billing_office_code}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Duration block */}
          <Grid item size={{xs:12, sm:6, md:3}}>
            <Box sx={{ p: 2, borderRadius: "12px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", height: "100%" }}>
              <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.67rem", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700, display: "block", mb: 1 }}>
                Campaign Duration
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Box>
                  <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase" }}>Start</Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ color: "#15803d" }}>{fmt(row.start_date)}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase" }}>End</Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ color: "#15803d" }}>{fmt(row.end_date)}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Financials block */}
          <Grid item size={{xs:12, sm:6, md:3}}>
            <Box sx={{ p: 2, borderRadius: "12px", backgroundColor: "#f8f9fb", border: "1px solid #e9eaf0", height: "100%" }}>
              <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.67rem", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700, display: "block", mb: 1 }}>
                Financials
              </Typography>
              <FinRow label={`Commission (${row.commision_Percentage}%)`} value={fmtCurrency(row.commission_amount)} />
              <FinRow label="With Commission" value={fmtCurrency(row.amount_with_commission)} />
              <FinRow label={`GST (${row.gst_percentage}%)`} value={fmtCurrency(row.gst_amount)} />
              <Divider sx={{ my: 0.8, borderStyle: "dashed" }} />
              <FinRow label="Total Amount" value={fmtCurrency(row.toatl_amount)} bold green />
            </Box>
          </Grid>

          {/* Allocation summary */}
          <Grid item size={{xs:12, sm:6, md:3}}>
            <Box
              onClick={() => setOpen(!open)}
              sx={{
                p: 2, borderRadius: "12px", height: "100%", cursor: "pointer",
                backgroundColor: open ? "#e8eaf6" : "#eef2ff",
                border: `1.5px solid ${open ? "#c5cae9" : "#c7d2fe"}`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
                transition: "all 0.18s ease",
                "&:hover": { backgroundColor: "#e0e7ff", borderColor: "#a5b4fc" },
              }}
            >
              <Typography variant="h4" fontWeight={900} sx={{ color: "#4f46e5", lineHeight: 1 }}>
                {detailCount}
              </Typography>
              <Typography variant="caption" fontWeight={700} sx={{ color: "#6366f1", textAlign: "center", fontSize: "0.72rem" }}>
                Vehicle{detailCount !== 1 ? "s" : ""} Allocated
              </Typography>
              <Box sx={{
                width: 26, height: 26, borderRadius: "7px",
                backgroundColor: open ? "#c5cae9" : "#c7d2fe",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.18s ease",
              }}>
                {open
                  ? <KeyboardArrowUpIcon sx={{ fontSize: 16, color: "#4f46e5" }} />
                  : <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "#4f46e5" }} />}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* ── Expanded allocations ── */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ px: 3, pb: 3, borderTop: "1.5px solid #e8eaf6", pt: 2.5, backgroundColor: "#f9faff" }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Box sx={{ width: 4, height: 16, borderRadius: "2px", background: "#6366f1" }} />
            <Typography variant="caption" fontWeight={700} sx={{ color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "0.7rem" }}>
              Vehicle Allocations · {detailCount} record{detailCount !== 1 ? "s" : ""}
            </Typography>
          </Box>
          <Stack spacing={1.5}>
            {row.detailList?.length > 0
              ? row.detailList.map((item, i) => <AllocationCard key={item.allocation_id} item={item} index={i} />)
              : <Box sx={{ py: 2, px: 2, borderRadius: "10px", backgroundColor: "#f3f4f8", border: "1px solid #e5e7eb", textAlign: "center" }}>
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>No allocations available</Typography>
                </Box>
            }
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <Paper elevation={0} sx={{ borderRadius: "18px", border: "1.5px solid #ebebf0", overflow: "hidden", mb: 2.5 }}>
      <Box sx={{ px: 3, py: 2.2, backgroundColor: "#f8f9fb", borderBottom: "1.5px solid #f0f0f5" }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Skeleton variant="rounded" width={90} height={32} sx={{ borderRadius: "9px" }} />
          <Box>
            <Skeleton variant="text" width={160} height={18} sx={{ borderRadius: 4 }} />
            <Skeleton variant="text" width={110} height={14} sx={{ borderRadius: 4, mt: 0.3 }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ px: 3, py: 2.5 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} md={i === 3 ? 4 : i === 4 ? 2 : 3} key={i}>
              <Skeleton variant="rounded" height={110} sx={{ borderRadius: "12px" }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
const WorkOrderCards = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        try {
          const res = await adminServices.getAllocationtList();
          console.log(res)
          setData(res)
        } catch (error) {
          console.error("Failed to fetch work orders", error);
        } finally {
          setLoading(false);
        }
      }
          
    fetchData();
  }, []);

  const filtered = data.filter((row) => {
    const t = search.toLowerCase();
    return (
      (row.wo_no || "").toLowerCase().includes(t) ||
      (row.wo_subject || "").toLowerCase().includes(t) ||
      (row.vendor_name || "").toLowerCase().includes(t) ||
      (row.job_no || "").toLowerCase().includes(t) ||
      (row.avak_ref_id || "").toLowerCase().includes(t)
    );
  });

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f5f9", py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>

        {/* ── Page header ── */}
        <Box mb={4} display="flex" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Box>
            <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
              <Box sx={{
                width: 44, height: 44, borderRadius: "13px", background: "#010a2a",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 6px 18px rgba(1,10,42,0.28)",
              }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12h6M9 16h4" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
              </Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: "#111827", letterSpacing: "-0.5px" }}>
                Allocation List 
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#9ca3af", ml: "60px" }}>
              {loading ? "Loading…" : `${filtered.length} work order${filtered.length !== 1 ? "s" : ""} · click the allocation box to expand vehicles`}
            </Typography>
          </Box>

          <Box display="flex" gap={1.5} alignItems="center" flexWrap="wrap">
            <TextField
              size="small"
              placeholder="Search WO, job, vendor…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              size="medium"
              onClick={() => router.push("/admin/work-order/new")}
              sx={{
                borderRadius: "10px", textTransform: "none", fontWeight: 700,
                fontSize: "0.85rem", px: 3, background: "#010a2a",
                boxShadow: "0 4px 12px rgba(1,10,42,0.28)",
                "&:hover": { background: "#0d1b4b", transform: "translateY(-1px)" },
                transition: "all 0.18s ease",
              }}
            >
              + New WO
            </Button>
          </Box>
        </Box>

        {/* ── Cards ── */}
        {loading ? (
          [1, 2, 3].map((i) => <SkeletonCard key={i} />)
        ) : filtered.length > 0 ? (
          filtered.map((row, i) => (
            <WorkOrderCard key={row.wo_no + i} row={row} router={router} />
          ))
        ) : (
          <Paper elevation={0} sx={{ borderRadius: "18px", border: "1.5px solid #ebebf0", py: 8, textAlign: "center" }}>
            <Box sx={{ width: 56, height: 56, borderRadius: "16px", backgroundColor: "#f3f4f8", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2 }}>
              <SearchIcon sx={{ fontSize: 28, color: "#c4c9d8" }} />
            </Box>
            <Typography variant="body1" fontWeight={700} sx={{ color: "#6b7280" }}>
              {search ? `No results for "${search}"` : "No work orders found"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>Try adjusting your search terms</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default WorkOrderCards;