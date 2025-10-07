"use client"
import React, { useEffect, useState } from 'react'
import getCategory from '../CategoyAction/Categories.Action';
import  Loading  from "../loading";
import Link from 'next/link';
import Image from 'next/image';
import { categoryType } from '@/Types/Category.Type';


export default function Categories() {


  const [categrys, setcategrys] = useState([]);
  const [loading, setLoading] = useState(true);

  async function gecateg() {
    try {
      const res = await getCategory();
      console.log(res.data);
      
      setcategrys(res.data);
    } catch (err) {
      console.error("Error fetching brands:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    gecateg();
  }, []);

  if (loading) {
    return <Loading />;
  }



  return (
    <div className="p-4 w-[80%] mx-auto">
      <h2 className="text-xl font-bold mb-4">All Cregories</h2>
      <Link href={"/"}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categrys.map((category: categoryType) => (
            <div
              key={category._id}
              className="border rounded-lg p-2 flex flex-col items-center shadow hover:shadow-2xl"
            >
              <Image
                src={category.image}
                alt={category.name}
                className="w-20 h-20 object-contain mb-2"
              />
              <p className="text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}


