import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { sanitizeAuthRedirect } from "@repo/lib/auth-redirect";

type RegisterPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = searchParams ? await searchParams : {};
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextUrl = sanitizeAuthRedirect(rawNext);

  return (
    <AuthCard
      badge="Player Account"
      title="Start your Lifetopia journey."
      description="Create your player account for the Lifetopia platform, community, dashboard, and future connected game experience."
    >
      <RegisterForm nextUrl={nextUrl} />
    </AuthCard>
  );
}