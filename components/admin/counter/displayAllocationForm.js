
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axiosClient from "@/lib/axiosClient";
// import adminServices from "@/services/adminServices";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   TextField,
//   CircularProgress,
//   Alert,
//   Divider,
//   Paper,
//   MenuItem,
//   ListItemText,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Checkbox,
// } from "@mui/material";

// export default function AllocationPage() {
//   const { id } = useParams();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [vendors, setVendors] = useState([]);
//   const [selectedVendors, setSelectedVendors] = useState([]);
//   const [displayBoards, setDisplayBoards] = useState([]);

//   // ✅ FULL FORM (ALL API FIELDS)
//   const [formData, setFormData] = useState({
//     job_no: "",
//     financial_year: "",
//     avak_ref_id: "",
//     Client_Ref: "",
//     // wo_date: "",
//     subject: "",

//     client_cd: "",
//     client_name: "",
//     office_address: "",

//     billing_Client_cd: "",
//     billing_client_name: "",
//     billing_address: "",
//     billing_office_code: "",
//     billing_base_dept_code: "",
//     billing_office_level_code: "",
//     billing_district_code: "",
//     billing_section_code: "",
//     billing_officer_code: "",
//     billing_client_prarup_code: "",

//     client_grp_cd: "",
//     od_servicetype_id: 0,

//     start_date: "",
//     end_date: "",
//     ref_date: "",
//     receipt_date: "",

//     commision_Percentage: 0,
//     gst_percentage: "",

//     section_code: "",
//     base_dept_code: "",
//     office_level_code: "",
//     office_code: "",
//     officer_code: "",
//     district_code: "",

//     remarks: "",
//     is_client_dpr: "",

//     // audit
//     ip_address: "",
//     entry_by_user_id: "",
//     entry_by_username: "",
//     entry_by_user_type_cd: "",
//     modify_by_user_type_cd: "",
//     action_by_section_cd: "",
//     user_type_cd: "",
//     forward_to_section_cd: "",
//     no_of_media_count:"",
//     upload_doc_path: "",
//   });

//   const formatDate = (d) => (d ? d.split("T")[0] : "");

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   // ================= FETCH DISPLAY BOARD
//   const fetchDisplayBoards = async (agencyIds) => {
//     try {
//       const res = await axiosClient.post(
//         "/ManageMaster/getalldisplayboards",
//         { agencyIds }
//       );

//       const boards = res.data.result || [];

//       setDisplayBoards(
//         boards.map((b) => ({
//           ...b,
//           selected: false,
//           rate: 0,
//           // media_unit_count: 0,
//           no_of_spot: 120,
//           total_rate: 0,
//         }))
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= GET DATA
//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       try {
//         const res = await axiosClient.get(
//           `http://103.79.34.50:8083/api/OutDoorMediaTransaction/getoutdoordbcounter?id=${id}`
//         );

//         const job = res.data;

//         // ✅ AUTO FILL ALL
//         setFormData((prev) => ({
//           ...prev,
//           ...job,
//           job_no: job.job_id,
//           Client_Ref: job.client_ref_id,
//           subject: job.subject,
//           billing_Client_cd: job.billing_client_cd,
//           start_date: job.startDate,
//           end_date: job.endDate,
//           no_of_media_count:job.no_of_media_count,
//         }));

//         const resV = await adminServices.getVendorList(
//           job.od_servicetype_id
//         );
//         setVendors(resV.result || []);
//       } catch (err) {
//         setError("Failed to load");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   // ================= VENDOR
//   const handleVendorChange = async (ids) => {
//     setSelectedVendors(ids);
//     if (ids.length) await fetchDisplayBoards(ids);
//     else setDisplayBoards([]);
//   };

//   // ================= TABLE
//   const handleRowChange = (i, field, value) => {
//     const updated = [...displayBoards];
//     updated[i][field] = value;

//     const r = Number(updated[i].rate || 0);
//     const q = Number(updated[i].no_of_media_count || 0);
//     updated[i].total_rate = r * q;

//     setDisplayBoards(updated);
//   };

//   const toggleSelect = (i) => {
//     const updated = [...displayBoards];
//     updated[i].selected = !updated[i].selected;
//     setDisplayBoards(updated);
//   };

