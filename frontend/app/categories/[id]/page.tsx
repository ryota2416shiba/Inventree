import { ProductGrid } from "@/components/products/ProductGrid";
import { CATEGORIES } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

// 静的生成のためのパラメータを生成
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    id: category.id,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find(c => c.id === decodeURIComponent(params.id));

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ProductGrid />
      </FadeIn>
    </div>
  );
}