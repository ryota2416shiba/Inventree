import { getProduct } from "@/lib/api/products";
import { ProductDetail } from "@/components/products/ProductDetail";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // API から商品データを取得
  const product = await getProduct(params.id);

  if (!product) {
    return <div>商品が見つかりません</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  );
}
