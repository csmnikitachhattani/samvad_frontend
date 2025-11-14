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
  Paper,
  Stack,
  Pagination,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

/* -------------------------
   Mock Data
   ------------------------- */
const MOCK_BILLS = [
  {
    id: "BL-0012",
    roId: "RO-0012",
    amount: 12000,
    publishDate: "2025-11-08",
    status: "Paid",
  },
  {
    id: "BL-0013",
    roId: "RO-0015",
    amount: 15000,
    publishDate: null,
    status: "Pending",
  },
  {
    id: "BL-0014",
    roId: "RO-0014",
    amount: 8000,
    publishDate: "2025-11-06",
    status: "Rejected",
  },
];

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusColor = (s) => {
  if (s === "Paid") return "success";
  if (s === "Pending") return "warning";
  if (s === "Rejected") return "error";
  return "default";
};

/* ======================================================
      MAIN COMPONENT — BILL LISTING + BILL ENTRY MODAL
   ====================================================== */
export default function BillListing() {
  const [bills, setBills] = useState(MOCK_BILLS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  /* -------------------------
      MODAL STATES
     ------------------------- */
  const [open, setOpen] = useState(false);
  const [newBill, setNewBill] = useState({
    id: "",
    roId: "",
    amount: "",
    publishDate: "",
    status: "Pending",
  });

  /* -------------------------
      FILTER + SEARCH
     ------------------------- */
  const filtered = useMemo(() => {
    let list = bills.slice();

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.roId.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      list = list.filter((b) => b.status === statusFilter);
    }

    return list;
  }, [bills, query, statusFilter]);

  const pageCount = Math.ceil(filtered.length / rowsPerPage);
  const pageRows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  /* -------------------------
      ADD NEW BILL
     ------------------------- */
  const handleSaveBill = () => {
    setBills((prev) => [...prev, newBill]);
    setOpen(false);
    setNewBill({
      id: "",
      roId: "",
      amount: "",
      publishDate: "",
      status: "Pending",
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Home / Bills
      </Typography>

      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Bill Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Maintain all bill entries linked with Release Orders
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Bill Entry
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              placeholder="Search Bill ID or RO ID..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bill ID</TableCell>
              <TableCell>RO ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Publish Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  No bills found
                </TableCell>
              </TableRow>
            )}

            {pageRows.map((b) => (
              <TableRow key={b.id} hover>
                <TableCell sx={{ fontWeight: 700 }}>{b.id}</TableCell>
                <TableCell>{b.roId}</TableCell>
                <TableCell>₹ {b.amount}</TableCell>
                <TableCell>
                  {b.publishDate ? formatDate(b.publishDate) : "Not Published"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={b.status}
                    size="small"
                    color={statusColor(b.status)}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {(page - 1) * rowsPerPage + 1}-
            {Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}
          </Typography>

          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, v) => setPage(v)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      </Paper>

      {/* ===========================
           BILL ENTRY MODAL
         =========================== */}
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
  );
}
