import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-8">カテゴリー一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}