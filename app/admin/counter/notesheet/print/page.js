import { Suspense } from "react";
import NotesheetPrint from "@/components/admin/allocation/NotesheetPrint"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       
      <NotesheetPrint />
    </Suspense>
  );
}