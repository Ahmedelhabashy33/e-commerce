import getMyToken from "@/utilities/getMyToken";


export default async function AddToCart(id: string) {
      const token=await getMyToken()
         if(!token){
           throw new Error("Please login First")
         }  try {
    if (!token) {
      throw new Error("User not logged in");
    }
    const res=await   fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
       method: "Post",
       headers: {
         token: token,
         "Content-type": "application/json",
       },
       body: JSON.stringify({ productId: id }),
     });
    const payLoad = await res.json();
    return payLoad
}catch(err){
  console.log(err);
  return err
  
}
}