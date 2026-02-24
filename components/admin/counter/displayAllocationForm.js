"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosClient from "@/lib/axiosClient";
import adminServices from "@/services/adminServices";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  CircularProgress,
  Alert,
  Divider,
  Paper,
  MenuItem,
  ListItemText,
  Button,   
} from "@mui/material";

export default function AllocationPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    main_id: 0,
    financial_year: "",
    avak_ref_id: "",
    job_id: "",
    subject: "",
    ref_no: "",
    od_servicetype_id: "1",
    receipt_date: "",
    vendor_id: [],
    vendor_name: [],
    client_cd: "",
    billing_Client_cd: "",
    billing_office_code: "",
    client_grp_cd: "",
    start_date: "",
    end_date: "",
    commision_Percentage: 0,
    commission_amount: 0,
    amount_with_commission: 0,
    gst_percentage: "",
    gst_amount: 0,
    toatl_amount: 0,
    detailList: [],
  });

  const [vendors, setVendors] = useState([]);

  const formatDate = (date) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  // -------------------------------
  // FETCH MAIN JOB DATA

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosClient.get(
          `http://103.79.34.50:8083/api/OutDoorMediaTransaction/getoutdoordbcounter?id=${id}`,
        );

        // console.log(" API Data:", res.data);

        const apiData = res?.data?.data || res?.data;
        const job = Array.isArray(apiData) ? apiData[0] : apiData;

        setData(job);

        // Fetch vendor list using serviceTypeID
        if (job?.od_servicetype_id) {
          fetchServiceTypes(job.od_servicetype_id);
        }
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setError(err.message || "Failed to fetch allocation data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // -------------------------------
  // FETCH VENDORS

  async function fetchServiceTypes(serviceTypeId) {
    try {
      const response = await adminServices.getVendorList(serviceTypeId);
      // console.log("🟡 Vendor Response:", response);

      setVendors(response.result || []);
    } catch (error) {
      console.error("❌ Failed to fetch vendors", error);
    }
  }


  const handleSubmit = () => {};

  // -------------------------------
  // UI STARTS HERE


  if (loading) {
    return (
      <Box
        display="flex"
        height="70vh"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box bgcolor="#f5f8fc" minHeight="100vh">
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: 1,
          mb: 1,
          borderRadius: 3,
          // background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          background: "rgb(3,2,54)",
          color: "#fff",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Allocation Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Job ID: {data?.job_id || id}
        </Typography>
      </Paper>

      {/* Main Card */}
      <Card
        elevation={4}
        sx={{ borderRadius: 0, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Job Details
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {/* Financial Year */}

            <Grid item size={{ xs: 12, md: 2 }}>
              <TextField
                label="Financial Year"
                fullWidth
                size="small"
                value={data?.financial_year || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Avak Ref Id */}

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Avak Ref Id"
                fullWidth
                size="small"
                value={data?.avak_ref_id || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Ref No */}

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Reference No"
                fullWidth
                size="small"
                value={data?.ref_no || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Start Date */}

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                size="small"
                value={formatDate(data?.startDate)}
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* End Date */}

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="End Date"
                type="date"
                size="small"
                fullWidth
                value={formatDate(data?.endDate)}
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Service Type */}

            <Grid item size={{ xs: 12, md: 2 }}>
              <TextField
                label="Service Type ID"
                fullWidth
                size="small"
                value={data?.od_servicetype_id || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Subject */}

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Subject"
                fullWidth
                size="small"
                multiline
                rows={2}
                value={data?.subject || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Client Info */}

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Client Name"
                fullWidth
                size="small"
                value={data?.client_name || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Vendor Select */}
            <Grid item size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Vendor"
                name="vendor_id"
                size="small"
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) =>
                    vendors
                      .filter((v) => selected.includes(v.AgencyID))
                      .map((v) => v.AgencyName)
                      .join(", "),
                }}
                value={formData.vendor_id}
                onChange={(e) => {
                  const selectedIds = e.target.value;

                  const selectedVendors = vendors.filter((v) =>
                    selectedIds.includes(v.AgencyID),
                  );

                  setFormData({
                    ...formData,
                    vendor_id: selectedIds,
                    vendor_name: selectedVendors.map((v) => v.AgencyName),
                  });
                }}
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.AgencyID} value={vendor.AgencyID}>
                    <ListItemText primary={vendor.AgencyName} />
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* GST */}
            <Grid item size={{ xs: 12, md: 2 }}>
              <TextField
                label="GST %"
                fullWidth
                size="small"
                value={data?.gst_percentage || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Total Amount */}
            <Grid item size={{ xs: 12, md: 2 }}>
              <TextField
                label="Total Amount"
                fullWidth
                size="small"
                value={data?.toatl_amount || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

          
          </Grid>
        </CardContent>
      </Card>

{/* table data here */}

<Box>here show table data</Box>


 <Box mt={3}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}




