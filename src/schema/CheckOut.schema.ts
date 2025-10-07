import * as z from "zod";

export const CheckOutSchema = z.object({
  details: z.string().nonempty("details cannott be empty"),
  phone: z.string().nonempty("details cannott be empty").regex(/^01[1250][0-9]{8}$/,"Not Valid Phone Number"),
  city: z.string().nonempty("city cannot be empty")
});

export type CheckOutSchemaType = z.infer<typeof CheckOutSchema>;