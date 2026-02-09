"use client";

import { useState } from "react";
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
  const [formData, setFormData] = useState({
    job_id: "",
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
    entry_user_name: "",
    files: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
              value={formData.financial_year}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="Client Ref ID"
              name="client_ref_id"
              fullWidth
              value={formData.client_ref_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="AVAK Ref ID"
              name="avak_ref_id"
              fullWidth
              value={formData.avak_ref_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              select
              label="Is Client DPR"
              name="is_client_dpr"
              fullWidth
              value={formData.is_client_dpr}
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
              value={formData.ref_no}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="OD Service Type ID"
              type="number"
              name="od_servicetype_id"
              fullWidth
              value={formData.od_servicetype_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              label="Subject"
              name="subject"
              fullWidth
              value={formData.subject}
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
              value={formData.startDate}
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
              value={formData.endDate}
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
              value={formData.office_address}
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
              value={formData.billing_address}
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
              value={formData.remarks}
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
              value={formData.ip_address}
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
