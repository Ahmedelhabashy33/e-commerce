"use client"
import React from 'react'
import image1 from "../../../../public/images/slider-image-1.jpeg"
import image2 from "../../../../public/images/slider-image-2.jpeg";
import image3 from "../../../../public/images/slider-image-3.jpeg";
import image5 from "../../../../public/images/grocery-banner.png";
import Image from 'next/image';
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';


export default function MainSlider() {
    return (
      <div className="w-[80%] mx-auto p-4 flex">
        <div className="w-3/4">
          <Swiper spaceBetween={0} slidesPerView={1} modules={[Autoplay]} autoplay={{delay:3000}}>
            <SwiperSlide>
              {" "}
              <Image
                src={image3}
                className="w-full h-[400px] object-cover"
                alt="slider"
              ></Image>
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={image2}
                className="w-full h-[400px] object-cover"
                alt="slider"
              ></Image>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Image
                src={image5}
                className="w-full h-[400px] object-cover"
                alt="slider"
              ></Image>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-1/4">
          <Image
            src={image2}
            className="w-full h-[200px] object-cover"
            alt="slider"
          ></Image>
          <Image
            src={image1}
            className="w-full h-[200px] object-cover"
            alt="slider"
          ></Image>
        </div>
      </div>
    );
}
