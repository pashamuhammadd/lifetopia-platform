
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { sanitizeAuthRedirect } from "@repo/lib/auth-redirect";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : {};
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextUrl = sanitizeAuthRedirect(rawNext);

  return (
    <AuthCard
      badge="Player Login"
      title="Welcome back, Lifetopian."
      description="Login to access your Lifetopia player account, community profile, dashboard, wallet, and future game progress."
    >
      <LoginForm nextUrl={nextUrl} />
    </AuthCard>
  );
}