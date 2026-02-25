"use client";

import { useState, useEffect } from "react";
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
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#010a2a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#010a2a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCategory = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h7" stroke="#6366f1" strokeWidth="1.7" strokeLinecap="round"/>
  </svg>
);

const IconLocation = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconOffice = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M3 21V7l9-4 9 4v14" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21v-6h6v6" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconMeta = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#8b5cf6" strokeWidth="1.7"/>
    <path d="M12 8v4l3 3" stroke="#8b5cf6" strokeWidth="1.7" strokeLinecap="round"/>
  </svg>
);

// ── Content Category Radio ─────────────────────────────────────────────────────
const CATEGORIES = [
  { value: "classified", label: "Classified" },
  { value: "outdoor_media", label: "Outdoor Media" },
  { value: "printing", label: "Printing" },
  { value: "electronic", label: "Electronic" },
];

function ContentCategoryRadio({ value, onChange }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", mb: 1.5, display: "block" }}>
        Content Category
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1.2}>
        {CATEGORIES.map((cat) => {
          const active = value === cat.value;
          return (
            <Box
              key={cat.value}
              onClick={() => onChange(cat.value)}
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
                {cat.label}
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
  const [formData, setFormData] = useState({
    contentCategory: "outdoor_media",
    letterNo: "",
    receivingDate: "",
    category: "tender",
    tenderAmount: "",
    publicationDate: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
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
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: "#111827", letterSpacing: "-0.5px" }}>
                Client Attachment
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

        <Box component="form" onSubmit={handleSubmit}>

          {/* ── Section 1: Content Category ── */}
          <SectionCard icon={<IconCategory />} title="Content Category" subtitle="Select the type of media content" accent="#6366f1">
            <ContentCategoryRadio
              value={formData.contentCategory}
              onChange={(val) => setFormData((prev) => ({ ...prev, contentCategory: val }))}
            />
          </SectionCard>

          {/* ── Section 2: Document Info ── */}
          <SectionCard icon={<IconDoc />} title="Document Details" subtitle="Letter and category reference information" accent="#010a2a">
            <Grid container spacing={2.5}>
              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Letter No"
                  name="letterNo"
                  value={formData.letterNo}
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
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  sx={field}
                >
                  <MenuItem value="tender">Tender</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                  <MenuItem value="confidential">Confidential</MenuItem>
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Tender Amount"
                  name="tenderAmount"
                  type="number"
                  value={formData.tenderAmount}
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
                  name="publicationDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.publicationDate}
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
              <Grid item size={{ xs:12, }}>
                <TextField
                  fullWidth
                  label="Base Department"
                  name="baseDept"
                  value={formData.baseDept}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid>

              <Grid item size={{ xs:12,}}>
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
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"/>
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
                type="submit"
                variant="contained"
                size="medium"
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