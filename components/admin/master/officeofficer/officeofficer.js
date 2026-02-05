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
  ArrowUpward,
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

  // Sample data
  // const baseDepartments = ['जनसंपर्क विभाग/B024'];
  // const districts = ['रायपुर/11'];
  // const officeLevels = ['जिला कार्यालय/03'];
  // const offices = ['जनसंपर्क संचालनालय/2211030356'];
  // const sections = ['--Select Section--', 'जनसंपर्क विभाग', 'जनसंपर्क संचालनालय', 'रायपुर'];
  // const officers = ['--Select Officer--'];
  // const designations = ['--Select Designation--', 'जनसंपर्क संचालनालय'];
  // const statuses = ['Active', 'Inactive'];

  const [baseDepartments, setBaseDepartments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [officeLevels, setOfficeLevels] = useState([]);
  const [offices, setOffices] = useState([]);
  const [sections, setSections] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [fachdata, setFetchData] = useState([]);

  // const fetchOfficeLevels = async () => {
  //   const res = await axios.get(`/api/ManageMaster/getofficelevel/${deptcode}`);
  //   setOfficeLevels(res.data);
  // };

  // const fetchOffices = async () => {
  //   const res = await axios.get(`/api/ManageMaster/getofficename/${distcode}/${deptcode}`);
  //   setOffices(res.data);
  // };

  // const fetchSections = async () => {
  //   const res = await axios.get(`/api/ManageMaster/getclientsection/${distcode}/${deptcode}`);
  //   setSections(["--Select Section--", ...res.data]);
  // };

  // const fetchOfficers = async () => {
  //   const res = await axios.get(`/api/ManageMaster/getofficer/${distcode}/${deptcode}`);
  //   setOfficers(["--Select Officer--", ...res.data]);
  // };

  // const fetchDesignations = async () => {
  //   const res = await axios.get("/api/ManageMaster/getclientdesignation");
  //   setDesignations(["--Select Designation--", ...res.data]);
  // };

  // const fatchData=async()=>{
  //   const res =await axios.get(`/api/ManageMaster/getofficeofficerdata`);
  // setFetchData(res.data.data);
  // }

  // const mappedOfficers = [
  //   {
  //     id: 1,
  //     officeName: 'Chhattisgarh Samvad / (2211020419)',
  //     chiefOfficer: 'Chief Executive Officer, Chhattisgarh Samvad, रायपुर',
  //     code: '1411000658',
  //     status: 'Active',
  //   },
  //   {
  //     id: 2,
  //     officeName: 'जनसंपर्क संचालनालय / (2211030356)',
  //     chiefOfficer: 'मुख्य कार्यपालन अधिकारी, छत्तीसगढ़ संवाद, रायपुर',
  //     code: '1411000623',
  //     status: 'Active',
  //   },
  //   {
  //     id: 3,
  //     officeName: 'जनसंपर्क संचालनालय / (2211030356)',
  //     chiefOfficer: 'संचालक मुरादाबाद संवाद आयुक्त, जनसंपर्क संचालनालय, रायपुर',
  //     code: '1411000596',
  //     status: 'Active',
  //   },
  //   {
  //     id: 4,
  //     officeName: 'जनसंपर्क संचालनालय / (2211030356)',
  //     chiefOfficer: 'उप संचालक (डी.पी.), जनसंपर्क संचालनालय, रायपुर',
  //     code: '1411000612',
  //     status: 'Active',
  //   },
  // ];

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
        console.log(
          "offices:",
          `http://103.79.34.50:8083/api/ManageMaster/getofficename/${districtid}/${deptId}`,
        );
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
},[formData.district, formData.baseDepartment])

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
},[formData.district, formData.baseDepartment])


// =====================Designations======================


  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        const res = await axios.get(
          "http://103.79.34.50:8083/api/ManageMaster/getclientdesignation",
        );
        console.log("Designation:", res);

        setDesignations(res.data.result || []);
      } catch (error) {
        console.error("Error fetching Designations", error);
      }
    };
   fetchDesignation();
  }, []);



  // =========================handleChange===========

  const handleChange = (name, value) => {
    console.log("Changed:", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // when base department changes
    if (name === "baseDepartment") {
      setFormData((prev) => ({
        ...prev,
        baseDepartment: value,
        officeLevel: "", // reset office level
      }));

      setOfficeLevels(value);
    }
  };

  const handleSubmit = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

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
      {/* App Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          <Dashboard sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Office Officer Mapping System
          </Typography>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Alert */}
        <Collapse in={showAlert}>
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setShowAlert(false)}
          >
            Officer mapping saved successfully!
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
                    onChange={(e) => handleChange("district", e.target.value)}
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
    onChange={(e) => handleChange("officeLevel", e.target.value)}
    disabled={!formData.baseDepartment}
  >
    {/* ALWAYS present */}
    <MenuItem value="">
      Select Office Level
    </MenuItem>

    {Array.isArray(officeLevels) &&
      officeLevels.map((offLevel, index) => (
        <MenuItem
          key={index}
          value={offLevel.officeLevelCode}
        >
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
        <MenuItem
          key={index}
             value={offic.newOfficeCode}
        >
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
     sections.map((clirntsec,index) => (
        <MenuItem
          key={index}
                        value={clirntsec.sectionCode}
        >
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
  officers.map((officr,index) => (
        <MenuItem
          key={index}
                        value={officr.employeeId}
        >
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

  
                {/* Status */}
                {/*================ status ================== */}

                {/* <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
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

                  {/*================ Base Department================== */}

                {/* <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
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
                </Grid> */} 



              </Grid>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={handleClear}
                  sx={{
                    borderColor: '#667eea',
                    color: '#667eea',
                    '&:hover': {
                      borderColor: '#764ba2',
                      bgcolor: 'rgba(102, 126, 234, 0.04)',
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
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
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
        <Fade in={true}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <Box
              sx={{
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                p: 3,
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                List Of Mapped Office In जनसंपर्क विभाग/B024, रायपुर/11
              </Typography>
            </Box>

            <Collapse in={showTable}>
              {/* <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 600, color: '#667eea' }}>Office Name</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#667eea' }}>Officer Name</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#667eea' }}>Officer Code</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#667eea' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {fatchData.map((officer, index) => (
                      <TableRow
                        key={officer.id}
                        sx={{
                          '&:hover': { bgcolor: '#f8f9fa' },
                          transition: 'all 0.2s',
                        }}
                      >
                        <TableCell>{officer.officeName}</TableCell>
                        <TableCell>{officer.chiefOfficer}</TableCell>
                        <TableCell>
                          <Chip
                            label={officer.code}
                            size="small"
                            sx={{
                              bgcolor: '#e3f2fd',
                              color: '#1976d2',
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
              </TableContainer> */}
            </Collapse>

            <Box sx={{ p: 2, bgcolor: "#f8f9fa", textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Prarup Code: <strong>10340</strong>
              </Typography>
            </Box>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default OfficerMappingUI;
