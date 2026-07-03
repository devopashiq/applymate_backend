import { error } from "node:console";
import * as z from "zod";

export const authRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});




export const authLoginSchema = z.object({
  email:z.email({error:"Invalid email address"}),
  password:z.string({error:"Invalid password"})
})



export type AuthCreateRequest = z.infer<typeof authRegisterSchema>;
export type AuthLoginREquest = z.infer<typeof authLoginSchema>;
