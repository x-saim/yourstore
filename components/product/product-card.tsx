import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Button } from "../ui/button";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.slug}`}>
          <Image
            priority={true}
            src={product.images![0]}
            alt={product.name}
            className='aspect-square object-cover rounded'
            height={300}
            width={300}
          />
        </Link>
      </CardHeader>
      <CardContent className='p-4 grid gap-4'>
        {/* Brand and name */}
        <div className='text-xs'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <CardTitle className='text-sm font-medium'>{product.name}</CardTitle>
        </Link>
        {/* Rating and price */}
        <div className='flex-between gap-4'>
          <p>{product.rating} stars</p>
          {product.stock > 0 ? (
            <ProductPrice value={product.price} />
          ) : (
            <p className='text-destructive'>Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

