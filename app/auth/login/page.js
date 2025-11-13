"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    year: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // TODO: Add API call here
  };

  // Example years for dropdown
  const years = ["2022", "2023", "2024", "2025"];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 380,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <LockOutlined color="primary" fontSize="large" />
          <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
            Sign In
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Select Year"
            name="year"
            variant="outlined"
            value={formData.year}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth       
            variant="contained"
            size="large"
            type="submit"
            sx={{
              borderRadius: 2,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, textAlign: "center" }}
        >
          Don’t have an account?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ fontWeight: 600, cursor: "pointer" }}
          >
            Register
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
