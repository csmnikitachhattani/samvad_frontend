"use client";
import Table from "@/components/admin/counter/table";
import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

// import DisplayBoardTable from "@/components/admin/counter/table";
import DisplayBoardTable from "@/components/admin/counter/display/table";

export default function TabView() {
  const [activeTab, setActiveTab] = useState("mounted");

  const handleChange = (e, value) => {
    setActiveTab(value);
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab label="Mounted Vehicle" value="mounted" />
        <Tab label="Display Board" value="display" />
      </Tabs>

      <Box mt={2}>
        {activeTab === "mounted" && <Table />}
        {activeTab === "display" && <DisplayBoardTable />}
      </Box>
    </Box>
  );
}