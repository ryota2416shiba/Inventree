import { ProductDetail } from "@/components/products/ProductDetail";
import { DUMMY_PRODUCTS } from "@/components/products/ProductGrid";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // TODO: APIから商品データを取得
  const product = DUMMY_PRODUCTS.find(
    (p) => p.id === parseInt(params.id, 10)
  );

  if (!product) {
    return <div>商品が見つかりません</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  );
}