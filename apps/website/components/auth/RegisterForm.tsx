"use client";

import {
  AlertCircle,
  Check,
  CheckCircle2,
  ShieldCheck,
  UserRoundCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

import { AvatarPicker } from "@/components/auth/AvatarPicker";
import { CountryPicker } from "@/components/auth/CountryPicker";
import { PasswordField } from "@/components/auth/PasswordField";
import { RegisterProgress } from "@/components/auth/RegisterProgress";
import {
  LEGAL_DOCUMENTS,
} from "@/data/legal-documents";
import {
  PENDING_EMAIL_VERIFICATION_KEY,
  type PendingEmailVerification,
} from "@/lib/auth/pending-verification";
import { playerAvatars } from "@repo/data/auth";
import {
  assessPassword,
  normalizeDisplayName,
  normalizeEmail,
  normalizeUsername,
  type LifetopiaGender,
  type RegistrationField,
  type RegistrationInput,
  validateAvatarId,
  validateCountryCode,
  validateCountryName,
  validateDateOfBirth,
  validateDisplayName,
  validateEmail,
  validateGender,
  validatePassword,
  validateRegistrationInput,
  validateUsername,
} from "@repo/services/auth-validation";
import {
  checkUsernameAvailability,
} from "@repo/services/auth";

type RegisterStep =
  | "identity"
  | "security"
  | "profile"
  | "confirmation";

type UsernameStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "invalid"
  | "error";

type RegisterFormProps = {
  nextUrl?: string;
};

type RegisterApiResponse = {
  success?: boolean;
  status?: string;
  code?: string;
  error?: string;
  requestId?: string;
  next?: string;
  guardianConsentRequired?: boolean;
  verificationEmailSent?: boolean;
  retryAfterSeconds?: number;
  fieldErrors?: Partial<
    Record<RegistrationField, string>
  >;
};


const steps = [
  {
    id: "identity",
    label: "Identity",
  },
  {
    id: "security",
    label: "Security",
  },
  {
    id: "profile",
    label: "Profile",
  },
  {
    id: "confirmation",
    label: "Confirmation",
  },
] as const;

const INPUT_CLASS =
  "w-full rounded-[clamp(0.8rem,1.5vw,1.2rem)] border bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition placeholder:text-[#7a5635]/50 disabled:cursor-not-allowed disabled:opacity-60";

const FIELD_TO_STEP: Record<
  RegistrationField,
  RegisterStep
> = {
  username: "identity",
  displayName: "identity",
  email: "security",
  password: "security",
  confirmPassword: "security",
  avatarId: "profile",
  dateOfBirth: "profile",
  countryCode: "profile",
  countryName: "profile",
  gender: "profile",
  termsAccepted: "confirmation",
  privacyAccepted: "confirmation",
};


function getFirstErrorStep(
  errors: Partial<
    Record<RegistrationField, string>
  >,
): RegisterStep | undefined {
  for (const step of steps) {
    const hasError = (
      Object.keys(errors) as RegistrationField[]
    ).some(
      (field) =>
        FIELD_TO_STEP[field] ===
          step.id &&
        errors[field],
    );

    if (hasError) {
      return step.id;
    }
  }

  return undefined;
}

function StepHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-[clamp(1.15rem,2vw,1.7rem)] font-black text-[#2f1b12]">
        {title}
      </h2>

      <p className="mt-[clamp(0.35rem,0.8vw,0.6rem)] text-[clamp(0.72rem,0.95vw,0.9rem)] leading-[1.6] text-[#7a5635]">
        {description}
      </p>
    </div>
  );
}

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <span
      id={id}
      className="text-xs font-bold text-red-600"
    >
      {message}
    </span>
  );
}

function PasswordRequirement({
  met,
  children,
}: {
  met: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      className={`flex items-center gap-2 text-xs font-bold ${
        met
          ? "text-[#4f8124]"
          : "text-[#8f7458]"
      }`}
    >
      <span
        className={`grid size-4 place-items-center rounded-full ${
          met
            ? "bg-[#e5f3d8]"
            : "bg-[#eee4d5]"
        }`}
      >
        {met ? (
          <Check size={11} />
        ) : (
          <X size={10} />
        )}
      </span>

      {children}
    </li>
  );
}

