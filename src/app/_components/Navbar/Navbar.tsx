"use client"
import React, { useContext } from 'react'
import Link from 'next/link';
import { CartContext } from '@/Context/CartContext';
import { signOut, useSession } from "next-auth/react"





export default function Navbar() {
const { data: session} = useSession();
const cartContext = useContext(CartContext);
if (!cartContext) {
  return null; // أو loading component
}
const { numberOfCartItem } = cartContext;
  function logout() {
    signOut({callbackUrl:"/login"})
}





  return (
    <>
      <nav className="bg-emerald-500 text-white">
        <div className="contaniar w-full lg:w-[80%] flex flex-col lg:flex-row justify-between mx-auto p-4 items-center">
          <div className="left">
            <ul className=" flex lg:gap-6 gap-2">
              <li>
                <Link href="/">
                  <i className="fa-solid fa-cart-shopping fa-2xl "></i>
                  freshcart
                </Link>
              </li>
              <li>
                <Link href="/">home</Link>
              </li>
              {session &&<> <li>
                <Link className="relative" href="/cart">
                  cart
                  {numberOfCartItem > 0 && (
                    <span
                      className="absolute top-[-10px] end-[-10px] size-4 flex rounded-full
                bg-emerald-600 text-white justify-center items-center"
                    >
                      {numberOfCartItem}
                    </span>
                  )}
                </Link>
              </li></>}
              <li>
                <Link href="/products">products</Link>
              </li>
              <li>
                <Link href="/categories">categories</Link>
              </li>
              <li>
                <Link href="/brands">brands</Link>
              </li>
              <li>
                <Link href="/WishList">wishList</Link>
              </li>
            </ul>
          </div>
          <div className="right">
            <ul className="flex lg:gap-4 gap-2 items-center">
              {!session ?  <>
                <li>
                  <Link href="">
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fa-brands fa-tiktok"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/register">register</Link>
                </li>
                <li>
                  <Link href="/login">login</Link>
                </li>
              </> : <>      <li>
                <span onClick={logout} className='cursor-pointer'>signout</span>
              </li>
              {session && <li> hi,{session?.user.name}</li>}</>}
             
        
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
