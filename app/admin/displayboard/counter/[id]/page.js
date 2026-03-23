

// "use client";

// import axios from "axios";

// import { useState, useEffect } from "react";

// import { useParams } from "next/navigation";

// import axiosClient from "@/lib/axiosClient";

// import adminServices from "@/services/adminServices";

// import ClientDetails from "../../../../../components/admin/counter/clientdetails";
// import BillingsDetails from "../../../../../components/admin/counter/billingdetails";

// import {
//   Box,
//   Button,
//   Grid,
//   TextField,
//   Typography,
//   MenuItem,
//   Paper,
//   Divider,
// } from "@mui/material";

// import { useDispatch } from "react-redux";

// import { useRouter } from "next/navigation";

// import { showNotification } from "@/store/modules/Snackbar/notificationSlice";

// // const { avakId } = useParams();

// // ─── Shared sx helpers ────────────────────────────────────────────────────────

// const grayField = {
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "10px",

//     backgroundColor: "#f4f5f7",

//     "& fieldset": { borderColor: "#e2e4ea" },

//     "&:hover fieldset": { borderColor: "#010a2a" },

//     "&.Mui-focused fieldset": { borderColor: "#010a2a" },
//   },

//   "& .MuiInputLabel-root": { color: "#8a90a0" },

//   "& .MuiInputLabel-root.Mui-focused": { color: "#5c7cfa" },

//   "& .MuiInputBase-input": { color: "#010a2a" },
// };

// // ─── Section header helper ────────────────────────────────────────────────────

// function SectionHeader({ title }) {
//   return (
//     <Box display="flex" alignItems="center" gap={1} mb={2.5} mt={1}>
//       <Box
//         sx={{
//           width: 6,

//           height: 20,

//           borderRadius: "3px",

//           background: "#010a2a",

//           flexShrink: 0,
//         }}
//       />

//       <Typography
//         variant="subtitle1"
//         fontWeight={600}
//         sx={{ color: "#1a1f36" }}
//       >
//         {title}
//       </Typography>
//     </Box>
//   );
// }

// export default function JobForm() {
//   const router = useRouter();

//   const dispatch = useDispatch();

//    const params = useParams();
//   const avakId = params?.id;

//   const [services, setServices] = useState([]);

//   const durationOptions = [
//     { value: "1week", label: "1 Week" },

//     { value: "2week", label: "2 Weeks" },

//     { value: "3week", label: "3 Weeks" },

//     { value: "1month", label: "1 Month" },

//     { value: "2month", label: "2 Months" },
//   ];


//   // const [data, setData] = useState({
//   //   job_id: "",

//   //   financial_year: "2024-2025",

//   //   avak_ref_id:"" ,
//   //   // "2024000002"

//   //   client_ref_id: "",

//   //   ref_no:"",

//   //   is_client_dpr: "",

  
//   //   od_servicetype_id: "1",

//   //   no_of_media_count: "",

//   //   subject: "",

//   //   startDate: "",

//   //   duration: "",

//   //   endDate: "",

//   //   client_cd: "",

//   //   client_name: "",

//   //   office_address: "",

//   //   office_code: "",

//   //   district_code: "",

//   //   remarks: "",

//   //   ip_address: "",

//   //   entry_user_name: "nikita",

//   //   files: null,

//   //   baseDepartment: "",

//   //   officeLevel: "",

//   //   section: "",

//   //   officer: "",

//   //   designation: "",

//   //   // hidden AVAK fields

//   //   client_prarup_code: "",

//   //   caption_cd: "",

//   //   tender_amt: "",

//   //   schedule_date: "",

//   //   fixed_date: "",

//   //   is_post_ro: "",

//   //   letter_type_code: "",

//   //   received_date: "",

//   //   letter_no: "",

//   //   letter_date: "",

//   //   receiving_mode_code: "",

//   //   Avak_category: "",

//   //   // billing

//   //   Billing_client_cd: "",

//   //   Billing_office_code:"",
//   //   Billing_client_name: "",

//   //   Billing_address: "",
//   //   Billing_section_code: "",
//   //   Billing_officer: "",
//   //   Billing_client_prarup_code:"",
  
//   // });


// const [data, setData] = useState({
//   job_id: "",

//   financial_year: "2024-2025",

//   avak_ref_id: "",
//   client_ref_id: "",

//   ref_no: "",

//   is_client_dpr: "",

//   od_servicetype_id: "1",

//   no_of_media_count: "",

//   subject: "",

//   startDate: "",
//   duration: "",
//   endDate: "",

//   ref_date: "",
//   receipt_date: "",

//   client_cd: "",
//   client_name: "",

//   office_address: "",

//   office_code: "",
//   district_code: "",

//   remarks: "",

//   ip_address: "",

//   entry_user_name: "nikita",

//   entry_by_user_id: "00100",
//   entry_by_user_type_cd: "02",
//   modify_by_user_type_cd: "",

//   action_by_section_cd: "03",
//   user_type_cd: "02",
//   forward_to_section_cd: "07",

//   files: [],

//   upload_doc_path: "",

//   baseDepartment: "",
//   officeLevel: "",
//   section: "",
//   officer: "",
//   designation: "",

//   // API office structure fields
//   base_dept_code: "",
//   office_level_code: "",
//   section_code: "",

//   // hidden AVAK fields
//   client_prarup_code: "",
//   caption_cd: "",
//   tender_amt: "",
//   schedule_date: "",
//   fixed_date: "",
//   is_post_ro: "",
//   letter_type_code: "",
//   received_date: "",
//   letter_no: "",
//   letter_date: "",
//   receiving_mode_code: "",
//   Avak_category: "",

//   // billing
//   Billing_client_cd: "",
//   Billing_office_code: "",
//   Billing_client_name: "",
//   Billing_address: "",
//   Billing_section_code: "",
//   Billing_officer: "",
//   Billing_client_prarup_code: "",

