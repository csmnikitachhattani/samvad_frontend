"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    InputAdornment,
    Snackbar,
    Alert,
    MenuItem,
} from "@mui/material";
import NumbersIcon from "@mui/icons-material/Numbers";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import newspaperService from "@/services/newspaperService";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"; // FIXED
function GstDetail() {
    const [formData, setFormData] = useState({
        GST_number: "",
        GST_legalName: "",
        GST_StateID: "",
        GST_StateText: "",
        GST_DateOfRegistration: "",
        GST_TaxpayerType: "",
    });

    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const states = [];

    const taxpayerTypes = [
        "Regular",
        "Composition",
        "Casual",
        "Non-Resident",
    ];
    useEffect(() => {
        loadUser();
    }, []);
    const handleUpdateGSTDetail = async () => {
        console.log(formData.GST_TaxpayerType, formData.GST_DateOfRegistration)
        try {
            const updateObject = {
                action: "update",
                user_id: '00019',
                GST_legalName: formData.GST_legalName,
                GST_number: formData.GST_number,
                GST_StateID: formData.GST_StateID,
                GST_StateText: formData.GST_StateText,
                GST_DateOfRegistration: formData.GST_DateOfRegistration,
                GST_TaxpayerType: formData.GST_TaxpayerType,
                //ip_address: formData.ip_address || "0.0.0.0",
                // by_user_id: formData.by_user_id || "000019",
                // by_user_name: formData.by_user_name || "",
            };

            const result = await newspaperService.updateGSTDetail(updateObject);

            console.log("GST Detail Updated:", result);
        } catch (err) {
            console.log("Error updating GST detail:", err.message);
        }
    };

    const loadUser = async () => {
        const res = await newspaperService.getNewspapersGSTDetails("00019");
        console.log(res)
        setFormData(res.data?.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
        console.log(formData.GST_TaxpayerType)
    };


    const validateForm = () => {
        const newErrors = {};

        if (!formData.GST_number.trim()) newErrors.GST_number = "GSTIN is required";
        if (!formData.GST_legalName.trim()) newErrors.GST_legalName = "Legal name is required";
        if (!formData.GST_StateText.trim()) newErrors.GST_StateText = "State is required";
        if (!formData.GST_DateOfRegistration) newErrors.GST_DateOfRegistration = "Date required";
        if (!formData.GST_TaxpayerType.trim()) newErrors.GST_TaxpayerType = "Taxpayer type required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Submitted GST Data:", formData);
            setSnackbar({
                open: true,
                message: "GST details submitted successfully!",
                severity: "success",
            });
        } else {
            setSnackbar({
                open: true,
                message: "Please fix the errors before submitting",
                severity: "error",
            });
        }
    };

    const handleReset = () => {
        setFormData({
            gstin: "",
            legalName: "",
            state: "",
            dateOfRegistration: "",
            taxpayerType: "",
        });
        setErrors({});
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    return (
        <Box sx={{ fontFamily: "'Inter', sans-serif", marginTop: "30px", padding: "20px", border: "1px solid #e5e5e5", borderRadius: "8px" }}>

            <Box sx={{ mt: 5 }}>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        color: "#1F2937",
                        fontWeight: 700,
                        fontSize: "1.25rem",
                    }}
                >
                    GST Details
  </Typography>

                <Grid container spacing={3}>
                    {/* GST Number */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 2.5,
                                borderRadius: "12px",
                                backgroundColor: "#FAFAFA",
                                border: "1px solid #F3F4F6",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#FFF3E0",
                                    borderColor: "#FFE0B2",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                                <NumbersIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: "#6B7280",
                                        fontWeight: 600,
                                        fontFamily: "'Inter', sans-serif",
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    GST Number
          </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    color: "#1F2937",
                                    fontWeight: 500,
                                    fontSize: "0.95rem",
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                {formData.GST_number || "—"}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Legal Name */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 2.5,
                                borderRadius: "12px",
                                backgroundColor: "#FAFAFA",
                                border: "1px solid #F3F4F6",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#FFF3E0",
                                    borderColor: "#FFE0B2",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                                <BusinessCenterIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: "#6B7280",
                                        fontWeight: 600,
                                        fontFamily: "'Inter', sans-serif",
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    Legal Name
          </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    color: "#1F2937",
                                    fontWeight: 500,
                                    fontSize: "0.95rem",
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                {formData.GST_legalName || "—"}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* State */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 2.5,
                                borderRadius: "12px",
                                backgroundColor: "#FAFAFA",
                                border: "1px solid #F3F4F6",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#FFF3E0",
                                    borderColor: "#FFE0B2",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                                <LocationOnIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: "#6B7280",
                                        fontWeight: 600,
                                        fontFamily: "'Inter', sans-serif",
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    State
          </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    color: "#1F2937",
                                    fontWeight: 500,
                                    fontSize: "0.95rem",
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                {formData.GST_StateText || "—"}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Date of Registration */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 2.5,
                                borderRadius: "12px",
                                backgroundColor: "#FAFAFA",
                                border: "1px solid #F3F4F6",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#FFF3E0",
                                    borderColor: "#FFE0B2",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                                <CalendarMonthIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: "#6B7280",
                                        fontWeight: 600,
                                        fontFamily: "'Inter', sans-serif",
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    Registration Date
          </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    color: "#1F2937",
                                    fontWeight: 500,
                                    fontSize: "0.95rem",
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                {formData.GST_DateOfRegistration || "—"}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Taxpayer Type */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 2.5,
                                borderRadius: "12px",
                                backgroundColor: "#FAFAFA",
                                border: "1px solid #F3F4F6",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#FFF3E0",
                                    borderColor: "#FFE0B2",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                                <PersonIcon sx={{ color: "#FF7A00", mr: 1.5, fontSize: "1.3rem" }} />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: "#6B7280",
                                        fontWeight: 600,
                                        fontFamily: "'Inter', sans-serif",
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    Taxpayer Type
          </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    color: "#1F2937",
                                    fontWeight: 500,
                                    fontSize: "0.95rem",
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                {formData.GST_TaxpayerType || "—"}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>


        </Box>
    );
}

// ---- Styles ----
const inputStyle = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.3s ease",
        "&:hover": { backgroundColor: "#FFF8F1" },
        "&.Mui-focused": {
            backgroundColor: "#FFF8F1",
            "& fieldset": { borderColor: "#FF7A00", borderWidth: "2px" },
        },
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#E65100",
        fontWeight: 600,
    },
};

const cancelBtnStyle = {
    borderRadius: "10px",
    borderColor: "#9CA3AF",
    color: "#6B7280",
    fontWeight: 600,
    textTransform: "none",
    px: 3,
    py: 1,
    fontFamily: "'Inter', sans-serif",
    "&:hover": {
        borderColor: "#6B7280",
        backgroundColor: "#F3F4F6",
        transform: "translateY(-2px)",
    },
};

const submitBtnStyle = {
    borderRadius: "10px",
    background: "linear-gradient(135deg, #FF7A00 0%, #E65100 100%)",
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
    px: 3,
    py: 1,
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 4px 12px rgba(230, 81, 0, 0.3)",
    "&:hover": {
        background: "linear-gradient(135deg, #E65100 0%, #D84315 100%)",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 16px rgba(230, 81, 0, 0.4)",
    },
};

export default GstDetail;
