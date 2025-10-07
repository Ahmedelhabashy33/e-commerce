

export default async function ProductDetails(productID: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productID}`
  );
  const PayLoad = await res.json();
  return PayLoad;
} 

