"use client";

import Script from "next/script";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type TurnstileWidgetOptions = {
  sitekey: string;
  action?: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (
    container:
      HTMLElement | string,
    options:
      TurnstileWidgetOptions,
  ) => string;
  reset: (
    widgetId?: string,
  ) => void;
  remove: (
    widgetId: string,
  ) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileChallengeProps = {
  siteKey: string;
  resetSignal: number;
  disabled?: boolean;
  onTokenChange: (
    token: string | null,
  ) => void;
};

export function TurnstileChallenge({
  siteKey,
  resetSignal,
  disabled = false,
  onTokenChange,
}: TurnstileChallengeProps) {
  const containerRef =
    useRef<HTMLDivElement | null>(
      null,
    );
  const widgetIdRef =
    useRef<string | null>(null);
  const [scriptReady, setScriptReady] =
    useState(false);
  const [widgetError, setWidgetError] =
    useState(false);

  const renderWidget =
    useCallback(() => {
      if (
        !scriptReady ||
        !siteKey ||
        !containerRef.current ||
        !window.turnstile ||
        widgetIdRef.current
      ) {
        return;
      }

      setWidgetError(false);

      widgetIdRef.current =
        window.turnstile.render(
          containerRef.current,
          {
            sitekey: siteKey,
            action: "login",
            theme: "light",
            callback: (token) => {
              setWidgetError(false);
              onTokenChange(token);
            },
            "expired-callback": () => {
              onTokenChange(null);
            },
            "error-callback": () => {
              setWidgetError(true);
              onTokenChange(null);
            },
          },
        );
    }, [
      onTokenChange,
      scriptReady,
      siteKey,
    ]);

  useEffect(() => {
    renderWidget();
  }, [renderWidget]);

  useEffect(() => {
    if (
      widgetIdRef.current &&
      window.turnstile
    ) {
      window.turnstile.reset(
        widgetIdRef.current,
      );
      onTokenChange(null);
    }
  }, [
    onTokenChange,
    resetSignal,
  ]);

  useEffect(() => {
    return () => {
      if (
        widgetIdRef.current &&
        window.turnstile
      ) {
        window.turnstile.remove(
          widgetIdRef.current,
        );
        widgetIdRef.current =
          null;
      }
    };
  }, []);

  if (!siteKey) {
    return (
      <p
        role="alert"
        className="rounded-[16px] border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700"
      >
        The security check is not
        configured. Contact
        contact@lifetopiaworld.io.
      </p>
    );
  }

  return (
    <div
      aria-disabled={disabled}
      className={`rounded-[18px] border border-[#d9c99f] bg-white p-3 ${
        disabled
          ? "pointer-events-none opacity-60"
          : ""
      }`}
    >
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() =>
          setScriptReady(true)
        }
        onLoad={() =>
          setScriptReady(true)
        }
      />

      <div
        ref={containerRef}
        className="flex min-h-16 justify-center overflow-hidden"
      />

      {widgetError ? (
        <p className="mt-2 text-center text-xs font-bold text-red-600">
          The security check could not
          load. Refresh it or try again.
        </p>
      ) : null}
    </div>
  );
}
