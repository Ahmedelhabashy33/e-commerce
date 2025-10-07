import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("name cannott be empty")
    .min(2, "min length 2 char")
    .max(10, "max length 10 char"),
  email: z.string().nonempty("email cannott be empty"),
  password: z
    .string()
    .nonempty("password cannott be empty")
    .min(6, "min length 6"),
  rePassword: z.string().nonempty("repassword cannott be empty"),
  phone: z.string().regex(/^01[0251][0-9]{8}$/),
}).refine((object) => object.password === object.rePassword,
      {
        path: ["rePassword"],
        error: "password & rePassword not match !!",
      }
    );


export type registerSchemaType = z.infer<typeof registerSchema>;