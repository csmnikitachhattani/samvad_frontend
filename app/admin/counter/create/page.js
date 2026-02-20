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
import {  useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";


export default function JobForm() {
  const router = useRouter();
  const dispatch = useDispatch();
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
    client_cd: "",
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
  
      payload.append("job_id", data.job_id);
      payload.append("financial_year", data.financial_year);
      payload.append("client_ref_id", data.client_ref_id);
      payload.append("avak_ref_id", data.avak_ref_id);
      payload.append("is_client_dpr", data.is_client_dpr);
      payload.append("ref_no", data.ref_no);
      payload.append("od_servicetype_id", data.od_servicetype_id);
      payload.append("subject", data.subject);
      payload.append("startDate", data.startDate);
      payload.append("endDate", data.endDate);
      payload.append("office_address", data.office_address);
      payload.append("billing_address", data.billing_address);
      payload.append("remarks", data.remarks);
      payload.append("ip_address", data.ip_address);
      payload.append("entry_user_name", data.entry_user_name);
      payload.append("entry_by_user_id", '00100');
      payload.append("client_cd", "00020");
  
      if (data.files) {
        payload.append("files", data.files);
      }
  
      // 🔍 Debug once
      for (let pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      const response = await axiosClient.post(
        "http://103.79.34.50:8083/api/outDoorMediaTransaction/savecounter",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(showNotification({ message: "Saved!", severity: "success" }))
      router.push(`/admin/counter`)
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
{/* 
          <Grid item xs={12} md={6}>
            <TextField
              label="Job ID"
              name="job_id"
              fullWidth
              value={formData.job_id}
              onChange={handleChange}
            />
          </Grid> */}

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="Financial Year"
              name="financial_year"
              fullWidth
              value={data.financial_year}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="Client Ref ID"
              name="client_ref_id"
              fullWidth
              value={data.client_ref_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="AVAK Ref ID"
              name="avak_ref_id"
              fullWidth
              value={data.avak_ref_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              select
              label="Is Client DPR"
              name="is_client_dpr"
              fullWidth
              value={data.is_client_dpr}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="Ref No"
              name="ref_no"
              fullWidth
              value={data.ref_no}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="OD Service Type ID"
              type="number"
              name="od_servicetype_id"
              fullWidth
              value={data.od_servicetype_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="Subject"
              name="subject"
              fullWidth
              value={data.subject}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="Start Date"
              type="datetime-local"
              name="startDate"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={data.startDate}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="End Date"
              type="datetime-local"
              name="endDate"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={data.endDate}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
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

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="Billing Address"
              name="billing_address"
              multiline
              rows={2}
              fullWidth
              value={data.billing_address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
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

          <Grid item size={{xs:12, md:6}}>
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
