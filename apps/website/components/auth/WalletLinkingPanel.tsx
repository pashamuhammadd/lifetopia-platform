"use client";

import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Link2,
  LoaderCircle,
  ShieldCheck,
  Smartphone,
  Unlink,
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
  isAndroidMobileWalletSupported,
  walletSourceLabel,
} from "@/lib/auth/wallet-client";
import type {
  WalletSource,
} from "@/lib/auth/wallet-client";
import type {
  LinkedSolanaWallet,
} from "@/lib/auth/wallet-linking";

type WalletLinkingPanelProps = {
  initialWallet:
    LinkedSolanaWallet | null;
};

type ApiPayload = {
  success?: boolean;
  code?: string;
  error?: string;
  challenge?: {
    id: string;
    message: string;
    expiresAt: string;
  };
  wallet?: {
    id: string;
    address: string;
    linkedAt: string;
  };
};

function shortAddress(
  address: string,
): string {
  return `${address.slice(
    0,
    6,
  )}…${address.slice(-6)}`;
}

function formatDate(
  value: string,
): string {
  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}

async function readPayload(
  response: Response,
): Promise<ApiPayload> {
  return (await response
    .json()
    .catch(() => ({}))) as
    ApiPayload;
}

export function WalletLinkingPanel({
  initialWallet,
}: WalletLinkingPanelProps) {
  const [wallet, setWallet] =
    useState(initialWallet);

  const [isLoading, setIsLoading] =
    useState(false);

  const [
    activeProvider,
    setActiveProvider,
  ] =
    useState<WalletSource | null>(
      null,
    );

  const [isAndroid, setIsAndroid] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    setIsAndroid(
      isAndroidMobileWalletSupported(),
    );
  }, []);

  function handleSecurityRedirect(
    code: string | undefined,
  ): boolean {
    if (code !== "mfa_required") {
      return false;
    }

    window.location.assign(
      "/mfa-challenge?next=%2Faccount%2Fwallet",
    );

    return true;
  }

  async function linkWallet(
    choice: WalletSource,
  ) {
    setMessage("");
    setError("");

    setActiveProvider(choice);
    setIsLoading(true);

    try {
      const signer =
        await connectWallet(choice);

      const address = signer.address;

      const challengeResponse =
        await fetch(
          "/api/auth/wallet/challenge",
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
        handleSecurityRedirect(
          challengePayload.code,
        )
      ) {
        return;
      }

      if (
        !challengeResponse.ok ||
        !challengePayload.success ||
        !challengePayload.challenge
      ) {
        setError(
          challengePayload.error ??
            "The wallet signing request could not be created.",
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
          "/api/auth/wallet/verify",
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
            }),
          },
        );

      const verifyPayload =
        await readPayload(
          verifyResponse,
        );

      if (
        handleSecurityRedirect(
          verifyPayload.code,
        )
      ) {
        return;
      }

      if (
        !verifyResponse.ok ||
        !verifyPayload.success ||
        !verifyPayload.wallet
      ) {
        setError(
          verifyPayload.error ??
            "The signed wallet could not be linked.",
        );
        return;
      }

      setWallet({
        id:
          verifyPayload.wallet.id,
        address:
          verifyPayload.wallet
            .address,
        linkedAt:
          verifyPayload.wallet
            .linkedAt,
        lastVerifiedAt:
          verifyPayload.wallet
            .linkedAt,
      });

      setMessage(
        "Your Solana wallet is securely linked.",
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
        /was not detected|did not provide a Solana|mobile wallet adapter|available on supported Android|selected mobile wallet|changed the authentication message/i.test(
          errorMessage,
        );

      if (!rejected && !actionable) {
        console.error(
          "Wallet linking failed:",
          caughtError,
        );
      }

      setError(
        rejected
          ? "The wallet request was cancelled."
          : actionable
            ? errorMessage
            : process.env.NODE_ENV ===
                "development" &&
              errorMessage
            ? `The Solana wallet could not complete the linking request: ${errorMessage}`
            : "The Solana wallet could not complete the linking request.",
      );
    } finally {
      setIsLoading(false);
      setActiveProvider(null);
    }
  }

  async function unlinkWallet() {
    if (!wallet) {
      return;
    }

    const confirmed =
      window.confirm(
        "Unlink this Solana wallet from your Lifetopia account? Wallet login will not be available until a wallet is linked again.",
      );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/wallet/unlink",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            walletId: wallet.id,
            confirm: "UNLINK",
          }),
        },
      );

      const payload =
        await readPayload(response);

      if (
        handleSecurityRedirect(
          payload.code,
        )
      ) {
        return;
      }

      if (
        !response.ok ||
        !payload.success
      ) {
        setError(
          payload.error ??
            "The linked wallet could not be removed.",
        );
        return;
      }

      setWallet(null);
      setMessage(
        "The Solana wallet was unlinked.",
      );
    } catch {
      setError(
        "The wallet unlink service could not be reached.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="rounded-[28px] border border-[#d9c99f] bg-white/85 p-[clamp(1rem,3vw,1.75rem)] shadow-[0_18px_45px_rgba(95,70,37,0.08)] backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#d8c79d] bg-[#fff8e9] text-[#76583a]">
              <WalletCards
                aria-hidden="true"
                className="size-6"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-black text-[#2f1b12]">
                  Solana wallet
                </h2>

                {wallet ? (
                  <span className="rounded-full border border-[#a9cd82] bg-[#f0fae8] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.1em] text-[#4f8124]">
                    Verified
                  </span>
                ) : null}
              </div>

              <p className="mt-1 max-w-xl text-sm font-semibold leading-6 text-[#76583a]">
                Sign a human-readable message to prove wallet ownership. Lifetopia never requests your seed phrase, private key, funds, or a blockchain transaction.
              </p>
            </div>
          </div>
        </div>

        {wallet ? (
          <div className="mt-6 rounded-2xl border border-[#b7d79a] bg-[#f4fbea] p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-sm font-bold text-[#2f1b12]">
                  {shortAddress(
                    wallet.address,
                  )}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#76583a]">
                  Linked {formatDate(
                    wallet.linkedAt,
                  )}
                </p>
              </div>

              <button
                type="button"
                disabled={isLoading}
                onClick={unlinkWallet}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#efb7b7] bg-[#fff2f2] px-5 text-sm font-black text-[#c34444] transition hover:bg-[#ffe7e7] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin"
                  />
                ) : (
                  <Unlink
                    aria-hidden="true"
                    className="size-4"
                  />
                )}
                Unlink wallet
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#e2d4ad] bg-[#fffaf0] p-4">
            <div>
              <p className="font-black text-[#2f1b12]">
                No wallet linked
              </p>
              <p className="mt-1 text-sm font-semibold text-[#76583a]">
                {isAndroid
                  ? "Open the Android wallet chooser, select Phantom or Solflare, then approve one signature request."
                  : "Choose Phantom or Solflare, then approve one signature request in the selected wallet."}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
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
                        linkWallet(
                          choice,
                        )
                      }
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#4f8124] px-6 text-sm font-black text-white shadow-[0_10px_24px_rgba(79,129,36,0.22)] transition hover:bg-[#416d1d] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading &&
                      activeProvider ===
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
                      Connect {walletSourceLabel(
                        choice,
                      )}
                    </button>
                  ))
                : null}

              {isAndroid ? (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() =>
                    linkWallet(
                      "mobile",
                    )
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#4f8124] bg-[#edf7df] px-6 text-sm font-black text-[#416d1d] transition hover:bg-[#e0f0d1] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
                >
                  {isLoading &&
                  activeProvider ===
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
                  Connect a mobile wallet
                </button>
              ) : null}
            </div>

            {isAndroid ? (
              <p className="text-xs font-bold leading-5 text-[#76583a]">
                Android will open its wallet chooser. Select Phantom or Solflare and approve only the message signature.
              </p>
            ) : null}
          </div>
        )}
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-[#d9c99f] bg-white/75 p-5">
          <ShieldCheck
            aria-hidden="true"
            className="size-6 text-[#4f8124]"
          />
          <h3 className="mt-3 font-black text-[#2f1b12]">
            Protected linking
          </h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#76583a]">
            Every request expires after five minutes and can only be used once. Accounts with MFA must complete an AAL2 challenge first.
          </p>
        </div>

        <div className="rounded-[24px] border border-[#d9c99f] bg-white/75 p-5">
          <ExternalLink
            aria-hidden="true"
            className="size-6 text-[#4f8124]"
          />
          <h3 className="mt-3 font-black text-[#2f1b12]">
            Need account security?
          </h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#76583a]">
            Review your authenticator factors before changing important account identities.
          </p>
          <Link
            href="/account/security/mfa?next=%2Faccount%2Fwallet"
            className="mt-3 inline-flex font-black text-[#4f8124] hover:underline"
          >
            Manage two-factor authentication
          </Link>
        </div>
      </div>
    </section>
  );
}
