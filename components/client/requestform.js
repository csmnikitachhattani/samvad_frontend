"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";

/* ═══════════════════════════════════════════════════════════════════════
   INSERT / UPDATE CLIENT ADVERTISEMENT REQUEST
   Design: Instrument Sans · Arctic White / Navy Blue palette
   Logic: 100% unchanged from original
═══════════════════════════════════════════════════════════════════════ */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wdth,wght@0,75..100,400..700;1,75..100,400..700&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:            #f0f4fb;
    --surface:       #ffffff;
    --surface-sub:   #f8faff;
    --border:        #dde3f0;
    --border-hover:  #b0bfdd;
    --border-focus:  #2563eb;
    --accent:        #2563eb;
    --accent-dk:     #1d4ed8;
    --accent-lt:     #eff4ff;
    --accent-ring:   rgba(37,99,235,0.12);
    --text:          #0d1b3e;
    --text-2:        #4a5a7a;
    --text-3:        #8898b8;
    --success:       #059669;
    --success-bg:    #ecfdf5;
    --error:         #dc2626;
    --error-bg:      #fef2f2;
    --shadow-1: 0 1px 3px rgba(13,27,62,0.06), 0 1px 2px rgba(13,27,62,0.04);
    --shadow-2: 0 4px 16px rgba(13,27,62,0.08), 0 2px 6px rgba(13,27,62,0.04);
    --shadow-3: 0 16px 48px rgba(13,27,62,0.14), 0 4px 14px rgba(13,27,62,0.06);
    --r:  14px;
    --r2: 9px;
    --ease: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ── PAGE ── */
  .rf-page {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 70% 50% at 15% 0%,  rgba(37,99,235,0.08) 0%, transparent 55%),
      radial-gradient(ellipse 55% 40% at 85% 100%, rgba(37,99,235,0.06) 0%, transparent 55%);
    padding: 40px 20px 72px;
    font-family: 'Inter', sans-serif;
    color: var(--text);
  }
  .rf-inner { max-width: 1040px; margin: 0 auto; }

  /* ── PAGE HEADER ── */
  .rf-hd {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }
  .rf-eyebrow {
    font-size: 10.5px; font-weight: 600;
    letter-spacing: 0.11em; text-transform: uppercase;
    color: var(--accent);
    display: flex; align-items: center; gap: 7px;
    margin-bottom: 5px;
  }
  .rf-eyebrow-line {
    width: 18px; height: 2px;
    background: var(--accent); border-radius: 1px;
  }
  .rf-title {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 28px; font-weight: 700;
    letter-spacing: -0.6px; line-height: 1.15;
    color: var(--text);
  }
  .rf-pills { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 13px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    box-shadow: var(--shadow-1);
  }
  .pill-lbl { font-size: 9.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); }
  .pill-val { font-family: 'Instrument Sans', sans-serif; font-size: 13px; font-weight: 700; color: var(--text); }

  /* ── CARD ── */
  .rf-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r);
    box-shadow: var(--shadow-2);
    overflow: hidden;
    margin-bottom: 0;
  }

  /* ── CARD HEADER ── */
  .rf-card-hd {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 30px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(90deg, #f6f9ff 0%, #ffffff 100%);
  }
  .rf-card-label {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 15px; font-weight: 600; color: var(--text);
  }
  .rf-card-sub { font-size: 12px; color: var(--text-3); margin-top: 2px; }
  .rf-fy-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 13px;
    background: var(--accent-lt);
    border: 1px solid rgba(37,99,235,0.22);
    border-radius: 100px;
    font-size: 10.5px; font-weight: 700; color: var(--accent);
    letter-spacing: 0.04em; text-transform: uppercase;
    white-space: nowrap;
  }

  /* ── FORM ── */
  .rf-form { padding: 30px; }

  /* ── DIVIDER ── */
  .rf-sep {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--border) 15%, var(--border) 85%, transparent 100%);
    margin: 24px 0;
  }

  /* ── NEWSPAPER SECTION LABEL ── */
  .rf-np-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.09em;
    color: var(--text-2); margin-bottom: 14px;
    display: flex; align-items: center; gap: 8px;
  }
  .rf-np-label::after {
    content: ''; flex: 1; height: 1px;
    background: var(--border);
  }

  /* ── NEWSPAPER TILES ── */
  .np-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 0;
  }
  @media(max-width:700px) { .np-grid { grid-template-columns: repeat(2, 1fr); } }

  .np-tile {
    border: 1.5px solid var(--border);
    border-radius: var(--r2);
    padding: 16px 14px 14px;
    background: var(--surface-sub);
    transition: border-color 0.18s var(--ease), box-shadow 0.18s var(--ease), background 0.18s var(--ease);
    display: flex; flex-direction: column; gap: 10px;
    cursor: text;
  }
  .np-tile:focus-within {
    border-color: var(--np-color, var(--accent));
    background: var(--surface);
    box-shadow: 0 0 0 3px var(--np-ring, var(--accent-ring));
  }
  .np-tile:hover:not(:focus-within) { border-color: var(--border-hover); background: #f2f6ff; }
  .np-hd {
    display: flex; align-items: center; gap: 7px;
    font-size: 10.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.09em;
    color: var(--text-2);
  }
  .np-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--np-color, var(--accent)); flex-shrink: 0; }
  .np-foot { font-size: 10px; color: var(--text-3); text-align: center; font-weight: 500; letter-spacing: 0.03em; }

  /* ── SUMMARY PANEL ── */
  .rf-smry {
    background: linear-gradient(140deg, var(--accent-lt) 0%, #f0f6ff 100%);
    border: 1.5px solid rgba(37,99,235,0.18);
    border-radius: var(--r2);
    padding: 20px;
  }
  .smry-ttl {
    font-size: 10.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--accent);
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 14px;
  }
  .smry-ttl::after { content: ''; flex: 1; height: 1px; background: rgba(37,99,235,0.18); }
  .smry-row {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 7px 0;
    border-bottom: 1px dashed rgba(37,99,235,0.1);
  }
  .smry-row:last-child { border-bottom: none; }
  .smry-k { font-size: 10.5px; font-weight: 500; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.05em; }
  .smry-v { font-size: 12.5px; font-weight: 600; color: var(--text); text-align: right; max-width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .smry-v.hi { color: var(--accent); }

  /* ── FOOTER ── */
  .rf-footer {
    padding: 18px 30px;
    border-top: 1px solid var(--border);
    background: linear-gradient(90deg, #f6f9ff 0%, #ffffff 100%);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    flex-wrap: wrap;
  }

  /* ── BOTTOM DUAL ── */
  .bottom-dual {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 18px;
    align-items: start;
  }
  @media(max-width:700px) { .bottom-dual { grid-template-columns: 1fr; } }

  /* ── MUI OVERRIDES ── */
  .rf-form .MuiOutlinedInput-root {
    border-radius: 9px !important;
    background: var(--surface-sub) !important;
    font-family: 'Inter', sans-serif !important;
    font-size: 13.5px !important;
    transition: border-color 0.18s var(--ease), background 0.18s var(--ease), box-shadow 0.18s var(--ease) !important;
  }
  .rf-form .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: var(--border-hover) !important;
  }
  .rf-form .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--border-focus) !important;
    border-width: 1.5px !important;
  }
  .rf-form .MuiOutlinedInput-root.Mui-focused {
    background: var(--surface) !important;
    box-shadow: 0 0 0 3px var(--accent-ring) !important;
  }
  .rf-form .MuiOutlinedInput-notchedOutline {
    border-color: var(--border) !important;
    border-width: 1.5px !important;
  }
  .rf-form .MuiInputLabel-root {
    font-family: 'Inter', sans-serif !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.06em !important;
    color: var(--text-3) !important;
  }
  .rf-form .MuiInputLabel-root.Mui-focused { color: var(--accent) !important; }
  .rf-form .MuiInputBase-input {
    font-family: 'Inter', sans-serif !important;
    font-size: 13.5px !important;
    color: var(--text) !important;
    padding: 10px 13px !important;
  }
  .rf-form .MuiSelect-select {
    font-family: 'Inter', sans-serif !important;
    font-size: 13.5px !important;
    color: var(--text) !important;
  }

  /* ── BUTTONS ── */
  .btn-cancel {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    height: 42px; padding: 0 22px;
    border-radius: var(--r2);
    font-family: 'Instrument Sans', sans-serif; font-size: 13.5px; font-weight: 600;
    cursor: pointer; border: 1.5px solid var(--border);
    background: transparent; color: var(--text-2);
    outline: none; transition: all 0.18s var(--ease);
  }
  .btn-cancel:hover { background: #f0f4fb; border-color: var(--border-hover); color: var(--text); }

  .btn-submit {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    height: 42px; padding: 0 28px;
    border-radius: var(--r2); min-width: 160px;
    font-family: 'Instrument Sans', sans-serif; font-size: 13.5px; font-weight: 600;
    cursor: pointer; border: none; outline: none;
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
    color: #fff;
    box-shadow: 0 2px 10px rgba(37,99,235,0.28);
    transition: all 0.18s var(--ease);
    letter-spacing: 0.01em;
  }
  .btn-submit:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
    box-shadow: 0 5px 18px rgba(37,99,235,0.38);
    transform: translateY(-1px);
  }
  .btn-submit:active:not(:disabled) { transform: none; }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: none; }

  .spin {
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: turn 0.65s linear infinite; display: inline-block;
  }
  @keyframes turn { to { transform: rotate(360deg); } }

  /* ── MODAL OVERRIDES ── */
  .rf-modal-title {
    font-family: 'Instrument Sans', sans-serif !important;
    font-size: 16px !important; font-weight: 700 !important;
  }
  .rf-modal-content { padding: 24px 28px 16px !important; text-align: center; }
  .rf-modal-icon {
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--success-bg);
    border: 2px solid rgba(5,150,105,0.2);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px; font-size: 22px; color: var(--success);
  }
  .rf-modal-ref {
    display: inline-flex; align-items: center; gap: 7px;
    margin-top: 12px; padding: 7px 16px;
    background: var(--accent-lt);
    border: 1px solid rgba(37,99,235,0.18);
    border-radius: 100px;
    font-size: 12px; font-weight: 600; color: var(--accent);
  }

  @media(max-width:820px) {
    .rf-title { font-size: 22px; }
    .rf-form { padding: 20px; }
    .rf-card-hd { padding: 16px 20px; }
    .rf-footer { padding: 14px 20px; }
  }
