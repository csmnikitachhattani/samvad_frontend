"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Stack,
  Paper,
  Pagination,
  Tooltip,
} from "@mui/material"

export default function UploadProofDialog() {
    return (
        <Box sx={{ p: 3 }}>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          New Bill Entry
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Bill ID"
              fullWidth
              value={newBill.id}
              onChange={(e) =>
                setNewBill({ ...newBill, id: e.target.value })
              }
            />

            <TextField
              label="Release Order ID"
              fullWidth
              value={newBill.roId}
              onChange={(e) =>
                setNewBill({ ...newBill, roId: e.target.value })
              }
            />

            <TextField
              label="Bill Amount"
              fullWidth
              type="number"
              value={newBill.amount}
              onChange={(e) =>
                setNewBill({ ...newBill, amount: e.target.value })
              }
            />

            <TextField
              label="Publish Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newBill.publishDate}
              onChange={(e) =>
                setNewBill({ ...newBill, publishDate: e.target.value })
              }
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={newBill.status}
                onChange={(e) =>
                  setNewBill({ ...newBill, status: e.target.value })
                }
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveBill}>
            Save Bill
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
    )

}

