"use client";
import DetailSummary from "@/components/admin/workorder/detailSummary"
import { Suspense } from "react";
export default function CounterPage() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div>
      {/* <h1>Work Order Pending Page</h1> */}
     <div sx={{margin: '10'}}>
     <DetailSummary />
    </div>
    </div>
    </Suspense>
  );
}
