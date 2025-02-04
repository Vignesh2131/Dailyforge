import {z} from 'zod'
export const signUpSchema = z.object({
    username: z
      .string()
      .min(6, { message: "Username must contain atleast 6 characters" }),
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z
      .string()
      .min(6, { message: "Must contain atleast 8 characters" }),
    confirmPassword: z
      .string()
    .min(6, { message: "Must contain atleast 8 characters" }),
});
export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string().min(6, { message: "Must contain atleast 6 characters" }),
});

export const journalEntry = z.object({
  journalTitle: z.string().min(8, { message: "Min 8 Characters required" }),
  description: z
    .string()
    .min(8, { message: "Too short" })
    .max(100, { message: "Limit exceded" }),
  mood: z.string(),
});