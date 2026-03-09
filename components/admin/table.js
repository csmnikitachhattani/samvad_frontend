import React, {useEffect, useState } from "react";
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
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  InputAdornment
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import adminServices from "@/services/adminServices";

import {  useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";

const AdvtDownloadTable = ({ rows = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [data , setData] = useState([]);

//   const filteredRows = data.filter(
//     row =>
//       row.advt_no?.toLowerCase().includes(search.toLowerCase()) ||
//       row.file_desc?.toLowerCase().includes(search.toLowerCase())
//   );
const filteredRows = data
  useEffect(() => {
    async function fetchAgency() {
      try {
        const response = await adminServices.getAgency();
        setData(response?.result || []);
        console.log(response)
      } catch (error) {
        console.error("Failed to fetch states", error);
      }
    }
    fetchAgency();
  }, []);
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Advertisement Downloads
        </Typography>

        <TextField
          size="small"
          placeholder="Search by Advt No / Description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            )
          }}
        />
      </Stack>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 420 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>#</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>GST</b></TableCell>
              <TableCell><b>Contact Person</b></TableCell>
              {/* <TableCell><b>email</b></TableCell>
              <TableCell><b>phone</b></TableCell> */}
              <TableCell align="center"><b>Address</b></TableCell>
              {/* <TableCell align="center"><b>Status</b></TableCell> */}
              <TableCell><b>Validity To</b></TableCell>
              <TableCell><b>Validity From</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{row.agencyID}</TableCell>
                    <TableCell>{row.agencyName}</TableCell>
                    <TableCell>{row.gstin}</TableCell>
                    <TableCell>
                        <div>
                       <div><b>{row.contactPerson}</b></div>
                      <div><b>{row.email}</b></div>
                      <div><b>{row.phone}</b></div>
                        </div>
                    </TableCell>
                    {/* <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell> */}
                    <TableCell sx={{ maxWidth: 250 }}>
                      <Typography noWrap>
                        {row.address}
                         {row.state}
                         {row.district}
                      </Typography>
                    </TableCell>
{/* 
                    <TableCell align="center">
                      <Tooltip title="Download file">
                        <IconButton
                          color="primary"
                          href={row.advt_file_path}
                          target="_blank"
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell> */}

                   
                    <TableCell>
                      {new Date(row.validityFrom).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {new Date(row.validityTo).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No agencies found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default AdvtDownloadTable;
