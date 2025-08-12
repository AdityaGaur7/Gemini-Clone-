import { z } from "zod";

export const phoneSchema = z.object({
  countryCode: z.string().min(1, "Please select a country"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{6,15}$/, "Please enter a valid phone number"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export const chatroomSchema = z.object({
  title: z
    .string()
    .min(1, "Chatroom title is required")
    .max(50, "Title must be less than 50 characters"),
});

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message must be less than 1000 characters"),
});

export type PhoneFormData = z.infer<typeof phoneSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type ChatroomFormData = z.infer<typeof chatroomSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;

