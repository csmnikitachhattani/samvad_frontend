"use client";

import { useState } from "react";
import axiosClient from "@/lib/axiosClient";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";

export default function JobForm() {
  
  const [data, setData] = useState({
    job_id: "",
   financial_year: "",
   client_ref_id: "",
   avak_ref_id: "",
    is_client_dpr: "",
    ref_no: "",
    od_servicetype_id: "",
    subject: "",
    no_of_media_count: "",
    StartDate: "",
    EndDate: "",
    ref_date: "",
    receipt_date: "",
    client_cd: "",
    client_name: "",
    office_address: "",
    Billing_client_cd: "",
    Billing_client_name: "",
    Billing_address: "",
    Billing_base_dept_code:"",
    Billing_office_level_code:"",
    Billing_office_code:"",
Billing_district_code:"",
Billing_section_code:"",
Billing_client_prarup_code:"",
section_code:"",
base_dept_code:"",
office_level_code:"",
    office_code: "",
    district_code: "",
    remarks: "",
    ip_address: "",
    entry_user_name: "nikita",
    files: "",

  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
   
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const payload = new FormData();
  
      payload.append("job_id", data.job_id ||"");
      payload.append("financial_year", data.financial_year );
      payload.append("client_ref_id", data.client_ref_id);
      payload.append("avak_ref_id", data.avak_ref_id);
      payload.append("is_client_dpr", data.is_client_dpr);
      payload.append("ref_no", data.ref_no);

      payload.append("od_servicetype_id", data.od_servicetype_id);
      payload.append("subject", data.subject);
      payload.append("StartDate", data.StartDate);
      payload.append("EndDate", data.EndDate);
      payload.append("ref_date",data.ref_date);
      payload.append("receipt_date",data.receipt_date);
      payload.append("client_cd",data.client_cd);
      payload.append("office_address", data.office_address);

      payload.append("Billing_client_cd", data.Billing_client_cd);
      payload.append("Billing_client_name", data.Billing_client_name);
      payload.append("Billing_address", data.Billing_address);
      payload.append("Billing_base_dept_code", data.Billing_base_dept_code);
      payload.append("Billing_office_level_code", data.Billing_office_level_code);
      payload.append("Billing_office_code", data.Billing_office_code);
      payload.append("Billing_district_code", data.Billing_district_code);
      payload.append("Billing_section_code", data.Billing_section_code);
      payload.append("section_code", data.section_code);
      payload.append("base_dept_code", data.base_dept_code);
      payload.append("office_level_code", data.office_level_code);
      payload.append("office_code", data.office_code);
      payload.append("district_code", data.district_code);



      payload.append("remarks", data.remarks);
      payload.append("ip_address", data.ip_address);
      payload.append("entry_user_name", data.entry_user_name);
      payload.append("entry_by_user_id", '00100');
      payload.append("client_cd", "01");
  
         // 👇 ADD CONDITION HERE (Correct place)
  if (data.od_servicetype_id === "1"){
      payload.append("no_of_media_count", data.no_of_media_count);
    }

      if (data.files) {
        payload.append("files", data.files);
      }
  
      // 🔍 Debug once
      for (let pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }
  

    // 🔥 Dynamic API selection
    const apiUrl =
      Number(data.od_servicetype_id) === "1"
        ? "http://103.79.34.50:8083/api/OutDoorMediaTransaction/dbsavecounter"
        : "http://103.79.34.50:8083/api/outDoorMediaTransaction/savecounter";

    // 🔍 Debug payload
    for (let pair of payload.entries()) {
      console.log(pair[0], pair[1]);
    }

    // ✅ Using axiosClient.post (as required)
    
  const response = await axiosClient.post(apiUrl, payload);



      console.log("SUCCESS:", response.data);
    } catch (error) {
      console.error(
        "ERROR:",
        error.response?.data || error.message
      );
    }
  };
  

  return (
    <Paper sx={{ p: 4, maxWidth: 1100, mx: "auto" }}>
      <Typography variant="h5" mb={3}>
        Job Entry Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          {/* <Grid item xs={12} md={6}>
            <TextField
              label="Job ID"
              name="job_id"
              fullWidth
              value={formData.job_id}
              onChange={handleChange}
            />
          </Grid> */}

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Financial Year"
              name="financial_year"
              fullWidth
              value={data.financial_year}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Client Ref ID"
              name="client_ref_id"
              fullWidth
              value={data.client_ref_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="AVAK Ref ID"
              name="avak_ref_id"
              fullWidth
              value={data.avak_ref_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <TextField
              select
              label="Is Client DPR"
              name="is_client_dpr"
              fullWidth
              value={data.is_client_dpr}
              onChange={handleChange}
            >
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
            </TextField>
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Ref No"
              name="ref_no"
              fullWidth
              value={data.ref_no}
              onChange={handleChange}
            />
          </Grid>

         
          <Grid item size={{xs:12, md:4}}>
  <TextField
    label="OD Service Type ID"
    type="number"
    name="od_servicetype_id"
    fullWidth
    value={data.od_servicetype_id}
    onChange={handleChange}
  />
</Grid>
        {/* 👇 SHOW ONLY WHEN SERVICE TYPE = 1 */}
{data.od_servicetype_id === "1" && (
  <Grid item size={{xs:12, md:4}}>
    <TextField
      label="NO.of media count"
      name="no_of_media_count"
      fullWidth
      value={data.no_of_media_count}
      onChange={handleChange}
    />
  </Grid>
)}

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Subject"
              name="subject"
              fullWidth
              value={data.subject}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{ xs: 12, md:4 }}>
  <TextField
    label="Start Date"
    type="date"   // 👈 change this
    name="StartDate"
    fullWidth
    InputLabelProps={{ shrink: true }}
    value={data.StartDate}
    onChange={handleChange}
  />
</Grid>

              <Grid item size={{ xs: 12, md:4 }}>
  <TextField
    label="End Date"
    type="date"   // 👈 change this
    name="EndDate"
    fullWidth
    InputLabelProps={{ shrink: true }}
    value={data.EndDate}
    onChange={handleChange}
  />
</Grid>

    <Grid item size={{ xs: 12, md:4 }}>
  <TextField
    label="Ref Date"
    type="date"   // 👈 change this
    name="ref_date"
    fullWidth
    InputLabelProps={{ shrink: true }}
    value={data.ref_date}
    onChange={handleChange}
  />
</Grid>
 <Grid item size={{ xs: 12, md:4 }}>
  <TextField
    label="receipt_date"
    type="date"   // 👈 change this
    name="receipt_date"
    fullWidth
    InputLabelProps={{ shrink: true }}
    value={data.receipt_date}
    onChange={handleChange}
  />
</Grid>

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Office Address"
              name="office_address"
              multiline
              rows={2}
              fullWidth
              value={data.office_address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Billing Address"
              name="Billing_address"
              multiline
              rows={2}
              fullWidth
              value={data.Billing_address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Billing client code"
              name="Billing_client_cd"
              multiline
             
              fullWidth
              value={data.Billing_client_cd}
              onChange={handleChange}
            />
          </Grid>
<Grid item size={{xs:12, md:4}}>
            <TextField
              label="Billing base dept code"
              name="Billing_base_dept_code"
              multiline
             
              fullWidth
              value={data.Billing_base_dept_code}
              onChange={handleChange}
            />
          </Grid>

<Grid item size={{xs:12, md:4}}>
            <TextField
              label="Billing client name"
              name="billing_client_name"
              multiline
             
              fullWidth
              value={data.Billing_client_name}
              onChange={handleChange}
            />
          </Grid>

<Grid item size={{xs:12, md:4}}>
            <TextField
              label="Billing office level code"
              name="billing_office_level_code"
              multiline
             
              fullWidth
              value={data.Billing_office_level_code}
              onChange={handleChange}
            />
          </Grid>

<Grid item size={{xs:12, md:4}}>
            <TextField
              label="Billing office code"
              name="Billing_office_code"
              multiline
             
              fullWidth
              value={data.Billing_office_code}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Billing district code"
              name="Billing_district_code"
              multiline
             
              fullWidth
              value={data.Billing_district_code}
              onChange={handleChange}
            />
          </Grid>
 <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Billing section code"
              name="Billing_section_code"
              multiline
             
              fullWidth
              value={data.Billing_section_code}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Section_code"
              name="section_code"
              multiline
             
              fullWidth
              value={data.section_code}
              onChange={handleChange}
            />
          </Grid>

           <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Base Dept code"
              name="base_dept_code"
              multiline
             
              fullWidth
              value={data.base_dept_code}
              onChange={handleChange}
            />
          </Grid>

           <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Office level code"
              name="office_level_code"
              multiline
             
              fullWidth
              value={data.office_level_code}
              onChange={handleChange}
            />
          </Grid>

  <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Office code"
              name="office_code"
              multiline
             
              fullWidth
              value={data.office_code}
              onChange={handleChange}
            />
          </Grid>

             <Grid item size={{xs:12, md:4}}>
            <TextField
              label="District code"
              name="district_code"
              multiline
             
              fullWidth
              value={data.district_code}
              onChange={handleChange}
            />
          </Grid>



          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Remarks"
              name="remarks"
              multiline
              rows={3}
              fullWidth
              value={data.remarks}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12}}>
            <Button variant="outlined" component="label" fullWidth>
              Upload File
              <input hidden type="file" name="files" onChange={handleChange} />
            </Button>
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="IP Address"
              name="ip_address"
              fullWidth
              value={data.ip_address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" size="large">
              Submit
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Paper>
  );
}
