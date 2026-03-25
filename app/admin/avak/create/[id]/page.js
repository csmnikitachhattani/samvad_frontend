"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import adminServices from "@/services/adminServices";
import clientServices from "@/services/clientServices";
import commonServices from "@/services/commonServices";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Chip,
  InputAdornment,
  Checkbox,
  FormControlLabel, Collapse,
} from "@mui/material";
import axiosClient from "@/lib/axiosClient";


// ── Shared field style ────────────────────────────────────────────────────────
const field = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8f9fb",
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    "& fieldset": { borderColor: "#e4e6ef", borderWidth: "1.5px" },
    "&:hover": {
      backgroundColor: "#f3f4f8",
      "& fieldset": { borderColor: "#c5cadc" },
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 0 0 3px rgba(1,10,42,0.08)",
      "& fieldset": { borderColor: "#010a2a", borderWidth: "1.5px" },
    },
  },
  "& .MuiInputLabel-root": { color: "#9ca3af", fontSize: "0.875rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#010a2a" },
  "& .MuiInputBase-input": { color: "#111827", fontWeight: 500 },
};


// ── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({ icon, title, subtitle, children, accent = "#010a2a" }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "18px",
        border: "1.5px solid #ebebf0",
        overflow: "hidden",
        mb: 3,
        backgroundColor: "#fff",
        transition: "box-shadow 0.2s ease",
        "&:hover": { boxShadow: "0 4px 24px rgba(0,0,0,0.06)" },
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2.2,
          borderBottom: "1.5px solid #f0f0f5",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          background: "linear-gradient(135deg, #fafbff 0%, #f5f6fa 100%)",
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            backgroundColor: `${accent}12`,
            border: `1.5px solid ${accent}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={700} sx={{ color: "#111827", letterSpacing: "-0.1px" }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Paper>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconDoc = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#010a2a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#010a2a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCategory = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h7" stroke="#6366f1" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const IconLocation = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconOffice = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M3 21V7l9-4 9 4v14" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 21v-6h6v6" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconMeta = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#8b5cf6" strokeWidth="1.7" />
    <path d="M12 8v4l3 3" stroke="#8b5cf6" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

// ── Content Category Radio ─────────────────────────────────────────────────────
function ContentCategoryRadio({ value, onChange, categories, hasError }) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          color: hasError ? "#d32f2f" : "#9ca3af",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          mb: 1.5,
          display: "block",
        }}
      >
        Content Category *
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={1.2}
        sx={{
          p: hasError ? 1.5 : 0,
          borderRadius: "12px",
          border: hasError ? "1.5px solid #d32f2f" : "1.5px solid transparent",
          transition: "all 0.2s ease",
        }}
      >
        {categories.map((cat) => {
          const active = value === cat.catId;
          return (
            <Box
              key={cat.catId}
              onClick={() => onChange(cat.catId)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                px: 2,
                py: 1,
                borderRadius: "10px",
                border: "1.5px solid",
                borderColor: active ? "#010a2a" : "#e4e6ef",
                backgroundColor: active ? "#010a2a" : "#f8f9fb",
                cursor: "pointer",
                transition: "all 0.18s ease",
                "&:hover": {
                  borderColor: "#010a2a",
                  backgroundColor: active ? "#010a2a" : "#f0f1f5",
                },
              }}
            >
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: active ? "#fff" : "#c5cadc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {active && (
                  <Box sx={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#fff" }} />
                )}
              </Box>
              <Typography
                variant="body2"
                fontWeight={active ? 700 : 500}
                sx={{ color: active ? "#fff" : "#374151", fontSize: "0.82rem", whiteSpace: "nowrap" }}
              >
                {cat.catText}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {hasError && (
        <Typography variant="caption" sx={{ color: "#d32f2f", mt: 0.5, display: "block", ml: 0.5 }}>
          Content category is required
        </Typography>
      )}
    </Box>
  );
}



// ── Main Component ─────────────────────────────────────────────────────────────
export default function ClientAttachmentForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const [captions, setCaptions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [levels, setLevels] = useState([]);
  const [offices, setOffices] = useState([]);
  const [sections, setSections] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [modes, setModes] = useState([]);
  const [letterTypes, setLetterTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  // ── Validation errors state ──────────────────────────────────────────────────
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    ref_Category_id: "",
    letter_no: "",
    receivingDate: "",
    caption_cd: "",
    tender_amt: "",
    schedule_date: "",
    client: "",
    baseDept: "",
    client_name: "",
    district: "",
    officeLevel: "",
    office: "",
    section: "",
    officer: "",
    modeOfReceiving: "",
    files: "",
    letterType: "",
    remark: "",
    isIndividual: false,
  });

  // ── handleChange clears the field's error on edit ───────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;  // ← handles checkbox
  
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  
    if (newValue !== "" && newValue !== null && newValue !== undefined) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ── Validation ───────────────────────────────────────────────────────────────
  const validate = () => {
    const rules = {
      ref_Category_id: "Content category is required",
      letter_no:       "Letter No is required",
      receivingDate:   "Receiving Date is required",
      caption_cd:      "Category is required",
      tender_amt:      "Tender Amount is required",
      schedule_date:   "Publication Date is required",
      letterType:      "Letter Type is required",
      modeOfReceiving: "Mode of Receiving is required",
      files:           "No. of Pages is required",
      client:          "Client is required",
      baseDept:        "Base Department is required",
      district:        "District is required",
      officeLevel:     "Office Level is required",
      office:          "Office is required",
      officer:         "Officer is required",
      remark:          "Remark is required",
    };

    const newErrors = {};
    Object.entries(rules).forEach(([key, msg]) => {
      const val = formData[key];
      if (val === undefined || val === null || String(val).trim() === "") {
        newErrors[key] = msg;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Data fetchers ─────────────────────────────────────────────────────────────
  async function fetchCategory() {
    try {
      const res = await clientServices.getAdvtCategory();
      setCategories(res.data.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  }
  async function fetchModeOfReceiving() {
    try {
      const res = await clientServices.getallReceivingModes();
      setModes(res.data.result);
    } catch (error) {
      console.error("Failed to fetch modes", error);
    }
  }
  async function fetchLetterType() {
    try {
      const res = await clientServices.getallLetterTypes();
      setLetterTypes(res.data.result);
    } catch (error) {
      console.error("Failed to fetch letter types", error);
    }
  }
  async function fetchDepartment() {
    try {
      const res = await clientServices.getalldepartment();
      setDepartments(res.result);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  }
  async function fetchOfficeLevel(deptCode) {
    try {
      const res = await clientServices.getOfficeLevels({ deptCode });
      setLevels(res.result);
    } catch (error) {
      console.error("Failed to fetch office levels", error);
    }
  }
  async function fetchDistricts() {
    try {
      const res = await commonServices.getDistrict();
      setDistricts(res.data.result);
    } catch (error) {
      console.error("Failed to fetch districts", error);
    }
  }
  async function fetchOffice(deptCode, distCode) {
    try {
      const res = await clientServices.getOfficeNames({ deptCode, distCode });
      setOffices(res.result);
    } catch (error) {
      console.error("Failed to fetch offices", error);
    }
  }
  async function fetchSections(deptCode, distCode) {
    try {
      const res = await clientServices.getClientSection({ deptCode, distCode });
      setSections(res.result);
    } catch (error) {
      console.error("Failed to fetch sections", error);
    }
  }
  async function fetchOfficers(deptCode, distCode) {
    try {
      const res = await clientServices.getOfficers({ deptCode, distCode });
      setOfficers(res.result);
    } catch (error) {
      console.error("Failed to fetch officers", error);
    }
  }
  async function fetchCaption() {
    try {
      const res = await clientServices.getAdvtCaption();
      setCaptions(res.data.result);
    } catch (error) {
      console.error("Failed to fetch captions", error);
    }
  }
  async function fetchClientName() {
    try {
      const payload = {
        base_dept_cd: formData.baseDept,
        district_cd: formData.district,
        client_cd: formData.officer,
        section_cd: formData.section,
        office_level_cd: formData.officeLevel,
        office_cd: formData.office,
      };
      const res = await clientServices.getClientName(payload);
      setFormData((prev) => ({
        ...prev,
        client_name: res?.data?.[0]?.client_name || "",
      }));
    } catch (error) {
      console.error("Failed to fetch client name", error);
    }
  }
  async function fetchClient(client) {
    try {
      const res = await clientServices.getClientData(client);
      setFormData((prev) => ({
        ...prev,
        baseDept: res.data.data.base_dept_code,
        district: res.data.data.district_code,
        officeLevel: res.data.data.OfficeLevel,
        office: res.data.data.Office_code,
        section: res.data.data.section_code,
        officer: res.data.data.employee_code,
        
      }));
      fetchDistricts();
    } catch (error) {
      console.error("Failed to fetch client", error);
    }
  }
   useEffect(() => {
    const {
      baseDept,
      district,
      office,
      section,
      officer,
      officeLevel,
    } = formData;
  
    if (
      baseDept &&
      district &&
      office &&
      section &&
      officer &&
      officeLevel
    ) {
      fetchClientName();
    }
  
  }, [
    formData.baseDept,
    formData.district,
    formData.office,
    formData.section,
    formData.officer,
    formData.officeLevel,
  ]);
  useEffect(() => {
    if (formData.client !== "") fetchClient(formData.client);
  }, [formData.client]);

  useEffect(() => {
    if (formData.baseDept && formData.district) {
      fetchOfficeLevel(formData.baseDept);
      fetchOffice(formData.baseDept, formData.district);
      fetchSections(formData.baseDept, formData.district);
      fetchOfficers(formData.baseDept, formData.district);
    }
  }, [formData.baseDept, formData.district]);
  useEffect(() => {
    if (formData.baseDept) fetchOfficeLevel(formData.baseDept);
  }, [formData.baseDept]);

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    let finyear = localStorage.getItem("financialYear");
    const payload = { client_ref_id: id, fin_year: finyear };
    async function fetchData() {
      try {
        const res = await adminServices.getClientRecord(payload);
        setFormData((prev) => ({
          ...prev,
          ...res,
          schedule_date: formatDateForInput(res.schedule_date),
          receivingDate: formatDateForInput(res.letter_date),
          client: res.client_sno_key,
        }));
      } catch (error) {
        console.error("Failed to fetch record", error);
      }
    }
    fetchData();
    fetchDepartment();
    fetchCaption();
    fetchCategory();
    fetchModeOfReceiving();
    fetchLetterType();
  }, []);

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const isValid = validate();
    if (!isValid) {
      // Scroll to first error field
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      const payload = {
        subject: formData.subject,
        is_post_ro: "N",
        avak_ref_id: "",
        avak_category: formData.ref_Category_id,
        received_date: formData.receivingDate
          ? new Date(formData.receivingDate).toISOString().slice(0, 10)
          : null,
        fixed_date: formData.fixedDate ? "Y" : "N",
        tender_amt: Number(formData.tender_amt) || 0,
        letter_no: formData.letter_no,
        letter_date: formData.letterDate
          ? new Date(formData.letterDate).toISOString().slice(0, 10)
          : null,
        caption_cd: formData.captionCd || "02",
        total_pages: String(formData.files),
        receiving_mode_code: formData.modeOfReceiving,
        letter_type_code: formData.letterType,
        remarks: formData.remark,
        financial_year: formData.financialYear || "2024-2025",
        client_cd: String(formData.officer),
        base_dept_code: formData.baseDept,
        office_code: formData.office,
        office_level_code: formData.officeLevel,
        district_code: formData.district,
        section_code: formData.section,
        client_prarup_code: formData.clientPrarupCode || "2",
        client_name: formData.client_name,
        ...(formData.isIndividual && {
        client_address: formData.clientAddress || 'NA',
        client_city: formData.clientCity || "NA",
        }),
        schedule_date: formData.schedule_date
          ? new Date(formData.schedule_date).toISOString().slice(0, 10)
          : null,
        ref_id: id,
        create_update_flag_name: "Insert",
        entry_by_user_type_cd: "01",
        entry_by_user_id: "00100",
        entry_by_section_cd: formData.section || "",
        client_exist: "Y",
        entry_date: new Date().toISOString().slice(0, 10),
        entry_time: new Date().toTimeString().split(" ")[0],
        ip_address: "103.79.34.50",
      };

      const response = await axiosClient.post("/Client/create-update-avak", payload, {
        headers: { "Content-Type": "application/json" },
      });

      dispatch(showNotification({ message: "Saved successfully!", severity: "success" }));
      router.push("/admin/counter");
      console.log("SUCCESS:", response.data);
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
      dispatch(
        showNotification({
          message: error.response?.data?.message || "Save failed!",
          severity: "error",
        })
      );
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f5f9", py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 960, mx: "auto" }}>

        {/* ── Page Header ── */}
        <Box mb={4} display="flex" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Box>
            <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "13px",
                  background: "#010a2a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 18px rgba(1,10,42,0.28)",
                }}
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: "#111827", letterSpacing: "-0.5px" }}>
                Avak Entry
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#9ca3af", ml: "60px" }}>
              Register incoming client document and letter details
            </Typography>
          </Box>
          <Chip
            label="New Entry"
            size="mdall"
            sx={{
              backgroundColor: "#e8eaf6",
              color: "#010a2a",
              fontWeight: 700,
              fontSize: "0.72rem",
              borderRadius: "8px",
              border: "1px solid #c5cae9",
              mt: 1,
            }}
          />
        </Box>

        <Box component="form">

          {/* ── Section 1: Content Category ── */}
          <SectionCard icon={<IconCategory />} title="Content Category" subtitle="Select the type of media content" accent="#6366f1">
            <ContentCategoryRadio
              value={formData.ref_Category_id}
              onChange={(val) => {
                setFormData((prev) => ({ ...prev, ref_Category_id: val }));
                setErrors((prev) => ({ ...prev, ref_Category_id: "" }));
              }}
              categories={categories}
              hasError={!!errors.ref_Category_id}
            />
          </SectionCard>

          {/* ── Section 2: Document Info ── */}
          <SectionCard icon={<IconDoc />} title="Document Details" subtitle="Letter and caption reference information" accent="#010a2a">
            <Grid container spacing={2.5}>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Letter No *"
                  name="letter_no"
                  value={formData.letter_no}
                  onChange={handleChange}
                  error={!!errors.letter_no}
                  helperText={errors.letter_no}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Receiving Date *"
                  name="receivingDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.receivingDate}
                  onChange={handleChange}
                  error={!!errors.receivingDate}
                  helperText={errors.receivingDate}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Category *"
                  name="caption_cd"
                  value={formData.caption_cd}
                  onChange={handleChange}
                  error={!!errors.caption_cd}
                  helperText={errors.caption_cd}
                  sx={field}
                >
                  {captions.map((cap) => (
                    <MenuItem key={cap.caption_cd} value={cap.caption_name}>
                      {cap.caption_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Tender Amount *"
                  name="tender_amt"
                  type="number"
                  value={formData.tender_amt}
                  onChange={handleChange}
                  error={!!errors.tender_amt}
                  helperText={errors.tender_amt}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography sx={{ color: "#9ca3af", fontSize: "0.85rem", fontWeight: 600 }}>₹</Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Publication Date *"
                  name="schedule_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.schedule_date}
                  onChange={handleChange}
                  error={!!errors.schedule_date}
                  helperText={errors.schedule_date}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Letter Type *"
                  name="letterType"
                  value={formData.letterType}
                  onChange={handleChange}
                  error={!!errors.letterType}
                  helperText={errors.letterType}
                  sx={field}
                >
                  {letterTypes.map((type) => (
                    <MenuItem key={type.letter_code} value={type.letter_code}>
                      {type.letter_type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Mode of Receiving *"
                  name="modeOfReceiving"
                  value={formData.modeOfReceiving}
                  onChange={handleChange}
                  error={!!errors.modeOfReceiving}
                  helperText={errors.modeOfReceiving}
                  sx={field}
                >
                  {modes.map((mode) => (
                    <MenuItem key={mode.rec_code} value={mode.rec_code}>
                      {mode.receiving_mode}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="No. of Pages in Document *"
                  name="files"
                  type="number"
                  value={formData.files}
                  onChange={handleChange}
                  error={!!errors.files}
                  helperText={errors.files}
                  sx={field}
                />
              </Grid>

            </Grid>
          </SectionCard>
          <Paper elevation={0} sx={{
        mb: 3, px: 3, py: 2,
        borderRadius: "14px", border: "1.5px solid #ebebf0",
        background: "linear-gradient(135deg, #fafbff 0%, #f5f6fa 100%)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 1,
      }}>
        <Box>
          <Typography variant="body2" fontWeight={700} sx={{ color: "#111827" }}>
            Client Type
          </Typography>
          <Typography variant="caption" sx={{ color: "#9ca3af" }}>
            {formData.isIndividual
              ? "Showing individual person fields"
              : "Showing organisation / company fields"}
          </Typography>
        </Box>
 
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isIndividual}
              name="isIndividual"
              onChange={handleChange}
              sx={{
                color: "#c5cae9",
                "&.Mui-checked": { color: "#010a2a" },
                "& .MuiSvgIcon-root": { fontSize: 20 },
              }}
            />
          }
          label={
            <Typography variant="body2" fontWeight={600} sx={{ color: "#374151", userSelect: "none" }}>
              Individual / Person
            </Typography>
          }
          sx={{ m: 0 }}
        />
      </Paper>
          {/* ── Section 3: Location & Office ── */}
          {!formData.isIndividual ?(
          <SectionCard icon={<IconOffice />} title="Office & Location" subtitle="Departmental and geographic assignment" accent="#10b981">
            <Grid container spacing={2.5}>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Client *"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  error={!!errors.client}
                  helperText={errors.client}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  select
                  label="Base Department *"
                  name="baseDept"
                  value={formData.baseDept}
                  onChange={handleChange}
                  error={!!errors.baseDept}
                  helperText={errors.baseDept}
                  sx={field}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.deptid} value={dept.deptid}>
                      {dept.deptname}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <TextField
                  select
                  fullWidth
                  label="District *"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  error={!!errors.district}
                  helperText={errors.district}
                  sx={field}
                >
                  {districts.map((district) => (
                    <MenuItem key={district.dstrictid} value={district.dstrictid}>
                      {district.districtname}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Office Level *"
                  name="officeLevel"
                  value={formData.officeLevel}
                  onChange={handleChange}
                  error={!!errors.officeLevel}
                  helperText={errors.officeLevel}
                  sx={field}
                >
                  {levels.map((level) => (
                    <MenuItem key={level.officeLevelCode} value={level.officeLevelCode}>
                      {level.officeLevelName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Office *"
                  name="office"
                  value={formData.office}
                  onChange={handleChange}
                  error={!!errors.office}
                  helperText={errors.office}
                  sx={field}
                >
                  {offices.map((office) => (
                    <MenuItem key={office.newOfficeCode} value={office.newOfficeCode}>
                      {office.officeName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Section — not required, kept as plain field */}
              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  sx={field}
                >
                  {sections.map((section) => (
                    <MenuItem key={section}>{section}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Officer *"
                  name="officer"
                  value={formData.officer}
                  onChange={handleChange}
                  error={!!errors.officer}
                  helperText={errors.officer}
                  sx={field}
                >
                  {officers.map((officer) => (
                    <MenuItem key={officer.employeeId} value={officer.employeeId}>
                      {officer.employeeName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 12 }}>
                <TextField
                  fullWidth
                  label="Client Name *"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  error={!!errors.client}
                  helperText={errors.client}
                  sx={field}
                />
              </Grid>
            </Grid>
          </SectionCard>
          ):(<SectionCard icon={<IconOffice />} title="Client Office & Location" subtitle="Departmental and geographic assignment" accent="#10b981">
            <Grid container spacing={2.5}>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Client Name *"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  error={!!errors.client}
                  helperText={errors.client}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Client Address *"
                  name="client_address"
                  value={formData.client_address}
                  onChange={handleChange}
                  error={!!errors.client}
                  helperText={errors.client}
                  sx={field}
                />
              </Grid>


              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Client City *"
                  name="client_city"
                  value={formData.client_city}
                  onChange={handleChange}
                  error={!!errors.client}
                  helperText={errors.client}
                  sx={field}
                />
              </Grid>
            </Grid>
          </SectionCard>
          )}

          {/* ── Section 4: Remarks ── */}
          <SectionCard icon={<IconMeta />} title="Additional Remarks" subtitle="Any notes or supplementary information" accent="#8b5cf6">
            <TextField
              fullWidth
              label="Remark *"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              error={!!errors.remark}
              helperText={errors.remark}
              multiline
              rows={3}
              sx={field}
            />
          </SectionCard>

          {/* ── Footer Actions ── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              position: "sticky",
              bottom: 0,
              py: 2.5,
              px: 3,
              mx: -1,
              borderRadius: "14px",
              backgroundColor: "rgba(244,245,249,0.94)",
              backdropFilter: "blur(10px)",
              borderTop: "1.5px solid #ebebf0",
            }}
          >
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              Fields marked with * are required
            </Typography>
            <Box display="flex" gap={1.5}>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  px: 3,
                  "&:hover": { borderColor: "#9ca3af", backgroundColor: "#f9fafb" },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={handleSubmit}
                sx={{
                  px: 4,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  background: "#010a2a",
                  boxShadow: "0 4px 14px rgba(1,10,42,0.35)",
                  "&:hover": {
                    background: "#0d1b4b",
                    boxShadow: "0 6px 20px rgba(1,10,42,0.45)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}