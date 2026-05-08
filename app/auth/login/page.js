"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import commonServices from "@/services/commonServices";
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
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LogiImg from "@/public/images/logo_samvad.png";

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState({ id: "", code: "", name: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [financialYear, setFinancialYear] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [userTypeList, setUserTypeList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [finYears, setfinYears] = useState([]);
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
      const res = await axios.get("http://103.79.34.50:8083/api/Login/getalllogintype");
      setUserTypeList(res.data || []);
    } catch (err) {
      console.error("Failed to load user types", err);
    }
  };
  async function fetchFinYear() {
    try {
      const res = await commonServices.getFinYearList();
      setfinYears(res.data.result);
    } catch (error) {
      console.error("Failed to fetch districts", error);
    }
  }
  useEffect(() => {
    generateCaptcha();
    fetchUserTypes();
    fetchFinYear()
  }, []);

  // Handle login


  const handleLogin = async () => {
    if (!userType.code || !username || !password || !userInput || !financialYear) {
      setError("Please fill all fields");
      return;
    }

    if (userInput !== captcha) {
      setError("Captcha is incorrect");
      generateCaptcha();
      return;
    }

    setError("");
    let res;
    try {

      if (userType.code === "ODM") {
        res = await axios.post(
          "http://103.79.34.50:8083/api/Login/agencylogin",
          {
            usertypecode: userType.code,
            userid: username,
            usrpassword: password,
            usertypeid: userType.id.toString(),
          },
        )
        console.log("Login Path from API:", res.data.result[0]);
      }
      else {
        res = await axios.post(
          "http://103.79.34.50:8083/api/Login/cgsamvadlogin",
          {
            usertypecode: userType.code,
            userid: username,
            usrpassword: password,
            usertypeid: userType.id.toString(),
          },
        );
        console.log("Login Path from API:", res.data.result[0]);
      }
      //console.log("Login Path from API:", res.data);
      if (res.data?.status == 200) {
        // ✅ CHECK LOGIN PATH (DEBUG)
        localStorage.setItem('username', res.data.result[0].username)

        localStorage.setItem('userid', res.data.result[0].userid)
        localStorage.setItem('financialYear', financialYear)
        localStorage.setItem('loginusertypename', res.data.result[0].loginusertypename)
        localStorage.setItem('sectionCd', res.data.result[0].section_cd)
        if (userType.code === "ODM") {
          //localStorage.setItem('loginusertypename', res.data.result[0].agency_id)
          localStorage.setItem('usertypecode', res.data.result[0].agency_id)

        }
        else {
          localStorage.setItem('usertypecode', res.data.result[0].usertypecode)
        }

        if (userType.code === "CLNT") {
          router.push("/client");
        }
        else if (userType.code === "ODM") {
          router.push("/outdoor");
        }
        else if (userType.code === "NP") {
          router.push("/newspaper");
        }
        else {
          router.push("/admin");
        }
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
                <Image
                  src={LogiImg}
                  alt="NIC Logo"
                  height={48}
                  style={{ width: "auto" }}
                  priority
                />
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
              <TextField
                select
                fullWidth
                label="Financial Year"
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
                sx={{ mb: 2 }}
              >
                {finYears.map((finYear) => (
                  <MenuItem key={finYear.financial_year} value={finYear.financial_year}>
                    {finYear.financial_year}
                  </MenuItem>
                ))}
              </TextField>
              <Select
                value={userType.code}
                onChange={(e) => {
                  const selected = userTypeList.find(
                    (x) => x.login_User_Type_Code === e.target.value,
                  );
                  setUserType({
                    id: selected?.id || "",
                    code: selected?.login_User_Type_Code || "",
                    name: selected?.login_User_Type_Name || "",
                  });
                }}
                displayEmpty
                renderValue={(selectedCode) => {
                  const selected = userTypeList.find(
                    (x) => x.login_User_Type_Code === selectedCode,
                  );
                  return selected
                    ? selected.login_User_Type_Name
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
                    key={item.login_User_Type_Code}
                    value={item.login_User_Type_Code}
                  >
                    {item.login_User_Type_Name}
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