import {
  AlertTriangle,
  Flag,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { ReportModerationActions } from "@/components/admin/ReportModerationActions";
import { Avatar } from "@/components/ui/Avatar";
import type { ModerationReport } from "@/data/admin/reports";
import {
  COMMUNITY_REPORT_REASONS,
  type CommunityReportStatus,
} from "@/types/report";

type ReportsDashboardProps = {
  reports: ModerationReport[];
};

const statusStyles: Record<
  CommunityReportStatus,
  string
> = {
  pending:
    "border-[#edc4b7] bg-[#fff3ef] text-[#a84e36]",
  reviewing:
    "border-[#bddceb] bg-[#eef8ff] text-[#347ba5]",
  resolved:
    "border-[#c9dfbd] bg-[#edf7e7] text-[#4f8124]",
  dismissed:
    "border-[#ddd4c7] bg-[#f7f2eb] text-[#766858]",
};

function getReasonLabel(
  value: ModerationReport["reason"],
) {
  return (
    COMMUNITY_REPORT_REASONS.find(
      (reason) =>
        reason.value === value,
    )?.label ?? value
  );
}

export function ReportsDashboard({
  reports,
}: ReportsDashboardProps) {
  const pendingCount =
    reports.filter(
      (report) =>
        report.status ===
        "pending",
    ).length;

  const reviewingCount =
    reports.filter(
      (report) =>
        report.status ===
        "reviewing",
    ).length;

  return (
    <div className="pb-24 md:pb-4">
      <header className="rounded-[26px] border border-[#ead9b8] bg-[linear-gradient(135deg,#fffdf5,#edf7df)] p-5 shadow-[0_18px_45px_rgba(88,60,28,0.1)] sm:p-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe2bd] bg-white/80 px-3 py-1 text-xs font-black text-[#4f8124]">
          <ShieldCheck size={14} />
          Moderator Workspace
        </span>

        <h1 className="mt-3 text-3xl font-black text-[#2f2418]">
          Community Reports
        </h1>

        <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#7a5635]">
          Review reported posts and
          comments without exposing
          reporter identities publicly.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[18px] border border-[#edc4b7] bg-white/75 p-4">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#9f624f]">
              Pending
            </p>
            <p className="mt-1 text-2xl font-black text-[#a84e36]">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-[18px] border border-[#bddceb] bg-white/75 p-4">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#5f8195]">
              Reviewing
            </p>
            <p className="mt-1 text-2xl font-black text-[#347ba5]">
              {reviewingCount}
            </p>
          </div>

          <div className="rounded-[18px] border border-[#d8d0bf] bg-white/75 p-4">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#81705b]">
              Total loaded
            </p>
            <p className="mt-1 text-2xl font-black text-[#5c4c39]">
              {reports.length}
            </p>
          </div>
        </div>
      </header>

      {reports.length ? (
        <div className="mt-5 space-y-4">
          {reports.map(
            (report) => (
              <article
                key={report.id}
                className="rounded-[24px] border border-[#ead9b8] bg-white/85 p-4 shadow-[0_14px_34px_rgba(88,60,28,0.09)] sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar
                      src={
                        report.reporter
                          .avatarSrc
                      }
                      initials={report.reporter.displayName.charAt(
                        0,
                      )}
                      alt={
                        report.reporter
                          .displayName
                      }
                      size={44}
                    />

                    <div className="min-w-0">
                      <p className="truncate font-black text-[#2f2418]">
                        {
                          report.reporter
                            .displayName
                        }
                      </p>

                      <p className="truncate text-xs font-bold text-[#8a6b47]">
                        @
                        {
                          report.reporter
                            .username
                        }{" "}
                        · {report.createdAt}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-black capitalize ${statusStyles[report.status]}`}
                  >
                    {report.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#edc4b7] bg-[#fff3ef] px-3 py-1 text-xs font-black text-[#a84e36]">
                    <Flag size={13} />
                    {getReasonLabel(
                      report.reason,
                    )}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e1d5be] bg-[#fffaf0] px-3 py-1 text-xs font-black capitalize text-[#7a5635]">
                    {report.targetType ===
                    "comment" ? (
                      <MessageCircle
                        size={13}
                      />
                    ) : (
                      <AlertTriangle
                        size={13}
                      />
                    )}
                    {report.targetType}
                  </span>
                </div>

                <div className="mt-4 rounded-[18px] border border-[#eee2c9] bg-[#fffaf0] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#9b866d]">
                    Reported content
                  </p>

                  <p className="mt-2 whitespace-pre-wrap break-words text-sm font-semibold leading-6 text-[#4d4032]">
                    {
                      report.contentPreview
                    }
                  </p>

                  {report.author ? (
                    <p className="mt-2 text-xs font-bold text-[#8a6b47]">
                      Author:{" "}
                      <Link
                        href={`/user/${report.author.username}`}
                        className="font-black text-[#4f8124] hover:underline"
                      >
                        {
                          report.author
                            .displayName
                        }
                      </Link>
                    </p>
                  ) : null}

                  <Link
                    href={`/post/${report.postId}`}
                    className="mt-3 inline-flex text-xs font-black text-[#347ba5] hover:underline"
                  >
                    Open conversation
                  </Link>
                </div>

                {report.details ? (
                  <div className="mt-3 rounded-[16px] border border-[#e2d7c5] bg-[#faf6ef] px-4 py-3">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#8b765e]">
                      Reporter details
                    </p>

                    <p className="mt-1 text-sm font-semibold leading-6 text-[#655746]">
                      {report.details}
                    </p>
                  </div>
                ) : null}

                {report.resolutionNote ? (
                  <div className="mt-3 rounded-[16px] border border-[#cfe2bd] bg-[#edf7df] px-4 py-3">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#527d40]">
                      Existing moderator note
                    </p>

                    <p className="mt-1 text-sm font-semibold leading-6 text-[#536745]">
                      {
                        report.resolutionNote
                      }
                    </p>
                  </div>
                ) : null}

                <ReportModerationActions
                  reportId={report.id}
                  currentStatus={
                    report.status
                  }
                />
              </article>
            ),
          )}
        </div>
      ) : (
        <div className="mt-5 rounded-[24px] border border-[#dce9c9] bg-[#f4faee] p-8 text-center">
          <ShieldCheck
            size={38}
            className="mx-auto text-[#5f913f]"
          />

          <h2 className="mt-3 text-xl font-black text-[#385126]">
            No reports to review
          </h2>

          <p className="mt-2 text-sm font-semibold text-[#6f7f5f]">
            The moderation queue is
            currently clear.
          </p>
        </div>
      )}
    </div>
  );
}
