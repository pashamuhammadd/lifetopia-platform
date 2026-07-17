"use client";

import { Flag } from "lucide-react";
import { useState } from "react";

import { useGuestAuth } from "@/components/auth/GuestAuthProvider";
import type { CommunityReportTarget } from "@/types/report";

import { ReportModal } from "./ReportModal";

type ReportTriggerProps = {
  targetType: CommunityReportTarget;
  targetId: string;
  compact?: boolean;
  className?: string;
};

export function ReportTrigger({
  targetType,
  targetId,
  compact = false,
  className = "",
}: ReportTriggerProps) {
  const [isOpen, setIsOpen] =
    useState(false);

  const {
    isAuthenticated,
    requestAuth,
  } = useGuestAuth();

  function handleOpen() {
    if (!isAuthenticated) {
      requestAuth();
      return;
    }

    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={
          className ||
          (compact
            ? "inline-flex min-h-8 items-center gap-1.5 rounded-full px-2 text-xs font-black text-[#9a5d45] transition hover:bg-[#fff1eb] hover:text-[#a84e36]"
            : "flex w-full items-center gap-2 rounded-[14px] px-3 py-2 text-left text-sm font-black text-[#a84e36] transition hover:bg-[#fff1eb]")
        }
      >
        <Flag size={compact ? 14 : 15} />
        Report
      </button>

      <ReportModal
        open={isOpen}
        targetType={targetType}
        targetId={targetId}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
