"use client";
import Table from "@/components/admin/counter/table";
import BusTable from "@/components/admin/counter/Bus/table";
import DisplayBoardTable from "@/components/admin/counter/display/table";
import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
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
        <Tab label="Mini Bus" value="bus" />
      </Tabs>
      {activeTab}
      <Box mt={2}>
        {activeTab === "mounted" && <Table />}
        {activeTab === "display" && <DisplayBoardTable />}
        {activeTab === "bus" && <BusTable />}
      </Box>
    </Box>
  );
}