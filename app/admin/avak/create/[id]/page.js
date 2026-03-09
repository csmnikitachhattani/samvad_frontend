"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import adminServices from "@/services/adminServices";
import clientServices from "@/services/clientServices";
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputAdornment,
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

function ContentCategoryRadio({ value, onChange, categories }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", mb: 1.5, display: "block" }}>
        Content Category
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1.2}>
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
              {/* radio dot */}
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
    </Box>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ClientAttachmentForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();

  const [captions, setCaptions] = useState([])
  const [formData, setFormData] = useState({
    ref_Category_id: "",
    letter_no: "",
    receivingDate: "",
    caption_cd: "",
    tender_amt: "",
    schedule_date: "",
    client: "",
    baseDept: "",
    district: "",
    officeLevel: "",
    office: "",
    section: "",
    officer: "",
    modeOfReceiving: "",
    noOfPages: "",
    letterType: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [categories, setCategories] = useState([])

  async function fetchCategory() {
    try {
      const res = await clientServices.getAdvtCategory();
      setCategories(res.data.data);
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }

  async function fetchDepartment() {
    try {
      const res = await clientServices.getalldepartment();
      //setFormData(res);
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }
  async function fetchCaption() {
    try {
      const res = await clientServices.getAdvtCaption();
      setCaptions(res.data.result);
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }

  async function fetchClient() {
    try {
      const res = await clientServices.getClientData();
      console.log("console", res.data)
      //setFormData(res);
      setFormData((prev) => ({
        ...prev,
        baseDept: res.data.data.base_dept_code,
        district: res.data.data.district_code,
        officeLevel: res.data.data.Office_code,
        office: res.data.data.Office_code,
        section: res.data.data.section_code,
        officer: res.data.data.employee_code,
      }));
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }
  useEffect(() => {
    let finyear = localStorage.getItem('financialYear')
    const payload = {
      "client_ref_id": id,
      "fin_year": finyear
    }

    async function fetchData() {
      try {
        const res = await adminServices.getClientRecord(payload);
        console.log(res)
        const apiData = res?.data?.data || res?.data;
        //const job = Array.isArray(apiData) ? apiData[0] : apiData;
        setFormData();
        // if (job) {
        setFormData((prev) => ({ ...prev, ...res }));

        //}
        console.log("assigned", formData)
      } catch (error) {
        console.error("Failed to fetch work orders", error);
      } finally {
        //setLoading(false);
      }
    }
    fetchData();
    fetchDepartment();
    fetchCaption();
    fetchCategory();
    fetchClient();
  }, []);

  const handleSubmit = async () => {
    //e.preventDefault();
    try {
      const payload = {
        subject: formData.subject,
        avak_caption_cd: formData.ref_Category_id,
        received_date: formData.receivingDate ? new Date(formData.receivingDate).toISOString() : null,
        fixed_date: formData.fixedDate || "20-2-2026",
        tender_amt: Number(formData.tender_amt) || 0,
        letter_no: formData.letter_no,
        letter_date: formData.letterDate ? new Date(formData.letterDate).toISOString() : null,
        caption_cd: formData.captionCd || "02",
        total_pages: formData.noOfPages,
        receiving_mode_code: formData.modeOfReceiving,
        letter_type_code: formData.letterType,
        remarks: formData.remark,
        financial_year: formData.financialYear || "2024-2025",
        client_cd: formData.client,
        base_dept_code: formData.baseDept,
        office_code: formData.office,
        office_level_code: formData.officeLevel,
        district_code: formData.district,
        section_code: formData.section,
        client_prarup_code: formData.clientPrarupCode || '2',
        client_name: formData.clientName || "",
        client_address: formData.clientAddress || "",
        client_city: formData.clientCity || "",
        schedule_date: formData.schedule_date ? new Date(formData.schedule_date).toISOString() : null,
        is_post_ro: formData.isPostRo || "",
        ref_id: formData.refId || "",
        avak_ref_id: formData.avakRefId || "",
        create_update_flag_name: "C",                          // "C" = Create, "U" = Update
        entry_by_user_type_cd: "",
        entry_by_user_id: "00100",                      // replace with auth user
        entry_by_section_cd: formData.section || "",
        client_exist: "Y",
        entry_date: new Date().toISOString(),
        entry_time: new Date().toTimeString().split(" ")[0],
        ip_address: "103.79.34.50",               // replace with real IP
      };

      const response = await axiosClient.post(
        "http://103.79.34.50:8083/api/Client/create-update-avak",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch(showNotification({ message: "Saved successfully!", severity: "success" }));
      router.push("/admin/counter");
      console.log("SUCCESS:", response.data);
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
      dispatch(showNotification({ message: error.response?.data?.message || "Save failed!", severity: "error" }));
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
              onChange={(val) => setFormData((prev) => ({ ...prev, ref_Category_id: val }))}
              categories={categories}
            />
          </SectionCard>

          {/* ── Section 2: Document Info ── */}
          <SectionCard icon={<IconDoc />} title="Document Details" subtitle="Letter and caption_cd reference information" accent="#010a2a">
            <Grid container spacing={2.5}>
              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Letter No"
                  name="letter_no"
                  value={formData.letter_no}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Receiving Date"
                  name="receivingDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.receivingDate}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="caption_cd"
                  value={formData.caption_cd}
                  onChange={handleChange}
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
                  label="Tender Amount"
                  name="tender_amt"
                  type="number"
                  value={formData.tender_amt}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Typography sx={{ color: "#9ca3af", fontSize: "0.85rem", fontWeight: 600 }}>₹</Typography></InputAdornment>,
                  }}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Publication Date"
                  name="schedule_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.schedule_date}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Letter Type"
                  name="letterType"
                  value={formData.letterType}
                  onChange={handleChange}
                  sx={field}
                >
                  <MenuItem value="incoming">Incoming</MenuItem>
                  <MenuItem value="outgoing">Outgoing</MenuItem>
                  <MenuItem value="internal">Internal</MenuItem>
                  <MenuItem value="circular">Circular</MenuItem>
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Mode of Receiving"
                  name="modeOfReceiving"
                  value={formData.modeOfReceiving}
                  onChange={handleChange}
                  sx={field}
                >
                  <MenuItem value="hand">By Hand</MenuItem>
                  <MenuItem value="post">By Post</MenuItem>
                  <MenuItem value="email">By Email</MenuItem>
                  <MenuItem value="courier">By Courier</MenuItem>
                  <MenuItem value="fax">By Fax</MenuItem>
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="No. of Pages in Document"
                  name="noOfPages"
                  type="number"
                  value={formData.noOfPages}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid>
            </Grid>
          </SectionCard>

          {/* ── Section 3: Location & Office ── */}
          <SectionCard icon={<IconOffice />} title="Office & Location" subtitle="Departmental and geographic assignment" accent="#10b981">
            <Grid container spacing={2.5}>
              <Grid item size={{ xs: 12, }}>
                <TextField
                  fullWidth
                  label="Base Department"
                  name="baseDept"
                  value={formData.baseDept}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, }}>
                <TextField
                  fullWidth
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </InputAdornment>
                    ),
                  }}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Office Level"
                  name="officeLevel"
                  value={formData.officeLevel}
                  onChange={handleChange}
                  sx={field}
                >
                  <MenuItem value="state">State Level</MenuItem>
                  <MenuItem value="district">District Level</MenuItem>
                  <MenuItem value="block">Block Level</MenuItem>
                  <MenuItem value="panchayat">Panchayat Level</MenuItem>
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Office"
                  name="office"
                  value={formData.office}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Officer"
                  name="officer"
                  value={formData.officer}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid>
            </Grid>
          </SectionCard>

          {/* ── Section 4: Remarks ── */}
          <SectionCard icon={<IconMeta />} title="Additional Remarks" subtitle="Any notes or supplementary information" accent="#8b5cf6">
            <TextField
              fullWidth
              label="Remark"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
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
              All fields marked are required
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
                //type="submit"
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