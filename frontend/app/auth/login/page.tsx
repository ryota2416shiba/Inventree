import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>
      <LoginForm />
    </div>
  );
}