export function RegisterForm({
  nextUrl = "/",
}: RegisterFormProps) {
  const router = useRouter();
  const loginHref =
    nextUrl === "/"
      ? "/login"
      : `/login?next=${encodeURIComponent(nextUrl)}`;

  const [currentStep, setCurrentStep] =
    useState<RegisterStep>("identity");

  const [username, setUsername] =
    useState("");
  const [
    usernameStatus,
    setUsernameStatus,
  ] = useState<UsernameStatus>("idle");
  const [
    usernameMessage,
    setUsernameMessage,
  ] = useState("");

  const [displayName, setDisplayName] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [avatarId, setAvatarId] =
    useState(
      playerAvatars[0]?.id ?? "",
    );
  const [gender, setGender] =
    useState<LifetopiaGender>("male");
  const [country, setCountry] =
    useState("");
  const [
    countryName,
    setCountryName,
  ] = useState("");
  const [
    dateOfBirth,
    setDateOfBirth,
  ] = useState("");

  const [
    agreeTerms,
    setAgreeTerms,
  ] = useState(false);
  const [
    agreePrivacy,
    setAgreePrivacy,
  ] = useState(false);

  const [
    fieldErrors,
    setFieldErrors,
  ] = useState<
    Partial<
      Record<RegistrationField, string>
    >
  >({});

  const [message, setMessage] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [
    isStepChecking,
    setIsStepChecking,
  ] = useState(false);

  const currentStepIndex =
    steps.findIndex(
      (step) =>
        step.id === currentStep,
    );

  const passwordAssessment =
    useMemo(
      () => assessPassword(password),
      [password],
    );

  const dateOfBirthAssessment =
    useMemo(() => {
      if (!dateOfBirth) {
        return null;
      }

      return validateDateOfBirth(
        dateOfBirth,
      );
    }, [dateOfBirth]);

  useEffect(() => {
    const validation =
      validateUsername(username);

    if (!username.trim()) {
      setUsernameStatus("idle");
      setUsernameMessage("");
      return;
    }

    if (!validation.valid) {
      setUsernameStatus("invalid");
      setUsernameMessage(
        validation.message,
      );
      return;
    }

    let cancelled = false;

    setUsernameStatus("checking");
    setUsernameMessage(
      "Checking username...",
    );

    const timeout = window.setTimeout(
      async () => {
        const result =
          await checkUsernameAvailability(
            validation.value,
          );

        if (cancelled) {
          return;
        }

        setUsernameStatus(
          result.status,
        );
        setUsernameMessage(
          result.message,
        );
      },
      450,
    );

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [username]);

  function clearFieldError(
    field: RegistrationField,
  ) {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function setStepError(
  field: RegistrationField,
  error: string,
) {
  setFieldErrors((current) => ({
    ...current,
    [field]: error,
  }));

  setMessage("");
}

  function buildRegistrationInput():
    RegistrationInput {
    return {
      username,
      displayName,
      email,
      password,
      confirmPassword,
      avatarId,
      dateOfBirth,
      countryCode: country,
      countryName,
      gender,
      termsAccepted: agreeTerms,
      privacyAccepted: agreePrivacy,
    };
  }

  async function validateIdentityStep() {
    const usernameValidation =
      validateUsername(username);

    if (!usernameValidation.valid) {
      setStepError(
        "username",
        usernameValidation.message,
      );
      return false;
    }

    const displayNameValidation =
      validateDisplayName(
        displayName,
      );

    if (!displayNameValidation.valid) {
      setStepError(
        "displayName",
        displayNameValidation.message,
      );
      return false;
    }

    setIsStepChecking(true);

    const availability =
      await checkUsernameAvailability(
        usernameValidation.value,
      );

    setIsStepChecking(false);
    setUsernameStatus(
      availability.status,
    );
    setUsernameMessage(
      availability.message,
    );

    if (
      availability.status !==
      "available"
    ) {
      setStepError(
        "username",
        availability.message,
      );
      return false;
    }

    setUsername(
      usernameValidation.value,
    );
    setDisplayName(
      displayNameValidation.value,
    );

    return true;
  }

  function validateSecurityStep() {
    const emailValidation =
      validateEmail(email);

    if (!emailValidation.valid) {
      setStepError(
        "email",
        emailValidation.message,
      );
      return false;
    }

    const passwordValidation =
      validatePassword(password, {
        username,
        email:
          emailValidation.value,
      });

    if (!passwordValidation.valid) {
      setStepError(
        "password",
        passwordValidation.message,
      );
      return false;
    }

    if (
      password !==
      confirmPassword
    ) {
      setStepError(
        "confirmPassword",
        "Password confirmation does not match.",
      );
      return false;
    }

    setEmail(emailValidation.value);

    return true;
  }

  function validateProfileStep() {
    const avatarValidation =
      validateAvatarId(avatarId);

    if (!avatarValidation.valid) {
      setStepError(
        "avatarId",
        avatarValidation.message,
      );
      return false;
    }

    const genderValidation =
      validateGender(gender);

    if (!genderValidation.valid) {
      setStepError(
        "gender",
        genderValidation.message,
      );
      return false;
    }

    const countryCodeValidation =
      validateCountryCode(country);

    if (!countryCodeValidation.valid) {
      setStepError(
        "countryCode",
        countryCodeValidation.message,
      );
      return false;
    }

    const countryNameValidation =
      validateCountryName(
        countryName,
      );

    if (!countryNameValidation.valid) {
      setStepError(
        "countryName",
        countryNameValidation.message,
      );
      return false;
    }

    const birthDateValidation =
      validateDateOfBirth(
        dateOfBirth,
      );

    if (!birthDateValidation.valid) {
      setStepError(
        "dateOfBirth",
        birthDateValidation.message,
      );
      return false;
    }

    setCountry(
      countryCodeValidation.value,
    );
    setCountryName(
      countryNameValidation.value,
    );

    return true;
  }

  async function goToNextStep() {
    setMessage("");
    setFieldErrors({});

    if (currentStep === "identity") {
      const valid =
        await validateIdentityStep();

      if (valid) {
        setCurrentStep("security");
      }

      return;
    }

    if (currentStep === "security") {
      if (validateSecurityStep()) {
        setCurrentStep("profile");
      }

      return;
    }

    if (currentStep === "profile") {
      if (validateProfileStep()) {
        setCurrentStep(
          "confirmation",
        );
      }
    }
  }

  function goToPreviousStep() {
    setMessage("");
    setFieldErrors({});

    if (currentStep === "security") {
      setCurrentStep("identity");
    }

    if (currentStep === "profile") {
      setCurrentStep("security");
    }

    if (
      currentStep === "confirmation"
    ) {
      setCurrentStep("profile");
    }
  }

  async function handleRegister(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");
    setFieldErrors({});

    const validation =
      validateRegistrationInput(
        buildRegistrationInput(),
      );

    if (!validation.valid) {
  const firstStep =
    getFirstErrorStep(
      validation.errors,
    );

  setFieldErrors(
    validation.errors,
  );

  setMessage("");

  if (firstStep) {
    setCurrentStep(firstStep);
  }

  setIsLoading(false);
  return;
}

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            ...validation.value,
            confirmPassword,
            termsVersion:
              LEGAL_DOCUMENTS.terms
                .version,
            privacyVersion:
              LEGAL_DOCUMENTS.privacy
                .version,
            next: nextUrl,
          }),
        },
      );

      const payload =
        (await response.json()) as
          RegisterApiResponse;

      if (
  !response.ok ||
  !payload.success
) {
  if (payload.fieldErrors) {
    setFieldErrors(
      payload.fieldErrors,
    );

    const firstStep =
      getFirstErrorStep(
        payload.fieldErrors,
      );

    if (firstStep) {
      setCurrentStep(firstStep);
    }

    setMessage("");
    setIsLoading(false);
    return;
  }

  setMessage(
    payload.error ??
      "Unable to create the account right now.",
  );

  setIsLoading(false);
  return;
}

      setPassword("");
      setConfirmPassword("");

      const retryAfterSeconds =
        payload.retryAfterSeconds ?? 180;

      const pendingVerification:
        PendingEmailVerification = {
          email: validation.value.email,
          next:
            payload.next ?? nextUrl,
          guardianConsentRequired:
            payload.guardianConsentRequired ??
            validation.value
              .guardianConsentRequired,
          verificationEmailSent:
            payload.verificationEmailSent ??
            false,
          createdAt: Date.now(),
          resendAvailableAt:
            Date.now() +
            retryAfterSeconds * 1000,
        };

      window.sessionStorage.setItem(
        PENDING_EMAIL_VERIFICATION_KEY,
        JSON.stringify(
          pendingVerification,
        ),
      );

      router.push("/check-email");
      router.refresh();
    } catch {
      setMessage(
        "Unable to reach the registration service. Check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      noValidate
      className="flex flex-col gap-[clamp(1rem,2.4vw,1.6rem)]"
    >
      <RegisterProgress
        steps={steps}
        currentStep={currentStep}
      />

      {currentStep === "identity" ? (
        <div className="flex flex-col gap-[clamp(0.8rem,2vw,1.2rem)]">
          <StepHeader
            title="Create Your Identity"
            description="Choose the public name used across the Lifetopia website, community, and game."
          />

          <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
            <span className="flex items-center justify-between gap-3 text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
              Username
              <span className="text-xs font-semibold text-[#8f7458]">
                4–16 characters
              </span>
            </span>

            <input
              type="text"
              required
              minLength={4}
              maxLength={16}
              autoComplete="username"
              spellCheck={false}
              placeholder="player_01"
              value={username}
              disabled={isLoading}
              aria-invalid={Boolean(
                fieldErrors.username,
              )}
              aria-describedby="register-username-help register-username-status"
              onChange={(event) => {
                setUsername(
                  event.target.value
                    .toLowerCase(),
                );
                clearFieldError(
                  "username",
                );
              }}
              onBlur={() =>
                setUsername(
                  normalizeUsername(
                    username,
                  ),
                )
              }
              className={`${INPUT_CLASS} ${
                fieldErrors.username
                  ? "border-red-400 focus:border-red-500"
                  : "border-[#d9c99f] focus:border-[#4f8124]"
              }`}
            />

            <span
              id="register-username-help"
              className="text-xs font-semibold leading-5 text-[#8f7458]"
            >
              Lowercase letters, numbers,
              and underscores. Up to two
              consecutive underscores.
            </span>

            {usernameStatus !== "idle" ? (
              <span
                id="register-username-status"
                aria-live="polite"
                className={`flex items-center gap-1.5 text-xs font-bold ${
                  usernameStatus ===
                  "available"
                    ? "text-[#4f8124]"
                    : usernameStatus ===
                        "checking"
                      ? "text-[#76583a]"
                      : "text-red-600"
                }`}
              >
                {usernameStatus ===
                "available" ? (
                  <CheckCircle2
                    size={14}
                  />
                ) : null}

                {usernameStatus ===
                "checking"
                  ? "Checking username..."
                  : usernameMessage}
              </span>
            ) : null}

            <FieldError
              id="register-username-error"
              message={
                fieldErrors.username
              }
            />
          </label>

          <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
            <span className="flex items-center justify-between gap-3 text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
              Display Name
              <span className="text-xs font-semibold text-[#8f7458]">
                2–32 characters
              </span>
            </span>

            <input
              type="text"
              required
              minLength={2}
              maxLength={32}
              autoComplete="name"
              placeholder="Pasha Muhammad"
              value={displayName}
              disabled={isLoading}
              aria-invalid={Boolean(
                fieldErrors.displayName,
              )}
              onChange={(event) => {
                setDisplayName(
                  event.target.value,
                );
                clearFieldError(
                  "displayName",
                );
              }}
              onBlur={() =>
                setDisplayName(
                  normalizeDisplayName(
                    displayName,
                  ),
                )
              }
              className={`${INPUT_CLASS} ${
                fieldErrors.displayName
                  ? "border-red-400 focus:border-red-500"
                  : "border-[#d9c99f] focus:border-[#4f8124]"
              }`}
            />

            <span className="text-xs font-semibold leading-5 text-[#8f7458]">
              Letters, numbers, and spaces.
              Display Names may be
              duplicated.
            </span>

            <FieldError
              id="register-display-name-error"
              message={
                fieldErrors.displayName
              }
            />
          </label>
        </div>
      ) : null}

      {currentStep === "security" ? (
        <div className="flex flex-col gap-[clamp(0.8rem,2vw,1.2rem)]">
          <StepHeader
            title="Secure Your Account"
            description="Use an email you can access and create a unique password for Lifetopia."
          />

          <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
            <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
              Email
            </span>

            <input
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              inputMode="email"
              placeholder="player@email.com"
              value={email}
              disabled={isLoading}
              aria-invalid={Boolean(
                fieldErrors.email,
              )}
              onChange={(event) => {
                setEmail(
                  event.target.value,
                );
                clearFieldError("email");
              }}
              onBlur={() =>
                setEmail(
                  normalizeEmail(email),
                )
              }
              className={`${INPUT_CLASS} ${
                fieldErrors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-[#d9c99f] focus:border-[#4f8124]"
              }`}
            />

            <FieldError
              id="register-email-error"
              message={fieldErrors.email}
            />
          </label>

          <PasswordField
            id="register-password"
            label="Password"
            value={password}
            placeholder="Create a strong password"
            autoComplete="new-password"
            disabled={isLoading}
            error={fieldErrors.password}
            onChange={(value) => {
              setPassword(value);
              clearFieldError(
                "password",
              );
            }}
          />

          {password ? (
            <div className="rounded-[18px] border border-[#e0d1b7] bg-[#fffaf1] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-[#76583a]">
                  Password strength
                </p>

                <span
                  className={`text-xs font-black capitalize ${
                    passwordAssessment.strength ===
                    "strong"
                      ? "text-[#4f8124]"
                      : passwordAssessment.strength ===
                          "fair"
                        ? "text-amber-700"
                        : "text-red-600"
                  }`}
                >
                  {
                    passwordAssessment.strength
                  }
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8dcc9]">
                <div
                  className={`h-full rounded-full transition-all ${
                    passwordAssessment.strength ===
                    "strong"
                      ? "bg-[#4f8124]"
                      : passwordAssessment.strength ===
                          "fair"
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.round(
                      (
                        passwordAssessment.score /
                        6
                      ) * 100,
                    )}%`,
                  }}
                />
              </div>

              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                <PasswordRequirement
                  met={
                    passwordAssessment
                      .requirements
                      .hasMinimumLength
                  }
                >
                  8–72 characters
                </PasswordRequirement>

                <PasswordRequirement
                  met={
                    passwordAssessment
                      .requirements
                      .hasUppercase
                  }
                >
                  Uppercase letter
                </PasswordRequirement>

                <PasswordRequirement
                  met={
                    passwordAssessment
                      .requirements
                      .hasLowercase
                  }
                >
                  Lowercase letter
                </PasswordRequirement>

                <PasswordRequirement
                  met={
                    passwordAssessment
                      .requirements
                      .hasNumber
                  }
                >
                  Number
                </PasswordRequirement>

                <PasswordRequirement
                  met={
                    passwordAssessment
                      .requirements
                      .hasSymbol
                  }
                >
                  Symbol
                </PasswordRequirement>

                <PasswordRequirement
                  met={
                    passwordAssessment
                      .requirements
                      .isWithinMaximumLength
                  }
                >
                  Maximum 72 characters
                </PasswordRequirement>
              </ul>
            </div>
          ) : null}

          <PasswordField
            id="register-confirm-password"
            label="Confirm Password"
            value={confirmPassword}
            placeholder="Repeat your password"
            autoComplete="new-password"
            disabled={isLoading}
            error={
              fieldErrors.confirmPassword
            }
            onChange={(value) => {
              setConfirmPassword(value);
              clearFieldError(
                "confirmPassword",
              );
            }}
          />

          {confirmPassword &&
          password === confirmPassword ? (
            <p className="flex items-center gap-1.5 text-xs font-bold text-[#4f8124]">
              <CheckCircle2 size={14} />
              Passwords match.
            </p>
          ) : null}
        </div>
      ) : null}

      {currentStep === "profile" ? (
        <div className="flex flex-col gap-[clamp(0.8rem,2vw,1.2rem)]">
          <StepHeader
            title="Build Your Profile"
            description="Choose an official avatar and provide the basic information used for your Lifetopia profile."
          />

          <div className="flex flex-col gap-2">
            <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
              Official Avatar
            </span>

            <AvatarPicker
              avatars={playerAvatars}
              selectedAvatarId={avatarId}
              onSelectAvatar={(value) => {
                setAvatarId(value);
                clearFieldError(
                  "avatarId",
                );
              }}
            />

            <FieldError
              id="register-avatar-error"
              message={
                fieldErrors.avatarId
              }
            />
          </div>

          <fieldset className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
            <legend className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
              Gender
            </legend>

            <div className="flex items-center gap-[clamp(1rem,2vw,1.5rem)] rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)]">
              {(
                [
                  ["male", "Male"],
                  ["female", "Female"],
                ] as const
              ).map(
                ([
                  value,
                  label,
                ]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2 text-[clamp(0.78rem,1vw,0.95rem)] font-semibold text-[#2f1b12]"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={value}
                      checked={
                        gender === value
                      }
                      disabled={isLoading}
                      onChange={() => {
                        setGender(value);
                        clearFieldError(
                          "gender",
                        );
                      }}
                      className="accent-[#4f8124]"
                    />

                    {label}
                  </label>
                ),
              )}
            </div>

            <FieldError
              id="register-gender-error"
              message={fieldErrors.gender}
            />
          </fieldset>

          <div className="grid gap-[clamp(0.6rem,1.5vw,1rem)] sm:grid-cols-2">
            <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
              <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
                Country
              </span>

              <CountryPicker
                value={country}
                onChange={(
                  countryCode,
                  selectedCountryName,
                ) => {
                  setCountry(countryCode);
                  setCountryName(
                    selectedCountryName,
                  );
                  clearFieldError(
                    "countryCode",
                  );
                  clearFieldError(
                    "countryName",
                  );
                }}
              />

              <FieldError
                id="register-country-error"
                message={
                  fieldErrors.countryCode ??
                  fieldErrors.countryName
                }
              />
            </label>

            <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
              <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
                Date of Birth
              </span>

              <input
                type="date"
                required
                autoComplete="bday"
                value={dateOfBirth}
                disabled={isLoading}
                aria-invalid={Boolean(
                  fieldErrors.dateOfBirth,
                )}
                onChange={(event) => {
                  setDateOfBirth(
                    event.target.value,
                  );
                  clearFieldError(
                    "dateOfBirth",
                  );
                }}
                className={`${INPUT_CLASS} ${
                  fieldErrors.dateOfBirth
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#d9c99f] focus:border-[#4f8124]"
                }`}
              />

              <FieldError
                id="register-birth-date-error"
                message={
                  fieldErrors.dateOfBirth
                }
              />
            </label>
          </div>

          {dateOfBirthAssessment?.valid &&
          dateOfBirthAssessment.value
            .guardianConsentRequired ? (
            <div className="flex items-start gap-3 rounded-[18px] border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-900">
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              Users aged 13–17 require
              parent or guardian approval
              before interactive features
              become available.
            </div>
          ) : null}
        </div>
      ) : null}

      {currentStep ===
      "confirmation" ? (
        <div className="flex flex-col gap-[clamp(0.8rem,2vw,1.2rem)]">
          <StepHeader
            title="Confirm Your Account"
            description="Review your information and accept the current Lifetopia legal documents."
          />

          <div className="grid gap-3 rounded-[clamp(0.9rem,2vw,1.4rem)] border border-[#d9c99f] bg-[#fff8e8] p-[clamp(0.85rem,2vw,1.25rem)] sm:grid-cols-[auto_minmax(0,1fr)]">
            <span className="grid size-12 place-items-center rounded-full border border-[#cfe2bd] bg-white text-[#4f8124]">
              <UserRoundCheck
                size={22}
              />
            </span>

            <div className="min-w-0">
              <p className="truncate text-base font-black text-[#2f1b12]">
                {displayName}
              </p>

              <p className="truncate text-sm font-bold text-[#4f8124]">
                @{username}
              </p>

              <p className="mt-1 break-all text-xs font-semibold text-[#76583a]">
                {email}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[18px] border border-[#e0d1b7] bg-white/70 p-4">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-[#8f7458]">
                Profile
              </p>

              <p className="mt-2 text-sm font-bold leading-6 text-[#2f1b12]">
                {gender === "male"
                  ? "Male"
                  : "Female"}{" "}
                · {countryName || country}
              </p>
            </div>

            <div className="rounded-[18px] border border-[#e0d1b7] bg-white/70 p-4">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-[#8f7458]">
                Legal version
              </p>

              <p className="mt-2 text-sm font-bold leading-6 text-[#2f1b12]">
                {
                  LEGAL_DOCUMENTS.terms
                    .version
                }
              </p>
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-[18px] border border-[#e0d1b7] bg-white/70 p-4 text-sm font-semibold leading-6 text-[#76583a]">
            <input
              type="checkbox"
              checked={agreeTerms}
              disabled={isLoading}
              onChange={(event) => {
  setAgreeTerms(
    event.target.checked,
  );

  clearFieldError(
    "termsAccepted",
  );

  setMessage("");
}}
              className="mt-1 size-4 accent-[#4f8124]"
            />

            <span>
              I have read and agree to
              the{" "}
              <Link
                href={
                  LEGAL_DOCUMENTS.terms
                    .path
                }
                target="_blank"
                rel="noreferrer"
                className="font-black text-[#4f8124] underline decoration-[#a9cd81] underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              version{" "}
              {
                LEGAL_DOCUMENTS.terms
                  .version
              }
              .
            </span>
          </label>

          <FieldError
            id="register-terms-error"
            message={
              fieldErrors.termsAccepted
            }
          />

          <label className="flex items-start gap-3 rounded-[18px] border border-[#e0d1b7] bg-white/70 p-4 text-sm font-semibold leading-6 text-[#76583a]">
            <input
              type="checkbox"
              checked={agreePrivacy}
              disabled={isLoading}
              onChange={(event) => {
  setAgreePrivacy(
    event.target.checked,
  );

  clearFieldError(
    "privacyAccepted",
  );

  setMessage("");
}}
              className="mt-1 size-4 accent-[#4f8124]"
            />

            <span>
              I have read and agree to
              the{" "}
              <Link
                href={
                  LEGAL_DOCUMENTS.privacy
                    .path
                }
                target="_blank"
                rel="noreferrer"
                className="font-black text-[#4f8124] underline decoration-[#a9cd81] underline-offset-4"
              >
                Privacy Policy
              </Link>{" "}
              version{" "}
              {
                LEGAL_DOCUMENTS.privacy
                  .version
              }
              .
            </span>
          </label>

          <FieldError
            id="register-privacy-error"
            message={
              fieldErrors.privacyAccepted
            }
          />

          <div className="flex items-start gap-3 rounded-[18px] border border-[#cfe2bd] bg-[#f1f8e9] px-4 py-3 text-sm font-semibold leading-6 text-[#53683a]">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0"
            />

            Your password and private
            birth date are not displayed
            on your public profile.
          </div>
        </div>
      ) : null}

      {message ? (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-2 rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-red-300 bg-red-50 px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.6rem,1vw,0.8rem)] text-[clamp(0.7rem,0.95vw,0.9rem)] font-bold leading-6 text-red-700"
        >
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0"
          />
          {message}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-[clamp(0.7rem,1.5vw,1rem)]">
        {currentStepIndex > 0 ? (
          <button
            type="button"
            onClick={
              goToPreviousStep
            }
            disabled={
              isLoading ||
              isStepChecking
            }
            className="lt-button-secondary disabled:pointer-events-none disabled:opacity-60"
          >
            Back
          </button>
        ) : (
          <span />
        )}

        {currentStep !==
        "confirmation" ? (
          <button
            type="button"
            onClick={
              goToNextStep
            }
            disabled={
              isLoading ||
              isStepChecking ||
              usernameStatus ===
                "checking"
            }
            className="lt-button-primary disabled:pointer-events-none disabled:opacity-60"
          >
            {isStepChecking
              ? "Checking..."
              : "Continue"}
          </button>
        ) : (
          <button
            type="submit"
            disabled={
  isLoading ||
  !agreeTerms ||
  !agreePrivacy
}
            className="lt-button-primary disabled:pointer-events-none disabled:opacity-60"
          >
            {isLoading
              ? "Creating..."
              : "Create Account"}
          </button>
        )}
      </div>

      <p className="text-center text-[clamp(0.72rem,0.95vw,0.9rem)] text-[#7a5635]">
        Already have an account?{" "}
        <Link
          href={loginHref}
          className="font-bold text-[#4f8124] hover:text-[#2f1b12]"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
