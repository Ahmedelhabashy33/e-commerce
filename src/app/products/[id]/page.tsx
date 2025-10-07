import React from "react";
import AddBtn from "./../../_components/addbtn/AddBtn";
import SingleProduct from "@/app/_components/SingleProduct/SingleProduct";
import getRelatedProduct from "@/ProductCategoryActions/RelatedProduct.actions";
import { ProductType } from "@/Types/Product.Type";
import Image from "next/image";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  const { data } = await response.json();

  if (!data) return <h1>no product</h1>;

  const relatedProduct = await getRelatedProduct(data.category._id);
  console.log(relatedProduct);

  return (
    <>
      <div className="containar w-full lg:w-[80%] mx-auto p-4 flex">
        <div className="w-1/4">
          <div className="p-4">
            <Image
              src={data.imageCover}
              className="w-full object-cover"
              width={400}
              height={400}
              alt="product"
            />
          </div>
        </div>
        <div className="w-3/4">
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold my-4">{data.title}</h1>
              <i className="fa-solid fa-heart hover:text-red-600 cursor-pointer"></i>
            </div>

            <p>{data.description}</p>
            <p className="text-emerald-500 my-2">{data.category.name}</p>
            <div className="flex justify-between">
              <span>{data.price} EGP</span>
              <span className="pe-10">
                {data.ratingsAverage}
                <i className="fas fa-star text-yellow-500"></i>
              </span>
            </div>
          </div>
          <AddBtn id={data.id} />
        </div>
      </div>

      <div className="contaniar w-[80%] mx-auto my-12">
        we suggesst
        <div className="flex flex-wrap">
          {relatedProduct.data.map((curretProduct: ProductType) => (
            <SingleProduct Product={curretProduct} key={curretProduct.id} />
          ))}
        </div>
      </div>
    </>
  );
}
