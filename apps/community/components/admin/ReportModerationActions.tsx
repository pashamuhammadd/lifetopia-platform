"use client";

import {
  CheckCircle2,
  Eye,
  XCircle,
} from "lucide-react";
import {
  useState,
  useTransition,
} from "react";

import {
  updateCommunityReportStatus,
  type ModerationActionState,
} from "@/app/actions/community/moderation";
import type {
  CommunityReportStatus,
} from "@/types/report";

type ReportModerationActionsProps = {
  reportId: string;
  currentStatus: CommunityReportStatus;
};

const initialState: ModerationActionState = {
  success: false,
  message: "",
};

export function ReportModerationActions({
  reportId,
  currentStatus,
}: ReportModerationActionsProps) {
  const [state, setState] =
    useState<ModerationActionState>(
      initialState,
    );

  const [isPending, startTransition] =
    useTransition();

  function handleUpdate(
    status: CommunityReportStatus,
    form: HTMLFormElement,
  ) {
    const formData =
      new FormData(form);

    formData.set(
      "reportId",
      reportId,
    );

    formData.set("status", status);

    setState(initialState);

    startTransition(async () => {
      const result =
        await updateCommunityReportStatus(
          formData,
        );

      setState(result);
    });
  }

  return (
    <form
      onSubmit={(event) =>
        event.preventDefault()
      }
      className="mt-4"
    >
      <label className="block">
        <span className="text-xs font-black uppercase tracking-[0.08em] text-[#8b765e]">
          Moderator note
        </span>

        <textarea
          name="resolutionNote"
          maxLength={500}
          placeholder="Optional internal note..."
          className="mt-2 min-h-20 w-full resize-none rounded-[16px] border border-[#ead9b8] bg-[#fffaf0] p-3 text-sm font-semibold outline-none focus:border-[#6fa83a] focus:bg-white"
        />
      </label>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={
            isPending ||
            currentStatus ===
              "reviewing"
          }
          onClick={(event) =>
            handleUpdate(
              "reviewing",
              event.currentTarget
                .form!,
            )
          }
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#bddceb] bg-[#eef8ff] px-4 text-xs font-black text-[#347ba5] disabled:opacity-50"
        >
          <Eye size={15} />
          Review
        </button>

        <button
          type="button"
          disabled={
            isPending ||
            currentStatus ===
              "resolved"
          }
          onClick={(event) =>
            handleUpdate(
              "resolved",
              event.currentTarget
                .form!,
            )
          }
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#c9dfbd] bg-[#edf7e7] px-4 text-xs font-black text-[#4f8124] disabled:opacity-50"
        >
          <CheckCircle2 size={15} />
          Resolve
        </button>

        <button
          type="button"
          disabled={
            isPending ||
            currentStatus ===
              "dismissed"
          }
          onClick={(event) =>
            handleUpdate(
              "dismissed",
              event.currentTarget
                .form!,
            )
          }
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#e2d4c4] bg-[#f8f3ec] px-4 text-xs font-black text-[#7c6c5a] disabled:opacity-50"
        >
          <XCircle size={15} />
          Dismiss
        </button>
      </div>

      {state.message ? (
        <p
          role={
            state.success
              ? "status"
              : "alert"
          }
          className={`mt-3 rounded-[14px] px-3 py-2 text-xs font-black ${
            state.success
              ? "bg-[#edf7df] text-[#4f8124]"
              : "bg-[#fff0f0] text-[#c24141]"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
