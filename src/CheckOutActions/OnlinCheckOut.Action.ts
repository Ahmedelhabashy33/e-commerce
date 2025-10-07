import { CheckOutSchemaType } from "@/schema/CheckOut.schema";
import getMyToken from "@/utilities/getMyToken";




export default async function OnlineCheckOut(CartId: string, url: string, formValue: CheckOutSchemaType) {
         const token=await getMyToken()
         if(!token){
           throw new Error("Please login First")
         }
       
        const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=${url}`,
        {
            method: "POST",
            headers: {
            token: token,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ shippingAddress: formValue }),
        }
        );

    const payLoad = await res.json();
    return payLoad
    }