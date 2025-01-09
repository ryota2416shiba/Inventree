export type ManufacturerTier = {
  id: number;
  name: string;
  description: string;
};

export const MANUFACTURER_TIERS: ManufacturerTier[] = [
  {
    id: 1,
    name: "大手メーカー",
    description: "年商1000億円以上の製造業"
  },
  {
    id: 2,
    name: "中堅メーカー",
    description: "年商100億円以上1000億円未満の製造業"
  },
  {
    id: 3,
    name: "中小メーカー",
    description: "年商100億円未満の製造業"
  }
];