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
import { createProduct } from "@/lib/api/products";
import { CATEGORIES } from "@/lib/constants";

const productSchema = z.object({
  title: z.string().min(1, "商品名を入力してください"),
  description: z.string().min(1, "商品説明を入力してください"),
  category: z.string().min(1, "カテゴリーを選択してください"),
  images: z.array(z.instanceof(File)).min(1, "少なくとも1枚の画像を選択してください"),
  price: z.number().min(0, "価格を入力してください"),
  companyName: z.string().min(1, "会社名を入力してください"),
  contactPerson: z.string().min(1, "担当者名を入力してください"),
  contactEmail: z.string().email("有効なメールアドレスを入力してください"),
  contactPhone: z.string().min(1, "電話番号を入力してください"),
  location: z.string().min(1, "所在地を入力してください"),
});

export function ProductForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("basic");

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(productSchema),
  });

  const images = watch("images");

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });

      const response = await createProduct(formData);
      if (!response) throw new Error("商品登録に失敗しました");

      toast({ title: "出品完了", description: "商品の出品が完了しました" });
      router.push("/products");
    } catch (error) {
      toast({ title: "エラー", description: error.message || "出品に失敗しました", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">基本情報</TabsTrigger>
          <TabsTrigger value="price">価格</TabsTrigger>
          <TabsTrigger value="company">企業情報</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader><CardTitle>基本情報</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Label>商品名</Label>
              <Input {...register("title")} error={errors.title?.message} />

              <Label>カテゴリー</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger><SelectValue placeholder="カテゴリーを選択" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>商品説明</Label>
              <Textarea {...register("description")} error={errors.description?.message} rows={3} />

              <Label>商品画像</Label>
              <ImageUpload onImagesSelected={(files) => setValue("images", files)} maxFiles={5} />
            </CardContent>
          </Card>

          <Button type="button" onClick={() => setCurrentTab("price")}>次へ</Button>
        </TabsContent>

        <TabsContent value="price">
          <Card>
            <CardHeader><CardTitle>価格</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Label>価格（円）</Label>
              <Input type="number" {...register("price", { valueAsNumber: true })} error={errors.price?.message} />
            </CardContent>
          </Card>

          <Button type="button" onClick={() => setCurrentTab("basic")}>戻る</Button>
          <Button type="button" onClick={() => setCurrentTab("company")}>次へ</Button>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader><CardTitle>企業情報</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Label>会社名</Label>
              <Input {...register("companyName")} error={errors.companyName?.message} />
            </CardContent>
          </Card>

          <Button type="button" onClick={() => setCurrentTab("price")}>戻る</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "出品中..." : "出品する"}</Button>
        </TabsContent>
      </Tabs>
    </form>
  );
}
