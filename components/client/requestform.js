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
    ip_address: "",
    forwardStatus: "N",
    deleteStatus: "N",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [savedRefId, setSavedRefId] = useState("");

  // ================= Local Storage (Client Safe) =================
  const [financialYear, setFinancialYear] = useState("");
  const [userId, setUserId] = useState("");
  const [user_name, setUserName] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      "financialYear",
      localStorage.getItem("financialYear") || "2024-2025",
    );
    localStorage.setItem("userId", localStorage.getItem("userId") || "00100");
    localStorage.setItem(
      "refCategoryId",
      localStorage.getItem("refCategoryId") || "02",
    );
    localStorage.setItem(
      "user_name",
      localStorage.getItem("user_name") ||
        "SUPERINTENDING ENGINEER, City Circle-II CSPDCL,Raipur, रायपुर",
    );

    setFinancialYear(localStorage.getItem("financialYear"));
    setUserId(localStorage.getItem("userId"));
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
  const catText = category?.catText || "";
  const category_option = catText ? catText.split("-")[0].trim() : "";
  const catId = category?.catId || "";

  const form_option = ["classified", "display"].includes(
    category_option.toLowerCase(),
  );

  // ================= Autofill Category =================
  useEffect(() => {
    if (catText && action !== "update") {
      setFormData((p) => ({
        ...p,
        refCategoryId: catId,
        refCategoryText: category_option,
      }));
    }
  }, [catText, action, catId, category_option]);

  // ================= Autofill Edit =================
  useEffect(() => {
    if (action === "update" && rowData) {
      setFormData({
        subject: rowData.subject || "",
        tenderAmt: rowData.tenderAmt || "",
        letterNo: rowData.letterNo || "",
        letterDate: rowData.letterDate?.split("T")[0] || "",
        scheduleDate: rowData.scheduleDate?.split("T")[0] || "",
        remarks: rowData.remarks || "",
        refCategoryId: rowData.refCategoryId || "",
        refCategoryText: rowData.refCategoryText || "",
        printInNationalNp: rowData.printInNationalNp || "",
        printInLocalNp: rowData.printInLocalNp || "",
        printInStateNp: rowData.printInStateNp || "",
        printInOtherNp: rowData.printInOtherNp || "",
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
        "http://103.79.34.50:8083/api/Client/insertclientadvtrequest",
        {
          ...formData,
          financialYear,
          userId,
          user_name,
        },
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
        `http://103.79.34.50:8083/api/Client/insertclientadvtrequest/${rowData.refId}`,
        {
          ...formData,
          financialYear,
          userId,
          refId: rowData.refId,
        },
      );

      setSavedRefId(rowData.refId);
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
      `/client/upload-file/${savedRefId}?financialYear=${financialYear}`,
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
              fontWeight="bold"
              mb={2}
              sx={{
                userSelect: "none",
                cursor: "default",
              }}
            >
              Financial Year: {financialYear}
            </Typography>

            <Grid container spacing={1}>
              <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Letter No"
                  name="letterNo"
                  value={formData.letterNo}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Letter Date"
                    format="DD/MM/YYYY"
                    value={
                      formData.letterDate ? dayjs(formData.letterDate) : null
                    }
                    minDate={dayjs().subtract(7, "day")}
                    maxDate={dayjs()}
                    onChange={(newValue) => {
                      if (!newValue || !newValue.isValid()) {
                        setFormData((prev) => ({ ...prev, letterDate: "" }));
                        return;
                      }

                      setFormData((prev) => ({
                        ...prev,
                        letterDate: newValue.format("YYYY-MM-DD"),
                        scheduleDate: "", // 🔥 reset schedule date if letter date changes
                      }));
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        size: "small",
                        inputProps: { readOnly: true }, // 🚫 no typing
                        onPaste: (e) => e.preventDefault(), // 🚫 no paste
                        onKeyDown: (e) => e.preventDefault(), // 🚫 no keyboard
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Schedule Date"
                    format="DD/MM/YYYY"
                    value={
                      formData.scheduleDate
                        ? dayjs(formData.scheduleDate)
                        : null
                    }
                    minDate={dayjs().add(3, "day")} // ✅ Only allow after today + 3 days
                    onChange={(newValue) => {
                      if (!newValue || !newValue.isValid()) {
                        setFormData((prev) => ({ ...prev, scheduleDate: "" }));
                        return;
                      }

                      setFormData((prev) => ({
                        ...prev,
                        scheduleDate: newValue.format("YYYY-MM-DD"),
                      }));
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        size: "small",
                        inputProps: { readOnly: true }, // 🚫 manual typing blocked
                        onPaste: (e) => e.preventDefault(), // 🚫 paste blocked
                        onKeyDown: (e) => e.preventDefault(), // 🚫 keyboard blocked
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 5 }}>
                <TextField
                  fullWidth
                  rows={2}
                  multiline
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Tender Amount"
                  name="tenderAmt"
                  value={formData.tenderAmt}
                  required
                  inputMode="decimal"
                  onChange={(e) => {
                    const value = e.target.value;

                    // Allow only digits and ONE decimal point
                    if (/^\d*\.?\d{0,2}$/.test(value)) {
                      setFormData((prev) => ({
                        ...prev,
                        tenderAmt: value,
                      }));
                    }
                  }}
                  onKeyDown={(e) => {
                    // Block invalid keys
                    if (["e", "E", "+", "-", ","].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 2 }}>
                <Select fullWidth size="small" value={formData.refCategoryId}>
                  <MenuItem value={catId}>{category_option}</MenuItem>
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
                    ["printInNationalNp", "National Newspapers"],
                    ["printInLocalNp", "Local Newspapers"],
                    ["printInStateNp", "State Newspapers"],
                    ["printInOtherNp", "Other Newspapers"],
                  ].map(([name, label]) => (
                    <Grid item key={name} size={{ xs: 12, sm: 6, md: 3 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        name={name}
                        label={label}
                        value={formData[name] || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, sm: 6, md: 5 }} mt={3}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
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
