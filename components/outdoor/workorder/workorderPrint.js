"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import adminServices from "@/services/adminServices";
import outdoorServices from "@/services/outdoorServices";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const defaultRows = [
  {
    id: 1, workType: "PRODUCTION", sno: 1, roNum: "0562687/262", Vehicle_No: 'CG04MH3959',
    wo_subject: "LED Mounted (Per day Minimum 4 Programme) Size 12X8 Feet LED Screen (p6). equipped with GPS System , Audion Visual Equipment and Generator Along with LED Screen LED Technian",
    unit: "Master Version", frqucy: "4", totDays: "5 days",
    totDur: "5x1=5 Min(s)", start_date: "", end_date: "", rate: "₹5", total_rate: "37500.00",
    client_name: "", client_cd: "",
  },
];

export default function WorkOrder() {
  const [regnNo, setRegnNo] = useState("209");
  const [clientName, setClientName] = useState("");
  const [subject, setSubject] = useState("");
  const [clientRef, setClientRef] = useState("");
  const [gst, setGST] = useState("");
  const [topDescription, setTopDescription] = useState("");
  const [rows, setRows] = useState(defaultRows);
  const [isDownloading, setIsDownloading] = useState(false);
  const [CGST_amount, setCGSTAmount] = useState('');
  const [SGST_amount, setSGSTAmount] = useState('');
  const [net_amt, setNetAmount] = useState('');
  const [data, setData] = useState('');
  const searchParams = useSearchParams();
  const job = searchParams.get("job_id");
  const avak_ref = searchParams.get("avak_ref");
  const wo_no = searchParams.get("wo_no");

  async function fetchPrintData() {
    const payload = {
      fin_year: localStorage.getItem('financialYear'),
      agency: localStorage.getItem('usertypecode'),
      avak_ref: avak_ref,
      job_no: job,
      wo_no: wo_no
    };
    try {
      const response = await outdoorServices.workorderPrint(payload);
      const data = response;
      if (Array.isArray(data) && data.length > 0) {
        setRows(data);
        // Populate header fields from first row
        setClientName(`${data[0].AgencyName}  ${data[0].OwnerName} ${data[0].city}` ?? "");
        setGST(`${data[0].gstin}`)
        setSubject(data[0]?.wo_subject ?? "");
        setClientRef(data[0]?.ref_data ?? "");
        setData(`${wo_no}  ${formatDate(data[0].wo_date)}`);
        setCGSTAmount(data[0]?.CGST_amount)
        setSGSTAmount(data[0]?.SGST_amount)
        setNetAmount(data[0]?.net_amt)


      }
    } catch (error) {
      console.error("Failed to fetch print data", error);
    }
  }

  useEffect(() => {
    fetchPrintData();
  }, []);

  const updateRow = (id, field, val) =>
    setRows(rows.map(r => r.id === id ? { ...r, [field]: val } : r));

  const addRow = () => setRows([...rows, {
    id: Date.now(), workType: "", sno: rows.length + 1, roNum: "",
    wo_subject: "", unit: "", frqucy: "", totDays: "", totDur: "",
    start_date: "", end_date: "", rate: "", total_rate: "", Vehicle_No: "",
    client_name: "", client_cd: "",
  }]);

  const removeRow = (id) => rows.length > 1 && setRows(rows.filter(r => r.id !== id));

  // Grand total uses total_rate (API field)
  const totalAmt = rows.reduce((s, r) => s + (parseFloat(r.total_rate) || 0), 0);


  const F = ({ value, onChange, style = {}, multiline = false }) => {
    if (isDownloading) {
      return (
        <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", ...style }}>
          {value}
        </span>
      );
    }

    return multiline ? (
      <textarea
        value={value ?? ""}
        onChange={e => onChange?.(e.target.value)}
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
          fontFamily: "inherit",
          fontSize: "inherit",
          resize: "vertical",
          outline: "none",
          padding: 0,
          lineHeight: 1.4,
          ...style
        }}
      />
    ) : (
        <input
          value={value ?? ""}
          onChange={e => onChange?.(e.target.value)}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            fontFamily: "inherit",
            fontSize: "inherit",
            outline: "none",
            padding: 0,
            ...style
          }}
        />
      );
  };

  const s = {
    page: { background: "#e8e8e8", minHeight: "100vh", padding: "40px", fontFamily: "Arial, sans-serif", fontSize: "12px" },
    btns: { display: "flex", gap: 8, marginBottom: 12, justifyContent: "center" },
    btn: { padding: "6px 18px", fontSize: 12, cursor: "pointer", border: "1px solid #555", borderRadius: 2, background: "#fff" },
    btnP: { background: "#1a3a6b", color: "#fff", border: "1px solid #1a3a6b" },
    card: { maxWidth: 700, margin: "0 auto", background: "#fff", border: "2px solid #000", padding: "20px 14px" },
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
    border: "1px solid #000", padding: "3px 5px", fontSize: 11, verticalAlign: "top", height: "content-fit",
  };

  const downloadPDF = async () => {
    setIsDownloading(true);

    setTimeout(async () => {
      const element = document.getElementById("printArea");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`WorkOrder_${job || "file"}.pdf`);
      setIsDownloading(false);
    }, 300);
  };


  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d) ? date : d.toLocaleDateString("en-GB");
  };

  function formatINR(value) {
    const num = Number(value);

    if (isNaN(num)) return "0.00"; // handle invalid input

    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  return (
    <div style={s.page}>
      <div style={s.btns}>
        {/* <button style={{ ...s.btn, ...s.btnP }} onClick={() => window.print()}>Print / PDF</button> */}
        <button onClick={downloadPDF}>Download PDF</button>
        <button style={s.btn} onClick={addRow}>+ Add Row</button>
      </div>

      <div style={{ ...s.card, padding: "20px" }} id="printArea">
        <div style={{ border: '1px solid #000', padding: "10px" }}>
          {/* HEADER */}
          <div style={{ ...s.row, alignItems: "flex-start", }}>
            <div style={{ flex: 1, }} />
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

          {/* <div style={s.hrThick} /> */}

          {/* GST / PAN / TAN */}
          <div style={{ ...s.row, fontSize: 11 }}>
            <div><b>GST No : 22AAATC9294Q1Z4</b></div>
            <div><b>PAN No : AAATC9294Q</b></div>
            <div><b>TAN : JBPC00957F</b></div>
          </div>

          <div style={s.hrThick} />

          {/* TITLE */}
          <div style={{ ...s.center, ...s.bold, fontSize: 15, margin: "6px 0" }}>
            Mounted Vehicle WorkOrder
        </div>

          <div style={{ borderTop: "1px solid #000", margin: "6px 0" }} />

          {/* CLIENT NAME — uses clientName state */}
          <div style={{ display: "flex", padding: "4px 6px", gap: 4, marginBottom: "-1px" }}>
            <span style={{ ...s.label, whiteSpace: "nowrap" }}>प्रति:</span>
            <span style={{ flex: 1 }}>{clientName}  / {gst} </span>
          </div>



          {/* SUBJECT — uses subject state */}
          <div style={{ display: "flex", padding: "4px 6px", gap: 4, marginBottom: "-1px" }}>
            <span style={{ ...s.label, whiteSpace: "nowrap" }}>Subject :</span>
            <span style={{ flex: 1 }}><F value={subject} onChange={setSubject} /></span>
          </div>

          <div style={{ display: "flex", padding: "4px 6px", gap: 4, marginBottom: "-1px" }}>

            <span style={{ flex: 1 }}>
              विषयांतर्गत लेख है कि आयुक्त महोदय के निर्देशानुसार शासन की जनकल्याणकारी योजनाओं एवं उपलब्धियों का व्यापक प्रचार-प्रसार के उद्देश्य से प्रदेश के विभिन्न जिलों में 20 एलईडी वैन के माध्यम से प्रचार-प्रसार किया जाना है।

              उक्त कार्य छत्तीसगढ़ संवाद के निविदा के माध्यम से चयनित दर पर 03 इम्पैनल्ड एजेंसी द्वारा संपादित किया जाना प्रस्तावित है। एलईडी वैन से 07 मार्च से 15 मार्च 2024 तक 09 दिवस हेतु प्रचार-प्रसार किया जाना है।

              विवरण निम्नानुसार है, जिसे तय कार्यक्रमानुसार कार्यान्वित किया जाना है।
            </span>
          </div>


          {/* CLIENT REF — uses clientRef state */}
          <div style={{ display: "flex", padding: "4px 6px", gap: 4 }}>
            <span style={{ ...s.label, whiteSpace: "nowrap" }}>
              कार्यदेश क्रमांक :</span>

            <div style={{ display: "flex", gap: 0, flex: 1 }}>
              <span style={{ flex: 1 }}>
                <F
                  value={data}
                  onChange={v => setWoNo(v)}
                />
                {/* 
                <F
                  value={formatDate(data?.[0]?.wo_date)}
                  onChange={v => setWoDate(v)}
                /> */}
              </span>
            </div>
          </div>



          {/* WORK TABLE HEADING */}
          <div style={{ ...s.bold, marginTop: 8, marginBottom: 4 }}>
            LED Vehicle Outdoor media किये जाने वाले कार्य का विवरण निम्नानुसार है :-
        </div>

          {/* WORK TABLE */}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 28 }}>S.No.</th>
                <th style={{ ...thStyle, width: 90 }}>Vehicle No</th>
                <th style={{ ...thStyle, width: 250 }}>Subject</th>
                <th style={{ ...thStyle, width: 80 }}>StartDate-EndDate</th>
                <th style={{ ...thStyle, width: 100 }}>Rate</th>
                <th style={{ ...thStyle, width: 100 }}>Tot. RO Amt</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id}>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{i + 1}</td>
                  <td style={tdStyle}>
                    <F value={r.VehicleNo ?? ""} onChange={v => updateRow(r.id, "VehicleNo", v)} />
                  </td>
                  <td style={tdStyle}>
                    <F value={r.Specification ?? ""} onChange={v => updateRow(r.id, "Specification", v)} multiline />
                  </td>
                  <td style={tdStyle}>
                    <F value={formatDate(r.start_date)} onChange={v => updateRow(r.id, "start_date", v)} />-
                  <F value={formatDate(r.end_date)} onChange={v => updateRow(r.id, "end_date", v)} />
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>
                    ₹{formatINR(r.rate) ?? ""}
                    {/* <F value={r.rate ?? ""} onChange={v => updateRow(r.id, "rate", v)} style={{ textAlign: "right", fontWeight: "bold" }}/> */}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>
                    ₹{formatINR(r.total_rate) ?? ""}
                    {/* onChange={v => updateRow(r.id, "total_rate", v)} style={{ textAlign: "right", fontWeight: "bold" }} /> */}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>Amount </td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>₹{formatINR(totalAmt.toFixed(2))}</td>
              </tr>
              <tr>
                <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>CGST Charges(9%)</td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>₹{formatINR(CGST_amount)}</td>
              </tr>
              <tr>
                <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>SGST Charges(9%)</td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>₹{formatINR(SGST_amount)}</td>
              </tr>
              <tr>
                <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>Grand Total</td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>₹{formatINR(net_amt)}</td>
              </tr>
            </tbody>
          </table>

          {/* SIGNATURES */}
          {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: 60, gap: 8, textAlign: "center" }}>
            <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>महाप्रबंधक</div></div>
            <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>कृपया अनुमोदनार्थ</div></div>
            <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>उपमहाप्रबंधक</div></div>
          </div>*/}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: 70, gap: 8, textAlign: "center" }}>
            <div><div style={{ borderTop: "1px solid #000", paddingTop: 4 }}>अतिरिक्त मुख्य कार्यपालन अधिकारी</div></div>
          </div>

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