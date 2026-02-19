import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import adminServices from "@/services/adminServices";

import {
    Box,
    Card,
    CardContent,
    CardActions,
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
    Chip,
    Divider,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const DataSetUI = () => {
    const searchParams = useSearchParams();
    const job_id = searchParams.get("id");
    const avak_ref = searchParams.get("avak_ref");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (job_id && avak_ref) {
            fetchRecords(job_id, avak_ref);
        }
    }, [job_id, avak_ref]);

    const fetchRecords = async (jobId, avakRef) => {
        try {
            setLoading(true);
            const response = await adminServices.getAllocationRecord(jobId, avakRef);
            setData(response.data);
        } catch (err) {
            setError("Failed to load allocation records");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            setError("");
            setSuccess("");

            const payload = {
                job_id,
                avak_ref,
                records: data?.records,
            };

            const response = await adminServices.submitAllocation(payload);

            setSuccess("Allocation submitted successfully ✅");
            console.log(response.data);
        } catch (err) {
            setError("Submission failed. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(value || 0);

    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
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

    const { records = [], summary = {} } = data;

    return (
        <Box sx={{ p: 3, bgcolor: "#f7f9fc", minHeight: "100vh" }}>
            {/* Header */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Allocation Summary
      </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Job ID: <b>{job_id}</b> | Avak Ref: <b>{avak_ref}</b>
            </Typography>

            {/* Summary Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1}>
                                <ReceiptLongIcon color="primary" />
                                <Typography variant="subtitle2">Total Records</Typography>
                            </Box>
                            <Typography variant="h4" fontWeight="bold">
                                {summary.total_records || 0}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1}>
                                <CurrencyRupeeIcon color="success" />
                                <Typography variant="subtitle2">Grand Total</Typography>
                            </Box>
                            <Typography variant="h5" fontWeight="bold">
                                {formatCurrency(summary.grand_total_amount)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1}>
                                <LocalShippingIcon color="warning" />
                                <Typography variant="subtitle2">Vendor Total</Typography>
                            </Box>
                            <Typography variant="h5" fontWeight="bold">
                                {formatCurrency(summary.vendor_total_amount)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Table */}
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Allocation Records
          </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {[
                                        "ID",
                                        "Vendor",
                                        "Vehicle",
                                        "Rate",
                                        "Vehicles",
                                        "Programme",
                                        "Total",
                                        "Start",
                                        "End",
                                    ].map((head) => (
                                        <TableCell
                                            key={head}
                                            sx={{ fontWeight: "bold", bgcolor: "#eef2f7" }}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {records.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            <Typography color="text.secondary" sx={{ py: 3 }}>
                                                No allocation records found
                      </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                        records.map((row, index) => (
                                            <TableRow
                                                key={row.allocation_id}
                                                sx={{
                                                    bgcolor: index % 2 === 0 ? "#fcfcfc" : "#f5f7fa",
                                                }}
                                            >
                                                <TableCell>{row.allocation_id}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={row.vendor_name}
                                                        size="small"
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>{row.led_vehicle_id}</TableCell>
                                                <TableCell>{formatCurrency(row.rate)}</TableCell>
                                                <TableCell>{row.no_of_vehicle}</TableCell>
                                                <TableCell>{row.no_of_programme}</TableCell>
                                                <TableCell sx={{ fontWeight: "bold" }}>
                                                    {formatCurrency(row.total_rate)}
                                                </TableCell>
                                                <TableCell>
                                                    {row.start_date?.split("T")[0]}
                                                </TableCell>
                                                <TableCell>
                                                    {row.end_date?.split("T")[0]}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions>

                    <Button
                        variant="contained"
                        color="primary"
                        //   startIcon={
                        //     submitting ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />
                        //   }
                        onClick={handleSubmit}
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            textTransform: "none",
                            fontWeight: "bold",
                        }}
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default DataSetUI;
