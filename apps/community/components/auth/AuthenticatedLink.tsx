"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { useGuestAuth } from "@/components/auth/GuestAuthProvider";

type AuthenticatedLinkProps = ComponentProps<typeof Link> & {
  requiresAuth?: boolean;
};

export function AuthenticatedLink({
  requiresAuth = false,
  onClick,
  ...props
}: AuthenticatedLinkProps) {
  const { isAuthenticated, requestAuth } = useGuestAuth();

  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) return;

        if (requiresAuth && !isAuthenticated) {
          event.preventDefault();
          requestAuth();
        }
      }}
    />
  );
}
