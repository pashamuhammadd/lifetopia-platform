import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthCard
      badge="Player Account"
      title="Start your Lifetopia journey."
      description="Create your player account for the Lifetopia platform, community, dashboard, and future connected game experience."
    >
      <RegisterForm />
    </AuthCard>
  );
}