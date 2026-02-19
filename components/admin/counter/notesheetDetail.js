import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import adminServices from "@/services/adminServices";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const DataSetUI = () => {
  const searchParams = useSearchParams();
  const job_id = searchParams.get("job_id");
  const avak_ref = searchParams.get("avak_ref");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await adminServices.getAllocationRecord();
      //setData(response || []);
      //const response = await axios.get("/api/records"); 
      // replace with your actual endpoint

      setData(response.data);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value || 0);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ mt: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  if (!data) return null;

  const { records, summary } = data;

  return (
    <Box sx={{ p: 3 }}>
      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Records</Typography>
              <Typography variant="h5">{summary.total_records}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Grand Total</Typography>
              <Typography variant="h5">
                {formatCurrency(summary.grand_total_amount)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Vendor Total</Typography>
              <Typography variant="h5">
                {formatCurrency(summary.vendor_total_amount)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Vehicles</TableCell>
              <TableCell>Programme</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {records.map((row) => (
              <TableRow key={row.allocation_id}>
                <TableCell>{row.allocation_id}</TableCell>
                <TableCell>{row.vendor_name}</TableCell>
                <TableCell>{row.led_vehicle_id}</TableCell>
                <TableCell>{row.rate}</TableCell>
                <TableCell>{row.no_of_vehicle}</TableCell>
                <TableCell>{row.no_of_programme}</TableCell>
                <TableCell>{row.total_rate}</TableCell>
                <TableCell>{row.start_date?.split("T")[0]}</TableCell>
                <TableCell>{row.end_date?.split("T")[0]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataSetUI;
