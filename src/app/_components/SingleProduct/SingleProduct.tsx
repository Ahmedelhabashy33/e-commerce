import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image'
import AddBtn from '../addbtn/AddBtn';
import WishBtn from '../wishListBtn/wishBtn';
import { ProductType } from '@/Types/Product.Type';


export default function SingleProduct({ Product }: { Product :ProductType}) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 ">
      <div className="prod p-4">
        <Card className="gap-2 relative">
          <Link href={`/products/${Product.id}`}>
            <CardHeader>
              <CardTitle>
                <Image
                  src={Product.imageCover}
                  width={200}
                  height={200}
                  alt="products"
                />
              </CardTitle>
              <CardDescription className="text-emerald-400">
                {Product.category.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="font-bold">
              <p className="line-clamp-1">{Product.title}</p>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <span>{Product.price} </span>
                <span>
                  {Product.ratingsAverage}
                  <i className="fas fa-star text-yellow-500"></i>
                </span>
              </div>
            </CardFooter>
          </Link>
          <AddBtn id={Product.id} />
          <WishBtn id={Product.id} />
        </Card>
      </div>
    </div>
  );
}
