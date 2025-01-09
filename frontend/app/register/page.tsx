"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";
import { FadeIn } from "@/components/animations/FadeIn";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/10">
      <FadeIn>
        <div className="container max-w-md mx-auto px-4">
          <RegisterForm />
        </div>
      </FadeIn>
    </div>
  );
}