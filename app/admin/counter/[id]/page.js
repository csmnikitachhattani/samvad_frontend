"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import adminServices from "@/services/adminServices";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function WorkOrderForm() {
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    async function fetchCounters() {
        try {
            const response = await adminServices.getcounterDetail(id);
            setData(response || []);
            console.log(response)
        } catch (error) {
            console.error("Failed to fetch states", error);
        }
    }
    fetchCounters();
}, []);
  const [formData, setFormData] = useState({
    main_id: 0,
    financial_year: "",
    avak_ref_id: "",
    job_no: "",
    wo_subject: "",
    dpr_job_ref_no: "",
    wo_date: "",
    vendor_id: "",
    vendor_name: "",
    client_cd: "",
    billing_Client_cd: "",
    billing_office_code: "",
    client_grp_cd: "",
    od_servicetype_id: 0,
    start_date: "",
    end_date: "",
    commision_Percentage: 0,
    commission_amount: 0,
    amount_with_commission: 0,
    gst_percentage: "",
    gst_amount: 0,
    toatl_amount: 0,
    entry_ip_address: "",
    entry_by_user_id: "",
    entry_by_username: "",
    detailList: [
      {
        display_board_id: 0,
        description: "",
        rate: 0,
        media_unit_count: 0,
        no_of_spot: 0,
        total_rate: 0,
        start_date: "",
        end_date: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...formData.detailList];
    updatedDetails[index][name] = value;
    setFormData({ ...formData, detailList: updatedDetails });
  };

  const addRow = () => {
    setFormData({
      ...formData,
      detailList: [
        ...formData.detailList,
        {
          display_board_id: 0,
          description: "",
          rate: 0,
          media_unit_count: 0,
          no_of_spot: 0,
          total_rate: 0,
          start_date: "",
          end_date: "",
        },
      ],
    });
  };

  const removeRow = (index) => {
    const updated = formData.detailList.filter((_, i) => i !== index);
    setFormData({ ...formData, detailList: updated });
  };

  const handleSubmit = () => {
    console.log("Payload:", formData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Work Order Form
      </Typography>

      {/* MAIN DETAILS */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField fullWidth label="Financial Year" name="financial_year" value={formData.financial_year} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="AVAK Ref ID" name="avak_ref_id" value={formData.avak_ref_id} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="Job No" name="job_no" value={formData.job_no} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="WO Subject" name="wo_subject" value={formData.wo_subject} onChange={handleChange} />
        </Grid>

        <Grid item xs={3}>
          <TextField type="date" fullWidth label="WO Date" InputLabelProps={{ shrink: true }} name="wo_date" value={formData.wo_date} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="Vendor Name" name="vendor_name" value={formData.vendor_name} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="Client Code" name="client_cd" value={formData.client_cd} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="Billing Client Code" name="billing_Client_cd" value={formData.billing_Client_cd} onChange={handleChange} />
        </Grid>

        <Grid item xs={3}>
          <TextField type="number" fullWidth label="Commission %" name="commision_Percentage" value={formData.commision_Percentage} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField type="number" fullWidth label="GST Amount" name="gst_amount" value={formData.gst_amount} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField type="number" fullWidth label="Total Amount" name="toatl_amount" value={formData.toatl_amount} onChange={handleChange} />
        </Grid>
      </Grid>

      {/* DETAIL LIST */}
      <Typography variant="h6" mt={4} mb={2}>
        Detail List
      </Typography>

      {formData.detailList.map((row, index) => (
        <Grid container spacing={2} key={index} mb={1}>
          <Grid item xs={3}>
            <TextField fullWidth label="Description" name="description" value={row.description} onChange={(e) => handleDetailChange(index, e)} />
          </Grid>
          <Grid item xs={2}>
            <TextField type="number" fullWidth label="Rate" name="rate" value={row.rate} onChange={(e) => handleDetailChange(index, e)} />
          </Grid>
          <Grid item xs={2}>
            <TextField type="number" fullWidth label="Units" name="media_unit_count" value={row.media_unit_count} onChange={(e) => handleDetailChange(index, e)} />
          </Grid>
          <Grid item xs={2}>
            <TextField type="number" fullWidth label="Spots" name="no_of_spot" value={row.no_of_spot} onChange={(e) => handleDetailChange(index, e)} />
          </Grid>
          <Grid item xs={2}>
            <TextField type="number" fullWidth label="Total Rate" name="total_rate" value={row.total_rate} onChange={(e) => handleDetailChange(index, e)} />
          </Grid>
          <Grid item xs={1}>
            <Button color="error" onClick={() => removeRow(index)}>X</Button>
          </Grid>
        </Grid>
      ))}

      <Button variant="outlined" onClick={addRow} sx={{ mt: 2 }}>
        + Add Row
      </Button>

      <Box mt={3}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
}
