"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RegisterForm() {
  const router = useRouter();
  const [accountType, setAccountType] = useState("company");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 会員登録処理の実装
    router.push("/");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>会員登録</CardTitle>
        <CardDescription>
          必要事項を入力して会員登録を完了してください
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <RadioGroup
            defaultValue={accountType}
            onValueChange={setAccountType}
            className="flex flex-col space-y-2 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="company" id="r-company" />
              <Label htmlFor="r-company">企業アカウント</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="r-individual" />
              <Label htmlFor="r-individual">個人アカウント</Label>
            </div>
          </RadioGroup>

          {accountType === "company" && (
            <div className="space-y-2">
              <Label htmlFor="companyName">会社名</Label>
              <Input type="text" id="companyName" required />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">
              {accountType === "company" ? "担当者名" : "お名前"}
            </Label>
            <Input type="text" id="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" id="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input type="password" id="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            登録する
          </Button>
          <Button variant="link" onClick={() => router.push("/auth/login")}>
            すでにアカウントをお持ちの方はこちら
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}