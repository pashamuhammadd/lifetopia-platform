"use client";

import type { DocsLocale } from "@repo/docs-data";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type DocsLanguageContextValue = {
  locale: DocsLocale;
  setLocale: (locale: DocsLocale) => void;
};

type DocsLanguageProviderProps = {
  children: ReactNode;
};

const storageKey = "lifetopia-docs-locale";

const DocsLanguageContext =
  createContext<DocsLanguageContextValue | null>(null);

function isDocsLocale(
  value: string | null,
): value is DocsLocale {
  return value === "en" || value === "id";
}

export function DocsLanguageProvider({
  children,
}: DocsLanguageProviderProps) {
  const [locale, setLocaleState] =
    useState<DocsLocale>("en");

  const setLocale = useCallback(
    (nextLocale: DocsLocale) => {
      setLocaleState(nextLocale);

      document.documentElement.lang = nextLocale;

      try {
        window.localStorage.setItem(
          storageKey,
          nextLocale,
        );
      } catch {
        // The selected language still works for
        // the current session when storage fails.
      }
    },
    [],
  );

  useEffect(() => {
    let savedLocale: string | null = null;

    try {
      savedLocale =
        window.localStorage.getItem(storageKey);
    } catch {
      savedLocale = null;
    }

    if (isDocsLocale(savedLocale)) {
      setLocaleState(savedLocale);
      document.documentElement.lang =
        savedLocale;

      return;
    }

    document.documentElement.lang = "en";
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <DocsLanguageContext.Provider value={value}>
      {children}
    </DocsLanguageContext.Provider>
  );
}

export function useDocsLanguage() {
  const context = useContext(DocsLanguageContext);

  if (!context) {
    throw new Error(
      "useDocsLanguage must be used inside DocsLanguageProvider.",
    );
  }

  return context;
}