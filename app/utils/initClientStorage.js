"use client";

/**
 * Initialize required localStorage values
 */
export const initLocalStorage = () => {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem("financial_year")) {
    localStorage.setItem("financial_year", "2024-2025");
  }

  if (!localStorage.getItem("user_id")) {
    localStorage.setItem("user_id", "00100");
  }

  if (!localStorage.getItem("ref_Category_id")) {
    localStorage.setItem("ref_Category_id", "02");
  }

  if (!localStorage.getItem("user_name")) {
    localStorage.setItem(
      "user_name",
      "SUPERINTENDING ENGINEER, City Circle-II CSPDCL,Raipur, रायपुर"
    );
  }
};

/**
 * Fetch public IP address
 */
export const fetchClientIP = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "";
  } catch (error) {
    console.error("IP Fetch Error:", error);
    return "";
  }
};
