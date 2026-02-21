"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Paper,
} from "@mui/material";

export default function AllocationPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);


  const formatDate = (date) => {
  if (!date) return "";
  return date.split("T")[0];
};

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosClient.get(
          `http://103.79.34.50:8083/api/OutDoorMediaTransaction/getoutdoordbcounter?id=${id}`
        );


        const apiData = res?.data?.data || res?.data;
        console.log("ffhjkldata",apiData)
        const job = Array.isArray(apiData) ? apiData[0] : apiData;

        setData(job);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || "Failed to fetch allocation data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔄 Loading UI
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

  // ❌ Error UI (important for your HTML issue)
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
    <Box p={{ xs: 2, md: 4 }} bgcolor="#f4f6f8" minHeight="100vh">
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Allocation Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Job ID: {data?.job_id || id}
        </Typography>
      </Paper>

      {/* Main Card */}
      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Job Details
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {/* Financial Year */}
            <Grid item xs={12} md={3}>
              <TextField
                label="Financial Year"
                fullWidth
                value={data?.financial_year || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

  {/* Avak Ref Id */}
            <Grid item xs={12} md={3}>
              <TextField
                label="Avak Ref Id "
                fullWidth
                value={data?.avak_ref_id || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Ref No */}
            <Grid item xs={12} md={3}>
              <TextField
                label="Reference No"
                fullWidth
                value={data?.ref_no || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

{/* Start Date */}
<Grid item xs={12} md={3}>
  <TextField
    label="Start Date"
    type="date"
    fullWidth
    value={formatDate(data?.startDate)}
    InputLabelProps={{ shrink: true }}
    InputProps={{ readOnly: true }}
  />
</Grid>

{/*End Date */}
<Grid item xs={12} md={3}>
  <TextField
    label="End Date"
    type="date"
    fullWidth
    value={formatDate(data?.endDate)}
    InputLabelProps={{ shrink: true }}
    InputProps={{ readOnly: true }}
  />
</Grid>

            {/* Service Type */}
            <Grid item xs={12} md={1}>
              <TextField
                label="Service Type ID"
                fullWidth
                value={data?.od_servicetype_id || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Subject */}
            <Grid item xs={12}>
              <TextField
                label="Subject"
                fullWidth
                multiline
                rows={2}
                value={data?.subject || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Client Info */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Client Name"
                fullWidth
                value={data?.client_name || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* <Grid item xs={12} md={4}>
              <TextField
                label="Billing Client Code"
                fullWidth
                value={data?.billing_Client_cd || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Client Group Code"
                fullWidth
                value={data?.client_grp_cd || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid> */}

        
            {/* GST */}
            {/* <Grid item xs={12} md={3}>
              <TextField
                label="GST %"
                fullWidth
                value={data?.gst_percentage || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Total Amount"
                fullWidth
                value={data?.toatl_amount || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid> */}

            {/* Vendors Chips */}
            {/* <Grid item xs={12}>
              <Typography fontWeight="bold" mb={1}>
                Vendors
              </Typography>
              {data?.vendor_name?.length > 0 ? (
                data.vendor_name.map((v, i) => (
                  <Chip
                    key={i}
                    label={v}
                    color="primary"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))
              ) : (
                <Chip label="No Vendors" />
              )}
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}