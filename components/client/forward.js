
"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserIP } from "../../services/userip";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
  CircularProgress,
  Stack,
  Pagination,
  Chip,
  TextField,
  IconButton,
  Tooltip,
  Box,
  Checkbox,
   Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";


// =============================================
const ForwardTo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const actionType = searchParams.get("action") || "get_not_forwarded";

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 10;



  
  const { financial_year, user_id, user_name } = useMemo(
    () => ({
      financial_year: localStorage.getItem("financial_year") || "2024-2025",
      user_id: localStorage.getItem("user_id") || "00100",
      user_name: localStorage.getItem("user_name") || "",
    }),
    []
  );


  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  const fetchData = async () => {
    if (!financial_year || !user_id) return;
    try {
      setLoading(true);
      const res = await axios.get(
        "http://103.79.34.50:8083/api/Client/getclientadvtrequests",
        {
          params: {
            financial_year,
            user_id,
            user_name,
            action: actionType,
             category: "03",
          },
        }
      );
      const responseData =
        res.data?.data ||
        res.data?.result ||
        (Array.isArray(res.data) ? res.data : []);
      setData(responseData || []);
      //console.log("Fetched Data:", responseData.data.dataref_Category_Id);
      setCurrentPage(1);
    } catch (err) {
      console.error("Fetch Error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [actionType, financial_year, user_id, user_name]);


  // ===========filteredData========================
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      `${row.ref_Id} ${row.subject} ${row.letter_No}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const getTitle = () => {
    switch (actionType) {
      case "get_all_accepted": return "Accepted to Samvad";
      case "get_forwarded": return "Submitted to Samvad";
      case "get_not_forwarded": return "Forward To Samvad";
      case "get_under_process": return "Under Processing Request";
      case "get_rejected": return "Rejected Request";
      default: return "Requests";
    }
  };

  const exportToExcel = () => {
    const csvContent = [
      ["Ref ID", "Subject", "Letter No", "Category", "Tender Amt"],
      ...filteredData.map((row) => [
        row.ref_Id,row.financial_Year, row.subject, row.letter_No,
        row.ref_Category_Text, row.tender_Amt,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "requests.csv";
    link.click();
  };

  const exportToPDF = () => window.print();

  const getStatusChip = () => {
    const base = {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      fontSize: "0.68rem",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      height: 24,
      borderRadius: "6px",
    };
    switch (actionType) {  
      case "get_all_accepted":
        return <Chip label="Accepted" sx={{ ...base, bgcolor: "#DCFCE7", color: "#15803D", border: "1px solid #BBF7D0" }} />;
      case "get_forwarded":
        return <Chip label="Forwarded" sx={{ ...base, bgcolor: "#DBEAFE", color: "#1D4ED8", border: "1px solid #BFDBFE" }} />;
      case "get_under_process":
        return <Chip label="Processing" sx={{ ...base, bgcolor: "#FEF9C3", color: "#A16207", border: "1px solid #FEF08A" }} />;
     case "get_rejected":
        return <Chip label="Rejected" sx={{ ...base, bgcolor: "#FEE2E2", color: "#B91C1C", border: "1px solid #FECACA" }} />;
     
     
        default:
        return <Chip label="Pending" sx={{ ...base, bgcolor: "#FEE2E2", color: "#B91C1C", border: "1px solid #FECACA" }} />;
    }
  };

  // ── column styles ──────────────────────────────────────────────────────────
  const colHead = {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 700,
    fontSize: "0.7rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#374151",
    py: 1.4,
    px: 2,
    borderBottom: "2px solid #E5E7EB",
    whiteSpace: "nowrap",
    bgcolor: "#F8FAFC !important",
  };

  const colCell = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.83rem",
    color: "#1F2937",
    py: 1.3,
    px: 2,
    borderBottom: "1px solid #F1F5F9",
  };



const theme = createTheme({
  typography: {
    fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
  },
  palette: {
    primary: { main: "#1D4ED8" },
    secondary: { main: "#E8572A" },
  },
});

// =====Attachment show=============
const BASE_FILE_URL =
  "http://103.79.34.50:8083/Uploads/Client";

const [openFilesModal, setOpenFilesModal] = useState(false);
const [filesData, setFilesData] = useState([]);
const [filesLoading, setFilesLoading] = useState(false);

// ===============================================
const handleViewFiles = async (refId, financialYear) => {
  try {
    setFilesLoading(true);
    setOpenFilesModal(true);

    const res = await axios.get(
      `http://103.79.34.50:8083/api/Client/get-files/${refId}/${financialYear}`
      // add ?categary_cd=02 if needed
    );

    if (res.data?.status === 1) {
      setFilesData(res.data.data || []);
    } else {
      setFilesData([]);
    }
  } catch (error) {
    console.error("File fetch error:", error);
    setFilesData([]);
  } finally {
    setFilesLoading(false);
  }
};

