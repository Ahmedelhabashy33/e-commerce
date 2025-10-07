"use client";
import React from "react";
import { toast } from "sonner";
import AddToWishList from "@/app/WishListActions/addToWishList.action";

export default function WishBtn({ id }: { id: string }) {
  async function checkaddWishList(id: string) {
    const res = await AddToWishList(id);
    console.log(res);
    if (res.status === "success") {
      toast.success("Product Added Successfully ", {
        position: "top-center",
        duration: 3000,
      });
    } else {
      toast.error(res.message, {
        position: "top-center",
        duration: 3000,
      });
    }
  }
  return (
    <>
      <span onClick={() => checkaddWishList(id)}>
        <i className="fa-solid fa-heart absolute end-2 top-2 hover:text-red-600 cursor-pointer"></i>
      </span>
    </>
  );
}
