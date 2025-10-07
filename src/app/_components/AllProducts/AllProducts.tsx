import getProducts from '@/api/Products.api'
import React from 'react'
import SingleProduct from '../SingleProduct/SingleProduct'
import { ProductType } from '@/Types/Product.Type';

export default async function AllProducts() {
  const { data } = await getProducts()
  
  return (
    <>
      <div className="contaniar w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {data.map((curretProduct: ProductType) => (
            <SingleProduct Product={curretProduct} key={curretProduct.id} />
          ))}
        </div>
      </div>
    </>
  );
}