//   Billing_base_dept_code: "",
//   Billing_office_level_code: "",
//   Billing_district_code: ""
// });


//   useEffect(() => {
//     async function fetchServices() {
//       try {
//         const response = await adminServices.getServices();

//         setServices(response?.result || []);
//       } catch (error) {
//         console.error("Failed to fetch services", error);
//       }
//     }

//     fetchServices();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     setData((prev) => ({
//       ...prev,

//       [name]: files ? files[0] : value,
//     }));
//   };

//   async function getPublicIP() {
//     const res = await fetch("https://api.ipify.org?format=json");

//     const data = await res.json();

//     console.log(data.ip);

//     return data.ip;
//   }

//   useEffect(() => {
//     getPublicIP();
//   });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const payload = new FormData();

// //       // payload.append("job_id", data.job_id);
// //       // payload.append("financial_year", data.financial_year);
// //       // payload.append("client_ref_id", data.client_ref_id);
// //       // payload.append("avak_ref_id", data.avak_ref_id);
// //       // payload.append("is_client_dpr", data.is_client_dpr);
// //       // payload.append("ref_no", data.letter_no);
// //       // payload.append("od_servicetype_id", data.od_servicetype_id);
// //       // payload.append("subject", data.subject);
// //       // payload.append("no_of_media_count", data.no_of_media_count);
// //       // payload.append("StartDate", data.startDate);
// //       // payload.append("EndDate", data.endDate);
// //       // payload.append("client_cd", data.client_cd,);
// //       // payload.append("client_name",data.client_name)
// //       // payload.append("office_address", data.office_address);

// //       // payload.append("ref_no", data.ref_no);

// //       // payload.append("remarks", data.remarks);

// //       // payload.append("ip_address", getPublicIP());

// //       // payload.append("entry_user_name", data.entry_user_name);

// //       // payload.append("entry_by_user_id", "00100");


// //       // payload.append("baseDepartment", data.baseDepartment);

// //       // payload.append("district_code", data.district_code);

// //       // payload.append("officeLevel", data.officeLevel);

// //       // payload.append("office_code", data.office_code);

// //       // payload.append("section", data.section);

// //       // payload.append("officer", data.officer);

// //       // payload.append("designation", data.designation);

// //       // // billing_details

// //       // payload.append(
// //       //   "Billing_client_cd",
// //       //   data.Billing_client_cd || data.client_cd,
// //       // );

// //       // payload.append(
// //       //   "Billing_client_name",
// //       //   data.Billing_client_name || data.client_name,
// //       // );

// //       // payload.append("Billing_address", data.Billing_address);

// //       // payload.append(
// //       //   "Billing_base_dept_code",
// //       //   data.Billing_base_dept_code || data.baseDepartment,
// //       // );

// //       // payload.append(
// //       //   "Billing_office_level_code",
// //       //   data.Billing_office_level_code || data.officeLevel,
// //       // );

// //       // payload.append(
// //       //   "Billing_office_code",
// //       //   data.Billing_office_code || data.office_code,
// //       // );

// //       // payload.append(
// //       //   "Billing_section_code",
// //       //   data.Billing_section_code || data.section,
// //       // );

// //       // payload.append("Billing_officer", data.Billing_officer || data.officer);

// //       // payload.append(
// //       //   "Billing_client_prarup_code",
// //       //   data.Billing_client_prarup_code,
// //       // );

// //       // if (data.files) {
// //       //   payload.append("files", data.files);
// //       // }



// // // Basic Details
// // payload.append("job_id", data.job_id);
// // payload.append("financial_year", data.financial_year);
// // payload.append("client_ref_id", data.client_ref_id);
// // payload.append("avak_ref_id", data.avak_ref_id);
// // payload.append("is_client_dpr", data.is_client_dpr);

// // payload.append("ref_no", data.letter_no);
// // payload.append("ref_date", data.ref_date);
// // payload.append("receipt_date", data.receipt_date);

// // payload.append("od_servicetype_id", data.od_servicetype_id);
// // payload.append("subject", data.subject);
// // payload.append("no_of_media_count", data.no_of_media_count);

// // payload.append("StartDate", data.startDate);
// // payload.append("EndDate", data.endDate);

// // // Client Details
// // payload.append("client_cd", data.client_cd);
// // payload.append("client_name", data.client_name);
// // payload.append("office_address", data.office_address);

// // // Office Details
// // payload.append("base_dept_code", data.baseDepartment);
// // payload.append("office_level_code", data.officeLevel);
// // payload.append("office_code", data.office_code);
// // payload.append("district_code", data.district_code);
// // payload.append("section_code", data.section);

// // // Remarks
// // payload.append("remarks", data.remarks);

// // // System Info
// // payload.append("ip_address", getPublicIP());
// // payload.append("entry_user_name", data.entry_user_name);
// // payload.append("entry_by_user_id", "00100");

// // // User Type & Workflow
// // payload.append("entry_by_user_type_cd", data.entry_by_user_type_cd);
// // payload.append("modify_by_user_type_cd", data.modify_by_user_type_cd);
// // payload.append("user_type_cd", data.user_type_cd);
// // payload.append("action_by_section_cd", data.action_by_section_cd);
// // payload.append("forward_to_section_cd", data.forward_to_section_cd);

// // // Billing Details
// // payload.append(
// //   "Billing_client_cd",
// //   data.Billing_client_cd || data.client_cd
// // );

// // payload.append(
// //   "Billing_client_name",
// //   data.Billing_client_name || data.client_name
// // );

// // payload.append("Billing_address", data.Billing_address);

// // payload.append(
// //   "Billing_base_dept_code",
// //   data.billing_base_dept_code || data.baseDepartment
// // );

