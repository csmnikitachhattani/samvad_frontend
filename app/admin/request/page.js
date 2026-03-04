"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import adminServices from "@/services/adminServices";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  Chip,
  Skeleton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// ─────────────────────────────────────────────
// Shared Styles (Same as BusTable)
// ─────────────────────────────────────────────

const searchField = {
  minWidth: 300,
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8f9fb",
    fontSize: "0.85rem",
  },
};

const headCell = {
  fontWeight: 700,
  fontSize: "0.7rem",
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
  backgroundColor: "#f8f9fb",
  borderBottom: "1.5px solid #e9eaf0",
  py: 1.6,
};

const bodyCell = {
  borderBottom: "1px solid #f0f1f6",
  py: 2,
  verticalAlign: "middle",
};

const actionBtn = (color, bg) => ({
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.75rem",
  px: 1.5,
  py: 0.6,
  backgroundColor: bg,
  color: color,
  border: `1px solid ${color}22`,
  "&:hover": {
    backgroundColor: color,
    color: "#fff",
  },
});

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const formatDate = (d) => {
  if (!d) return "—";
  const parts = d.split("/");
  if (parts.length === 3) {
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
      .toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  }
  return d;
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

const RequestTable = ({ requestData }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

 
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await adminServices.getClientRequestList();
        console.log(res)
        setData(res);
      } catch (error) {
        console.error("Failed to fetch work orders", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredRows = data.filter((row) => {
    const term = search.toLowerCase();
    return (
      row.subject?.toLowerCase().includes(term) ||
      row.client?.toLowerCase().includes(term) ||
      row.ref_id?.toLowerCase().includes(term)
    );
  });

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        borderRadius: "18px",
        border: "1.5px solid #e9eaf0",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          background: "linear-gradient(135deg, #fafbff 0%, #f5f6fa 100%)",
          borderBottom: "1.5px solid #ebebf0",
        }}
      >
        <Box>
          <Typography fontWeight={700}>
            Client Requests
          </Typography>
          <Typography variant="caption" color="#9ca3af">
            {filteredRows.length} Requests found
          </Typography>
        </Box>

        <Box display="flex" gap={1.5}>
          <TextField
            size="small"
            placeholder="Search subject, client, ref id…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            sx={searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 17 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* <Button
            variant="contained"
            onClick={() => router.push("/admin/request/create")}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              px: 2.5,
              background: "#010a2a",
              "&:hover": { background: "#0d1b4b" },
            }}
          >
            + Create Request
          </Button> */}
        </Box>
      </Box>

      {/* TABLE */}
      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {["Request", "Client", "Publication", "Schedule", "Amount", "NP / Remarks", "Actions"].map((h) => (
                <TableCell key={h} sx={headCell}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.ref_id} hover>
                  
                  {/* Request Info */}
                  <TableCell sx={{ ...bodyCell, minWidth: 170 }}>
                    <Typography fontWeight={800}>
                      {row.ref_id}
                    </Typography>

                    <Chip
                      label={row.request_cat}
                      size="small"
                      sx={{
                        mt: 0.5,
                        borderRadius: "6px",
                        backgroundColor: "#f0f4ff",
                        color: "#4f46e5",
                        fontWeight: 700,
                        fontSize: "0.67rem",
                      }}
                    />

                    <Typography variant="caption" display="block" mt={0.5}>
                      {row.caption_name}
                    </Typography>
                  </TableCell>

                  {/* Client */}
                  <TableCell sx={{ ...bodyCell, minWidth: 220 }}>
                    <Typography fontWeight={700}>
                      {row.client}
                    </Typography>
                    <Typography variant="caption" color="#9ca3af">
                      {row.contact_no}
                    </Typography>
                  </TableCell>

                  {/* Publication */}
                  <TableCell sx={bodyCell}>
                    <Typography fontWeight={600}>
                      {formatDate(row.publish_date)}
                    </Typography>
                    <Typography variant="caption" color="#9ca3af">
                      Letter: {row.letter_no_date}
                    </Typography>
                  </TableCell>

                  {/* Schedule */}
                  <TableCell sx={bodyCell}>
                    <Typography fontWeight={600}>
                      {formatDate(row.schedule_date)}
                    </Typography>
                    <Typography variant="caption" color="#9ca3af">
                      Forward: {row.forward_date}
                    </Typography>
                  </TableCell>

                  {/* Amount */}
                  <TableCell sx={bodyCell}>
                    ₹ {row.tender_amt}
                  </TableCell>

                  {/* Remarks */}
                  <TableCell sx={{ ...bodyCell, minWidth: 200 }}>
                    <Tooltip title={row.print_on_np || row.print_in_other_remark || "—"}>
                      <Typography noWrap maxWidth={180}>
                        {row.print_on_np || row.print_in_other_remark || "—"}
                      </Typography>
                    </Tooltip>
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={bodyCell}>
                    <Stack spacing={0.8}>
                      <Button
                        size="small"
                        sx={actionBtn("#010a2a", "#e8eaf6")}
                        onClick={() =>
                          router.push(`/admin/request/${row.ref_id}`)
                        }
                      >
                        View / Edit
                      </Button>
                    </Stack>
                  </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
};

export default RequestTable;