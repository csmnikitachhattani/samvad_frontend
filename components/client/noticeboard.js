"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";

const ClientNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get(
          // "http://103.79.34.50:3080/api/get-clientnotices",
          "http://103.79.34.50:8083/api/Client/getclientnotices",
        );
        setNotices(res.data.data || []);
      } catch (err) {
        console.error("Error fetching notices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const visibleNotices = showAll ? notices : notices.slice(0, 10);

  return (
    <Box sx={{ p: 2 }}>
      <Card elevation={6}>
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            color: "#fff",
            py: 1.5,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #dce3f0 0%, #7c3737 100%)",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            letterSpacing: 1,
          }}
        >
          <Typography variant="h6">सूचना पट्ट (Notice Board)</Typography>
        </Box>

        {/* Notice List */}
        <Box
          sx={{
            maxHeight: showAll ? "none" : 400,
            overflowY: showAll ? "visible" : "auto",
            border: "1px solid #ddd",
          }}
        >
          {loading ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <CircularProgress />
              <Typography variant="body2" color="text.secondary" mt={2}>
                Loading notices...
              </Typography>
            </Box>
          ) : notices.length === 0 ? (
            <Typography sx={{ p: 4, textAlign: "center", color: "error.main" }}>
              कोई सक्रिय सूचना उपलब्ध नहीं है।
            </Typography>
          ) : (
            visibleNotices.map((notice, idx) => (
              <Box
                key={idx}
                sx={{
                  px: 3,
                  py: 2,
                  backgroundColor: idx % 2 === 0 ? "#fafafa" : "#fff",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    color: "#4b1f1f",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  {parse(notice.information || "")}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ textAlign: "right", color: "#555", mt: 1 }}
                >
                  <strong>Date:</strong> {notice.entryDate}
                </Typography>

                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          )}
        </Box>

        {/* Show More / Less */}
        {!loading && notices.length > 10 && (
          <Box sx={{ textAlign: "center", p: 2, backgroundColor: "#f5f5f5" }}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default ClientNotices;
