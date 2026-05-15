
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCTION-GRADE  •  Update Client Advertisement Request
   Design: Instrument Sans + Inter · Arctic White / Navy Blue palette
───────────────────────────────────────────────────────────────────────────── */

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
    --shadow-1: 0 1px 3px rgba(13,27,62,0.06),0 1px 2px rgba(13,27,62,0.04);
    --shadow-2: 0 4px 16px rgba(13,27,62,0.08),0 2px 6px rgba(13,27,62,0.04);
    --shadow-3: 0 16px 48px rgba(13,27,62,0.14),0 4px 14px rgba(13,27,62,0.06);
    --r:  14px;
    --r2: 9px;
    --r3: 6px;
    --fd: 'Instrument Sans', sans-serif;
    --fb: 'Inter', sans-serif;
    --ease: cubic-bezier(0.4,0,0.2,1);
  }

  /* ─── PAGE ─── */
  .ucrf-page {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 70% 50% at 15% 0%, rgba(37,99,235,0.08) 0%, transparent 55%),
      radial-gradient(ellipse 55% 40% at 85% 100%, rgba(37,99,235,0.06) 0%, transparent 55%);
    padding: 40px 20px 72px;
    font-family: var(--fb);
    color: var(--text);
  }

  .ucrf-inner { max-width: 1040px; margin: 0 auto; }

  /* ─── HEADER ─── */
  .ucrf-hd {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }
  .ucrf-hd-left {}
  .ucrf-eyebrow {
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 5px;
  }
  .ucrf-eyebrow-line {
    width: 18px; height: 2px;
    background: var(--accent);
    border-radius: 1px;
    display: inline-block;
  }
  .ucrf-title {
    font-family: var(--fd);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.6px;
    line-height: 1.15;
    color: var(--text);
  }
  .ucrf-hd-pills {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 13px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    box-shadow: var(--shadow-1);
  }
  .pill-lbl { font-size: 9.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); }
  .pill-val { font-family: var(--fd); font-size: 13px; font-weight: 700; color: var(--text); }
  .pill-status {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 13px;
    background: var(--accent-lt);
    border: 1px solid rgba(37,99,235,0.22);
    border-radius: 100px;
    font-size: 10.5px; font-weight: 700; color: var(--accent);
    letter-spacing: 0.04em; text-transform: uppercase;
  }
  .pill-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent);
    animation: blink 1.8s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }

  /* ─── CARD ─── */
  .ucrf-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r);
    box-shadow: var(--shadow-2);
    overflow: hidden;
  }

  /* ─── CARD-TOP ─── */
  .ucrf-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(90deg, #f6f9ff 0%, #ffffff 100%);
  }
  .ucrf-card-top-info {}
  .ucrf-card-label { font-family: var(--fd); font-size: 15px; font-weight: 600; color: var(--text); }
  .ucrf-card-sub { font-size: 12px; color: var(--text-3); margin-top: 2px; }
  .ucrf-card-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--accent-lt);
    border: 1px solid rgba(37,99,235,0.18);
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
  }

  /* ─── FORM GRID ─── */
  .ucrf-form { padding: 30px; }

  .row {
    display: grid;
    gap: 18px;
    margin-bottom: 18px;
  }
  .r3   { grid-template-columns: repeat(3, 1fr); }
  .r211 { grid-template-columns: 2fr 1fr 1fr; }
  .r12  { grid-template-columns: 1fr 2fr; }

  @media(max-width:820px) {
    .r3, .r211 { grid-template-columns: repeat(2, 1fr); }
  }
  @media(max-width:520px) {
    .r3, .r211, .r12 { grid-template-columns: 1fr; }
    .ucrf-form { padding: 20px; }
    .ucrf-card-top { padding: 16px 20px; }
    .ucrf-footer { padding: 16px 20px; }
    .ucrf-title { font-size: 22px; }
  }

  /* ─── FIELD ─── */
  .fld { display: flex; flex-direction: column; gap: 5px; }

  .fld-lbl {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-2);
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .req { color: var(--accent); font-size: 13px; line-height: 1; }

  .fld-ctrl {
    width: 100%;
    height: 44px;
    padding: 0 13px;
    background: var(--surface-sub);
    border: 1.5px solid var(--border);
    border-radius: var(--r2);
    font-family: var(--fb);
    font-size: 13.5px;
    color: var(--text);
    outline: none;
    transition: border-color 0.18s var(--ease), background 0.18s var(--ease), box-shadow 0.18s var(--ease);
    -webkit-appearance: none;
  }
  .fld-ctrl::placeholder { color: var(--text-3); font-size: 12.5px; }
  .fld-ctrl:hover:not([readonly]) { border-color: var(--border-hover); background: #f2f6ff; }
  .fld-ctrl:focus:not([readonly]) {
    border-color: var(--border-focus);
    background: var(--surface);
    box-shadow: 0 0 0 3px var(--accent-ring);
  }
  .fld-ctrl[readonly] {
    background: #f0f3f9;
    color: var(--text-2);
    cursor: default;
    border-style: dashed;
  }
  textarea.fld-ctrl {
    height: auto;
    min-height: 108px;
    padding: 11px 13px;
    resize: vertical;
    line-height: 1.65;
  }

  .pfx-wrap { position: relative; }
  .pfx-sym {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    font-size: 13px; font-weight: 600; color: var(--text-3);
    pointer-events: none; z-index: 1;
  }
  .pfx-wrap .fld-ctrl { padding-left: 26px; }

  /* ─── DIVIDER ─── */
  .ucrf-sep {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--border) 15%, var(--border) 85%, transparent 100%);
    margin: 24px 0;
  }

  /* ─── NEWSPAPER CARDS ─── */
  .np-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }
  @media(max-width:700px) { .np-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:380px) { .np-grid { grid-template-columns: 1fr; } }

  .np-tile {
    border: 1.5px solid var(--border);
    border-radius: var(--r2);
    padding: 16px 14px 14px;
    background: var(--surface-sub);
    transition: border-color 0.18s var(--ease), box-shadow 0.18s var(--ease), background 0.18s var(--ease);
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: text;
  }
  .np-tile:focus-within {
    border-color: var(--np-color, var(--accent));
    background: var(--surface);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--np-color, var(--accent)) 14%, transparent);
  }
  .np-tile:hover:not(:focus-within) { border-color: var(--border-hover); background: #f2f6ff; }

  .np-hd {
    display: flex; align-items: center; gap: 7px;
    font-size: 10.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.09em;
    color: var(--text-2);
  }
  .np-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--np-color, var(--accent));
    flex-shrink: 0;
  }
  .np-num {
    border: none; outline: none;
    background: transparent;
    font-family: var(--fd);
    font-size: 28px; font-weight: 700;
    color: var(--text);
    width: 100%;
    text-align: center;
    border-bottom: 2px solid var(--border);
    padding-bottom: 6px;
    transition: border-color 0.18s var(--ease);
  }
  .np-num::placeholder { font-size: 15px; font-weight: 400; color: var(--text-3); }
  .np-num:focus { border-bottom-color: var(--np-color, var(--accent)); outline: none; }
  .np-foot {
    font-size: 10px; color: var(--text-3);
    text-align: center; font-weight: 500;
    letter-spacing: 0.03em;
  }

  /* ─── BOTTOM DUAL PANEL ─── */
  .bottom-dual {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 18px;
    align-items: start;
  }
  @media(max-width:700px) { .bottom-dual { grid-template-columns: 1fr; } }

  /* Summary Panel */
  .smry {
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
  .smry-ttl::after { content:''; flex:1; height:1px; background: rgba(37,99,235,0.18); }
  .smry-row {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 7px 0;
    border-bottom: 1px dashed rgba(37,99,235,0.1);
  }
  .smry-row:last-child { border-bottom: none; }
  .smry-k { font-size: 10.5px; font-weight: 500; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.05em; }
  .smry-v {
    font-size: 12.5px; font-weight: 600; color: var(--text);
    text-align: right; max-width: 58%;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .smry-v.hi { color: var(--accent); }

  /* ─── FOOTER ─── */
  .ucrf-footer {
    padding: 18px 30px;
    border-top: 1px solid var(--border);
    background: linear-gradient(90deg, #f6f9ff 0%, #ffffff 100%);
    display: flex;
    align-items: right;
    justify-content:right;
    flex-wrap: wrap;
    gap: 12px;
  }
  .footer-info {
    display: flex; align-items: center; gap: 6px;
    font-size: 11.5px; color: var(--text-3);
  }
  .footer-info strong { color: var(--text-2); font-weight: 600; }
  .btn-row { display: flex; gap: 10px; }

  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    height: 42px; padding: 0 22px;
    border-radius: var(--r2);
    font-family: var(--fd); font-size: 13.5px; font-weight: 600;
    letter-spacing: 0.01em;
    cursor: pointer; border: none; outline: none;
    transition: all 0.18s var(--ease);
  }
  .btn-outline {
    background: transparent;
    color: var(--text-2);
    border: 1.5px solid var(--border);
  }
  .btn-outline:hover { background: #f0f4fb; border-color: var(--border-hover); color: var(--text); }
  .btn-prime {
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
    color: #fff;
    min-width: 158px;
    box-shadow: 0 2px 10px rgba(37,99,235,0.28);
  }
  .btn-prime:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
    box-shadow: 0 5px 18px rgba(37,99,235,0.38);
    transform: translateY(-1px);
  }
  .btn-prime:active:not(:disabled) { transform: none; }
  .btn-prime:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: none; }

  .spin {
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: turn 0.65s linear infinite;
  }
  @keyframes turn { to { transform:rotate(360deg); } }

  /* ─── OVERLAY ─── */
  .overlay {
    position: fixed; inset: 0;
    background: rgba(10,20,50,0.45);
    backdrop-filter: blur(5px);
    z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: fadein 0.2s ease;
  }
  @keyframes fadein { from{opacity:0} to{opacity:1} }

  .modal {
    background: var(--surface);
    border-radius: 18px;
    width: 100%; max-width: 390px;
    box-shadow: var(--shadow-3);
    overflow: hidden;
    animation: slideup 0.26s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes slideup {
    from { opacity:0; transform:translateY(22px) scale(0.95); }
    to   { opacity:1; transform:none; }
  }

  .modal-body { padding: 32px 28px 24px; text-align: center; }
  .modal-ring {
    width: 62px; height: 62px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
    font-size: 24px; font-weight: 700;
  }
  .modal-ring.ok  { background: var(--success-bg); border: 2px solid rgba(5,150,105,0.2); color: var(--success); }
  .modal-ring.err { background: var(--error-bg);   border: 2px solid rgba(220,38,38,0.2);  color: var(--error);   }
  .modal-ttl {
    font-family: var(--fd); font-size: 19px; font-weight: 700;
    letter-spacing: -0.3px; color: var(--text); margin-bottom: 8px;
  }
  .modal-msg { font-size: 13.5px; color: var(--text-2); line-height: 1.65; }
  .modal-ref {
    display: inline-flex; align-items: center; gap: 7px;
    margin-top: 16px; padding: 7px 16px;
    background: var(--accent-lt);
    border: 1px solid rgba(37,99,235,0.18);
    border-radius: 100px;
    font-size: 12px; font-weight: 600; color: var(--accent);
  }
  .modal-foot { padding: 4px 28px 28px; display: flex; justify-content: center; }
  .btn-modal {
    height: 44px; padding: 0 44px;
    background: linear-gradient(135deg,#2563eb,#3b82f6);
    color: #fff;
    border: none; border-radius: var(--r2);
    font-family: var(--fd); font-size: 14px; font-weight: 600;
    cursor: pointer; letter-spacing: 0.01em;
    transition: all 0.18s var(--ease);
    box-shadow: 0 2px 10px rgba(37,99,235,0.28);
  }
  .btn-modal:hover {
    background: linear-gradient(135deg,#1d4ed8,#2563eb);
    box-shadow: 0 5px 18px rgba(37,99,235,0.38);
  }

  /* ─── LOADING ─── */
  .ucrf-loading {
    min-height: 100vh; display: flex;
    align-items: center; justify-content: center;
    flex-direction: column; gap: 14px;
    background: var(--bg); font-family: var(--fb);
  }
  .loading-ring {
    width: 40px; height: 40px;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: turn 0.75s linear infinite;
  }
  .loading-lbl { font-size: 13.5px; color: var(--text-3); font-weight: 500; letter-spacing: 0.02em; }
`;

const NP = [
  { key: "printInNationalNp", label: "National", color: "#2563eb" },
  { key: "printInLocalNp",    label: "Local",    color: "#0891b2" },
  { key: "printInStateNp",    label: "State",    color: "#7c3aed" },
  { key: "printInOtherNp",    label: "Other",    color: "#d97706" },
];

/* ─────────────────────────────────────────────────────────────────────────── */
export default function UpdateClientRequestForm() {

  const params = useParams();
  const ref_id = params?.ref_id;
  const category=params?.category;
  
  const router = useRouter();

  const [loading,      setLoading]      = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [openModal,    setOpenModal]    = useState(false);
  const [modalMsg,     setModalMsg]     = useState("");
  const [isOk,         setIsOk]         = useState(false);

  const [fd, setFd] = useState({
    subject: "", tenderAmt: "", letterNo: "", letterDate: "",
    scheduleDate: "", refCategoryId: "", refCategoryText: "",
    printInNationalNp: "", printInLocalNp: "", printInStateNp: "",
    printInOtherNp: "", printInOtherRemark: "",
    ip_address: "", forwardStatus: "N", deleteStatus: "N",
    clientSnoKey: "", clientCd: "",
  });

  const [financialYear, setFinancialYear] = useState("");
  const [userId,        setUserId]        = useState("");
  const [user_name,     setUserName]      = useState("");
  const [userTypeCd,   setUserTypeCd]      = useState("");
  const [sectionCd, setSectionCd] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const financialYearLS = localStorage.getItem("financialYear");
    const userIdLS = localStorage.getItem("userid");
    const userNameLS = localStorage.getItem("username");
    const userTypeCdLS = localStorage.getItem("usertypecode");
    const sectionCdLS = localStorage.getItem("sectionCd");
  
    setFinancialYear(financialYearLS);
    setUserId(userIdLS);
    setUserName(userNameLS);
    setUserTypeCd(userTypeCdLS);
    setSectionCd(sectionCdLS)
  
    const getIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setFormData(p => ({ ...p, ip_address: data.ip }));
      } catch {
        console.error("IP fetch failed");
      }
    };
  // }, []);


  // useEffect(() => {
    if (!ref_id) return;
    (async () => {
      try {
        const res = await axios.get(
          "http://103.79.34.50:8083/api/Client/getclientadvtrequests",
          { params: 
            { 
              user_id: localStorage.getItem("userid"), 
              financial_year: localStorage.getItem("financialYear"), 
              action: "get_by_id", 
              ref_id, 
              category:"08" 
            } }
        );
        if (res.data?.message !== "Success") { alert(res.data?.message || "Fetch failed"); return; }
        const d = res.data?.data?.[0];
        if (!d) { alert("No record found"); return; }
        setFd({
          subject:            d.subject               || "",
          tenderAmt:          d.tender_Amt            || "",
          letterNo:           d.letter_No             || "",
          letterDate:         d.letter_Date?.split("T")[0]   || "",
          scheduleDate:       d.schedule_Date?.split("T")[0] || "",
          refCategoryId:      d.ref_Category_Id       || "",
          refCategoryText:    d.ref_Category_Text     || "",
          printInNationalNp:  d.print_In_National_Np  || "",
          printInLocalNp:     d.print_In_Local_Np     || "",
          printInStateNp:     d.print_In_State_Np     || "",
          printInOtherNp:     d.print_In_Other_Np     || "",
          printInOtherRemark: d.print_In_Other_Remark || "",
          ip_address:         "100.12.12.12",
          deleteStatus: "N", forwardStatus: "N",
          clientSnoKey: d.client_Sno_Key || "",
          clientCd:     d.client_Cd      || "",
        });
      } catch { alert("Error fetching record"); }
      finally { setFetchLoading(false); }
    })();
  }, [ref_id, userId, financialYear, category]);

  const set = (e) => setFd(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleUpdate = async () => {
    if (!ref_id) return;
    setLoading(true);
    try {
      const payload = {
        refId: ref_id, financialYear,
        subject:            fd.subject,
        clientSnoKey:       Number(fd.clientSnoKey) || 0,
        clientCd:           fd.clientCd  || "",
        tenderAmt:          Number(fd.tenderAmt) || 0,
        letterNo:           fd.letterNo  || "",
        letterDate:         fd.letterDate   ? new Date(fd.letterDate).toISOString()   : null,
        scheduleDate:       fd.scheduleDate ? new Date(fd.scheduleDate).toISOString() : null,
        remarks:            fd.printInOtherRemark || "",
        printInNationalNp:  Number(fd.printInNationalNp) || 0,
        printInLocalNp:     Number(fd.printInLocalNp)    || 0,
        printInStateNp:     Number(fd.printInStateNp)    || 0,
        printInOtherNp:     Number(fd.printInOtherNp)    || 0,
        printInOtherRemark: fd.printInOtherRemark || "",
        deleteStatus:  fd.deleteStatus  || "N",
        forwardStatus: fd.forwardStatus || "N",
        captionCd: fd.caption_Cd || "",
        refCategoryId:   fd.refCategoryId   || "",
        // refCategoryText: fd.refCategoryText || "",

        ip_address: fd.ip_address || "100.12.12.12",
        userId,
      };
      const res = await axios.put("http://103.79.34.50:8083/api/Client/updateclientadvtrequest", payload);
      const ok = res.data?.message === "UPDATE successful";
      setIsOk(ok);
      setModalMsg(ok ? "The advertisement request has been updated successfully." : res.data?.message || "Update failed.");
    } catch (err) {
      setIsOk(false);
      setModalMsg(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
      setOpenModal(true);
    }
  };

  const totalPapers = [fd.printInNationalNp, fd.printInLocalNp, fd.printInStateNp, fd.printInOtherNp]
    .reduce((s, v) => s + (Number(v) || 0), 0);

  if (fetchLoading) return (
    <>
      <style>{STYLES}</style>
      <div className="ucrf-loading">
        <div className="loading-ring" />
        <span className="loading-lbl">Fetching record…</span>
      </div>
    </>
  );

  return (
    <>
      <style>{STYLES}</style>

      <div className="ucrf-page">
        <div className="ucrf-inner">

          {/* Header */}
          <div className="ucrf-hd">
            <div className="ucrf-hd-left">
              <div className="ucrf-eyebrow">
                <span className="ucrf-eyebrow-line" />
                Advertisement Management
              </div>
              <div className="ucrf-title">Update Client Request</div>
            </div>
            <div className="ucrf-hd-pills">
              <div className="pill">
                <span className="pill-lbl">Ref ID</span>
                <span className="pill-val">{ref_id || "—"}</span>
              </div>
              <div className="pill">
                <span className="pill-lbl">FY</span>
                <span className="pill-val">{financialYear}</span>
              </div>
            
            </div>
          </div>

          {/* Card */}
          <div className="ucrf-card">

            {/* Card Top */}
            <div className="ucrf-card-top">
              <div className="ucrf-card-top-info">
                <div className="ucrf-card-label">Request Details</div>
                <div className="ucrf-card-sub">Fields marked <span style={{color:"#2563eb"}}>*</span> are required</div>
              </div>
            
            </div>

            {/* Form */}
            <div className="ucrf-form">

              {/* Row 1 */}
              <div className="row r3">
                <div className="fld">
                  <label className="fld-lbl">Letter No</label>
                  <input className="fld-ctrl" name="letterNo" value={fd.letterNo} onChange={set} placeholder="e.g. LTR/2024/001" />
                </div>
                <div className="fld">
                  <label className="fld-lbl">Letter Date <span className="req">*</span></label>
                  <input className="fld-ctrl" type="date" name="letterDate" value={fd.letterDate} onChange={set} />
                </div>
                <div className="fld">
                  <label className="fld-lbl">Schedule Date <span className="req">*</span></label>
                  <input className="fld-ctrl" type="date" name="scheduleDate" value={fd.scheduleDate} onChange={set} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="row r211">
                <div className="fld">
                  <label className="fld-lbl">Subject <span className="req">*</span></label>
                  <input className="fld-ctrl" name="subject" value={fd.subject} onChange={set} placeholder="Enter advertisement subject" />
                </div>
                <div className="fld">
                  <label className="fld-lbl">Tender Amount <span className="req">*</span></label>
                  <div className="pfx-wrap">
                    <span className="pfx-sym">₹</span>
                    <input className="fld-ctrl" name="tenderAmt" value={fd.tenderAmt} onChange={set} placeholder="0.00" />
                  </div>
                </div>
                <div className="fld">
                  <label className="fld-lbl">Category</label>
                  <input className="fld-ctrl" name="caption_Cd" value={fd.caption_Cd} readOnly placeholder="Auto-filled" />
                </div>
              </div>

              <div className="ucrf-sep" />

              {/* Newspaper Distribution */}
              <div className="fld" style={{marginBottom: 18}}>
                <label className="fld-lbl" style={{marginBottom: 12}}>Newspaper Distribution — No. of Papers</label>
                <div className="np-grid">
                  {NP.map(({ key, label, color }) => (
                    <div className="np-tile" key={key} style={{"--np-color": color}}>
                      <div className="np-hd">
                        <span className="np-dot" />
                        {label}
                      </div>
                      <input
                        className="np-num"
                        type="number" min="0"
                        name={key}
                        value={fd[key]}
                        onChange={set}
                        placeholder="0"
                      />
                      <div className="np-foot">newspapers</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ucrf-sep" />

              {/* Remarks + Summary */}
              <div className="bottom-dual">
                <div className="fld">
                  <label className="fld-lbl">Remarks / Additional Notes</label>
                  <textarea
                    className="fld-ctrl"
                    name="printInOtherRemark"
                    value={fd.printInOtherRemark}
                    onChange={set}
                    placeholder="Enter any additional remarks, special instructions, or notes here…"
                  />
                </div>
                <div className="smry">
                  <div className="smry-ttl">Summary</div>
                  {[
                    { k: "Subject",      v: fd.subject || "—" },
                    { k: "Amount",       v: fd.tenderAmt ? `₹ ${fd.tenderAmt}` : "—", hi: true },
                    { k: "Caption Code",     v: fd.caption_Cd || "—" },
                    { k: "Letter Date",  v: fd.letterDate   || "—" },
                    { k: "Schedule",     v: fd.scheduleDate || "—" },
                    { k: "Total Papers", v: totalPapers || "—", hi: true },
                  ].map(({ k, v, hi }) => (
                    <div className="smry-row" key={k}>
                      <span className="smry-k">{k}</span>
                      <span className={`smry-v${hi ? " hi" : ""}`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>{/* /form */}

            {/* Footer */}
            <div className="ucrf-footer ">
           
              <div className="btn-row">
                <button className="btn btn-outline" onClick={() => router.back()} disabled={loading}>
                  Cancel
                </button>
                <button className="btn btn-prime" onClick={handleUpdate} disabled={loading}>
                  {loading
                    ? <><div className="spin" />Updating…</>
                    : <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12l5 5L20 7"/>
                        </svg>
                        Update Request
                      </>
                  }
                </button>
              </div>
            </div>

          </div>{/* /card */}
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="overlay" onClick={() => { setOpenModal(false); router.push(`/client/upload-file/${ref_id}?financialYear=${financialYear}`); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-body">
              <div className={`modal-ring ${isOk ? "ok" : "err"}`}>
                {isOk ? "✓" : "✕"}
              </div>
              <div className="modal-ttl">{isOk ? "Update Successful" : "Update Failed"}</div>
              <div className="modal-msg">{modalMsg}</div>
              <div className="modal-ref">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                </svg>
                Ref ID: {ref_id}
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn-modal" onClick={() => { setOpenModal(false); router.push(`/client/upload-file/${ref_id}?financialYear=${financialYear}`); }}>
                Continue to Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}