//   const isAllSelected =
//     displayBoards.length &&
//     displayBoards.every((r) => r.selected);

//   const isIndeterminate =
//     displayBoards.some((r) => r.selected) && !isAllSelected;

//   const handleSelectAll = () => {
//     setDisplayBoards((prev) =>
//       prev.map((r) => ({ ...r, selected: !isAllSelected }))
//     );
//   };

//   // ================= SUBMIT
//   const handleSubmit = async () => {
//     try {
//       const detailList = displayBoards
//         .filter((r) => r.selected)
//         .map((r) => ({
//           vendor_id: r.agencyID,
//           vendor_name: r.agencyName,
//           vendor_cate_id: "",
//           vendor_cate: "",
//           display_board_id: r.displayBoardID,
//           description: r.locationName,
//           rate: r.rate,
//           media_unit_count: r.media_unit_count,
//           no_of_spot: r.no_of_spot,
//           total_rate: r.total_rate,
//           start_date: formData.start_date,
//           end_date: formData.end_date,
//         }));

//       const payload = {
//   financial_year: formData.financial_year,
//   avak_ref_id: formData.avak_ref_id,
//   job_no: formData.job_no,
//   Client_Ref: formData.Client_Ref,
//   // wo_date: formData.wo_date || formData.start_date,
//   subject: formData.subject,

//   client_cd: formData.client_cd,
//   billing_Client_cd: formData.billing_Client_cd,
//   billing_office_code: formData.billing_office_code,
//   // client_grp_cd: formData.client_grp_cd,

//   // od_servicetype_id: formData.od_servicetype_id,

//   start_date: formData.start_date,
//   end_date: formData.end_date,

//   commision_Percentage: Number(formData.commision_Percentage || 0),
//   gst_percentage: formData.gst_percentage || "0",

//   entry_ip_address: "127.0.0.1",
//   entry_by_user_id: "00100",
//   entry_by_username: "nikita",

//   detailList: displayBoards
//     .filter((r) => r.selected)
//     .map((r) => ({
//       vendor_id: String(r.agencyID),
//       vendor_name: r.agencyName,
//       vendor_cate_id: "",
//       vendor_cate: "",
//       display_board_id: r.displayBoardID,
//       description: r.locationName,
//       rate: Number(r.rate || 0),
//       media_unit_count: Number(r.media_unit_count || 0),
//       no_of_spot: Number(r.no_of_spot || 0),
//       total_rate: Number(r.total_rate || 0),
//       start_date: formData.start_date,
//       end_date: formData.end_date,
//     })),
// };

//       console.log("FINAL PAYLOAD:", payload);

//       await axiosClient.post(
//         "http://103.79.34.50:8083/api/OutDoorMediaTransaction/db-job-allocation-save",
//         payload
//       );

//       alert("✅ Saved");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed");
//     }
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box p={2}>
//       <Paper sx={{ p: 2, mb: 2, bgcolor: "#030236", color: "#fff" }}>
//         <Typography variant="h6">Allocation Dashboard</Typography>
//       </Paper>

//       <Card>
//         <CardContent>
//           <Typography variant="h6">Job Details</Typography>
//           <Divider sx={{ mb: 2 }} />

//           {/* ✅ FULL GRID AUTO + INPUT */}
//           <Grid container spacing={2}>
//             {Object.keys(formData).map((key) => (
//               <Grid item xs={3} key={key}>
//                 <TextField
//                   label={key}
//                   value={formData[key] || ""}
//                   onChange={(e) => handleChange(key, e.target.value)}
//                   fullWidth
//                   size="small"
//                 />
//               </Grid>
//             ))}

//             {/* Vendor */}
//             <Grid item xs={6}>
//               <TextField
//                 select
//                 fullWidth

