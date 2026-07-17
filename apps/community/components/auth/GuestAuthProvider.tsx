"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { GuestAuthModal } from "@/components/auth/GuestAuthModal";

type GuestAuthContextValue = {
  isAuthenticated: boolean;
  requestAuth: () => void;
};

const GuestAuthContext = createContext<GuestAuthContextValue | null>(null);

type GuestAuthProviderProps = {
  children: ReactNode;
  isAuthenticated: boolean;
};

export function GuestAuthProvider({
  children,
  isAuthenticated,
}: GuestAuthProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [returnUrl, setReturnUrl] = useState(
    "https://community.lifetopiaworld.io",
  );

  const requestAuth = useCallback(() => {
    if (isAuthenticated) return;

    setReturnUrl(window.location.href);
    setIsOpen(true);
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      requestAuth,
    }),
    [isAuthenticated, requestAuth],
  );

  return (
    <GuestAuthContext.Provider value={value}>
      {children}

      <GuestAuthModal
        open={isOpen}
        returnUrl={returnUrl}
        onClose={() => setIsOpen(false)}
      />
    </GuestAuthContext.Provider>
  );
}

export function useGuestAuth() {
  const context = useContext(GuestAuthContext);

  if (!context) {
    throw new Error("useGuestAuth must be used inside GuestAuthProvider.");
  }

  return context;
}
