// lib/rules.js

export const nameRules = {
  required: "Name is required",
  minLength: { value: 3, message: "Min 3 characters" },
  maxLength: { value: 20, message: "Max 20 characters" },
}

export const emailRules = {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minLength: 5,
}

export const emailErrors = {
  required: "Email is required",
  pattern: "Enter a valid email address",
  minLength: "Email too short",
}

export const gstField = {
  required: { value: true, message: "GST number is required" },
  pattern: { value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, message: "Enter a valid GST number (e.g. 22AAAAA0000A1Z5)" },
  length: { value: 15, message: "GST number must be exactly 15 characters" },
  stateCode: { value: [1, 37], message: "Invalid state code" },
}

export const passwordRules = {
  required: "Password is required",
  minLength: { value: 8, message: "Min 8 characters" },
}
export const vehicleField = {
  required: { value: true, message: "Vehicle number is required" },
  pattern: { value: /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/, message: "Enter a valid vehicle number (e.g. MH12AB1234)" },
}
