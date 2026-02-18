"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import adminServices from "@/services/adminServices";
import outdoorServices from "@/services/outdoorServices";


import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  ListItemText
} from "@mui/material";

export default function WorkOrderForm() {
  const { id } = useParams();

  const [vendors, setVendors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState({
    main_id: 0,
    financial_year: "",
    avak_ref_id: "",
    job_id: "",
    subject: "",
    dpr_job_ref_no: "",
    wo_date: "",
    vendor_id: [],
    vendor_name: [],
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
  const transformAgencyToDetails = (agencies) => {
    console.log(agencies)
    if (!Array.isArray(agencies)) return [];

    return agencies.map((agency) => ({
      vendorId: agency.AgencyId?.toString() || "",
      vendorName: agency.AgencyName || "",
      vendorCateId: agency.ServiceId?.toString() || "", // if relevant
      vendorCate: 'outdoor media', // fill if you have category name
      ledVehicleId: agency.VehicleId,
      description: "",
      rate: 12,
      noOfVehicle: 1,
      noOfProgramme: 4,
      totalRate: 12,
      startDate: new Date().toISOString(),
      endDate: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ).toISOString(),

    }));
  };

  async function fetchVehicle() {
    try {
      const response = await outdoorServices.getAgencyVehicle(formData.vendor_id);
      const Array = transformAgencyToDetails(response.result)
      console.log(Array)
      setVehicles(Array);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch vehicles", error);
    }
  }

  useEffect(() => {
    async function fetchCounters() {
      try {
        const response = await adminServices.getcounterDetail(id);

        setFormData((prev) => ({
          ...prev,
          main_id: response.main_id ?? 0,
          financial_year: response.financial_year ?? "",
          avak_ref_id: response.avak_ref_id ?? "",
          job_id: response.job_id ?? "",
          subject: response.subject ?? "",
          ref_no: response.ref_no ?? "",
          od_servicetype_id: response.od_servicetype_id,
          receipt_date: response.receipt_date ?? "",
          vendor_id: response.vendor_id ?? [],
          vendor_name: response.vendor_name ?? [],
          client_cd: response.client_cd ?? "",
          billing_Client_cd: response.billing_Client_cd ?? "",
          billing_office_code: response.billing_office_code ?? "",
          client_grp_cd: response.client_grp_cd ?? "",
          start_date: response.start_date ?? "",
          end_date: response.end_date ?? "",
          commision_Percentage: response.commision_Percentage ?? 0,
          commission_amount: response.commission_amount ?? 0,
          amount_with_commission: response.amount_with_commission ?? 0,
          gst_percentage: response.gst_percentage ?? "",
          gst_amount: response.gst_amount ?? 0,
          toatl_amount: response.toatl_amount ?? 0,
          detailList:
            response.detailList?.length > 0
              ? response.detailList
              : prev.detailList,
        }));

        fetchServiceTypes(response.od_servicetype_id);
      } catch (error) {
        console.error("Failed to fetch counters", error);
      }
    }

    async function fetchServiceTypes(serviceTypeId) {
      try {
        const response = await adminServices.getVendorList(serviceTypeId);
        setVendors(response.result);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch vendors", error);
      }
    }

    fetchCounters();
  }, [id]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(vehicles.map((v) => v.VehicleId));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (vehicleId) => {
    setSelected((prev) =>
      prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...formData.detailList];
    updatedDetails[index][name] = value;

    setFormData({
      ...formData,
      detailList: updatedDetails,
    });
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

  const handleSubmit = () => {
  const payload = {
    "financialYear": formData.financial_year,
    "avakRefId": formData.avak_ref_id,
    "jobNo": formData.job_id,
    "dprJobRefNo": "",
    "woDate": new Date().toISOString(),
    "entryIpAddress": "string",
    "entryByUserId": "string",
    "entryByUsername": "nikita",
    'details': vehicles
  }


    setFormData({
      ...formData,
      detailList: vehicles,
    });
    axiosClient.post("http://103.79.34.50:8083/api/OutDoorMediaTransaction/saveledvehicleallocationdetails", payload,{
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Work Order Form
      </Typography>

      {/* MAIN DETAILS */}
      <Grid container spacing={2}>
        <Grid item size={{md:2}}>
          <TextField
            fullWidth
            label="Financial Year"
            name="financial_year"
            value={formData.financial_year}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={{md:2}}>
          <TextField
            fullWidth
            label="AVAK Ref ID"
            name="avak_ref_id"
            value={formData.avak_ref_id}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={{md:2}}>
          <TextField
            fullWidth
            label="Job No"
            name="job_id"
            value={formData.job_id}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={{md:2}}>
          <TextField
            fullWidth
            label="WO Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={{ xs: 2 }}>
          <TextField
            select
            fullWidth
            label="Vendor"
            name="vendor_id"
            SelectProps={{ multiple: true }}
            value={formData.vendor_id || []}
            onChange={(e) => {
              const selectedIds = e.target.value; // array
              const selectedVendors = vendors.filter((v) =>
                selectedIds.includes(v.AgencyID)
              );
              setFormData({
                ...formData,
                vendor_id: selectedIds,
                vendor_name: selectedVendors.map(v => v.AgencyName), // array of names
              });
              fetchVehicle(selectedIds); // optional: pass selected vendors
            }}
          >
            {vendors.map((vendor) => (
              <MenuItem
                key={vendor.AgencyID}
                value={vendor.AgencyID}
              >
                <ListItemText primary={vendor.AgencyName} />
              </MenuItem>
            ))}
          </TextField>

        </Grid>

        <Grid item size={{md:2}}>
          <TextField
            fullWidth
            label="Client Code"
            name="client_cd"
            value={formData.client_cd}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={{md:2}}>
          <TextField
            fullWidth
            label="Billing Client Code"
            name="billing_Client_cd"
            value={formData.billing_Client_cd}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={{md:2}}>
          <TextField
            type="number"
            fullWidth
            label="Commission %"
            name="commision_Percentage"
            value={formData.commision_Percentage}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={{md:2}}>
          <TextField
            type="number"
            fullWidth
            label="GST Amount"
            name="gst_amount"
            value={formData.gst_amount}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={{md:2}}>
          <TextField
            type="number"
            fullWidth
            label="Total Amount"
            name="toatl_amount"
            value={formData.toatl_amount}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      {/* DETAIL LIST */}
      <Typography variant="h6" mt={4} mb={2}>
        Detail List
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Vehicle No</TableCell>
              <TableCell>Owner Name</TableCell>
              <TableCell>Agency</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Total Rate</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              
              

              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.length === vehicles.length}
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < vehicles.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {vehicles.map((row) => (
              <TableRow key={row.VehicleId} hover>
                <TableCell>{row.noOfVehicle}</TableCell>
                <TableCell>{row.vendorName}</TableCell>
                <TableCell>{row.AgencyName}</TableCell>
                <TableCell>
                <TextField
                  variant="outlined"
                  value={row.totalRate}
                  onChange={(e) =>
                    handleChange(row.id, "name", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
              <TextField
                  variant="outlined"
                  value={row.rate}
                  onChange={(e) =>
                    handleChange(row.id, "name", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
              <TextField
                  variant="outlined"
                  name="start"
                  value={row.startDate}
                  onChange={(e) =>
                    handleChange(row.id, "name", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
              <TextField
                  variant="outlined"
                  value={row.endDate}
                  onChange={(e) =>
                    handleChange(row.id, "name", e.target.value)
                  }
                />
              </TableCell>

                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(row.VehicleId)}
                    onChange={() =>
                      handleSelectOne(row.VehicleId)
                    }
                  />
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selected}
      <Box mt={3}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
}
