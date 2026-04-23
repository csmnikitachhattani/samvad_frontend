"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import adminServices from "@/services/adminServices";
import outdoorServices from "@/services/outdoorServices";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";
import Chip from '@mui/material/Chip';
import { getDuration } from "@/utils/dateUtils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableData,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  ListItemText,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

// ─── Shared sx helpers ────────────────────────────────────────────────────────
const grayField = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#f4f5f7",
    height: "40px",
    "& fieldset": { borderColor: "#e2e4ea" },
    "&:hover fieldset": { borderColor: "#010a2a" },
    "&.Mui-focused fieldset": { borderColor: "#010a2a" },
  },
  "& .MuiInputLabel-root": { color: "#8a90a0" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#5c7cfa" },
  "& .MuiInputBase-input": { color: "#2d3142" },
};

const smallGrayField = {
  ...grayField,
  "& .MuiOutlinedInput-root": {
    ...grayField["& .MuiOutlinedInput-root"],
    borderRadius: "8px",
  },
};

export default function WorkOrderForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [vendors, setVendors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([])
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [workTypes, setWorkTypes] = useState([]);
  const [rateDurations, setRateDurations] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [selectedWork, setSelectedWork] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [rateList, setRateList] = useState([]);
  const [rateType, setRateType] = useState('');
  const [hoardingRates, setHoardingRates] = useState([]);
  const [formData, setFormData] = useState({
    main_id: 0,
    financial_year: "",
    avak_ref_id: "",
    job_id: "",
    subject: "",
    dpr_job_ref_no: "",
    //wo_date: "",
    category: '',
    tender: '',
    work_type: '',
    rate_duration_id: '',
    work_list_id: '',
    rate_id: '',
    vendor_id: [],
    vendor_name: [],
    client_cd: "",
    billing_Client_cd: "",
    billing_office_code: "",
    client_grp_cd: "",
    od_servicetype_id: 0,
    start_date: "",
    end_date: "",
    commision_Percentage: 0,
    commission_amount: 0,
    amount_with_commission: 0,
    gst_percentage: "",
    gst_amount: 0,
    toatl_amount: 0,
    entry_ip_address: "",
    entry_by_user_id: "",
    entry_by_username: "",
    billing_Client_cd: "",
    durationId: "",
    duration_id: "",
    multiply_value: "",
    detailList: [
      {
        display_board_id: 0,
        description: "",
        rate: 0,
        media_unit_count: 0,
        no_of_spot: 0,
        total_rate: 0,
        start_date: "",
        end_date: "",
      },
    ],
  });
  const formatDateForInput = (date) => {
    if (!date) return "";

    const d = new Date(date);
    if (isNaN(d)) return "";

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // ✅ correct local date
  };
  const SubmitVehicles = async (res) => {
    console.log(formData.end_date)
    if (!Array.isArray(res)) return [];
    return res.map((agency) => ({
      vendorId: agency.agencyId?.toString() || "",
      vendorName: agency.agency_name || "Vehicle-Agency",
      vendorCateId: agency.vendorCateId,
      vendorCate: "outdoor media",
      ledVehicleId: agency.vehicleId,
      VehicleNo: agency.vehicleNo,
      description: "",
      rate: agency.impanel_rate,
      noOfVehicle: agency.noOfVehicle || 1,
      noOfProgramme: 4,
      totalRate: agency.total_impanel_rate,
      startDate: formData.start_date,
      endDate: formData.end_date,
      duration_text: agency.duration_text,
      selected: false,
      available_status: agency.available_status
    }));

  };
  async function fetchVehicle() {
    try {
      const response = await outdoorServices.getAgencyVehicle(formData.vendor_id);
      //const arr = transformAgencyToDetails(response.result, formData.start_date, formData.end_date);
      //setVehicles(arr);
    } catch (error) {
      console.error("Failed to fetch vehicles", error);
    }
  }

  useEffect(() => {
    if (formData.vendor_id.length > 0) fetchVehicle();
  }, [formData.vendor_id]);

  useEffect(() => {
    async function fetchCounters() {
      try {
        const response = await adminServices.getcounterDetail(id);
        setFormData((prev) => ({
          ...prev,
          main_id: response.main_id ?? 0,
          financial_year: response.financial_year ?? "",
          avak_ref_id: response.avak_ref_id ?? "",
          job_id: response.job_id ?? "",
          subject: response.subject ?? "",
          ref_no: response.ref_no ?? "",
          od_servicetype_id: '08',
          receipt_date: response.receipt_date ?? "",
          vendor_id: response.vendor_id ?? [],
          vendor_name: response.vendor_name ?? [],
          client_cd: response.client_cd ?? "",
          billing_Client_cd: response.billing_client_cd ?? "",
          billing_office_code: response.billing_office_code ?? "",
          client_grp_cd: response.client_grp_cd ?? "",
          start_date: response.startDate ?? "",
          end_date: response.endDate ?? "",
          commision_Percentage: 5,
          //commission_amount: response.commission_amount,
          //amount_with_commission: response.amount_with_commission ,
          gst_percentage: 9,
          //gst_amount: response.gst_amount ,
          total_amount: response.total_amount,
          startDate: response.startDate,
          endDate: response.endDate,
          detailList:
            response.detailList?.length > 0 ? response.detailList : prev.detailList,
        }));
        fetchServiceTypes(response.od_servicetype_id);
      } catch (error) {
        console.error("Failed to fetch counters", error);
      }
    }

    async function fetchServiceTypes(serviceTypeId) {
      try {
        const response = await adminServices.getVendorList(serviceTypeId);
        setVendors(response.result);
      } catch (error) {
        console.error("Failed to fetch vendors", error);
      }
    }

    fetchCounters();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
  };
  async function fetchCategories() {
    const payload = {
      "tender_cate_cd": "29",
      "param": "search",
      "search_param": "category_id"
    }
    try {
      const response = await adminServices.getOdmRateCategory(payload);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }
  async function fetchTenders() {
    const payload = {
      "tender_cate_cd": formData.category,
      "param": "search",
      "search_param": "tender_id",
      "flag": "1",
      "status": "W"
    }
    try {
      const response = await adminServices.getOdmRateTender(payload);
      setTenders(response.data.data);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }
  async function fetchWorkTypes() {
    const payload = {
      "tender_cate_cd": "29",
      "tender_type_id": "02",
      "tender_id": formData.tender,
      "param": "search",
      "search_param": "work_type_id"
    }
    try {
      const response = await adminServices.getOdmRateWorkTypes(payload);
      setWorkTypes(response.data.data);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }
  async function fetchRateDurations() {
    const payload = {
      "tender_cate_cd": "29",
      "tender_type_id": "02",
      "tender_id": formData.tender,
      "work_type_id": formData.work_type,
      "param": "search",
      "search_param": "rate_duration"
    }
    try {
      const response = await adminServices.getOdmRateDuration(payload);
      setRateDurations(response.data.data);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }
  async function fetchWorkList() {
    const payload = {
      "tender_cate_cd": "29",
      "tender_id": "T202429001",
      "work_type_id": "239",
      "param": "get"
    }
    try {
      const response = await adminServices.getOdmRateWorkList(payload);
      setWorkList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }
  async function fetchRateDur() {
    const payload = {
      type: rateType
    }
    try {
      const response = await adminServices.getLEDvehicleRate(payload);
      setHoardingRates(response.data.data);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }
  function formatDateSimple(dateString) {
    const date = new Date(dateString);

    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate()
    );
  }
  async function fetchAllocation() {
    const payload = {
      durationType: rateType,
      durationId: formData.duration_id,
      agencyID: formData.vendor_id.toString(),
      work_cd: formData.work_list_id || selectedWork,
      fromDate: formatDateSimple(formData.start_date),
      toDate: formatDateSimple(formData.end_date)
    }
    try {
      const response = await adminServices.getAllocationList(payload);
      //setHoardingRates(response.data.data);
      console.log(formData.start_date, formData.multiply_value)
      const date = calculateEndDate(formData?.start_date, formData.multiply_value)
      await setFormData((prev) => ({
        ...prev,
        end_date: date
      }))
      const res = await SubmitVehicles(response.data.data)

      setSelectedVehicles(res);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }

  const [financialYear, setFinancialYear] = useState("");
  const [userId, setUserId] = useState("");
  const [user_name, setUserName] = useState("");
  const [userTypeCd, setUserTypeCd] = useState("");
  const [ipAddress, setIpAddress] = useState("");

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

  const trimValue = (val) => val.split('/')[0];
  async function fetchRateList() {
    const payload = {
      "tender_cate_id": "29",
      "work_type_cd": String("239"),
      "work_cd": formData.work_list_id || selectedWork,
      "rate_duration_id": trimValue(formData.rate_duration_id)
    }
    try {
      const response = await adminServices.getOdmRateList(payload);
      setRateList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }
  useEffect(() => {
    if (formData.category) {
      fetchTenders()
    }
  }, [formData.category])
  useEffect(() => {
    if (formData.tender) {
      fetchWorkTypes()
    }
  }, [formData.tender])
  useEffect(() => {
    if (formData.work_type) {
      fetchWorkList()
    }
  }, [formData.work_type])

  useEffect(() => {
    if (formData.rate_duration_id) {
      fetchWorkList()
    }
  }, [formData.rate_duration_id])
  useEffect(() => {
    if (rateType) {
      fetchRateDur()
    }
  }, [rateType])
  useEffect(() => {
    if (formData.duration_id) {

      fetchAllocation()

    }
  }, [formData.duration_id, selectedWork, formData.vendor_id])
  // useEffect(() => {
  //   const run = async () => {
  //     const res = await SubmitVehicles();
  //     setSelectedVehicles(res);
  //   };
  //   run();
  // }, [selectedRate]);
  useEffect(() => {
    fetchCategories()
  }, []);
  const handleDeleteSelectedVehicle = (index) => {
    setSelectedVehicles((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(vehicles.map((v) => v.VehicleId));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (vehicleId) => {
    setSelected((prev) =>
      prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...formData.detailList];
    updatedDetails[index][name] = value;
    setFormData({ ...formData, detailList: updatedDetails });
  };


  const handleVehicleChange = (vehicleId, field, value) => {
    setSelectedVehicles((prev) =>
      prev.map((row) => (row.ledVehicleId === vehicleId ? { ...row, [field]: value } : row))
    );
  };
  function calculateEndDate(startDate, duration) {
    const date = new Date(startDate) || formData.start_date;


    if (rateType === "M") {
      date.setMonth(date.getMonth() + duration);
    } else if (rateType === "D") {
      date.setDate(date.getDate() + duration);
    }

    // subtract 1 day
    date.setDate(date.getDate() - 1);

    return date;
  }




  const handleSubmit = async () => {
    const total = selectedVehicles
      .filter((item) => item.selected === true)
      .reduce((sum, item) => sum + Number(item.totalRate || 0), 0);
    const commission = 5;
    const sgst = 9;
    const cgst = 9;
    const payload = {
      financialYear: formData.financial_year,
      avakRefId: formData.avak_ref_id,
      jobNo: formData.job_id,
      dprJobRefNo: formData.ref_no,
      woDate: formData.startDate,
      woSubject: formData.subject,
      clientCd: formData.client_cd,
      billingClientCd: formData.billing_Client_cd,
      billingOfficeCode: formData.billing_office_code,
      clientGrpCd: formData.client_grp_cd || "0",
      odServicetypeId: '08',
      woDate: new Date(formData.start_date).toISOString(),
      startDate: new Date(formData.start_date).toISOString(),
      endDate: new Date(formData.end_date).toISOString(),
      commisionPercentage: String(commission),
      cgst_percentage: String(cgst),
      sgst_percentage: String(sgst),
      entryIpAddress: "103.67.78.89",
      entryByUserId: userId,
      entryByUsername: user_name,
      //details: selectedVehicles,
      details: selectedVehicles.filter((item) => item.selected === true),
      duration: String(getDuration(formatDateForInput(formData.start_date), formatDateForInput(formData.end_date))),
    };

    axiosClient
      .post(
        "/OutDoorMediaTransaction/odm-lv-allocation-save",
        payload
      )
      .then((response) => {
        console.log("SUCCESS:", response.data);
        dispatch(showNotification({ message: "Saved successfully!", severity: "success" }));
        router.push("/admin/counter");
      })
      .catch((error) => {
        console.error("ERROR:", error.response?.data || error.message);
        dispatch(
          showNotification({
            message: error?.data || "Save failed!",
            severity: "error",
          })
        );
      });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: "16px",
        backgroundColor: "#f7f8fc",
        border: "1px solid #e8eaf0",
        minHeight: "100vh",
      }}
    >
      {/* ── Page Header ── */}
      <Box mb={4} sx={{ borderBottom: "1px solid #e8eaf0", pb: 3 }}>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: "14px 20px",
            borderRadius: "14px",
            border: "1px solid #e8eaf0",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Icon */}
          <Box sx={{
            width: 48, height: 48, borderRadius: "12px", background: "#010a2a",
            flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Title + subtitle row */}
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, flexWrap: "wrap" }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#1a1f36", whiteSpace: "nowrap" }}>
                Mounted Vehicle LED Allocation
        </Typography>
              <Typography variant="caption" sx={{ color: "#8a90a0" }}>
                Assign vehicles to work orders
        </Typography>
              <Typography variant="caption" sx={{
                color: "#8a90a0", fontSize: "11px", display: "flex", justifyContent: "flex-end", gap: 0.75,
                backgroundColor: "#f4f5f7",
                border: "1px solid #e2e4ea",
                borderRadius: "8px",
                px: 1.25, py: "3px",
              }}>
                {formData.financial_year}
              </Typography>
            </Box>

            {/* Meta chips row */}
            <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[

                // { label: "FY", value: formData.financial_year },
                { label: "Job", value: formData.job_id },
                { label: "AVAK", value: formData.avak_ref_id },
                { label: "Subject", value: formData.subject },

              ].map(({ label, value }) => (
                <Box
                  key={label}
                  sx={{
                    display: "inline-flex", alignItems: "center", gap: 0.75,
                    backgroundColor: "#f4f5f7",
                    border: "1px solid #e2e4ea",
                    borderRadius: "8px",
                    px: 1.25, py: "3px",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#8a90a0", fontSize: "11px" }}>
                    {label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#1a1f36", fontWeight: 600, fontSize: "11px" }}>
                    {value || "—"}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
      {/* ── Work Order Details Card ── */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: "14px", backgroundColor: "#ffffff", border: "1px solid #e8eaf0" }}>
        <Box display="flex" alignItems="center" gap={1} mb={2.5}>
          <Box sx={{ width: 6, height: 20, borderRadius: "3px", background: "#010a2a" }} />
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#1a1f36" }}>
            Work Order Details
    </Typography>
        </Box>

        <Grid container spacing={2}>

          {/* ── Left: Form Fields ── */}
          <Grid item size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

              <TextField fullWidth select label="Category" name="category"
                value={formData.category} onChange={handleChange} sx={grayField}>
                {categories.map((item) => (
                  <MenuItem key={item.tender_cate_id} value={item.tender_cate_id}>
                    {item.tender_cate_text}
                  </MenuItem>
                ))}
              </TextField>

              <TextField fullWidth select label="Tender" name="tender"
                value={formData.tender} onChange={handleChange} sx={grayField}>
                {tenders.map((item) => (
                  <MenuItem key={item.Tender_Id} value={item.Tender_Id}>
                    {item.Tender_Id}
                  </MenuItem>
                ))}
              </TextField>

              <TextField fullWidth select label="Work Type" name="work_type"
                value={formData.work_type} onChange={handleChange} sx={grayField}>
                {workTypes.map((item) => (
                  <MenuItem key={item.work_type_cd} value={item.work_type_cd}>
                    {item.work_type_text}
                  </MenuItem>
                ))}
              </TextField>

              {/* <TextField fullWidth select label="Rate Duration" name="rate_duration_id"
                value={formData.rate_duration_id} onChange={handleChange} sx={grayField}>
                {rateDurations.map((item) => (
                  <MenuItem key={item.rate_duration_id} value={item.rate_duration_id}>
                    {item.rate_duration}
                  </MenuItem>
                ))}
              </TextField> */}


              <RadioGroup
                row
                name="rate_duration_type"
                value={rateType}
                onChange={(e) => setRateType(e.target.value)}
                sx={{ gap: 1 }}
              >
                {[
                  { label: "Month", value: "M" },
                  { label: "Day", value: "D" },
                ].map(({ label, value }) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "#b0b5c4",
                          "&.Mui-checked": { color: "#010a2a" },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: "#2d3142", fontWeight: 500 }}>
                        {label}
                      </Typography>
                    }
                    sx={{
                      m: 0,
                      px: 1.5,
                      py: 0.75,
                      borderRadius: "10px",
                      border: "1px solid",
                      borderColor: formData.rate_duration_type === value ? "#010a2a" : "#e2e4ea",
                      backgroundColor: formData.rate_duration_type === value ? "#f0f3ff" : "#f4f5f7",
                      transition: "all 0.15s ease",
                    }}
                  />
                ))}
              </RadioGroup>
              <TextField
                fullWidth
                select
                label="Duration"
                name="duration_id"
                value={formData.duration_id}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selected = hoardingRates.find((item) => item.duration_id === selectedId);
                  setFormData({
                    ...formData,
                    duration_id: selectedId,
                    multiply_value: selected?.multiply_value ?? 1,
                  });
                }}
                sx={grayField}
              >
                {hoardingRates.map((item) => (
                  <MenuItem key={item.duration_id} value={item.duration_id}>
                    {item.duration}
                  </MenuItem>
                ))}
              </TextField>
              <Grid container spacing={1.5}>
                <Grid item size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Start Date"
                    name="start_date"
                    value={formatDateForInput(formData.start_date) || ""}
                    onChange={handleChange}
                    sx={grayField}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="End Date"
                    name="end_date"
                    value={formatDateForInput(formData.end_date) || ""}
                    onChange={handleChange}
                    sx={grayField}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth select label="Vendor"
                SelectProps={{ multiple: true }}
                value={formData.vendor_id || []}
                onChange={(e) => {
                  const selectedIds = e.target.value;
                  const selectedVendors = vendors.filter((v) => selectedIds.includes(v.AgencyID));
                  setFormData({
                    ...formData,
                    vendor_id: selectedIds,
                    vendor_name: selectedVendors.map((v) => v.AgencyName),
                  });
                }}
                sx={grayField}
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.AgencyID} value={vendor.AgencyID}>
                    <Chip label={vendor.AgencyName} />
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>

          {/* ── Right: Vehicle Table ── */}
          <Grid item size={{ xs: 12, md: 9 }}>
            <Box sx={{ border: '1px solid #e5e5e5' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>work Cd</TableCell>
                      <TableCell width="400px">Work</TableCell>
                      {/* <TableCell>Rate</TableCell> */}

                      <TableCell>Select</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {workList.map((row, index) => (
                      <TableRow key={row.Impanel_rate_id}>

                        {/* ✅ Radio */}


                        {/* ✅ Vendor Name */}
                        <TableCell>
                          <div>{index + 1}
                          </div>
                        </TableCell>

                        {/* ✅ Tender Type */}
                        <TableCell>
                          {/* <div>{row.work}</div> */}
                          <div dangerouslySetInnerHTML={{ __html: row.work }} />
                        </TableCell>

                        <TableCell>
                          <Radio
                            checked={selectedWork === row.work_cd}
                            onChange={() => {
                              setSelectedWork(row.work_cd) // 🔥 important for vehicle logic
                            }}
                          />
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

        </Grid>
      </Paper>
      <Paper
        sx={{
          p: 3,
          my: 4,
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          border: "1px solid #e8eaf0",
        }}
      >
        <Box>
          <TableContainer sx={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #eaecf2" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f4f5f7" }}>
                  {["Vehicle", "VehicleNo", "Agency", 'duration', "Rate", "Total", "Start", "End", "Action"].map(
                    (col, i) => (
                      <TableCell
                        key={i}
                        padding={col === "" ? "checkbox" : "normal"}
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          color: "#5a6072",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          borderBottom: "1px solid #e2e4ea",
                          py: 1.5,
                        }}
                      >
                        {col === "" ? <Checkbox onChange={handleSelectAll} size="small" sx={{ color: "#b0b5c4" }} /> : col}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              {/* <TableBody>
                {selectedVehicles.map((row, index) => (
                  <TableRow
                    key={row.ledVehicleId}
                    hover
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafbff",
                      "&:hover": { backgroundColor: "#f0f3ff" },
                      transition: "background-color 0.15s ease",
                    }}
                  >
                    <TableCell sx={{ color: "#2d3142", fontSize: "0.85rem" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ color: "#2d3142", fontSize: "0.85rem" }}>
                      {row.VehicleNo}
                    </TableCell>
                    <TableCell sx={{ color: "#2d3142", fontSize: "0.85rem" }}>
                      {row.vendorName}
                    </TableCell>
                    <TableCell sx={{ color: "#2d3142", fontSize: "0.85rem" }}>
                      {row.duration_text}
                    </TableCell>

                    <TableCell>
                      {row.rate}
                    </TableCell>

                    <TableCell>
                      {row.totalRate}
                    </TableCell>

                    <TableCell>
                      {formatDateForInput(row.startDate) || ""}
                    </TableCell>

                    <TableCell>
                      {formatDateForInput(row.endDate) || ""}
                    </TableCell>

                    <TableCell>
                     
                      <Checkbox
                        size="small"
                        checked={row.selected}
                        onChange={(e) =>
                          handleVehicleChange(row.ledVehicleId, "selected", e.target.checked)
                        }
                        sx={{
                          color: "#b0b5c4",
                          "&.Mui-checked": { color: "#5c7cfa" },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}

                {selectedVehicles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4, color: "#b0b5c4" }}>
                      <Typography variant="body2">
                        No vehicles found. Select a vendor to load vehicles.
                    </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody> */}
              <TableBody>
                {selectedVehicles.map((row, index) => {
                  const isUnavailable = row.available_status === "N";

                  return (
                    <TableRow
                      key={row.ledVehicleId}
                      hover={!isUnavailable}
                      sx={{
                        backgroundColor: isUnavailable
                          ? "#2d3142"                                          // dark bg for unavailable
                          : index % 2 === 0 ? "#ffffff" : "#fafbff",
                        "&:hover": {
                          backgroundColor: isUnavailable ? "#2d3142" : "#f0f3ff",
                        },
                        transition: "background-color 0.15s ease",
                        opacity: isUnavailable ? 0.92 : 1,
                      }}
                    >
                      <TableCell sx={{ color: isUnavailable ? "#e0e3ef" : "#2d3142", fontSize: "0.85rem" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ color: isUnavailable ? "#e0e3ef" : "#2d3142", fontSize: "0.85rem" }}>
                        {row.VehicleNo}
                      </TableCell>
                      <TableCell sx={{ color: isUnavailable ? "#e0e3ef" : "#2d3142", fontSize: "0.85rem" }}>
                        {row.vendorName}
                      </TableCell>
                      <TableCell sx={{ color: isUnavailable ? "#e0e3ef" : "#2d3142", fontSize: "0.85rem" }}>
                        {row.duration_text}
                      </TableCell>
                      <TableCell sx={{ color: isUnavailable ? "#e0e3ef" : "#2d3142", fontSize: "0.85rem" }}>
                        {row.rate}
                      </TableCell>
                      <TableCell sx={{ color: isUnavailable ? "#e0e3ef" : "#2d3142", fontSize: "0.85rem" }}>
                        {row.totalRate}
                      </TableCell>
                      <TableCell sx={{ color: isUnavailable ? "#e0e3ef" : "#2d3142", fontSize: "0.85rem" }}>
                        {formatDateForInput(row.startDate) || ""}
                      </TableCell>
                      <TableCell sx={{ color: isUnavailable ? "#e0e3ef" : "#2d3142", fontSize: "0.85rem" }}>
                        {formatDateForInput(row.endDate) || ""}
                      </TableCell>
                      <TableCell>
                        {row.available_status !== 'N' ? (
                          <Checkbox
                            size="small"
                            checked={row.selected}
                            onChange={(e) =>
                              handleVehicleChange(row.ledVehicleId, "selected", e.target.checked)
                            }
                            sx={{
                              color: "#b0b5c4",
                              "&.Mui-checked": { color: "#5c7cfa" },
                            }}
                          />
                        ) : (
                            <Chip
                              label="Allocated"
                              size="small"
                              onDelete={() => { }}
                              // deleteIcon={<CloseIcon fontSize="small" />}
                              sx={{
                                backgroundColor: "#fde8e8",
                                color: "#e53e3e",
                                fontWeight: 600,
                                fontSize: "0.7rem",
                                "& .MuiChip-deleteIcon": { color: "#e53e3e" },
                              }}
                            />
                          )}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {selectedVehicles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4, color: "#b0b5c4" }}>
                      <Typography variant="body2">
                        No vehicles found. Select a vendor to load vehicles.
        </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>

      {/* ── Submit Bar ── */}
      <Box
        mt={4}
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
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{
            px: 5,
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
          Submit Allocation
        </Button>
      </Box>
    </Paper>
  );
}