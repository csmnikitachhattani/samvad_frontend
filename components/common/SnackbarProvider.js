"use client";

import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification } from "@/store/modules/Snackbar/notificationSlice";

export default function GlobalSnackbar() {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.notification
  );

  const handleClose = () => {
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      sx={{
        "&.MuiSnackbar-root": {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // ✅ center block
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          minWidth: 320,
          textAlign: "center",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
