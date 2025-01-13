"use client";

import { ProductForm } from "@/components/products/ProductForm";
import { FadeIn } from "@/components/animations/FadeIn";

export default function CreateProductPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-4">在庫品を出品</h1>
        <p className="text-muted-foreground mb-8">必要な情報を入力して在庫品を出品してください</p>
        <ProductForm />
      </FadeIn>
    </div>
  );
}
