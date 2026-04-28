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
    Divider,
    Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import adminServices from "@/services/adminServices";
import { useDispatch } from "react-redux";
import { showNotification } from "@/store/modules/Snackbar/notificationSlice";

const statusConfig = {
    "01": { label: "Pending", color: "#633806", bg: "#FAEEDA" },
    "05": { label: "Active",  color: "#27500A", bg: "#EAF3DE" },
};

const fmtDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "2-digit"
    });
};

const btnStyles = {
    alloc: {
        background: "#042C53",
        color: "#B5D4F4",
        border: "0.5px solid #185FA5",
        textTransform: "capitalize",
        fontSize: "0.75rem",
        whiteSpace: "nowrap",
        fontWeight: 500,
        px: 1.5,
        py: 0.5,
        minWidth: 0,
    },
    note: {
        background: "#3C3489",
        color: "#CECBF6",
        border: "0.5px solid #534AB7",
        textTransform: "capitalize",
        fontSize: "0.75rem",
        whiteSpace: "nowrap",
        fontWeight: 500,
        px: 1.5,
        py: 0.5,
        minWidth: 0,
    },
    print: {
        background: "transparent",
        color: "text.primary",
        border: "0.5px solid",
        borderColor: "divider",
        textTransform: "capitalize",
        fontSize: "0.75rem",
        whiteSpace: "nowrap",
        fontWeight: 500,
        px: 1.5,
        py: 0.5,
        minWidth: 0,
    },
    approve: {
        background: "#085041",
        color: "#9FE1CB",
        border: "0.5px solid #0F6E56",
        textTransform: "capitalize",
        fontSize: "0.75rem",
        whiteSpace: "nowrap",
        fontWeight: 500,
        px: 1.5,
        py: 0.5,
        minWidth: 0,
    },
};

