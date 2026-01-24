"use client";

import axios from "axios";
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
  IconButton
} from "@mui/material";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LogiImg from "@/public/images/logo_samvad.png"


export default function LoginPage() {
  const [userType, setUserType] = useState({ id: "", code: "", name: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [userTypeList, setUserTypeList] = useState([]);
const [showPassword, setShowPassword] = useState(false);
  // Generate Captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setUserInput("");
  };

  // Fetch user types
  const fetchUserTypes = async () => {
    try {
      const res = await axios.get("http://localhost:3080/api/usertype");
      setUserTypeList(res.data || []);
    } catch (err) {
      console.error("Failed to load user types", err);
    }
  };

  useEffect(() => {
    generateCaptcha();
    fetchUserTypes();
  }, []);

  // Handle login
  const handleLogin = async () => {
    if (!userType.code || !username || !password || !userInput) {
      setError("Please fill all fields");
      return;
    }

    if (userInput !== captcha) {
      setError("Captcha is incorrect");
      generateCaptcha();
      return;
    }

    setError("");

    try {
      const res = await axios.post(
        "http://103.79.34.50:8082/api/Login/cgsamvadlogin",
        {
          usertypecode: userType.code,
          userid: username,
          usrpassword: password,
          usertypeid: userType.id.toString(),
        },
      );
      console.log("Login Path from API:", res.data);
      if (res.data?.status==200) {
        // ✅ CHECK LOGIN PATH (DEBUG)

        console.log("hhhh",res.data.result[0].loginpath

        )

        // ✅ External redirect (BEST)
        setTimeout(() => {
          window.location.href = res.data.result[0].loginpath;
        }, 1000);
      } else {
        setError(res.data?.message || "Invalid credentials");
        generateCaptcha();
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
      generateCaptcha();
    }
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
               
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  fontWeight: "bold",
              
                }}
              >
                <Image src={LogiImg}
                            alt="NIC Logo"
                            height={48}
                            style={{ width: "auto" }}
                            priority/>
              </Box>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: 750,
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
                  fontWeight: 600,
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

            {error && (
              <Alert
                severity={error.includes("successful") ? "success" : "error"}
                sx={{ mb: 2, fontSize: "11px" }}
              >
                {error}
              </Alert>
            )}

            {/* User Type Dropdown */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                value={userType.code}
                onChange={(e) => {
                  const selected = userTypeList.find(
                    (x) => x.login_user_type_code === e.target.value,
                  );
                  setUserType({
                    id: selected?.id || "",
                    code: selected?.login_user_type_code || "",
                    name: selected?.login_user_type_name || "",
                  });
                }}
                displayEmpty
                renderValue={(selectedCode) => {
                  const selected = userTypeList.find(
                    (x) => x.login_user_type_code === selectedCode,
                  );
                  return selected
                    ? selected.login_user_type_name
                    : "Select User Type";
                }}
                sx={{
                  fontSize: "12px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#999",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d32f2f",
                  },
                }}
              >
                <MenuItem disabled value="">
                  Select User Type
                </MenuItem>
                {userTypeList.map((item) => (
                  <MenuItem
                    key={item.login_user_type_code}
                    value={item.login_user_type_code}
                  >
                    {item.login_user_type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Username */}
            <TextField
              fullWidth
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Password */}
            {/* <TextField
              fullWidth
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            /> */}

            
<TextField
  fullWidth
  type={showPassword ? "text" : "password"}
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  sx={{ mb: 2 }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

            {/* Captcha */}
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "9px 10px",
                  backgroundColor: "#f8f8f8",
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  mb: 1,
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
                  sx={{ fontSize: "10px" }}
                >
                  Refresh
                </Button>
              </Box>

              <TextField
                fullWidth
                placeholder="Enter above text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                inputProps={{ maxLength: 6 }}
              />
            </Box>

            <Button fullWidth variant="contained" onClick={handleLogin}>
              LOGIN
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
