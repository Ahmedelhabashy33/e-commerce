import getMyToken from "@/utilities/getMyToken";

export default async function clearCart() {
        const token=await getMyToken()
           if(!token){
             throw new Error("Please login First")
           }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });
  const payLoad = await res.json();
  return payLoad;
}
