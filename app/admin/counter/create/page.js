"use client";

import { useState,useEffect } from "react";

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
    job_id: "2",
    financial_year: "",
    client_ref_id: "",
    avak_ref_id: "",
    is_client_dpr: "",
    ref_no: "",
    od_servicetype_id: "",
    subject: "",
    startDate: "",
    endDate: "",
    ref_date: "",
    receipt_date: "",
    client_cd: "00100",
    client_name: "",
    office_address: "",
    billing_client_cd: "",
    billing_client_name: "",
    billing_address: "",
    office_code: "",
    district_code: "",
    remarks: "",
    ip_address: "", 
    entry_user_name: "nikita",
    files: null,
   no_of_media_count: "",
  });



  useEffect(() => {
  const getUserIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();

      setData((prev) => ({
        ...prev,
        ip_address: data.ip,
      }));
    } catch (error) {
      console.error("IP fetch error:", error);
    }
  };

  getUserIP();
}, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      // Append all required fields safely
      Object.keys(data).forEach((key) => {
        if (
          data[key] !== "" &&
          data[key] !== null &&
          data[key] !== undefined &&
          key !== "files"
        ) {
          payload.append(key, data[key]);
        }
      });

      //  Mandatory static fields (as per your API)
      payload.append("entry_by_user_id", "00100");

      //  Conditional field
      if (Number(data.od_servicetype_id) === 1) {
        payload.append("no_of_media_count", data.no_of_media_count);
      }

      //  File upload (only if exists)
      if (data.files) {
        payload.append("files", data.files);
      }

  
      const apiUrl =
        Number(data.od_servicetype_id) === 1
          ? "http://103.79.34.50:8083/api/OutDoorMediaTransaction/dbsavecounter"
          :  "http://103.79.34.50:8083/api/outDoorMediaTransaction/savecounter";

      // 🔍 Debug Payload
      for (let pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axiosClient.post(apiUrl, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("SUCCESS:", response.data);
      alert("Form Submitted Successfully!");
    } catch (error) {
      console.error(
        "ERROR:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.title ||
          "Submission Failed! Check required fields."
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
          <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Financial Year"
              name="financial_year"
              fullWidth
              value={data.financial_year}
              onChange={handleChange}
              required
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
              required
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
              required
            />
          </Grid>

          {/* Show only when service type = 1 */}
         
{data.od_servicetype_id === "1" && (
  <Grid item xs={12} md={6}>
    <TextField
      label="No. of Media Count"
      name="no_of_media_count"
      type="number"
      fullWidth
      value={data.no_of_media_count}
      onChange={handleChange}
      required
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

        <Grid item size={{xs:12, md:4}}>
            <TextField
              label="Start Date"
              type="date"
              name="startDate"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={data.startDate}
              onChange={handleChange}
            />
          </Grid>
 <Grid item size={{xs:12, md:4}}>
            <TextField
              label="End Date"
              type="date"
              name="endDate"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={data.endDate}
              onChange={handleChange}
            />
          </Grid>

 <Grid item size={{xs:12}}>
            <Button variant="outlined" component="label" fullWidth>
              Upload File
              <input hidden type="file" name="files" onChange={handleChange} />
            </Button>
          </Grid>

<input type="hidden" name="ip_address" value={data.ip_address} />
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