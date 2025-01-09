import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">会員登録</h1>
      <RegisterForm />
    </div>
  );
}