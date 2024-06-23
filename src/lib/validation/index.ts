import * as z from "zod";
import 'react-toastify/dist/ReactToastify.css';
// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
})

  ;

export const SigninValidation = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>().refine(files => files.length >= 0, { message: "At least one file is required." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  bio: z.string().max(500, { message: "Bio must be at most 500 characters long." }).optional(),
});

// ============================================================
// POST
// ============================================================

export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Caption must be at least 5 characters long." }).max(2200, { message: "Caption must be at most 2,200 characters long." }),
  file: z.custom<File[]>().refine(files => files.length >= 0, { message: "At least one file is required." }),
  location: z.string().min(1, { message: "Location is required." }).max(1000, { message: "Location must be at most 1000 characters long." }),
  tags: z.string().max(200, { message: "Tags must be at most 200 characters long." }).optional(),
});
