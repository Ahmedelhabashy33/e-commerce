"use client";
import React, { useEffect, useState } from "react";
import getAllBrand from "../BrandAtions/Brand.Action";
import Loading from "../loading"; 
import Link from "next/link";
import Image from "next/image";
import { Brand } from "@/Types/Cart.type";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getBrands() {
    try {
      const res = await getAllBrand();
      setBrands(res.data);
    } catch (err) {
      console.error("Error fetching brands:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 w-[80%] mx-auto">
      <h2 className="text-xl font-bold mb-4">All Brands</h2>
      <Link href={"/"}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((brand: Brand) => (
            <div
              key={brand._id}
              className="border rounded-lg p-2 flex flex-col items-center shadow hover:shadow-2xl"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                className="w-20 h-20 object-contain mb-2"
              />
              <p className="text-center">{brand.name}</p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
