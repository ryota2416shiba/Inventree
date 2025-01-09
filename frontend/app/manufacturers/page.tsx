"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Globe, Mail, Phone } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import api from "@/lib/api/client";

interface Manufacturer {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  website: string;
  address: string;
  phone: string;
  email: string;
}

export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  useEffect(() => {
    const fetchManufacturers = async () => {
      const response = await api.manufacturers.list();
      setManufacturers(response.data);
    };
    fetchManufacturers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-2">出品企業一覧</h1>
        <p className="text-muted-foreground mb-8">
          在庫マーケットに参加している製造業企業をご覧いただけます
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manufacturers.map((manufacturer) => (
            <Card key={manufacturer.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="mb-2">{manufacturer.name}</CardTitle>
                  {manufacturer.logo_url && (
                    <img
                      src={manufacturer.logo_url}
                      alt={`${manufacturer.name}のロゴ`}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {manufacturer.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm">{manufacturer.address}</span>
                  </div>
                  {manufacturer.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <a
                        href={manufacturer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        ウェブサイト
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{manufacturer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{manufacturer.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}