"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from 'next/image';
import { categoryType } from '@/Types/Category.Type';

export default function CategorySwiper({ data }: { data: categoryType[] }) {
  return (
    <>
      <div className="w-[80%] mx-auto">
        <h1 className="font-semibold my-2 text-slate-500">
          Shop Popular Categories
        </h1>
        <Swiper
          spaceBetween={0}
          slidesPerView={7}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          {data.map((category: categoryType) => (
            <SwiperSlide key={category._id}>
              <Image
                alt="Category"
                className="w-full h-[150px] object-cover"
                src={category.image}
              />
              <p className="text-center text-bold">{category.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
