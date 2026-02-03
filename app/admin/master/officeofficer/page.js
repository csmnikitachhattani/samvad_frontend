"use client"

import React, { useState } from 'react';

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
} from '@mui/material';

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
} from '@mui/icons-material';

const OfficerMappingUI = () => {
  const [formData, setFormData] = useState({
    baseDepartment: '',
    district: '',
    officeLevel: '',
    office: '',
    section: '',
    officer: '',
    designation: '',
    commission: '',
    discountPercentage: '',
    status: '',
    fatchData:[],
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





const getBaseDepartments = async () => {
  const res = await axios.get("/api/ManageMaster/getdepartmentname");
  setBaseDepartments(res.data);
};



const getDistricts = async () => {
  const res = await axios.get("/api/ManageMaster/getdistrictname");
  setDistricts(res.data);
};

const fetchOfficeLevels = async () => {
  const res = await axios.get(`/api/ManageMaster/getofficelevel/${deptcode}`);
  setOfficeLevels(res.data);
};

const fetchOffices = async () => {
  const res = await axios.get(`/api/ManageMaster/getofficename/${distcode}/${deptcode}`);
  setOffices(res.data);
};

const fetchSections = async () => {
  const res = await axios.get(`/api/ManageMaster/getclientsection/${distcode}/${deptcode}`);
  setSections(["--Select Section--", ...res.data]);
};

const fetchOfficers = async () => {
  const res = await axios.get(`/api/ManageMaster/getofficer/${distcode}/${deptcode}`);
  setOfficers(["--Select Officer--", ...res.data]);
};

const fetchDesignations = async () => {
  const res = await axios.get("/api/ManageMaster/getclientdesignation");
  setDesignations(["--Select Designation--", ...res.data]);
};

const fatchData=async()=>{
  const res =await axios.get(`/api/ManageMaster/getofficeofficerdata`);
setFetchData(res.data.data);
}



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

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleClear = () => {
    setFormData({
      baseDepartment: '',
      district: '',
      officeLevel: '',
      office: '',
      section: '',
      officer: '',
      designation: '',
      commission: '5',
      discountPercentage: '10.00',
      status: 'Active',
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* App Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#1976d2' }}>
        <Toolbar>
          <Dashboard sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
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
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setShowAlert(false)}>
            Officer mapping saved successfully!
          </Alert>
        </Collapse>

        {/* Form Card */}
        <Zoom in={true}>
          <Card elevation={3} sx={{ mb: 4, borderRadius: 3, overflow: 'visible' }}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                p: 3,
                color: 'white',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <FilterList sx={{ mr: 1 }} />
                Officer Mapping Form
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                All mandatory fields are marked with asterisk (*)
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                {/* Base Department */}
                <Grid item size={{xs:12, md:6,lg:4}}>
                  <TextField
                    select
                    fullWidth
                    label="Base Department"
                    required
                    value={formData.fetchBaseDepartments}
                    onChange={(e) => handleChange('baseDepartment', e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea' },
                      },
                    }}
                  >
                    {getBaseDepartments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* District */}
                <Grid item size={{xs:12, md:6,lg:4}}>
                  <TextField
                    select
                    fullWidth
                    label="District"
                    required
                    value={formData.getDistricts}
                    onChange={(e) => handleChange('district', e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea' },
                      },
                    }}
                  >
                    {getDistricts.map((dist) => (
                      <MenuItem key={dist} value={dist}>
                        {dist}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Office Level */}
                <Grid item size={{xs:12, md:6,lg:4}}>
                  <TextField
                    select
                    fullWidth
                    label="Office Level"
                    required
                    value={formData.officeLevel}
                    onChange={(e) => handleChange('officeLevel', e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea' },
                      },
                    }}
                  >
                    {officeLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Office */}
                <Grid item size= {{xs:12, md:6, lg:4}}>
                  <TextField
                    select
                    fullWidth
                    label="Office"
                    required
                    value={formData.office}
                    onChange={(e) => handleChange('office', e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea' },
                      },
                    }}
                  >
                    {offices.map((office) => (
                      <MenuItem key={office} value={office}>
                        {office}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Section */}
                <Grid item size={{xs:12, md:6, lg:4}}>
                  <TextField
                    select
                    fullWidth
                    label="Section"
                    value={formData.section}
                    onChange={(e) => handleChange('section', e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea' },
                      },
                    }}
                  >
                    {sections.map((section) => (
                      <MenuItem key={section} value={section}>
                        {section}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Officer */}
                <Grid item size={{ xs:12, md:6,lg:4}}>
                    <TextField
                    select
                    fullWidth
                    label="Officer"
                    required
                    value={formData.officer}
                    onChange={(e) => handleChange('officer', e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea' },
                      },
                    }}
                  >
                    {officers.map((officer) => (
                      <MenuItem key={officer} value={officer}>
                        {officer}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Designation */}
                <Grid item size={{xs:12, md:6, lg:4}}>
                  <TextField
                    select
                    fullWidth
                    label="Designation"
                    value={formData.designation}
                    onChange={(e) => handleChange('designation', e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea' },
                      },
                    }}
                  >
                    {designations.map((designation) => (
                      <MenuItem key={designation} value={designation}>
                        {designation}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Commission Percentage */}
                <Grid item size={{xs:12, md:6, lg:4}}>
                  <TextField
                    fullWidth
                    label="Commission Percentage"
                    required
                    type="number"
                    value={formData.commission}
                    onChange={(e) => handleChange('commission', e.target.value)}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea' },
                      },
                    }}
                  />
                </Grid>

                {/* Discount Percentage */}
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    fullWidth
                    label="Discount Percentage"
                    type="number"
                    value={formData.discountPercentage}
                    onChange={(e) => handleChange('discountPercentage', e.target.value)}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea' },
                      },
                    }}
                  />
                </Grid>

                {/* Status */}
                <Grid item xs={12} md={6} lg={4}>
                  {/* <TextField
                    select
                    fullWidth
                    label="Status"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea' },
                      },
                    }}
                  >
                    {fat.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField> */}

                  <TextField
  select
  fullWidth
  label="Status"
  value={formData.status}
  onChange={(e) => handleChange('status', e.target.value)}
  variant="outlined"
  sx={{
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': { borderColor: '#667eea' },
      '&.Mui-focused fieldset': { borderColor: '#667eea' },
    },
  }}
>
  {[...new Set(fachdata.map(item => item.status))].map((status) => (
    <MenuItem key={status} value={status}>
      {status}
    </MenuItem>
  ))}
</TextField>

                </Grid>
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
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                p: 3,
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                List Of Mapped Office In जनसंपर्क विभाग/B024, रायपुर/11
              </Typography>
             
            </Box>

            <Collapse in={showTable}>
              <TableContainer>
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
              </TableContainer>
            </Collapse>

            <Box sx={{ p: 2, bgcolor: '#f8f9fa', textAlign: 'center' }}>
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