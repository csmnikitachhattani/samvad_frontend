"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import adminServices from "@/services/adminServices";

const defaultRows = [
  {
    id: 1, workType: "PRODUCTION", sno: 1, roNum: "0562687/262", Vehicle_No: 'CG04MH3959',
    roSubject: "LED Mounted (Per day Minimum 4 Programme) Size 12X8 Feet LED Screen (p6). equipped with GPS System , Audion Visual Equipment and Generator Along with LED Screen LED Technian",
    unit: "Master Version", frqucy: "4", totDays: "5 days",
    totDur: "5x1=5 Min(s)", date: "NA", rate: "₹5", totAmt: "37500.00",
  },
  {
    id: 2, workType: "TELECAST", sno: 2, roNum: "0562687/9", Vehicle_No: 'CG04MH3959',
    roSubject: "LED Mounted (Per day Minimum 4 Programme) Size 12X8 Feet LED Screen (p6). equipped with GPS System , Audion Visual Equipment and Generator Along with LED Screen LED Technian",
    unit: "06 AM-12 NOON", frqucy: "4", totDays: "5 days",
    totDur: "181x1x5=905 Sec(s)", date: "08/12/2025 - 12/12/2025", rate: "₹6", totAmt: "33847.00",
  },
  {
    id: 3, workType: "TELECAST", sno: 2, roNum: "0562687/9", Vehicle_No: 'CG04MH3959',
    roSubject: "LED Mounted (Per day Minimum 4 Programme) Size 12X8 Feet LED Screen (p6). equipped with GPS System , Audion Visual Equipment and Generator Along with LED Screen LED Technian",
    unit: "06 AM-12 NOON", frqucy: "4", totDays: "5 days",
    totDur: "181x1x5=905 Sec(s)", date: "08/12/2025 - 12/12/2025", rate: "₹6", totAmt: "33847.00",
  },

];

