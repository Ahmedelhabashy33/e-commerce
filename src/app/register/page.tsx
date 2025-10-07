"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { registerSchemaType, registerSchema } from "@/schema/Register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function HandleRegister(values: registerSchemaType) {
    setLoading(true);
    console.log(values);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(res);
      if (res.data.message === "success") {
        toast.success("You register successfully", {
          position: "top-center",
          duration: 3000,
        });
        router.push("/login");
      }
    } catch (err) {
      let errorMessage = "Something went wrong";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const e = err as { response?: { data?: { message?: string } } };
        errorMessage = e.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage, {
        position: "top-center",
        duration: 3000,
      });
    }
    setLoading(false);
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-bold text-emerald-500 text-center mb-4">
          Register
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleRegister)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name : </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>Email : </FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>password : </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>rePassword : </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>phone : </FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*   <Button className="bg-emerald-500 cursor-pointer w-full mt-4">
              Register Now
            </Button>*/}

            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 cursor-pointer w-full mt-4 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Registering..
                </>
              ) : (
                "Register Now"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
