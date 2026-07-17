"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Flag,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import {
  createCommunityReport,
  type CommunityReportActionState,
} from "@/app/actions/community/reports";
import {
  COMMUNITY_REPORT_DETAILS_MAX_LENGTH,
  COMMUNITY_REPORT_REASONS,
  type CommunityReportReason,
  type CommunityReportTarget,
} from "@/types/report";

type ReportModalProps = {
  open: boolean;
  targetType: CommunityReportTarget;
  targetId: string;
  onClose: () => void;
};

const initialState: CommunityReportActionState = {
  success: false,
  message: "",
};

export function ReportModal({
  open,
  targetType,
  targetId,
  onClose,
}: ReportModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const [reason, setReason] =
    useState<CommunityReportReason>("spam");

  const [detailsLength, setDetailsLength] =
    useState(0);

  const [state, setState] =
    useState<CommunityReportActionState>(
      initialState,
    );

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused =
      document.activeElement as HTMLElement | null;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements =
        Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );

      if (!focusableElements.length) {
        return;
      }

      const firstElement =
        focusableElements[0];

      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow =
        previousOverflow;

      previouslyFocused?.focus();
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget,
    );

    setState(initialState);

    startTransition(async () => {
      const result =
        await createCommunityReport(
          formData,
        );

      setState(result);
    });
  }

  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-[#2f1b12]/45 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-dialog-title"
        aria-describedby="report-dialog-description"
        className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-[28px] border border-[#ead9b8] bg-[#fffdf7] p-5 shadow-[0_24px_80px_rgba(47,27,18,0.3)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#edc4b7] bg-[#fff3ef] px-3 py-1 text-xs font-black text-[#a84e36]">
              <Flag size={13} />
              Community Safety
            </span>

            <h2
              id="report-dialog-title"
              className="mt-3 text-2xl font-black text-[#2f2418]"
            >
              Report this {targetType}
            </h2>

            <p
              id="report-dialog-description"
              className="mt-2 text-sm font-semibold leading-6 text-[#7a5635]"
            >
              Reports are private and reviewed by
              authorized Lifetopia moderators.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close report dialog"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#fff5df] text-[#7a5635] transition hover:bg-[#edf7df] hover:text-[#4f8124]"
          >
            <X size={18} />
          </button>
        </div>

        {state.success ? (
          <div
            role="status"
            className="mt-6 rounded-[20px] border border-[#cfe2bd] bg-[#edf7df] p-5 text-center"
          >
            <CheckCircle2
              size={34}
              className="mx-auto text-[#4f8124]"
            />

            <p className="mt-3 font-black text-[#385126]">
              {state.message}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 min-h-11 rounded-full bg-[#4f8124] px-6 text-sm font-black text-white transition hover:bg-[#3f6f22]"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-5"
          >
            <input
              type="hidden"
              name="targetType"
              value={targetType}
            />

            <input
              type="hidden"
              name="targetId"
              value={targetId}
            />

            <fieldset>
              <legend className="text-sm font-black text-[#2f2418]">
                Why are you reporting this?
              </legend>

              <div className="mt-3 grid gap-2">
                {COMMUNITY_REPORT_REASONS.map(
                  (item) => (
                    <label
                      key={item.value}
                      className={`cursor-pointer rounded-[18px] border p-3 transition ${
                        reason === item.value
                          ? "border-[#d9956d] bg-[#fff3eb]"
                          : "border-[#ead9b8] bg-white hover:bg-[#fffaf0]"
                      }`}
                    >
                      <span className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="reason"
                          value={item.value}
                          checked={
                            reason === item.value
                          }
                          onChange={() =>
                            setReason(
                              item.value,
                            )
                          }
                          className="mt-1 size-4 accent-[#a85c39]"
                        />

                        <span>
                          <span className="block text-sm font-black text-[#3a2a1e]">
                            {item.label}
                          </span>

                          <span className="mt-0.5 block text-xs font-semibold leading-5 text-[#826d58]">
                            {item.description}
                          </span>
                        </span>
                      </span>
                    </label>
                  ),
                )}
              </div>
            </fieldset>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#2f2418]">
                Additional details
                <span className="ml-1 font-semibold text-[#9b866d]">
                  (optional)
                </span>
              </span>

              <textarea
                name="details"
                maxLength={
                  COMMUNITY_REPORT_DETAILS_MAX_LENGTH
                }
                onChange={(event) =>
                  setDetailsLength(
                    event.currentTarget.value
                      .length,
                  )
                }
                placeholder="Share context that may help the moderation team."
                className="mt-2 min-h-28 w-full resize-none rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] p-4 text-sm font-semibold text-[#2f2418] outline-none transition focus:border-[#a85c39] focus:bg-white focus:ring-4 focus:ring-[#a85c39]/10"
              />

              <span className="mt-1 block text-right text-xs font-black text-[#9b866d]">
                {detailsLength}/
                {
                  COMMUNITY_REPORT_DETAILS_MAX_LENGTH
                }
              </span>
            </label>

            {state.message ? (
              <p
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-[16px] bg-[#fff0f0] px-4 py-3 text-sm font-black text-[#b84242]"
              >
                <AlertTriangle
                  size={17}
                  className="mt-0.5 shrink-0"
                />
                {state.message}
              </p>
            ) : null}

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="min-h-11 rounded-full border border-[#ead9b8] bg-[#fffaf0] px-5 text-sm font-black text-[#7a5635] transition hover:bg-white disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="min-h-11 rounded-full bg-[#a85c39] px-5 text-sm font-black text-white transition hover:bg-[#914a2d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending
                  ? "Submitting..."
                  : "Submit Report"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