// // payload.append(
// //   "Billing_office_level_code",
// //   data.billing_office_level_code || data.officeLevel
// // );

// // payload.append(
// //   "Billing_office_code",
// //   data.Billing_office_code || data.office_code
// // );

// // payload.append(
// //   "Billing_district_code",
// //   data.billing_district_code || data.district_code
// // );

// // payload.append(
// //   "Billing_section_code",
// //   data.Billing_section_code || data.section
// // );

// // payload.append(
// //   "Billing_client_prarup_code",
// //   data.Billing_client_prarup_code
// // );

// // // Upload Document Path (if needed)
// // payload.append("upload_doc_path", data.upload_doc_path || "");

// // // File Upload
// // if (data.files && data.files.length > 0) {
// //   for (let i = 0; i < data.files.length; i++) {
// //     payload.append("files", data.files[i]);
// //   }
// // }
// //       for (let pair of payload.entries()) {
// //         console.log(pair[0], pair[1]);
// //       }

// //       const response = await axiosClient.post(
// //         "http://103.79.34.50:8083/api/OutDoorMediaTransaction/save-db-counter",

// //         payload,

// //         {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         },
// //       );

// //       dispatch(showNotification({ message: "Saved!", severity: "success" }));

// //       router.push(`/admin/counter`);

// //       console.log("SUCCESS:", response.data);
// //     } catch (error) {
// //       console.error("ERROR:", error.response?.data || error.message);
// //     }
// //   };


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const ip = await getPublicIP();

//     const payload = new FormData();

//     payload.append("job_id", data.job_id);
//     payload.append("financial_year", data.financial_year);
//     payload.append("client_ref_id", data.client_ref_id);
//     payload.append("avak_ref_id", data.avak_ref_id);
//     payload.append("is_client_dpr", data.is_client_dpr);

//     payload.append("ref_no", data.ref_no);
//     payload.append("ref_date", data.ref_date);
//     payload.append("receipt_date", data.receipt_date);

//     payload.append("od_servicetype_id", data.od_servicetype_id);
//     payload.append("subject", data.subject);
//     payload.append("no_of_media_count", data.no_of_media_count);

//     payload.append("StartDate", data.startDate);
//     payload.append("EndDate", data.endDate);

//     payload.append("client_cd", data.client_cd);
//     payload.append("client_name", data.client_name);
//     payload.append("office_address", data.office_address);

//     payload.append("base_dept_code", data.baseDepartment);
//     payload.append("office_level_code", data.officeLevel);
//     payload.append("office_code", data.office_code);
//     payload.append("district_code", data.district_code);
//     payload.append("section_code", data.section);

//     payload.append("remarks", data.remarks);

//     payload.append("ip_address", ip);
//     payload.append("entry_user_name", data.entry_user_name);
//     payload.append("entry_by_user_id", data.entry_by_user_id);

//     payload.append("entry_by_user_type_cd", data.entry_by_user_type_cd);
//     payload.append("modify_by_user_type_cd", data.modify_by_user_type_cd);
//     payload.append("user_type_cd", data.user_type_cd);
//     payload.append("action_by_section_cd", data.action_by_section_cd);
//     payload.append("forward_to_section_cd", data.forward_to_section_cd);

//     payload.append(
//       "Billing_client_cd",
//       data.Billing_client_cd || data.client_cd
//     );

//     payload.append(
//       "Billing_client_name",
//       data.Billing_client_name || data.client_name
//     );

//     payload.append("Billing_address", data.Billing_address);

//     payload.append(
//       "Billing_base_dept_code",
//       data.Billing_base_dept_code || data.baseDepartment
//     );

//     payload.append(
//       "Billing_office_level_code",
//       data.Billing_office_level_code || data.officeLevel
//     );

//     payload.append(
//       "Billing_office_code",
//       data.Billing_office_code || data.office_code
//     );

//     payload.append(
//       "Billing_district_code",
//       data.Billing_district_code || data.district_code
//     );

//     payload.append(
//       "Billing_section_code",
//       data.Billing_section_code || data.section
//     );

//     payload.append(
//       "Billing_client_prarup_code",
//       data.Billing_client_prarup_code
//     );

//     payload.append("upload_doc_path", data.upload_doc_path || "");

//     if (data.files && data.files.length > 0) {
//       data.files.forEach((file) => {
//         payload.append("files", file);
//       });
//     }

//     const response = await axiosClient.post(
//       "http://103.79.34.50:8083/api/OutDoorMediaTransaction/save-db-counter",
//       payload,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     dispatch(showNotification({ message: "Saved!", severity: "success" }));

//     router.push(`/admin/displayboard`);

//     console.log("SUCCESS:", response.data);

//   } catch (error) {
//     console.error("ERROR:", error.response?.data || error.message);
//   }
// };
//   useEffect(() => {
//     if (!avakId) return;

//     const getAvakData = async () => {
//       try {
//         const res = await axios.post(
//           "http://103.79.34.50:8083/api/Client/get-avak-record",

//           {
//             // avak_ref_id: "2024000002",
//   avak_ref_id: avakId,
//             fin_year: "2024-2025",
//           },
//         );

//         const avak = res.data;
// console.log("Officer from API:", avak.client_cd);
//         setData((prev) => ({
//           ...prev,

//           avak_ref_id:avak.avak_ref_id,
//           // "2024000002"

//           subject: avak.subject,

//           client_cd: avak.client_cd,

//           client_name: avak.client_name,

//           client_ref_id: avak.client_ref_id,

//           ref_no :avak.letter_no,


//           office_address: avak.client_address,

//           baseDepartment: avak.base_dept_code,

//           district_code: avak.district_code,

//           officeLevel: avak.office_level_code,

//           office_code: avak.office_code,
          
//           officer:avak.client_cd,

//           section: avak.section_code,

//           remarks: avak.remarks,

//           // hidden values

