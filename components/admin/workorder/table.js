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
    Chip,
    IconButton,
    Button,
    Tooltip,
    Typography,
    Stack,
    InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import adminServices from "@/services/adminServices";

const CounterTable = ({ rows = [] }) => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const filteredRows = data

    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [financialYear, setFinancialYear] = useState("")
    const [ipAddress, setIpAddress] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;
        setUserId(localStorage.getItem("userid") || "");
        setUserName(localStorage.getItem("username") || "");
        setFinancialYear(localStorage.getItem("financialYear") || "");


        fetch("https://api.ipify.org?format=json")
            .then((r) => r.json())
            .then((d) => setIpAddress(d.ip))
            .catch(() => {});

        let fin_year = localStorage.getItem("financialYear")
        async function fetchCounters(fin_year) {
            try {
                const response = await adminServices.getWorkorders();
                setData(response.data || []);
                console.log(response)
            } catch (error) {
                console.error("Failed to fetch states", error);
            }
        }
        fetchCounters();
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
                    Pending Workorder
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
                            <TableCell><b>Client</b></TableCell>
                            <TableCell><b>Avak/ref Id</b></TableCell>
                            <TableCell><b>Subject</b></TableCell>

                            <TableCell align="center"><b>WO Date</b></TableCell>
                            {/* <TableCell align="center"><b>Status</b></TableCell> */}
                            {/* <TableCell><b>Start - End Date</b></TableCell> */}
                            <TableCell><b>Service Type</b></TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredRows.length > 0 ? (
                            filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell>{row.job_no}
                                        <div>{row.vendor_name}</div>
                                        </TableCell>

                                        <TableCell><div>{row.client_name}</div>
                                            <div>{row.client_ref_id}</div>
                                            <div>{row.office_address}</div>
                                            <div>{row.section_code}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div>Avak Id:{row.avak_ref_id}</div>
                            
                                            <div>ref no:{row.client_ref_id}</div>
                                        </TableCell>
                                        <TableCell >
                                            {row.wo_subject}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                            {row.wo_date }
                                                {/* {new Date(row.receipt_date).toLocaleDateString()} */}
                                            </div>
                                        </TableCell>
                                        
                                        {/* <TableCell>
                                            {new Date(row.startDate).toLocaleDateString()}
                      -  {new Date(row.endDate).toLocaleDateString()}
                                        </TableCell> */}

                                        <TableCell>
                                            <div>{row.od_servicetype_id}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                //onClick={() => setShowAction(true)}
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/workorder/create?id=${row.job_no}&avak_ref=${row.avak_ref_id}&ref_id=${
                                                            row.client_ref_id}&V_id=${row.vendor_id}`
                                                    )
                                                }
                                                sx={{ mb: 2, background: "#010a2a", color: "#fff", textTransform: "capitalize", margin: '2px' }}
                                            >
                                                Proceed Workorder</Button>


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

export default CounterTable;
