"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserWishList } from "../WishListActions/getUserWishList.action";
import AddBtn from "../_components/addbtn/AddBtn";
import Image from "next/image";
import { ProductType } from "@/Types/Product.Type";

export default function WishList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserWish() {
    try {
      const data = await getUserWishList(); 
      console.log("Wishlist response:", data);

      if (data.status === "success") {
        if (data.data?.products) {
          setProducts(data.data.products);
        } else if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserWish();
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
    <div className="container mx-auto py-6 w-[80%]">
      <h2 className="text-2xl font-bold mb-6">💖 My Wishlist</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products in wishlist.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start">
          {products.map((product: ProductType) => (
            <Card
              key={product._id}
              className="w-[220px] shadow-md hover:shadow-lg transition"
            >
              <CardHeader className="p-0">
                <Image
                  src={product.imageCover}
                  width={220}
                  height={180}
                  alt="product"
                  className="rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-1">
                  {product.title}
                </CardTitle>
                <p className="text-gray-600 font-medium mb-3">
                  {product.price} EGP
                </p>
                <AddBtn id={product._id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}