//           client_prarup_code: avak.client_prarup_code,

//           caption_cd: avak.caption_cd,

//           tender_amt: avak.tender_amt,

//           schedule_date: avak.schedule_date,

//           fixed_date: avak.fixed_date,

//           is_post_ro: avak.is_post_ro,

//           letter_type_code: avak.letter_type_code,

//           received_date: avak.received_date,

//           letter_no: avak.letter_no,

//           letter_date: avak.letter_date,

//           receiving_mode_code: avak.receiving_mode_code,

//           Avak_category: avak.Avak_category,

//           // billing autofill

//           Billing_client_cd: avak.client_cd,

//           Billing_client_name: avak.client_name,

//           Billing_address: avak.client_address,

//           Billing_base_dept_code: avak.base_dept_code,

//           Billing_district_code: avak.district_code,

//           Billing_office_level_code: avak.office_level_code,

//           Billing_office_code: avak.office_code,

//           Billing_section_code: avak.section_code,

//           Billing_officer: avak.client_cd,
//         }));
//       } catch (error) {
//         console.error("AVAK API Error", error);
//       }
//     };

//     getAvakData();
//   }, [avakId]);

 

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: 4,

//         maxWidth: 1100,

//         mx: "auto",

//         borderRadius: "16px",

//         backgroundColor: "#f7f8fc",

//         border: "1px solid #e8eaf0",
//       }}
//     >
//       {/* ── Page Header ── */}

//       <Box
//         mb={4}
//         sx={{
//           display: "flex",

//           alignItems: "center",

//           gap: 2,

//           borderBottom: "1px solid #e8eaf0",

//           pb: 3,
//         }}
//       >
//         <Box
//           sx={{
//             width: 44,

//             height: 44,

//             borderRadius: "12px",

//             background: "#010a2a",

//             display: "flex",

//             alignItems: "center",

//             justifyContent: "center",

//             boxShadow: "0 4px 12px rgba(92,124,250,0.35)",

//             flexShrink: 0,
//           }}
//         >
//           {/* briefcase icon */}

//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//             <path
//               d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
//               stroke="white"
//               strokeWidth="1.6"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />

//             <path
//               d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
//               stroke="white"
//               strokeWidth="1.6"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />

//             <line
//               x1="12"
//               y1="12"
//               x2="12"
//               y2="12.01"
//               stroke="white"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//         </Box>

//         <Box>
//           <Typography
//             variant="h5"
//             fontWeight={700}
//             sx={{ color: "#1a1f36", letterSpacing: "-0.3px" }}
//           >
//             Display Board Counter Form
//           </Typography>

//           <Typography variant="caption" sx={{ color: "#8a90a0" }}>
//             Create a new display Board job record
//           </Typography>
//         </Box>
//       </Box>

//       <Box component="form">
//         {/* ── Reference Info ── */}

//         <Paper
//           elevation={0}
//           sx={{
//             p: 3,

//             mb: 3,

//             borderRadius: "14px",

//             backgroundColor: "#ffffff",

//             border: "1px solid #e8eaf0",
//           }}
//         >
//           <SectionHeader title="Reference Information" />

//           <Grid container spacing={2.5}>
//             <Grid item size={{ xs: 12, md: 3 }}>
//               <TextField
//                 label="Financial Year"
//                 name="financial_year"
//                 fullWidth
//                 size="small"
//                 value={data.financial_year}
//                 onChange={(e) => {
//                   const value = e.target.value;

//                   // Allow only format like 2024-2025 while typing

//                   if (/^\d{0,4}-?\d{0,4}$/.test(value)) {
//                     handleChange(e);
//                   }
//                 }}
//                 placeholder="2024-2025"
//                 inputProps={{ maxLength: 9 }}
//               />
//             </Grid>

//             <Grid item size={{ xs: 12, md: 3 }}>
//               <TextField
//                 label="Client Ref ID"
//                 name="client_ref_id"
//                 fullWidth
//                 size="small"
//                 value={data.client_ref_id}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item size={{ xs: 12, md: 3 }}>
//               <TextField
//                 label="AVAK Ref ID"
//                 name="avak_ref_id"
//                 fullWidth
//                 size="small"
//                 value={data.avak_ref_id}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item size={{ xs: 12, md: 3 }}>
//               <TextField
//                 label="Ref No"
//                 name="ref_no"
//                 fullWidth
//                 size="small"
//                 value={data.ref_no}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} md={3}>
//               <TextField
//                 select
//                 label="Service Type"
//                 name="od_servicetype_id"
//                 fullWidth
//                 size="small"
//                 value={data.od_servicetype_id}
//               >
//                 <MenuItem value="1">Display Board</MenuItem>
//               </TextField>
//             </Grid>

//             <Grid item size={{ xs: 12, md: 3 }}>
//               <TextField
//                 type="number"
//                 label="Number Of Media Count"
//                 name="no_of_media_count"
//                 fullWidth
//                 size="small"
//                 value={data.no_of_media_count}
//                 onChange={handleChange}
//                 inputProps={{ min: 0 }}
//               />
//             </Grid>
//           </Grid>

//           <Grid container spacing={2} mt={3}>
//             {/* Client Details */}

//             <Grid item size={{ xs: 12, md: 6 }}>
//               <SectionHeader title="Office Mapping" />

//               <ClientDetails data={data} setData={setData} />
//             </Grid>

//             {/* Billing Details */}

//             <Grid item size={{ xs: 12, md: 6 }}>
//               <SectionHeader title="Billing Client Details" />

//               <BillingsDetails data={data} setData={setData} />
//             </Grid>
//           </Grid>

//           {/* ===============job detals=========================== */}

//           <SectionHeader title="Job Details" />

