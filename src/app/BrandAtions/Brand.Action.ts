



export default async function getAllBrand() {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
      method: "GET"
    },
    )
    const PayLoad =await res.json()
    return PayLoad;

}