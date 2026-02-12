"use client";
import React from "react";
import AgencyUser from "@/components/admin/forms/agencyuser";

import {
  Box,
  Divider,
} from "@mui/material";

function AdminIndex() {
  return (
  <Box>
    <Box sx={{width: "100%"}}>
      <AgencyUser />
     
    </Box>
  </Box>
  );
}

export default AdminIndex;


// 'use client';

// import React, { useState } from 'react';
// import {
//   Container,
//   Button,
//   Box,
//   Typography,
//   Paper,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';
// import AgencyUserForm from '@/components/admin/forms/agencyuser';

// export default function AgencyUserPage() {
//   const [openModal, setOpenModal] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleSubmit = (formData) => {
//     console.log('Form submitted:', formData);
//     // Here you would typically make an API call to save the data
    
//     setSnackbar({
//       open: true,
//       message: 'Agency user created successfully!',
//       severity: 'success',
//     });
    
//     handleCloseModal();
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Paper
//         elevation={0}
//         sx={{
//           p: 6,
//           borderRadius: 4,
//           background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//         }}
//       >
//         <Box textAlign="center" mb={4}>
//           <Typography
//             variant="h3"
//             fontWeight="800"
//             gutterBottom
//             sx={{
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               backgroundClip: 'text',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             Agency User Management
//           </Typography>
//           <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
//             Create and manage agency users with ease
//           </Typography>

//           <Button
//             variant="contained"
//             size="large"
//             startIcon={<AddIcon />}
//             onClick={handleOpenModal}
//             sx={{
//               px: 4,
//               py: 1.5,
//               fontSize: '1.1rem',
//               borderRadius: 3,
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
//                 transform: 'translateY(-2px)',
//                 boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
//               },
//               transition: 'all 0.3s ease',
//             }}
//           >
//             Create New Agency User
//           </Button>
//         </Box>

//         <Box
//           sx={{
//             mt: 6,
//             p: 4,
//             background: 'white',
//             borderRadius: 3,
//             boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//           }}
//         >
//           <Typography variant="h5" fontWeight="600" gutterBottom color="primary">
//             Features
//           </Typography>
//           <Box component="ul" sx={{ pl: 3 }}>
//             <Typography component="li" variant="body1" sx={{ mb: 1 }}>
//               ✨ Modern and intuitive user interface
//             </Typography>
//             <Typography component="li" variant="body1" sx={{ mb: 1 }}>
//               📝 Organized sections for easy data entry
//             </Typography>
//             <Typography component="li" variant="body1" sx={{ mb: 1 }}>
//               🎨 Beautiful gradient design with Material-UI
//             </Typography>
//             <Typography component="li" variant="body1" sx={{ mb: 1 }}>
//               📱 Fully responsive for all devices
//             </Typography>
//             <Typography component="li" variant="body1">
//               ✅ Form validation and user-friendly icons
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>

//       <AgencyUserForm
//         open={openModal}
//         onClose={handleCloseModal}
//         onSubmit={handleSubmit}
//       />

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }