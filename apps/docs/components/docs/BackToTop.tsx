"use client";

import {
  useEffect,
  useState,
} from "react";

import { useDocsLanguage } from "./DocsLanguageProvider";

const labels = {
  en: "Back to top",
  id: "Kembali ke atas",
};

export function BackToTop() {
  const { locale } = useDocsLanguage();

  const [isVisible, setIsVisible] =
    useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 700);
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={labels[locale]}
      title={labels[locale]}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="fixed bottom-4 right-4 z-50 flex size-11 items-center justify-center rounded-full border border-[var(--docs-line-strong)] bg-[var(--docs-brown-dark)] text-white shadow-[var(--docs-shadow-floating)] transition hover:-translate-y-1 hover:bg-[var(--docs-brown)] xl:hidden"
    >
      <span
        aria-hidden="true"
        className="text-[1rem] font-extrabold"
      >
        ↑
      </span>
    </button>
  );
}