"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
  Typography,
  Alert,
  InputAdornment,
} from "@mui/material";

export default function LoginPage() {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setUserInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = () => {
    if (!userType || !username || !password || !userInput) {
      setError("Please fill all fields");
      return;
    }
    if (userInput !== captcha) {
      setError("Captcha is incorrect");
      generateCaptcha();
      return;
    }
    setError("");
    alert("Login successful!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            maxWidth: 330,
            margin: "0 auto",
            boxShadow: 1,
            borderRadius: 1,
          }}
        >
          <CardContent sx={{ padding: "30px 20px" }}>
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
                gap: "8px",
              }}
            >
              <Box
                sx={{
                  width: "45px",
                  height: "45px",
                  border: "2.5px solid #d32f2f",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  fontWeight: "bold",
                  color: "#d32f2f",
                }}
              >
                छ
              </Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#333",
                  lineHeight: "1.3",
                }}
              >
                छत्तीसगढ़
                <br />
                संवाद
              </Typography>
            </Box>

            {/* Header Text */}
            <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#333",
                  fontWeight: 500,
                  marginBottom: "1px",
                }}
              >
                Welcome to
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#333",
                  fontWeight: 500,
                  marginBottom: "2px",
                }}
              >
                Chhattisgarh Samvad
              </Typography>
              <Typography
                sx={{ fontSize: "11px", color: "#999", fontWeight: 400 }}
              >
                Login to continue
              </Typography>
            </Box>

            {/* Error Message */}
            {error && (
              <Alert
                severity="error"
                sx={{ marginBottom: "12px", fontSize: "11px" }}
              >
                {error}
              </Alert>
            )}

            {/* User Type Dropdown */}
            <FormControl fullWidth sx={{ marginBottom: "12px" }}>
              <Select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                displayEmpty
                sx={{
                  fontSize: "12px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ddd",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#999",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d32f2f",
                  },
                }}
              >
                <MenuItem value="">Select User Type</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Officer">Officer</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>

            {/* Username */}
            <TextField
              fullWidth
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                marginBottom: "12px",
                fontSize: "12px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#999",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />

            {/* Password */}
            <TextField
              fullWidth
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginBottom: "15px",
                fontSize: "12px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#999",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />

            {/* Captcha */}
            <Box sx={{ marginBottom: "12px" }}>
              {/* Captcha Display */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "9px 10px",
                  backgroundColor: "#f8f8f8",
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  marginBottom: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#d32f2f",
                    letterSpacing: "2px",
                    fontFamily: "monospace",
                  }}
                >
                  {captcha}
                </Typography>
                <Button
                  onClick={generateCaptcha}
                  variant="contained"
                  sx={{
                    padding: "4px 9px",
                    backgroundColor: "#f0f0f0",
                    color: "#666",
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  Refresh
                </Button>
              </Box>

              {/* Captcha Input */}
              <TextField
                fullWidth
                placeholder="Enter above text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                maxLength="6"
                sx={{
                  fontSize: "12px",
                  "& .MuiOutlinedInput-root": {
                    textAlign: "center",
                    letterSpacing: "1px",
                    "& fieldset": {
                      borderColor: "#ddd",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#d32f2f",
                    },
                  },
                }}
              />
            </Box>

            {/* Login Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{
                padding: "11px",
                backgroundColor: "#d32f2f",
                color: "white",
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "none",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
            >
              LOGIN
            </Button>

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: "center", marginTop: "10px" }}>
              <Typography
                component="a"
                href="#"
                sx={{
                  color: "#d32f2f",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot Password?
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
