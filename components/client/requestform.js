// // "use client";

// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import { useRouter, useSearchParams } from "next/navigation";

// // import {
// //   Box,
// //   Grid,
// //   Card,
// //   CardContent,
// //   Typography,
// //   TextField,
// //   Button,
// //   Select,
// //   MenuItem,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Divider,
// // } from "@mui/material";

// // const RequestForm = ({ category }) => {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();

// //   const action = searchParams.get("action"); // "update"
// //   const rowData =
// //     typeof window !== "undefined"
// //       ? JSON.parse(sessionStorage.getItem("rowData") || "null")
// //       : null;

// //   // ================= Init LocalStorage =================
// //   useEffect(() => {
// //     if (!localStorage.getItem("financial_year"))
// //       localStorage.setItem("financial_year", "2024-2025");

// //     if (!localStorage.getItem("user_id"))
// //       localStorage.setItem("user_id", "00100");

// //     if (!localStorage.getItem("ref_Category_id"))
// //       localStorage.setItem("ref_Category_id", "02");

// //     if (!localStorage.getItem("user_name"))
// //       localStorage.setItem(
// //         "user_name",
// //         "SUPERINTENDING ENGINEER, City Circle-II CSPDCL,Raipur, रायपुर"
// //       );

// //     fetchIP();
// //   }, []);

// //   const financial_year = localStorage.getItem("financial_year");
// //   const user_id = localStorage.getItem("user_id");
// //   const user_name = localStorage.getItem("user_name");

// //   // ================= Category Logic =================
// //   const cat_text = category?.cat_text || "";
// //   const category_option = cat_text ? cat_text.split("-")[0].trim() : "";
// //   const cat_id = category?.cat_id || "";

// //   const form_option = ["classified", "display"].includes(
// //     category_option.toLowerCase()
// //   );

// //   // ================= State =================
// //   const [formData, setFormData] = useState({
// //     subject: "",
// //     tender_amt: "",
// //     letter_no: "",
// //     letter_date: "",
// //     schedule_date: "",
// //     remarks: "",
// //     ref_Category_id: "",
// //     ref_Category_text: "",
// //     print_in_national_np: "",
// //     print_in_local_np: "",
// //     print_in_state_np: "",
// //     print_in_other_np: "",
// //     ip_address: "",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [savedRefId, setSavedRefId] = useState("");

// //   const letterDateRef = useRef(null);
// //   const scheduleDateRef = useRef(null);

// //   // ================= Fetch IP =================
// //   const fetchIP = async () => {
// //     try {
// //       const res = await fetch("https://api.ipify.org?format=json");
// //       const data = await res.json();
// //       setFormData((prev) => ({ ...prev, ip_address: data.ip }));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // ================= Auto Fill Category =================
// //   useEffect(() => {
// //     if (cat_text && action !== "update") {
// //       setFormData((prev) => ({
// //         ...prev,
// //         ref_Category_id: cat_id,
// //         ref_Category_text: category_option,
// //       }));
// //     }
// //   }, [cat_text, action]);

// //   // ================= Edit Mode =================
// //   useEffect(() => {
// //     if (action === "update" && rowData) {
// //       setFormData({
// //         ...rowData,
// //         letter_date: rowData.letter_date?.split("T")[0],
// //         schedule_date: rowData.schedule_date?.split("T")[0],
// //       });
// //       window.scrollTo({ top: 0, behavior: "smooth" });
// //     }
// //   }, [action, rowData]);

