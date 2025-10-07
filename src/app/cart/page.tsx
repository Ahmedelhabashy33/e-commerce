"use client";
import clearCart from "@/cartAction/clearCart.action";
import { getLoggedUserCart } from "@/cartAction/getUserCart.action";
import RemoveItemFromCart from "@/cartAction/removeCartItem.Action";
import UpdataCartQuantity from "@/cartAction/updateCartQuantity.Action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/Context/CartContext";
import { cartProductType } from "@/Types/Cart.type";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
export default function Cart() {
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [RemoveDisable, setRemoveDisable] = useState(false);
  const [UpdateDisable, setUpdateDisable] = useState(false);
  const [LoadingUpdate, setLoadingUpdate] = useState(false);
  const [Cuurentid, setCuurentid] = useState("");
const cartCtx = useContext(CartContext);
if (!cartCtx) {
  throw new Error("CartContext must be used inside CartContextProvider");
}
const { numberOfCartItem, setnumberOfCartItem } = cartCtx;
  const [totalPrice, settotalPrice] = useState();
    const [CartId, setCartId] = useState("");



  async function DeleteProduct(id: string) {
    setRemoveDisable(true);
    setUpdateDisable(true)
    const res = await RemoveItemFromCart(id);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Product Deleted Successfully", {
        position: "top-center",
        duration: 2000,
      });
      let sum = 0;
      res.data.products.forEach((product: cartProductType) => {
        sum += product.count;
      });
     getUserCart();
      setnumberOfCartItem(sum);
      setRemoveDisable(false);
      setUpdateDisable(false)

    } else {
      toast.error("Cann't Delete Product", {
        position: "top-center",
        duration: 2000,
      });
      setRemoveDisable(false);
            setUpdateDisable(false);

    }
  }

  async function getUserCart() {
    try {
      
      const res = await getLoggedUserCart();
      if (res.status === "success") {
      setCartId(res.cartId);
      settotalPrice(res.data.totalCartPrice)
        setproducts(res.data.products);
        setisLoading(false);
      }
    } catch (err) {
      console.log(err);
      setisLoading(false);
    }
  }

  async function updateProduct(id: string, count: number ,sign : string) {
    setCuurentid(id)
    setLoadingUpdate(true)
    setUpdateDisable(true)
    setRemoveDisable(true)
    const res = await UpdataCartQuantity(id, String(count));
    if (res.status === "success") {
      setproducts(res.data.products)
      
      toast.success("update successfully", {
        position: "top-center",
        duration: 2000,
      });
      if (sign === "+") {
        setnumberOfCartItem(numberOfCartItem + 1);
        getUserCart();
      }
      else if(sign === "-"){
        setnumberOfCartItem(numberOfCartItem - 1);
        getUserCart();
      }
          setLoadingUpdate(false)
    setRemoveDisable(false)

          setUpdateDisable(false);

    } else {
      toast.error("cann't update", { position: "top-center", duration: 2000 });
                setUpdateDisable(false);
                setLoadingUpdate(false)
    setRemoveDisable(false);


    }
  }


  async function clear(){
    const res = await clearCart()
    console.log(res)
    if (res.message === "success") {
      getUserCart();
      setnumberOfCartItem(0)
    }
    
  }
  
  useEffect(() => {
    getUserCart();
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="w-2/3 mx-auto my-12">
          <div className="flex justify-end">
            <Button
              onClick={() => clear()}
              className="cursor-pointer bg-emerald-500 mb-4"
            >
              clear
            </Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span>Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: cartProductType) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <Image
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          disabled={UpdateDisable}
                          onClick={() =>
                            updateProduct(
                              product.product.id,
                              product.count - 1,
                              "-"
                            )
                          }
                          className="inline-flex items-center disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          {product.product.id === Cuurentid ? (
                            LoadingUpdate ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <span>{product.count}</span>
                            )
                          ) : (
                            <span>{product.count}</span>
                          )}
                        </div>
                        <button
                          disabled={UpdateDisable}
                          onClick={() =>
                            updateProduct(
                              product.product.id,
                              product.count + 1,
                              "+"
                            )
                          }
                          className="inline-flex items-center disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        disabled={RemoveDisable}
                        onClick={() => DeleteProduct(product.product.id)}
                        className="text-red-400 font-semibold cursor-pointer disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl text-emerald-500 py-4 px-4">
                Total Price:{totalPrice}
              </h1>
              <Link href={`/CheckOut/${CartId}`}>
                <Button className="me-4 cursor-pointer bg-emerald-500">
                  CheckOut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center my-12 text-emerald-500 font-bold">
          No products to Show
        </h1>
      )}
    </>
  );
}
