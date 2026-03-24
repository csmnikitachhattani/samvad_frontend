"use client";

import { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import adminServices from "@/services/adminServices";
import { useParams } from "next/navigation";
import commonServices from "@/services/commonServices";
import clientServices from "@/services/clientServices";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Divider,
  InputAdornment,
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
  const params = useParams();
  const avakId = params?.id;
  const [services, setServices] = useState([]);
  const [departments, setDepartments] = useState([])
  const [districts, setDistricts] = useState([])
  const [levels, setLevels] = useState([])
  const [offices, setOffices] = useState([])
  const [sections, setSections] = useState([])
  const [officers, setOfficers] = useState([])
  const [avakFiles, setAvakFiles] = useState([]);
  const durationOptions = [
    { value: "1week", label: "1 Week" },
    { value: "2week", label: "2 Weeks" },
    { value: "3week", label: "3 Weeks" },
    { value: "1month", label: "1 Month" },
    { value: "2month", label: "2 Months" },
  ];
  const [data, setData] = useState({
    job_id: "",
    financial_year: "",
    Avak_category: "",
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
    letter_no: "",
    client_name: "",
    office_address: "",
    billing_client_cd: "",
    billing_base_dept_code:"",
    billing_office_code: "",
    billing_district_code:'',
    billing_section_code:"",
    billing_client_name: "",
    billing_address: "",
    office_code: "",
    base_dept_code: "",
    district_code: "",
    remarks: "",
    base_dept_code: '',
    office_level_code: '',
    office_code: '',
    section: '',
    ip_address: "",
    client: "",
    entry_user_name: "nikita",
    files: null,
    Avak_category: '',
  });


useEffect(() => {
  console.log(avak)
  if (!avak) return;
console.log("here console images")
  const fetchAvakFiles = async () => {
    try {
      const res = await axiosClient.get(
        `http://103.79.34.50:8083/api/Client/getavakfiles`,
        {
          params: {
            financial_year: "2024-2025" ,
            avak_ref_id: avak,
          },
        }
      );

      setAvakFiles(res.data || []);
    } catch (error) {
      console.error("File fetch error", error);
    }
  };

  fetchAvakFiles();
}, [avakId, data.financial_year]);
  useEffect(() => {
  if(data.Avak_category){
    async function fetchServices() {
      try {
        const response = await adminServices.getServices(data.Avak_category);
        setServices(response?.result || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    }
    fetchServices();
  }
  }, [data.Avak_category]);
  const { avak } = useParams();
  useEffect(() => {
    async function fetchAvakDetails() {
      try {
        const res = await clientServices.getAvakDetail({avak_ref_id:avak, fin_year:'2024-2025'});
        setData((prev) => ({
            ...prev,
            ...res,
            financial_year: '2024-2025',
            subject: res.data.subject,
            avak_ref_id: avak,
            client_ref_id: res.data.client_ref_id,
            client : res.data.client_cd,
            billing_base_dept_code:res.data.base_dept_code,
            billing_office_code: res.data.office_code,
            billing_district_code:res.data.district_code,
            billing_office_level_code : res.data.office_level_code,
            billing_section_code:res.data.section,
            billing_client_cd : res.data.client_cd

          }));
        setData((prev) => ({ ...prev, ...res.data }));
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    }
    fetchAvakDetails();
    fetchDepartment();
    fetchDistricts();
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
  async function fetchDepartment() {
    try {
      const res = await clientServices.getalldepartment();
      setDepartments(res.result)
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }
  async function fetchOfficeLevel(deptCode) {
    try {
      const res = await clientServices.getOfficeLevels({deptCode});
      setLevels(res.result)
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }
  async function fetchDistricts() {
    try {
      const res = await commonServices.getDistrict();
      setDistricts(res.data.result);
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }
  async function fetchOffice(deptCode, distCode) {
    try {
      const res = await clientServices.getOfficeNames({deptCode, distCode});
      console.log(res)
      setOffices(res.result);
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }
  async function fetchSections(deptCode, distCode) {
    try {
      const res = await clientServices.getClientSection({deptCode, distCode});
      console.log(res)
      setSections(res.result);
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }
  async function fetchOfficers(deptCode, distCode) {
    try {
      const res = await clientServices.getOfficers({deptCode, distCode});
      console.log(res)
      setOfficers(res.result);
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }
  async function fetchClient(client) {
    try {
      const res = await clientServices.getClientData(client);
      console.log("console", res.data)
      setData((prev) => ({
        ...prev,
        base_dept_code: res.data.data?.base_dept_code,
        district: res.data.data?.district_code,
        office_level_code: res.data.data?.OfficeLevel,
        office: res.data.data?.Office_code,
        section: res.data.data?.section_code,
        officer: res.data.data?.employee_code,
      }));
    fetchDistricts();
    } catch (error) {
      console.error("Failed to fetch work orders", error);
    } finally {
      //setLoading(false);
    }
  }
  useEffect(() => {
    if(data.client !== ""){
      //fetchClient(data.client)
    }
  },[data.client])
  useEffect(() => {
    console.log("gtyugyugyug",data.base_dept_code,data.district_code)
    if(data.base_dept_code&&data.district_code){
    fetchOfficeLevel(data.base_dept_code)
    fetchOffice(data.base_dept_code, data.district_code);
    fetchSections(data.base_dept_code, data.district_code);
    fetchOfficers(data.base_dept_code, data.district_code);
    }
  },[data.base_dept_code, data.district_code])
  // useEffect(() => {
  //   if(data.base_dept_code){
  //   fetchOfficeLevel(data.base_dept_code)
  //   }
  // },[data.base_dept_code,])

  const handleSubmit = async (e) => { 
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("financial_year", data.financial_year);
      payload.append("client_ref_id", data.client_ref_id);
      payload.append("avak_ref_id", data.avak_ref_id);
      payload.append("ref_no", data.letter_no);
      payload.append("od_servicetype_id", 2);
      payload.append("subject", data.subject);
      payload.append("StartDate", data.startDate);
      payload.append("EndDate", data.endDate);
      payload.append("office_address", data.office_address);
      payload.append("billing_address", data.billing_address);
      payload.append("office_level_code", data.office_level_code)
      payload.append("district_code", data.district_code)
      payload.append("remarks", data.remarks);
      payload.append("ip_address", '103.79.34.50');
      payload.append("entry_user_name", data.entry_user_name);
      payload.append('action_by_section_cd', '03')
      payload.append("entry_by_user_id", "01");
      payload.append("client_cd", data.client_cd);
      payload.append("base_dept_code", data.base_dept_code);
      payload.append("district_code", data.district_code);
      payload.append("office_level_code", data.office_level_code);
      payload.append("office_code", data.office_code);
      payload.append("section", 0);
      payload.append("Billing_client_name", data.billing_client_name ||data.client_name);
      payload.append("Billing_client_cd", data.billing_client_cd ||data.client_cd);
      payload.append("Billing_address", data.billing_address);
      payload.append("Billing_base_dept_code", data.billing_base_dept_code);
      payload.append("Billing_district_code", data.billing_district_code);
      payload.append("Billing_office_level_code", data.billing_office_level_code);
      payload.append("Billing_office_code", data.billing_office_code);
      payload.append("Billing_section_code", 0);
      payload.append("Billing_officer", data.billing_client_cd);
      payload.append("owner_user_type_cd", '01');
      //payload.append("user_type_cd", '0100');
  


      if (data.files) {
        payload.append("files", data.files);
      }

      for (let pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axiosClient.post(
        "/outDoorMediaTransaction/save-lv-counter",
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

  function SectionCard({ title, subtitle, children, accent = "#010a2a" }) {
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
  <Grid container spacing={2.5} alignItems="center">
    
    {/* Financial Year */}
    <Grid item size={{ xs: 12, md: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
        <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 500, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Financial Year
        </Typography>
        <Typography variant="body2" sx={{ color: "#111827", fontWeight: 600, fontSize: "0.92rem" }}>
          {data.financial_year || "—"}
        </Typography>
      </Box>
    </Grid>

    {/* Client Ref ID */}
    <Grid item size={{ xs: 12, md: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
        <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 500, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Client Ref ID
        </Typography>
        <Typography variant="body2" sx={{ color: "#111827", fontWeight: 600, fontSize: "0.92rem" }}>
          {data.client_ref_id || "—"}
        </Typography>
      </Box>
    </Grid>

    {/* AVAK Ref ID */}
    <Grid item size={{ xs: 12, md: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
        <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 500, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          AVAK Ref ID
        </Typography>
        <Typography variant="body2" sx={{ color: "#111827", fontWeight: 600, fontSize: "0.92rem" }}>
          {data.avak_ref_id || "—"}
        </Typography>
      </Box>
    </Grid>

    {/* Ref No */}
    <Grid item size={{ xs: 12, md: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
        <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 500, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Ref No
        </Typography>
        <Typography variant="body2" sx={{ color: "#111827", fontWeight: 600, fontSize: "0.92rem" }}>
          {data.ref_no || "—"}
        </Typography>
      </Box>
    </Grid>

    {/* Service Type — still interactive */}
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
           {/* ── Section 3: Location & Office ── */}
           <SectionCard  title="Client Location" subtitle="" accent="#10b981">
            <Grid container spacing={2.5}>
              {/* <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Client"
                  name="client"
                  value={data.client}
                  onChange={handleChange}
                  sx={field}
                />
              </Grid> */}
              <Grid item size={{xs:12}}>
                <TextField

                  fullWidth
                  select
                  label="Base Department"
                  name="base_dept_code"
                  value={data.base_dept_code}
                  onChange={handleChange}
                  sx={field}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.deptid} value={dept.deptid}>
                      {dept.deptname}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, }}>
                <TextField
                 select
                  fullWidth
                  label="District"
                  name="district_code"
                  value={data.district_code}
                  onChange={handleChange}
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
                  label="Office Level"
                  name="office_level_code"
                  value={data.office_level_code}
                  onChange={handleChange}
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
                  label="Office"
                  name="office_code"
                  value={data.office_code}
                  onChange={handleChange}
                  sx={field}
                >
                    {offices.map((office) => (
                    <MenuItem key={office.newOfficeCode} value={office.newOfficeCode}>
                      {office.officeName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Section"
                  name="section"
                  value={data.section}
                  onChange={handleChange}
                  sx={field}
                > {sections.map((section) => (
                  <MenuItem key={section} >
                    {section}
                  </MenuItem>
                ))}

                  </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Officer"
                  name="client_cd"
                  value={data.client_cd}
                  onChange={handleChange}
                  sx={field}
                >
                    {officers.map((officer) => (
                    <MenuItem key={officer.employeeId} value={officer.employeeId}>
                      {officer.employeeName}
                    </MenuItem>
                  ))}
                  </TextField>
              </Grid>
            </Grid>
          </SectionCard>

            {/* ── Section 3: Location & Office ── */}
            <SectionCard  title="Billing Location" subtitle="" accent="#10b981">
            <Grid container spacing={2.5}>
            
              <Grid item size={{xs:12}}>
                <TextField

                  fullWidth
                  select
                  label="Base Department"
                  name="billing_base_dept_code"
                  value={data.billing_base_dept_code}
                  onChange={handleChange}
                  sx={field}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.deptid} value={dept.deptid}>
                      {dept.deptname}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, }}>
                <TextField
                 select
                  fullWidth
                  label="District"
                  name="district_code"
                  value={data.district_code}
                  onChange={handleChange}
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
                  label="Office Level"
                  name="billing_office_level_code"
                  value={data.billing_office_level_code}
                  onChange={handleChange}
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
                  label="Billing Office"
                  name="billing_office_code"
                  value={data.billing_office_code}
                  onChange={handleChange}
                  sx={field}
                >
                    {offices.map((office) => (
                    <MenuItem key={office.newOfficeCode} value={office.newOfficeCode}>
                      {office.officeName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Billing Section"
                  name="Billing CSection ode"
                  value={data.billing_section_code}
                  onChange={handleChange}
                  sx={field}
                > {sections.map((section) => (
                  <MenuItem key={section} >
                    {section}
                  </MenuItem>
                ))}

                  </TextField>
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Officer"
                  name="billing_client_name"
                  value={data.billing_client_cd}
                  onChange={handleChange}
                  sx={field}
                >
                    {officers.map((officer) => (
                    <MenuItem key={officer.employeeId} value={officer.employeeId}>
                      {officer.employeeName}
                    </MenuItem>
                  ))}
                  </TextField>
              </Grid>
            </Grid>
          </SectionCard>
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
          <Box>
          <Grid item xs={12} md={6}>
    <Box>
      <Typography fontWeight={600} mb={1}>
        Avak Files
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap" sx={{margin: '10px'}}>
        {avakFiles.length === 0 && (
          <Typography variant="caption">No files</Typography>
        )}

        {avakFiles.map((file) => {
          const isImage = file.content_type?.includes("image");
          const isPDF = file.content_type?.includes("pdf");

          const fileUrl = `http://103.79.34.50:8083/${file.file_path}`;

          return (
            <Box
              key={file.id}
              onClick={() => handleOpenFile(file)}
              sx={{
                width: 100,
                height: 100,
                border: "1px solid #ddd",
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                "&:hover": { boxShadow: 3 },
              }}
            >
              {isImage ? (
                <img
                  src={fileUrl}
                  alt="file"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : isPDF ? (
                <Typography variant="caption">PDF</Typography>
              ) : (
                <Typography variant="caption">FILE</Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  </Grid>
          </Box>
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