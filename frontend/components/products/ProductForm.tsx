"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/products/ImageUpload";
import { CATEGORIES } from "@/lib/constants";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const productSchema = z.object({
  // 基本情報
  title: z.string().min(1, "商品名を入力してください"),
  description: z.string().min(1, "商品説明を入力してください"),
  category: z.string().min(1, "カテゴリーを選択してください"),
  images: z.array(z.custom<File>()).min(1, "少なくとも1枚の画像を選択してください"),
  
  // 詳細情報
  condition: z.string().min(1, "商品状態を選択してください"),
  quantity: z.number().min(1, "在庫数量を入力してください"),
  minimumLot: z.number().min(1, "最小ロット数を入力してください"),
  unit: z.string().min(1, "単位を入力してください"),
  stockReason: z.string().min(1, "在庫発生理由を入力してください"),
  specifications: z.array(z.object({
    key: z.string().min(1, "項目名を入力してください"),
    value: z.string().min(1, "内容を入力してください"),
  })),
  potentialUses: z.array(z.string().min(1, "用途を入力してください")),
  expiryDate: z.string().optional(),
  storageConditions: z.string().min(1, "保管条件を入力してください"),
  
  // 価格・取引条件
  price: z.number().min(0, "価格を入力してください"),
  originalPrice: z.number().min(0, "定価を入力してください"),
  priceNegotiable: z.boolean(),
  deliveryMethod: z.string().min(1, "配送方法を選択してください"),
  shippingPaidBy: z.string().min(1, "送料負担を選択してください"),
  returnsAccepted: z.boolean(),
  returnConditions: z.string().optional(),
  
  // 企業情報
  companyName: z.string().min(1, "会社名を入力してください"),
  contactPerson: z.string().min(1, "担当者名を入力してください"),
  contactEmail: z.string().email("有効なメールアドレスを入力してください"),
  contactPhone: z.string().min(1, "電話番号を入力してください"),
  location: z.string().min(1, "所在地を入力してください"),
});

type ProductFormData = z.infer<typeof productSchema>;

const CONDITIONS = [
  "新品",
  "新品（在庫品）",
  "展示品",
  "中古（美品）",
  "中古（良品）",
  "B品（難あり）",
];

const DELIVERY_METHODS = [
  "自社配送",
  "宅配便",
  "貨物便",
  "直接引き取り",
];

const SHIPPING_PAID_BY = [
  "出品者負担",
  "購入者負担",
  "条件により協議",
];

