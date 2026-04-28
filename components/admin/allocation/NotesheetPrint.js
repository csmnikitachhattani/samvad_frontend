"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import adminServices from "@/services/adminServices";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const defaultRows = [
  {
    id: 1, workType: "PRODUCTION", sno: 1, roNum: "0562687/262", Vehicle_No: 'CG04MH3959',
    wo_subject: "LED Mounted (Per day Minimum 4 Programme) Size 12X8 Feet LED Screen (p6). equipped with GPS System , Audion Visual Equipment and Generator Along with LED Screen LED Technian",
    unit: "Master Version", frqucy: "4", totDays: "5 days",
    totDur: "5x1=5 Min(s)", start_date: "", end_date: "", rate: "5", total_rate: "37500.00",
    client_name: "", client_cd: "",
  },
];

export default function WorkOrder() {
  const [regnNo]                    = useState("209");
  const [clientName, setClientName] = useState("");
  const [subject,    setSubject]    = useState("");
  const [clientRef,  setClientRef]  = useState("");
  const [rows,       setRows]       = useState(defaultRows);
  const [isDownloading, setIsDownloading] = useState(false);
  const [CGST_amount, setCGSTAmount] = useState('');
  const [SGST_amount, setSGSTAmount] = useState('');
  const [net_amt,     setNetAmount]  = useState('');

  const searchParams = useSearchParams();
  const job      = searchParams.get("job_id");
  const avak_ref = searchParams.get("avak_ref");

  useEffect(() => {
    async function fetchPrintData() {
      const payload = {
        fin_year: localStorage.getItem('financialYear'),
        avak_ref,
        job_no: job,
      };
      try {
        const response = await adminServices.getNoteSheetPrintDetail(payload);
        const data = response?.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          setRows(data);
          setClientName(data[0]?.client_name  ?? "");
          setSubject(data[0]?.wo_subject      ?? "");
          setClientRef(data[0]?.ref_data      ?? "");
          setCGSTAmount(data[0]?.CGST_amount);
          setSGSTAmount(data[0]?.SGST_amount);
          setNetAmount(data[0]?.net_amt);
        }
      } catch (err) {
        console.error("Failed to fetch print data", err);
      }
    }
    fetchPrintData();
  }, []);

  const totalAmt = rows.reduce((s, r) => s + (parseFloat(r.total_rate) || 0), 0);

  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return isNaN(d) ? date : d.toLocaleDateString("en-GB");
  };

  const formatINR = (value) => {
    const num = Number(value);
    if (isNaN(num)) return "0.00";
    return num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  /**
   * Smart PDF export — never splits a <tr> across pages.
   *
   * How it works:
   *  1. Render the whole printArea to one big canvas (html2canvas).
   *  2. Query every <tr> and record its top/bottom in canvas-pixel space.
   *  3. Walk through the canvas in A4-height strips.
   *     Whenever a strip would cut through a row, pull the cut-point up
   *     to just before that row starts.
   *  4. Copy each strip into a temporary canvas and add it as one PDF page.
   */
  const downloadPDF = async () => {
    setIsDownloading(true);
    await new Promise(r => setTimeout(r, 120)); // wait for button to disappear from DOM

    try {
      const element = document.getElementById("printArea");

      // ── Step 1: render to high-res canvas ──────────────────────────────
      const SCALE = 2;
      const canvas = await html2canvas(element, {
        scale: SCALE,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // ── Step 2: record every row's pixel span inside the canvas ────────
      const elRect   = element.getBoundingClientRect();
      const allRows  = element.querySelectorAll("thead tr, tbody tr");
      const rowBands = Array.from(allRows).map(tr => {
        const r = tr.getBoundingClientRect();
        return {
          top:    Math.floor((r.top    - elRect.top)  * SCALE),
          bottom: Math.ceil ((r.bottom - elRect.top)  * SCALE),
        };
      });

      // ── Step 3: A4 geometry in canvas-pixel units ───────────────────────
      const A4_W_MM  = 210;
      const A4_H_MM  = 297;
      const pxPerMm  = canvas.width / A4_W_MM;
      const pageH_px = Math.floor(A4_H_MM * pxPerMm);

      // ── Step 4: compute slice boundaries ───────────────────────────────
      const slices = [];         // [{y, h}]  in canvas pixels
      let cursor   = 0;

      while (cursor < canvas.height) {
        let bottom = cursor + pageH_px;

        if (bottom >= canvas.height) {
          // last (partial) page
          slices.push({ y: cursor, h: canvas.height - cursor });
          break;
        }

        // Does any row straddle this cut line?
        const splitRow = rowBands.find(
          rb => rb.top < bottom && rb.bottom > bottom
        );

        if (splitRow) {
          // Move cut to just before the row that would be split
          bottom = splitRow.top;
        }

        const h = bottom - cursor;

        if (h <= 0) {
          // Safety: single row taller than a full page — include it anyway
          const bigRow = rowBands.find(rb => rb.top === cursor) ??
                         { bottom: cursor + pageH_px };
          const safeH  = bigRow.bottom - cursor;
          slices.push({ y: cursor, h: safeH });
          cursor += safeH;
          continue;
        }

        slices.push({ y: cursor, h });
        cursor = bottom;
      }

      // ── Step 5: build PDF ───────────────────────────────────────────────
      const pdf = new jsPDF("p", "mm", "a4");

      slices.forEach((slice, idx) => {
        // Copy just this horizontal strip from the big canvas
        const tmp    = document.createElement("canvas");
        tmp.width    = canvas.width;
        tmp.height   = Math.ceil(slice.h);

        tmp.getContext("2d").drawImage(
          canvas,
          0,            Math.floor(slice.y),  // src x, y
          canvas.width, Math.ceil(slice.h),   // src w, h
          0,            0,                    // dst x, y
          canvas.width, Math.ceil(slice.h)    // dst w, h
        );

        const imgData    = tmp.toDataURL("image/png");
        const printedH   = slice.h / pxPerMm;   // mm on the PDF page

        if (idx > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, A4_W_MM, printedH);
      });

      pdf.save(`notesheet_${job || "file"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setIsDownloading(false);
    }
  };

  /* ── read-only field ── */
  const Field = ({ value, style = {} }) => (
    <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", ...style }}>
      {value || ""}
    </span>
  );

  /* ── styles ── */
  const s = {
    page:    { background: "#e8e8e8", minHeight: "100vh", padding: "40px", fontFamily: "Arial, sans-serif", fontSize: "12px" },
    btns:    { display: "flex", gap: 8, marginBottom: 12, justifyContent: "center" },
    btn:     { padding: "6px 18px", fontSize: 12, cursor: "pointer", border: "1px solid #555", borderRadius: 2, background: "#fff" },
    btnP:    { background: "#1a3a6b", color: "#fff", border: "1px solid #1a3a6b" },
    card:    { maxWidth: 650, margin: "0 auto", background: "#fff", border: "2px solid #000", padding: "20px 14px" },
    center:  { textAlign: "center" },
    bold:    { fontWeight: "bold" },
    row:     { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    hrThick: { borderTop: "2px solid #000", margin: "6px 0" },
    label:   { fontWeight: "bold", whiteSpace: "nowrap", marginRight: 4 },
  };

  const thStyle = {
    border: "1px solid #000", padding: "3px 5px", textAlign: "center",
    fontWeight: "bold", fontSize: 11, background: "#f0f0f0", verticalAlign: "middle",
  };
  const tdStyle = {
    border: "1px solid #000", padding: "3px 5px", fontSize: 11, verticalAlign: "top",
  };

  return (
    <div style={s.page}>

      {/* Button hidden while capturing so it never appears in the PDF */}
      {!isDownloading && (
        <div style={s.btns}>
          <button style={{ ...s.btn, ...s.btnP }} onClick={downloadPDF}>
            Download PDF
          </button>
        </div>
      )}

      {isDownloading && (
        <div style={{ ...s.btns, color: "#1a3a6b", fontWeight: "bold" }}>
          Generating PDF, please wait…
        </div>
      )}

      <div style={s.card} id="printArea">

        {/* HEADER */}
        <div style={{ ...s.row, alignItems: "flex-start", border: "1px solid #000" }}>
          <div style={{ flex: 1 }} />
          <div style={{ flex: 3, textAlign: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: 18 }}>CHHATTISGARH SAMVAD</div>
            <div style={{ fontSize: 11 }}>(An Associate Organization of CG Public Relation Dept.)</div>
            <div style={{ fontSize: 10, marginTop: 2 }}>
              North Block, Sec-19, Atal Nagar, Nava Raipur, CHHATTISGARH, 0771-2512567, https://samvad.cg.nic.in/
            </div>
          </div>
          <div style={{ flex: 1, textAlign: "right", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
            <span>Regn No.</span>
            <Field value={regnNo} />
          </div>
        </div>

        <div style={s.hrThick} />

        {/* GST / PAN / TAN */}
        <div style={{ ...s.row, fontSize: 11 }}>
          <div><b>GST No : 22AAATC9294Q1Z4</b></div>
          <div><b>PAN No : AAATC9294Q</b></div>
          <div><b>TAN : JBPC00957F</b></div>
        </div>

        <div style={s.hrThick} />

        {/* TITLE */}
        <div style={{ ...s.center, ...s.bold, fontSize: 15, margin: "6px 0" }}>
          Mounted Vehicle NoteSheet
        </div>
        <div style={{ borderTop: "1px solid #000", margin: "6px 0" }} />

        {/* CLIENT INFO */}
        <div style={{ display: "flex", padding: "4px 6px", gap: 4, marginBottom: 2 }}>
          <span style={s.label}>Client Name :</span>
          <Field value={clientName} />
        </div>
        <div style={{ display: "flex", padding: "4px 6px", gap: 4, marginBottom: 2 }}>
          <span style={s.label}>Subject :</span>
          <Field value={subject} />
        </div>
        <div style={{ display: "flex", padding: "4px 6px", gap: 4 }}>
          <span style={s.label}>Client Ref :</span>
          <Field value={clientRef} />
        </div>

        {/* TABLE HEADING */}
        <div style={{ ...s.bold, marginTop: 16, marginBottom: 4 }}>
          LED Vehicle Outdoor media किये जाने वाले कार्य का विवरण निम्नानुसार है :-
        </div>

        {/* WORK TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: 28 }}>S.No.</th>
              <th style={{ ...thStyle, width: 85 }}>Vehicle No</th>
              <th style={{ ...thStyle, width: 200 }}>Description</th>
              <th style={{ ...thStyle, width: 80 }}>Start Date – End Date</th>
              <th style={{ ...thStyle, width: 70 }}>Rate</th>
              <th style={{ ...thStyle, width: 70 }}>Tot. RO Amt</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id ?? i}>
                <td style={{ ...tdStyle, textAlign: "center" }}>{i + 1}</td>
                <td style={tdStyle}>
                  <Field value={r.VehicleNo ?? r.Vehicle_No ?? ""} />
                </td>
                <td style={tdStyle}>
                  <Field value={r.description ?? r.wo_subject ?? ""} />
                  {r.Specification && (
                    <div style={{ marginTop: 2 }}>
                      <Field value={r.Specification} />
                    </div>
                  )}
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <Field value={formatDate(r.start_date)} />
                  <hr style={{ margin: "3px 0" }} />
                  <Field value={formatDate(r.end_date)} />
                </td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>
                  ₹{formatINR(r.rate)}
                </td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>
                  ₹{formatINR(r.total_rate)}
                </td>
              </tr>
            ))}

            {/* ── Totals ── */}
            <tr>
              <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>Amount</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>₹{formatINR(totalAmt.toFixed(2))}</td>
            </tr>
            <tr>
              <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>CGST Charges (9%)</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>₹{formatINR(CGST_amount)}</td>
            </tr>
            <tr>
              <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>SGST Charges (9%)</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>₹{formatINR(SGST_amount)}</td>
            </tr>
            <tr>
              <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>Grand Total</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>₹{formatINR(net_amt)}</td>
            </tr>
          </tbody>
        </table>

        {/* SIGNATURES */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: 60, gap: 8, textAlign: "center" }}>
          <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>महाप्रबंधक</div></div>
          <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>कृपया अनुमोदनार्थ</div></div>
          <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>उपमहाप्रबंधक</div></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: 70, gap: 8, textAlign: "center" }}>
          <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>अतिरिक्त मुख्य कार्यपालन अधिकारी</div></div>
        </div>

      </div>

      <style>{`
        @media print {
          body { background: white; margin: 0; }
          #printArea { border: 2px solid #000 !important; max-width: 100% !important; margin: 0 !important; }
          button { display: none !important; }
        }
      `}</style>
    </div>
  );
}