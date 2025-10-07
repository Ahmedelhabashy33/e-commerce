






export default async function getCategory() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
    method: "GET",
  });
  const PayLoad = await res.json();
  return PayLoad;
}