const AdvtDownloadTable = ({ rows = [] }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [ipAddress, setIpAddress] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;
        setUserId(localStorage.getItem("userid") || "");
        setUserName(localStorage.getItem("username") || "");

        fetch("https://api.ipify.org?format=json")
            .then((r) => r.json())
            .then((d) => setIpAddress(d.ip))
            .catch(() => {});
    }, []);

    useEffect(() => {
        adminServices
            .getcounter()
            .then((res) => setData(res || []))
            .catch((err) => console.error("Failed to fetch counters", err));
    }, []);

    const filteredRows = data.filter((row) => {
        const term = search.toLowerCase();
        return (
            String(row.job_id).toLowerCase().includes(term) ||
            (row.subject || "").toLowerCase().includes(term) ||
            (row.client_name || "").toLowerCase().includes(term)
        );
    });

    const pendingCount = data.filter((r) => r.current_status === "01").length;
    const activeCount  = data.filter((r) => r.current_status !== "01").length;

    async function handleApprove(job_id, avak_ref_id, fin_year) {
        try {
            const payload = {
                financial_year: fin_year,
                avak_ref_id,
                job_no: job_id,
                ro_no_list: "",
                approval_action: "A",
                approved_by_user_id: userId,
                approved_by_username: userName,
                approved_by_ip: ipAddress,
                action_cd: "06",
                status_reason_cd: "01",
                action_name: "Approve",
                remark: "string",
                approved_by_type_cd: "01",
                approved_by_section_cd: "05",
            };
            await adminServices.ApprovedNotesheet(payload);
            dispatch(showNotification({ message: "Approved successfully", severity: "success" }));
        } catch (error) {
            dispatch(showNotification({
                message: error.response?.data?.message || "Approval failed!",
                severity: "error",
            }));
        }
    }

    return (
        <Paper
            elevation={0}
            sx={{
                mt: 3,
                borderRadius: 2,
                border: "0.5px solid",
                borderColor: "divider",
                overflow: "hidden",
            }}
        >
            {/* ── Header ── */}
            <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                >
                    {/* Title + stats */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                            Advertisement Requests
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            FY 2026–27 · Advertising Section
                        </Typography>

                        {/* Stat pills */}
                        <Stack direction="row" spacing={1} mt={1}>
                            {[
                                { label: "Total", value: data.length },
                                { label: "Pending", value: pendingCount },
                                { label: "Active",  value: activeCount },
                            ].map((s) => (
                                <Box
                                    key={s.label}
                                    sx={{
                                        px: 1.5,
                                        py: 0.4,
                                        borderRadius: 99,
                                        border: "0.5px solid",
                                        borderColor: "divider",
                                        bgcolor: "action.hover",
                                        fontSize: "0.72rem",
                                        color: "text.secondary",
                                    }}
                                >
                                    <b style={{ fontWeight: 600, color: "inherit" }}>{s.value}</b>{" "}
                                    {s.label}
                                </Box>
                            ))}
                        </Stack>
                    </Box>

                    {/* Search */}
                    <TextField
                        size="small"
                        placeholder="Search job, subject or client…"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                        sx={{ minWidth: 260 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                                </InputAdornment>
                            ),
                            sx: { fontSize: "0.825rem", borderRadius: 1.5 },
                        }}
                    />
                </Stack>
            </Box>

            <Divider />

            {/* ── Table ── */}
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader size="small" sx={{ tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow>
                            {[
                                { label: "Job / Ref",      width: "13%" },
                                { label: "Client",         width: "22%" },
                                { label: "Avak / Ref ID",  width: "12%" },
                                { label: "Subject",        width: "18%" },
                                { label: "Receipt",        width: "9%"  },
                                { label: "Period",         width: "12%" },
                                { label: "Status",         width: "7%", align: "center" },
                                { label: "Actions",        width: "13%", align: "right" },
                            ].map((col) => (
                                <TableCell
                                    key={col.label}
                                    align={col.align || "left"}
                                    sx={{
                                        width: col.width,
                                        fontSize: "0.68rem",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        color: "text.secondary",
                                        bgcolor: "action.hover",
                                        py: 1.2,
                                        px: 2,
                                    }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredRows.length > 0 ? (
                            filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, idx) => {
                                    const status = statusConfig[row.current_status] || {
                                        label: row.current_status,
                                        color: "#444",
                                        bg: "#eee",
                                    };

                                    return (
                                        <TableRow
                                            hover
                                            key={row.job_id || idx}
                                            sx={{ "&:last-child td": { borderBottom: 0 } }}
                                        >
                                            {/* Job / Ref */}
                                            <TableCell sx={{ px: 2, py: 1.5, verticalAlign: "top" }}>
                                                <Typography variant="caption" fontWeight={600} display="block">
                                                    {row.job_id}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ fontSize: "0.68rem" }}
                                                >
                                                    {row.ref_no}
                                                </Typography>
                                            </TableCell>

                                            {/* Client */}
                                            <TableCell sx={{ px: 2, py: 1.5, verticalAlign: "top" }}>
                                                <Typography
                                                    variant="caption"
                                                    fontWeight={600}
                                                    display="block"
                                                    sx={{
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                    title={row.client_name}
                                                >
                                                    {row.client_name}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ fontSize: "0.68rem" }}
                                                >
                                                    {row.client_ref_id}
                                                </Typography>
                                            </TableCell>

                                            {/* Avak / Ref ID */}
                                            <TableCell sx={{ px: 2, py: 1.5, verticalAlign: "top" }}>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        fontFamily: "monospace",
                                                        fontSize: "0.7rem",
                                                        bgcolor: "action.hover",
                                                        border: "0.5px solid",
                                                        borderColor: "divider",
                                                        borderRadius: 0.75,
                                                        px: 0.75,
                                                        py: 0.25,
                                                        display: "inline-block",
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    {row.avak_ref_id}
                                                </Box>
                                            </TableCell>

                                            {/* Subject */}
                                            <TableCell sx={{ px: 2, py: 1.5, verticalAlign: "top" }}>
                                                <Typography
                                                    variant="caption"
                                                    title={row.subject}
                                                    sx={{
                                                        display: "block",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {row.subject}
                                                </Typography>
                                            </TableCell>

                                            {/* Receipt Date */}
                                            <TableCell sx={{ px: 2, py: 1.5, verticalAlign: "top" }}>
                                                <Typography
                                                    variant="caption"
                                                    color="text.disabled"
                                                    display="block"
                                                    sx={{ fontSize: "0.65rem" }}
                                                >
                                                    Received
                                                </Typography>
                                                <Typography variant="caption">
                                                    {fmtDate(row.receipt_date)}
                                                </Typography>
                                            </TableCell>

                                            {/* Period */}
                                            <TableCell sx={{ px: 2, py: 1.5, verticalAlign: "top" }}>
                                                <Typography
                                                    variant="caption"
                                                    color="text.disabled"
                                                    display="block"
                                                    sx={{ fontSize: "0.65rem" }}
                                                >
                                                    Start
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    {fmtDate(row.startDate)}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.disabled"
                                                    display="block"
                                                    sx={{ fontSize: "0.65rem", mt: 0.5 }}
                                                >
                                                    End
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    {fmtDate(row.endDate)}
                                                </Typography>
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell align="center" sx={{ px: 1, py: 1.5, verticalAlign: "top" }}>
                                                <Box
                                                    sx={{
                                                        display: "inline-block",
                                                        px: 1,
                                                        py: 0.3,
                                                        borderRadius: 99,
                                                        fontSize: "0.65rem",
                                                        fontWeight: 600,
                                                        bgcolor: status.bg,
                                                        color: status.color,
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {status.label}
                                                </Box>
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell align="right" sx={{ px: 2, py: 1.5, verticalAlign: "top" }}>
                                                <Stack spacing={0.75} alignItems="flex-end">
                                                    {row.current_status === "01" && (
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            disableElevation
                                                            onClick={() => router.push(`/admin/counter/${row.job_id}`)}
                                                            sx={btnStyles.alloc}
                                                        >
                                                            Move to Alloc.
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        disableElevation
                                                        onClick={() =>
                                                            router.push(
                                                                `/admin/counter/notesheet?id=${row.job_id}&avak_ref=${row.avak_ref_id}`
                                                            )
                                                        }
                                                        sx={btnStyles.note}
                                                    >
                                                        Notesheet
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() =>
                                                            router.push(
                                                                `/admin/counter/notesheet/print?job_id=${row.job_id}&avak_ref=${row.avak_ref_id}`
                                                            )
                                                        }
                                                        sx={btnStyles.print}
                                                    >
                                                        Print
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        disableElevation
                                                        onClick={() =>
                                                            handleApprove(row.job_id, row.avak_ref_id, row.financial_year)
                                                        }
                                                        sx={btnStyles.approve}
                                                    >
                                                        Approve
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                                    <Typography color="text.disabled" variant="body2">
                                        {search ? `No results for "${search}"` : "No records found"}
                                    </Typography>
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
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25]}
                sx={{
                    borderTop: "0.5px solid",
                    borderColor: "divider",
                    bgcolor: "action.hover",
                    fontSize: "0.75rem",
                }}
            />
        </Paper>
    );
};

export default AdvtDownloadTable;