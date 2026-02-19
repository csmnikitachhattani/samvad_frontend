"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosClient from "@/lib/axiosClient";

import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
  Card,
  CardContent,
} from "@mui/material";

import RequestForm from "@/components/client/requestform"; // adjust path if needed

const CreateNewRequest = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= Fetch Categories =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get(
         'http://103.79.34.50:8083/api/Client/getavakcategories'
        );
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box p={4}>
      {/* ---------- Title ---------- */}
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        mb={3}
      >
        Choose Job Request Type
      </Typography>

      {/* ---------- Loader ---------- */}
      {/* {loading ? (
        <Stack alignItems="center" mt={6}>
          <CircularProgress />
          <Typography mt={2}>Loading categories...</Typography>
        </Stack>
      ) : (
        <> */}
      {/* ---------- Category Buttons ---------- */}
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap={1.5}
        mb={4}
      >
    {Array.isArray(categories) &&
  categories.map((item) => {
          const isSelected = selectedCategory?.catId === item.catId;

          const displayText = item.catText
            ? item.catText.split("-")[0].trim()
            : "";

          return (
            <Button
              key={item.catId}
              variant={isSelected ? "contained" : "outlined"}
              color={isSelected ? "inherit" : "secondary"}
              sx={{
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 600,
                px: 2.5,
                py: 0.8,
                textTransform: "none",
                bgcolor: isSelected ? "#000" : "transparent",
                color: isSelected ? "#fff" : "inherit",
                "&:hover": {
                  bgcolor: isSelected ? "#000" : "rgba(0,0,0,0.04)",
                },
              }}
              onClick={() => setSelectedCategory(item)}
            >
              {displayText}
            </Button>
          );
        })}
      </Stack>

      {/* ---------- Selected Category & Form ---------- */}
      {selectedCategory && (
        <Card
          elevation={3}
          sx={{
            maxWidth: "100%",
            borderRadius: 2,
          }}
        >
          <Box
            textAlign="center"
            py={1.5}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "16px",
              mx: 2,
              mt: 2,
            }}
          >
            <Typography fontWeight="bold" fontSize="14px">
              {selectedCategory.catText}
            </Typography>
          </Box>

          <CardContent>
            <RequestForm category={selectedCategory} />
          </CardContent>
        </Card>
      )}
      {/* </>
      )} */}
    </Box>
  );
};

export default CreateNewRequest;
// ===============================================================/
