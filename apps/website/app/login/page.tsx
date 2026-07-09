import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return (
    <AuthCard
      badge="Player Login"
      title="Welcome back, Lifetopian."
      description="Login to access your Lifetopia player account, community profile, dashboard, wallet, and future game progress."
    >
      <LoginForm nextUrl={next} />
    </AuthCard>
  );
}