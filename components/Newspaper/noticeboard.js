import React, { useEffect, useState } from "react";
import { Box, Card, Typography, List, ListItem, ListItemText } from "@mui/material";

import noticeBoardService from "@/services/noticeBoardService";

export default function NoticeBoard() {
  // const notices = [
  //   "यह पोर्टल आपकी सुविधाओं के लिए बनाया गया है।",
  //   "इस पोर्टल से आप प्रकाशित संवाद द्वारा दिए गए कार्यादेश ऑनलाइन प्राप्त कर सकते हैं।",
  //   "ऑनलाइन कार्यादेश विशेष वर्ष (2019–2020) में प्रकाशित किए गए हैं। आप अपनी किसी भी वर्ष (2019–2020) के कार्यादेश ऑनलाइन प्राप्त कर सकते हैं।",
  //   "छत्तीसगढ़ संवाद द्वारा किये गए कार्यादेश की सूचना आपको पंजीकृत मोबाइल नंबर पर भेजी जाएगी। इस समय आप अपना अपडेटेड मोबाइल नंबर इस पोर्टल में दर्ज कर OTP द्वारा सत्यापित कर सकते हैं।",
  //   "जारी किए गए कार्यादेश संदेश आपके रजिस्टर्ड ईमेल या मोबाइल नंबर पर भी भेजे जाएंगे।",
  //   "ऑनलाइन कार्यादेश प्राप्त करने के लिए कृपया इनबॉक्स पेज पर क्लिक करें, जहाँ संवाद द्वारा जारी कार्यादेशों की सूची प्राप्त व प्रिंट कर सकते हैं।",
  //   "ऑनलाइन आवेदन एवं नोटिफिकेशन संबंधी जानकारी इस पोर्टल पर भविष्य में प्राप्त होती रहेगी।"
  // ];
  const [notices, setNotices] = useState([])


  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    const res = await noticeBoardService.getNotices();
    console.log(res)
    setNotices(res.data?.data);
  };


  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        mb: 4,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#E40063", 
          color: "white",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Welcome to Online Portal of Chhattisgarh Samvad - Hoarding Section !
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          छत्तीसगढ़ संवाद - प्रकाशन शाखा के ऑनलाइन पोर्टल में आपका स्वागत है !
        </Typography>
      </Box>

      {/* Body */}
      <Box sx={{ p: 3 }}>
        {/* <List>
          {notices.map((item, index) => (
            <ListItem key={index} sx={{ alignItems: "flex-start", py: 0.5 }}>
              <ListItemText
                // primary={
                //   <Typography sx={{ fontSize: "15px", color: "#333" }}>
                //     • {item.Information}
                //   </Typography>
                // }
              >
               <div key={index} 
       dangerouslySetInnerHTML={{ __html: item.Information }} />
))}</ListItemText>

            </ListItem>
          ))}
        </List> */}
        <List>
  {notices.map((item, index) => (
    <ListItem key={index} sx={{ alignItems: "flex-start", py: 0.5 }}>
      <ListItemText
        primary={
          <div
            style={{ fontSize: "15px", color: "#333" }}
            dangerouslySetInnerHTML={{ __html: `• ${item.Information}` }}
          />
        }
      />
    </ListItem>
  ))}
</List>

      </Box>
    </Card>
  );
}