const getStatusStyle = (status) => {
  switch ((status || "").toLowerCase()) {
    case "forwarded":
      return {
        backgroundColor: "#8684f8",   // light blue
        color: "#ffffff",
        border: "1px solid #bee5eb",
      };
case "accepted":
      return {
        backgroundColor: "#d4edda", // green
        color: "#155724",
        border: "1px solid #c3e6cb",
      };
    case "rejected":
      return {
        backgroundColor: "#f8d7da",   // red
        color: "#721c24",
        border: "1px solid #f5c6cb",
      };

    case "drafted":
      return {
        backgroundColor: "#fff3cd",   // orange/yellow
        color: "#856404",
        border: "1px solid #ffeeba",
      };

    case "deleted":
      return {
        backgroundColor: "#f5c6cb",   // darker red
        color: "#721c24",
        border: "1px solid #f1b0b7",
      };

    default:
      return {
        backgroundColor: "#e2e3e5",
        color: "#383d41",
        border: "1px solid #d6d8db",
      };
  }
};

const groupedFiles = filesData.reduce((acc, file) => {
  const category = file.cat_name || "Others";
  if (!acc[category]) acc[category] = [];
  acc[category].push(file);
  return acc;
}, {});


// ================handleForward==========================
const handleForward = async (row) => {
  try {

    const userIP = await getUserIP();
    const payload = {
      ref_id: row.ref_Id, // adjust if different
      fin_year: row.financial_Year,
      forward_by_user_id: localStorage.getItem("user_id"||"00100"), // or your auth state
      forward_by_ip_address: userIP, // ideally from backend
      forward_date: new Date().toISOString(),
      forward_time: new Date().toLocaleTimeString(),
    };

    console.log("Forward Payload:", payload);
    const response = await axios.post(
      "http://103.79.34.50:8083/api/Client/C_Client_Advt_Forward",
      payload
    );

    if (response.status === 200) {
      alert("Forwarded Successfully ✅");
       await fetchData();
    }
  } catch (error) {
    console.error("Forward Error:", error);
    alert("Forward Failed ❌");
  }
};



  // ==================handelEdit======================
  const handleEdit = async (ref_Id) => {
  if (!ref_Id) {
    alert("Invalid Reference ID");
    return;
  }

  try {
    const userIP = await getUserIP();

    const response = await axios.get(
      "http://103.79.34.50:8083/api/Client/getclientadvtrequests",
      {
        params: {
          ref_id: ref_Id,
          financial_year: financial_year,
          user_id: user_id,
          user_name: user_name,
          action: "get_by_id",
          category: "03", // ✅ Important (was missing earlier)
          ip_address: userIP,
        },
      }
    );

    console.log("Full API Response:", response.data);

    if (response.data?.message !== "Success") {
      alert(response.data?.message || "Failed to fetch record");
      return;
    }

    // ✅ API returns array → take first record
    const rowData = response.data?.data?.[0];

    if (!rowData) {
      alert("No record found for this ID");
      return;
    }

    console.log("Edit Row Data:", rowData);

      if (rowData?.ref_Id) {
  router.push(`/client/updatclientrequist/${rowData.ref_Id}`);
}

  } catch (error) {
    console.error("Edit Error:", error);
    alert("Failed to fetch record details");
  }
};

  // =================handelDelete======================
  const handleDelete = async (ref_Id) => {
    if (!window.confirm(`Delete Ref ID ${ref_Id}?`)) return;
    try {  const userIP = await getUserIP();
      const res = await axios.delete(
        `http://103.79.34.50:8083/api/Client/deleteclientadvtrequest/${ref_Id}`,
        { data: { ref_id:ref_Id, financialYear:financial_year,userId :user_id,ref_Category_id:data[0]?.ref_Category_Id, ip_address: userIP } }
      );
      const status = res.data?.status ?? res.data?.success;
      if (status === 1 || status === true) {
        setData((prev) => prev.filter((row) => row.ref_Id !== ref_Id));
        alert(`Deleted successfully (Ref ID: ${ref_Id})`);
      } else {
        alert(res.data?.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Server error while deleting");
    }
  };





  // ── icon button style ──────────────────────────────────────────────────────
  const iconBtnSx = (hoverColor) => ({
    width: 34,
    height: 34,
    borderRadius: "8px",
    bgcolor: "#F1F5F9",
    color: "#64748B",
    border: "1px solid #E2E8F0",
    "&:hover": { bgcolor: hoverColor, color: "#fff", borderColor: hoverColor },
    transition: "all 0.18s",
  });

  return (
    <ThemeProvider theme={theme}>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <Box sx={{ mb: 3 }}>
        {/* accent bar */}
        <Box sx={{ height: 3, width: 48, background: "linear-gradient(90deg,#1D4ED8,#60A5FA)", borderRadius: 2, mb: 2 }} />

        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.4 }}>
              <Typography
                sx={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "1.25rem", md: "1.6rem" },
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                }}
              >
                {getTitle()}
              </Typography>
              {getStatusChip()}
            </Box>
            <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "#94A3B8", letterSpacing: "0.04em" }}>
              FY: {financial_year}&nbsp;&nbsp;·&nbsp;&nbsp;{filteredData.length} records
            </Typography>
          </Box>

          {/* export buttons */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Export CSV">
              <IconButton onClick={exportToExcel} sx={iconBtnSx("#16A34A")}>
                <TableViewIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export PDF">
              <IconButton onClick={exportToPDF} sx={iconBtnSx("#DC2626")}>
                <PictureAsPdfIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton sx={iconBtnSx("#1D4ED8")}>
                <FileDownloadIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Box>

      {/* ── SEARCH ─────────────────────────────────────────────────────────── */}
      <Box sx={{ mb: 2.5 }}>
        <TextField
          placeholder="Search by Ref ID, Subject, Letter No…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 17 }} />,
          }}
          sx={{
            width: { xs: "100%", sm: 340 },
            "& .MuiOutlinedInput-root": {
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.84rem",
              bgcolor: "#fff",
              color: "#1F2937",
              borderRadius: "9px",
              "& fieldset": { borderColor: "#E2E8F0" },
              "&:hover fieldset": { borderColor: "#CBD5E1" },
              "&.Mui-focused fieldset": { borderColor: "#1D4ED8", borderWidth: 1.5 },
            },
            "& input::placeholder": { color: "#94A3B8", opacity: 1 },
          }}
        />
      </Box>

      {/* ── TABLE CARD ─────────────────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "14px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
        }}
      >
        {/* loading strip */}
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 3, py: 1.5, bgcolor: "#EFF6FF", borderBottom: "1px solid #DBEAFE" }}>
            <CircularProgress size={14} sx={{ color: "#1D4ED8" }} />
            <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "#1D4ED8", fontWeight: 500 }}>
              Fetching records…
            </Typography>
          </Box>
        )}

        <TableContainer sx={{ maxHeight: "100vh" }}>
          <Table stickyHeader size="small">
            <TableHead>
              {/* <TableRow>
                {[
                  "Ref ID", "Financial Year", "Subject", "Letter No", "Category",
                  "Letter Date", "Scheduled Publish", "Tender Amt","Status",
                  (actionType === "get_not_forwarded" ? ["Actions", "Forward"] : [])
               
                ].map((col) => (
                  <TableCell key={col} sx={colHead}>{col}</TableCell>
                ))}
              </TableRow> */}

              <TableRow>
  {[
    "Ref ID",
    "Financial Year",
    "Subject",
    "Letter No",
    "Category",
    "Letter Date",
    "Scheduled Publish",
    "Tender Amt",
    "Status",
    ...(actionType === "get_not_forwarded" ? ["Actions", "Forward"] : []),
  ].map((col) => (
    <TableCell key={col} sx={colHead}>
      {col}
    </TableCell>
  ))}
</TableRow>
            </TableHead>

            <TableBody>
              {!loading && currentRecords.length > 0 ? (
                currentRecords.map((row, index) => (
                  <TableRow
                    key={row.ref_Id || index}
                    sx={{
                      "&:hover": { bgcolor: "#F8FAFC" },
                      transition: "background 0.12s",
                    }}
                  >
                    {/* Ref ID */}
                    <TableCell sx={colCell}>
                      <Box
                        sx={{
                          display: "inline-block",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.73rem",
                          fontWeight: 600,
                          color: "#1D4ED8",
                          bgcolor: "#EFF6FF",
                          px: 1,
                          py: 0.3,
                          borderRadius: "5px",
                          border: "1px solid #DBEAFE",
                        }}
                      >
                        {row.ref_Id || "—"}
                       
  
                      </Box>
 

<Button
  size="small"
  color="primary"  fontSize="small"
  startIcon={<VisibilityIcon fontSize="small" />}
  onClick={() =>
    handleViewFiles(row.ref_Id, row.financial_Year)
  }
>
  Files
</Button>
                    </TableCell>
 <TableCell sx={{ ...colCell, color: "#6B7280" }}>{row.financial_Year || "—"}</TableCell>
                    {/* Subject */}
                    <TableCell sx={{ ...colCell, maxWidth: 180 }}>
                      <Typography
                        sx={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.82rem",
                          color: "#374151",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 170,
                        }}
                        title={row.subject}
                      >
                        {row.subject || "—"}
                      </Typography>
                    </TableCell>

                    {/* Letter No */}
                    <TableCell sx={{ ...colCell, color: "#6B7280" }}>{row.letter_No || "—"}</TableCell>

                    {/* Category */}
                    <TableCell sx={colCell}>
                      <Chip
                        label={row.ref_Category_Text || "—"}
                        size="small"
                        sx={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.67rem",
                          fontWeight: 600,
                          height: 21,
                          borderRadius: "5px",
                          bgcolor: "#F0FDF4",
                          color: "#15803D",
                          border: "1px solid #BBF7D0",
                        }}
                      />
                    </TableCell>

                    {/* Letter Date */}
                    <TableCell sx={{ ...colCell, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.74rem", color: "#6B7280" }}>
                      {formatDate(row.letter_Date)}
                    </TableCell>

                    {/* Schedule Date */}
                    <TableCell sx={{ ...colCell, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.74rem", color: "#6B7280" }}>
                      {formatDate(row.schedule_Date)}
                    </TableCell>

                    {/* Tender Amt */}
                    <TableCell sx={{ ...colCell, fontWeight: 600, color: "#0F172A" }}>
                      {row.tender_Amt ? `₹ ${row.tender_Amt}` : "—"}
                    </TableCell>

                    {/* Attachment */}
                 
                    

<TableCell sx={colCell}>
  {row.status ? (
    <Box
      sx={{
        ...getStatusStyle(row.status),
        px: 1.5,
        py: 0.5,
        borderRadius: "6px",
        display: "inline-block",
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "capitalize",
        minWidth: "80px",
        textAlign: "center",
      }}
    >
      {row.status}
    </Box>
  ) : (
    "—"
  )}
</TableCell>


                    {/* Actions
                    <TableCell sx={colCell}>
                      <Stack direction="row" spacing={0.7}>
                        <Button
                          size="small"
                          onClick={() => handleEdit(row.ref_Id)}
                          sx={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.68rem",
                            textTransform: "none",
                            color: "#1D4ED8",
                            bgcolor: "#EFF6FF",
                            border: "1px solid #BFDBFE",
                            px: 1.4,
                            py: 0.3,
                            minWidth: "auto",
                            borderRadius: "6px",
                            "&:hover": { bgcolor: "#DBEAFE", borderColor: "#1D4ED8" },
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleDelete(row.ref_Id)}
                          sx={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.68rem",
                            textTransform: "none",
                            color: "#DC2626",
                            bgcolor: "#FEF2F2",
                            border: "1px solid #FECACA",
                            px: 1.4,
                            py: 0.3,
                            minWidth: "auto",
                            borderRadius: "6px",
                            "&:hover": { bgcolor: "#FEE2E2", borderColor: "#DC2626" },
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>

                    {/* Forward */}
                
{/* <TableCell sx={colCell}>
  <Button
    size="small"
    onClick={() => handleForward(row)} // ✅ Add this
    sx={{
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
      fontSize: "0.68rem",
      textTransform: "none",
      letterSpacing: "0.02em",
      color: "#fff",
      background:
        "linear-gradient(135deg,#1D4ED8 0%,#3B82F6 100%)",
      px: 1.8,
      py: 0.4,
      minWidth: "auto",
      borderRadius: "6px",
      boxShadow: "0 1px 4px rgba(29,78,216,0.25)",
      "&:hover": {
        background:
          "linear-gradient(135deg,#1E40AF 0%,#2563EB 100%)",
        boxShadow: "0 3px 10px rgba(29,78,216,0.35)",
      },
    }}
  >
    Forward
  </Button>
</TableCell> */} 

{actionType === "get_not_forwarded" && (
  <>
    {/* Actions */}
    <TableCell sx={colCell}>
      <Stack direction="row" spacing={0.7}>
        <Button
          size="small"
          onClick={() => handleEdit(row.ref_Id)}
          sx={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: "0.68rem",
            textTransform: "none",
            color: "#1D4ED8",
            bgcolor: "#EFF6FF",
            border: "1px solid #BFDBFE",
            px: 1.4,
            py: 0.3,
            minWidth: "auto",
            borderRadius: "6px",
            "&:hover": { bgcolor: "#DBEAFE", borderColor: "#1D4ED8" },
          }}
        >
          Edit
        </Button>

        <Button
          size="small"
          onClick={() => handleDelete(row.ref_Id)}
          sx={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: "0.68rem",
            textTransform: "none",
            color: "#DC2626",
            bgcolor: "#FEF2F2",
            border: "1px solid #FECACA",
            px: 1.4,
            py: 0.3,
            minWidth: "auto",
            borderRadius: "6px",
            "&:hover": { bgcolor: "#FEE2E2", borderColor: "#DC2626" },
          }}
        >
          Delete
        </Button>
      </Stack>
    </TableCell>

    {/* Forward */}
    <TableCell sx={colCell}>
      <Button
        size="small"
        onClick={() => handleForward(row)}
        sx={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: "0.68rem",
          textTransform: "none",
          letterSpacing: "0.02em",
          color: "#fff",
          background:
            "linear-gradient(135deg,#1D4ED8 0%,#3B82F6 100%)",
          px: 1.8,
          py: 0.4,
          minWidth: "auto",
          borderRadius: "6px",
          boxShadow: "0 1px 4px rgba(29,78,216,0.25)",
          "&:hover": {
            background:
              "linear-gradient(135deg,#1E40AF 0%,#2563EB 100%)",
            boxShadow: "0 3px 10px rgba(29,78,216,0.35)",
          },
        }}
      >
        Forward
      </Button>
    </TableCell>
  </>
)}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={{ py: 7, borderBottom: "none" }}>
                    <Typography sx={{ fontFamily: "'Outfit', sans-serif", color: "#94A3B8", fontSize: "0.9rem" }}>
                      {loading ? "Loading…" : "No records found"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ── PAGINATION ───────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 1.5,
              borderTop: "1px solid #F1F5F9",
              bgcolor: "#FAFAFA",
            }}
          >
            <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "#94A3B8" }}>
              Showing {indexOfFirstRecord + 1}–{Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length}
            </Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, v) => setCurrentPage(v)}
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.78rem",
                  color: "#64748B",
                  border: "1px solid #E2E8F0",
                  bgcolor: "#fff",
                  borderRadius: "6px",
                  "&:hover": { bgcolor: "#F1F5F9" },
                  "&.Mui-selected": {
                    bgcolor: "#1D4ED8",
                    color: "#fff",
                    borderColor: "#1D4ED8",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#1E40AF" },
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>
 

{/* ================================test============ */}
<Dialog
  open={openFilesModal}
  onClose={() => setOpenFilesModal(false)}

  fullWidth
  size="small"
>
  {/* Header with Close Button */}
  <DialogTitle
    sx={{
      fontWeight: "bold",
      color: "error.main",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    View Attachments

    <Button
      variant="outlined"
      color="error"
      size="small"
      onClick={() => setOpenFilesModal(false)}
      sx={{ textTransform: "none", fontWeight: 600 }}
    >
      Close
    </Button>
  </DialogTitle>

  <DialogContent dividers sx={{ height: 450 }}>
    {filesLoading ? (
      <Box
        sx={{
          // display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress color="error" />
      </Box>
    ) : filesData.length === 0 ? (
      <Typography align="center">No files found</Typography>
    ) : (
      Object.entries(groupedFiles).map(([category, files]) => (
        <Box key={category} mb={3}>
          {/* Category Title */}
          <Typography
            variant=""
            sx={{ mb: 1, color: "#1976d2", fontWeight: 600 }}
          >
            {category}
          </Typography>

          <Grid container spacing={2}>
            {files.map((file, index) => {
              const fileUrl = `${BASE_FILE_URL}/${file.link_name}`;
              const isImage = file.content_type?.startsWith("image");
              const isPdf = file.content_type === "application/pdf";

              return (
                <Grid item xs={6} md={3} key={index}>
                  <Box
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      p: 1,
                      height: 150,
                      display: "flex",
                      alignItems: "center",      // ✅ Vertical center
                      justifyContent: "center",  // ✅ Horizontal center
                      backgroundColor: "#fafafa",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                    onClick={() => window.open(fileUrl, "_blank")}
                  >
                    {isImage ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={fileUrl}
                          alt={file.link_name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "120px",
                            objectFit: "contain",
                            borderRadius: "6px",
                          }}
                        />
                      </Box>
                    ) : isPdf ? (
                      <Box>
                        <PictureAsPdfIcon
                          sx={{ fontSize: 50, color: "red" }}
                        />
                        <Typography variant="caption" display="block">
                          PDF File
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <InsertDriveFileIcon
                          sx={{ fontSize: 50, color: "#607d8b" }}
                        />
                        <Typography >
                          File
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* File Size */}
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.5,
                      textAlign: "center",
                    }}
                  >
                    {(file.file_size_in_bytes / (1024 * 1024)).toFixed(2)} MB
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))
    )}
  </DialogContent>
</Dialog>
    </ThemeProvider>
  );
};


export default ForwardTo;
