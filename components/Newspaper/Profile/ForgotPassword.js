import React, { useState } from "react";
import { Box, TextField, Button, Typography, Card } from "@mui/material";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    console.log("Password updated:", formData);
    alert("Password updated successfully!");
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Old Password"
          name="oldPassword"
          type="password"
          fullWidth
          margin="normal"
          value={formData.oldPassword}
          onChange={handleChange}
        />
        <TextField
          label="New Password"
          name="newPassword"
          type="password"
          fullWidth
          margin="normal"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button variant="contained" color="primary" type="submit">
            Update Password
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default ForgotPassword;
