


export default async function getRelatedProduct(catId:string) {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`
    );
    const PayLoad =await res.json()
    return PayLoad;



} 