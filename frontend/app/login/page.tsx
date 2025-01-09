"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { FadeIn } from "@/components/animations/FadeIn";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/10">
      <FadeIn>
        <div className="container max-w-md mx-auto px-4">
          <LoginForm />
        </div>
      </FadeIn>
    </div>
  );
}