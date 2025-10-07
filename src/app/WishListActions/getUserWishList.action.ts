import getMyToken from "@/utilities/getMyToken";

export async function getUserWishList() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login First");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      token: token, // string
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  const payLoad = await res.json();
  return payLoad;
}
