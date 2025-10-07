import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().nonempty("email cannott be empty"),
    password: z
        .string()
        .nonempty("password cannott be empty")
        .min(6, "min length 6"),
})


export type LoginSchemaType = z.infer<typeof LoginSchema>;