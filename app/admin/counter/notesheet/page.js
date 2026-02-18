"use client";

import { useSearchParams } from "next/navigation";

export default function CounterPage() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const finYear = searchParams.get("fin_year");

  return (
    <div>
      <h1>Counter Page</h1>
      <p>ID: {id}</p>
      <p>Financial Year: {finYear}</p>
    </div>
  );
}
