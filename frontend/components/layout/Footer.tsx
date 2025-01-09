"use client";

import Link from "next/link";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">企業情報</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Building2 className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">Inventree Inc</p>
                  <p>代表取締役社長 芝 遼太</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0" />
                <div>
                  <p>〒247-0072</p>
                  <p>神奈川県鎌倉市岡本1500-37</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0" />
                <span>080-5028-3451</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0" />
                <span>s.ryota2416hatmp@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">サービス</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-primary">
                  在庫品を探す
                </Link>
              </li>
              <li>
                <Link href="/products/create" className="hover:text-primary">
                  在庫を出品する
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary">
                  カテゴリー一覧
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">会社情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary">
                  採用情報
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-primary">
                  ニュース
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">サポート</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-primary">
                  ヘルプセンター
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 Inventree Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}