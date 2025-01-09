"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export function CategoryNav() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
      <div className="flex w-max space-x-4 p-4">
        {CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant="secondary"
            className="flex-shrink-0"
            asChild
          >
            <Link href={`/categories/${encodeURIComponent(category.id)}`}>
              {category.name}
            </Link>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}