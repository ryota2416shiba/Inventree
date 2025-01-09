"use client";

import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const discountRate = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex gap-2 mb-4">
            <Badge>{product.category}</Badge>
            <Badge variant="outline">{product.manufacturer.name}</Badge>
            <Badge variant="secondary">{product.condition}</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>価格情報</CardTitle>
            <CardDescription>最小ロット数からご購入いただけます</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                ¥{product.price.toLocaleString()}
              </span>
              <Badge variant="destructive">{discountRate}%OFF</Badge>
            </div>
            <p className="text-sm text-muted-foreground line-through">
              定価 ¥{product.originalPrice.toLocaleString()}
            </p>
            <p className="text-sm">最小ロット: {product.minimumLot}個～</p>
            <p className="text-sm">在庫数: {product.quantity}個</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>商品仕様</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="col-span-2">
                  <dt className="text-sm font-medium text-muted-foreground">
                    {key}
                  </dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>在庫情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                在庫発生理由
              </h4>
              <p className="text-sm">{product.stockReason}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                想定される用途
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.potentialUses.map((use) => (
                  <Badge key={use} variant="secondary">
                    {use}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button size="lg" className="flex-1">
            購入する
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            問い合わせる
          </Button>
        </div>
      </div>
    </div>
  );
}