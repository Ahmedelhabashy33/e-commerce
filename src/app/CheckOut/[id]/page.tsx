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
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import {CheckOutSchemaType  ,CheckOutSchema  } from "@/schema/CheckOut.schema"
import OnlineCheckOut from "@/CheckOutActions/OnlinCheckOut.Action";

export default function CheckOut() {
  const { id }:{id:string} = useParams()
  
const [loading] = useState(false);
  const form = useForm<CheckOutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
      resolver: zodResolver(CheckOutSchema),
  });

  async function HandleCheckOut(values:CheckOutSchemaType) {
    console.log(values);

    const res = await OnlineCheckOut(id, "http://localhost:3000/", values)
    console.log(res);
    if(res.status=="success"){
    //  console.log(res.session.url);
      window.location.href=res.session.url
    }
   
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-bold text-emerald-500 text-center mb-4">
          CheckOut
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleCheckOut)}>
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>Details : </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>city : </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
                  Pay now
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
