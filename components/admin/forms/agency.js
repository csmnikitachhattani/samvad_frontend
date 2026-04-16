import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  InputAdornment,
  Grid,
  Paper,
  MenuItem,
  Chip,
  OutlinedInput,
  InputLabel,
  FormControl,
  ListItemText,
  Select,
} from "@mui/material";
import adminServices from "@/services/adminServices";
import clientServices from "@/services/clientServices";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import commonServices from "@/services/commonServices";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";
import {emailErrors, emailRules, gstField } from '@/lib/rules'

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 },
  },
};

// ── Section card ──────────────────────────────────────────────────────────────
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
const IconAgency = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M3 21V7l9-4 9 4v14" stroke="#010a2a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 21v-6h6v6" stroke="#010a2a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" stroke="#010a2a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconLocation = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconContact = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="12" cy="7" r="4" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const IconService = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8b5cf6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCalendar = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M16 2v4M8 2v4M3 10h18" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

// ── Main component ─────────────────────────────────────────────────────────────
const AgencyForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    agencyName: "",
    ownerName: "",
    gstin: "",
    address: "",
    city: "",
    district: "",
    state: "",
    contactPerson: "",
    phone: "",
    email: "",
    validityFrom: "",
    validityTo: "",
    serviceIds: [],
    isActive: true,
  });



  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({})

  const [financialYear, setFinancialYear] = useState("");
  const [userId,        setUserId]        = useState("");
  const [user_name,     setUserName]      = useState("");
  const [userTypeCd,   setUserTypeCd]      = useState("");
  const [ipAddress,   setIpAddress]      = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const financialYearLS = localStorage.getItem("financialYear");
    const userIdLS = localStorage.getItem("userid");
    const userNameLS = localStorage.getItem("username");
    const userTypeCdLS = localStorage.getItem("usertypecode");
  
    setFinancialYear(financialYearLS);
    setUserId(userIdLS);
    setUserName(userNameLS);
    setUserTypeCd(userTypeCdLS);
  
    const getIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setIpAddress(data.ip);
      } catch {
        console.error("IP fetch failed");
      }
    };
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "email") {
      if (!value)                               setErrors((p) => ({ ...p, email: emailErrors.required }));
      else if (!emailRules.pattern.test(value)) setErrors((p) => ({ ...p, email: emailErrors.pattern }));
      else                                      setErrors((p) => ({ ...p, email: "" }));
  
    } else if (name === "gstin") {
      if (!value)                                   setErrors((p) => ({ ...p, gstin: gstField.required.message }));
      else if (!gstField.pattern.value.test(value)) setErrors((p) => ({ ...p, gstin: gstField.pattern.message }));
      else                                          setErrors((p) => ({ ...p, gstin: "" }));
  
    } else if (name === "phone") {
      if (!value)                        setErrors((p) => ({ ...p, phone: "Phone is required." }));
      else if (!/^\d{10}$/.test(value))  setErrors((p) => ({ ...p, phone: "Enter a valid 10-digit phone number." }));
      else                               setErrors((p) => ({ ...p, phone: "" }));
  
    } else {
      if (value) setErrors((p) => ({ ...p, [name]: "" }));
    }
  
    setFormData({ ...formData, [name]: value });
  };


  const handleServiceChange = (event) => {
    const { target: { value } } = event;
    setFormData((prev) => ({
      ...prev,
      serviceIds: typeof value === "string" ? value.split(",") : value,
    }));
  };
  const handleAddAgency = async () => {
    if (!validate()) return; 
    try {
      const updateObject = {
        agencyName: formData.agencyName,
        AgencyName: formData.agencyName,
        ownerName: formData.ownerName,
        gstin: formData.gstin,
        address: formData.address,
        district: formData.district,
        city: formData.city,
        state: formData.state,
        contactPerson: formData.contactPerson,
        phone: formData.phone,
        email: formData.email,
        validityFrom: formData.validityFrom,
        validityTo: formData.validityTo,
        isActive: formData.isActive,
        serviceIds: formData.serviceIds,
        createdByUserId: userId,
        createdByUserName: user_name,
        createdByUserTypeCd: userTypeCd,
        createdByUserTypeName: userTypeCd,
        createdIpAddress: "103.49.78.89",
      };
      const result = await adminServices.createAgency(updateObject);
      console.log("Agency Created:", result);
      dispatch(showNotification({ message: "Saved successfully!", severity: "success" }));
      router.push("/admin/agency");
    } catch (err) {
      dispatch(
        showNotification({
          message: error.response?.data?.message || "Save failed!",
          severity: "error",
        })
      );
      console.log("Error:", err.message);
    }
  };

  const validate = () => {
    const newErrors = {};
  
    if (!formData.agencyName?.trim())    newErrors.agencyName    = "Agency name is required.";
    if (!formData.ownerName?.trim())     newErrors.ownerName     = "Owner name is required.";
    if (!formData.gstin?.trim()) {
      newErrors.gstin = "GSTIN is required.";
    } else if (!gstField.pattern.value.test(formData.gstin)) {
      newErrors.gstin = gstField.pattern.message;
    }
    if (!formData.address?.trim())       newErrors.address       = "Address is required.";
    if (!formData.state)                 newErrors.state         = "State is required.";
    if (!formData.city?.trim())          newErrors.city          = "City is required.";
    if (!formData.district)              newErrors.district      = "District is required.";
    if (!formData.contactPerson?.trim()) newErrors.contactPerson = "Contact person is required.";
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!formData.email?.trim()) {
      newErrors.email = emailErrors.required;
    } else if (!emailRules.pattern.test(formData.email)) {
      newErrors.email = emailErrors.pattern;
    }
    if (!formData.validityFrom)          newErrors.validityFrom  = "Start date is required.";
    if (!formData.validityTo)            newErrors.validityTo    = "End date is required.";
    if (formData.validityFrom && formData.validityTo && formData.validityTo < formData.validityFrom) {
      newErrors.validityTo = "End date must be after start date.";
    }
    if (!formData.serviceIds?.length)    newErrors.serviceIds    = "Select at least one service.";
  
    setErrors(newErrors);
  
    const firstKey = Object.keys(newErrors)[0];
    if (firstKey) {
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await commonServices.getStates();
        console.log(response.data?.result)
        setStates(response.data?.result || []);
      } catch (error) {
        console.error("Failed to fetch states", error);
      }
    }
    async function fetchDistrict() {
      try {
        const response = await commonServices.getDistrict();
        setDistricts(response.data?.result || []);
      } catch (error) {
        console.error("Failed to fetch districts", error);
      }
    }
    fetchStates();
    fetchDistrict();
  }, []);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await clientServices.getAdvtCategory();
        setServices(res.data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }
    fetchCategory();
  }, []);

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
                  <path d="M3 21V7l9-4 9 4v14" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 21v-6h6v6" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: "#111827", letterSpacing: "-0.5px" }}>
                Create Agency
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#9ca3af", ml: "60px" }}>
              Register a new agency with service configuration
            </Typography>
          </Box>

          <Chip
            label="New Record"
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

        {/* ── Section 1: Agency Info ── */}
        <SectionCard icon={<IconAgency />} title="Agency Information" subtitle="Basic agency identity and tax details" accent="#010a2a">
          <Grid container spacing={2.5}>
            <Grid item size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth label="Agency Name" name="agencyName" value={formData.agencyName} onChange={handleChange} rror={!!errors.agencyName} helperText={errors.agencyName} sx={field} />
            </Grid>
            <Grid item size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth label="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleChange} sx={field} error={!!errors.ownerName} helperText={errors.ownerName} />
            </Grid>
            <Grid item size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth label="GSTIN" name="gstin" value={formData.gstin} error={!!errors.gstin}
                helperText={errors.gstin || "e.g. 22AAAAA0000A1Z5"} onChange={handleChange} sx={field} />
            </Grid>
          </Grid>
        </SectionCard>

        {/* ── Section 2: Location ── */}
        <SectionCard icon={<IconLocation />} title="Location" subtitle="Office address and geographic details" accent="#f59e0b">
          <Grid container spacing={2.5}>
            <Grid item size={{ xs: 12, }}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
                sx={field}
                error={!!errors.address} helperText={errors.address}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state} helperText={errors.state}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                }}
                sx={field}
              >
                {states.map((s) => (
                  <MenuItem key={s.stateCode} value={s.stateCode}>
                    {s.stateName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange}  error={!!errors.city} helperText={errors.city} sx={field}  error={!!errors.district} helperText={errors.district}/>
            </Grid>
            <Grid item size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                label="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
                error={!!errors.district} helperText={errors.district}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                }}
                sx={field}
              >
                {districts.map((s) => (
                  <MenuItem key={s.dstrictid} value={s.dstrictid}>
                    {s.districtname}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </SectionCard>

        {/* ── Section 3: Contact ── */}
        <SectionCard icon={<IconContact />} title="Contact Details" subtitle="Person to reach and communication info" accent="#10b981">
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange}   error={!!errors.contactPerson} helperText={errors.contactPerson}  sx={field} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} sx={field} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={field}
                error={!!errors.email}           // 👈 turns red if error
                helperText={errors.email}        // 👈 shows error message below
              />
            </Grid>
          </Grid>
        </SectionCard>

        {/* ── Section 4: Validity ── */}
        <SectionCard icon={<IconCalendar />} title="Validity Period" subtitle="Agency contract start and end dates" accent="#ef4444">
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Validity From"
                type="date"
                name="validityFrom"
                value={formData.validityFrom}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.validityFrom} helperText={errors.validityFrom} 
                sx={field}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Validity To"
                type="date"
                name="validityTo"
                value={formData.validityTo}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.validityTo} helperText={errors.validityTo}
                sx={field}
              />
            </Grid>
          </Grid>
        </SectionCard>

        {/* ── Section 5: Services & Status ── */}
        <SectionCard icon={<IconService />} title="Services & Status" subtitle="Assign services and set agency status" accent="#8b5cf6">
          <Grid container spacing={2.5}>
            <Grid item size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth sx={field}>
                <InputLabel sx={{ color: "#9ca3af", fontSize: "0.875rem" }}>Services</InputLabel>
                <Select
                  multiple
                  value={formData.serviceIds}
                  onChange={handleServiceChange}
                  input={<OutlinedInput label="Services" />}
                  MenuProps={MenuProps}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((id) => {
                        const svc = services.find((s) => s.serviceId === id);
                        return (
                          <Chip
                            key={id}
                            label={svc?.serviceName || id}
                            size="small"
                            sx={{
                              borderRadius: "7px",
                              backgroundColor: "#ede9fe",
                              color: "#6d28d9",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              height: 22,
                              border: "1px solid #c4b5fd",
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {services.map((s) => (
                    <MenuItem key={s.catId} value={s.catId}>
                      <Checkbox
                        checked={formData.serviceIds.includes(s.catId)}
                        size="small"
                        sx={{ color: "#8b5cf6", "&.Mui-checked": { color: "#8b5cf6" }, mr: 0.5 }}
                      />
                      <ListItemText
                        primary={s.catText}
                        primaryTypographyProps={{ fontSize: "0.875rem" }}
                      />
                      
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item size={{xs:12, sm:4}} display="flex" alignItems="center">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2.5,
                  py: 1.5,
                  borderRadius: "12px",
                  border: "1.5px solid",
                  borderColor: formData.isActive ? "#bbf7d0" : "#e4e6ef",
                  backgroundColor: formData.isActive ? "#f0fdf4" : "#f8f9fb",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: "100%",
                }}
                onClick={() => setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))}
              >
                <Checkbox
                  checked={formData.isActive}
                  name="isActive"
                  onChange={handleChange}
                  size="small"
                  sx={{
                    p: 0,
                    color: "#d1d5db",
                    "&.Mui-checked": { color: "#10b981" },
                  }}
                />
                <Box>
                  <Typography variant="body2" fontWeight={700} sx={{ color: formData.isActive ? "#15803d" : "#6b7280", lineHeight: 1.2 }}>
                    {formData.isActive ? "Active Agency" : "Inactive Agency"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                    {formData.isActive ? "Agency is operational" : "Agency is disabled"}
                  </Typography>
                </Box>
              </Box>
            </Grid>  */}
          </Grid>
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
              variant="contained"
              size="medium"
              onClick={handleAddAgency}
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
              Save Agency
            </Button>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default AgencyForm;