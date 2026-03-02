"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
   Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useParams,useRouter } from "next/navigation";

const UpdateClientRequestForm = ({
  userId = "00100",
  financialYear = "2024-2025",
}) => {
  const params = useParams();
  const ref_id = params?.ref_id;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [formData, setFormData] = useState({
      subject: "",
      tenderAmt: "",
      letterNo: "",
      letterDate: "",
      scheduleDate: "",
      remarks: "",
      refCategoryId: "",
     refCategoryText: "",
      printInNationalNp: "" || null,
      printInLocalNp: "" || null,
      printInStateNp: "" || null,
      printInOtherNp: "" || null,
      printInOtherRemark: "",
      ip_address: "",
      forwardStatus: "N",
      deleteStatus: "N",
      client_Sno_Key: "",
    });



const router = useRouter();

const [openModal, setOpenModal] = useState(false);
const [modalMessage, setModalMessage] = useState("");
const [updatedRefId, setUpdatedRefId] = useState("");



  // 🔹 Fetch record and autofill form
  useEffect(() => {
    const fetchRecord = async () => {
      if (!ref_id) return;

      try {
        setFetchLoading(true);

        const response = await axios.get(
          "http://103.79.34.50:8083/api/Client/getclientadvtrequests",
          {
            params: {
              user_id: userId,
              financial_year: financialYear,
              action: "get_by_id",
              ref_id: ref_id,
              category: "02",
            },
          }
        );

        console.log("Full API Response:", response.data);

        if (response.data?.message !== "Success") {
          alert(response.data?.message || "Failed to fetch record");
          return;
        }

        const data = response.data?.data?.[0];
console.log("Fetched Record Data:", data);
        if (!data) {
          alert("No record found");
          return;
        }

        // ✅ Proper Auto-fill (date + safe values)
        
        
         setFormData({
        subject: data.subject || "",
        tenderAmt: data.tender_Amt || "",
        letterNo: data.letter_No || "",
        letterDate: data.letter_Date?.split("T")[0] || "",
        scheduleDate: data.schedule_Date?.split("T")[0] || "",
        remarks: data.remarks || "",
        printInOtherRemark: data.print_In_Other_Remark || "",
        refCategoryId: data.ref_Category_Id || "",
        refCategoryText: data.ref_Category_Text || "",
        printInNationalNp: data.print_In_National_Np || "",
        printInLocalNp: data.print_In_Local_Np || "",
        printInStateNp: data.print_In_State_Np || "",
        printInOtherNp: data.print_In_Other_Np || "",
        ip_address:  "100.12.12.12",
        deleteStatus:"N",
        forwardStatus: "N",
        clientSnoKey: data.client_Sno_Key || "",
        clientCd: data.client_Cd || "",
      });
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Error fetching record details");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchRecord();
  }, [ref_id, userId, financialYear]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  if (fetchLoading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Loading record...</Typography>
      </Box>
    );
  }

  // 🔹 Update API
  // const handleUpdate = async (e) => {
  //   e.preventDefault();

  //   if (!ref_id) {
  //     alert("Invalid Reference ID");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     await axios.put(
  //       `http://103.79.34.50:8083/api/Client/updateclientadvtrequest`,
  //       {
  //         ...formData,
  //         refId: ref_id,
  //         // category:formData.refCategoryId, 
  //         userId: userId,
  //         financialYear: financialYear,
  //         subject: formData.subject,
  //         // /clientSnoKey: formData.clientSnoKey,
  //         clientCd: formData.clientCd,
  //         ip_address: formData.ip_address,
  //         forwardStatus: formData.forwardStatus,
  //         deleteStatus: formData.deleteStatus,

  //       }
  //     );

  //     alert("Updated Successfully!");
  //   } 
    
  
  //   catch (err) {
  //     console.error("Update Error:", err);
  //     alert(err.response?.data?.message || "Error updating record");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleUpdate = async (e) => {
  e.preventDefault();

  if (!ref_id) {
    alert("Invalid Reference ID");
    return;
  }

  setLoading(true);

  try {
    const payload = {
      refId: ref_id,
      financialYear: financialYear,
      subject: formData.subject,
      clientSnoKey: Number(formData.clientSnoKey) || 0,
      clientCd: formData.clientCd || "",
      tenderAmt: Number(formData.tenderAmt) || 0,
      letterNo: formData.letterNo || "",
      letterDate: formData.letterDate
        ? new Date(formData.letterDate).toISOString()
        : null,
      scheduleDate: formData.scheduleDate
        ? new Date(formData.scheduleDate).toISOString()
        : null,
      remarks: formData.printInOtherRemark || "",
      printInNationalNp: Number(formData.printInNationalNp) || 0,
      printInLocalNp: Number(formData.printInLocalNp) || 0,
      printInStateNp: Number(formData.printInStateNp) || 0,
      printInOtherNp: Number(formData.printInOtherNp) || 0,
      printInOtherRemark: formData.printInOtherRemark || "",
      deleteStatus: formData.deleteStatus || "N",
      forwardStatus: formData.forwardStatus || "N",
      refCategoryText: formData.refCategoryText || "",
      refCategoryId: formData.refCategoryId || "",
      ip_address: formData.ip_address || "100.12.12.12",
      userId: userId,
    };

    console.log("PUT Payload:", payload);

    const response = await axios.put(
      "http://103.79.34.50:8083/api/Client/updateclientadvtrequest",
      payload
    );

    console.log("Update Response:", response.data);

    if (response.data?.message === "Success") {
      setModalMessage("Client Request Updated Successfully!");
      setUpdatedRefId(ref_id);
      setOpenModal(true); // 🔥 OPEN MODAL
    } else {
      setModalMessage(response.data?.message || "Update failed");
      setUpdatedRefId(ref_id);
      setOpenModal(true);
    }
  } catch (err) {
    console.error("Update Error:", err.response?.data || err);
    setModalMessage(
      err.response?.data?.message || "Error updating record"
    );
    setUpdatedRefId(ref_id);
    setOpenModal(true);
  } finally {
    setLoading(false);
  }
};



  const handleModalOk= () => {
    setOpenModal(false);

    router.push(
      `/client/upload-file/${ref_id}?financialYear=${financialYear}`,
    );
  };

  

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card sx={{ maxWidth: 1100, mx: "auto", borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            Update Client Request (Ref ID: {ref_id})
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Financial Year: {financialYear}
          </Typography>

          {/* Top Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Letter No"
                name="letterNo"
                value={formData.letterNo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Letter Date *"
                type="date"
                name="letterDate"
                value={formData.letterDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Schedule Date *"
                type="date"
                name="scheduleDate"
                value={formData.scheduleDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          {/* Second Row */}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Subject *"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Tender Amount *"
                name="tenderAmt"
                value={formData.tenderAmt}
                onChange={handleChange}
              />
            </Grid>

            {/* ✅ Autofilled Category (NO DROPDOWN) */}
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Category"
                name="refCategoryText"
                value={formData.refCategoryText}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          {/* Papers Section */}
          <Typography
            variant="h6"
            sx={{ mt: 4, mb: 2, color: "green", fontWeight: 600 }}
          >
            Enter Number of Papers
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="National Newspapers"
                name="printInNationalNp"
                value={formData.printInNationalNp}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Local Newspapers"
                name="printInLocalNp"
                value={formData.printInLocalNp}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="State Newspapers"
                name="printInStateNp"
                value={formData.printInStateNp}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Other Newspapers"
                name="printInOtherNp"
                value={formData.printInOtherNp}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Remarks */}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Remarks"
                name="printInOtherRemark"
                value={formData.printInOtherRemark}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          {/* Update Button */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleUpdate}
              disabled={loading}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                backgroundColor: "#1976d2",
              }}
            >
              {loading ? "Updating..." : "Update Request"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* ✅ Success / Error Modal */}
<Dialog open={openModal} onClose={handleModalOk}>
  <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
    Update Status
  </DialogTitle>

  <DialogContent>
    <Typography variant="body1" sx={{ mb: 1 }}>
      {modalMessage}
    </Typography>

    <Typography variant="body2" color="primary">
      Reference ID: <b>{updatedRefId}</b>
    </Typography>
  </DialogContent>

  <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
    <Button
      variant="contained"
      onClick={handleModalOk}
      sx={{ px: 4, fontWeight: "bold" }}
    >
      OK
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default UpdateClientRequestForm;
