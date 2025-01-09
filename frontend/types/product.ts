export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number; // 定価
  quantity: number;
  minimumLot: number; // 最小ロット数
  category: string;
  condition: string; // 在庫状態（新品、展示品、B品など）
  expiryDate?: string; // 賞味期限・消費期限（該当する場合）
  manufacturer: {
    id: number;
    name: string;
    tier: number; // メーカー区分（1: 大手, 2: 中堅, 3: 中小）
  };
  images: string[];
  specifications: Record<string, string>; // 仕様・規格情報
  stockReason: string; // 在庫発生理由
  potentialUses: string[]; // 想定される用途
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  quantity: number;
  minimumLot: number;
  category: string;
  condition: string;
  expiryDate?: string;
  specifications: Record<string, string>;
  stockReason: string;
  potentialUses: string[];
  images: File[];
}