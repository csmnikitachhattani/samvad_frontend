import React from "react";
import { Box, Typography, Card, Divider } from "@mui/material";

function PublicationDetail() {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Publication Details
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ lineHeight: 2 }}>
        <Typography><strong>Publication Type:</strong> Daily</Typography>
        <Typography><strong>Language:</strong> Hindi</Typography>
        <Typography><strong>RNI Number:</strong> CGHIN/2022/12345</Typography>
        <Typography><strong>Year of Establishment:</strong> 1998</Typography>
        <Typography><strong>GST Number:</strong> 22ABCDE1234F1Z5</Typography>
        <Typography><strong>PAN Number:</strong> ABCDE1234F</Typography>
        <Typography><strong>Bank Account:</strong> XXXX XXXX 7890</Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
        *Only verified publications can modify registration details.
      </Typography>
    </Card>
  );
}

export default PublicationDetail;