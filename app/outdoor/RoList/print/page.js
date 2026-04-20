import { Suspense } from "react";
import WorkOrderPrint from "@/components/outdoor/workorder/workorderPrint"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkOrderPrint />
    </Suspense>
  );
}