"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useMemo } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountRate = useMemo(() => {
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
  }, [product.originalPrice, product.price]);

  const formattedPrice = useMemo(() => {
    return product.price.toLocaleString();
  }, [product.price]);

  const formattedOriginalPrice = useMemo(() => {
    return product.originalPrice.toLocaleString();
  }, [product.originalPrice]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="destructive">{`${discountRate}%OFF`}</Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{product.manufacturer.name}</Badge>
            <Badge variant="secondary">{product.condition}</Badge>
          </div>
          <h3 className="font-semibold mb-2">{product.title}</h3>
          <div className="space-y-1">
            <p className="text-lg font-bold">¥{formattedPrice}</p>
            <p className="text-sm text-muted-foreground line-through">
              定価 ¥{formattedOriginalPrice}
            </p>
            <p className="text-sm">最小ロット: {product.minimumLot}個～</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>商品詳細を見る</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}