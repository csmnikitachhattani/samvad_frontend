



// // ====================================

// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";
// import dayjs from "dayjs";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Divider,
// } from "@mui/material";

// const RequestForm = ({ category }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // ================= Router Params =================
//   const action = searchParams.get("action");
//   const rowData = searchParams.get("rowData")
//     ? JSON.parse(searchParams.get("rowData"))
//     : null;

//   // ================= State =================
//   const [formData, setFormData] = useState({
//     subject: "",
//     tender_amt: "",
//     letter_no: "",
//     letter_date: "",
//     schedule_date: "",
//     remarks: "",
//     ref_Category_id: "",
//     ref_Category_text: "",
//     print_in_national_np: "",
//     print_in_local_np: "",
//     print_in_state_np: "",
//     print_in_other_np: "",
//     ip_address: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [savedRefId, setSavedRefId] = useState("");

//   // ================= Local Storage (Client Safe) =================
//   const [financial_year, setFinancialYear] = useState("");
//   const [user_id, setUserId] = useState("");
//   const [user_name, setUserName] = useState("");

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     localStorage.setItem(
//       "financial_year",
//       localStorage.getItem("financial_year") || "2024-2025",
//     );
//     localStorage.setItem("user_id", localStorage.getItem("user_id") || "00100");
//     localStorage.setItem(
//       "ref_Category_id",
//       localStorage.getItem("ref_Category_id") || "02",
//     );
//     localStorage.setItem(
//       "user_name",
//       localStorage.getItem("user_name") ||
//         "SUPERINTENDING ENGINEER, City Circle-II CSPDCL,Raipur, रायपुर",
//     );

//     setFinancialYear(localStorage.getItem("financial_year"));
//     setUserId(localStorage.getItem("user_id"));
//     setUserName(localStorage.getItem("user_name"));

//     const getIP = async () => {
//       try {
//         const res = await fetch("https://api.ipify.org?format=json");
//         const data = await res.json();
//         setFormData((p) => ({ ...p, ip_address: data.ip }));
//       } catch {
//         console.error("IP fetch failed");
//       }
//     };

//     getIP();
//   }, []);

//   // ================= Category =================
//   const cat_text = category?.cat_text || "";
//   const category_option = cat_text ? cat_text.split("-")[0].trim() : "";
//   const cat_id = category?.cat_id || "";

//   const form_option = ["classified", "display"].includes(
//     category_option.toLowerCase(),
//   );

//   // ================= Autofill Category =================
//   useEffect(() => {
//     if (cat_text && action !== "update") {
//       setFormData((p) => ({
//         ...p,
//         ref_Category_id: cat_id,
//         ref_Category_text: category_option,
//       }));
//     }
//   }, [cat_text, action, cat_id, category_option]);

//   // ================= Autofill Edit =================
//   useEffect(() => {
//     if (action === "update" && rowData) {
//       setFormData({
//         subject: rowData.subject || "",
//         tender_amt: rowData.tender_amt || "",
//         letter_no: rowData.letter_no || "",
//         letter_date: rowData.letter_date?.split("T")[0] || "",
//         schedule_date: rowData.schedule_date?.split("T")[0] || "",
//         remarks: rowData.remarks || "",
//         ref_Category_id: rowData.ref_Category_id || "",
//         ref_Category_text: rowData.ref_Category_text || "",
//         print_in_national_np: rowData.print_in_national_np || "",
//         print_in_local_np: rowData.print_in_local_np || "",
//         print_in_state_np: rowData.print_in_state_np || "",
//         print_in_other_np: rowData.print_in_other_np || "",
//         ip_address: rowData.ip_address || "",
//       });
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [action, rowData]);

//   // ================= Handle Change =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   // ================= Submit =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://103.79.34.50:3080/api/client-advt-request",
//         {
//           ...formData,
//           financial_year,
//           user_id,
//           user_name,
//         },
//       );

