"use client";

import React, { useState, useEffect, use } from "react";

import axios from "axios";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Grid,
  Container,
  AppBar,
  Toolbar,
  InputAdornment,
  Collapse,
  Alert,
  Fade,
  Zoom,
} from "@mui/material";

import {
  Search,
  Clear,
  Refresh,
  Visibility,
  VisibilityOff,
  ArrowCircleUp,
  ArrowDownward,
  FilterList,
  CheckCircle,
  Settings,
  Dashboard,
} from "@mui/icons-material";
import { Section } from "lucide-react";

const OfficerMappingUI = () => {
  const [formData, setFormData] = useState({
    baseDepartment: "",
    district: "",
    officeLevel: "",
    office: "",
    section: "",
    officer: "",
    designation: "",
    commission: "",
    discountPercentage: "",
    status: "",
    fatchData: [],
  });

  const [showTable, setShowTable] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const [baseDepartments, setBaseDepartments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [officeLevels, setOfficeLevels] = useState([]);
  const [offices, setOffices] = useState([]);
  const [sections, setSections] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [officeofficerdatas, setOfficeOfficerData] = useState([]);
  const [prarupMaster, setPrarupMaster] = useState([]);
  const [officerPrarupDetails, setOfficerPrarupDetail] = useState([]);

  // ==================base department fetching========================
  useEffect(() => {
    const fetchBaseDepartments = async () => {
      try {
        const res = await axios.get(
          "http://103.79.34.50:8083/api/ManageMaster/getdepartmentname",
        );
        console.log("Base Departments:", res);
        setBaseDepartments(res.data.result || []);
      } catch (error) {
        console.error("Error fetching base departments", error);
      }
    };
    fetchBaseDepartments();
  }, []);

  // ==================district fetching========================

  useEffect(() => {
    const fatchdistricts = async () => {
      try {
        const res = await axios.get(
          "http://103.79.34.50:8083/api/ManageMaster/getdistrictname",
        );
        console.log("district:", res);
        setDistricts(res.data.result || []);
      } catch (error) {
        console.error("Error fetching base departments", error);
      }
    };
    fatchdistricts();
  }, []);

  // =================Office Level fetching based on selected base department========================
  useEffect(() => {
    const fetchOfficeLevels = async (deptId) => {
      if (!deptId) {
        setOfficeLevels([]);

        return;
      }

      try {
        const res = await axios.get(
          `http://103.79.34.50:8083/api/ManageMaster/getofficelevel/${deptId}`,
        );

        setOfficeLevels(res.data.result || []);
      } catch (error) {
        console.error("Error fetching office levels", error);
      }
    };
    fetchOfficeLevels(formData.baseDepartment);
  }, [formData.baseDepartment]);

  // ==================fatch offices======================

  useEffect(() => {
    const fatchOffices = async (districtid, deptId) => {
      if (!districtid || !deptId) {
        setOffices([]);

        return;
      }

      try {
        const res = await axios.get(
          `http://103.79.34.50:8083/api/ManageMaster/getofficename/${districtid}/${deptId}`,
        );
        // console.log(
        //   "offices:",
        //   `http://103.79.34.50:8083/api/ManageMaster/getofficename/${districtid}/${deptId}`,
        // );
        setOffices(res.data.result || []);
      } catch (error) {
        console.error("Error fetching office levels", error);
      }
    };
    fatchOffices(formData.district, formData.baseDepartment);
  }, [formData.district, formData.baseDepartment]);

  // =======================Section fetching========================
  useEffect(() => {
    const fetchSections = async (districtid, deptId) => {
      if (!districtid || !deptId) {
        setSections([]);
        return;
      }
      try {
        const res = await axios.get(
          `http://103.79.34.50:8083/api/ManageMaster/getclientsection/${districtid}/${deptId}`,
        );
        console.log(
          "Sections:",
          `http://103.79.34.50:8083/api/ManageMaster/getclientsection/${districtid}/${deptId}`,
        );
        setSections(res.data.result || []);
      } catch (error) {
        console.error("Error fetching Sections", error);
      }
    };
    fetchSections(formData.district, formData.baseDepartment);
  }, [formData.district, formData.baseDepartment]);

  // =================================officer fetching========================

  useEffect(() => {
    const fetchOfficer = async (districtid, deptId) => {
      if (!districtid || !deptId) {
        setOfficers([]);
        return;
      }
      try {
        const res = await axios.get(
          `http://103.79.34.50:8083/api/ManageMaster/getofficer/${districtid}/${deptId}`,
        );
        console.log(
          "Sections:",
          `http://103.79.34.50:8083/api/ManageMaster/getofficer/${districtid}/${deptId}`,
        );
        setOfficers(res.data.result || []);
      } catch (error) {
        console.error("Error fetching Officer", error);
      }
    };
    fetchOfficer(formData.district, formData.baseDepartment);
  }, [formData.district, formData.baseDepartment]);

  // =====================Designations======================

  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        const res = await axios.get(
          "http://103.79.34.50:8083/api/ManageMaster/getclientdesignation",
        );
        console.log("Designation:", res.data.result);

        setDesignations(res.data.result || []);
      } catch (error) {
        console.error("Error fetching Designations", error);
      }
    };
    fetchDesignation();
  }, []);

  // ============================

  useEffect(() => {
    if (!formData.baseDepartment || !formData.district) {
      console.log("Waiting for baseDepartment & district...");
      return;
    }

    const fetchOfficeOfficerData = async () => {
      console.log("📌 fetchOfficeOfficerData called with params 👉");

      const rawPayload = {
        baseDeptCode: formData.baseDepartment,
        sno: "",
        districtCode: formData.district,
        officeLevel: formData.officeLevel,
        officeCode: formData.office,
        sectionCode: formData.section,
        employeeCode: formData.officer,
        designationId: formData.designation,
      };

      // Remove null, undefined, empty string, whitespace
      const payload = Object.fromEntries(
        Object.entries(rawPayload).filter(
          ([_, value]) =>
            value !== null &&
            value !== undefined &&
            String(value).trim() !== "",
        ),
      );

      console.log("Clean Payload 👉", payload);

      try {
        console.log("📤 API REQUEST BODY 👉", payload);

        const res = await axios.post(
          "http://103.79.34.50:8083/api/ManageMaster/getofficeofficerdata",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        // console.log("📥 RAW API RESPONSE 👉", res.data.result.officerList);

        setOfficeOfficerData(res.data?.result.officerList || []);
        // setPrarupMaster(res.data?.result.prarupMaster|| []);

        setPrarupMaster(
          (res.data?.result.prarupMaster || []).map((item) => ({
            ...item,
            isVisible: true, // default visible
          })),
        );

        setOfficerPrarupDetail(res.data?.result.officerPrarupDetail || []);
        console.log(
          "✅ Processed Office Officer Data 👉",
          setOfficeOfficerData,
        );
      } catch (error) {
        console.error(
          " OfficeOfficer API ERROR",
          error.response?.data || error.message,
        );
      }
    };

    //  Call the function here (outside definition)
    fetchOfficeOfficerData();
  }, [
    formData.baseDepartment,
    formData.district,
    formData.officeLevel,
    formData.office,
    formData.section,
    formData.officer,
    formData.designation,
  ]);

  // ====================================================================
  const selectedDepartment = baseDepartments.find(
    (dept) => dept.deptid === formData.baseDepartment,
  );

  const selectedDistrict = districts.find(
    (dist) => dist.dstrictid === formData.district,
  );

  // =======up down==================================

  const moveRowUp = (index) => {
    if (index === 0) return;

    const updatedData = [...prarupMaster];

    // Swap rows
    [updatedData[index - 1], updatedData[index]] = [
      updatedData[index],
      updatedData[index - 1],
    ];

    // Re-assign sequence to ALL rows
    const reSequencedData = updatedData.map((item, i) => ({
      ...item,
      seq: i + 1,
    }));

    setPrarupMaster(reSequencedData);
  };

  const moveRowDown = (index) => {
    if (index === prarupMaster.length - 1) return;

    const updatedData = [...prarupMaster];

    // Swap rows
    [updatedData[index + 1], updatedData[index]] = [
      updatedData[index],
      updatedData[index + 1],
    ];

    // Re-assign sequence to ALL rows
    const reSequencedData = updatedData.map((item, i) => ({
      ...item,
      seq: i + 1,
    }));

    setPrarupMaster(reSequencedData);
  };

  // =====================hide show========================
  const toggleVisibility = (index) => {
    const updatedData = [...prarupMaster];
    updatedData[index].isVisible = !updatedData[index].isVisible;
    setPrarupMaster(updatedData);
  };
  const prarupCode = Array.isArray(prarupMaster)
    ? prarupMaster.map((item) => (item.isVisible ? item.DisplayID : 0)).join("")
    : "";

  // =========================================================
  const handleChange = (name, value) => {
    console.log("Changed:", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "baseDepartment" && {
        officeLevel: "",
        office: "",
        section: "",
        officer: "",
      }),
    }));
    console.log("Dropdown changed:", name, value, formData.district);
  };
  // ===============handel submit ==============

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      baseDeptCode: formData.baseDepartment,
      districtCode: formData.district,
      officeLevel: formData.officeLevel,
      officeCode: formData.office,
      sectionCode: formData.section,
      employeeCode: formData.officer,
      designationId: formData.designation,

      prarupCode: prarupCode,

      prarupDetails: prarupMaster.map((item, index) => ({
        seq: index + 1,
        displayId: item.DisplayID,
        isVisible: item.isVisible ? 1 : 0,
      })),
    };

    try {
      setLoading(true);

      console.log("📤 FINAL SUBMIT PAYLOAD:", payload);

      const response = await axios.post(
        "http://103.79.34.50:8083/api/ManageMaster/saveofficeofficer",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setAlertMessage(response.data?.message || "Saved successfully!");
      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      console.error("Submit error:", error);

      setAlertMessage(error.response?.data?.message || "Failed to save data!");
      setAlertType("error");
      setShowAlert(true);
    } finally {
      setLoading(false);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };
  // =================================================
  const handleClear = () => {
    setFormData({
      baseDepartment: "",
      district: "",
      officeLevel: "",
      office: "",
      section: "",
      officer: "",
      designation: "",
      commission: "",
      discountPercentage: "",
      status: " ",
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Alert */}
        <Collapse in={showAlert}>
          <Alert
            severity={alertType}
            sx={{ mb: 3 }}
            onClose={() => setShowAlert(false)}
          >
            {alertMessage}
          </Alert>
        </Collapse>

        {/* Form Card */}
        <Zoom in={true}>
          <Card
            elevation={3}
            sx={{ mb: 4, borderRadius: 3, overflow: "visible" }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                p: 3,
                color: "white",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
              >
                <FilterList sx={{ mr: 1 }} />
                Officer Mapping Form
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                All mandatory fields are marked with asterisk (*)
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                {/*================ Base Department================== */}

                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Base Department"
                    required
                    value={formData.baseDepartment}
                    onChange={(e) =>
                      handleChange("baseDepartment", e.target.value)
                    }
                    variant="outlined"
                  >
                    {Array.isArray(baseDepartments) &&
                      baseDepartments.map((dept, index) => (
                        <MenuItem key={index} value={dept.deptid}>
                          {dept.deptname}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                {/* ========================District============= */}
                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="District"
                    required
                    value={formData.district}
                    onChange={(e) => {
                      handleChange("district", e.target.value);
                    }}
                    variant="outlined"
                  >
                    {Array.isArray(districts) &&
                      districts.map((dist, index) => (
                        // <MenuItem key={index} value={String(dist.districtid)}>
                        <MenuItem key={index} value={dist.dstrictid}>
                          {dist.districtname}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                {/*==================== Office Level */}
                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Office Level"
                    required
                    value={formData.officeLevel || ""}
                    onChange={(e) =>
                      handleChange("officeLevel", e.target.value)
                    }
                    disabled={!formData.baseDepartment}
                  >
                    {/* ALWAYS present */}
                    <MenuItem value="">Select Office Level</MenuItem>

                    {Array.isArray(officeLevels) &&
                      officeLevels.map((offLevel, index) => (
                        <MenuItem key={index} value={offLevel.officeLevelCode}>
                          {offLevel.officeLevelName}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                {/* ====================Office========= */}
                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Office"
                    required
                    value={formData.office}
                    onChange={(e) => handleChange("office", e.target.value)}
                    disabled={!formData.baseDepartment || !formData.district}
                  >
                    {Array.isArray(offices) &&
                      offices.map((offic, index) => (
                        <MenuItem key={index} value={offic.newOfficeCode}>
                          {offic.officeName}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                {/* ====================Section========= */}
                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Section"
                    required
                    value={formData.section}
                    onChange={(e) => handleChange("section", e.target.value)}
                    disabled={!formData.baseDepartment || !formData.district}
                  >
                    {Array.isArray(sections) &&
                      sections.map((clirntsec, index) => (
                        <MenuItem key={index} value={clirntsec.sectionCode}>
                          {clirntsec.sectionName}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                {/* ==============================officer================ */}
                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Officer"
                    required
                    value={formData.officer}
                    onChange={(e) => handleChange("officer", e.target.value)}
                    disabled={!formData.baseDepartment || !formData.district}
                  >
                    {Array.isArray(officers) &&
                      officers.map((officr, index) => (
                        <MenuItem key={index} value={officr.employeeId}>
                          {officr.employeeName}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                {/*================ Designations================== */}

                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Designation"
                    required
                    value={formData.designation}
                    onChange={(e) =>
                      handleChange("designation", e.target.value)
                    }
                    variant="outlined"
                  >
                    {Array.isArray(designations) &&
                      designations.map((desig, index) => (
                        <MenuItem key={index} value={desig.designationId}>
                          {desig.designationName}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                {/*================ commission ================== */}

                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Commision Percentage
                  </Typography>

                  <Typography variant="body1" fontWeight={600}>
                    {baseDepartments.find(
                      (dept) => dept.deptid === formData.baseDepartment,
                    )?.commisionPercentage || ""}
                  </Typography>
                </Grid>

                {/* ===================discountPercentage================== */}
                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Discount Percentage
                  </Typography>

                  <Typography variant="body1" fontWeight={600}>
                    {baseDepartments.find(
                      (dept) => dept.deptid === formData.baseDepartment,
                    )?.discountPercent || "0"}
                  </Typography>
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 4,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={handleClear}
                  sx={{
                    borderColor: "#667eea",
                    color: "#667eea",
                    "&:hover": {
                      borderColor: "#764ba2",
                      bgcolor: "rgba(102, 126, 234, 0.04)",
                    },
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckCircle />}
                  onClick={handleSubmit}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Zoom>

        {/* Mapped Officers Table */}

        {formData.baseDepartment && formData.district && (
          <Fade in={true}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  p: 3,
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h7" sx={{ fontWeight: 600 }}>
                  {selectedDepartment && selectedDistrict
                    ? `${selectedDepartment.deptname}/${selectedDepartment.deptid}, ${selectedDistrict.districtname}/${selectedDistrict.dstrictid}`
                    : "List Of Mapped Office"}
                </Typography>
              </Box>

              <Collapse in={showTable}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                        <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                          Office Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                          Officer Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                          Officer Code
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(officeofficerdatas) &&
                        officeofficerdatas.map((officer, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:hover": { bgcolor: "#f8f9fa" },
                              transition: "all 0.2s",
                            }}
                          >
                            <TableCell>{officer.OfficeName}</TableCell>
                            <TableCell>{officer.OfficerName}</TableCell>
                            <TableCell>
                              <Chip
                                label={officer.OfficerCode}
                                size="small"
                                sx={{
                                  bgcolor: "#e3f2fd",
                                  color: "#1976d2",
                                  fontWeight: 500,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={officer.status}
                                size="small"
                                color="success"
                                icon={<CheckCircle />}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Collapse>
            </Card>
          </Fade>
        )}
        {/* ===================prarupMaster============================== */}
        {formData.baseDepartment &&
          formData.district &&
          formData.officeLevel &&
          formData.office && (
            <Fade in={true}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                        <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                          Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                          Seq.
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                          Pearup Type Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                          Display Seq.
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                          Up-Down
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                          Hide Show
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {Array.isArray(prarupMaster) &&
                        prarupMaster.map((prpmaster, index) => (
                          <TableRow
                            key={prpmaster.SeqID}
                            sx={{
                              "&:hover": { bgcolor: "#f8f9fa" },
                              transition: "all 0.2s",
                            }}
                          >
                            <TableCell>{prpmaster.OfficeName}</TableCell>

                            {/* ✅ Seq column fixed by index */}
                            <TableCell>{index + 1}</TableCell>

                            <TableCell>
                              <Chip
                                label={prpmaster.Prarup_type_name}
                                size="small"
                                sx={{
                                  bgcolor: "#e3f2fd",
                                  color: "#1976d2",
                                  fontWeight: 500,
                                }}
                              />
                            </TableCell>

                            <TableCell>
                              <Chip
                                label={prpmaster.DisplayID}
                                size="small"
                                sx={{
                                  bgcolor: "#e3f2fd",
                                  color: "#1976d2",
                                  fontWeight: 500,
                                }}
                              />
                            </TableCell>

                            {/* UP DOWN */}
                            <TableCell>
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => moveRowUp(index)}
                                disabled={index === 0}
                                sx={{ mr: 1 }}
                              >
                                ↑ Up
                              </Button>

                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => moveRowDown(index)}
                                disabled={index === prarupMaster.length - 1}
                              >
                                ↓ Down
                              </Button>
                            </TableCell>

                            {/* SHOW / HIDE */}
                            <TableCell>
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => toggleVisibility(index)}
                                sx={{
                                  backgroundColor: prpmaster.isVisible
                                    ? "#2e7d32"
                                    : "#d32f2f",
                                  "&:hover": {
                                    backgroundColor: prpmaster.isVisible
                                      ? "#1b5e20"
                                      : "#9a0007",
                                  },
                                }}
                              >
                                {prpmaster.isVisible ? "👁 Show" : "🚫 Hide"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>

                  <Box sx={{ p: 2, bgcolor: "#f8f9fa", textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Prarup Code: <strong>{prarupCode}</strong>
                    </Typography>
                  </Box>
                </TableContainer>
              </Card>
            </Fade>
          )}

        {/* =======================officerPrarupDetail============================== */}
        {formData.baseDepartment &&
          formData.district &&
          formData.officeLevel &&
          formData.office && (
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                      <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                        Unit id
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                        Base Depatment
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                        District
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                        Office
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                        Officer
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                        Prarup Code
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>
                        Prarup
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {Array.isArray(officerPrarupDetails) &&
                      officerPrarupDetails.map((prpmaster, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:hover": { bgcolor: "#f8f9fa" },
                            transition: "all 0.2s",
                          }}
                        >
                          <TableCell>{prpmaster.sno}</TableCell>

                          {/* ✅ Seq column fixed by index */}
                          <TableCell>{prpmaster.dept_name}</TableCell>
                          <TableCell>{prpmaster.District_Name}</TableCell>
                          <TableCell>{prpmaster.OfficeName}</TableCell>
                          <TableCell>{prpmaster.OfficerName}</TableCell>
                          <TableCell>{prpmaster.praup}</TableCell>
                          <TableCell>{prpmaster.prarup_code}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}
      </Container>
    </Box>
  );
};

export default OfficerMappingUI;
