"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import adminServices from "@/services/adminServices";
import clientServices from "@/services/clientServices";
import { Grid, TextField } from "@mui/material";

import {  useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";

const PRIMARY = "#030236";
const PRIMARY_LIGHT = "#eeeef8";
const BORDER = "#e2e4f0";
const TEXT = "#111827";
const MUTED = "#6b7280";
const BG = "#f5f6fa";
const SUCCESS = "#16a34a";
const ERROR = "#dc2626";

const DataSetUI = () => {
    const router = useRouter();
    const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const job_id = searchParams.get("id");
  const avak_ref = searchParams.get("avak_ref");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [records, setRecords] = useState([]);
  const [wosubject, setWosubject] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [commissionPercentage, setCommissionPercentage] = useState("");
  const [gstPercentage, setGstPercentage] = useState("");

  useEffect(() => {
    if (job_id && avak_ref) fetchRecords(job_id, avak_ref);
  }, [job_id, avak_ref]);

  const fetchRecords = async (jobId, avakRef) => {
    try {
      setLoading(true);
      const response = await adminServices.getAllocationRecord(jobId, avakRef);
      setData(response.data);
      setRecords(transformAgencyToDetails(response?.data?.records));
    } catch (err) {
      setError("Failed to load allocation records");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchClientRecords = async () => {

    // const payload ={
    //   user_id: '00100',
    //   financial_year: '2024-2025' 
    //   ref_id, 
    //   category

    // }
    try {
      setLoading(true);
      const response = await clientServices.getClientRequest(payload);
      setData(response.data);
      setRecords(transformAgencyToDetails(response?.data?.records));
    } catch (err) {
      setError("Failed to load allocation records");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const transformAgencyToDetails = (agencies) => {
    if (!Array.isArray(agencies)) return [];
    return agencies.map((agency) => ({
      vendorId: agency.vendor_id?.toString() || "",
      vendorName: agency.vendor_name || "",
      vendorCateId: agency.vendor_cate_id?.toString() || "",
      vendorCate: "outdoor media",
      ledVehicleId: agency.led_vehicle_id,
      description: agency.description,
      rate: agency.rate,
      no_of_vehicle: 1,
      no_of_programme: agency.no_of_programme,
      total_rate: agency.total_rate,
      startDate: agency.start_date,
      endDate: agency.end_date,
    }));
  };
  
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");
      const payload = {
        financial_year: '2025-2026',
        avak_ref_id: avak_ref,
        job_no: job_id,
        wo_subject: wosubject,
      
        client_cd: "000019",
        billing_Client_cd: "000019",
        billing_office_code: "00020",
        client_grp_cd: "00002",
      
        od_servicetype_id: 2,
      
        start_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
      
        commision_Percentage: commissionPercentage, // keep API spelling
        gst_percentage: gstPercentage,
      
        entry_ip_address: "103.79.34.50",
        entry_by_user_id: "string",
        entry_by_username: "string",
      
        ro_no_list: "",
      
        action_cd: "07",
        action_name: "Generate RO",
        status_reason_cd: "01",
        remark: "remark",
      
        entry_by_section_cd: "08",
        entry_by_type_cd: "09"
      };
      await adminServices.proceedWorkload(payload);
      setSuccess("Allocation submitted successfully.");
      dispatch(showNotification({ message: "Saved!", severity: "success" }))
      router.push(`/admin/counter`)
    } catch (err) {
      setError("Submission failed. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const fmt = (v) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v || 0);

  if (loading)
    return (
      <div style={s.centered}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={s.spinner} />
        <p style={{ color: MUTED, fontSize: 14, marginTop: 12 }}>Loading records…</p>
      </div>
    );

  if (error && !data)
    return (
      <div style={s.centered}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ ...s.alert, borderColor: ERROR, background: "#fef2f2", color: ERROR }}>
          ⚠ {error}
        </div>
      </div>
    );

  if (!data) return null;

  const { summary = {} } = data;

  const columns = [
    { label: "Vehicle ID", key: "ledVehicleId", mono: true },
    { label: "Rate",       key: "rate",          fmt: true },
    // { label: "Vehicles",   key: "no_of_vehicle" },
    { label: "Programme",  key: "no_of_programme" },
    { label: "Total",      key: "total_rate",    fmt: true, bold: true },
    { label: "Start Date", key: "startDate",    date: true },
    { label: "End Date",   key: "endDate",      date: true },
  ];

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      background: "#fff",
      fontSize: 13,
      "& fieldset": { borderColor: BORDER },
      "&:hover fieldset": { borderColor: "#a0a8c0" },
      "&.Mui-focused fieldset": { borderColor: PRIMARY },
    },
    "& .MuiInputLabel-root": { fontSize: 13, color: MUTED },
    "& .MuiInputLabel-root.Mui-focused": { color: PRIMARY },
  };

  return (
    <div style={s.page}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* ── 1. Dark header bar ── */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Allocation Summary</h1>
          <div style={s.meta}>
            <span style={s.metaLabel}>Job ID</span>
            <span style={s.metaVal}>{job_id}</span>
            <span style={s.sep}>·</span>
            <span style={s.metaLabel}>Avak Ref</span>
            <span style={s.metaVal}>{avak_ref}</span>
          </div>
        </div>
      </div>

      {/* ── 2. Form card — sits flush below header ── */}
      <div style={s.formCard}>
        <p style={s.formTitle}>Work Order Details</p>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth size="small"
              label="WO Subject"
              value={wosubject}
              onChange={(e) => setWosubject(e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth size="small"
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth size="small"
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth size="small"
              label="Commission %"
              value={commissionPercentage}
              onChange={(e) => setCommissionPercentage(e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth size="small"
              label="GST %"
              value={gstPercentage}
              onChange={(e) => setGstPercentage(e.target.value)}
              sx={fieldSx}
            />
          </Grid>
        </Grid>
      </div>

      {/* ── 3. Body ── */}
      <div style={s.body}>

        {/* Alerts */}
        {success && (
          <div style={{ ...s.alert, borderColor: SUCCESS, background: "#f0fdf4", color: SUCCESS }}>
            ✓ {success}
          </div>
        )}
        {error && (
          <div style={{ ...s.alert, borderColor: ERROR, background: "#fef2f2", color: ERROR }}>
            ⚠ {error}
          </div>
        )}

        {/* Summary Cards */}
        <div style={s.cardRow}>
          <StatCard label="Total Records" value={summary.total_records ?? 0} />
          <StatCard label="Grand Total"   value={fmt(summary.grand_total_amount)} primary />
          <StatCard label="Vendor Total"  value={fmt(summary.vendor_total_amount)} />
        </div>

        {/* Table */}
        <div style={s.tableCard}>
          <div style={s.tableHead}>
            <span style={s.tableTitle}>Allocation Records</span>
            <span style={s.badge}>{records.length} records</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} style={s.th}>{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} style={s.empty}>
                      No allocation records found.
                    </td>
                  </tr>
                ) : (
                  records.map((row, i) => (
                    <BodyRow key={i} row={row} columns={columns} fmt={fmt} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {records.length > 0 && (
            <div style={s.tableFooter}>
              <span style={{ color: MUTED, fontSize: 12 }}>
                Showing {records.length} record{records.length !== 1 ? "s" : ""}
              </span>
              <span style={{ fontSize: 13 }}>
                Grand Total:{" "}
                <strong style={{ color: PRIMARY }}>{fmt(summary.grand_total_amount)}</strong>
              </span>
            </div>
          )}
        </div>

        {/* ── Submit — bottom left ── */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button
            onClick={handleSubmit}
            disabled={submitting || records.length === 0}
            style={{
              ...s.submitBtn,
              opacity: submitting || records.length === 0 ? 0.5 : 1,
              cursor: submitting || records.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "Generating…" : "Generate Notesheet"}
          </button>
        </div>

      </div>
    </div>
  );
};

// ── Row with hover ────────────────────────────────────────────────────────────
function BodyRow({ row, columns, fmt }) {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      style={{
        background: hovered ? PRIMARY_LIGHT : "transparent",
        borderBottom: `1px solid ${BORDER}`,
        transition: "background 0.12s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {columns.map((c) => {
        let val = row[c.key];
        if (c.fmt)  val = fmt(val);
        if (c.date) val = val?.split("T")[0] ?? "—";
        return (
          <td
            key={c.key}
            style={{
              padding: "13px 20px",
              fontSize: c.mono ? 12 : 13,
              fontFamily: c.mono ? "'Courier New', monospace" : "inherit",
              color: c.bold ? PRIMARY : TEXT,
              fontWeight: c.bold ? 700 : 400,
              whiteSpace: "nowrap",
            }}
          >
            {val ?? "—"}
          </td>
        );
      })}
    </tr>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, primary }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 200,
        background: primary ? PRIMARY : "#fff",
        color: primary ? "#fff" : TEXT,
        border: `1px solid ${primary ? "transparent" : BORDER}`,
        borderRadius: 10,
        padding: "20px 24px",
        boxShadow: primary
          ? "0 4px 18px rgba(3,2,54,0.20)"
          : "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: primary ? "rgba(255,255,255,0.6)" : MUTED }}>
        {label}
      </p>
      <p style={{ margin: "8px 0 0", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>
        {value}
      </p>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  page: {
    minHeight: "100vh",
    background: BG,
    fontFamily: "'Inter', system-ui, sans-serif",
    color: TEXT,
  },
  header: {
    background: PRIMARY,
    padding: "24px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-0.01em",
  },
  meta: {
    marginTop: 6,
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  metaLabel: { fontSize: 12, color: "rgba(255,255,255,0.45)" },
  metaVal: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: 4,
  },
  sep: { color: "rgba(255,255,255,0.2)", margin: "0 4px" },

  /* ── Form card sits between header and body ── */
  formCard: {
    background: "#fff",
    borderBottom: `1px solid ${BORDER}`,
    padding: "20px 40px 24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  formTitle: {
    margin: "0 0 14px",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: MUTED,
  },

  body: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "32px 40px 64px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  cardRow: { display: "flex", gap: 16, flexWrap: "wrap" },
  tableCard: {
    background: "#fff",
    border: `1px solid ${BORDER}`,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  tableHead: {
    padding: "16px 24px",
    borderBottom: `1px solid ${BORDER}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableTitle: { fontSize: 15, fontWeight: 700, color: TEXT },
  badge: {
    fontSize: 11,
    fontWeight: 700,
    color: "#fff",
    background: PRIMARY,
    padding: "3px 10px",
    borderRadius: 20,
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "11px 20px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: MUTED,
    background: "#f9fafb",
    borderBottom: `1px solid ${BORDER}`,
    whiteSpace: "nowrap",
  },
  empty: {
    padding: "48px 20px",
    textAlign: "center",
    color: MUTED,
    fontSize: 14,
  },
  tableFooter: {
    padding: "12px 24px",
    borderTop: `1px solid ${BORDER}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fafafa",
    flexWrap: "wrap",
    gap: 8,
  },
  alert: {
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid",
    fontSize: 14,
    fontWeight: 500,
  },
  centered: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: BG,
    fontFamily: "system-ui, sans-serif",
  },
  spinner: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: `3px solid ${BORDER}`,
    borderTop: `3px solid ${PRIMARY}`,
    animation: "spin 0.75s linear infinite",
  },
  submitBtn: {
    background: PRIMARY,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "11px 28px",
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "inherit",
    boxShadow: "0 2px 8px rgba(3,2,54,0.25)",
    transition: "opacity 0.15s",
  },
};

export default DataSetUI;