//       setSavedRefId(res.data.ref_id);
//       setShowModal(true);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error submitting form");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= Update =================
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.put(
//         `http://103.79.34.50:3080/api/client-advt-request/${rowData.ref_id}`,
//         {
//           ...formData,
//           financial_year,
//           user_id,
//           ref_id: rowData.ref_id,
//         },
//       );

//       setSavedRefId(rowData.ref_id);
//       setShowModal(true);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error updating");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= OK Redirect =================
//   const handleOk = () => {
//     setShowModal(false);

//     router.push(
//       `/client/upload-file/${savedRefId}?financial_year=${financial_year}`,
//     );
//   };

//   // ================= UI =================
//   return (
//     <Box p={3}>
//       <Dialog open={showModal} onClose={handleOk}>
//         <DialogTitle sx={{ bgcolor: "success.main", color: "#fff" }}>
//           Success
//         </DialogTitle>
//         <DialogContent>
//           <Typography align="center" mt={2}>
//             {action === "update"
//               ? "Record updated successfully!"
//               : "Data submitted successfully!"}
//           </Typography>
//           <Typography align="center" fontWeight="bold">
//             Ref ID: {savedRefId}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="success" onClick={handleOk}>
//             OK
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <form>
//         <Card>
//           <CardContent>
//             <Typography
//               align="center"
//               fontWeight="bold"
//               mb={2}
//               sx={{
//                 userSelect: "none",
//                 cursor: "default",
//               }}
//             >
//               Financial Year: {financial_year}
//             </Typography>

//             <Grid container spacing={2}>
//               <Grid item md={3}>
//                 <TextField
//                   fullWidth
//                   placeholder="Letter No"
//                   name="letter_no"
//                   value={formData.letter_no}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item md={5}>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker
//                     label="Letter Date"
//                     value={
//                       formData.letter_date ? dayjs(formData.letter_date) : null
//                     }
//                     minDate={dayjs().subtract(7, "day")} // ✅ today - 7
//                     maxDate={dayjs()} // ✅ today
//                     onChange={(newValue) => {
//                       setFormData((prev) => ({
//                         ...prev,
//                         letter_date: newValue
//                           ? newValue.format("YYYY-MM-DD")
//                           : "",
//                       }));
//                     }}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         InputProps: {
//                           readOnly: true, // 🚫 no typing
//                         },
//                       },
//                     }}
//                   />
//                 </LocalizationProvider>
//               </Grid>

//               <Grid item md={5}>
//                 <TextField
//                   fullWidth
//                   placeholder="Subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>

//               <Grid item md={5}>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker
//                     label="Schedule Date"
//                     value={
//                       formData.schedule_date
//                         ? dayjs(formData.schedule_date)
//                         : null
//                     }
//                     minDate={dayjs().add(1, "day")} // ✅ tomorrow only
//                     onChange={(newValue) => {
//                       setFormData((prev) => ({
//                         ...prev,
//                         schedule_date: newValue
//                           ? newValue.format("YYYY-MM-DD")
//                           : "",
//                       }));
//                     }}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         InputProps: {
//                           readOnly: true, // 🚫 typing blocked
//                         },
//                       },
//                     }}
//                   />
//                 </LocalizationProvider>
//               </Grid>

//               <Grid item md={5}>
//                 <TextField
//                   fullWidth
//                   placeholder="Tender Amount"
//                   name="tender_amt"
//                   value={formData.tender_amt}
//                   required
//                   inputMode="decimal"
//                   onChange={(e) => {
//                     const value = e.target.value;

//                     // Allow only digits and ONE decimal point
//                     if (/^\d*\.?\d{0,2}$/.test(value)) {
//                       setFormData((prev) => ({
//                         ...prev,
//                         tender_amt: value,
//                       }));
//                     }
//                   }}
//                   onKeyDown={(e) => {
//                     // Block invalid keys
//                     if (["e", "E", "+", "-", ","].includes(e.key)) {
//                       e.preventDefault();
//                     }
//                   }}
//                 />
//               </Grid>

//               <Grid item md={3}>
//                 <Select fullWidth value={formData.ref_Category_id}>
//                   <MenuItem value={cat_id}>{category_option}</MenuItem>
//                 </Select>
//               </Grid>
//             </Grid>

//             {form_option && (
//               <>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography fontWeight="bold" color="success.main">
//                   Enter Number of Papers
//                 </Typography>

//                 <Grid container spacing={2} mt={1}>
//                   {[
//                     ["print_in_national_np", "National Newspapers"],
//                     ["print_in_local_np", "Local Newspapers"],
//                     ["print_in_state_np", "State Newspapers"],
//                     ["print_in_other_np", "Other Newspapers"],
//                   ].map(([name, label]) => (
//                     <Grid item md={3} key={name}>
//                       <TextField
//                         fullWidth
//                         type="number"
//                         name={name}
//                         placeholder={label}
//                         value={formData[name]}
//                         onChange={handleChange}
//                       />
//                     </Grid>
//                   ))}
//                 </Grid>
//               </>
//             )}

//             <Box mt={3}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 label="Remarks"
//                 name="remarks"
//                 value={formData.remarks}
//                 onChange={handleChange}
//               />
//             </Box>
//           </CardContent>
//         </Card>

//         <Box textAlign="center" mt={3}>
//           <Button
//             variant="contained"
//             disabled={loading}
//             onClick={action === "update" ? handleUpdate : handleSubmit}
//           >
//             {loading
//               ? "Processing..."
//               : action === "update"
//                 ? "Update Request"
//                 : "Submit Request"}
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default RequestForm;




"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Chip,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

const RequestForm = ({ category }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const action = searchParams.get("action"); // update / create
  const rowData = null; // you can pass via props or API

  /* ── Session Setup ── */
  useEffect(() => {
    if (!localStorage.getItem("financial_year"))
      localStorage.setItem("financial_year", "2024-2025");
    if (!localStorage.getItem("user_id"))
      localStorage.setItem("user_id", "00100");
    if (!localStorage.getItem("user_name"))
      localStorage.setItem(
        "user_name",
        "SUPERINTENDING ENGINEER, City Circle-II CSPDCL,Raipur"
      );

    const getIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setFormData((prev) => ({ ...prev, ip_address: data.ip }));
      } catch (err) {
        console.error(err);
      }
    };
    getIP();
  }, []);

  const financial_year = localStorage.getItem("financial_year");
  const user_id = localStorage.getItem("user_id");
  const user_name = localStorage.getItem("user_name");

  /* ── Category Logic ── */
  const catText = category?.catText || "";
  const category_option = catText ? catText.split("-")[0].trim() : "";
  const catId = category?.catId || "";
  const form_option = ["classified", "display"].includes(
    category_option.toLowerCase()
  );

  /* ── Form State ── */
  const [formData, setFormData] = useState({
    subject: "",
    tender_amt: "",
    letter_no: "",
    letter_date: "",
    schedule_date: "",
    remarks: "",
    ref_Category_id: "",
    ref_Category_text: "",
    print_in_national_np: "",
    print_in_local_np: "",
    print_in_state_np: "",
    print_in_other_np: "",
    ip_address: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [savedRefId, setSavedRefId] = useState("");

  useEffect(() => {
    if (catText && action !== "update") {
      setFormData((prev) => ({
        ...prev,
        ref_Category_text: category_option,
        ref_Category_id: catId,
      }));
    }
  }, [catText, action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Submit ── */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        financial_year,
        user_id,
        user_name,
      };

      const res = await axios.post(
        "http://localhost:3080/api/client-advt-request",
        payload
      );

      setSavedRefId(res.data.ref_id);
      setShowModal(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  const handleOk = () => {
    setShowModal(false);
    router.push(`/upload-file/${savedRefId}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background:
        //   "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        // p: 4,
      }}
    >
      <Box maxWidth="900px" mx="auto">
        {/* Banner */}
        <Card
          sx={{
            p: 3,
            borderRadius: "20px 20px 0 0",
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid #6366f1",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight={700} color="#e0e7ff">
              {action === "update"
                ? "Edit Advertisement Request"
                : "New Advertisement Request"}
            </Typography>

            <Chip
              label={`FY ${financial_year}`}
              sx={{
                bgcolor: "#6366f1",
                color: "#fff",
                fontWeight: 600,
              }}
            />
          </Box>
        </Card>

        {/* Form Card */}
        <Card
          sx={{
            p: 4,
            borderRadius: "0 0 20px 20px",
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#a5b4fc", mb: 2, letterSpacing: 2 }}
          >
            BASIC DETAILS
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Letter No"
                name="letter_no"
                value={formData.letter_no}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ sx: { color: "#fff" } }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Letter Date"
                name="letter_date"
                InputLabelProps={{ shrink: true }}
                value={formData.letter_date}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Schedule Date"
                name="schedule_date"
                InputLabelProps={{ shrink: true }}
                value={formData.schedule_date}
                onChange={handleChange}
              />
            </Grid>

            {form_option && (
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Tender Amount (₹)"
                  name="tender_amt"
                  value={formData.tender_amt}
                  onChange={handleChange}
                />
              </Grid>
            )}
          </Grid>

          {/* Newspaper Section */}
          {form_option && (
            <Box mt={4}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#818cf8", mb: 2 }}
              >
                Number of Newspapers
              </Typography>

              <Grid container spacing={2}>
                {[
                  { name: "print_in_national_np", label: "National" },
                  { name: "print_in_local_np", label: "Local" },
                  { name: "print_in_state_np", label: "State" },
                  { name: "print_in_other_np", label: "Other" },
                ].map((item) => (
                  <Grid item xs={12} md={3} key={item.name}>
                    <TextField
                      fullWidth
                      type="number"
                      label={item.label}
                      name={item.name}
                      value={formData[item.name]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Remarks */}
          <Box mt={4}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#a5b4fc", mb: 2 }}
            >
              REMARKS
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              name="remarks"
              placeholder="Add remarks..."
              value={formData.remarks}
              onChange={handleChange}
            />
          </Box>

          {/* Submit Button */}
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleSubmit}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              }}
            >
              {loading ? "Processing..." : "Submit Request"}
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Success Dialog */}
      <Dialog open={showModal} onClose={handleOk}>
        <DialogTitle textAlign="center">
          Request Submitted!
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pb: 4 }}>
          <Typography>Your Reference ID</Typography>
          <Typography fontSize={22} fontWeight={700} mt={1}>
            {savedRefId}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleOk}
          >
            Continue →
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RequestForm;

