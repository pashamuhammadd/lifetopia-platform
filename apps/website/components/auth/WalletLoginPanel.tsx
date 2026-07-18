"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Link2,
  LoaderCircle,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import {
  useState,
} from "react";

type SolanaPublicKey = {
  toString(): string;
};

type SignedMessage =
  | Uint8Array
  | {
      signature: Uint8Array;
    };

type SolanaProvider = {
  isPhantom?: boolean;
  isSolflare?: boolean;
  publicKey?:
    | SolanaPublicKey
    | null;
  connect(options?: {
    onlyIfTrusted?: boolean;
  }): Promise<
    | void
    | {
        publicKey?:
          SolanaPublicKey | null;
      }
  >;
  signMessage(
    message: Uint8Array,
    display?: "utf8",
  ): Promise<SignedMessage>;
};

type WalletWindow = Window & {
  solana?: SolanaProvider;
  solflare?: SolanaProvider;
  phantom?: {
    solana?: SolanaProvider;
  };
};

type WalletChoice =
  | "phantom"
  | "solflare";

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

function walletLabel(
  choice: WalletChoice,
): string {
  return choice === "phantom"
    ? "Phantom"
    : "Solflare";
}

function getProvider(
  choice: WalletChoice,
): SolanaProvider | null {
  const walletWindow =
    window as WalletWindow;

  if (choice === "phantom") {
    return (
      walletWindow.phantom
        ?.solana ??
      (walletWindow.solana
        ?.isPhantom
        ? walletWindow.solana
        : null)
    );
  }

  return (
    walletWindow.solflare ??
    (walletWindow.solana
      ?.isSolflare
      ? walletWindow.solana
      : null)
  );
}

function bytesToBase64(
  bytes: Uint8Array,
): string {
  let binary = "";

  for (const byte of bytes) {
    binary +=
      String.fromCharCode(byte);
  }

  return window.btoa(binary);
}

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
    useState<WalletChoice | null>(
      null,
    );

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  async function loginWithWallet(
    choice: WalletChoice,
  ) {
    setMessage("");
    setError("");

    const provider =
      getProvider(choice);

    if (!provider) {
      setError(
        `${walletLabel(
          choice,
        )} was not detected. Install or unlock the ${walletLabel(
          choice,
        )} extension, reload this page, and try again.`,
      );
      return;
    }

    setActiveWallet(choice);
    setIsLoading(true);

    try {
      let publicKey =
        provider.publicKey ?? null;

      if (!publicKey) {
        const connection =
          await provider.connect();

        publicKey =
          connection?.publicKey ??
          provider.publicKey ??
          null;
      }

      if (!publicKey) {
        throw new Error(
          `${walletLabel(
            choice,
          )} did not provide a Solana public key after connecting.`,
        );
      }

      const address =
        publicKey.toString();

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

      const signed =
        await provider.signMessage(
          encodedMessage,
          "utf8",
        );

      const signature =
        signed instanceof Uint8Array
          ? signed
          : signed.signature;

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
      console.error(
        "Wallet login failed:",
        caughtError,
      );

      const errorMessage =
        caughtError instanceof Error
          ? caughtError.message
          : "";

      const rejected =
        Boolean(errorMessage) &&
        /reject|cancel|declin/i.test(
          errorMessage,
        );

      setError(
        rejected
          ? "The wallet login request was cancelled."
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
              Choose your linked wallet
            </h2>
            <p className="mt-1 max-w-xl text-sm font-semibold leading-6 text-[#76583a]">
              Select the extension that owns your linked address. Trust Wallet and unrelated injected providers are never selected automatically.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {(
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
              activeWallet === choice ? (
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
              Continue with {walletLabel(
                choice,
              )}
            </button>
          ))}
        </div>
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