// //   // ================= Handlers =================
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     try {
// //       const payload = {
// //         ...formData,
// //         financial_year,
// //         user_id,
// //         user_name,
// //       };

// //       const res = await axios.post(
// //         "http://localhost:3080/api/client-advt-request",
// //         payload
// //       );

// //       setSavedRefId(res.data.ref_id);
// //       setOpenDialog(true);
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Submit error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleUpdate = async () => {
// //     setLoading(true);
// //     try {
// //       await axios.put(
// //         `http://localhost:3080/api/client-advt-request/${rowData.ref_id}`,
// //         {
// //           ...formData,
// //           financial_year,
// //           user_id,
// //         }
// //       );
// //       setSavedRefId(rowData.ref_id);
// //       setOpenDialog(true);
// //     } catch (err) {
// //       alert("Update failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleOk = () => {
// //     setOpenDialog(false);
// //     router.push(`/upload-file/${savedRefId}`);
// //   };

// //   // ================= UI =================
// //   return (
// //     <Box p={4}>
// //       <Card elevation={3}>
// //         <CardContent>
// //           <Typography align="center" fontWeight="bold">
// //             Financial Year: {financial_year}
// //           </Typography>

// //           <Divider sx={{ my: 2 }} />

// //           <Grid container spacing={2}>
// //             <Grid item md={3} xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Letter No"
// //                 name="letter_no"
// //                 value={formData.letter_no}
// //                 onChange={handleChange}
// //               />
// //             </Grid>

// //             <Grid item md={3} xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Letter Date"
// //                 value={formData.letter_date}
// //                 onClick={() => letterDateRef.current.showPicker()}
// //                 InputProps={{ readOnly: true }}
// //               />
// //               <input
// //                 type="date"
// //                 hidden
// //                 ref={letterDateRef}
// //                 onChange={(e) =>
// //                   setFormData((p) => ({ ...p, letter_date: e.target.value }))
// //                 }
// //               />
// //             </Grid>

// //             <Grid item md={5} xs={12}>
// //               <TextField
// //                 fullWidth
// //                 required
// //                 label="Subject"
// //                 name="subject"
// //                 value={formData.subject}
// //                 onChange={handleChange}
// //               />
// //             </Grid>

// //             <Grid item md={3} xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Schedule Date"
// //                 value={formData.schedule_date}
// //                 onClick={() => scheduleDateRef.current.showPicker()}
// //                 InputProps={{ readOnly: true }}
// //               />
// //               <input
// //                 type="date"
// //                 hidden
// //                 ref={scheduleDateRef}
// //                 onChange={(e) =>
// //                   setFormData((p) => ({
// //                     ...p,
// //                     schedule_date: e.target.value,
// //                   }))
// //                 }
// //               />
// //             </Grid>

// //             {form_option && (
// //               <Grid item md={3} xs={12}>
// //                 <TextField
// //                   fullWidth
// //                   type="number"
// //                   label="Tender Amount"
// //                   name="tender_amt"
// //                   value={formData.tender_amt}
// //                   onChange={handleChange}
// //                 />
// //               </Grid>
// //             )}

// //             <Grid item md={3} xs={12}>
// //               <Select
// //                 fullWidth
// //                 value={formData.ref_Category_id}
// //                 onChange={(e) =>
// //                   setFormData((p) => ({
// //                     ...p,
// //                     ref_Category_id: e.target.value,
// //                     ref_Category_text:
// //                       e.target.options[e.target.selectedIndex].text,
// //                   }))
// //                 }
// //               >
// //                 <MenuItem value={cat_id}>{category_option}</MenuItem>
// //               </Select>
// //             </Grid>
// //           </Grid>

// //           {form_option && (
// //             <>
// //               <Divider sx={{ my: 3 }} />
// //               <Typography fontWeight="bold" mb={1}>
// //                 Enter Number of Papers
// //               </Typography>
// //               <Grid container spacing={2}>
// //                 {[
// //                   "print_in_national_np",
// //                   "print_in_local_np",
// //                   "print_in_state_np",
// //                   "print_in_other_np",
// //                 ].map((field, i) => (
// //                   <Grid item md={3} xs={12} key={i}>
// //                     <TextField
// //                       fullWidth
// //                       type="number"
// //                       label={field.replace(/_/g, " ")}
// //                       name={field}
// //                       value={formData[field]}
// //                       onChange={handleChange}
// //                     />
// //                   </Grid>
// //                 ))}
// //               </Grid>
// //             </>
// //           )}

// //           <Divider sx={{ my: 3 }} />

// //           <TextField
// //             fullWidth
// //             multiline
// //             rows={4}
// //             label="Remarks"
// //             name="remarks"
// //             value={formData.remarks}
// //             onChange={handleChange}
// //           />

// //           <Box textAlign="center" mt={3}>
// //             <Button
// //               variant="contained"
// //               size="large"
// //               disabled={loading}
// //               onClick={action === "update" ? handleUpdate : handleSubmit}
// //             >
// //               {loading
// //                 ? "Processing..."
// //                 : action === "update"
// //                 ? "Update Request"
// //                 : "Submit Request"}
// //             </Button>
// //           </Box>
// //         </CardContent>
// //       </Card>

// //       {/* SUCCESS DIALOG */}
// //       <Dialog open={openDialog}>
// //         <DialogTitle>Success</DialogTitle>
// //         <DialogContent>
// //           <Typography align="center">
// //             Ref ID: <b>{savedRefId}</b>
// //           </Typography>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleOk} variant="contained">
// //             OK
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default RequestForm;


// // "use client";

// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   Typography,
// //   TextField,
// //   Button,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Divider,
// //   Grid,
// //   Select,
// //   MenuItem,
// // } from "@mui/material";

// // import { initLocalStorage } from "@/app/utils/initClientStorage";

// // const RequestForm = ({ category }) => {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const action = searchParams.get("action");

// //   // ================= STATE (ALL HOOKS FIRST) =================
// //   const [mounted, setMounted] = useState(false);

// //   const [clientData, setClientData] = useState({
// //     financial_year: "",
// //     user_id: "",
// //     user_name: "",
// //     ref_Category_id: "",
// //   });

// //   const [formData, setFormData] = useState({
// //     subject: "",
// //     tender_amt: "",
// //     letter_no: "",
// //     letter_date: "",
// //     schedule_date: "",
// //     remarks: "",
// //     ref_Category_id: "",
// //     ref_Category_text: "",
// //     print_in_national_np: "",
// //     print_in_local_np: "",
// //     print_in_state_np: "",
// //     print_in_other_np: "",
// //     ip_address: "",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [savedRefId, setSavedRefId] = useState("");

// //   const letterDateRef = useRef(null);
// //   const scheduleDateRef = useRef(null);

// //   // ================= EFFECTS =================
// //   useEffect(() => {
// //     initLocalStorage();

// //     setClientData({
// //       financial_year: localStorage.getItem("financial_year") || "",
// //       user_id: localStorage.getItem("user_id") || "",
// //       user_name: localStorage.getItem("user_name") || "",
// //       ref_Category_id: localStorage.getItem("ref_Category_id") || "",
// //     });

// //     setMounted(true);
// //   }, []);

// //   useEffect(() => {
// //     const fetchIP = async () => {
// //       try {
// //         const res = await fetch("https://api.ipify.org?format=json");
// //         const data = await res.json();
// //         setFormData((prev) => ({ ...prev, ip_address: data.ip }));
// //       } catch (err) {
// //         console.error("IP fetch error", err);
// //       }
// //     };
// //     fetchIP();
// //   }, []);

// //   // ================= SAFE RENDER CHECK =================
// //   if (!mounted) return null;

// //   const { financial_year, user_id, user_name } = clientData;

// //   // ================= HANDLERS =================
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     try {
// //       const payload = {
// //         ...formData,
// //         financial_year,
// //         user_id,
// //         user_name,
// //       };

// //       const res = await axios.post(
// //         "http://localhost:3080/api/client-advt-request",
// //         payload
// //       );

// //       setSavedRefId(res.data.ref_id);
// //       setOpenDialog(true);
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Submit error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleOk = () => {
// //     setOpenDialog(false);
// //     router.push(`/upload-file/${savedRefId}`);
// //   };

// //   // ================= UI =================
// //   return (
// //      <Box p={4}>
// //     <Card elevation={3}>
// //       <CardContent>
// //          <Typography align="center" fontWeight="bold">
// //            Financial Year: {financial_year}
// //          </Typography>
// //          <Divider sx={{ my: 2 }} />
// //          <Grid container spacing={2}>
// //            <Grid item md={3} xs={12}>
// //              <TextField
// //                 fullWidth
// //                  label="Letter No"
// //                  name="letter_no"
// //                  value={formData.letter_no}
// //                  onChange={handleChange}
// //                />
// //              </Grid>

// //              <Grid item md={3} xs={12}>
// //                <TextField
// //                  fullWidth
// //                  label="Letter Date"
// //                  value={formData.letter_date}
// //                  onClick={() => letterDateRef.current.showPicker()}
// //                  InputProps={{ readOnly: true }}
// //                />
// //                <input
// //                  type="date"
// //                  hidden
// //                  ref={letterDateRef}
// //                  onChange={(e) =>
// //                    setFormData((p) => ({ ...p, letter_date: e.target.value }))
// //                  }
// //                />
// //              </Grid>
// //              <Grid item md={5} xs={12}>
// //                <TextField
// //                  fullWidth
// //                  required
// //                  label="Subject"
// //                  name="subject"
// //                  value={formData.subject}
// //                  onChange={handleChange}
// //                />
// //              </Grid>

// //              <Grid item md={3} xs={12}>
// //                <TextField
// //                  fullWidth
// //                  label="Schedule Date"
// //                  value={formData.schedule_date}
// //                  onClick={() => scheduleDateRef.current.showPicker()}
// //                  InputProps={{ readOnly: true }}
// //                />
// //                <input
// //                  type="date"
// //                  hidden
// //                  ref={scheduleDateRef}
// //                  onChange={(e) =>
// //                    setFormData((p) => ({
// //                      ...p,
// //                      schedule_date: e.target.value,
// //                    }))
// //                  }
// //                />
// //              </Grid>
// //              {form_option && (
// //                <Grid item md={3} xs={12}>
// //                  <TextField
// //                    fullWidth
// //                    type="number"
// //                    label="Tender Amount"
// //                    name="tender_amt"
// //                    value={formData.tender_amt}
// //                    onChange={handleChange}
// //                  />
// //                </Grid>
// //              )}
// //              <Grid item md={3} xs={12}>
// //                <Select
// //                  fullWidth
// //                  value={formData.ref_Category_id}
// //                  onChange={(e) =>
// //                    setFormData((p) => ({
// //                      ...p,
// //                      ref_Category_id: e.target.value,
// //                      ref_Category_text:
// //                        e.target.options[e.target.selectedIndex].text,
// //                    }))
// //                  }
// //                >
// //                  <MenuItem value={cat_id}>{category_option}</MenuItem>
// //                </Select>
// //              </Grid>
// //            </Grid>
// //            {form_option && (
// //              <>
// //                <Divider sx={{ my: 3 }} />
// //                <Typography fontWeight="bold" mb={1}>
// //                  Enter Number of Papers
// //                </Typography>
// //                <Grid container spacing={2}>
// //                  {[
// //                    "print_in_national_np",
// //                    "print_in_local_np",
// //                    "print_in_state_np",
// //                    "print_in_other_np",
// //                  ].map((field, i) => (
// //                    <Grid item md={3} xs={12} key={i}>
// //                      <TextField
// //                        fullWidth
// //                        type="number"
// //                        label={field.replace(/_/g, " ")}
// //                        name={field}
// //                        value={formData[field]}
// //                        onChange={handleChange}
// //                      />
// //                    </Grid>
// //                  ))}
// //                </Grid>
// //              </>
// //            )}
// //            <Divider sx={{ my: 3 }} />
// //            <TextField
// //              fullWidth
// //              multiline
// //              rows={4}
// //              label="Remarks"
// //              name="remarks"
// //              value={formData.remarks}
// //              onChange={handleChange}
// //            />
// //            <Box textAlign="center" mt={3}>
// //              <Button
// //                variant="contained"
// //                size="large"
// //                disabled={loading}
// //                onClick={action === "update" ? handleUpdate : handleSubmit}
// //              >
// //                {loading
// //                  ? "Processing..."
// //                  : action === "update"
// //                  ? "Update Request"
// //                  : "Submit Request"}
// //              </Button>
// //            </Box>
// //          </CardContent>
// //        </Card>
// //        {/* SUCCESS DIALOG */}
// //        <Dialog open={openDialog}>
// //          <DialogTitle>Success</DialogTitle>
// //          <DialogContent>
// //            <Typography align="center">
// //              Ref ID: <b>{savedRefId}</b>
// //            </Typography>
// //          </DialogContent>
// //          <DialogActions>
// //            <Button onClick={handleOk} variant="contained">
// //              OK
// //            </Button>
// //          </DialogActions>
// //        </Dialog>
// //      </Box>
// //   );
// // };

// // export default RequestForm;



// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Divider,
//   Grid,
//   Select,
//   MenuItem,
// } from "@mui/material";

// import { initLocalStorage } from "@/app/utils/initClientStorage";

// const RequestForm = ({ category }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const action = searchParams.get("action");

//   // ================= SAFE CATEGORY VALUES =================
//   const form_option = category?.form_option || false;
//   const cat_id = category?.cat_id || "";
//   const category_option = category?.category_option || "";

//   // ================= STATE =================
//   const [mounted, setMounted] = useState(false);

//   const [clientData, setClientData] = useState({
//     financial_year: "",
//     user_id: "",
//     user_name: "",
//     ref_Category_id: "",
//   });

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
//   const [openDialog, setOpenDialog] = useState(false);
//   const [savedRefId, setSavedRefId] = useState("");

//   const letterDateRef = useRef(null);
//   const scheduleDateRef = useRef(null);

//   // ================= EFFECTS =================
//   useEffect(() => {
//     initLocalStorage();

//     setClientData({
//       financial_year: localStorage.getItem("financial_year") || "",
//       user_id: localStorage.getItem("user_id") || "",
//       user_name: localStorage.getItem("user_name") || "",
//       ref_Category_id: localStorage.getItem("ref_Category_id") || "",
//     });

//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     const fetchIP = async () => {
//       try {
//         const res = await fetch("https://api.ipify.org?format=json");
//         const data = await res.json();
//         setFormData((prev) => ({ ...prev, ip_address: data.ip }));
//       } catch (err) {
//         console.error("IP fetch error", err);
//       }
//     };
//     fetchIP();
//   }, []);

//   if (!mounted) return null;

//   const { financial_year, user_id, user_name } = clientData;

//   // ================= HANDLERS =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         ...formData,
//         financial_year,
//         user_id,
//         user_name,
//       };

//       const res = await axios.post(
//         "http://localhost:3080/api/client-advt-request",
//         payload
//       );

//       setSavedRefId(res.data.ref_id);
//       setOpenDialog(true);
//     } catch (err) {
//       alert(err.response?.data?.message || "Submit error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update uses same logic (no change in behavior)
//   const handleUpdate = handleSubmit;

//   const handleOk = () => {
//     setOpenDialog(false);
//     router.push(`/upload-file/${savedRefId}`);
//   };

//   // ================= UI =================
//   return (
//     <Box p={4}>
//       <Card elevation={3}>
//         <CardContent>
//           <Typography align="center" fontWeight="bold">
//             Financial Year: {financial_year}
//           </Typography>

//           <Divider sx={{ my: 2 }} />

//           <Grid container spacing={2}>
//             <Grid item md={3} xs={12}>
//               <TextField
//                 fullWidth
//                 label="Letter No"
//                 name="letter_no"
//                 value={formData.letter_no}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item md={3} xs={12}>
//               <TextField
//                 fullWidth
//                 label="Letter Date"
//                 value={formData.letter_date}
//                 onClick={() => letterDateRef.current.showPicker()}
//                 InputProps={{ readOnly: true }}
//               />
//               <input
//                 type="date"
//                 hidden
//                 ref={letterDateRef}
//                 onChange={(e) =>
//                   setFormData((p) => ({ ...p, letter_date: e.target.value }))
//                 }
//               />
//             </Grid>

//             <Grid item md={5} xs={12}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Subject"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item md={3} xs={12}>
//               <TextField
//                 fullWidth
//                 label="Schedule Date"
//                 value={formData.schedule_date}
//                 onClick={() => scheduleDateRef.current.showPicker()}
//                 InputProps={{ readOnly: true }}
//               />
//               <input
//                 type="date"
//                 hidden
//                 ref={scheduleDateRef}
//                 onChange={(e) =>
//                   setFormData((p) => ({
//                     ...p,
//                     schedule_date: e.target.value,
//                   }))
//                 }
//               />
//             </Grid>

//             {form_option && (
//               <Grid item md={3} xs={12}>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   label="Tender Amount"
//                   name="tender_amt"
//                   value={formData.tender_amt}
//                   onChange={handleChange}
//                 />
//               </Grid>
//             )}

//             <Grid item md={3} xs={12}>
//               <Select
//                 fullWidth
//                 value={formData.ref_Category_id}
//                 onChange={(e) =>
//                   setFormData((p) => ({
//                     ...p,
//                     ref_Category_id: e.target.value,
//                     ref_Category_text:
//                       e.target.options[e.target.selectedIndex].text,
//                   }))
//                 }
//               >
//                 <MenuItem value={cat_id}>{category_option}</MenuItem>
//               </Select>
//             </Grid>
//           </Grid>

//           {form_option && (
//             <>
//               <Divider sx={{ my: 3 }} />
//               <Typography fontWeight="bold" mb={1}>
//                 Enter Number of Papers
//               </Typography>

//               <Grid container spacing={2}>
//                 {[
//                   "print_in_national_np",
//                   "print_in_local_np",
//                   "print_in_state_np",
//                   "print_in_other_np",
//                 ].map((field) => (
//                   <Grid item md={3} xs={12} key={field}>
//                     <TextField
//                       fullWidth
//                       type="number"
//                       label={field.replace(/_/g, " ")}
//                       name={field}
//                       value={formData[field]}
//                       onChange={handleChange}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>
//             </>
//           )}

//           <Divider sx={{ my: 3 }} />

//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             label="Remarks"
//             name="remarks"
//             value={formData.remarks}
//             onChange={handleChange}
//           />

//           <Box textAlign="center" mt={3}>
//             <Button
//               variant="contained"
//               size="large"
//               disabled={loading}
//               onClick={action === "update" ? handleUpdate : handleSubmit}
//             >
//               {loading
//                 ? "Processing..."
//                 : action === "update"
//                 ? "Update Request"
//                 : "Submit Request"}
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* SUCCESS DIALOG */}
//       <Dialog open={openDialog}>
//         <DialogTitle>Success</DialogTitle>
//         <DialogContent>
//           <Typography align="center">
//             Ref ID: <b>{savedRefId}</b>
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleOk} variant="contained">
//             OK
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default RequestForm;


// ====================================





"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";

const RequestForm = ({ category }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ================= Router Params =================
  const action = searchParams.get("action");
  const rowData = searchParams.get("rowData")
    ? JSON.parse(searchParams.get("rowData"))
    : null;

  // ================= State =================
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

  // ================= Local Storage (Client Safe) =================
  const [financial_year, setFinancialYear] = useState("");
  const [user_id, setUserId] = useState("");
  const [user_name, setUserName] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("financial_year", localStorage.getItem("financial_year") || "2024-2025");
    localStorage.setItem("user_id", localStorage.getItem("user_id") || "00100");
    localStorage.setItem("ref_Category_id", localStorage.getItem("ref_Category_id") || "02");
    localStorage.setItem(
      "user_name",
      localStorage.getItem("user_name") ||
        "SUPERINTENDING ENGINEER, City Circle-II CSPDCL,Raipur, रायपुर"
    );

    setFinancialYear(localStorage.getItem("financial_year"));
    setUserId(localStorage.getItem("user_id"));
    setUserName(localStorage.getItem("user_name"));

    const getIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setFormData((p) => ({ ...p, ip_address: data.ip }));
      } catch {
        console.error("IP fetch failed");
      }
    };

    getIP();
  }, []);

  // ================= Category =================
  const cat_text = category?.cat_text || "";
  const category_option = cat_text ? cat_text.split("-")[0].trim() : "";
  const cat_id = category?.cat_id || "";

  const form_option = ["classified", "display"].includes(
    category_option.toLowerCase()
  );

  // ================= Autofill Category =================
  useEffect(() => {
    if (cat_text && action !== "update") {
      setFormData((p) => ({
        ...p,
        ref_Category_id: cat_id,
        ref_Category_text: category_option,
      }));
    }
  }, [cat_text, action, cat_id, category_option]);

  // ================= Autofill Edit =================
  useEffect(() => {
    if (action === "update" && rowData) {
      setFormData({
        subject: rowData.subject || "",
        tender_amt: rowData.tender_amt || "",
        letter_no: rowData.letter_no || "",
        letter_date: rowData.letter_date?.split("T")[0] || "",
        schedule_date: rowData.schedule_date?.split("T")[0] || "",
        remarks: rowData.remarks || "",
        ref_Category_id: rowData.ref_Category_id || "",
        ref_Category_text: rowData.ref_Category_text || "",
        print_in_national_np: rowData.print_in_national_np || "",
        print_in_local_np: rowData.print_in_local_np || "",
        print_in_state_np: rowData.print_in_state_np || "",
        print_in_other_np: rowData.print_in_other_np || "",
        ip_address: rowData.ip_address || "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [action, rowData]);

  // ================= Handle Change =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // ================= Submit =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3080/api/client-advt-request",
        {
          ...formData,
          financial_year,
          user_id,
          user_name,
        }
      );

      setSavedRefId(res.data.ref_id);
      setShowModal(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  // ================= Update =================
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `http://localhost:3080/api/client-advt-request/${rowData.ref_id}`,
        {
          ...formData,
          financial_year,
          user_id,
          ref_id: rowData.ref_id,
        }
      );

      setSavedRefId(rowData.ref_id);
      setShowModal(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating");
    } finally {
      setLoading(false);
    }
  };

  // ================= OK Redirect =================
  const handleOk = () => {
    setShowModal(false);
    router.push(
      `/client/upload-file/${savedRefId}`
    );
  };

  // ================= UI =================
  return (
    <Box p={3}>
      <Dialog open={showModal} onClose={handleOk}>
        <DialogTitle sx={{ bgcolor: "success.main", color: "#fff" }}>
          Success
        </DialogTitle>
        <DialogContent>
          <Typography align="center" mt={2}>
            {action === "update"
              ? "Record updated successfully!"
              : "Data submitted successfully!"}
          </Typography>
          <Typography align="center" fontWeight="bold">
            Ref ID: {savedRefId}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleOk}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

     <form>
        <Card>
          <CardContent>
     

            <Typography
  align="center"
  fontWeight="bold"
  mb={2}
  sx={{
    userSelect: "none",
    cursor: "default",
  }}
>
  Financial Year: {financial_year}
</Typography>


            <Grid container spacing={2}>
              <Grid item md={3}>
                <TextField
                  fullWidth
                  placeholder="Letter No"
                  name="letter_no"
                  value={formData.letter_no}
                  onChange={handleChange}
                />
              </Grid>


<Grid item md={5}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label="Letter Date"
      value={formData.letter_date ? dayjs(formData.letter_date) : null}
      minDate={dayjs().subtract(7, "day")} // ✅ today - 7
      maxDate={dayjs()}                   // ✅ today
      onChange={(newValue) => {
        setFormData((prev) => ({
          ...prev,
          letter_date: newValue
            ? newValue.format("YYYY-MM-DD")
            : "",
        }));
      }}
      slotProps={{
        textField: {
          fullWidth: true,
          required: true,
          InputProps: {
            readOnly: true, // 🚫 no typing
          },
        },
      }}
    />
  </LocalizationProvider>
</Grid>


              <Grid item md={5}>
                <TextField
                  fullWidth
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Grid>


              <Grid item md={5}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label="Schedule Date"
      value={formData.schedule_date ? dayjs(formData.schedule_date) : null}
      minDate={dayjs().add(1, "day")}   // ✅ tomorrow only
      onChange={(newValue) => {
        setFormData((prev) => ({
          ...prev,
          schedule_date: newValue
            ? newValue.format("YYYY-MM-DD")
            : "",
        }));
      }}
      slotProps={{
        textField: {
          fullWidth: true,
          required: true,
          InputProps: {
            readOnly: true, // 🚫 typing blocked
          },
        },
      }}
    />
  </LocalizationProvider>
</Grid>


<Grid item md={5}>
  <TextField
    fullWidth
    placeholder="Tender Amount"
    name="tender_amt"
    value={formData.tender_amt}
    required
    inputMode="decimal"         
    onChange={(e) => {
      const value = e.target.value;

      // Allow only digits and ONE decimal point
      if (/^\d*\.?\d{0,2}$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          tender_amt: value,
        }));
      }
    }}
    onKeyDown={(e) => {
      // Block invalid keys
      if (
        ["e", "E", "+", "-", ","].includes(e.key)
      ) {
        e.preventDefault();
      }
    }}
  />
</Grid>




              <Grid item md={3}>
                <Select fullWidth value={formData.ref_Category_id}>
                  <MenuItem value={cat_id}>{category_option}</MenuItem>
                </Select>
              </Grid>
            </Grid>

            {form_option && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography fontWeight="bold" color="success.main">
                  Enter Number of Papers
                </Typography>

                <Grid container spacing={2} mt={1}>
                  {[
                    ["print_in_national_np", "National Newspapers"],
                    ["print_in_local_np", "Local Newspapers"],
                    ["print_in_state_np", "State Newspapers"],
                    ["print_in_other_np", "Other Newspapers"],
                  ].map(([name, label]) => (
                    <Grid item md={3} key={name}>
                      <TextField
                        fullWidth
                        type="number"
                        name={name}
                        placeholder={label}
                        value={formData[name]}
                        onChange={handleChange}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            <Box mt={3}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
              />
            </Box>
          </CardContent>
        </Card>

        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            disabled={loading}
            onClick={action === "update" ? handleUpdate : handleSubmit}
          >
            {loading
              ? "Processing..."
              : action === "update"
              ? "Update Request"
              : "Submit Request"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RequestForm;