//           <Grid container spacing={2.5}>
//             <Grid item size={{ xs: 12, md: 12 }}>
//               <TextField
//                 label="Subject"
//                 name="subject"
//                 fullWidth
//                 multiline
//                 rows={2}
//                 value={data.subject}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item size={{ xs: 12, md: 3 }}>
//               <TextField
//                 label="Start Date"
//                 type="date"
//                 name="startDate"
//                 fullWidth
//                 size="small"
//                 InputLabelProps={{ shrink: true }}
//                 value={data.startDate}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item size={{ xs: 12, md: 3 }}>
//               <TextField
//                 select
//                 label="Duration"
//                 value={data.duration}
//                 name="duration"
//                 onChange={handleChange}
//                 fullWidth
//                 size="small"
//               >
//                 {durationOptions.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item size={{ xs: 12, md: 3 }}>
//               <TextField
//                 label="End Date"
//                 type="date"
//                 name="endDate"
//                 fullWidth
//                 size="small"
//                 InputLabelProps={{ shrink: true }}
//                 value={data.endDate}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>

//           <SectionHeader title="Attachment" />

//           <Grid container spacing={2.5}>
//             <Grid item size={{ xs: 12, md: 6 }}>
//               <Box
//                 component="label"
//                 htmlFor="file-upload"
//                 sx={{
//                   display: "flex",

//                   flexDirection: "column",

//                   alignItems: "center",

//                   justifyContent: "center",

//                   gap: 1,

//                   p: 3,

//                   borderRadius: "10px",

//                   border: "2px dashed #d0d4e8",

//                   backgroundColor: "#f4f5f7",

//                   cursor: "pointer",

//                   transition: "all 0.2s ease",

//                   "&:hover": {
//                     borderColor: "#5c7cfa",

//                     backgroundColor: "#eef1ff",
//                   },
//                 }}
//               >
//                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
//                   <path
//                     d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
//                     stroke="#8a90a0"
//                     strokeWidth="1.8"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>

//                 <Typography
//                   variant="body2"
//                   sx={{ color: "#5a6072", fontWeight: 500 }}
//                 >
//                   {data.files ? data.files.name : "Click to upload a Letter"}
//                 </Typography>

//                 <Typography variant="caption" sx={{ color: "#b0b5c4" }}>
//                   Any format accepted
//                 </Typography>

//                 <input
//                   id="file-upload"
//                   hidden
//                   type="file"
//                   name="files"
//                   onChange={handleChange}
//                 />
//               </Box>
//             </Grid>

//           </Grid>

//           {/* ── Submit Bar ── */}

//           <Box
//             sx={{
//               display: "flex",

//               justifyContent: "flex-end",

//               // position: "sticky",

//               bottom: 0,

//               backgroundColor: "#f7f8fc",

//               pt: 2,

//               pb: 1,
//             }}
//           >
//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               onClick={handleSubmit}
//               sx={{
//                 px: 6,

//                 py: 1.3,

//                 borderRadius: "12px",

//                 textTransform: "none",

//                 fontWeight: 600,

//                 fontSize: "0.95rem",

//                 background: "#010a2a",

//                 boxShadow: "0 4px 14px rgba(92,124,250,0.4)",

//                 "&:hover": {
//                   background:
//                     "linear-gradient(135deg, #4f6ef5 0%, #3b58e0 100%)",

//                   boxShadow: "0 6px 18px rgba(92,124,250,0.5)",
//                 },

//                 transition: "all 0.2s ease",
//               }}
//             >
//               Submit Job
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </Paper>
//   );
// }


// ======================================================



"use client";

import axios from "axios";

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";

import axiosClient from "@/lib/axiosClient";

import adminServices from "@/services/adminServices";

import ClientDetails from "../../../../../components/admin/counter/clientdetails";
import BillingsDetails from "../../../../../components/admin/counter/billingdetails";

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Divider,
} from "@mui/material";

import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";

import { showNotification } from "@/store/modules/Snackbar/notificationSlice";



// ─── Shared sx helpers ────────────────────────────────────────────────────────

const grayField = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",

    backgroundColor: "#f4f5f7",

    "& fieldset": { borderColor: "#e2e4ea" },

    "&:hover fieldset": { borderColor: "#010a2a" },

    "&.Mui-focused fieldset": { borderColor: "#010a2a" },
  },

  "& .MuiInputLabel-root": { color: "#8a90a0" },

  "& .MuiInputLabel-root.Mui-focused": { color: "#5c7cfa" },

  "& .MuiInputBase-input": { color: "#010a2a" },
};

// ─── Section header helper ────────────────────────────────────────────────────

