type RegisterStepId =
  | "identity"
  | "security"
  | "profile"
  | "confirmation";

type RegisterProgressStep = {
  id: RegisterStepId;
  label: string;
};

type RegisterProgressProps = {
  steps: readonly RegisterProgressStep[];
  currentStep: RegisterStepId;
};

export function RegisterProgress({
  steps,
  currentStep,
}: RegisterProgressProps) {
  const currentIndex = steps.findIndex(
    (step) => step.id === currentStep,
  );

  return (
    <ol
      aria-label="Registration progress"
      className="grid grid-cols-4 gap-[clamp(0.35rem,1vw,0.75rem)]"
    >
      {steps.map((step, index) => {
        const isCurrent =
          step.id === currentStep;
        const isComplete =
          index < currentIndex;
        const isReached =
          index <= currentIndex;

        return (
          <li
            key={step.id}
            aria-current={
              isCurrent ? "step" : undefined
            }
            className="min-w-0"
          >
            <div
              className={`h-[clamp(0.35rem,0.8vw,0.55rem)] rounded-full transition ${
                isReached
                  ? "bg-[#4f8124]"
                  : "bg-[#d9c99f]/60"
              }`}
            />

            <p
              className={`mt-2 truncate text-center text-[clamp(0.58rem,0.78vw,0.74rem)] font-black ${
                isCurrent
                  ? "text-[#4f8124]"
                  : isComplete
                    ? "text-[#617346]"
                    : "text-[#9a8063]"
              }`}
            >
              {step.label}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
