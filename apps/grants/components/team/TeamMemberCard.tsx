"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

export type TeamMemberLink = {
  label: string;
  href: string;
};

export type TeamMemberIdentity = {
  label: string;
  value: string;
};

export type TeamMemberCardData = {
  name: string;
  role: string;
  description: string;
  experience?: string;
  responsibilities: string[];
  imageSrc: string;
  imageAlt: string;
  accent: "green" | "blue" | "purple" | "gold";
  links: TeamMemberLink[];
  identities?: TeamMemberIdentity[];
};

type TeamMemberCardProps = {
  member: TeamMemberCardData;
};

function getAccentClasses(
  accent: TeamMemberCardData["accent"],
) {
  if (accent === "blue") {
    return {
      card: "border-[#bdd9e8] bg-[#f3f9fc]",
      image: "border-[#9bc9df]",
      role: "text-[#347ba5]",
      chip: "border-[#cce4f2] bg-[#edf7fd] text-[#477c99]",
      button:
        "border-[#347ba5] bg-[#347ba5] text-white hover:bg-[#28698e]",
      modalAccent:
        "border-[#c5dfed] bg-[#eef7fc] text-[#347ba5]",
      link:
        "border-[#d1e5f0] bg-[#f7fbfd] hover:border-[#82bad8] hover:bg-[#edf8fd]",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#d6cbed] bg-[#f8f5ff]",
      image: "border-[#b9a7e2]",
      role: "text-[#674aab]",
      chip: "border-[#dbd2f2] bg-[#f3efff] text-[#6d5a9c]",
      button:
        "border-[#674aab] bg-[#674aab] text-white hover:bg-[#543a91]",
      modalAccent:
        "border-[#dbd2f2] bg-[#f5f1fd] text-[#674aab]",
      link:
        "border-[#e0d8f2] bg-[#faf8ff] hover:border-[#ac98df] hover:bg-[#f3efff]",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#ead8ad] bg-[#fffaf0]",
      image: "border-[#ddb866]",
      role: "text-[#946b1b]",
      chip: "border-[#ead7a8] bg-[#fff6df] text-[#8f6d25]",
      button:
        "border-[#9b731e] bg-[#9b731e] text-white hover:bg-[#7d5b16]",
      modalAccent:
        "border-[#ead7a8] bg-[#fff7e4] text-[#946b1b]",
      link:
        "border-[#eadfbe] bg-[#fffaf0] hover:border-[#d6b86f] hover:bg-[#fff7e4]",
    };
  }

  return {
    card: "border-[#c8ddbd] bg-[#f4faf0]",
    image: "border-[#8cbd76]",
    role: "text-[#477a34]",
    chip: "border-[#d4e5ca] bg-[#edf7e6] text-[#557b45]",
    button:
      "border-[#4f7e3a] bg-[#4f7e3a] text-white hover:bg-[#3f692e]",
    modalAccent:
      "border-[#d4e5ca] bg-[#eef7e9] text-[#477a34]",
    link:
      "border-[#d8e7d0] bg-[#f8fcf5] hover:border-[#92bc7f] hover:bg-[#edf7e6]",
  };
}