function SectionHeader({ title }) {
  return (
    <Box display="flex" alignItems="center" gap={1} mb={2.5} mt={1}>
      <Box
        sx={{
          width: 6,

          height: 20,

          borderRadius: "3px",

          background: "#010a2a",

          flexShrink: 0,
        }}
      />

      <Typography
        variant="subtitle1"
        fontWeight={600}
        sx={{ color: "#1a1f36" }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default function JobForm() {
  const router = useRouter();

  const dispatch = useDispatch();

   const params = useParams();
  const avakId = params?.id;
  const [avakFiles, setAvakFiles] = useState([]);

  const [services, setServices] = useState([]);

  const durationOptions = [
    { value: "1week", label: "1 Week" },

    { value: "2week", label: "2 Weeks" },

    { value: "3week", label: "3 Weeks" },

    { value: "1month", label: "1 Month" },

    { value: "2month", label: "2 Months" },
  ];




const [data, setData] = useState({
  job_id: "",

  financial_year: "2024-2025",

  avak_ref_id: "",
  client_ref_id: "",

  ref_no: "",

  is_client_dpr: "",

  od_servicetype_id: "1",

  no_of_media_count: "",

  subject: "",

  startDate: "",
  duration: "",
  endDate: "",

  ref_date: "",
  receipt_date: "",

  client_cd: "",
  client_name: "",

  office_address: "",

  office_code: "",
  district_code: "",

  remarks: "",

  ip_address: "",

  entry_user_name: "nikita",

  entry_by_user_id: "00100",
  entry_by_user_type_cd: "02",
  modify_by_user_type_cd: "",

  action_by_section_cd: "03",
  user_type_cd: "02",
  forward_to_section_cd: "07",

  files: [],

  upload_doc_path: "",

  baseDepartment: "",
  officeLevel: "",
  section: "",
  officer: "",
  designation: "",

  // API office structure fields
  base_dept_code: "",
  office_level_code: "",
  section_code: "",

  // hidden AVAK fields
  client_prarup_code: "",
  caption_cd: "",
  tender_amt: "",
  schedule_date: "",
  fixed_date: "",
  is_post_ro: "",
  letter_type_code: "",
  received_date: "",
  letter_no: "",
  letter_date: "",
  receiving_mode_code: "",
  Avak_category: "",

  // billing
  Billing_client_cd: "",
  Billing_office_code: "",
  Billing_client_name: "",
  Billing_address: "",
  Billing_section_code: "",
  Billing_officer: "",
  Billing_client_prarup_code: "",

  Billing_base_dept_code: "",
  Billing_office_level_code: "",
  Billing_district_code: ""
});


  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await adminServices.getServices();

        setServices(response?.result || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    }

    fetchServices();
  }, []);

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;

  //   setData((prev) => ({
  //     ...prev,

  //     [name]: files ? Array.from(files) : value, 
  //   }));
  // };


  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "files") {
    setData((prev) => ({
      ...prev,
      files: files && files.length ? Array.from(files) : [],
    }));
  } else {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
  async function getPublicIP() {
    const res = await fetch("https://api.ipify.org?format=json");

    const data = await res.json();

    console.log(data.ip);

    return data.ip;
  }

  useEffect(() => {
    getPublicIP();
  });




useEffect(() => {
  if (!avakId) return;

  const fetchAvakFiles = async () => {
    try {
      const res = await axios.get(
        `http://103.79.34.50:8083/api/Client/getavakfiles`,
        {
          params: {
            financial_year: data.financial_year,
            avak_ref_id: avakId,
          },
        }
      );

      setAvakFiles(res.data || []);
    } catch (error) {
      console.error("File fetch error", error);
    }
  };

  fetchAvakFiles();
}, [avakId, data.financial_year]);

const handleOpenFile = (file) => {
  const baseURL = "http://103.79.34.50:8083/";
  const fileUrl = baseURL + file.file_path;

  window.open(fileUrl, "_blank");
};



// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const ip = await getPublicIP();

//     const payload = new FormData();

//     payload.append("job_id", data.job_id);
//     payload.append("financial_year", data.financial_year);
//     payload.append("client_ref_id", data.client_ref_id);
//     payload.append("avak_ref_id", data.avak_ref_id);
//     payload.append("is_client_dpr", data.is_client_dpr);

//     payload.append("ref_no", data.ref_no);
//     payload.append("ref_date", data.ref_date);
//     payload.append("receipt_date", data.receipt_date);

//     payload.append("od_servicetype_id", data.od_servicetype_id);
//     payload.append("subject", data.subject);
//     payload.append("no_of_media_count", data.no_of_media_count);

//     payload.append("StartDate", data.startDate);
//     payload.append("EndDate", data.endDate);

//     payload.append("client_cd", data.client_cd);
//     payload.append("client_name", data.client_name);
//     payload.append("office_address", data.office_address);

//     payload.append("base_dept_code", data.baseDepartment);
//     payload.append("office_level_code", data.officeLevel);
//     payload.append("office_code", data.office_code);
//     payload.append("district_code", data.district_code);
//     payload.append("section_code", data.section);

//     payload.append("remarks", data.remarks);

//     payload.append("ip_address", ip);
//     payload.append("entry_user_name", data.entry_user_name);
//     payload.append("entry_by_user_id", data.entry_by_user_id);

//     payload.append("entry_by_user_type_cd", data.entry_by_user_type_cd);
//     payload.append("modify_by_user_type_cd", data.modify_by_user_type_cd);
//     payload.append("user_type_cd", data.user_type_cd);
//     payload.append("action_by_section_cd", data.action_by_section_cd);
//     payload.append("forward_to_section_cd", data.forward_to_section_cd);

//     payload.append(
//       "Billing_client_cd",
//       data.Billing_client_cd || data.client_cd
//     );

//     payload.append(
//       "Billing_client_name",
//       data.Billing_client_name || data.client_name
//     );

//     payload.append("Billing_address", data.Billing_address);

//     payload.append(
//       "Billing_base_dept_code",
//       data.Billing_base_dept_code || data.baseDepartment
//     );

//     payload.append(
//       "Billing_office_level_code",
//       data.Billing_office_level_code || data.officeLevel
//     );

//     payload.append(
//       "Billing_office_code",
//       data.Billing_office_code || data.office_code
//     );

//     payload.append(
//       "Billing_district_code",
//       data.Billing_district_code || data.district_code
//     );

//     payload.append(
//       "Billing_section_code",
//       data.Billing_section_code || data.section
//     );

//     payload.append(
//       "Billing_client_prarup_code",
//       data.Billing_client_prarup_code
//     );

//     payload.append("upload_doc_path", data.upload_doc_path || "");

//     if (data.files && data.files.length > 0) {
//       data.files.forEach((file) => {
//         payload.append("files", file);
//       });
//     }

//     const response = await axiosClient.post(
//       "http://103.79.34.50:8083/api/OutDoorMediaTransaction/save-db-counter",
//       payload,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     dispatch(showNotification({ message: "Saved!", severity: "success" }));

//     router.push(`/admin/displayboard`);

//     console.log("SUCCESS:", response.data);

//   } catch (error) {
//     console.error("ERROR:", error.response?.data || error.message);
//   }
// };
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const ip = await getPublicIP();

    const payload = new FormData();

    payload.append("job_id", data.job_id);
    payload.append("financial_year", data.financial_year);
    payload.append("client_ref_id", data.client_ref_id);
    payload.append("avak_ref_id", data.avak_ref_id);
    payload.append("is_client_dpr", data.is_client_dpr);

    payload.append("ref_no", data.ref_no);
    payload.append("ref_date", data.ref_date);
    payload.append("receipt_date", data.receipt_date);

    payload.append("od_servicetype_id", data.od_servicetype_id);
    payload.append("subject", data.subject);
    payload.append("no_of_media_count", data.no_of_media_count);

    payload.append("StartDate", data.startDate);
    payload.append("EndDate", data.endDate);

    payload.append("client_cd", data.client_cd);
    payload.append("client_name", data.client_name);
    payload.append("office_address", data.office_address);

    payload.append("base_dept_code", data.baseDepartment);
    payload.append("office_level_code", data.officeLevel);
    payload.append("office_code", data.office_code);
    payload.append("district_code", data.district_code);
    payload.append("section_code", data.section);

    payload.append("remarks", data.remarks);

    payload.append("ip_address", ip);
    payload.append("entry_user_name", data.entry_user_name);
    payload.append("entry_by_user_id", data.entry_by_user_id);

    payload.append("entry_by_user_type_cd", data.entry_by_user_type_cd);
    payload.append("modify_by_user_type_cd", data.modify_by_user_type_cd);
    payload.append("user_type_cd", data.user_type_cd);
    payload.append("action_by_section_cd", data.action_by_section_cd);
    payload.append("forward_to_section_cd", data.forward_to_section_cd);

    payload.append(
      "Billing_client_cd",
      data.Billing_client_cd || data.client_cd
    );

    payload.append(
      "Billing_client_name",
      data.Billing_client_name || data.client_name
    );

    payload.append("Billing_address", data.Billing_address);

    payload.append(
      "Billing_base_dept_code",
      data.Billing_base_dept_code || data.baseDepartment
    );

    payload.append(
      "Billing_office_level_code",
      data.Billing_office_level_code || data.officeLevel
    );

    payload.append(
      "Billing_office_code",
      data.Billing_office_code || data.office_code
    );

    payload.append(
      "Billing_district_code",
      data.Billing_district_code || data.district_code
    );

    payload.append(
      "Billing_section_code",
      data.Billing_section_code || data.section
    );

    payload.append(
      "Billing_client_prarup_code",
      data.Billing_client_prarup_code
    );

    payload.append("upload_doc_path", data.upload_doc_path || "");

    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        payload.append("files []", file);
      });
    }

    const response = await axiosClient.post(
      "http://103.79.34.50:8083/api/OutDoorMediaTransaction/save-db-counter",
      payload,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dispatch(showNotification({ message: "Saved!", severity: "success" }));

    router.push(`/admin/displayboard`);

    console.log("SUCCESS:", response.data);

  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);
  }
};