//                 label="Vendors"
//                 SelectProps={{
//                   multiple: true,
//                   renderValue: (selected) =>
//                     vendors
//                       .filter((v) => selected.includes(v.AgencyID))
//                       .map((v) => v.AgencyName)
//                       .join(", "),
//                 }}
//                 value={selectedVendors}
//                 onChange={(e) => handleVendorChange(e.target.value)}
//               >
//                 {vendors.map((v) => (
//                   <MenuItem key={v.AgencyID} value={v.AgencyID}>
//                     <ListItemText primary={v.AgencyName} />
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* TABLE */}
//       <Box mt={3}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Board No.</TableCell>
//               <TableCell>Agency</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Rate</TableCell>
//               <TableCell>No Of Media</TableCell>
//               <TableCell>Spot Repetation</TableCell>
//               <TableCell>Total Amount</TableCell>
//               <TableCell align="center">
//                 <Checkbox
//                   checked={isAllSelected}
//                   indeterminate={isIndeterminate}
//                   onChange={handleSelectAll}
//                 />
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {displayBoards.map((r, i) => (
//               <TableRow key={i}>
//                 <TableCell>{r.displayBoardNo}</TableCell>
//                 <TableCell>{r.agencyName}</TableCell>
//                 <TableCell>{r.locationName}</TableCell>

//                 <TableCell>
//                   <TextField
//                     type="number"
//                     value={r.rate}
//                     onChange={(e) =>
//                       handleRowChange(i, "rate", e.target.value)
//                     }
//                   />
//                 </TableCell>

//                 <TableCell>
//                   <TextField
//                     type="number"
//                     value={formData.no_of_media_count}
//                     onChange={(e) =>
//                       handleRowChange(i, "no_of_media_count", e.target.value)
//                     }
//                   />
//                 </TableCell>

//                 <TableCell>
//                   <TextField
//                     type="number"
//                     value={r.no_of_spot}
//                     onChange={(e) =>
//                       handleRowChange(i, "no_of_spot", e.target.value)
//                     }
//                   />
//                 </TableCell>

//                 <TableCell>{r.total_rate}</TableCell>

//                 <TableCell align="center">
//                   <Checkbox
//                     checked={r.selected}
//                     onChange={() => toggleSelect(i)}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>

//       <Box mt={3}>
//         <Button variant="contained" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Box>
//     </Box>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosClient from "@/lib/axiosClient";
import adminServices from "@/services/adminServices";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  CircularProgress,
  Alert,
  Divider,
  Paper,
  MenuItem,
  ListItemText,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";

export default function AllocationPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [displayBoards, setDisplayBoards] = useState([]);

  // ✅ FULL FORM STATE (ALL FIELDS)
  const [formData, setFormData] = useState({
    job_no: "",
    financial_year: "",
    avak_ref_id: "",
    Client_Ref: "",
    client_name: "",
    subject: "",
    client_cd: "",
    billing_Client_cd: "",
    billing_office_code: "",
    start_date: "",
    end_date: "",
    // commision_Percentage: 0,
    // gst_percentage: "",
    no_of_media_count: "",
  });

  // ✅ ONLY THESE WILL SHOW IN UI
  const inputFields = [
    { name: "job_no", label: "Job No" },
    { name: "financial_year", label: "Financial Year" },
    { name: "Client_Ref", label: "Client Ref" },
  { name: "client_name", label: "Client Name" }, 
    { name: "subject", label: "Subject" },
    { name: "start_date", label: "Start Date", type: "date" },
    { name: "end_date", label: "End Date", type: "date" },
    // { name: "commision_Percentage", label: "Commission %" },
    // { name: "gst_percentage", label: "GST %" },
    // { name: "no_of_media_count", label: "No Of Media" },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ================= FETCH DISPLAY BOARD
  const fetchDisplayBoards = async (agencyIds) => {
    try {
      const res = await axiosClient.post(
        "/ManageMaster/getalldisplayboards",
        { agencyIds }
      );

      const boards = res.data.result || [];

      setDisplayBoards(
        boards.map((b) => ({
          ...b,
          selected: false,
          rate: 0,
          no_of_spot: 120,
          total_rate: 0,
          media_unit_count: formData.no_of_media_count || 0,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH DATA
  useEffect(() => {
    if (!id) return;
    const formatDate = (date) => {
  if (!date) return "";
  return date.split("T")[0];
};

    const fetchData = async () => {
      try {
        const res = await axiosClient.get(
          `http://103.79.34.50:8083/api/OutDoorMediaTransaction/getoutdoordbcounter?id=${id}`
        );

        const job = res.data;

        setFormData((prev) => ({
          ...prev,
          ...job,
          job_no: job.job_id,
          Client_Ref: job.client_ref_id,
           client_name: job.client_name, 
          subject: job.subject,
          billing_Client_cd: job.billing_client_cd,
        start_date: formatDate(job.StartDate),
end_date: formatDate(job.EndDate),
          no_of_media_count: job.no_of_media_count,
        }));

        const resV = await adminServices.getVendorList(
          job.od_servicetype_id
        );
        setVendors(resV.result || []);
      } catch (err) {
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ================= VENDOR CHANGE
  const handleVendorChange = async (ids) => {
    setSelectedVendors(ids);
    if (ids.length) await fetchDisplayBoards(ids);
    else setDisplayBoards([]);
  };

  // ================= TABLE CHANGE
  const handleRowChange = (i, field, value) => {
    const updated = [...displayBoards];
    updated[i][field] = value;

    const r = Number(updated[i].rate || 0);
    const q = Number(updated[i].media_unit_count || 0);

    updated[i].total_rate = r * q;

    setDisplayBoards(updated);
  };

  const toggleSelect = (i) => {
    const updated = [...displayBoards];
    updated[i].selected = !updated[i].selected;
    setDisplayBoards(updated);
  };

  const isAllSelected =
    displayBoards.length &&
    displayBoards.every((r) => r.selected);

  const isIndeterminate =
    displayBoards.some((r) => r.selected) && !isAllSelected;

  const handleSelectAll = () => {
    setDisplayBoards((prev) =>
      prev.map((r) => ({ ...r, selected: !isAllSelected }))
    );
  };

  // ================= SUBMIT
  // const handleSubmit = async () => {
  //   try {
  //     const payload = {
  //       ...formData,

  //       detailList: displayBoards
  //         .filter((r) => r.selected)
  //         .map((r) => ({
  //           vendor_id: String(r.agencyID),
  //           vendor_name: r.agencyName,
  //           display_board_id: r.displayBoardID,
  //           locationName: r.locationName,
  //            description:"",
  //           rate: Number(r.rate || 0),
  //           media_unit_count: Number(r.media_unit_count || 0),
  //           no_of_spot: Number(r.no_of_spot || 0),
  //           total_rate: Number(r.total_rate || 0),
  //           start_date: r.StartDate,
  //           end_date: r.EndDate,
  //         })),
  //     };

  //     console.log("FINAL PAYLOAD:", payload);

  //     await axiosClient.post(
  //       "http://103.79.34.50:8083/api/OutDoorMediaTransaction/db-job-allocation-save",
  //       payload
  //     );

  //     alert("✅ Saved");
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Failed");
  //   }
  // };


  const toISO = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

const handleSubmit = async () => {
  try {
    const payload = {
      financial_year: formData.financial_year || "",
      avak_ref_id: formData.avak_ref_id || "",
      job_no: formData.job_no || "",

      // ✅ REQUIRED BY API
      dpr_job_ref_no: formData.Client_Ref || "",
      wo_date: toISO(formData.start_date), // or separate field if you have
      wo_subject: formData.subject || "",

      client_cd: formData.client_cd || "",
      billing_Client_cd: formData.billing_Client_cd || "",
      billing_office_code: formData.billing_office_code || "",

      client_grp_cd: formData.client_grp_cd || "",
      od_servicetype_id: Number(formData.od_servicetype_id || 0),

      start_date: toISO(formData.start_date),
      end_date: toISO(formData.end_date),

      commision_Percentage: Number(formData.commision_Percentage || 0),
      gst_percentage: formData.gst_percentage || "0",

      entry_ip_address: "127.0.0.1",
      entry_by_user_id: "00100",
      entry_by_username: "nikita",

      detailList: displayBoards
        .filter((r) => r.selected)
        .map((r) => ({
          vendor_id: String(r.agencyID),
          vendor_name: r.agencyName,
          vendor_cate_id: "",
          vendor_cate: "",
          display_board_id: Number(r.displayBoardID),
          description: r.locationName || "",

          rate: Number(r.rate || 0),
          media_unit_count: Number(r.media_unit_count || 0),
          no_of_spot: Number(r.no_of_spot || 0),
          total_rate: Number(r.total_rate || 0),

          start_date: toISO(formData.start_date),
          end_date: toISO(formData.end_date),
        })),
    };

    console.log("FINAL API PAYLOAD:", payload);

    await axiosClient.post(
      "http://103.79.34.50:8083/api/OutDoorMediaTransaction/db-job-allocation-save",
      payload
    );

    alert("✅ Saved Successfully");
  } catch (err) {
    console.error("API ERROR:", err.response?.data || err.message);
    alert("❌ Failed to Save");
  }
};

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={2}>
      <Paper sx={{ p: 2, mb: 2, bgcolor: "#030236", color: "#fff" }}>
        <Typography variant="h6">Allocation Dashboard</Typography>
      </Paper>

      <Card>
        <CardContent>
          <Typography variant="h6">Job Details</Typography>
          <Divider sx={{ mb: 2 }} />

          {/* ✅ SHOW ONLY REQUIRED INPUTS */}
          <Grid container spacing={2}>
            {/* {inputFields.map((field) => (
              <Grid item xs={3} key={field.name}>
                <TextField
                  label={field.label}
                  type={field.type || "text"}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleChange(field.name, e.target.value)
                  }
                  fullWidth
                  size="small"
                  InputLabelProps={
                    field.type === "date" ? { shrink: true } : {}
                  }
                />
              </Grid>
            ))} */}

  {/* {inputFields.map((field) => (
    <Grid item xs={3} key={field.name}>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {field.label}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            p: 1,
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {formData[field.name] || "-"}
        </Typography>
      </Box>
    </Grid>
  ))}
 */}

 {/* {inputFields.map((field) => (
  <Grid item xs={3} key={field.name}>
    <Box>
     
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, color: "#555" }}
      >
        {field.label}
      </Typography>

    
      <Typography
        variant="body2"
        sx={{
          mt: 0.5,
          color: "#000",
        }}
      >
        {formData[field.name] || "-"}
      </Typography>
    </Box>
  </Grid>
))} */}


{inputFields.map((field) => (
  <Grid item size={{xs:12,sm:6,md:3}} key={field.name}>
    <Box
      sx={{
        p: 1.5,
        borderRadius: "10px",
        background: "linear-gradient(135deg, #f8fafc, #eef2f7)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Label */}
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          color: "#6b7280",
          letterSpacing: "0.5px",
        }}
      >
        {field.label}
      </Typography>

      {/* Value */}
      <Typography
        variant="body1"
        sx={{
          mt: 0.5,
          fontWeight: 600,
          color: "#111827",
        }}
      >
        {formData[field.name] || "-"}
      </Typography>
    </Box>
  </Grid>
))}



  {/* Vendor */}
           <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                select
                fullWidth
                label="Vendors"
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) =>
                    vendors
                      .filter((v) => selected.includes(v.AgencyID))
                      .map((v) => v.AgencyName)
                      .join(", "),
                }}
                value={selectedVendors}
                onChange={(e) =>
                  handleVendorChange(e.target.value)
                }
              >
                {vendors.map((v) => (
                  <MenuItem key={v.AgencyID} value={v.AgencyID}>
                    <ListItemText primary={v.AgencyName} />
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

</Grid>


          
          
        </CardContent>
      </Card>

      {/* TABLE */}
      <Box mt={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Board No.</TableCell>
              <TableCell>Agency</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>No Of Media</TableCell>
              <TableCell>Spot Repetition</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={handleSelectAll}
                />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayBoards.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.displayBoardNo}</TableCell>
                <TableCell>{r.agencyName}</TableCell>
                <TableCell>{r.locationName}</TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={r.rate}
                    onChange={(e) =>
                      handleRowChange(i, "rate", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    // value={r.media_unit_count}
                    value={r.no_of_media_count}
                    onChange={(e) =>
                      handleRowChange(
                        i,
                        "no_of_media_count",
                        e.target.value
                      )
                    }
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={r.no_of_spot}
                    onChange={(e) =>
                      handleRowChange(
                        i,
                        "no_of_spot",
                        e.target.value
                      )
                    }
                  />
                </TableCell>

                <TableCell>{r.total_rate}</TableCell>

                <TableCell align="center">
                  <Checkbox
                    checked={r.selected}
                    onChange={() => toggleSelect(i)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box mt={3}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}