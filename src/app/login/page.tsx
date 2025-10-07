"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoginSchema, LoginSchemaType } from "@/schema/Login.schema";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  async function HandleLogin(values: LoginSchemaType) {
    setLoading(true);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    console.log(response);
    if (response?.ok) {
      toast.success("you loggdIn Successfully", {
        position: "top-center",
        duration: 3000,
      });
      window.location.href = "/";
    } else {
      toast.error(response?.error, {
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
          Login
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleLogin)}>
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
            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 cursor-pointer w-full mt-4 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  login..
                </>
              ) : (
                "login Now"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
