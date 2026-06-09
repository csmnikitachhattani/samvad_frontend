import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  Link,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Alert,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  LockReset as LockResetIcon,
  Visibility,
  VisibilityOff,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  Shield as ShieldIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

// ── MUI Theme ─────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2", dark: "#115293", light: "#42a5f5" },
    success: { main: "#2e7d32", light: "#4caf50" },
    background: { default: "#f0f4ff", paper: "#ffffff" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'DM Sans', 'Roboto', sans-serif",
    h5: { fontWeight: 700, letterSpacing: "-0.3px" },
    subtitle2: { color: "#6b7280" },
  },
  components: {
    MuiTextField: {
      defaultProps: { variant: "outlined", fullWidth: true, size: "small" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            background: "#f9fafb",
            "&:hover fieldset": { borderColor: "#93c5fd" },
            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
            "&.Mui-focused": { background: "#fff" },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, textTransform: "none", fontWeight: 600, fontSize: 14 },
        containedPrimary: {
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          boxShadow: "0 4px 14px rgba(25,118,210,0.3)",
          "&:hover": { boxShadow: "0 6px 20px rgba(25,118,210,0.4)" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          border: "1px solid #e8eaf0",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: { root: { borderRadius: 4, height: 4 } },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, fontSize: 11 } },
    },
  },
});

// ── Password strength util ────────────────────────────────────────────────────
function getStrength(pw) {
  const checks = [
    pw.length >= 8,
    /[A-Z]/.test(pw),
    /[0-9]/.test(pw),
    /[^A-Za-z0-9]/.test(pw),
  ];
  return checks.filter(Boolean).length;
}

const strengthConfig = [
  { label: "", color: "inherit", value: 0 },
  { label: "Weak", color: "error", value: 25 },
  { label: "Fair", color: "warning", value: 50 },
  { label: "Good", color: "info", value: 75 },
  { label: "Strong", color: "success", value: 100 },
];

