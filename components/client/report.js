"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import parse from "html-react-parser";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

// 🔴 IMPORT HERE
import { initLocalStorage, fetchClientIP } from "@/app/utils/initClientStorage";

const RECORDS_PER_PAGE = 20;

const Report = () => {
  // 🔴 STATE FOR IP
  const [ipAddress, setIpAddress] = useState("");

  // 🔴 SAFE LOCALSTORAGE READ
  const financial_year =
    typeof window !== "undefined" ? localStorage.getItem("financial_year") : "2024-2025";

  const user_id =
    typeof window !== "undefined" ? localStorage.getItem("user_id") : "00100";

  const [action, setAction] = useState("get");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("02");
  const [categoryList, setCategoryList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- INIT LOCAL STORAGE + IP ---------------- */
  useEffect(() => {
    initLocalStorage();

    const loadIP = async () => {
      const ip = await fetchClientIP();
      setIpAddress(ip);
    };

    loadIP();
  }, []);

  /* ---------------- API ---------------- */
  const loadCategory = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://103.79.34.50:3080/api/createnewrequest",
      );
      setCategoryList(res.data?.data || res.data || []);
    } catch {
      setCategoryList([]);
    }
  }, []);

  const fetchData = useCallback(async () => {
    if (!financial_year || !user_id) return;

    try {
      setLoading(true);
      const res = await axios.get(
        "http://103.79.34.50:3080/api/get-client-advt-request",
        {
          params: {
            financial_year,
            user_id,
            action,
            category,
            ip_address: ipAddress, // 🔴 OPTIONAL USE
          },
        },
      );
      setData(res.data?.data || []);
    } finally {
      setLoading(false);
    }
  }, [financial_year, user_id, action, category, ipAddress]);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  useEffect(() => {
    if (action && category) fetchData();
  }, [fetchData]);

  /* ---------------- Filter ---------------- */
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const refMatch = (item.ref_id || "")
        .toLowerCase()
        .includes(search.toLowerCase());
      const catMatch = category
        ? Number(item.ref_Category_id) === Number(category)
        : true;
      return refMatch && catMatch;
    });
  }, [data, search, category]);

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(filteredData.length / RECORDS_PER_PAGE);

  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * RECORDS_PER_PAGE;
    return filteredData.slice(start, start + RECORDS_PER_PAGE);
  }, [filteredData, currentPage]);

  /* ---------------- JSX ---------------- */
  return (
    <Box p={3}>
      <Card elevation={6}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={3}>
            Client Advertisement Requests
          </Typography>

          {/* Filters */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={3}>
              <Select
                fullWidth
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <MenuItem value="">Select Category</MenuItem>
                {categoryList.map((c) => (
                  <MenuItem key={c.cat_id} value={c.cat_id}>
                    {c.cat_text?.split("-")[0]}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={4}>
              <Select
                fullWidth
                value={action}
                onChange={(e) => {
                  setAction(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <MenuItem value="get">Get All</MenuItem>
                <MenuItem value="get_forwarded">Forwarded</MenuItem>
                <MenuItem value="get_not_forwarded">Not Forwarded</MenuItem>
                <MenuItem value="get_under_process">Under Process</MenuItem>
                <MenuItem value="get_all_accepted">Accepted</MenuItem>
                <MenuItem value="get_all_unaccepted">Unaccepted</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Search Reference ID"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </Grid>
          </Grid>

          {loading ? (
            <Box textAlign="center" py={4}>
              <CircularProgress />
            </Box>
          ) : currentRows.length === 0 ? (
            <Alert severity="error">No data available</Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#333" }}>
                    {[
                      "Sn",
                      "Ref ID",
                      "Subject",
                      "Tender",
                      "Category",
                      "Attachment",
                      "Status",
                    ].map((h) => (
                      <TableCell key={h} sx={{ color: "#fff" }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentRows.map((item, idx) => (
                    <TableRow key={item.ref_id}>
                      <TableCell>
                        {(currentPage - 1) * RECORDS_PER_PAGE + idx + 1}
                      </TableCell>
                      <TableCell>{item.ref_id}</TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>{item.tender_amt}</TableCell>
                      <TableCell>{item.ref_Category_text}</TableCell>
                      <TableCell>
                        {item.count_attachment
                          ? parse(String(item.count_attachment))
                          : "-"}
                      </TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {totalPages > 1 && (
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                color="primary"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Report;
