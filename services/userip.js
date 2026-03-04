import axios from "axios";

let cachedIP = null; // cache to avoid multiple API calls

export const getUserIP = async () => {
  try {
    // Return cached IP if already fetched
    if (cachedIP) return cachedIP;

    const res = await axios.get("https://api.ipify.org?format=json");
    cachedIP = res.data.ip;
    return cachedIP;
  } catch (error) {
    console.error("Failed to fetch IP:", error);
    return "0.0.0.0"; // fallback
  }
};