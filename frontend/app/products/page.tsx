import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">商品一覧</h1>
            <p className="text-muted-foreground">
              全ての在庫品をご覧いただけます
            </p>
          </div>
          <Button asChild>
            <a href="/products/create">在庫を出品する</a>
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ProductGrid />
      </FadeIn>
    </div>
  );
}