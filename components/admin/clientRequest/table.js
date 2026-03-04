"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import adminServices from "@/services/adminServices";

// ── Helpers ─────────────────────────────────────
const fmt = (d) => {
  if (!d) return "—";
  const parts = d.split("/");
  if (parts.length === 3) {
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toLocaleDateString(
      "en-IN",
      { day: "2-digit", month: "short", year: "numeric" }
    );
  }
  return d;
};

// ── Component ───────────────────────────────────
const RequestTable = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

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
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Request Registry
        </Typography>

        <Box display="flex" gap={1.5}>
          <TextField
            size="small"
            placeholder="Search subject, client, ref id..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* 🔥 Create Request Button */}
          <Button
            variant="contained"
            onClick={() => router.push("/admin/request/create")}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            + Create Request
          </Button>
        </Box>
      </Box>

      {/* ── Table ── */}
      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {[
                "Ref ID",
                "Category",
                "Subject",
                "Client",
                "Publish Date",
                "Amount",
                "Contact",
                "Actions",
              ].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Skeleton height={40} />
                </TableCell>
              </TableRow>
            ) : filteredRows.length > 0 ? (
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Typography fontWeight={600}>
                        {row.ref_id}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={row.request_cat}
                        size="small"
                        color="primary"
                      />
                    </TableCell>

                    <TableCell>{row.subject}</TableCell>

                    <TableCell sx={{ maxWidth: 250 }}>
                      {row.client}
                    </TableCell>

                    <TableCell>{fmt(row.publish_date)}</TableCell>

                    <TableCell>
                      ₹ {row.tender_amt}
                    </TableCell>

                    <TableCell>{row.contact_no}</TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          onClick={() =>
                            router.push(`/admin/request/${row.ref_id}`)
                          }
                        >
                          View
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Requests Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Pagination ── */}
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