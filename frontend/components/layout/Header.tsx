"use client";

import Link from "next/link";
import { ShoppingCart, Search, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryNav } from "@/components/layout/CategoryNav";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Inventree
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/categories" className="hover:text-primary">
                カテゴリー
              </Link>
              <Link href="/products" className="hover:text-primary">
                商品一覧
              </Link>
              <Link href="/sellers" className="hover:text-primary">
                出品企業
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* 修正: 検索フォームを追加 */}
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="商品を検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px] md:w-[300px]"
                />
                <Button type="submit" variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </form>

              <Link href="/checkout/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="w-full">ログイン</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="w-full">会員登録</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b bg-secondary/30">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">カテゴリーから探す</h2>
            <p className="text-sm text-muted-foreground">
              11の主要カテゴリーから必要な在庫品を検索できます
            </p>
          </div>
          <CategoryNav />
        </div>
      </div>
    </>
  );
}
