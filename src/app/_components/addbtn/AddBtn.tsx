"use client"
import AddToCart from '@/cartAction/addToCart.Action'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/Context/CartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'



export default function AddBtn({ id }: { id: string }) {
const cartCtx = useContext(CartContext);
if (!cartCtx) {
  throw new Error("CartContext must be used inside CartContextProvider");
}
const { numberOfCartItem, setnumberOfCartItem } = cartCtx;  

    async function checkAddProduct(id: string) {
        const res = await AddToCart(id)
        console.log(res);
        if (res.status === "success") {

            toast.success("Product Added Successfully ", {
                position: "top-center",
                duration: 3000,
            })
          setnumberOfCartItem(numberOfCartItem + 1)
        } else {
            toast.error(res.message, {
                position: "top-center",
                duration: 3000,
            })
        }
    }
        return (
          <>
            <Button
              onClick={() => checkAddProduct(id)}
              className="cursor-pointer w-[80%] mx-auto bg-emerald-500"
            >
              add to cart
            </Button>
          </>
        );
    }
