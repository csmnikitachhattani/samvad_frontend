"use client";

import { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import adminServices from "@/services/adminServices";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { showNotification } from "@/store/modules/Snackbar/notificationSlice";

// ─── Shared sx helpers ────────────────────────────────────────────────────────
const grayField = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#f4f5f7",
    "& fieldset": { borderColor: "#e2e4ea" },
    "&:hover fieldset": { borderColor: "#010a2a" },
    "&.Mui-focused fieldset": { borderColor: "#010a2a" },
  },
  "& .MuiInputLabel-root": { color: "#8a90a0" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#5c7cfa" },
  "& .MuiInputBase-input": { color: "#010a2a" },
};

// ─── Section header helper ────────────────────────────────────────────────────
function SectionHeader({ title }) {
  return (
    <Box display="flex" alignItems="center" gap={1} mb={2.5} mt={1}>
      <Box
        sx={{
          width: 6,
          height: 20,
          borderRadius: "3px",
          background: "#010a2a",
          flexShrink: 0,
        }}
      />
      <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#1a1f36" }}>
        {title}
      </Typography>
    </Box>
  );
}

export default function JobForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const durationOptions = [
    { value: "1week", label: "1 Week" },
    { value: "2week", label: "2 Weeks" },
    { value: "3week", label: "3 Weeks" },
    { value: "1month", label: "1 Month" },
    { value: "2month", label: "2 Months" },
  ];
  const [data, setData] = useState({
    job_id: "2",
    financial_year: "",
    client_ref_id: "",
    avak_ref_id: "",
    is_client_dpr: "",
    ref_no: "",
    od_servicetype_id: "",
    subject: "",
    startDate: "",
    duration: '',
    endDate: "",
    ref_date: "",
    receipt_date: "",
    client_cd: "",
    client_name: "",
    office_address: "",
    billing_client_cd: "",
    billing_client_name: "",
    billing_address: "",
    office_code: "",
    district_code: "",
    remarks: "",
    ip_address: "",
    entry_user_name: "nikita",
    files: null,
  });
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await adminServices.getServices();
        setServices(response?.result || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    }
    fetchServices();
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  async function getPublicIP() {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    console.log(data.ip);
    return data.ip
  }
  useEffect(() => {
    getPublicIP()
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("job_id", data.job_id);
      payload.append("financial_year", data.financial_year);
      payload.append("client_ref_id", data.client_ref_id);
      payload.append("avak_ref_id", data.avak_ref_id);
      payload.append("is_client_dpr", data.is_client_dpr);
      payload.append("ref_no", data.ref_no);
      payload.append("od_servicetype_id", data.od_servicetype_id);
      payload.append("subject", data.subject);
      payload.append("startDate", data.startDate);
      payload.append("endDate", data.endDate);
      payload.append("office_address", data.office_address);
      payload.append("billing_address", data.billing_address);
      payload.append("remarks", data.remarks);
      payload.append("ip_address", getPublicIP());
      payload.append("entry_user_name", data.entry_user_name);
      payload.append("entry_by_user_id", "00100");
      payload.append("client_cd", "00020");

      if (data.files) {
        payload.append("files", data.files);
      }

      for (let pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axiosClient.post(
        "http://103.79.34.50:8083/api/outDoorMediaTransaction/savecounter",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(showNotification({ message: "Saved!", severity: "success" }));
      router.push(`/admin/counter`);
      console.log("SUCCESS:", response.data);
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        maxWidth: 1100,
        mx: "auto",
        borderRadius: "16px",
        backgroundColor: "#f7f8fc",
        border: "1px solid #e8eaf0",
      }}
    >
      {/* ── Page Header ── */}
      <Box
        mb={4}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid #e8eaf0",
          pb: 3,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            background: "#010a2a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(92,124,250,0.35)",
            flexShrink: 0,
          }}
        >
          {/* briefcase icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line x1="12" y1="12" x2="12" y2="12.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Box>
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#1a1f36", letterSpacing: "-0.3px" }}
          >
            Counter Form
          </Typography>
          <Typography variant="caption" sx={{ color: "#8a90a0" }}>
            Create a new outdoor media job record
          </Typography>
        </Box>
      </Box>

      <Box component="form" >
        {/* ── Reference Info ── */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: "14px",
            backgroundColor: "#ffffff",
            border: "1px solid #e8eaf0",
          }}
        >
          <SectionHeader title="Reference Information" />
          <Grid container spacing={2.5}>
            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Financial Year"
                name="financial_year"
                fullWidth
                value={data.financial_year}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Client Ref ID"
                name="client_ref_id"
                fullWidth
                value={data.client_ref_id}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="AVAK Ref ID"
                name="avak_ref_id"
                fullWidth
                value={data.avak_ref_id}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Ref No"
                name="ref_no"
                fullWidth
                value={data.ref_no}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                select
                label="Is Client DPR"
                name="is_client_dpr"
                fullWidth
                value={data.is_client_dpr}
                onChange={handleChange}
                sx={grayField}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>
            {/* 
            <Grid item size={{xs:12, md:3}}>
              <TextField
                label="OD Service Type ID"
                type="number"
                name="od_servicetype_id"
                fullWidth
                value={data.od_servicetype_id}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid> */}
            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                select
                label="Service Type"
                name="od_servicetype_id"
                fullWidth
                value={data.od_servicetype_id}
                onChange={handleChange}
                sx={grayField}
              >
                {services.length > 0 ? (
                  services.map((s) => (
                    <MenuItem key={s.serviceId} value={s.serviceId}>
                      {s.serviceName}
                    </MenuItem>
                  ))
                ) : (
                    <MenuItem disabled>
                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        No services available
        </Typography>
                    </MenuItem>
                  )}
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        {/* ── Job Details ── */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: "14px",
            backgroundColor: "#ffffff",
            border: "1px solid #e8eaf0",
          }}
        >
          <SectionHeader title="Job Details" />
          <Grid container spacing={2.5}>
            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Subject"
                name="subject"
                fullWidth
                value={data.subject}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Start Date"
                type="date"
                name="startDate"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={data.startDate}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                select
                label="Duration"
                value={data.duration}
                name="duration"
                onChange={handleChange}
                fullWidth
                sx={grayField}
              >
                {durationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="End Date"
                type="date"
                name="endDate"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={data.endDate}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* ── Address Info ── */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: "14px",
            backgroundColor: "#ffffff",
            border: "1px solid #e8eaf0",
          }}
        >
          <SectionHeader title="Address & Remarks" />
          <Grid container spacing={2.5}>
            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Office Address"
                name="office_address"
                multiline
                rows={3}
                fullWidth
                value={data.office_address}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Billing Address"
                name="billing_address"
                multiline
                rows={3}
                fullWidth
                value={data.billing_address}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Remarks"
                name="remarks"
                multiline
                rows={3}
                fullWidth
                value={data.remarks}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid>

            {/* <Grid item size={{xs:12, md:3}}>
              <TextField
                label="IP Address"
                name="ip_address"
                fullWidth
                value={data.ip_address}
                onChange={handleChange}
                sx={grayField}
              />
            </Grid> */}
          </Grid>
        </Paper>

        {/* ── File Upload ── */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: "14px",
            backgroundColor: "#ffffff",
            border: "1px solid #e8eaf0",
          }}
        >
          <SectionHeader title="Attachment" />
          <Box
            component="label"
            htmlFor="file-upload"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              p: 3,
              borderRadius: "10px",
              border: "2px dashed #d0d4e8",
              backgroundColor: "#f4f5f7",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#5c7cfa",
                backgroundColor: "#eef1ff",
              },
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                stroke="#8a90a0"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Typography variant="body2" sx={{ color: "#5a6072", fontWeight: 500 }}>
              {data.files ? data.files.name : "Click to upload a file"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#b0b5c4" }}>
              Any format accepted
            </Typography>
            <input
              id="file-upload"
              hidden
              type="file"
              name="files"
              onChange={handleChange}
            />
          </Box>
        </Paper>

        {/* ── Submit Bar ── */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            position: "sticky",
            bottom: 0,
            backgroundColor: "#f7f8fc",
            pt: 2,
            pb: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{
              px: 6,
              py: 1.3,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              background: "#010a2a",
              boxShadow: "0 4px 14px rgba(92,124,250,0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #4f6ef5 0%, #3b58e0 100%)",
                boxShadow: "0 6px 18px rgba(92,124,250,0.5)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Submit Job
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}