export function ProductForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("basic");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      specifications: [{ key: "", value: "" }],
      potentialUses: [""],
      priceNegotiable: false,
      returnsAccepted: false,
    },
  });

  const specifications = watch("specifications");
  const potentialUses = watch("potentialUses");

  const addSpecification = () => {
    setValue("specifications", [...specifications, { key: "", value: "" }]);
  };

  const addPotentialUse = () => {
    setValue("potentialUses", [...potentialUses, ""]);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      // TODO: API実装後に送信処理を追加
      toast({
        title: "出品完了",
        description: "商品の出品が完了しました",
      });
      router.push("/products");
    } catch (error: any) {
      toast({
        title: "エラー",
        description: error.message || "出品に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">基本情報</TabsTrigger>
          <TabsTrigger value="details">詳細情報</TabsTrigger>
          <TabsTrigger value="price">価格・取引条件</TabsTrigger>
          <TabsTrigger value="company">企業情報</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>商品の基本的な情報を入力してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">商品名</Label>
                <Input
                  id="title"
                  {...register("title")}
                  error={errors.title?.message}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">カテゴリー</Label>
                <Select
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">商品説明</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  error={errors.description?.message}
                  rows={5}
                  placeholder="商品の特徴、用途、在庫となった経緯などを詳しく記載してください"
                />
              </div>

              <div className="space-y-2">
                <Label>商品画像</Label>
                <ImageUpload
                  onImagesSelected={(files) => setValue("images", files)}
                  maxFiles={5}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              キャンセル
            </Button>
            <Button
              type="button"
              onClick={() => setCurrentTab("details")}
            >
              次へ
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>詳細情報</CardTitle>
              <CardDescription>商品の詳細な情報を入力してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="condition">商品状態</Label>
                  <Select
                    onValueChange={(value) => setValue("condition", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="商品状態を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONDITIONS.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">使用期限・賞味期限</Label>
                  <Input
                    type="date"
                    id="expiryDate"
                    {...register("expiryDate")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">在庫数量</Label>
                  <Input
                    type="number"
                    id="quantity"
                    {...register("quantity", { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimumLot">最小ロット数</Label>
                  <Input
                    type="number"
                    id="minimumLot"
                    {...register("minimumLot", { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">単位</Label>
                  <Input
                    id="unit"
                    {...register("unit")}
                    placeholder="個、箱、kg など"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockReason">在庫発生理由</Label>
                <Textarea
                  id="stockReason"
                  {...register("stockReason")}
                  rows={3}
                  placeholder="在庫となった経緯や理由を具体的に記載してください"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storageConditions">保管条件</Label>
                <Textarea
                  id="storageConditions"
                  {...register("storageConditions")}
                  rows={2}
                  placeholder="温度条件、湿度条件、その他保管時の注意点など"
                />
              </div>

              {/* 商品仕様 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>商品仕様</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSpecification}
                  >
                    項目を追加
                  </Button>
                </div>
                <div className="space-y-2">
                  {specifications.map((_, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <Input
                        {...register(`specifications.${index}.key`)}
                        placeholder="項目名（サイズ、重量など）"
                      />
                      <Input
                        {...register(`specifications.${index}.value`)}
                        placeholder="内容"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 想定される用途 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>想定される用途</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPotentialUse}
                  >
                    用途を追加
                  </Button>
                </div>
                <div className="space-y-2">
                  {potentialUses.map((_, index) => (
                    <Input
                      key={index}
                      {...register(`potentialUses.${index}`)}
                      placeholder="想定される用途を入力"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentTab("basic")}
            >
              戻る
            </Button>
            <Button
              type="button"
              onClick={() => setCurrentTab("price")}
            >
              次へ
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="price" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>価格・取引条件</CardTitle>
              <CardDescription>価格と取引に関する条件を入力してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">販売価格（税抜）</Label>
                  <Input
                    type="number"
                    id="price"
                    {...register("price", { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalPrice">定価（税抜）</Label>
                  <Input
                    type="number"
                    id="originalPrice"
                    {...register("originalPrice", { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("priceNegotiable")}
                  />
                  価格交渉可
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveryMethod">配送方法</Label>
                  <Select
                    onValueChange={(value) => setValue("deliveryMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="配送方法を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {DELIVERY_METHODS.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingPaidBy">送料負担</Label>
                  <Select
                    onValueChange={(value) => setValue("shippingPaidBy", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="送料負担を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {SHIPPING_PAID_BY.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("returnsAccepted")}
                  />
                  返品可（条件あり）
                </Label>
              </div>

              {watch("returnsAccepted") && (
                <div className="space-y-2">
                  <Label htmlFor="returnConditions">返品条件</Label>
                  <Textarea
                    id="returnConditions"
                    {...register("returnConditions")}
                    rows={3}
                    placeholder="返品を受け付ける条件を具体的に記載してください"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentTab("details")}
            >
              戻る
            </Button>
            <Button
              type="button"
              onClick={() => setCurrentTab("company")}
            >
              次へ
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>企業情報</CardTitle>
              <CardDescription>出品企業の情報を入力してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">会社名</Label>
                <Input
                  id="companyName"
                  {...register("companyName")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">担当者名</Label>
                  <Input
                    id="contactPerson"
                    {...register("contactPerson")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">電話番号</Label>
                  <Input
                    id="contactPhone"
                    {...register("contactPhone")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">メールアドレス</Label>
                <Input
                  type="email"
                  id="contactEmail"
                  {...register("contactEmail")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">所在地</Label>
                <Input
                  id="location"
                  {...register("location")}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentTab("price")}
            >
              戻る
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "出品中..." : "出品する"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}