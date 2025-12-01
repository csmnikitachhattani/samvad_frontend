"use client";
import React from "react";
import NewspaperDetail from "@/components/Newspaper/BillEntry/newspaperDetail";
import BillDetailCard from '@/components/Newspaper/BillEntry/BillDetail';
import BillEntryForm from '@/components/Newspaper/BillEntry/BillEntryForm'
const CreateBillEntry = () => {
  return (
    <div style={{ padding: "16px" }}>
      <div style={{margin: "20px 10px"}}>
      <NewspaperDetail />
      </div>
      <div>
      <BillDetailCard />
      </div>
      <div>
        <BillEntryForm />
      </div>
    </div>
  );
};

export default CreateBillEntry;