useEffect(() => {
    if (!avakId) return;

    const getAvakData = async () => {
      try {
        const res = await axios.post(
          "http://103.79.34.50:8083/api/Client/get-avak-record",

          {
           
  avak_ref_id: avakId,
            fin_year: "2024-2025",
          },
        );

        const avak = res.data;
console.log("Officer from API:", avak.client_cd);
        setData((prev) => ({
          ...prev,

          avak_ref_id:avak.avak_ref_id,
       
          subject: avak.subject,

          client_cd: avak.client_cd,

          client_name: avak.client_name,

          client_ref_id: avak.client_ref_id,

          ref_no :avak.letter_no,


          office_address: avak.client_address,

          baseDepartment: avak.base_dept_code,

          district_code: avak.district_code,

          officeLevel: avak.office_level_code,

          office_code: avak.office_code,
          
          officer:avak.client_cd,

          section: avak.section_code,

          remarks: avak.remarks,

          // hidden values

          client_prarup_code: avak.client_prarup_code,

          caption_cd: avak.caption_cd,

          tender_amt: avak.tender_amt,

          schedule_date: avak.schedule_date,

          fixed_date: avak.fixed_date,

          is_post_ro: avak.is_post_ro,

          letter_type_code: avak.letter_type_code,

          received_date: avak.received_date,

          letter_no: avak.letter_no,

          letter_date: avak.letter_date,

          receiving_mode_code: avak.receiving_mode_code,

          Avak_category: avak.Avak_category,

          // billing autofill

          Billing_client_cd: avak.client_cd,

          Billing_client_name: avak.client_name,

          Billing_address: avak.client_address,

          Billing_base_dept_code: avak.base_dept_code,

          Billing_district_code: avak.district_code,

          Billing_office_level_code: avak.office_level_code,

          Billing_office_code: avak.office_code,

          Billing_section_code: avak.section_code,

          Billing_officer: avak.client_cd,
        }));
      } catch (error) {
        console.error("AVAK API Error", error);
      }
    };

    getAvakData();
  }, [avakId]);

 

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,

        maxWidth: 1100,

        mx: "auto",

        borderRadius: "16px",

        backgroundColor: "#f7f8fc",

        border: "1px solid #e8eaf0",
      }}
    >
      {/* ── Page Header ── */}

      <Box
        mb={4}
        sx={{
          display: "flex",

          alignItems: "center",

          gap: 2,

          borderBottom: "1px solid #e8eaf0",

          pb: 3,
        }}
      >
        <Box
          sx={{
            width: 44,

            height: 44,

            borderRadius: "12px",

            background: "#010a2a",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            boxShadow: "0 4px 12px rgba(92,124,250,0.35)",

            flexShrink: 0,
          }}
        >
          {/* briefcase icon */}

          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <line
              x1="12"
              y1="12"
              x2="12"
              y2="12.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Box>

        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#1a1f36", letterSpacing: "-0.3px" }}
          >
            Display Board Counter Form
          </Typography>

          <Typography variant="caption" sx={{ color: "#8a90a0" }}>
            Create a new display Board job record
          </Typography>
        </Box>
      </Box>

      <Box component="form">
        {/* ── Reference Info ── */}

        <Paper
          elevation={0}
          sx={{
            p: 3,

            mb: 3,

            borderRadius: "14px",

            backgroundColor: "#ffffff",

            border: "1px solid #e8eaf0",
          }}
        >
          <SectionHeader title="Reference Information" />

          <Grid container spacing={2.5}>
            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Financial Year"
                name="financial_year"
                fullWidth
                size="small"
                value={data.financial_year}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only format like 2024-2025 while typing

                  if (/^\d{0,4}-?\d{0,4}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                placeholder="2024-2025"
                inputProps={{ maxLength: 9 }}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Client Ref ID"
                name="client_ref_id"
                fullWidth
                size="small"
                value={data.client_ref_id}
                onChange={handleChange}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="AVAK Ref ID"
                name="avak_ref_id"
                fullWidth
                size="small"
                value={data.avak_ref_id}
                onChange={handleChange}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Ref No"
                name="ref_no"
                fullWidth
                size="small"
                value={data.ref_no}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                label="Service Type"
                name="od_servicetype_id"
                fullWidth
                size="small"
                value={data.od_servicetype_id}
              >
                <MenuItem value="1">Display Board</MenuItem>
              </TextField>
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                type="number"
                label="Number Of Media Count"
                name="no_of_media_count"
                fullWidth
                size="small"
                value={data.no_of_media_count}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={3}>
            {/* Client Details */}

            <Grid item size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Office Mapping" />

              <ClientDetails data={data} setData={setData} />
            </Grid>

            {/* Billing Details */}

            <Grid item size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Billing Client Details" />

              <BillingsDetails data={data} setData={setData} />
            </Grid>
          </Grid>

          {/* ===============job detals=========================== */}

          <SectionHeader title="Job Details" />

          <Grid container spacing={2.5}>
            <Grid item size={{ xs: 12, md: 12 }}>
              <TextField
                label="Subject"
                name="subject"
                fullWidth
                multiline
                rows={2}
                value={data.subject}
                onChange={handleChange}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="Start Date"
                type="date"
                name="startDate"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={data.startDate}
                onChange={handleChange}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                select
                label="Duration"
                value={data.duration}
                name="duration"
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {durationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item size={{ xs: 12, md: 3 }}>
              <TextField
                label="End Date"
                type="date"
                name="endDate"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={data.endDate}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <SectionHeader title="Attachment" />

          <Grid container spacing={2.5}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Box
                component="label"
                htmlFor="file-upload"
                sx={{
                  display: "flex",

                  flexDirection: "column",

                  alignItems: "center",

                  justifyContent: "center",

                  gap: 1,

                  p: 3,

                  borderRadius: "10px",

                  border: "2px dashed #d0d4e8",

                  backgroundColor: "#f4f5f7",

                  cursor: "pointer",

                  transition: "all 0.2s ease",

                  "&:hover": {
                    borderColor: "#5c7cfa",

                    backgroundColor: "#eef1ff",
                  },
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                    stroke="#8a90a0"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* <Typography
                  variant="body2"
                  sx={{ color: "#5a6072", fontWeight: 500 }}
                >
                  {data.files ? data.files.name : "Click to upload a Letter"}
                </Typography> */}
                
  <Typography variant="body2">
    {data.files?.length > 0
      ? data.files.map((f) => f.name).join(", ")
      : "Click to upload files"}
  </Typography>

                <Typography variant="caption" sx={{ color: "#b0b5c4" }}>
                  Any format accepted
                </Typography>

                <input
                  id="file-upload"
                  hidden
                  type="file"
                  name="files"
                   multiple
                  onChange={handleChange}
                />
              </Box>
            </Grid>
{/* ================================= */}



  {/* Avak Files Preview */}
  <Grid item xs={12} md={6}>
    <Box>
      <Typography fontWeight={600} mb={1}>
        Avak Files
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap">
        {avakFiles.length === 0 && (
          <Typography variant="caption">No files</Typography>
        )}

        {avakFiles.map((file) => {
          const isImage = file.content_type?.includes("image");
          const isPDF = file.content_type?.includes("pdf");

          const fileUrl = `http://103.79.34.50:8083/${file.file_path}`;

          return (
            <Box
              key={file.id}
              onClick={() => handleOpenFile(file)}
              sx={{
                width: 80,
                height: 80,
                border: "1px solid #ddd",
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                "&:hover": { boxShadow: 3 },
              }}
            >
              {isImage ? (
                <img
                  src={fileUrl}
                  alt="file"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : isPDF ? (
                <Typography variant="caption">PDF</Typography>
              ) : (
                <Typography variant="caption">FILE</Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  </Grid>
          </Grid>

          {/* ── Submit Bar ── */}

          <Box
            sx={{
              display: "flex",

              justifyContent: "flex-end",

              // position: "sticky",

              bottom: 0,

              backgroundColor: "#f7f8fc",

              pt: 2,

              pb: 1,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                px: 6,

                py: 1.3,

                borderRadius: "12px",

                textTransform: "none",

                fontWeight: 600,

                fontSize: "0.95rem",

                background: "#010a2a",

                boxShadow: "0 4px 14px rgba(92,124,250,0.4)",

                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4f6ef5 0%, #3b58e0 100%)",

                  boxShadow: "0 6px 18px rgba(92,124,250,0.5)",
                },

                transition: "all 0.2s ease",
              }}
            >
              Submit Job
            </Button>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
}