export default function WorkOrder() {
  //const {avak_ref_id, job_id } = useParams();
  const [regnNo, setRegnNo] = useState("209");
  const [clientName, setClientName] = useState("अपर संचालक (इले.मी.), संचालनालय जनसंपर्क विभाग, रायपुर");
  const [subject, setSubject] = useState("माह दिसम्बर 2025ः शासकीय योजनाओं एवं कार्यक्रमों का समाचार चैनलों, एफएम रेडियो, आकाशवाणी और सिनेमाघरों के माध्यम से प्रचार-प्रसार की कार्यांतर कार्यादेश की स्वीकृति बाबत्।");
  const [clientRef, setClientRef] = useState("पत्र क्रमांक- 220696/EM/39/26/जसंस, दिनांक 09-02-2026 / 10752 / 0562687 / 25-26 / छ.ग.स. / इले.मी. / 2026 / Dated :- 13/02/2026");
  const [topDescription, setTopDescription] = useState("पत्र क्रमांक- 220696/EM/39/26/जसंस, दिनांक 09-02-2026 / 10752 / 0562687 / 25-26 / छ.ग.स. / इले.मी. / 2026 / Dated :- 13/02/2026");
  const [rows, setRows] = useState(defaultRows);
  const searchParams = useSearchParams();
  const job = searchParams.get("job_id");
  const avak_ref = searchParams.get("avak_ref");
  async function fetchPrintData() {
    const payload = {
      fin_year: '2024-2025',
      avak_ref: avak_ref,
      job_no: job,
    };
    try {
      const response = await adminServices.getNoteSheetPrintDetail(payload);
      console.log(response)
      setRows(response.data.data)
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }

  useEffect(() => {
    fetchPrintData();
  }, []);

  const updateRow = (id, field, val) =>
    setRows(rows.map(r => r.id === id ? { ...r, [field]: val } : r));

  const addRow = () => setRows([...rows, {
    id: Date.now(), workType: "", sno: rows.length + 1, roNum: "",
    roSubject: "", unit: "", frqucy: "", totDays: "", totDur: "", date: "", rate: "", totAmt: "",
  }]);

  const removeRow = (id) => rows.length > 1 && setRows(rows.filter(r => r.id !== id));

  const totalAmt = rows.reduce((s, r) => s + (parseFloat(r.totAmt) || 0), 0);

  const F = ({ value, onChange, style = {}, multiline = false }) =>
    multiline
      ? <textarea value={value} onChange={e => onChange(e.target.value)}
          style={{ width: "100%", border: "none", background: "transparent", fontFamily: "inherit", fontSize: "inherit", resize: "vertical", outline: "none", padding: 0, lineHeight: 1.4, ...style }} />
      : <input value={value} onChange={e => onChange(e.target.value)}
          style={{ width: "100%", border: "none", background: "transparent", fontFamily: "inherit", fontSize: "inherit", outline: "none", padding: 0, ...style }} />;

  const s = {
    page: { background: "#e8e8e8", minHeight: "100vh", padding: "20px", fontFamily: "Arial, sans-serif", fontSize: "12px" },
    btns: { display: "flex", gap: 8, marginBottom: 12, justifyContent: "center" },
    btn: { padding: "6px 18px", fontSize: 12, cursor: "pointer", border: "1px solid #555", borderRadius: 2, background: "#fff" },
    btnP: { background: "#1a3a6b", color: "#fff", border: "1px solid #1a3a6b" },
    card: { maxWidth: 900, margin: "0 auto", background: "#fff", border: "2px solid #000", padding: "10px 14px" },
    center: { textAlign: "center" },
    bold: { fontWeight: "bold" },
    row: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    hrThick: { borderTop: "2px solid #000", margin: "6px 0" },
    label: { fontWeight: "bold", whiteSpace: "nowrap", marginRight: 4 },
  };

  const thStyle = {
    border: "1px solid #000", padding: "3px 5px", textAlign: "center",
    fontWeight: "bold", fontSize: 11, background: "#f0f0f0", verticalAlign: "middle",
  };
  const tdStyle = {
    border: "1px solid #000", padding: "3px 5px", fontSize: 11, verticalAlign: "top",  height: "70px",
  };

  return (
    <div style={s.page}>
      <div style={s.btns}>
        <button style={{ ...s.btn, ...s.btnP }} onClick={() => window.print()}>Print / PDF</button>
        <button style={s.btn} onClick={addRow}>+ Add Row</button>
      </div>

      <div style={s.card} id="printArea">

        {/* HEADER */}
        <div style={{ ...s.row, alignItems: "flex-start" }}>
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
            <F value={regnNo} onChange={setRegnNo} style={{ width: 40, textAlign: "right", borderBottom: "1px solid #999" }} />
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

        {/* CLIENT NAME */}
        <div style={{ display: "flex", padding: "4px 6px", gap: 4, marginBottom: "-1px" }}>
          <span style={{ ...s.label, whiteSpace: "nowrap" }}>Client Name :</span>
          <span style={{ flex: 1 }}><F value={rows[0].client_name} onChange={setClientName} /></span>
        </div>

        {/* SUBJECT */}
        <div style={{ display: "flex",  padding: "4px 6px", gap: 4, marginBottom: "-1px" }}>
          <span style={{ ...s.label, whiteSpace: "nowrap" }}>Subject :</span>
          <span style={{ flex: 1 }}><F value={rows[0].wo_subject} onChange={setSubject} multiline /></span>
        </div>

        {/* CLIENT REF */}
        <div style={{ display: "flex", padding: "4px 6px", gap: 4 }}>
          <span style={{ ...s.label, whiteSpace: "nowrap" }}>Client Ref :</span>
          <span style={{ flex: 1 }}><F value={clientRef} onChange={setClientRef} multiline /></span>
        </div>

        {/* CLIENT REF */}
        <div style={{ display: "flex", padding: "4px 6px", gap: 4 }}>
          <span style={{ flex: 1 }}><F value={topDescription} onChange={setClientRef} multiline /></span>
        </div>

        {/* WORK TABLE HEADING */}
        <div style={{ ...s.bold, marginTop: 8, marginBottom: 4 }}>
          किये जाने वाले कार्य का विवरण निम्नानुसार है :-
        </div>

        {/* WORK TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr>
              {/* <th style={{ ...thStyle, width: 70 }}>work type</th> */}
              <th style={{ ...thStyle, width: 28 }}>S.N o.</th>
              <th style={{ ...thStyle, width: 85 }}>Vehicle No</th>
              <th style={{ ...thStyle , width: 300}}>Subject</th>
              <th style={{ ...thStyle, width: 80 }}>StartDate-EndDate</th>
              <th style={{ ...thStyle, width: 40 }}>Rate</th>
              <th style={{ ...thStyle, width: 70 }}>Tot. RO Amt</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td style={{ ...tdStyle, textAlign: "center" }}>{r.sno}</td>
                <td style={tdStyle}><F value={r.Vehicle_No || 'CG04MH6789'} onChange={v => updateRow(r.id, "Vehicle_No", v)} /></td>
                <td style={tdStyle}><F value={r.wo_subject} onChange={v => updateRow(r.id, "roSubject", v)} multiline /></td>
                <td style={tdStyle}> <F value={r.start_date}  multiline />
                <F value={r.end_date} onChange={v => updateRow(r.id, "rate", v)} multiline />
                </td>
                <td style={tdStyle}><F value={r.rate} onChange={v => updateRow(r.id, "rate", v)} multiline />
                </td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>₹
                  <F value={r.total_rate} onChange={v => updateRow(r.id, "totAmt", v)} style={{ textAlign: "right", fontWeight: "bold" }} />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>Grand Total</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>₹{totalAmt.toFixed(2)}</td>
              {/* <td className="no-print" style={tdStyle} /> */}
            </tr>
          </tbody>
        </table>

        {/* SIGNATURES */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: 60, gap: 8, textAlign: "center" }}>
          <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>महाप्रबंधक</div></div>
          <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>कृपया अनुमोदनार्थ</div></div>
          <div>
            <div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>उपमहाप्रबंधक</div>
            {/* <div style={{ fontSize: 10, marginTop: 2 }}>Chhattisgarh Samvad</div> */}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: 70, gap: 8, textAlign: "center" }}>
          <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>अतिरिक्त मुख्य कार्यपालन अधिकारी</div></div>
          {/* <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>कृपया अनुमोदनार्थ</div></div>
          <div>
            <div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>उपमहाप्रबंधक</div>
            // {/* <div style={{ fontSize: 10, marginTop: 2 }}>Chhattisgarh Samvad</div> 
          </div> */}
        </div>

      </div>

      <style>{`
        @media print {
          body { background: white; margin: 0; }
          .no-print { display: none !important; }
          #printArea { border: 2px solid #000 !important; max-width: 100% !important; margin: 0 !important; }
          button { display: none !important; }
        }
      `}</style>
    </div>
  );
}