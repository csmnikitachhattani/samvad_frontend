"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import adminServices from "@/services/adminServices";
import outdoorServices from "@/services/outdoorServices";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";
import Chip from "@mui/material/Chip";
import { getDuration } from "@/utils/dateUtils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TruckIcon from "@mui/icons-material/LocalShipping";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";

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
  Divider,
  Tooltip,
  Badge,
  Stack,
} from "@mui/material";

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const tokens = {
  navy: "#0a0f2c",
  navyMid: "#141a3d",
  navyLight: "#1e2654",
  amber: "#f5a623",
  amberLight: "#fdf3e0",
  teal: "#00b4a6",
  tealLight: "#e6faf9",
  red: "#e84545",
  redLight: "#fde8e8",
  gray50: "#f8f9fc",
  gray100: "#f0f2f8",
  gray200: "#e2e6f0",
  gray400: "#9aa0b8",
  gray600: "#5a6075",
  gray800: "#2d3252",
  white: "#ffffff",
};

// ─── Field Style ────────────────────────────────────────────────────────────────
const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: tokens.gray50,
    height: "42px",
    "& fieldset": { borderColor: tokens.gray200, borderWidth: "1.5px" },
    "&:hover fieldset": { borderColor: tokens.navyLight },
    "&.Mui-focused fieldset": { borderColor: tokens.navy, borderWidth: "2px" },
  },
  "& .MuiInputLabel-root": { color: tokens.gray400, fontSize: "0.82rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: tokens.navy },
  "& .MuiInputBase-input": { color: tokens.gray800, fontSize: "0.88rem", fontWeight: 500 },
  "& .MuiSelect-icon": { color: tokens.gray400 },
};

// ─── Section Header ─────────────────────────────────────────────────────────────
function SectionHeader({ icon, title, subtitle, badge }) {
  return (
    <Box display="flex" alignItems="center" gap={1.5} mb={2.5}>
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "9px",
          background: `linear-gradient(135deg, ${tokens.navy}, ${tokens.navyLight})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: `0 2px 8px rgba(10,15,44,0.18)`,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ color: tokens.navy, letterSpacing: "-0.01em", fontSize: "0.93rem" }}
          >
            {title}
          </Typography>
          {badge !== undefined && (
            <Box
              sx={{
                background: tokens.amber,
                color: tokens.navy,
                fontWeight: 700,
                fontSize: "0.68rem",
                borderRadius: "20px",
                px: 1,
                py: "1px",
                lineHeight: 1.6,
              }}
            >
              {badge}
            </Box>
          )}
        </Box>
        {subtitle && (
          <Typography variant="caption" sx={{ color: tokens.gray400, fontSize: "0.76rem" }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// ─── Meta Pill ──────────────────────────────────────────────────────────────────
function MetaPill({ label, value }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        backgroundColor: tokens.gray100,
        border: `1px solid ${tokens.gray200}`,
        borderRadius: "6px",
        px: 1.25,
        py: "4px",
      }}
    >
      <Typography sx={{ color: tokens.gray400, fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </Typography>
      <Box sx={{ width: "1px", height: "10px", background: tokens.gray200 }} />
      <Typography sx={{ color: tokens.navy, fontWeight: 700, fontSize: "10px" }}>
        {value || "—"}
      </Typography>
    </Box>
  );
}

// ─── Status Badge ────────────────────────────────────────────────────────────────
function StatusBadge({ available }) {
  if (available) return null;
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        background: tokens.redLight,
        border: `1px solid #f5c6c6`,
        color: tokens.red,
        borderRadius: "6px",
        px: 1,
        py: "3px",
        fontSize: "0.69rem",
        fontWeight: 700,
        letterSpacing: "0.02em",
      }}
    >
      <Box sx={{ width: 5, height: 5, borderRadius: "50%", background: tokens.red }} />
      ALLOCATED
    </Box>
  );
}