// ── OTP Input Component ───────────────────────────────────────────────────────
function OTPInput({ value, onChange, error }) {
  const refs = useRef([]);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  const handleChange = (i, e) => {
    const ch = e.target.value.replace(/\D/g, "").slice(-1);
    const arr = (value + "      ").slice(0, 6).split("");
    arr[i] = ch;
    onChange(arr.join("").trimEnd());
    if (ch && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      if (!value[i] && i > 0) {
        refs.current[i - 1]?.focus();
        const arr = (value + "      ").slice(0, 6).split("");
        arr[i - 1] = " ";
        onChange(arr.join("").trimEnd());
      }
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    e.preventDefault();
    onChange(text);
    refs.current[Math.min(text.length, 5)]?.focus();
  };

  return (
    <Box>
      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", mb: 1, display: "block" }}>
        One-Time Password
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
        {Array.from({ length: 6 }, (_, i) => {
          const filled = !!(value[i] && value[i].trim());
          const focused = focusedIdx === i;
          return (
            <Box
              key={i}
              component="input"
              ref={(el) => (refs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value[i]?.trim() || ""}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={() => setFocusedIdx(i)}
              onBlur={() => setFocusedIdx(-1)}
              aria-label={`OTP digit ${i + 1}`}
              sx={{
                flex: 1,
                height: 52,
                textAlign: "center",
                fontFamily: "'DM Mono', 'Courier New', monospace",
                fontSize: 22,
                fontWeight: 700,
                border: "1.5px solid",
                borderColor: error
                  ? "error.main"
                  : filled
                  ? "success.main"
                  : focused
                  ? "primary.main"
                  : "grey.300",
                borderRadius: "10px",
                background: filled ? "#f0fdf4" : focused ? "#fff" : "#f9fafb",
                color: filled ? "success.main" : "text.primary",
                outline: "none",
                cursor: "text",
                transition: "all 0.2s",
                boxShadow: focused ? "0 0 0 3px rgba(25,118,210,0.12)" : "none",
                "&:hover": { borderColor: "primary.light" },
              }}
            />
          );
        })}
      </Stack>
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ForgotPassword() {
  // Step 1 state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [step1Errors, setStep1Errors] = useState({});
  const [sending, setSending] = useState(false);

  // Step 2 state
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step2Errors, setStep2Errors] = useState({});
  const [resetting, setResetting] = useState(false);

  // Timer
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  // UI step
  const [step, setStep] = useState(0); // 0=step1, 1=step2, 2=success

  const startTimer = useCallback((secs = 60) => {
    clearInterval(timerRef.current);
    setTimer(secs);
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setTimerActive(false); return 0; }
        return t - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  // Step 1 validation
  const handleStep1 = () => {
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address.";
    if (!/^[+\d][\d\s\-]{7,}$/.test(phone)) errs.phone = "Enter a valid phone number.";
    if (username.trim().length < 2) errs.username = "Username must be at least 2 characters.";
    setStep1Errors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    setTimeout(() => { setSending(false); setStep(1); startTimer(60); }, 1400);
  };

  // Step 2 validation
  const handleStep2 = () => {
    const errs = {};
    const cleanOtp = otp.replace(/\s/g, "");
    if (cleanOtp.length < 6) errs.otp = "Enter the complete 6-digit OTP.";
    if (newPass.length < 8) errs.newPass = "Password must be at least 8 characters.";
    if (newPass !== confirmPass || !confirmPass) errs.confirmPass = "Passwords do not match.";
    setStep2Errors(errs);
    if (Object.keys(errs).length) return;
    setResetting(true);
    clearInterval(timerRef.current);
    setTimeout(() => { setResetting(false); setStep(2); }, 1200);
  };

  const strength = getStrength(newPass);
  const sc = strengthConfig[strength];

  const stepLabels = ["Verify identity", "Reset password"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e8f0fe 0%, #f8faff 50%, #e8f5e9 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 440 }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>

            {/* Header icon */}
            <Box
              sx={{
                width: 56, height: 56, borderRadius: "14px",
                background: step === 2 ? "linear-gradient(135deg,#e8f5e9,#c8e6c9)" : "linear-gradient(135deg,#e3f2fd,#bbdefb)",
                display: "flex", alignItems: "center", justifyContent: "center",
                mb: 2,
                "& svg": { fontSize: 28, color: step === 2 ? "success.main" : "primary.main" },
              }}
            >
              {step === 2 ? <CheckCircleIcon /> : step === 1 ? <ShieldIcon /> : <LockResetIcon />}
            </Box>

            {/* Title */}
            <Typography variant="h5" gutterBottom>
              {step === 2 ? "All done!" : step === 1 ? "Verify & reset" : "Forgot password"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {step === 2
                ? "Your password has been reset successfully. You can now log in."
                : step === 1
                ? "Enter the OTP sent to your registered contact, then set a new password."
                : "Enter your registered details and we'll send you a one-time code."}
            </Typography>

            {/* Stepper */}
            {step < 2 && (
              <Stepper activeStep={step} sx={{ mb: 3 }} alternativeLabel>
                {stepLabels.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        "& .MuiStepLabel-label": { fontSize: 12, fontWeight: 600 },
                        "& .MuiStepIcon-root.Mui-active": { color: "primary.main" },
                        "& .MuiStepIcon-root.Mui-completed": { color: "success.main" },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}

            {/* ── STEP 1 ── */}
            {step === 0 && (
              <Stack spacing={2}>
                <TextField
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!step1Errors.email}
                  helperText={step1Errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="email"
                />
                <TextField
                  label="Phone number"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={!!step1Errors.phone}
                  helperText={step1Errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="tel"
                />
                <TextField
                  label="Username"
                  placeholder="your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!step1Errors.username}
                  helperText={step1Errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="username"
                />

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleStep1}
                  disabled={sending}
                  startIcon={sending ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
                  sx={{ mt: 1, py: 1.3 }}
                >
                  {sending ? "Sending OTP…" : "Send OTP"}
                </Button>
              </Stack>
            )}

            {/* ── STEP 2 ── */}
            {step === 1 && (
              <Stack spacing={2.5}>
                <OTPInput value={otp} onChange={setOtp} error={step2Errors.otp} />

                {/* Resend row */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: -1 }}>
                  {timerActive ? (
                    <Typography variant="caption" color="text.secondary">
                      Resend in <strong>{timer}s</strong>
                    </Typography>
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      Didn't receive it?
                    </Typography>
                  )}
                  <Button
                    size="small"
                    disabled={timerActive}
                    onClick={() => startTimer(60)}
                    startIcon={<RefreshIcon sx={{ fontSize: 14 }} />}
                    sx={{ textTransform: "none", fontSize: 12, fontWeight: 600, minWidth: 0 }}
                  >
                    Resend OTP
                  </Button>
                </Stack>

                <Divider sx={{ my: -0.5 }} />

                {/* New password */}
                <Box>
                  <TextField
                    label="New password"
                    type={showNew ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    error={!!step2Errors.newPass}
                    helperText={step2Errors.newPass}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowNew((v) => !v)} edge="end" aria-label="Toggle password visibility">
                            {showNew ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="new-password"
                  />
                  {newPass && (
                    <Box sx={{ mt: 0.75 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">Password strength</Typography>
                        {sc.label && (
                          <Chip label={sc.label} size="small" color={sc.color} sx={{ height: 18, fontSize: 10 }} />
                        )}
                      </Stack>
                      <LinearProgress variant="determinate" value={sc.value} color={sc.color || "primary"} />
                    </Box>
                  )}
                </Box>

                {/* Confirm password */}
                <TextField
                  label="Confirm password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  error={!!step2Errors.confirmPass}
                  helperText={step2Errors.confirmPass}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowConfirm((v) => !v)} edge="end" aria-label="Toggle confirm password visibility">
                          {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="new-password"
                />

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleStep2}
                  disabled={resetting}
                  startIcon={resetting ? <CircularProgress size={16} color="inherit" /> : <CheckCircleIcon />}
                  sx={{ py: 1.3 }}
                >
                  {resetting ? "Resetting…" : "Reset password"}
                </Button>

                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => { setStep(0); clearInterval(timerRef.current); setOtp(""); setNewPass(""); setConfirmPass(""); setStep2Errors({}); }}
                  sx={{ textTransform: "none", color: "text.secondary", fontWeight: 500 }}
                >
                  Back
                </Button>
              </Stack>
            )}

            {/* ── SUCCESS ── */}
            {step === 2 && (
              <Alert
                severity="success"
                icon={<CheckCircleIcon fontSize="inherit" />}
                sx={{ borderRadius: 3, fontSize: 13 }}
              >
                Password reset successfully! You can now <Link href="/login" underline="hover" fontWeight={600}>log in</Link> with your new password.
              </Alert>
            )}

          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}