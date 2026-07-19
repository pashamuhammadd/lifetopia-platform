"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Link2,
  LoaderCircle,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import {
  bytesToBase64,
  connectWallet,
  getMobileWalletBrowseLinks,
  hasSupportedInjectedWallet,
  isAndroidDevice,
  isAndroidMobileWalletSupported,
  walletSourceLabel,
} from "@/lib/auth/wallet-client";
import type {
  MobileWalletBrowseLinks,
  WalletSource,
} from "@/lib/auth/wallet-client";

type WalletLoginPanelProps = {
  next: string;
};

type ApiPayload = {
  success?: boolean;
  code?: string;
  error?: string;
  next?: string;
  challenge?: {
    id: string;
    message: string;
    expiresAt: string;
  };
};

async function readPayload(
  response: Response,
): Promise<ApiPayload> {
  return (await response
    .json()
    .catch(() => ({}))) as
    ApiPayload;
}

export function WalletLoginPanel({
  next,
}: WalletLoginPanelProps) {
  const [isLoading, setIsLoading] =
    useState(false);

  const [
    activeWallet,
    setActiveWallet,
  ] =
    useState<WalletSource | null>(
      null,
    );

  const [isAndroid, setIsAndroid] =
    useState(false);

  const [isMwaSupported, setIsMwaSupported] =
    useState(false);

  const [mobileBrowseLinks, setMobileBrowseLinks] =
    useState<MobileWalletBrowseLinks | null>(
      null,
    );

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    const android =
      isAndroidDevice();

    const injectedWallet =
      hasSupportedInjectedWallet();

    const showMobileOptions =
      android && !injectedWallet;

    setIsAndroid(showMobileOptions);
    setIsMwaSupported(
      showMobileOptions &&
        isAndroidMobileWalletSupported(),
    );

    if (showMobileOptions) {
      setMobileBrowseLinks(
        getMobileWalletBrowseLinks(),
      );
    }
  }, []);

  async function loginWithWallet(
    choice: WalletSource,
  ) {
    setMessage("");
    setError("");

    setActiveWallet(choice);
    setIsLoading(true);

    try {
      const signer =
        await connectWallet(choice);

      const address = signer.address;

      const challengeResponse =
        await fetch(
          "/api/auth/wallet-login/challenge",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            cache: "no-store",
            body: JSON.stringify({
              address,
            }),
          },
        );

      const challengePayload =
        await readPayload(
          challengeResponse,
        );

      if (
        !challengeResponse.ok ||
        !challengePayload.success ||
        !challengePayload.challenge
      ) {
        setError(
          challengePayload.error ??
            "Wallet login could not be started. Link this wallet from your account settings first.",
        );
        return;
      }

      const encodedMessage =
        new TextEncoder().encode(
          challengePayload
            .challenge.message,
        );

      const signature =
        await signer.signMessage(
          encodedMessage,
        );

      const verifyResponse =
        await fetch(
          "/api/auth/wallet-login/verify",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            cache: "no-store",
            body: JSON.stringify({
              challengeId:
                challengePayload
                  .challenge.id,
              signature:
                bytesToBase64(
                  signature,
                ),
              next,
            }),
          },
        );

      const verifyPayload =
        await readPayload(
          verifyResponse,
        );

      if (
        !verifyResponse.ok ||
        !verifyPayload.success ||
        !verifyPayload.next
      ) {
        setError(
          verifyPayload.error ??
            "The signed wallet could not create a secure account session.",
        );
        return;
      }

      setMessage(
        "Wallet ownership verified. Opening your secure account session…",
      );

      window.location.assign(
        verifyPayload.next,
      );
    } catch (caughtError) {
      const errorMessage =
        caughtError instanceof Error
          ? caughtError.message
          : "";

      const rejected =
        Boolean(errorMessage) &&
        /reject|cancel|declin/i.test(
          errorMessage,
        );

      const actionable =
        Boolean(errorMessage) &&
        /was not detected|did not provide a Solana|mobile wallet adapter|available on supported Android|selected mobile wallet|changed the authentication message|could not open a compatible MWA wallet/i.test(
          errorMessage,
        );

      if (!rejected && !actionable) {
        console.error(
          "Wallet login failed:",
          caughtError,
        );
      }

      setError(
        rejected
          ? "The wallet login request was cancelled."
          : actionable
            ? errorMessage
            : process.env.NODE_ENV ===
                "development" &&
              errorMessage
            ? `Wallet login failed: ${errorMessage}`
            : "The Solana wallet could not complete login.",
      );
    } finally {
      setIsLoading(false);
      setActiveWallet(null);
    }
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="rounded-[28px] border border-[#d9c99f] bg-white/85 p-[clamp(1rem,3vw,1.75rem)] shadow-[0_18px_45px_rgba(95,70,37,0.08)] backdrop-blur">
        <div className="flex gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#d8c79d] bg-[#fff8e9] text-[#76583a]">
            <WalletCards
              aria-hidden="true"
              className="size-6"
            />
          </div>

          <div>
            <h2 className="text-lg font-black text-[#2f1b12]">
              {isAndroid
                ? "Choose your mobile wallet"
                : "Choose your linked wallet"}
            </h2>
            <p className="mt-1 max-w-xl text-sm font-semibold leading-6 text-[#76583a]">
              {isAndroid
                ? "Open the Android wallet chooser, then select Phantom or Solflare for your linked address."
                : "Select the extension that owns your linked address. Trust Wallet and unrelated injected providers are never selected automatically."}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {!isAndroid
            ? (
                [
                  "phantom",
                  "solflare",
                ] as const
              ).map((choice) => (
                <button
                  key={choice}
                  type="button"
                  disabled={isLoading}
                  onClick={() =>
                    loginWithWallet(
                      choice,
                    )
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#4f8124] px-6 text-sm font-black text-white shadow-[0_10px_24px_rgba(79,129,36,0.22)] transition hover:bg-[#416d1d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading &&
                  activeWallet ===
                    choice ? (
                    <LoaderCircle
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                  ) : (
                    <Link2
                      aria-hidden="true"
                      className="size-4"
                    />
                  )}
                  Continue with {walletSourceLabel(
                    choice,
                  )}
                </button>
              ))
            : null}

          {isAndroid &&
          isMwaSupported ? (
            <button
              type="button"
              disabled={isLoading}
              onClick={() =>
                loginWithWallet(
                  "mobile",
                )
              }
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#4f8124] bg-[#edf7df] px-6 text-sm font-black text-[#416d1d] transition hover:bg-[#e0f0d1] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
            >
              {isLoading &&
              activeWallet ===
                "mobile" ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin"
                />
              ) : (
                <Smartphone
                  aria-hidden="true"
                  className="size-4"
                />
              )}
              Continue with a mobile wallet
            </button>
          ) : null}

          {isAndroid &&
          mobileBrowseLinks ? (
            <>
              <a
                href={mobileBrowseLinks.phantom}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#4f8124] px-6 text-sm font-black text-white transition hover:bg-[#416d1d]"
              >
                <ExternalLink
                  aria-hidden="true"
                  className="size-4"
                />
                Open in Phantom
              </a>

              <a
                href={mobileBrowseLinks.solflare}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#4f8124] px-6 text-sm font-black text-white transition hover:bg-[#416d1d]"
              >
                <ExternalLink
                  aria-hidden="true"
                  className="size-4"
                />
                Open in Solflare
              </a>
            </>
          ) : null}
        </div>

        {isAndroid ? (
          <p className="mt-3 text-xs font-bold leading-5 text-[#76583a]">
            {isMwaSupported
              ? "Try the Android wallet chooser first. If it cannot find an installed wallet, open this page directly in Phantom or Solflare."
              : "This browser cannot use the Android wallet chooser. Open this page directly in Phantom or Solflare instead."}
          </p>
        ) : null}
      </div>

      {message ? (
        <div
          role="status"
          className="flex items-start gap-3 rounded-2xl border border-[#a9cd82] bg-[#f0fae8] p-4 text-sm font-bold text-[#416d1d]"
        >
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0"
          />
          {message}
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-[#f1aaaa] bg-[#fff1f1] p-4 text-sm font-bold text-[#c12626]"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0"
          />
          {error}
        </div>
      ) : null}

      <div className="rounded-[24px] border border-[#d9c99f] bg-white/75 p-5">
        <ShieldCheck
          aria-hidden="true"
          className="size-6 text-[#4f8124]"
        />
        <h3 className="mt-3 font-black text-[#2f1b12]">
          Signature, session, then MFA
        </h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#76583a]">
          The proof expires after five minutes and works once. If your account has two-factor authentication, wallet proof cannot bypass the authenticator challenge.
        </p>
      </div>

      <Link
        href={`/login?next=${encodeURIComponent(
          next,
        )}`}
        className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-2xl border border-[#d8c79d] bg-white/80 px-5 text-sm font-black text-[#76583a] transition hover:bg-white"
      >
        <ArrowLeft
          aria-hidden="true"
          className="size-4"
        />
        Use email and password
      </Link>
    </section>
  );
}
