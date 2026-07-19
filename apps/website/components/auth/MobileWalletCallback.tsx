"use client";

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  handleMobileWalletCallback,
} from "@/lib/auth/mobile-wallet-deeplink";

type MobileWalletCallbackProps = {
  query: Record<
    string,
    string | undefined
  >;
};

export function MobileWalletCallback({
  query,
}: MobileWalletCallbackProps) {
  const started = useRef(false);

  const [status, setStatus] =
    useState<
      "working" | "success" | "error"
    >("working");

  const [message, setMessage] =
    useState(
      "Checking the encrypted wallet response…",
    );

  useEffect(() => {
    if (started.current) {
      return;
    }

    started.current = true;

    const params =
      new URLSearchParams();

    for (const [key, value] of
      Object.entries(query)) {
      if (value) {
        params.set(key, value);
      }
    }

    void handleMobileWalletCallback(
      params,
    )
      .then((result) => {
        if (
          result.kind ===
          "redirect"
        ) {
          setMessage(
            "Connection approved. Opening the wallet once more for the authentication signature…",
          );

          window.location.replace(
            result.url,
          );
          return;
        }

        setStatus("success");
        setMessage(result.message);

        window.setTimeout(() => {
          window.location.replace(
            result.url,
          );
        }, 450);
      })
      .catch((caughtError) => {
        setStatus("error");
        setMessage(
          caughtError instanceof Error
            ? caughtError.message
            : "The mobile wallet callback could not be completed.",
        );
      });
  }, [query]);

  return (
    <section className="rounded-[28px] border border-[#d9c99f] bg-white/85 p-[clamp(1.25rem,4vw,2.25rem)] shadow-[0_18px_45px_rgba(95,70,37,0.08)] backdrop-blur">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#d8c79d] bg-[#fff8e9] text-[#4f8124]">
          {status === "working" ? (
            <LoaderCircle
              aria-hidden="true"
              className="size-6 animate-spin"
            />
          ) : status ===
            "success" ? (
            <CheckCircle2
              aria-hidden="true"
              className="size-6"
            />
          ) : (
            <AlertCircle
              aria-hidden="true"
              className="size-6 text-[#c12626]"
            />
          )}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4f8124]">
            Secure wallet return
          </p>

          <h1 className="mt-2 text-2xl font-black text-[#2f1b12]">
            {status === "working"
              ? "Finishing wallet authentication."
              : status === "success"
                ? "Wallet verified."
                : "Wallet return stopped."}
          </h1>

          <p
            role={
              status === "error"
                ? "alert"
                : "status"
            }
            className="mt-3 max-w-xl text-sm font-semibold leading-6 text-[#76583a]"
          >
            {message}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#d9c99f] bg-[#fffaf0] p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-[#4f8124]"
          />
          <p className="text-sm font-semibold leading-6 text-[#76583a]">
            Lifetopia verifies only the original one-time message. This flow cannot request a transfer, transaction, seed phrase, or private key.
          </p>
        </div>
      </div>

      {status === "error" ? (
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/wallet-login"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#4f8124] px-5 text-sm font-black text-white transition hover:bg-[#416d1d]"
          >
            Restart wallet login
          </Link>

          <Link
            href="/account/wallet"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[#d8c79d] bg-white px-5 text-sm font-black text-[#76583a]"
          >
            Return to wallet settings
          </Link>
        </div>
      ) : null}
    </section>
  );
}
