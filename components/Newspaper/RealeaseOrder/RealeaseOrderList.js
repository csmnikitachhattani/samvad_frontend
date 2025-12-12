"use client";
import React, { useMemo, useState, useEffect } from "react";
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
  Skeleton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { toggleUploadModal, toggleStatusModal, } from "@/store/modules/newspaper/realeaseSlice.js";
import { publishRO, getRODetails } from "@/store/modules/newspaper/realeaseSlice.js";
import { useSelector, useDispatch } from "react-redux";
import UploadProof from './UploadProof';
import StatusModal from './StatusModal';
import ROService from "@/services/ROServices";

export default function ReleaseOrderListing() {

  const [Rodata, setRoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load API Data
  useEffect(() => {
    loadUser();
  }, []);
  const ToggleStatusDialog = (avak_ref_id, advt_no) => {
    dispatch(toggleStatusModal())
    dispatch(
      getRODetails({
        avak_ref_id: avak_ref_id,
        advt_no: advt_no,
        financial_year : '2024-2025'
      })
    );
  };
  const loadUser = async () => {
    try {
      const res = await ROService.getROList("000019");
      console.log(res?.data?.data)
      setRoData(res?.data?.data || []);
    } catch (err) {
      console.error("Error loading RO:", err);
    } finally {
      setLoading(false);
    }
  };
  const formatINR = (value) => `₹ ${Number(value).toLocaleString("en-IN")}`;
  const dispatch = useDispatch();

  const handleView = (row) => {
    alert(`View ${row.id}`);
  };

  const handleExportCSV = () => {
    alert("Export logic here...");
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Breadcrumb */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Home / Release Orders
      </Typography>

      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Release Orders Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track all newspaper release orders
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExportCSV}>
            Export
          </Button>
        </Stack>
      </Box>

      {/* Table */}
      <Paper sx={{boxShadow: 'none', border: '1px solid #E5E5e5', BorderBottom: 'none', borderRadius: '12px'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>RO No.</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Publish Date</TableCell>
              <TableCell>Total Rate</TableCell>
              <TableCell>Content Size(L*W)</TableCell>
              <TableCell>Published Proof</TableCell>
              <TableCell align="right">Update Publish Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {/* 🔥 Skeleton Rows */}
            {loading
              ? [...Array(8)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton width={80} /></TableCell>
                    <TableCell>
                      <Skeleton width={200} />
                      <Skeleton width={120} height={20} />
                    </TableCell>
                    <TableCell><Skeleton width={180} /></TableCell>
                    <TableCell><Skeleton width={130} /></TableCell>
                    <TableCell><Skeleton width={90} /></TableCell>
                    <TableCell><Skeleton width={90} /></TableCell>
                    <TableCell><Skeleton width={140} height={35} /></TableCell>
                    <TableCell align="right">
                      <Skeleton width={110} height={40} />
                    </TableCell>
                  </TableRow>
                ))
              : Rodata?.map((row, index) => (
                  <TableRow key={index} hover>

                    <TableCell>
                      <Typography sx={{ fontWeight: 600, width: "100px" }}>
                        {row.np_news_cd}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontWeight: 600, width: "250px" }}>
                        {row.subject.substring(0, 50)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        RO Date: {row.ro_date || "—"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontWeight: 600, width: "250px" }}>
                        {row.client_name.substring(0, 50)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {row.sch_pub_date ? row.sch_pub_date : "Not Published"}
                    </TableCell>

                    <TableCell>
                      <Typography>{formatINR(row.total_rate)}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography>
                        {row.size_row} X {row.size_col}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {row.proof ? (
                        <Button startIcon={<FilePresentIcon />} size="small">
                          {row.proof}
                        </Button>
                      ) : (
                        <Button
                          startIcon={<UploadFileIcon />}
                          size="small"
                          onClick={() => dispatch(toggleUploadModal())}
                        >
                          Upload Publish Copy
                        </Button>
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">

                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleView(row)}
                        >
                          <VisibilityIcon />
                        </IconButton>

                        <Button
                          onClick={() => ToggleStatusDialog(row.avak_ref_id, row.advt_no)}
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            padding: "6px 18px",
                            borderRadius: "30px",
                            background: "linear-gradient(135deg,#FF9800,#F57C00)",
                            color: "#fff",
                            "&:hover": {
                              background: "linear-gradient(135deg,#FB8C00,#EF6C00)",
                            },
                          }}
                        >
                          Update
                        </Button>
                      </Stack>
                    </TableCell>

                  </TableRow>
                ))}

          </TableBody>
        </Table>
      </Paper>

      <StatusModal />
      <UploadProof />
    </Box>
  );
}