function getDisplayUrl(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export function TeamMemberCard({
  member,
}: TeamMemberCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedIdentity, setCopiedIdentity] =
    useState<string | null>(null);

  const dialogId = useId();
  const accent = getAccentClasses(member.accent);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  async function copyIdentity(
    identity: TeamMemberIdentity,
  ) {
    try {
      await navigator.clipboard.writeText(identity.value);

      setCopiedIdentity(identity.label);

      window.setTimeout(() => {
        setCopiedIdentity(null);
      }, 1800);
    } catch {
      setCopiedIdentity(null);
    }
  }

  return (
    <>
      <article
        className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-[clamp(0.95rem,1.4vw,1.2rem)] border p-[clamp(0.9rem,1.3vw,1.1rem)] shadow-[0_0.8rem_2.5rem_rgba(63,47,27,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.1rem_3rem_rgba(63,47,27,0.09)] ${accent.card}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-white/55 blur-3xl"
        />

        <div className="relative flex h-full flex-col">
          <header className="flex items-center gap-3">
            <div
              className={`relative size-[clamp(4rem,5vw,4.7rem)] shrink-0 overflow-hidden rounded-[clamp(0.8rem,1vw,1rem)] border-2 bg-white ${accent.image}`}
            >
              <Image
                src={member.imageSrc}
                alt={member.imageAlt}
                fill
                sizes="(max-width: 640px) 72px, 80px"
                className="object-cover object-center"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-[clamp(1rem,1.22vw,1.2rem)] font-black leading-[1.18] tracking-[-0.025em] text-[#2f2118]">
                {member.name}
              </h3>

              <p
                className={`mt-1.5 text-[clamp(0.66rem,0.75vw,0.78rem)] font-black uppercase leading-[1.35] tracking-[0.07em] ${accent.role}`}
              >
                {member.role}
              </p>
            </div>
          </header>

          <p className="mt-3 overflow-hidden text-[clamp(0.76rem,0.84vw,0.88rem)] leading-[1.58] text-[#6f6554] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {member.description}
          </p>

          <div className="mt-3">
            <p className="text-[clamp(0.61rem,0.7vw,0.72rem)] font-black uppercase tracking-[0.08em] text-[#80715d]">
              Responsibilities
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {member.responsibilities.map(
                (responsibility) => (
                  <span
                    key={responsibility}
                    className={`rounded-full border px-2.5 py-1 text-[clamp(0.61rem,0.7vw,0.73rem)] font-bold ${accent.chip}`}
                  >
                    {responsibility}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-center gap-2 rounded-[0.75rem] border px-4 py-2.5 text-[clamp(0.72rem,0.82vw,0.86rem)] font-black transition ${accent.button}`}
            >
              Portfolio
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </article>

      {mounted && isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1c1711]/70 p-4 backdrop-blur-sm"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setIsOpen(false);
                }
              }}
            >
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby={dialogId}
                className="relative max-h-[88vh] w-full max-w-[39rem] overflow-y-auto rounded-[clamp(1rem,2vw,1.4rem)] border border-[#dfd2b8] bg-[#fffaf0] shadow-[0_2rem_6rem_rgba(20,15,8,0.35)]"
              >
                <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#e7dcc6] bg-[#fffaf0]/95 px-[clamp(1rem,2.5vw,1.4rem)] py-[clamp(0.9rem,2vw,1.2rem)] backdrop-blur">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`relative size-14 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${accent.image}`}
                    >
                      <Image
                        src={member.imageSrc}
                        alt={member.imageAlt}
                        fill
                        sizes="56px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[0.64rem] font-black uppercase tracking-[0.1em] text-[#81735f]">
                        Team Portfolio
                      </p>

                      <h3
                        id={dialogId}
                        className="mt-1 truncate text-[clamp(1.12rem,3vw,1.45rem)] font-black tracking-[-0.025em] text-[#2f2118]"
                      >
                        {member.name}
                      </h3>

                      <p
                        className={`mt-1 text-[clamp(0.66rem,1.7vw,0.78rem)] font-black uppercase tracking-[0.07em] ${accent.role}`}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close portfolio"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#ded1b8] bg-white text-xl font-bold text-[#625643] transition hover:border-[#bfae8e] hover:bg-[#f6efe1]"
                  >
                    ×
                  </button>
                </header>

                <div className="p-[clamp(1rem,2.5vw,1.4rem)]">
                  {member.experience ? (
                    <div
                      className={`rounded-xl border px-4 py-3 ${accent.modalAccent}`}
                    >
                      <p className="text-[0.64rem] font-black uppercase tracking-[0.09em] opacity-70">
                        Experience
                      </p>

                      <p className="mt-1.5 text-[clamp(0.76rem,1.8vw,0.88rem)] font-semibold leading-[1.6]">
                        {member.experience}
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-5">
                    <p className="text-[0.66rem] font-black uppercase tracking-[0.1em] text-[#7e705c]">
                      Public Links
                    </p>

                    <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {member.links.map((link) => (
                        <a
                          key={`${member.name}-${link.href}`}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`group flex min-w-0 items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${accent.link}`}
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-[clamp(0.76rem,1.8vw,0.88rem)] font-black text-[#30251c]">
                              {link.label}
                            </span>

                            <span className="mt-1 block truncate text-[clamp(0.63rem,1.5vw,0.72rem)] font-semibold text-[#82745f]">
                              {getDisplayUrl(link.href)}
                            </span>
                          </span>

                          <span
                            aria-hidden="true"
                            className="shrink-0 font-black text-[#668255] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          >
                            ↗
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {member.identities?.length ? (
                    <div className="mt-5 border-t border-[#e7dcc6] pt-5">
                      <p className="text-[0.66rem] font-black uppercase tracking-[0.1em] text-[#7e705c]">
                        Public Identity
                      </p>

                      <div className="mt-3 grid gap-2.5">
                        {member.identities.map((identity) => (
                          <button
                            key={`${member.name}-${identity.label}`}
                            type="button"
                            onClick={() =>
                              copyIdentity(identity)
                            }
                            className="flex items-center justify-between gap-4 rounded-xl border border-[#ded3be] bg-white px-4 py-3 text-left transition hover:border-[#bdae91] hover:bg-[#fdf8ee]"
                          >
                            <span className="min-w-0">
                              <span className="block text-[0.62rem] font-black uppercase tracking-[0.08em] text-[#8b7c67]">
                                {identity.label}
                              </span>

                              <span className="mt-1 block truncate text-[clamp(0.76rem,1.8vw,0.88rem)] font-black text-[#3b3026]">
                                {identity.value}
                              </span>
                            </span>

                            <span className="shrink-0 rounded-full border border-[#d8ccb6] bg-[#faf5eb] px-3 py-1.5 text-[0.65rem] font-black text-[#6d604d]">
                              {copiedIdentity === identity.label
                                ? "Copied"
                                : "Copy"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}