`;

const NP_TILES = [
  { key: "printInNationalNp", label: "National", color: "#2563eb", ring: "rgba(37,99,235,0.12)" },
  { key: "printInLocalNp",    label: "Local",    color: "#0891b2", ring: "rgba(8,145,178,0.12)" },
  { key: "printInStateNp",    label: "State",    color: "#7c3aed", ring: "rgba(124,58,237,0.12)" },
  { key: "printInOtherNp",    label: "Other",    color: "#d97706", ring: "rgba(217,119,6,0.12)" },
];

/* ═══════════════════════════════════════════════════════════════════════ */
const RequestForm = ({ category }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── Router Params ──
  const action  = searchParams.get("action");
  const rowData = searchParams.get("rowData") ? JSON.parse(searchParams.get("rowData")) : null;

  // ── State ──
  const [formData, setFormData] = useState({
    subject: "", captionCd:"", tenderAmt: "", letterNo: "", letterDate: "",
    scheduleDate: "", remarks: "", refCategoryId: "", refCategoryText: "",
    printInNationalNp: "" || null, printInLocalNp: "" || null,
    printInStateNp: "" || null,   printInOtherNp: "" || null,
    ip_address: "", forwardStatus: "N", deleteStatus: "N",
  });

  const [loading,     setLoading]     = useState(false);
  const [showModal,   setShowModal]   = useState(false);
  const [savedRefId,  setSavedRefId]  = useState("");

  // ── Local Storage ──
  const [financialYear, setFinancialYear] = useState("");
  const [userId,        setUserId]        = useState("");
  const [user_name,     setUserName]      = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("financialYear", localStorage.getItem("financialYear") || "2024-2025");
    localStorage.setItem("userId",        localStorage.getItem("userId")        || "00100");
    localStorage.setItem("refCategoryId", localStorage.getItem("refCategoryId") || "02");
    localStorage.setItem("user_name",     localStorage.getItem("user_name")     || "SUPERINTENDING ENGINEER, City Circle-II CSPDCL,Raipur, रायपुर");
    setFinancialYear(localStorage.getItem("financialYear"));
    setUserId(localStorage.getItem("userId"));
    setUserName(localStorage.getItem("user_name"));
    const getIP = async () => {
      try {
        const res  = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setFormData(p => ({ ...p, ip_address: data.ip }));
      } catch { console.error("IP fetch failed"); }
    };
    getIP();
  }, []);





// ── Category ──
const catText = category?.catText || "";
const category_option = catText ? catText.split("-")[0].trim() : "";
const catId = category?.catId || "";
const form_option = ["classified", "display"].includes(category_option.toLowerCase());

// ── Autofill Category ──
useEffect(() => {
  if (catText && action !== "update") {
    setFormData((p) => ({
      ...p,
      refCategoryId: catId,
      refCategoryText: category_option,
    }));
  }
}, [catText, action, catId, category_option]);

// ── Call Caption API when Category Selected ──
const [captions, setCaptions] = useState([]);




useEffect(() => {
  if (catId) {
    axios
      .get(`http://103.79.34.50:8083/api/ManageMaster/getallAdvtCaptions?allowedRefCateId=${catId}`)
      .then((res) => {
        const filtered =
          res.data?.result?.filter(
            (item) => item.allowed_ref_cate_id === catId
          ) || [];

        setCaptions(filtered);
      })
      .catch((err) => {
        console.error("Caption API Error:", err);
      });
  }
}, [catId]);


  // ── Autofill Edit ──
  useEffect(() => {
    if (action === "update" && rowData) {
      setFormData({
        subject:            rowData.subject            || "",
        tenderAmt:          rowData.tenderAmt          || "",
        letterNo:           rowData.letterNo           || "",
        letterDate:         rowData.letterDate?.split("T")[0]   || "",
        scheduleDate:       rowData.scheduleDate?.split("T")[0] || "",
        remarks:            rowData.remarks            || "",
        refCategoryId:      rowData.refCategoryId      || "",
        refCategoryText:    rowData.refCategoryText    || "",
        printInNationalNp:  rowData.printInNationalNp  || "",
        printInLocalNp:     rowData.printInLocalNp     || "",
        printInStateNp:     rowData.printInStateNp     || "",
        printInOtherNp:     rowData.printInOtherNp     || "",
        ip_address:         rowData.ip_address         || "",
        deleteStatus:  "N", forwardStatus: "N",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [action, rowData]);

  // ── Handle Change ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  // ── Submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://103.79.34.50:8083/api/Client/insertclientadvtrequest",
        { ...formData, financialYear, userId, user_name }
      );
      setSavedRefId(res.data.ref_id);
      setShowModal(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting form");
    } finally { setLoading(false); }
  };

 

  // ── Redirect ──
  const handleOk = () => {
    setShowModal(false);
    router.push(`/client/upload-file/${savedRefId}?financialYear=${financialYear}`);
  };

  const totalPapers = [formData.printInNationalNp, formData.printInLocalNp, formData.printInStateNp, formData.printInOtherNp]
    .reduce((s, v) => s + (Number(v) || 0), 0);

  const isUpdate = action === "update";

  /* ── UI ── */
  return (
    <>
      <style>{STYLES}</style>

          {/* Card */}
          <div className="rf-card">

            {/* Card Header */}
            <div className="rf-card-hd">
                  <div>
              <div className="rf-eyebrow">
                <span className="rf-eyebrow-line" />
                Advertisement Management
              </div>
              <div className="rf-title">
                {isUpdate ? "Update Client Request" : "New Advertisement Request"}
              </div>
              <div>
                <div className="rf-card-label">
                  {isUpdate ? "Edit Request Details" : "Request Details"}
                </div>
                <div className="rf-card-sub">
                  Fields marked <span style={{color:"#2563eb", fontWeight:700}}>*</span> are required
                </div>
              </div>
            </div>
            <div className="rf-pills">
              
                <div className="pill">
                  <span className="pill-lbl">FY</span>
                  <span className="pill-val">{financialYear}</span>
                </div>
        
             
            </div>
              
             
            </div>

            {/* Form Body */}
            <div className="rf-form">
              <Grid container spacing={2} sx={{ mb: 2 }}>

                {/* Letter No */}
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth size="small"
                    label="Letter No"
                    name="letterNo"
                    value={formData.letterNo}
                    onChange={handleChange}
                    placeholder="e.g. LTR/2024/001"
                  />
                </Grid>

                {/* Letter Date */}
                 <Grid item size={{xs:12, sm:6, md:3}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Letter Date *"
                      format="DD/MM/YYYY"
                      value={formData.letterDate ? dayjs(formData.letterDate) : null}
                      minDate={dayjs().subtract(7, "day")}
                      maxDate={dayjs()}
                      onChange={(newValue) => {
                        if (!newValue || !newValue.isValid()) {
                          setFormData(prev => ({ ...prev, letterDate: "" }));
                          return;
                        }
                        setFormData(prev => ({
                          ...prev,
                          letterDate: newValue.format("YYYY-MM-DD"),
                          scheduleDate: "",
                        }));
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true, required: true, size: "small",
                          inputProps: { readOnly: true },
                          onPaste: e => e.preventDefault(),
                          onKeyDown: e => e.preventDefault(),
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                  {/* Schedule Date */}
                <Grid item size={{xs:12, sm:6, md:3}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Schedule Date *"
                      format="DD/MM/YYYY"
                      value={formData.scheduleDate ? dayjs(formData.scheduleDate) : null}
                      minDate={dayjs().add(3, "day")}
                      onChange={(newValue) => {
                        if (!newValue || !newValue.isValid()) {
                          setFormData(prev => ({ ...prev, scheduleDate: "" }));
                          return;
                        }
                        setFormData(prev => ({
                          ...prev,
                          scheduleDate: newValue.format("YYYY-MM-DD"),
                        }));
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true, required: true, size: "small",
                          inputProps: { readOnly: true },
                          onPaste: e => e.preventDefault(),
                          onKeyDown: e => e.preventDefault(),
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

               
            

                {/* Caption Select */}
<Grid item size={{xs:12, sm:6, md:3}}>
  <TextField
    select
    fullWidth
    size="small"
    label="Caption"
    name="captionCd"
    value={formData.captionCd}
    onChange={handleChange}
  >
    {captions.map((item) => (
      <MenuItem key={item.caption_cd} value={item.caption_cd}>
        {item.caption_name} ({item.caption_name_hindi})
      </MenuItem>
    ))}
  </TextField>
</Grid>

              </Grid>

              <Grid container spacing={2} sx={{ mb: 0 }}>
               
                  {/* Tender Amount */}
               <Grid item size={{xs:12, sm:6, md:4}}>
                  <TextField
                    fullWidth size="small"
                    label="Tender Amount *"
                    name="tenderAmt"
                    value={formData.tenderAmt}
                    required
                    inputMode="decimal"
                    placeholder="0.00"
                    InputProps={{ startAdornment: <span style={{color:"var(--text-3)", marginRight:4, fontSize:13}}>₹</span> }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d{0,2}$/.test(value)) {
                        setFormData(prev => ({ ...prev, tenderAmt: value }));
                      }
                    }}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", ","].includes(e.key)) e.preventDefault();
                    }}
                  />
                </Grid>


                {/* Subject */}
                   <Grid item size={{xs:12, sm:6, md:7}}>
                  <TextField
                    fullWidth rows={1} multiline
                    size="small"
                    label="Subject *"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Enter advertisement subject"
                  />
                </Grid>

              
              

              </Grid>

              {/* Newspaper Distribution */}
              {form_option && (
                <>
                  <div className="rf-sep" />
                  <div className="rf-np-label">Newspaper Distribution — No. of Papers</div>
                  <div className="np-grid">
                    {NP_TILES.map(({ key, label, color, ring }) => (
                      <div
                        className="np-tile" key={key}
                        style={{ "--np-color": color, "--np-ring": ring }}
                      >
                        <div className="np-hd">
                          <span className="np-dot" />
                          {label}
                        </div>
                        {/* Render as plain input inside tile for styling, but use TextField internally */}
                        <TextField
                          fullWidth size="small"
                          type="number"
                          name={key}
                          value={formData[key] || ""}
                          onChange={handleChange}
                          placeholder="0"
                          inputProps={{ min: 0, style: { textAlign: "center", fontSize: 26, fontWeight: 700, fontFamily: "'Instrument Sans', sans-serif", padding: "4px 0 8px", borderBottom: `2px solid ${color}`, borderRadius: 0 } }}
                          sx={{
                            "& .MuiOutlinedInput-root": { background: "transparent !important", boxShadow: "none !important" },
                            "& .MuiOutlinedInput-notchedOutline": { border: "none !important" },
                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { border: "none !important" },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none !important" },
                            "& .MuiOutlinedInput-root.Mui-focused": { boxShadow: "none !important" },
                          }}
                        />
                        <div className="np-foot">newspapers</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="rf-sep" />

              {/* Remarks + Summary */}
              <div className="bottom-dual">
                <TextField
                  fullWidth multiline rows={3}
                  label="Remarks / Additional Notes"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter any additional remarks, special instructions, or notes here…"
                />

                <div className="rf-smry">
                  <div className="smry-ttl">Summary</div>
                  {[
                    { k: "Subject",      v: formData.subject      || "—" },
                    // { k: "Amount",       v: formData.tenderAmt ? `₹ ${formData.tenderAmt}` : "—", hi: true },
                    { k: "Category",     v: category_option       || "—" },
                    { k: "Letter Date",  v: formData.letterDate   || "—" },
                    { k: "Schedule",     v: formData.scheduleDate || "—" },
                    // { k: "Total Papers", v: totalPapers || "—",  hi: true },
                  ].map(({ k, v, hi }) => (
                    <div className="smry-row" key={k}>
                      <span className="smry-k">{k}</span>
                      <span className={`smry-v${hi ? " hi" : ""}`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>{/* /rf-form */}

            {/* Footer */}
            <div className="rf-footer">
              <button className="btn-cancel" onClick={() => router.back()} disabled={loading}>
                Cancel
              </button>
              <button
                className="btn-submit"
                disabled={loading}
                onClick={isUpdate ? handleUpdate : handleSubmit}
              >
                {loading
                  ? <><span className="spin" />&nbsp;Processing…</>
                  : <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12l5 5L20 7"/>
                      </svg>
                      {isUpdate ? "Update Request" : "Submit Request"}
                    </>
                }
              </button>
            </div>

          </div>{/* /rf-card */}
      

      {/* ── Success Modal ── */}
      <Dialog
        open={showModal}
        onClose={handleOk}
        PaperProps={{
          sx: {
            borderRadius: "18px",
            maxWidth: 380,
            width: "100%",
            overflow: "hidden",
            border: "1px solid #dde3f0",
            boxShadow: "0 16px 48px rgba(13,27,62,0.14)",
          }
        }}
      >
        <DialogTitle sx={{
          background: "linear-gradient(90deg, #f6f9ff 0%, #fff 100%)",
          borderBottom: "1px solid #dde3f0",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "15px", fontWeight: 700,
          color: "#0d1b3e", py: 2, px: 3,
        }}>
          {isUpdate ? "Request Updated" : "Request Submitted"}
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", py: 4, px: 3 }}>
          <Box sx={{
            width: 58, height: 58, borderRadius: "50%",
            background: "#ecfdf5", border: "2px solid rgba(5,150,105,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: "22px",
          }}>
            ✓
          </Box>
          <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#4a5a7a", lineHeight: 1.65 }}>
            {isUpdate ? "Record updated successfully!" : "Data submitted successfully!"}
          </Typography>
          <Box sx={{
            display: "inline-flex", alignItems: "center", gap: 1,
            mt: 2, px: 2, py: 0.8,
            background: "#eff4ff", border: "1px solid rgba(37,99,235,0.18)",
            borderRadius: "100px",
          }}>
            <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: "#2563eb" }}>
              Ref ID:&nbsp;<strong>{savedRefId}</strong>
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3, pt: 0 }}>
          <button className="btn-submit" onClick={handleOk} style={{minWidth: 140}}>
            Continue →
          </button>
        </DialogActions>
      </Dialog>

      {/* inject btn styles outside scoped form */}
      <style>{`
        .btn-cancel, .btn-submit {
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          height: 42px; padding: 0 22px;
          border-radius: 9px;
          font-family: 'Instrument Sans', sans-serif; font-size: 13.5px; font-weight: 600;
          cursor: pointer; outline: none;
          transition: all 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        .btn-cancel {
          background: transparent; color: #4a5a7a;
          border: 1.5px solid #dde3f0;
        }
        .btn-cancel:hover { background: #f0f4fb; border-color: #b0bfdd; color: #0d1b3e; }
        .btn-submit {
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          color: #fff; border: none; min-width: 158px;
          box-shadow: 0 2px 10px rgba(37,99,235,0.28);
        }
        .btn-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
          box-shadow: 0 5px 18px rgba(37,99,235,0.38);
          transform: translateY(-1px);
        }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: none; }
      `}</style>
    </>
  );
};

export default RequestForm;