"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AvatarPicker } from "@/components/auth/AvatarPicker";
import { CountryPicker } from "@/components/auth/CountryPicker";
import { playerAvatars } from "@repo/data/auth";
import { createClient } from "@repo/lib/supabase/client";
import type { RegisterStep } from "@repo/types/auth";
import { checkUsernameAvailability } from "@repo/services/auth";


const steps: RegisterStep[] = ["avatar", "identity", "security", "terms"];

type Gender = "male" | "female";

export function RegisterForm() {
  const supabase = createClient();

  const [currentStep, setCurrentStep] = useState<RegisterStep>("avatar");

  const [avatarId, setAvatarId] = useState(playerAvatars[0]?.id ?? "");
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<
  "idle" | "checking" | "available" | "taken" | "invalid" | "error"
>("idle");

const [usernameMessage, setUsernameMessage] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentStepIndex = steps.indexOf(currentStep);

  const usernamePattern = /^[a-zA-Z0-9_]{4,10}$/;
  const isUsernameFilled = username.length > 0;
  const isUsernameFormatValid = usernamePattern.test(username);
  useEffect(() => {
  const normalizedUsername = username.trim();

  if (!normalizedUsername) {
    setUsernameStatus("idle");
    setUsernameMessage("");
    return;
  }

  const timeout = setTimeout(async () => {
    setUsernameStatus("checking");

    const result = await checkUsernameAvailability(normalizedUsername);

    setUsernameStatus(result.status);
    setUsernameMessage(result.message);
  }, 400);

  return () => clearTimeout(timeout);
}, [username]);

  function goToNextStep() {
    setMessage("");

    if (currentStep === "avatar") {
      if (!avatarId) {
        setMessage("Please choose your avatar.");
        return;
      }

      setCurrentStep("identity");
      return;
    }

    if (currentStep === "identity") {
      const displayNamePattern = /^.{4,10}$/;

      if (!usernamePattern.test(username)) {
        setMessage(
          "Username must be 4-10 characters and only use letters, numbers, or underscore.",
        );
        return;
      }

      if (!displayNamePattern.test(displayName)) {
        setMessage("Display Name must be 4-10 characters.");
        return;
      }

      if (!gender || !country || !dateOfBirth) {
        setMessage("Please choose your gender, country, and date of birth.");
        return;
      }

      if (usernameStatus !== "available") {
  setMessage("Please choose an available username.");
  return;
    }

      setCurrentStep("security");
      return;
    }

    if (currentStep === "security") {
      const strongPasswordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

      if (!email || !password || !confirmPassword) {
        setMessage("Please fill all security fields.");
        return;
      }

      if (!strongPasswordPattern.test(password)) {
        setMessage(
          "Password must contain uppercase, lowercase, number, symbol, and at least 8 characters.",
        );
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Password confirmation does not match.");
        return;
      }

      setCurrentStep("terms");
    }
  }

  function goToPreviousStep() {
    setMessage("");

    if (currentStep === "identity") setCurrentStep("avatar");
    if (currentStep === "security") setCurrentStep("identity");
    if (currentStep === "terms") setCurrentStep("security");
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!agreeTerms || !agreePrivacy) {
      setMessage("Please agree to the Terms of Service and Privacy Policy.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          account_type: "player",
          username,
          display_name: displayName,
          gender,
          avatar_id: avatarId,
          country,
          country_name: countryName,
          date_of_birth: dateOfBirth,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    setMessage(
      "Account created successfully. You can continue to your dashboard after login.",
    );
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col gap-[clamp(1rem,2.4vw,1.6rem)]"
    >
      <div className="grid grid-cols-4 gap-[clamp(0.35rem,1vw,0.75rem)]">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`h-[clamp(0.35rem,0.8vw,0.55rem)] rounded-full transition ${
              index <= currentStepIndex ? "bg-[#4f8124]" : "bg-[#d9c99f]/60"
            }`}
          />
        ))}
      </div>

      {currentStep === "avatar" ? (
        <div className="flex flex-col gap-[clamp(0.9rem,2vw,1.4rem)]">
          <div>
            <h2 className="text-[clamp(1.15rem,2vw,1.7rem)] font-black text-[#2f1b12]">
              Choose Your Avatar
            </h2>
            <p className="mt-[clamp(0.35rem,0.8vw,0.6rem)] text-[clamp(0.72rem,0.95vw,0.9rem)] leading-[1.6] text-[#7a5635]">
              Select the character that will represent you in Lifetopia World.
            </p>
          </div>

          <AvatarPicker
            avatars={playerAvatars}
            selectedAvatarId={avatarId}
            onSelectAvatar={setAvatarId}
          />
        </div>
      ) : null}

      {currentStep === "identity" ? (
        <div className="flex flex-col gap-[clamp(0.8rem,2vw,1.2rem)]">
          <div>
            <h2 className="text-[clamp(1.15rem,2vw,1.7rem)] font-black text-[#2f1b12]">
              Create Your Identity
            </h2>
            <p className="mt-[clamp(0.35rem,0.8vw,0.6rem)] text-[clamp(0.72rem,0.95vw,0.9rem)] leading-[1.6] text-[#7a5635]">
              This identity will be used across the platform, forum, and game.
            </p>
          </div>

          <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
            <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
              Username
            </span>

            <input
              type="text"
              required
              minLength={4}
              maxLength={10}
              placeholder="Bent"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition placeholder:text-[#7a5635]/50 focus:border-[#4f8124]"
            />

            {usernameStatus !== "idle" && (
  <p
    className={`text-[clamp(0.65rem,0.9vw,0.85rem)] font-semibold ${
      usernameStatus === "available"
        ? "text-[#4f8124]"
        : usernameStatus === "checking"
          ? "text-[#7a5635]"
          : "text-red-600"
    }`}
  >
    {usernameStatus === "checking"
      ? "Checking username..."
      : usernameMessage}
  </p>
)}
          </label>

          <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
            <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
              Display Name
            </span>
            <input
              type="text"
              required
              minLength={4}
              maxLength={10}
              placeholder="Lifetopian"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition placeholder:text-[#7a5635]/50 focus:border-[#4f8124]"
            />
          </label>

          <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
            <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
              Gender
            </span>

            <div className="flex items-center gap-[clamp(1rem,2vw,1.5rem)] rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)]">
              <label className="flex cursor-pointer items-center gap-2 text-[clamp(0.78rem,1vw,0.95rem)] font-semibold text-[#2f1b12]">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="accent-[#4f8124]"
                />
                Male
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-[clamp(0.78rem,1vw,0.95rem)] font-semibold text-[#2f1b12]">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="accent-[#4f8124]"
                />
                Female
              </label>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-[clamp(0.6rem,1.5vw,1rem)]">
            <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
              <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
                Country
              </span>

              <CountryPicker
                value={country}
                onChange={(countryCode, selectedCountryName) => {
                  setCountry(countryCode);
                  setCountryName(selectedCountryName);
                }}
              />
            </label>

            <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
              <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
                Date of Birth
              </span>
              <input
                type="date"
                required
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.target.value)}
                className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition focus:border-[#4f8124]"
              />
            </label>
          </div>
        </div>
      ) : null}

      {currentStep === "security" ? (
        <div className="flex flex-col gap-[clamp(0.8rem,2vw,1.2rem)]">
          <div>
            <h2 className="text-[clamp(1.15rem,2vw,1.7rem)] font-black text-[#2f1b12]">
              Secure Your Account
            </h2>
            <p className="mt-[clamp(0.35rem,0.8vw,0.6rem)] text-[clamp(0.72rem,0.95vw,0.9rem)] leading-[1.6] text-[#7a5635]">
              Your email will be used for verification, recovery, and important
              account notifications.
            </p>
          </div>

          <input
            type="email"
            required
            placeholder="player@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition placeholder:text-[#7a5635]/50 focus:border-[#4f8124]"
          />

          <input
            type="password"
            required
            minLength={8}
            placeholder="Create a strong password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition placeholder:text-[#7a5635]/50 focus:border-[#4f8124]"
          />

          <input
            type="password"
            required
            minLength={8}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition placeholder:text-[#7a5635]/50 focus:border-[#4f8124]"
          />
        </div>
      ) : null}

      {currentStep === "terms" ? (
        <div className="flex flex-col gap-[clamp(0.8rem,2vw,1.2rem)]">
          <h2 className="text-[clamp(1.15rem,2vw,1.7rem)] font-black text-[#2f1b12]">
            Finish Your Registration
          </h2>

          <div className="rounded-[clamp(0.9rem,2vw,1.4rem)] border border-[#d9c99f] bg-[#fff8e8] p-[clamp(0.8rem,2vw,1.2rem)]">
            <p className="text-[clamp(0.75rem,1vw,0.95rem)] font-bold text-[#2f1b12]">
              @{username}
            </p>
            <p className="mt-1 text-[clamp(0.68rem,0.9vw,0.85rem)] text-[#7a5635]">
              {displayName} • {gender === "male" ? "Male" : "Female"} •{" "}
              {countryName || country}
            </p>
          </div>

          <label className="flex items-start gap-[clamp(0.5rem,1vw,0.75rem)] text-[clamp(0.72rem,0.95vw,0.9rem)] leading-[1.6] text-[#7a5635]">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(event) => setAgreeTerms(event.target.checked)}
              className="mt-1"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="font-bold text-[#4f8124]">
                Terms of Service
              </Link>
              .
            </span>
          </label>

          <label className="flex items-start gap-[clamp(0.5rem,1vw,0.75rem)] text-[clamp(0.72rem,0.95vw,0.9rem)] leading-[1.6] text-[#7a5635]">
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={(event) => setAgreePrivacy(event.target.checked)}
              className="mt-1"
            />
            <span>
              I agree to the{" "}
              <Link href="/privacy" className="font-bold text-[#4f8124]">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>
      ) : null}

      {message ? (
        <p className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-[#fff8e8] px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.6rem,1vw,0.8rem)] text-[clamp(0.7rem,0.95vw,0.9rem)] font-medium text-[#7a5635]">
          {message}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-[clamp(0.7rem,1.5vw,1rem)]">
        {currentStepIndex > 0 ? (
          <button
            type="button"
            onClick={goToPreviousStep}
            className="lt-button-secondary"
          >
            Back
          </button>
        ) : (
          <span />
        )}

        {currentStep !== "terms" ? (
          <button
            type="button"
            onClick={goToNextStep}
            className="lt-button-primary"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="lt-button-primary disabled:pointer-events-none disabled:opacity-60"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        )}
      </div>

      <p className="text-center text-[clamp(0.72rem,0.95vw,0.9rem)] text-[#7a5635]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-[#4f8124] hover:text-[#2f1b12]"
        >
          Login
        </Link>
      </p>
    </form>
  );
}