import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  startDate: z
    .string()
    .min(1, "Start date required"),

  endDate: z
    .string()
    .optional(),

  duration: z
    .string()
    .optional(),

  vehicleNo: z
    .string()
    .min(1, "Vehicle number is required")
    .regex(
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/,
      "Invalid vehicle number (e.g. MH12AB1234)"
    ),

  gstNo: z
    .string()
    .min(1, "GST number is required")
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
      "Invalid GST number"
    ),
});