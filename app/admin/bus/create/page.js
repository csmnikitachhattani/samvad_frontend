"use client";
import { useState } from "react";
import axiosClient from "@/lib/axiosClient";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Chip,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";

// ── Field style ───────────────────────────────────────────────────────────────
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

// ── File Upload Field ──────────────────────────────────────────────────────────
function FileUploadField({ label, name, file, onChange, accent = "#010a2a", accentBg = "#e8eaf6" }) {
  return (
    <Box
      component="label"
      htmlFor={`file-${name}`}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 1.6,
        borderRadius: "12px",
        border: "2px dashed",
        borderColor: file ? accent : "#dde0ea",
        backgroundColor: file ? accentBg : "#f8f9fb",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": { borderColor: accent, backgroundColor: accentBg },
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "10px",
          backgroundColor: file ? `${accent}18` : "#f0f1f5",
          border: "1.5px solid",
          borderColor: file ? `${accent}30` : "#e4e6ef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
            stroke={file ? accent : "#9ca3af"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Box>
      <Box flex={1} sx={{ overflow: "hidden" }}>
        <Typography variant="body2" fontWeight={600} sx={{ color: file ? accent : "#374151", fontSize: "0.82rem" }}>
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: "#9ca3af" }}>
          {file ? `${file.name} · ${(file.size / 1024).toFixed(1)} KB` : "Click to choose file"}
        </Typography>
      </Box>
      {file && (
        <Chip
          label="Ready"
          size="small"
          sx={{ backgroundColor: accent, color: "#fff", fontWeight: 700, fontSize: "0.68rem", borderRadius: "6px", height: 22, flexShrink: 0 }}
        />
      )}
      <input id={`file-${name}`} type="file" hidden name={name} onChange={onChange} />
    </Box>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconBus = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="13" rx="2" stroke="#010a2a" strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M2 10h20M7 5V3M17 5V3" stroke="#010a2a" strokeWidth="1.7" strokeLinecap="round"/>
    <circle cx="7" cy="18" r="1.5" fill="#010a2a"/>
    <circle cx="17" cy="18" r="1.5" fill="#010a2a"/>
    <path d="M7 10v4M12 10v4M17 10v4" stroke="#010a2a" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round"/>
  </svg>
);

const IconDoc = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#8b5cf6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#8b5cf6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconUser = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round"/>
    <circle cx="12" cy="7" r="4" stroke="#10b981" strokeWidth="1.7"/>
  </svg>
);

