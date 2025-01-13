"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api/client";
import { setSession } from "@/lib/api/auth";

const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
  accountType: z.enum(["company", "individual"]),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      accountType: "company",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await api.auth.login({
        email: data.email,
        password: data.password,
      });
      
      setSession(response.user, response.token);
      
      toast({
        title: "ログイン成功",
        description: "ダッシュボードへ移動します",
      });
      
      router.push("/");
    } catch (error: any) {
      toast({
        title: "エラー",
        description: error.response?.data?.message || "ログインに失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>
          アカウントタイプを選択してログインしてください
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <RadioGroup
            defaultValue={watch("accountType")}
            onValueChange={(value) => register("accountType").onChange(value)}
            className="flex flex-col space-y-2 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="company" id="company" />
              <Label htmlFor="company">企業アカウント</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="individual" />
              <Label htmlFor="individual">個人アカウント</Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              error={errors.email?.message}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              type="password"
              id="password"
              {...register("password")}
              error={errors.password?.message}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "ログイン中..." : "ログイン"}
          </Button>
          <Button
            variant="link"
            onClick={() => router.push("/auth/register")}
            disabled={isLoading}
          >
            アカウントをお持ちでない方はこちら
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}