import getMyToken from "@/utilities/getMyToken";

export default async function UpdataCartQuantity(id: string, count: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please login First");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count: count }),
  });
  const payLoad = await res.json();
  return payLoad;
}
