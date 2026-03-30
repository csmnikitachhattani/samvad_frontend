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
    Divider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import adminServices from "@/services/adminServices";

const AdvtDownloadTable = ({ rows = [] }) => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    // ✅ Fixed: search actually filters now
    const filteredRows = data.filter((row) => {
        const term = search.toLowerCase();
        return (
            String(row.job_id).toLowerCase().includes(term) ||
            (row.subject || "").toLowerCase().includes(term) ||
            (row.client_name || "").toLowerCase().includes(term)
        );
    });

    useEffect(() => {
        async function fetchCounters() {
            try {
                const response = await adminServices.getcounter();
                setData(response || []);
            } catch (error) {
                console.error("Failed to fetch counters", error);
            }
        }
        fetchCounters();
    }, []);

    async function Approved(job_id, avak_ref_id, fin_year) {
        try {
            const payload = {
                financial_year: fin_year,
                avak_ref_id: avak_ref_id,
                job_no: job_id,
                ro_no_list: "",
                approval_action: "A",
                approved_by_user_id: "00141",
                approved_by_username: "bheem sahu",
                approved_by_ip: "103.68.78.89",
                action_cd: "06",
                status_reason_cd: "01",
                action_name: "Approve",
                remark: "string",
                approved_by_type_cd: "01",
                approved_by_section_cd: "05"
                
            };
            const response = await adminServices.ApprovedNotesheet(payload);
            // setData(response || []);
        } catch (error) {
            console.error("Failed to approve notesheet", error);
        }
    }

    const btnStyle = {
        background: "#010a2a",
        color: "#fff",
        textTransform: "capitalize",
        fontSize: "0.9rem",
        whiteSpace: "nowrap"
    };

    return (
        <Paper elevation={3} sx={{ p: 2, mt: 3, borderRadius: 2 }}>
            {/* Header */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                mb={2}
            >
                <Typography variant="h6" fontWeight={600}>
                    Counters
                </Typography>

                <TextField
                    size="small"
                    placeholder="Search by Job No / Subject / Client"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0); // reset to first page on search
                    }}
                    sx={{ minWidth: 280 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        )
                    }}
                />
            </Stack>

            <Divider sx={{ mb: 1 }} />

            {/* Table */}
            <TableContainer sx={{ maxHeight: 420 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>#</b></TableCell>
                            <TableCell><b>Client</b></TableCell>
                            <TableCell><b>Avak / Ref ID</b></TableCell>
                            <TableCell><b>Subject</b></TableCell>
                            <TableCell align="center"><b>Receipt Date</b></TableCell>
                            <TableCell><b>Start – End Date</b></TableCell>
                            <TableCell><b>Service Type</b></TableCell>
                            <TableCell align="center"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredRows.length > 0 ? (
                            filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow hover key={index}>
                                        {/* # */}
                                        <TableCell>{row.job_id}</TableCell>

                                        {/* Client */}
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={600}>{row.client_name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{row.client_ref_id}</Typography><br />
                                            <Typography variant="caption" color="text.secondary">{row.office_address}</Typography><br />
                                            <Typography variant="caption" color="text.secondary">{row.section_code}</Typography>
                                        </TableCell>

                                        {/* Avak / Ref */}
                                        <TableCell>
                                            <Typography variant="caption">Avak: {row.avak_ref_id}</Typography><br />
                                            <Typography variant="caption">Ref: {row.ref_no}</Typography>
                                        </TableCell>

                                        {/* ✅ Fixed: Subject now under Subject column */}
                                        <TableCell>
                                            <Typography variant="body2">{row.subject}</Typography>
                                        </TableCell>

                                        {/* ✅ Fixed: Receipt Date now under Receipt Date column */}
                                        <TableCell align="center">
                                            <Typography variant="body2">
                                                {row.receipt_date
                                                    ? new Date(row.receipt_date).toLocaleDateString()
                                                    : "—"}
                                            </Typography>
                                        </TableCell>

                                        {/* Start – End Date */}
                                        <TableCell>
                                            <Typography variant="body2">
                                                {row.startDate ? new Date(row.startDate).toLocaleDateString() : "—"}
                                                {" – "}
                                                {row.endDate ? new Date(row.endDate).toLocaleDateString() : "—"}
                                            </Typography>
                                        </TableCell>

                                        {/* Service Type */}
                                        <TableCell>
                                            <Typography variant="body2">{row.od_servicetype_id}</Typography>
                                        </TableCell>

                                        {/* Actions — vertical stack, evenly spaced */}
                                        <TableCell align="center">
                                            <Stack spacing={0.75} alignItems="stretch">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => router.push(`/admin/counter/${row.job_id}`)}
                                                    sx={btnStyle}
                                                >
                                                    Move to Allocation
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() =>
                                                        router.push(
                                                            `/admin/counter/notesheet?id=${row.job_id}&avak_ref=${row.avak_ref_id}`
                                                        )
                                                    }
                                                    sx={btnStyle}
                                                >
                                                    Generate NoteSheet
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => Approved(row.job_id, row.avak_ref_id, row.financial_year)}
                                                    sx={btnStyle}
                                                >
                                                    Proceed to Work Order
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                                    <Typography color="text.secondary">
                                        {search ? `No results for "${search}"` : "No records found"}
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