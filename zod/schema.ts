import { z } from "zod";

export const SignUpFormSchema = z.object({
  email: z.string().email({ message: "Please enter valid email" }),
  password: z.string(),
});
