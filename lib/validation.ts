import { z } from "zod";

/** Indian mobile: optional +91 / 0 prefix, then 10 digits starting 6–9. Spaces and dashes allowed. */
export const phoneField = z
  .string()
  .trim()
  .min(1, "Please enter your phone number")
  .refine((v) => /^(?:\+?91|0)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "")), "Enter a valid 10-digit mobile number");

const nameField = z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long");

const emailRequired = z.string().trim().min(1, "Please enter your email").email("Enter a valid email address");
const emailOptional = z
  .string()
  .trim()
  .refine((v) => v === "" || z.string().email().safeParse(v).success, "Enter a valid email address");

const messageOptional = z.string().trim().max(1500, "Message is too long (1,500 characters max)");

const consent = z.literal(true, { error: "Please confirm so we can respond to your enquiry" });

/** Honeypot: real users never fill this in. */
const honeypot = z.string().max(0);

export const categoryOptions = ["Residential", "Commercial", "Industrial", "Farm house"] as const;
const categoryField = z.enum(categoryOptions, { error: "Please choose a property type" });

export const sellSchema = z.object({
  name: nameField,
  phone: phoneField,
  email: emailOptional,
  category: categoryField,
  location: z.string().trim().min(2, "Where is the property located?").max(160),
  size: z.string().trim().max(60),
  expectedPrice: z.string().trim().max(60),
  message: messageOptional,
  consent,
  website: honeypot,
});

export const buyInvestSchema = z.object({
  name: nameField,
  phone: phoneField,
  email: emailOptional,
  intent: z.enum(["Buy", "Invest", "Not sure yet"], { error: "Please tell us what you are looking to do" }),
  category: categoryField,
  budget: z.string().trim().max(60),
  location: z.string().trim().max(160),
  timeline: z.enum(["", "Immediately", "Within 3 months", "3–6 months", "Just exploring"]),
  message: messageOptional,
  consent,
  website: honeypot,
});

export const contactSchema = z.object({
  name: nameField,
  phone: phoneField,
  email: emailRequired,
  subject: z.enum(["General enquiry", "Buying or investing", "Selling a property", "PGS GREENS"], { error: "Please choose a subject" }),
  message: z.string().trim().min(10, "Please add a short message").max(1500, "Message is too long (1,500 characters max)"),
  consent,
  website: honeypot,
});

export const pgsEnquirySchema = z.object({
  name: nameField,
  phone: phoneField,
  email: emailOptional,
  plot: z.string().trim().max(40),
  interest: z.enum(["Site visit", "Plot details", "Pricing", "Something else"], { error: "Please choose what you would like to know" }),
  message: messageOptional,
  consent,
  website: honeypot,
});

export const schemas = {
  sell: sellSchema,
  "buy-invest": buyInvestSchema,
  contact: contactSchema,
  "pgs-greens": pgsEnquirySchema,
} as const;

export type EnquiryKind = keyof typeof schemas;
export type SellValues = z.input<typeof sellSchema>;
export type BuyInvestValues = z.input<typeof buyInvestSchema>;
export type ContactValues = z.input<typeof contactSchema>;
export type PgsEnquiryValues = z.input<typeof pgsEnquirySchema>;