// ── Main Component ─────────────────────────────────────────────────────────────
export default function BusRegistrationForm() {
  const [data, setData] = useState({
    agencyId: "",
    busNo: "",
    busType: "",
    ownerName: "",
    fitnessUpto: "",
    insuranceUpto: "",
    rcPhotoFile: null,
    rcPhotoPath: "",
    fitnessFile: null,
    fitnessPath: "",
    insuranceFile: null,
    insurancePath: "",
    createdBy: "",
    createdByAddress: "",
  });
  const router = useRouter();
  async function getPublicIP() {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    console.log(data.ip);
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("AgencyId", data.agencyId);
      formData.append("BusNo", data.busNo);
      formData.append("BusType", data.busType);
      formData.append("OwnerName", data.ownerName);
      formData.append("FitnessUpto", data.fitnessUpto);
      formData.append("InsuranceUpto", data.insuranceUpto);
      if (data.rcPhotoFile)   formData.append("RcPhotoFile", data.rcPhotoFile);
      formData.append("RcPhotoPath", data.rcPhotoPath);
      if (data.fitnessFile)   formData.append("FitnessFile", data.fitnessFile);
      formData.append("FitnessPath", data.fitnessPath);
      if (data.insuranceFile) formData.append("InsuranceFile", data.insuranceFile);
      formData.append("InsurancePath", data.insurancePath);
      formData.append("CreatedBy", data.createdBy);
      formData.append("CreatedByAddress", data.createdByAddress);

      const response = await axiosClient.post(
        "http://103.79.34.50:8083/api/ManageMaster/createbusprinting",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("SUCCESS:", response.data);
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f5f9", py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 860, mx: "auto" }}>

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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="5" width="20" height="13" rx="2" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
                  <path d="M2 10h20M7 5V3M17 5V3" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
                  <circle cx="7" cy="18" r="1.5" fill="white"/>
                  <circle cx="17" cy="18" r="1.5" fill="white"/>
                </svg>
              </Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: "#111827", letterSpacing: "-0.5px" }}>
                Bus Registration
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#9ca3af", ml: "60px" }}>
              Register a new bus with documents and validity info
            </Typography>
          </Box>
          <Chip
            label="New Entry"
            size="small"
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

        {/* ── Section 1: Bus Info ── */}
        <SectionCard icon={<IconBus />} title="Bus Information" subtitle="Basic vehicle and ownership details" accent="#010a2a">
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Agency ID"
                name="agencyId"
                type="number"
                value={data.agencyId}
                onChange={handleChange}
                sx={field}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Bus No"
                name="busNo"
                value={data.busNo}
                onChange={handleChange}
                sx={field}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Bus Type"
                name="busType"
                value={data.busType}
                onChange={handleChange}
                sx={field}
              >
                <MenuItem value={1}>Type 1 — Mini Bus</MenuItem>
                <MenuItem value={2}>Type 2 — Standard</MenuItem>
                <MenuItem value={3}>Type 3 — Luxury</MenuItem>
                <MenuItem value={4}>Type 4 — Double Decker</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Owner Name"
                name="ownerName"
                value={data.ownerName}
                onChange={handleChange}
                sx={field}
              />
            </Grid>
          </Grid>
        </SectionCard>

        {/* ── Section 2: Validity Dates ── */}
        <SectionCard icon={<IconCalendar />} title="Validity Dates" subtitle="Fitness and insurance expiry dates" accent="#ef4444">
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fitness Upto"
                name="fitnessUpto"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={data.fitnessUpto}
                onChange={handleChange}
                sx={field}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Insurance Upto"
                name="insuranceUpto"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={data.insuranceUpto}
                onChange={handleChange}
                sx={field}
              />
            </Grid>
          </Grid>
        </SectionCard>

        {/* ── Section 3: Documents ── */}
        <SectionCard icon={<IconDoc />} title="Documents" subtitle="Upload RC, fitness and insurance certificates" accent="#8b5cf6">
          <Grid container spacing={2}>
            {/* RC Photo */}
            <Grid item xs={12} sm={6}>
              <FileUploadField
                label="RC Photo"
                name="rcPhotoFile"
                file={data.rcPhotoFile}
                onChange={handleChange}
                accent="#010a2a"
                accentBg="#e8eaf6"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="RC Photo Path"
                name="rcPhotoPath"
                value={data.rcPhotoPath}
                onChange={handleChange}
                placeholder="or enter path manually"
                sx={field}
              />
            </Grid>

            {/* Fitness */}
            <Grid item xs={12} sm={6}>
              <FileUploadField
                label="Fitness Certificate"
                name="fitnessFile"
                file={data.fitnessFile}
                onChange={handleChange}
                accent="#8b5cf6"
                accentBg="#faf5ff"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fitness Path"
                name="fitnessPath"
                value={data.fitnessPath}
                onChange={handleChange}
                placeholder="or enter path manually"
                sx={field}
              />
            </Grid>

            {/* Insurance */}
            <Grid item xs={12} sm={6}>
              <FileUploadField
                label="Insurance Document"
                name="insuranceFile"
                file={data.insuranceFile}
                onChange={handleChange}
                accent="#f59e0b"
                accentBg="#fffbeb"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Insurance Path"
                name="insurancePath"
                value={data.insurancePath}
                onChange={handleChange}
                placeholder="or enter path manually"
                sx={field}
              />
            </Grid>
          </Grid>
        </SectionCard>

        {/* ── Section 4: Audit ── */}
        <SectionCard icon={<IconUser />} title="Entry Details" subtitle="Created by and origin address" accent="#10b981">
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Created By (User ID)"
                name="createdBy"
                type="number"
                value={data.createdBy}
                onChange={handleChange}
                sx={field}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Created By Address (IP)"
                name="createdByAddress"
                value={data.createdByAddress}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 0.5 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="1.8"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </Box>
                  ),
                }}
                sx={field}
              />
            </Grid>
          </Grid>
        </SectionCard>

        {/* ── Footer ── */}
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
              Register Bus
            </Button>
          </Box>
        </Box>

      </Box>
    </Box>
  );
}