export default function WorkOrderForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();

  // ── State ──────────────────────────────────────────────────────────────────
  const [vendors, setVendors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const defaultPositions = () => ({
    Left:   { enabled: false, L: "", W: "" },
    Right:  { enabled: false, L: "", W: "" },
    Corner: { enabled: false, L: "", W: "" },
    Back:   { enabled: false, L: "", W: "" },
  });
  const [selectedVehicles, setSelectedVehicles] = useState([
    // { ledVehicleId: "V001", VehicleNo: "TS 09 PA 1234", vendorName: "Hyderabad Outdoor Ads", duration_text: "1 Month", rate: 18000, totalRate: 18000, startDate: "2025-06-01", endDate: "2025-06-30", available_status: "Y", selected: false, positions: defaultPositions() },
    // { ledVehicleId: "V002", VehicleNo: "TS 09 PB 5678", vendorName: "Hyderabad Outdoor Ads", duration_text: "1 Month", rate: 18000, totalRate: 18000, startDate: "2025-06-01", endDate: "2025-06-30", available_status: "N", selected: false, positions: defaultPositions() },
    // { ledVehicleId: "V003", VehicleNo: "TS 09 PC 9012", vendorName: "City Media Solutions",  duration_text: "1 Month", rate: 20000, totalRate: 20000, startDate: "2025-06-01", endDate: "2025-06-30", available_status: "Y", selected: false, positions: defaultPositions() },
    // { ledVehicleId: "V004", VehicleNo: "TS 09 PD 3456", vendorName: "City Media Solutions",  duration_text: "1 Month", rate: 20000, totalRate: 20000, startDate: "2025-06-01", endDate: "2025-06-30", available_status: "Y", selected: false, positions: defaultPositions() },
    // { ledVehicleId: "V005", VehicleNo: "TS 09 PE 7890", vendorName: "Sai Advertisers",       duration_text: "1 Month", rate: 15500, totalRate: 15500, startDate: "2025-06-01", endDate: "2025-06-30", available_status: "N", selected: false, positions: defaultPositions() },
    // { ledVehicleId: "V006", VehicleNo: "TS 09 PF 2345", vendorName: "Sai Advertisers",       duration_text: "1 Month", rate: 15500, totalRate: 15500, startDate: "2025-06-01", endDate: "2025-06-30", available_status: "Y", selected: false, positions: defaultPositions() },
    // { ledVehicleId: "V007", VehicleNo: "TS 09 PG 6789", vendorName: "Metro LED Pvt Ltd",     duration_text: "1 Month", rate: 22000, totalRate: 22000, startDate: "2025-06-01", endDate: "2025-06-30", available_status: "Y", selected: false, positions: defaultPositions() },
    // { ledVehicleId: "V008", VehicleNo: "TS 09 PH 0123", vendorName: "Metro LED Pvt Ltd",     duration_text: "1 Month", rate: 22000, totalRate: 22000, startDate: "2025-06-01", endDate: "2025-06-30", available_status: "Y", selected: false, positions: defaultPositions() },
    // { ledVehicleId: "V009", VehicleNo: "TS 09 PI 4567", vendorName: "Urban Screens Co.",     duration_text: "1 Month", rate: 17000, totalRate: 17000, startDate: "2025-06-01", endDate: "2025-06-30", available_status: "N", selected: false, positions: defaultPositions() },
    // { ledVehicleId: "V010", VehicleNo: "TS 09 PJ 8901", vendorName: "Urban Screens Co.",     duration_text: "1 Month", rate: 17000, totalRate: 17000, startDate: "2025-06-01", endDate: "2025-06-30", available_status: "Y", selected: false, positions: defaultPositions() },
  ]);
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [workTypes, setWorkTypes] = useState([]);
  const [rateDurations, setRateDurations] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [selectedWork, setSelectedWork] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [rateList, setRateList] = useState([]);
  const [rateType, setRateType] = useState("");
  const [hoardingRates, setHoardingRates] = useState([]);
  const [financialYear, setFinancialYear] = useState("");
  const [userId, setUserId] = useState("");
  const [user_name, setUserName] = useState("");
  const [userTypeCd, setUserTypeCd] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    main_id: 0,
    financial_year: "",
    avak_ref_id: "",
    job_id: "",
    subject: "",
    dpr_job_ref_no: "",
    category: "",
    tender: "",
    work_type: "",
    rate_duration_id: "",
    work_list_id: "",
    rate_id: "",
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

  // ── Helpers ────────────────────────────────────────────────────────────────
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return "";
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const formatDateSimple = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const trimValue = (val) => val.split("/")[0];

  function calculateEndDate(startDate, duration) {
    const date = new Date(startDate) || formData.start_date;
    if (rateType === "M") date.setMonth(date.getMonth() + duration);
    else if (rateType === "D") date.setDate(date.getDate() + duration);
    date.setDate(date.getDate() - 1);
    return date;
  }

  // ── API Methods ────────────────────────────────────────────────────────────
  const SubmitVehicles = async (res) => {
    if (!Array.isArray(res)) return [];
    return res.map((agency) => ({
      vendorId: agency.agencyId?.toString() || "",
      vendorName: agency.agency_name,
      vendorCateId: "08",
      vendorCate: "outdoor media",
      ledVehicleId: agency.vehicleId,
      VehicleNo: agency.vehicleNo,
      description: workList.find((x) => x.work_cd === selectedWork)?.work,
      rate: agency.impanel_rate,
      noOfVehicle: agency.noOfVehicle || 1,
      noOfProgramme: 4,
      totalRate: agency.total_impanel_rate,
      startDate: formData.start_date,
      endDate: formData.end_date,
      duration_text: agency.duration_text,
      rate_type: "M",
      selected: false,
      available_status: agency.available_status,
    }));
  };

  async function fetchVehicle() {
    try {
      await outdoorServices.getAgencyVehicle(formData.vendor_id);
    } catch (error) {
      console.error("Failed to fetch vehicles", error);
    }
  }

  async function fetchCategories() {
    try {
      const response = await adminServices.getOdmMBCategory({
        tender_cate_cd: "29",
        param: "search",
        search_param: "category_id",
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  }

  async function fetchTenders() {
    try {
      const response = await adminServices.getOdmMBTender({
        tender_cate_cd: formData.category,
        param: "search",
        search_param: "tender_id",
        flag: "1",
        status: "W",
      });
      setTenders(response.data.data);
    } catch (error) {
      console.error("Failed to fetch tenders", error);
    }
  }

  async function fetchWorkTypes() {
    try {
      const response = await adminServices.getOdmMBWorkTypes({
        tender_cate_cd: formData.category,
        tender_type_id: "02",
        tender_id: formData.tender,
        param: "search",
        search_param: "work_type_id",
      });
      setWorkTypes(response.data.data);
    } catch (error) {
      console.error("Failed to fetch work types", error);
    }
  }

  async function fetchWorkList() {
    try {
      const response = await adminServices.getOdmMBWorkList({
        tender_cate_cd: "33",
        tender_id: formData.tender,
        work_type_id: "251",
        param: "get",
      });
      setWorkList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch work list", error);
    }
  }

  async function fetchRateDur() {
    try {
      const response = await adminServices.getLEDvehicleRate({ type: rateType });
      setHoardingRates(response.data.data);
    } catch (error) {
      console.error("Failed to fetch rate durations", error);
    }
  }

  async function fetchAllocation() {
    const payload = {
      durationType: rateType,
      durationId: formData.duration_id,
      agencyID: formData.vendor_id.toString(),
      work_cd: formData.work_list_id || selectedWork,
      fromDate: formatDateSimple(formData.start_date),
      toDate: formatDateSimple(formData.end_date),
    };
    try {
      const response = await adminServices.getAllocationList(payload);
      const date = calculateEndDate(formData?.start_date, formData.multiply_value);
      await setFormData((prev) => ({ ...prev, end_date: date }));
      const res = await SubmitVehicles(response.data.data);
      setSelectedVehicles(res);
    } catch (error) {
      console.error("Failed to fetch allocation", error);
    }
  }

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (formData.vendor_id.length > 0) fetchVehicle();
  }, [formData.vendor_id]);

  useEffect(() => {
    async function fetchCounters() {
      try {
        const response = await adminServices.getBusCounterDetail(id);
        setFormData((prev) => ({
          ...prev,
          main_id: response.main_id ?? 0,
          financial_year: response.financial_year ?? "",
          avak_ref_id: response.avak_ref_id ?? "",
          job_id: response.job_id ?? "",
          subject: response.subject ?? "",
          ref_no: response.ref_no ?? "",
          od_servicetype_id: "09",
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
          gst_percentage: 9,
          total_amount: response.total_amount,
          startDate: response.startDate,
          endDate: response.endDate,
          detailList: response.detailList?.length > 0 ? response.detailList : prev.detailList,
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    setFinancialYear(localStorage.getItem("financialYear"));
    setUserId(localStorage.getItem("userid"));
    setUserName(localStorage.getItem("username"));
    setUserTypeCd(localStorage.getItem("usertypecode"));
  }, []);

  useEffect(() => { if (formData.category) fetchTenders(); }, [formData.category]);
  useEffect(() => { if (formData.tender) fetchWorkTypes(); }, [formData.tender]);
  useEffect(() => { if (formData.work_type) fetchWorkList(); }, [formData.work_type]);
  useEffect(() => { if (formData.rate_duration_id) fetchWorkList(); }, [formData.rate_duration_id]);
  useEffect(() => { if (rateType) fetchRateDur(); }, [rateType]);
  useEffect(() => { if (formData.duration_id) fetchAllocation(); }, [formData.duration_id, selectedWork, formData.vendor_id]);
  useEffect(() => { fetchCategories(); }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVehicleChange = (vehicleId, field, value) => {
    setSelectedVehicles((prev) =>
      prev.map((row) => (row.ledVehicleId === vehicleId ? { ...row, [field]: value } : row))
    );
  };

  const handlePositionChange = (vehicleId, posKey, field, value) => {
    setSelectedVehicles((prev) =>
      prev.map((row) =>
        row.ledVehicleId === vehicleId
          ? { ...row, positions: { ...row.positions, [posKey]: { ...row.positions[posKey], [field]: value } } }
          : row
      )
    );
  };

  const togglePosition = (vehicleId, posKey) => {
    setSelectedVehicles((prev) =>
      prev.map((row) =>
        row.ledVehicleId === vehicleId
          ? { ...row, positions: { ...row.positions, [posKey]: { ...row.positions[posKey], enabled: !row.positions[posKey].enabled } } }
          : row
      )
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelected(vehicles.map((v) => v.VehicleId));
    else setSelected([]);
  };

  const selectedCount = selectedVehicles.filter((v) => v.selected).length;
  const totalAmount = selectedVehicles
    .filter((v) => v.selected)
    .reduce((sum, v) => sum + Number(v.totalRate || 0), 0);

  const handleSubmit = async () => {
    setSubmitting(true);
    const commission = 5;
    const sgst = 9;
    const cgst = 9;
    const payload = {
      financialYear: formData.financial_year,
      avakRefId: formData.avak_ref_id,
      jobNo: formData.job_id,
      dprJobRefNo: formData.ref_no,
      woDate: new Date(formData.start_date).toISOString(),
      woSubject: formData.subject,
      clientCd: formData.client_cd,
      billingClientCd: formData.billing_Client_cd,
      billingOfficeCode: formData.billing_office_code,
      clientGrpCd: formData.client_grp_cd || "0",
      odServicetypeId: "08",
      startDate: new Date(formData.start_date).toISOString(),
      endDate: new Date(formData.end_date).toISOString(),
      commisionPercentage: String(commission),
      cgst_percentage: String(cgst),
      sgst_percentage: String(sgst),
      entryIpAddress: "103.67.78.89",
      entryByUserId: userId,
      entryByUsername: user_name,
      details: selectedVehicles.filter((item) => item.selected === true),
      duration: rateType === "M" ? `${formData.multiply_value} months` : `${formData.multiply_value} days`,
    };

    axiosClient
      .post("/OutDoorMediaTransaction/odm-lv-allocation-save", payload)
      .then((response) => {
        dispatch(showNotification({ message: "Saved successfully!", severity: "success" }));
        router.push("/admin/counter");
      })
      .catch((error) => {
        dispatch(showNotification({ message: error?.data || "Save failed!", severity: "error" }));
      })
      .finally(() => setSubmitting(false));
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ backgroundColor: tokens.gray50, minHeight: "100vh", p: { xs: 2, md: 3 } }}>
      {/* ── Page Header ── */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${tokens.navy} 0%, ${tokens.navyLight} 100%)`,
          borderRadius: "16px",
          p: "20px 24px",
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          boxShadow: `0 4px 24px rgba(10,15,44,0.18)`,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            right: -40,
            top: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            right: 60,
            bottom: -60,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(245,166,35,0.06)",
          },
        }}
      >
        {/* Left: Icon + Title */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              background: "rgba(245,166,35,0.15)",
              border: "1px solid rgba(245,166,35,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                stroke={tokens.amber}
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: tokens.white, fontSize: "1.05rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              Mounted Vehicle LED Allocation
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.76rem" }}>
              Assign LED vehicles to outdoor media work orders
            </Typography>
          </Box>
        </Box>

        {/* Right: Meta chips */}
        <Box display="flex" flexWrap="wrap" gap={1} alignItems="center">
          {[
            { label: "FY", value: formData.financial_year },
            { label: "Job", value: formData.job_id },
            { label: "AVAK", value: formData.avak_ref_id },
          ].map(({ label, value }) => (
            <Box
              key={label}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                px: 1.5,
                py: "5px",
                backdropFilter: "blur(4px)",
              }}
            >
              <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {label}
              </Typography>
              <Box sx={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.15)" }} />
              <Typography sx={{ color: tokens.amber, fontWeight: 700, fontSize: "10px" }}>
                {value || "—"}
              </Typography>
            </Box>
          ))}
          {formData.subject && (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                px: 1.5,
                py: "5px",
                maxWidth: 240,
              }}
            >
              <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Subject
              </Typography>
              <Box sx={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.15)" }} />
              <Typography sx={{ color: tokens.white, fontWeight: 500, fontSize: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {formData.subject}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Work Order Configuration ── */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "14px",
          backgroundColor: tokens.white,
          border: `1px solid ${tokens.gray200}`,
          mb: 3,
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: `1px solid ${tokens.gray100}`,
            background: `linear-gradient(90deg, ${tokens.gray50} 0%, ${tokens.white} 100%)`,
          }}
        >
          <SectionHeader
            icon={<AssignmentIcon sx={{ fontSize: 16, color: tokens.white }} />}
            title="Work Order Configuration"
            subtitle="Select category, tender, work type and allocation parameters"
          />
        </Box>

        <Box p={3}>
          <Grid container spacing={3}>
            {/* ── Left Panel: Form Fields ── */}
            <Grid item size={{xs:12, md:3.5}}>
              <Box
                sx={{
                  background: tokens.gray50,
                  border: `1px solid ${tokens.gray200}`,
                  borderRadius: "12px",
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <Typography variant="caption" sx={{ color: tokens.gray400, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "10px" }}>
                  Parameters
                </Typography>

                <TextField fullWidth select label="Category" name="category"
                  value={formData.category} onChange={handleChange} sx={fieldStyle}>
                  {categories.map((item) => (
                    <MenuItem key={item.tender_cate_id} value={item.tender_cate_id} sx={{ fontSize: "0.85rem" }}>
                      {item.tender_cate_text}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField fullWidth select label="Tender" name="tender"
                  value={formData.tender} onChange={handleChange} sx={fieldStyle}>
                  {tenders.map((item) => (
                    <MenuItem key={item.Tender_Id} value={item.Tender_Id} sx={{ fontSize: "0.85rem" }}>
                      {item.Tender_Id}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField fullWidth select label="Work Type" name="work_type"
                  value={formData.work_type} onChange={handleChange} sx={fieldStyle}>
                  {workTypes.map((item) => (
                    <MenuItem key={item.work_type_cd} value={item.work_type_cd} sx={{ fontSize: "0.85rem" }}>
                      {item.work_type_text}
                    </MenuItem>
                  ))}
                </TextField>

                <Divider sx={{ borderColor: tokens.gray200 }} />

                {/* Rate Type Toggle */}
                <Box>
                  <Typography variant="caption" sx={{ color: tokens.gray600, fontWeight: 600, fontSize: "0.76rem", mb: 1, display: "block" }}>
                    Rate Duration Type
                  </Typography>
                  <Box display="flex" gap={1}>
                    {[{ label: "Monthly", value: "M" }, { label: "Daily", value: "D" }].map(({ label, value }) => (
                      <Box
                        key={value}
                        onClick={() => setRateType(value)}
                        sx={{
                          flex: 1,
                          textAlign: "center",
                          py: 1,
                          px: 1.5,
                          borderRadius: "8px",
                          border: "1.5px solid",
                          borderColor: rateType === value ? tokens.navy : tokens.gray200,
                          background: rateType === value ? tokens.navy : tokens.white,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          "&:hover": { borderColor: tokens.navy },
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.78rem",
                            color: rateType === value ? tokens.white : tokens.gray600,
                          }}
                        >
                          {label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  select
                  label="Duration"
                  name="duration_id"
                  value={formData.duration_id}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const sel = hoardingRates.find((item) => item.duration_id === selectedId);
                    setFormData({ ...formData, duration_id: selectedId, multiply_value: sel?.multiply_value ?? 1 });
                  }}
                  sx={fieldStyle}
                >
                  {hoardingRates.map((item) => (
                    <MenuItem key={item.duration_id} value={item.duration_id} sx={{ fontSize: "0.85rem" }}>
                      {item.duration}
                    </MenuItem>
                  ))}
                </TextField>

                <Divider sx={{ borderColor: tokens.gray200 }} />

                {/* Date Range */}
                <Box>
                  <Typography variant="caption" sx={{ color: tokens.gray600, fontWeight: 600, fontSize: "0.76rem", mb: 1, display: "block" }}>
                    Date Range
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1.5}>
                    <TextField
                      fullWidth size="small" type="date" label="Start Date" name="start_date"
                      value={formatDateForInput(formData.start_date) || ""}
                      onChange={handleChange} sx={fieldStyle} InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      fullWidth size="small" type="date" label="End Date" name="end_date"
                      value={formatDateForInput(formData.end_date) || ""}
                      onChange={handleChange} sx={fieldStyle} InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ borderColor: tokens.gray200 }} />

                {/* Vendor */}
                <TextField
                  fullWidth select label="Vendor"
                  SelectProps={{ multiple: true }}
                  value={formData.vendor_id || []}
                  onChange={(e) => {
                    const selectedIds = e.target.value;
                    const selectedVendors = vendors.filter((v) => selectedIds.includes(v.AgencyID));
                    setFormData({ ...formData, vendor_id: selectedIds, vendor_name: selectedVendors.map((v) => v.AgencyName) });
                  }}
                  sx={{
                    ...fieldStyle,
                    "& .MuiOutlinedInput-root": {
                      ...fieldStyle["& .MuiOutlinedInput-root"],
                      height: "auto",
                      minHeight: "42px",
                    },
                  }}
                >
                  {vendors.map((vendor) => (
                    <MenuItem key={vendor.AgencyID} value={vendor.AgencyID}>
                      <Checkbox
                        size="small"
                        checked={formData.vendor_id.includes(vendor.AgencyID)}
                        sx={{ "&.Mui-checked": { color: tokens.navy }, p: 0, mr: 1 }}
                      />
                      <Typography sx={{ fontSize: "0.85rem", color: tokens.gray800 }}>
                        {vendor.AgencyName}
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>

                {formData.vendor_id.length > 0 && (
                  <Box display="flex" flexWrap="wrap" gap={0.5}>
                    {formData.vendor_name.map((name, i) => (
                      <Box
                        key={i}
                        sx={{
                          background: tokens.navy,
                          color: tokens.white,
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          borderRadius: "6px",
                          px: 1,
                          py: "2px",
                        }}
                      >
                        {name}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Grid>

            {/* ── Right Panel: Work List Table ── */}
            <Grid item size={{xs:12,md:8.5}}>
              <Box
                sx={{
                  border: `1px solid ${tokens.gray200}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Table Header */}
                <Box
                  sx={{
                    px: 2.5,
                    py: 1.75,
                    background: tokens.gray50,
                    borderBottom: `1px solid ${tokens.gray200}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption" sx={{ color: tokens.gray600, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "10px" }}>
                    Work List
                  </Typography>
                  {selectedWork && (
                    <Box
                      sx={{
                        background: tokens.tealLight,
                        border: `1px solid ${tokens.teal}20`,
                        color: tokens.teal,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        borderRadius: "6px",
                        px: 1.25,
                        py: "3px",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ fontSize: 12 }} />
                      Work Selected
                    </Box>
                  )}
                </Box>

                <TableContainer sx={{ flex: 1 }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        {["#", "Work Description", "Select"].map((col) => (
                          <TableCell
                            key={col}
                            sx={{
                              background: tokens.gray100,
                              color: tokens.gray600,
                              fontWeight: 700,
                              fontSize: "0.7rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              borderBottom: `2px solid ${tokens.gray200}`,
                              py: 1.5,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {col}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {workList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} align="center" sx={{ py: 6, color: tokens.gray400 }}>
                            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                              <AssignmentIcon sx={{ fontSize: 32, opacity: 0.3 }} />
                              <Typography variant="body2" sx={{ color: tokens.gray400, fontSize: "0.82rem" }}>
                                Select Work Type to load work list
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ) : (
                        workList.map((row, index) => {
                          const isSelected = selectedWork === row.work_cd;
                          return (
                            <TableRow
                              key={row.Impanel_rate_id}
                              onClick={() => setSelectedWork(row.work_cd)}
                              hover
                              sx={{
                                cursor: "pointer",
                                backgroundColor: isSelected ? `${tokens.navy}08` : index % 2 === 0 ? tokens.white : tokens.gray50,
                                borderLeft: isSelected ? `3px solid ${tokens.amber}` : "3px solid transparent",
                                transition: "all 0.12s ease",
                                "&:hover": { backgroundColor: `${tokens.navy}06` },
                              }}
                            >
                              <TableCell sx={{ color: tokens.gray400, fontSize: "0.78rem", fontWeight: 600, py: 1.25 }}>
                                {index + 1}
                              </TableCell>
                              <TableCell sx={{ color: isSelected ? tokens.navy : tokens.gray800, fontSize: "0.83rem", fontWeight: isSelected ? 600 : 400, py: 1.25, maxWidth: 480 }}>
                                <Box dangerouslySetInnerHTML={{ __html: row.work }} />
                              </TableCell>
                              <TableCell sx={{ py: 1.25 }}>
                                <Radio
                                  checked={isSelected}
                                  onChange={() => setSelectedWork(row.work_cd)}
                                  size="small"
                                  sx={{
                                    p: 0,
                                    color: tokens.gray400,
                                    "&.Mui-checked": { color: tokens.amber },
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* ── Vehicle Allocation Table ── */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "14px",
          backgroundColor: tokens.white,
          border: `1px solid ${tokens.gray200}`,
          mb: 3,
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: `1px solid ${tokens.gray100}`,
            background: `linear-gradient(90deg, ${tokens.gray50} 0%, ${tokens.white} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <SectionHeader
            icon={<TruckIcon sx={{ fontSize: 15, color: tokens.white }} />}
            title="Vehicle Allocation"
            subtitle="Select vehicles to include in this work order"
            badge={selectedVehicles.length}
          />

          {/* Summary Chips */}
          {selectedCount > 0 && (
            <Box display="flex" gap={1.5} alignItems="center">
              <Box sx={{ background: tokens.tealLight, border: `1px solid ${tokens.teal}30`, borderRadius: "8px", px: 1.5, py: "5px", display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 13, color: tokens.teal }} />
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: tokens.teal }}>
                  {selectedCount} Selected
                </Typography>
              </Box>
              <Box sx={{ background: tokens.amberLight, border: `1px solid ${tokens.amber}40`, borderRadius: "8px", px: 1.5, py: "5px" }}>
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "#b07c10" }}>
                  ₹ {totalAmount.toLocaleString("en-IN")}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {[
                  { label: "#", width: 40 },
                  { label: "Vehicle No.", width: 120 },
                  { label: "Agency", width: 160 },
                  { label: "Duration", width: 100 },
                  { label: "Rate (₹)", width: 100 },
                  { label: "Total (₹)", width: 110 },
                  { label: "Start", width: 110 },
                  { label: "End", width: 110 },
                  { label: "Status", width: 100 },
                ].map(({ label, width }) => (
                  <TableCell
                    key={label}
                    sx={{
                      width,
                      background: tokens.navy,
                      color: "rgba(255,255,255,0.65)",
                      fontWeight: 700,
                      fontSize: "0.68rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      py: 1.5,
                      borderBottom: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedVehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
                      <Box sx={{ width: 56, height: 56, borderRadius: "16px", background: tokens.gray100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <TruckIcon sx={{ fontSize: 26, color: tokens.gray400 }} />
                      </Box>
                      <Typography variant="body2" sx={{ color: tokens.gray400, fontWeight: 500 }}>No vehicles loaded</Typography>
                      <Typography variant="caption" sx={{ color: tokens.gray400 }}>Select a vendor and duration to load available vehicles</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                selectedVehicles.map((row, index) => {
                  const isUnavailable = row.available_status === "N";
                  const isSelected = row.selected;
                  const rowBg = isUnavailable ? tokens.navyMid : isSelected ? `${tokens.amber}08` : index % 2 === 0 ? tokens.white : tokens.gray50;
                  const borderLeft = isSelected && !isUnavailable ? `3px solid ${tokens.amber}` : "3px solid transparent";
                  const positions = row.positions || {};
                  const positionKeys = ["Left", "Right", "Corner", "Back"];

                  // position accent colours
                  const posColors = {
                    Left:   { bg: "#e8f4fd", border: "#90caf9", active: "#1565c0", text: "#1565c0" },
                    Right:  { bg: "#e8fdf4", border: "#80cbc4", active: "#00695c", text: "#00695c" },
                    Corner: { bg: "#fdf4e8", border: "#ffcc80", active: "#e65100", text: "#e65100" },
                    Back:   { bg: "#f4e8fd", border: "#ce93d8", active: "#6a1b9a", text: "#6a1b9a" },
                  };

                  return (
                    <>
                      {/* ── ROW 1: Vehicle Info ── */}
                      <TableRow
                        key={`${row.ledVehicleId}-info`}
                        sx={{
                          backgroundColor: rowBg,
                          borderLeft,
                          transition: "all 0.12s ease",
                          "&:hover": { backgroundColor: isUnavailable ? tokens.navyMid : isSelected ? `${tokens.amber}12` : tokens.gray100 },
                          opacity: isUnavailable ? 0.85 : 1,
                          "& td": { borderBottom: "none" }, // merge visually with row 2
                        }}
                      >
                        <TableCell sx={{ py: 1.25, color: isUnavailable ? "rgba(255,255,255,0.3)" : tokens.gray400, fontSize: "0.78rem", fontWeight: 600 }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ py: 1.25 }}>
                          <Typography sx={{ fontSize: "0.83rem", fontWeight: 700, color: isUnavailable ? "rgba(255,255,255,0.55)" : tokens.navy, fontFamily: "monospace", letterSpacing: "0.03em" }}>
                            {row.VehicleNo}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.25, color: isUnavailable ? "rgba(255,255,255,0.45)" : tokens.gray600, fontSize: "0.82rem" }}>
                          {row.vendorName}
                        </TableCell>
                        <TableCell sx={{ py: 1.25 }}>
                          <Box sx={{ display: "inline-block", background: isUnavailable ? "rgba(255,255,255,0.06)" : tokens.gray100, border: `1px solid ${isUnavailable ? "rgba(255,255,255,0.1)" : tokens.gray200}`, borderRadius: "6px", px: 1, py: "2px", fontSize: "0.72rem", fontWeight: 600, color: isUnavailable ? "rgba(255,255,255,0.4)" : tokens.gray600 }}>
                            {row.duration_text}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1.25, color: isUnavailable ? "rgba(255,255,255,0.45)" : tokens.gray800, fontSize: "0.83rem", fontWeight: 500 }}>
                          {Number(row.rate || 0).toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell sx={{ py: 1.25 }}>
                          <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: isUnavailable ? "rgba(255,255,255,0.45)" : tokens.navy }}>
                            {Number(row.totalRate || 0).toLocaleString("en-IN")}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.25, color: isUnavailable ? "rgba(255,255,255,0.35)" : tokens.gray600, fontSize: "0.8rem", fontFamily: "monospace" }}>
                          {formatDateForInput(row.startDate) || "—"}
                        </TableCell>
                        <TableCell sx={{ py: 1.25, color: isUnavailable ? "rgba(255,255,255,0.35)" : tokens.gray600, fontSize: "0.8rem", fontFamily: "monospace" }}>
                          {formatDateForInput(row.endDate) || "—"}
                        </TableCell>
                        <TableCell sx={{ py: 1.25 }}>
                          {isUnavailable ? (
                            <StatusBadge available={false} />
                          ) : (
                            <Checkbox
                              size="small"
                              checked={row.selected}
                              onChange={(e) => handleVehicleChange(row.ledVehicleId, "selected", e.target.checked)}
                              sx={{ p: 0, color: tokens.gray400, "&.Mui-checked": { color: tokens.amber } }}
                            />
                          )}
                        </TableCell>
                      </TableRow>

                      {/* ── ROW 2: Position Dimensions ── */}
                      <TableRow
                        key={`${row.ledVehicleId}-dims`}
                        sx={{
                          backgroundColor: isUnavailable ? `${tokens.navyMid}cc` : isSelected ? `${tokens.amber}05` : index % 2 === 0 ? `${tokens.gray50}` : `${tokens.gray100}80`,
                          borderLeft,
                          "& td": { borderBottom: `1px solid ${isUnavailable ? "rgba(255,255,255,0.06)" : tokens.gray200}` },
                        }}
                      >
                        <TableCell colSpan={9} sx={{ py: 1.5, px: 2 }}>
                          <Box display="flex" alignItems="flex-start" gap={2}>

                            {/* ── Bus Top-View Diagram ── */}
                            <Box sx={{ flexShrink: 0 }}>
                              {(() => {
                                const leftOn   = positions["Left"]?.enabled;
                                const rightOn  = positions["Right"]?.enabled;
                                const cornerOn = positions["Corner"]?.enabled;
                                const backOn   = positions["Back"]?.enabled;
                                const RED      = "#e84545";
                                const REDFILL  = "#fde8e8";
                                const inStroke = isUnavailable ? "rgba(255,255,255,0.15)" : "#c8cde0";
                                const inFill   = isUnavailable ? "rgba(255,255,255,0.03)" : "#eef0f8";
                                const bodyFill = isUnavailable ? "rgba(255,255,255,0.05)" : "#e2e6f2";
                                const bodyStroke = isUnavailable ? "rgba(255,255,255,0.1)" : "#b0b8d0";
                                const lbl      = isUnavailable ? "rgba(255,255,255,0.22)" : "#9aa0b8";
                                return (
                                  <svg width="110" height="80" viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* ── Bus body ── */}
                                    <rect x="20" y="12" width="68" height="52" rx="4" fill={bodyFill} stroke={bodyStroke} strokeWidth="1.2"/>

                                    {/* ── LEFT side: Corner (top) + Left (main) ── */}
                                    {/* Corner panel — top-left, smaller */}
                                    <rect x="8" y="12" width="12" height="16" rx="2.5"
                                      fill={cornerOn ? REDFILL : inFill}
                                      stroke={cornerOn ? RED : inStroke}
                                      strokeWidth={cornerOn ? 1.8 : 1}
                                    />
                                    {cornerOn && <rect x="8" y="12" width="12" height="16" rx="2.5" fill={RED} fillOpacity="0.13"/>}
                                    <text x="14" y="22" textAnchor="middle" fontSize="4.2" fill={cornerOn ? RED : lbl} fontWeight="800" fontFamily="system-ui,sans-serif">COR</text>

                                    {/* Left panel — main, bigger, below corner */}
                                    <rect x="8" y="30" width="12" height="30" rx="2.5"
                                      fill={leftOn ? REDFILL : inFill}
                                      stroke={leftOn ? RED : inStroke}
                                      strokeWidth={leftOn ? 1.8 : 1}
                                    />
                                    {leftOn && <rect x="8" y="30" width="12" height="30" rx="2.5" fill={RED} fillOpacity="0.13"/>}
                                    <text x="14" y="47" textAnchor="middle" fontSize="4.2" fill={leftOn ? RED : lbl} fontWeight="800" fontFamily="system-ui,sans-serif">LEFT</text>

                                    {/* ── RIGHT side: single full-height Right panel ── */}
                                    <rect x="90" y="12" width="12" height="48" rx="2.5"
                                      fill={rightOn ? REDFILL : inFill}
                                      stroke={rightOn ? RED : inStroke}
                                      strokeWidth={rightOn ? 1.8 : 1}
                                    />
                                    {rightOn && <rect x="90" y="12" width="12" height="48" rx="2.5" fill={RED} fillOpacity="0.13"/>}
                                    <text x="96" y="38" textAnchor="middle" fontSize="4.2" fill={rightOn ? RED : lbl} fontWeight="800" fontFamily="system-ui,sans-serif">R</text>

                                    {/* ── BACK panel ── */}
                                    <rect x="24" y="64" width="60" height="10" rx="2.5"
                                      fill={backOn ? REDFILL : inFill}
                                      stroke={backOn ? RED : inStroke}
                                      strokeWidth={backOn ? 1.8 : 1}
                                    />
                                    {backOn && <rect x="24" y="64" width="60" height="10" rx="2.5" fill={RED} fillOpacity="0.13"/>}
                                    <text x="54" y="71" textAnchor="middle" fontSize="4.2" fill={backOn ? RED : lbl} fontWeight="800" fontFamily="system-ui,sans-serif">BACK</text>

                                    {/* ── Windows ── */}
                                    {[25, 39, 53, 67].map(x => (
                                      <rect key={x} x={x} y="16" width="11" height="7" rx="1.5"
                                        fill={isUnavailable ? "rgba(255,255,255,0.05)" : "#d0d6ee"}
                                        stroke={isUnavailable ? "rgba(255,255,255,0.07)" : "#b0b8d0"}
                                        strokeWidth="0.8"
                                      />
                                    ))}
                                    {[25, 39, 53, 67].map(x => (
                                      <rect key={x+"b"} x={x} y="28" width="11" height="7" rx="1.5"
                                        fill={isUnavailable ? "rgba(255,255,255,0.05)" : "#d0d6ee"}
                                        stroke={isUnavailable ? "rgba(255,255,255,0.07)" : "#b0b8d0"}
                                        strokeWidth="0.8"
                                      />
                                    ))}

                                    {/* ── Wheels ── */}
                                    <ellipse cx="30" cy="66" rx="5" ry="3.5" fill={isUnavailable ? "rgba(255,255,255,0.07)" : "#8a90a8"} stroke={isUnavailable ? "rgba(255,255,255,0.1)" : "#606680"} strokeWidth="0.8"/>
                                    <ellipse cx="78" cy="66" rx="5" ry="3.5" fill={isUnavailable ? "rgba(255,255,255,0.07)" : "#8a90a8"} stroke={isUnavailable ? "rgba(255,255,255,0.1)" : "#606680"} strokeWidth="0.8"/>

                                    {/* ── Gap line between Corner and Left on left side ── */}
                                    <line x1="9" y1="28.5" x2="19" y2="28.5" stroke={isUnavailable ? "rgba(255,255,255,0.12)" : "#c8cde0"} strokeWidth="0.8" strokeDasharray="1.5 1.5"/>
                                  </svg>
                                );
                              })()}
                            </Box>

                            {/* ── Position chips — two lines ── */}
                            <Box display="flex" flexDirection="column" gap={1} flex={1}>

                              {/* Line 1: label + Select All + Left + Right */}
                              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: isUnavailable ? "rgba(255,255,255,0.25)" : tokens.gray400, textTransform: "uppercase", letterSpacing: "0.07em", flexShrink: 0 }}>
                                  Positions
                                </Typography>

                                {/* Select All / Clear All */}
                                {!isUnavailable && (
                                  <Box
                                    onClick={() => {
                                      const allOn = positionKeys.every(k => positions[k]?.enabled);
                                      positionKeys.forEach(k => {
                                        if (allOn ? positions[k]?.enabled : !positions[k]?.enabled) {
                                          togglePosition(row.ledVehicleId, k);
                                        }
                                      });
                                    }}
                                    sx={{
                                      px: 1, py: "3px", borderRadius: "6px", border: "1.5px solid",
                                      borderColor: positionKeys.every(k => positions[k]?.enabled) ? tokens.red : tokens.teal,
                                      background: positionKeys.every(k => positions[k]?.enabled) ? tokens.redLight : tokens.tealLight,
                                      cursor: "pointer", display: "flex", alignItems: "center", gap: 0.4,
                                      userSelect: "none", transition: "all 0.15s ease",
                                      "&:hover": { opacity: 0.8 }, flexShrink: 0,
                                    }}
                                  >
                                    {positionKeys.every(k => positions[k]?.enabled) ? (
                                      <>
                                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke={tokens.red} strokeWidth="2" strokeLinecap="round"/></svg>
                                        <Typography sx={{ fontSize: "0.63rem", fontWeight: 800, color: tokens.red, lineHeight: 1 }}>Clear All</Typography>
                                      </>
                                    ) : (
                                      <>
                                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5l2.5 2.5 5-5" stroke={tokens.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        <Typography sx={{ fontSize: "0.63rem", fontWeight: 800, color: tokens.teal, lineHeight: 1 }}>All</Typography>
                                      </>
                                    )}
                                  </Box>
                                )}

                                {/* Left + Right chips */}
                                {["Left", "Right"].map((posKey) => {
                                  const pos = positions[posKey] || { enabled: false, L: "", W: "" };
                                  const colors = posColors[posKey];
                                  const isActive = pos.enabled;
                                  const dimText = pos.L && pos.W ? `${pos.L}×${pos.W}` : "";
                                  return (
                                    <Box key={posKey} sx={{ display: "flex", alignItems: "center", border: "1.5px solid", borderColor: isActive ? colors.active : isUnavailable ? "rgba(255,255,255,0.1)" : colors.border, borderRadius: "8px", overflow: "hidden", background: isActive ? colors.bg : isUnavailable ? "rgba(255,255,255,0.04)" : tokens.white, transition: "all 0.15s ease", flexShrink: 0 }}>
                                      {/* Toggle btn */}
                                      <Box onClick={() => !isUnavailable && togglePosition(row.ledVehicleId, posKey)} sx={{ width: 22, minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: isUnavailable ? "default" : "pointer", background: isActive ? colors.active : isUnavailable ? "rgba(255,255,255,0.04)" : tokens.gray100, borderRight: "1px solid", borderColor: isActive ? `${colors.active}60` : isUnavailable ? "rgba(255,255,255,0.08)" : tokens.gray200, transition: "all 0.15s ease", "&:hover": !isUnavailable ? { opacity: 0.8 } : {} }}>
                                        {isActive ? <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke={isUnavailable ? "rgba(255,255,255,0.2)" : colors.text} strokeWidth="1.8" strokeLinecap="round"/></svg>}
                                      </Box>
                                      {/* Label */}
                                      <Box sx={{ px: 0.9, py: "4px", background: isActive ? colors.active : isUnavailable ? "rgba(255,255,255,0.06)" : colors.bg, borderRight: "1px solid", borderColor: isActive ? `${colors.active}40` : isUnavailable ? "rgba(255,255,255,0.08)" : colors.border, userSelect: "none" }}>
                                        <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, color: isActive ? "#fff" : isUnavailable ? "rgba(255,255,255,0.3)" : colors.text, lineHeight: 1 }}>{posKey}{isActive && dimText ? ` ${dimText}` : ""}</Typography>
                                      </Box>
                                      {/* L */}
                                      <Box sx={{ display: "flex", alignItems: "center", borderRight: "1px solid", borderColor: isActive ? `${colors.active}30` : isUnavailable ? "rgba(255,255,255,0.08)" : colors.border }}>
                                        <Typography sx={{ fontSize: "0.56rem", fontWeight: 800, color: isActive ? colors.text : isUnavailable ? "rgba(255,255,255,0.2)" : tokens.gray400, px: 0.5, userSelect: "none" }}>L</Typography>
                                        <input type="number" placeholder="—" value={pos.L} disabled={isUnavailable} onChange={(e) => handlePositionChange(row.ledVehicleId, posKey, "L", e.target.value)} onFocus={() => !pos.enabled && !isUnavailable && togglePosition(row.ledVehicleId, posKey)} style={{ width: 36, border: "none", outline: "none", background: "transparent", fontSize: "0.74rem", fontWeight: 700, color: isActive ? colors.active : isUnavailable ? "rgba(255,255,255,0.2)" : tokens.gray600, padding: "4px 2px", fontFamily: "monospace", MozAppearance: "textfield", cursor: isUnavailable ? "not-allowed" : "text" }}/>
                                      </Box>
                                      <Typography sx={{ fontSize: "0.65rem", color: isActive ? colors.text : tokens.gray400, fontWeight: 700, px: 0.25, userSelect: "none" }}>×</Typography>
                                      {/* W */}
                                      <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{ fontSize: "0.56rem", fontWeight: 800, color: isActive ? colors.text : isUnavailable ? "rgba(255,255,255,0.2)" : tokens.gray400, px: 0.5, userSelect: "none" }}>W</Typography>
                                        <input type="number" placeholder="—" value={pos.W} disabled={isUnavailable} onChange={(e) => handlePositionChange(row.ledVehicleId, posKey, "W", e.target.value)} onFocus={() => !pos.enabled && !isUnavailable && togglePosition(row.ledVehicleId, posKey)} style={{ width: 36, border: "none", outline: "none", background: "transparent", fontSize: "0.74rem", fontWeight: 700, color: isActive ? colors.active : isUnavailable ? "rgba(255,255,255,0.2)" : tokens.gray600, padding: "4px 4px 4px 0", fontFamily: "monospace", MozAppearance: "textfield", cursor: isUnavailable ? "not-allowed" : "text" }}/>
                                      </Box>
                                      {/* Deselect */}
                                      {isActive && !isUnavailable && <Box onClick={() => togglePosition(row.ledVehicleId, posKey)} sx={{ width: 18, minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid ${colors.active}30`, cursor: "pointer", background: `${colors.active}10`, "&:hover": { background: `${colors.active}25` } }}><svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke={colors.active} strokeWidth="2" strokeLinecap="round"/></svg></Box>}
                                    </Box>
                                  );
                                })}
                              </Box>

                              {/* Line 2: Corner + Back chips */}
                              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                {/* spacer to align under chips */}
                                <Box sx={{ width: 60, flexShrink: 0 }} />

                                {["Corner", "Back"].map((posKey) => {
                                  const pos = positions[posKey] || { enabled: false, L: "", W: "" };
                                  const colors = posColors[posKey];
                                  const isActive = pos.enabled;
                                  const dimText = pos.L && pos.W ? `${pos.L}×${pos.W}` : "";
                                  return (
                                    <Box key={posKey} sx={{ display: "flex", alignItems: "center", border: "1.5px solid", borderColor: isActive ? colors.active : isUnavailable ? "rgba(255,255,255,0.1)" : colors.border, borderRadius: "8px", overflow: "hidden", background: isActive ? colors.bg : isUnavailable ? "rgba(255,255,255,0.04)" : tokens.white, transition: "all 0.15s ease", flexShrink: 0 }}>
                                      {/* Toggle btn */}
                                      <Box onClick={() => !isUnavailable && togglePosition(row.ledVehicleId, posKey)} sx={{ width: 22, minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: isUnavailable ? "default" : "pointer", background: isActive ? colors.active : isUnavailable ? "rgba(255,255,255,0.04)" : tokens.gray100, borderRight: "1px solid", borderColor: isActive ? `${colors.active}60` : isUnavailable ? "rgba(255,255,255,0.08)" : tokens.gray200, transition: "all 0.15s ease", "&:hover": !isUnavailable ? { opacity: 0.8 } : {} }}>
                                        {isActive ? <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke={isUnavailable ? "rgba(255,255,255,0.2)" : colors.text} strokeWidth="1.8" strokeLinecap="round"/></svg>}
                                      </Box>
                                      {/* Label */}
                                      <Box sx={{ px: 0.9, py: "4px", background: isActive ? colors.active : isUnavailable ? "rgba(255,255,255,0.06)" : colors.bg, borderRight: "1px solid", borderColor: isActive ? `${colors.active}40` : isUnavailable ? "rgba(255,255,255,0.08)" : colors.border, userSelect: "none" }}>
                                        <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, color: isActive ? "#fff" : isUnavailable ? "rgba(255,255,255,0.3)" : colors.text, lineHeight: 1 }}>{posKey}{isActive && dimText ? ` ${dimText}` : ""}</Typography>
                                      </Box>
                                      {/* L */}
                                      <Box sx={{ display: "flex", alignItems: "center", borderRight: "1px solid", borderColor: isActive ? `${colors.active}30` : isUnavailable ? "rgba(255,255,255,0.08)" : colors.border }}>
                                        <Typography sx={{ fontSize: "0.56rem", fontWeight: 800, color: isActive ? colors.text : isUnavailable ? "rgba(255,255,255,0.2)" : tokens.gray400, px: 0.5, userSelect: "none" }}>L</Typography>
                                        <input type="number" placeholder="—" value={pos.L} disabled={isUnavailable} onChange={(e) => handlePositionChange(row.ledVehicleId, posKey, "L", e.target.value)} onFocus={() => !pos.enabled && !isUnavailable && togglePosition(row.ledVehicleId, posKey)} style={{ width: 36, border: "none", outline: "none", background: "transparent", fontSize: "0.74rem", fontWeight: 700, color: isActive ? colors.active : isUnavailable ? "rgba(255,255,255,0.2)" : tokens.gray600, padding: "4px 2px", fontFamily: "monospace", MozAppearance: "textfield", cursor: isUnavailable ? "not-allowed" : "text" }}/>
                                      </Box>
                                      <Typography sx={{ fontSize: "0.65rem", color: isActive ? colors.text : tokens.gray400, fontWeight: 700, px: 0.25, userSelect: "none" }}>×</Typography>
                                      {/* W */}
                                      <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{ fontSize: "0.56rem", fontWeight: 800, color: isActive ? colors.text : isUnavailable ? "rgba(255,255,255,0.2)" : tokens.gray400, px: 0.5, userSelect: "none" }}>W</Typography>
                                        <input type="number" placeholder="—" value={pos.W} disabled={isUnavailable} onChange={(e) => handlePositionChange(row.ledVehicleId, posKey, "W", e.target.value)} onFocus={() => !pos.enabled && !isUnavailable && togglePosition(row.ledVehicleId, posKey)} style={{ width: 36, border: "none", outline: "none", background: "transparent", fontSize: "0.74rem", fontWeight: 700, color: isActive ? colors.active : isUnavailable ? "rgba(255,255,255,0.2)" : tokens.gray600, padding: "4px 4px 4px 0", fontFamily: "monospace", MozAppearance: "textfield", cursor: isUnavailable ? "not-allowed" : "text" }}/>
                                      </Box>
                                      {/* Deselect */}
                                      {isActive && !isUnavailable && <Box onClick={() => togglePosition(row.ledVehicleId, posKey)} sx={{ width: 18, minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid ${colors.active}30`, cursor: "pointer", background: `${colors.active}10`, "&:hover": { background: `${colors.active}25` } }}><svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke={colors.active} strokeWidth="2" strokeLinecap="round"/></svg></Box>}
                                    </Box>
                                  );
                                })}
                              </Box>

                            </Box>{/* end position chips column */}
                          </Box>{/* end row flex */}
                        </TableCell>
                      </TableRow>
                     
                    </>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Footer */}
        {selectedVehicles.length > 0 && (
          <Box
            sx={{
              px: 3,
              py: 1.75,
              borderTop: `1px solid ${tokens.gray200}`,
              background: tokens.gray50,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography variant="caption" sx={{ color: tokens.gray400, fontSize: "0.76rem" }}>
              {selectedVehicles.filter((v) => v.available_status !== "N").length} available ·{" "}
              {selectedVehicles.filter((v) => v.available_status === "N").length} allocated
            </Typography>
            {selectedCount > 0 && (
              <Typography variant="caption" sx={{ color: tokens.gray600, fontWeight: 600, fontSize: "0.78rem" }}>
                {selectedCount} vehicle{selectedCount > 1 ? "s" : ""} selected · Total:{" "}
                <span style={{ color: tokens.navy, fontWeight: 800 }}>₹ {totalAmount.toLocaleString("en-IN")}</span>
              </Typography>
            )}
          </Box>
        )}
      </Paper>

      {/* ── Submit Bar ── */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          zIndex: 10,
          background: `linear-gradient(0deg, ${tokens.gray50} 70%, transparent 100%)`,
          pt: 3,
          pb: 2,
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          alignItems: "center",
        }}
      >
        {selectedCount > 0 && (
          <Typography variant="caption" sx={{ color: tokens.gray600, fontSize: "0.82rem", fontWeight: 500 }}>
            {selectedCount} vehicle{selectedCount > 1 ? "s" : ""} · ₹{totalAmount.toLocaleString("en-IN")}
          </Typography>
        )}
        <Button
          variant="outlined"
          size="large"
          onClick={() => router.back()}
          sx={{
            px: 3,
            py: 1.2,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.88rem",
            borderColor: tokens.gray200,
            color: tokens.gray600,
            "&:hover": { borderColor: tokens.gray400, background: tokens.gray100 },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={submitting || selectedCount === 0}
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.88rem",
            background: `linear-gradient(135deg, ${tokens.navy} 0%, ${tokens.navyLight} 100%)`,
            boxShadow: `0 4px 16px rgba(10,15,44,0.22)`,
            "&:hover": {
              background: `linear-gradient(135deg, ${tokens.navyLight} 0%, #2a3575 100%)`,
              boxShadow: `0 6px 20px rgba(10,15,44,0.3)`,
            },
            "&.Mui-disabled": {
              background: tokens.gray200,
              color: tokens.gray400,
              boxShadow: "none",
            },
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {submitting ? "Saving..." : "Submit Allocation"}
          {!submitting && selectedCount > 0 && (
            <Box
              sx={{
                background: tokens.amber,
                color: tokens.navy,
                borderRadius: "20px",
                px: 0.9,
                py: "1px",
                fontSize: "0.68rem",
                fontWeight: 800,
                lineHeight: 1.6,
                ml: 0.5,
              }}
            >
              {selectedCount}
            </Box>
          )}
        </Button>
      </Box>
    </Box>
  );
}