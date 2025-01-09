import { Building2, Mail, MapPin, Phone, Target, Lightbulb, Users2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">会社概要</h1>

      {/* 基本情報 */}
      <Card className="mb-12">
        <CardContent className="p-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">会社名</dt>
              <dd className="text-lg">Inventree Inc</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">代表者</dt>
              <dd className="text-lg">代表取締役社長 芝 遼太</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">所在地</dt>
              <dd className="text-lg">
                〒247-0072
                <br />
                神奈川県鎌倉市岡本1500-37
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">連絡先</dt>
              <dd>
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="h-4 w-4" />
                  <span>080-5028-3451</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>s.ryota2416hatmp@gmail.com</span>
                </div>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* ミッション・ビジョン */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">企業理念</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">ミッション</h3>
            </div>
            <p className="text-muted-foreground">
              製造業の経営効率化を支援し、持続可能な産業発展に貢献する
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">ビジョン</h3>
            </div>
            <p className="text-muted-foreground">
              アジアNo.1の製造業特化型在庫マーケットプレイスを目指す
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">バリュー</h3>
            </div>
            <p className="text-muted-foreground">
              誠実・革新・共創を大切にし、顧客と共に成長する
            </p>
          </Card>
        </div>
      </div>

      {/* 事業内容 */}
      <div>
        <h2 className="text-2xl font-bold mb-6">事業内容</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  製造業特化型マーケットプレイス「在庫マーケット」の運営
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>製造業の過剰在庫・滞留在庫の売買プラットフォーム提供</li>
                  <li>在庫管理・最適化コンサルティング</li>
                  <li>業界特化型マッチングサービス</li>
                  <li>サプライチェーン効率化支援</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}