// "use client";

// /**
//  * Initialize required localStorage values
//  */
// export const initLocalStorage = () => {
//   if (typeof window === "undefined") return;

//   if (!localStorage.getItem("financial_year")) {
//     localStorage.setItem("financial_year", "2024-2025");
//   }

//   if (!localStorage.getItem("user_id")) {
//     localStorage.setItem("user_id", "00100");
//   }

//   if (!localStorage.getItem("ref_Category_id")) {
//     localStorage.setItem("ref_Category_id", "02");
//   }

//   if (!localStorage.getItem("user_name")) {
//     localStorage.setItem(
//       "user_name",
//       "SUPERINTENDING ENGINEER, City Circle-II CSPDCL,Raipur, रायपुर"
//     );
//   }
// };

// /**
//  * Fetch public IP address
//  */
// export const fetchClientIP = async () => {
//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     const data = await res.json();
//     return data.ip || "";
//   } catch (error) {
//     console.error("IP Fetch Error:", error);
//     return "";
//   }
// };


// ===============try dynamic===================
"use client";

/**
 * Safe check for browser environment
 */
const isBrowser = () => typeof window !== "undefined";

/**
 * Default fallback values (can be overridden dynamically)
 */
const DEFAULT_STORAGE = {
  financial_year: "2024-2025",
  user_id: "00100",
  ref_Category_id: "02",
  user_name:
    "SUPERINTENDING ENGINEER, City Circle-II CSPDCL, Raipur, रायपुर",
};

/**
 * Initialize localStorage dynamically
 * You can pass values from login, API, or props
 * Example: initLocalStorage({ user_id: "12345", financial_year: "2025-2026" })
 */
export const initLocalStorage = (values = {}) => {
  if (!isBrowser()) return;

  const finalValues = { ...DEFAULT_STORAGE, ...values };

  Object.keys(finalValues).forEach((key) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, finalValues[key]);
    }
  });
};

/**
 * Get single localStorage value (SSR safe)
 */
export const getStorageItem = (key) => {
  if (!isBrowser()) return "";
  return localStorage.getItem(key) || "";
};

/**
 * Set single localStorage value (dynamic)
 */
export const setStorageItem = (key, value) => {
  if (!isBrowser()) return;
  localStorage.setItem(key, value);
};

/**
 * Get all required user session data (dynamic + safe)
 */
export const getUserSession = () => {
  if (!isBrowser()) {
    return {
      financial_year: "",
      user_id: "",
      ref_Category_id: "",
      user_name: "",
    };
  }

  return {
    financial_year: localStorage.getItem("financial_year") || "",
    user_id: localStorage.getItem("user_id") || "",
    ref_Category_id: localStorage.getItem("ref_Category_id") || "",
    user_name: localStorage.getItem("user_name") || "",
  };
};

/**
 * Fetch public IP address dynamically
 */
export const fetchClientIP = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json", {
      cache: "no-store", // ensures fresh IP
    });
    const data = await res.json();
    return data?.ip || "";
  } catch (error) {
    console.error("IP Fetch Error:", error);
    return "";
  }
};