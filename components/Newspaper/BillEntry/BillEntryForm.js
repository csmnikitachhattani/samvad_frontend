"use client";
import React, { useState } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  MenuItem,
} from "@mui/material";

const FlexRow = ({ children }) => (
  <div
    style={{
      display: "flex",
      gap: "18px",
      width: "100%",
    }}
  >
    {children}
  </div>
);

export default function BillEntryForm() {
  const [formData, setFormData] = useState({
    billNo: "",
    publicationBillDate: "",
    insertionDate: "",
    publishSizeW: "",
    publishSizeH: "",
    actualPublishDate: "",
    printingType: "",
    printingPage: "",
    rateType: "",
    billRate: "",
    grossAmount: "",
    commissionDiscount: "",
    netAmount: "",
    cest: "",
    gsst: "",
    hsnCode: "",
    netAmountWithGST: "",
    roundOff: "",
    netPayable: "",
    remarks: "",
  });

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  return (
    <Card
      sx={{
        maxWidth: 850,
        mx: "auto",
        mt: 4,
        borderRadius: "14px",
        border: "2px solid #F97316",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#1E293B",
            pb: 1.5,
            borderBottom: "2px solid #F97316",
            width: "fit-content",
            mb: 3,
          }}
        >
          BILL DETAILS
        </Typography>

        <Box
          sx={{
            background: "#F8FAFC",
            borderRadius: "10px",
            padding: 2,
            border: "1px solid #E2E8F0",
          }}
        >
          <Stack spacing={2}>
            {/* Bill No */}
            <TextField
              label="Bill No"
              size="small"
              fullWidth
              value={formData.billNo}
              onChange={handleChange("billNo")}
            />

            {/* Publication Bill Date */}
            <TextField
              label="Publication Bill Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.publicationBillDate}
              onChange={handleChange("publicationBillDate")}
            />

            {/* Insertion Date */}
            <TextField
              label="Insertion Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.insertionDate}
              onChange={handleChange("insertionDate")}
            />

            {/* Publish Size W & H */}
            <FlexRow>
              <TextField
                label="Publish Size (W)"
                size="small"
                fullWidth
                value={formData.publishSizeW}
                onChange={handleChange("publishSizeW")}
              />
              <TextField
                label="Publish Size (H)"
                size="small"
                fullWidth
                value={formData.publishSizeH}
                onChange={handleChange("publishSizeH")}
              />
            </FlexRow>

            {/* Actual Publish Date */}
            <TextField
              label="Actual Publish Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.actualPublishDate}
              onChange={handleChange("actualPublishDate")}
            />

            {/* Printing Type & Page */}
            <FlexRow>
              <TextField
                label="Printing Type"
                select
                size="small"
                fullWidth
                value={formData.printingType}
                onChange={handleChange("printingType")}
              >
                <MenuItem value="B/W">B/W</MenuItem>
                <MenuItem value="Color">Color</MenuItem>
              </TextField>

              <TextField
                label="Printing Page"
                select
                size="small"
                fullWidth
                value={formData.printingPage}
                onChange={handleChange("printingPage")}
              >
                <MenuItem value="Normal Page">Normal Page</MenuItem>
                <MenuItem value="Front Page">Front Page</MenuItem>
              </TextField>
            </FlexRow>

            {/* Rate Type */}
            <TextField
              label="Rate Type"
              select
              size="small"
              fullWidth
              value={formData.rateType}
              onChange={handleChange("rateType")}
            >
              <MenuItem value="CARD RATE">CARD RATE</MenuItem>
            </TextField>

            {/* Bill Rate */}
            <TextField
              label="Bill Rate"
              size="small"
              fullWidth
              value={formData.billRate}
              onChange={handleChange("billRate")}
            />

            {/* Gross Amount */}
            <TextField
              label="Bill Gross Amount"
              size="small"
              fullWidth
              value={formData.grossAmount}
              onChange={handleChange("grossAmount")}
            />

            {/* Commission / Discount */}
            <TextField
              label="Commission / Discount"
              size="small"
              fullWidth
              value={formData.commissionDiscount}
              onChange={handleChange("commissionDiscount")}
            />

            {/* Net Amount */}
            <TextField
              label="Net Amount"
              size="small"
              fullWidth
              value={formData.netAmount}
              onChange={handleChange("netAmount")}
            />

            {/* Taxes */}
            <FlexRow>
              <TextField
                label="C.E.S.T (2.5%)"
                size="small"
                fullWidth
                value={formData.cest}
                onChange={handleChange("cest")}
              />
              <TextField
                label="G.S.S.T (2.5%)"
                size="small"
                fullWidth
                value={formData.gsst}
                onChange={handleChange("gsst")}
              />
            </FlexRow>

            {/* HSN Code */}
            <TextField
              label="H.S.N Code"
              size="small"
              fullWidth
              value={formData.hsnCode}
              onChange={handleChange("hsnCode")}
            />

            {/* Net Amount With GST */}
            <TextField
              label="Net Amount (With GST)"
              size="small"
              fullWidth
              value={formData.netAmountWithGST}
              onChange={handleChange("netAmountWithGST")}
            />

            {/* Round-off */}
            <TextField
              label="Round Off Value"
              size="small"
              fullWidth
              value={formData.roundOff}
              onChange={handleChange("roundOff")}
            />

            {/* Net Payable */}
            <TextField
              label="Net Payable Amount"
              size="small"
              fullWidth
              sx={{
                background: "#C8FF9C",
                borderRadius: "4px",
              }}
              value={formData.netPayable}
              onChange={handleChange("netPayable")}
            />

            {/* Remarks */}
            <TextField
              label="Remarks"
              size="small"
              fullWidth
              multiline
              minRows={2}
              value={formData.remarks}
              onChange={handleChange("remarks")}
              helperText={`${formData.remarks.length}/200`}
            />
          </Stack>
        </Box>

        {/* Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button variant="outlined" color="error">Cancel</Button>
          <Button variant="contained" sx={{ background: "#FF7A00" }}>
            Save
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
