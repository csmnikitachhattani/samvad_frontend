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
} from "@mui/material";

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
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState({
    main_id: 0,
    financial_year: "",
    avak_ref_id: "",
    job_id: "",
    subject: "",
    dpr_job_ref_no: "",
    wo_date: "",
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

  const formatDateForInput = (dateString) => {
    return dateString?.split("T")[0];
  };

  const transformAgencyToDetails = (agencies, startDate, endDate) => {
    if (!Array.isArray(agencies)) return [];
    return agencies.map((agency) => ({
      vendorId: agency.AgencyId?.toString() || "",
      vendorName: agency.AgencyName || "",
      vendorCateId: agency.ServiceId?.toString() || "",
      vendorCate: "outdoor media",
      ledVehicleId: agency.VehicleId,
      description: "",
      rate: 12,
      noOfVehicle: 1,
      noOfProgramme: 4,
      totalRate: 12,
      startDate: formatDateForInput(startDate),
      endDate: formatDateForInput(endDate),
      selected: false,
    }));
  };

  async function fetchVehicle() {
    try {
      const response = await outdoorServices.getAgencyVehicle(formData.vendor_id);
      const arr = transformAgencyToDetails(response.result, formData.start_date, formData.end_date);
      setVehicles(arr);
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
          od_servicetype_id: response.od_servicetype_id,
          receipt_date: response.receipt_date ?? "",
          vendor_id: response.vendor_id ?? [],
          vendor_name: response.vendor_name ?? [],
          client_cd: response.client_cd ?? "",
          billing_Client_cd: response.billing_Client_cd ?? "",
          billing_office_code: response.billing_office_code ?? "",
          client_grp_cd: response.client_grp_cd ?? "",
          start_date: response.startDate ?? "",
          end_date: response.endDate ?? "",
          commision_Percentage: response.commision_Percentage ?? 0,
          commission_amount: response.commission_amount ?? 0,
          amount_with_commission: response.amount_with_commission ?? 0,
          gst_percentage: response.gst_percentage ?? "",
          gst_amount: response.gst_amount ?? 0,
          toatl_amount: response.toatl_amount ?? 0,
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

  const addRow = () => {
    setFormData({
      ...formData,
      detailList: [
        ...formData.detailList,
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
  };

  const handleVehicleChange = (vehicleId, field, value) => {
    setVehicles((prev) =>
      prev.map((row) => (row.ledVehicleId === vehicleId ? { ...row, [field]: value } : row))
    );
  };

  const handleSubmit = async () => {
    const payload = {
      financialYear: formData.financial_year,
      avakRefId: formData.avak_ref_id,
      jobNo: formData.job_id,
      dprJobRefNo: "",
      woDate: new Date().toISOString(),
      entryIpAddress: "string",
      entryByUserId: "string",
      entryByUsername: "nikita",
      details: vehicles.filter((item) => item.selected === true),
    };

    axiosClient
      .post(
        "http://103.79.34.50:8083/api/OutDoorMediaTransaction/saveledvehicleallocationdetails",
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
            message: error.response?.data?.message || "Save failed!",
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
            //background: "linear-gradient(135deg, #5c7cfa 0%, #4263eb 100%)",
            background: '#010a2a',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(92,124,250,0.35)",
          }}
        >
          {/* truck icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#1a1f36", letterSpacing: "-0.3px" }}
          >
            Vehicle Allocation
          </Typography>
          <Typography variant="caption" sx={{ color: "#8a90a0" }}>
            Assign vehicles to work orders
          </Typography>
        </Box>
      </Box>

      {/* ── Work Order Details Card ── */}
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
        <Box display="flex" alignItems="center" gap={1} mb={2.5}>
          <Box
            sx={{
              width: 6,
              height: 20,
              borderRadius: "3px",
              background: "#010a2a",
            }}
          />
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#1a1f36" }}>
            Work Order Details
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              label="Financial Year"
              name="financial_year"
              value={formData.financial_year}
              onChange={handleChange}
              sx={grayField}
            />
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              label="AVAK Ref ID"
              name="avak_ref_id"
              value={formData.avak_ref_id}
              onChange={handleChange}
              sx={grayField}
            />
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              label="Job No"
              name="job_id"
              value={formData.job_id}
              onChange={handleChange}
              sx={grayField}
            />
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth
              label="WO Subject"
              InputProps={{
                readOnly: true,
              }}
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              sx={grayField}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              select
              fullWidth
              label="Vendor"
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
                  {/* <ListItemText primary={vendor.AgencyName} > */}
                  <Chip
              //icon={icon}
              label={vendor.AgencyName}
              
            />
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* ── Vehicle Details Card ── */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          border: "1px solid #e8eaf0",
        }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2.5}>
          <Box
            sx={{
              width: 6,
              height: 20,
              borderRadius: "3px",
              background: "#010a2a",
            }}
          />
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#1a1f36" }}>
            Vehicle Details
          </Typography>
        </Box>

        <TableContainer sx={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #eaecf2" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f5f7" }}>
                {["Vehicle", "Owner", "Agency", "Rate", "Total", "Start", "End", ""].map(
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

            <TableBody>
              {vehicles.map((row, index) => (
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
                    {row.noOfVehicle}
                  </TableCell>
                  <TableCell sx={{ color: "#2d3142", fontSize: "0.85rem" }}>
                    {row.vendorName}
                  </TableCell>
                  <TableCell sx={{ color: "#2d3142", fontSize: "0.85rem" }}>
                    {row.vendorCate}
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      value={row.rate}
                      onChange={(e) =>
                        handleVehicleChange(row.ledVehicleId, "rate", e.target.value)
                      }
                      sx={smallGrayField}
                      inputProps={{ style: { fontSize: "0.83rem" } }}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      value={row.totalRate}
                      onChange={(e) =>
                        handleVehicleChange(row.ledVehicleId, "totalRate", e.target.value)
                      }
                      sx={smallGrayField}
                      inputProps={{ style: { fontSize: "0.83rem" } }}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      type="date"
                      value={row.startDate}
                      onChange={(e) =>
                        handleVehicleChange(row.ledVehicleId, "startDate", e.target.value)
                      }
                      sx={smallGrayField}
                      inputProps={{ style: { fontSize: "0.83rem" } }}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      type="date"
                      value={row.endDate}
                      onChange={(e) =>
                        handleVehicleChange(row.ledVehicleId, "endDate", e.target.value)
                      }
                      sx={smallGrayField}
                      inputProps={{ style: { fontSize: "0.83rem" } }}
                    />
                  </TableCell>

                  <TableCell padding="checkbox">
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

              {vehicles.length === 0 && (
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