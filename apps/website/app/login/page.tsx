import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      badge="Player Login"
      title="Welcome back, Lifetopian."
      description="Login to access your Lifetopia player account, community profile, dashboard, wallet, and future game progress."
    >
      <LoginForm />
    </AuthCard>
  );
}