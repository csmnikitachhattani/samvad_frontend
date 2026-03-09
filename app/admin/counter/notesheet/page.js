import { Suspense } from "react";
import NotesheetClient from "@/components/admin/counter/notesheetDetail"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <h1></h1>
      <NotesheetClient />
    </Suspense>
  );
}