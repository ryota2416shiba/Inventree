import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/FadeIn";
import { 
  ArrowRight, 
  Coins,
  Network,
  Warehouse
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* ヒーローセクション */}
      <FadeIn>
        <section className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/10 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  過剰在庫を
                  <br />
                  収益化する
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  キャッシュフロー改善・スペース有効活用・新規取引先開拓を
                  <br />
                  ワンストップで実現する製造業特化型マーケットプレイス
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg h-14" asChild>
                    <Link href="/products">在庫品を探す</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg h-14" asChild>
                    <Link href="/products/create">在庫を出品する</Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="p-6 bg-gradient-to-br from-chart-1/10 to-chart-2/10 border-none">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-chart-1/20 rounded-lg">
                      <Coins className="h-6 w-6 text-chart-1" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">キャッシュフローの改善</h3>
                      <p className="text-muted-foreground">
                        滞留在庫の早期現金化により在庫回転率を
                        改善。保管コストの削減と運転資金の
                        効率化を実現します。
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-chart-2/10 to-chart-3/10 border-none">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-chart-2/20 rounded-lg">
                      <Warehouse className="h-6 w-6 text-chart-2" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">スペースの有効活用</h3>
                      <p className="text-muted-foreground">
                        過剰在庫の適正化により保管スペースを
                        解放。工場レイアウトの最適化で
                        生産性を向上します。
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-chart-4/10 to-chart-5/10 border-none">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-chart-4/20 rounded-lg">
                      <Network className="h-6 w-6 text-chart-4" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">新規サプライチェーンの開拓</h3>
                      <p className="text-muted-foreground">
                        業界を超えた取引先とのマッチングで
                        新たな用途を発見。サプライチェーンの
                        多様化を実現します。
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 新着在庫品 */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">新着在庫品</h2>
                <p className="text-muted-foreground">
                  最近出品された在庫品をチェック
                </p>
              </div>
              <Button variant="link" asChild>
                <Link href="/products" className="flex items-center text-lg">
                  すべての在庫を見る
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <ProductGrid />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}