"use client";

import { ProductCard } from "./ProductCard";

// 固定の価格計算関数
const calculatePrice = (index: number) => {
  const basePrice = 10000;
  return basePrice + (index * 1000);
};

const calculateOriginalPrice = (price: number) => {
  return price * 2;
};

// 仮のデータ（実際はAPIから取得）
export const DUMMY_PRODUCTS = Array(35).fill(null).map((_, index) => {
  const price = calculatePrice(index);
  const originalPrice = calculateOriginalPrice(price);
  
  return {
    id: index + 1,
    title: `工業用部品 ${index + 1}`,
    description: "高品質な工業用部品",
    price,
    originalPrice,
    quantity: 100 + (index * 10),
    minimumLot: 10,
    category: "工業機器",
    condition: "新品",
    manufacturer: {
      id: 1,
      name: "製造メーカー",
      tier: 1
    },
    stockReason: "設計変更による在庫",
    potentialUses: ["製造ライン", "機械部品", "設備修理"],
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=60"
    ],
    specifications: {
      "サイズ": "標準",
      "材質": "アルミニウム",
      "規格": "ISO準拠"
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01"
  };
});

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {DUMMY_PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}