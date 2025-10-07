import getMyToken from "@/utilities/getMyToken";

export async function getLoggedUserCart() {

  const token=await getMyToken()
  if(!token){
    throw new Error("Please login First")
  }


    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "GET",
      headers: {
        token: token ,
        "cntent-type": "application/json",
      },
    });
    const payLoad = await res.json();
    return payLoad;
}