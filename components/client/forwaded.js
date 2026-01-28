"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  Pagination,
  Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ForwardIcon from "@mui/icons-material/Forward";

const ForwardTo = () => {
  const router = useRouter();

  const financial_year =
    typeof window !== "undefined"
      ? localStorage.getItem("financial_year")
      : "";
  const user_id =
    typeof window !== "undefined" ? localStorage.getItem("user_id") : "";
  const user_name =
    typeof window !== "undefined" ? localStorage.getItem("user_name") : "";

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  // ================= Fetch Data =================
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://103.79.34.50:8090/api/get-client-advt-request",
        {
          params: {
            financial_year,
            user_id,
            user_name,
            action: "get_not_forwarded",
            category: "",
          },
        }
      );
      setData(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= Edit =================
  const handleEdit = async (ref_id) => {
    try {
      const res = await axios.get(
        `http://103.79.34.50:8090/api/get-client-advt-request/${ref_id}`,
        {
          params: {
            financial_year,
            user_id,
            user_name,
            action: "get_by_id",
          },
        }
      );

      router.push(`/?action=update&ref_id=${ref_id}`, {
        state: { rowData: res.data },
      });
    } catch (error) {
      console.error("Edit Error:", error);
    }
  };

  // ================= Delete =================
  const handleDelete = async (ref_id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await axios.delete(
        `http://103.79.34.50:8090/api/client-advt-request/${ref_id}`,
        {
          data: {
            ref_id,
            financial_year,
            user_id,
            user_name,
            action: "delete",
          },
        }
      );

      if (res.data.status === 1) {
        setData((prev) => prev.filter((row) => row.ref_id !== ref_id));
        alert("Deleted successfully");
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Server error");
    }
  };

  // ================= Pagination =================
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  return (
    <Box p={4}>
      {/* ---------- Header ---------- */}
      <Typography
        variant="h5"
        color="error"
        textAlign="center"
        mb={3}
        fontWeight="bold"
      >
        Forward To Samvad <ForwardIcon />
      </Typography>

      {/* ---------- Table ---------- */}
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Ref ID</b></TableCell>
              <TableCell><b>Subject</b></TableCell>
              <TableCell><b>Letter No</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Letter Date</b></TableCell>
              <TableCell><b>Scheduled Date</b></TableCell>
              <TableCell><b>Tender Amt</b></TableCell>
              <TableCell><b>Attachment</b></TableCell>
              <TableCell><b>Action</b></TableCell>
              <TableCell align="center">
                <b>Forward</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentRecords.map((row) => (
              <TableRow key={row.ref_id}>
                <TableCell>{row.ref_id}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.letter_no}</TableCell>
                <TableCell>{row.ref_Category_text}</TableCell>
                <TableCell>{formatDate(row.letter_date)}</TableCell>
                <TableCell>{formatDate(row.schedule_date)}</TableCell>
                <TableCell>{row.tender_amt}</TableCell>
                <TableCell>—</TableCell>

                {/* Action */}
                <TableCell>
                  <IconButton
                    color="warning"
                    onClick={() => handleEdit(row.ref_id)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.ref_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>

                {/* Forward */}
                <TableCell align="center">
                  <Checkbox />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ---------- Pagination ---------- */}
      <Stack alignItems="center" mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default ForwardTo;
