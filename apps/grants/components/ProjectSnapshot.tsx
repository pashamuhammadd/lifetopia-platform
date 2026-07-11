import Link from "next/link";

type ProductPreview = {
  label: string;
  domain: string;
  href: string;
  description: string;
  accent: "green" | "purple" | "orange" | "blue";
  status?: string;
  current?: boolean;
};

const products: ProductPreview[] = [
  {
    label: "Main Website",
    domain: "lifetopiaworld.io",
    href: "https://lifetopiaworld.io",
    description: "Official home of Lifetopia World and project information.",
    accent: "green",
    status: "Live",
  },
  {
    label: "Community Platform",
    domain: "community.lifetopiaworld.io",
    href: "https://community.lifetopiaworld.io",
    description: "Social platform for Lifetopians to connect and grow.",
    accent: "purple",
    status: "Live Beta",
  },
  {
    label: "Playable Game",
    domain: "play.lifetopiaworld.io",
    href: "https://play.lifetopiaworld.io",
    description: "Playable cozy life-sim prototype powered by Solana.",
    accent: "orange",
    status: "Beta",
  },
  {
    label: "Grant Portal",
    domain: "grants.lifetopiaworld.io",
    href: "https://grants.lifetopiaworld.io",
    description: "Transparency, development logs, milestones, and documents.",
    accent: "blue",
    status: "You are here",
    current: true,
  },
];

function getAccentClasses(accent: ProductPreview["accent"]) {
  if (accent === "purple") {
    return {
      icon: "bg-[#eee7ff] text-[#7651d6]",
      line: "bg-[#8b6ce3]",
      preview:
        "from-[#151823] via-[#24263a] to-[#101119]",
      glow: "bg-[#9a7cff]/20",
    };
  }

  if (accent === "orange") {
    return {
      icon: "bg-[#fff0dc] text-[#de7f18]",
      line: "bg-[#e4912b]",
      preview:
        "from-[#d5f0a4] via-[#7bb85d] to-[#3c743c]",
      glow: "bg-[#ffd071]/30",
    };
  }

  if (accent === "blue") {
    return {
      icon: "bg-[#e1f1ff] text-[#3479c9]",
      line: "bg-[#4c92dc]",
      preview:
        "from-[#dff4ff] via-[#b9e7fa] to-[#f8f2df]",
      glow: "bg-[#78cdf4]/25",
    };
  }

  return {
    icon: "bg-[#e8f4d8] text-[#3f843a]",
    line: "bg-[#5c9f45]",
    preview:
      "from-[#ccecff] via-[#8ed2ef] to-[#7ca65c]",
    glow: "bg-[#a7df6c]/25",
  };
}

function MainWebsitePreview() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#ccecff] via-[#91d5f2] to-[#74a75c]">
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[#57944d]" />

      <div className="absolute left-[8%] top-[15%] h-[18%] w-[32%] rounded-full bg-white/65 blur-[clamp(0.35rem,1vw,0.8rem)]" />
      <div className="absolute right-[6%] top-[9%] h-[24%] w-[28%] rounded-full bg-white/55 blur-[clamp(0.35rem,1vw,0.8rem)]" />

      <div className="absolute bottom-[14%] left-[7%] h-[28%] w-[30%] rounded-t-[45%] bg-[#39773b]" />
      <div className="absolute bottom-[10%] right-[6%] h-[34%] w-[37%] rounded-t-[50%] bg-[#316c35]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[clamp(0.35rem,1vw,0.8rem)] text-center">
        <p className="text-[clamp(0.48rem,0.9vw,0.75rem)] font-extrabold leading-tight text-white drop-shadow">
          A Cozy World
        </p>
        <p className="text-[clamp(0.48rem,0.9vw,0.75rem)] font-extrabold leading-tight text-white drop-shadow">
          Built Together.
        </p>

        <span className="mt-[clamp(0.25rem,0.7vw,0.5rem)] rounded-full bg-white/90 px-[clamp(0.35rem,0.8vw,0.65rem)] py-[clamp(0.12rem,0.3vw,0.25rem)] text-[clamp(0.32rem,0.55vw,0.48rem)] font-bold text-[#346c37]">
          Explore Lifetopia
        </span>
      </div>
    </div>
  );
}

function CommunityPreview() {
  return (
    <div className="relative flex h-full bg-gradient-to-br from-[#181b24] via-[#25283a] to-[#11131a] p-[clamp(0.35rem,0.8vw,0.65rem)]">
      <div className="w-[23%] rounded-l-[clamp(0.25rem,0.5vw,0.45rem)] bg-[#11131b] p-[clamp(0.18rem,0.45vw,0.35rem)]">
        <div className="size-[clamp(0.5rem,1vw,0.9rem)] rounded-full bg-[#87bd50]" />

        <div className="mt-[clamp(0.25rem,0.6vw,0.45rem)] flex flex-col gap-[clamp(0.12rem,0.3vw,0.24rem)]">
          {[1, 2, 3, 4].map((item) => (
            <span
              key={item}
              className="h-[clamp(0.12rem,0.25vw,0.2rem)] rounded-full bg-white/12"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-[clamp(0.2rem,0.45vw,0.35rem)] bg-[#202330] p-[clamp(0.25rem,0.6vw,0.45rem)]">
        <div className="flex items-center justify-between">
          <span className="h-[clamp(0.18rem,0.35vw,0.28rem)] w-[35%] rounded-full bg-white/22" />
          <span className="size-[clamp(0.45rem,0.8vw,0.7rem)] rounded-full bg-[#9170ef]" />
        </div>

        {[1, 2].map((item) => (
          <div
            key={item}
            className="rounded-[clamp(0.2rem,0.45vw,0.4rem)] bg-white/[0.055] p-[clamp(0.2rem,0.45vw,0.35rem)]"
          >
            <div className="flex items-center gap-[clamp(0.15rem,0.35vw,0.28rem)]">
              <span className="size-[clamp(0.35rem,0.65vw,0.55rem)] rounded-full bg-[#6ca3db]" />
              <span className="h-[clamp(0.12rem,0.24vw,0.2rem)] w-[30%] rounded-full bg-white/25" />
            </div>

            <div className="mt-[clamp(0.15rem,0.35vw,0.28rem)] h-[clamp(0.6rem,1.3vw,1.1rem)] rounded-[clamp(0.15rem,0.3vw,0.25rem)] bg-gradient-to-r from-[#375063] to-[#344136]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function GamePreview() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#dff2a6] via-[#86bf62] to-[#477c3e]">
      <div className="absolute left-[8%] top-[14%] h-[28%] w-[28%] rounded-[20%] bg-[#b57d3d] shadow-[0_0.3rem_0_#714825]" />
      <div className="absolute left-[12%] top-[9%] h-[18%] w-[20%] rotate-45 bg-[#39868b]" />

      <div className="absolute bottom-[9%] left-[7%] h-[30%] w-[34%] rounded-[15%] border-[clamp(0.1rem,0.3vw,0.2rem)] border-[#80542b] bg-[#77aa4f]" />
      <div className="absolute bottom-[14%] right-[9%] h-[34%] w-[36%] rounded-[15%] border-[clamp(0.1rem,0.3vw,0.2rem)] border-[#80542b] bg-[#6ca14b]" />

      <div className="absolute inset-x-0 bottom-[2%] mx-auto flex w-[70%] justify-center gap-[clamp(0.08rem,0.2vw,0.18rem)] rounded-[clamp(0.2rem,0.5vw,0.4rem)] bg-[#d9b77e]/90 p-[clamp(0.12rem,0.3vw,0.25rem)]">
        {[1, 2, 3, 4, 5].map((item) => (
          <span
            key={item}
            className="size-[clamp(0.35rem,0.7vw,0.6rem)] rounded-[20%] bg-[#85613d]/75"
          />
        ))}
      </div>
    </div>
  );
}

function GrantPortalPreview() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#e2f5ff] via-[#c8eafa] to-[#f5edda]">
      <div className="absolute inset-x-0 top-0 h-[18%] bg-white/80" />

      <div className="absolute left-[6%] top-[26%] flex w-[47%] flex-col gap-[clamp(0.15rem,0.35vw,0.28rem)]">
        <span className="h-[clamp(0.16rem,0.35vw,0.3rem)] w-[38%] rounded-full bg-[#448343]" />
        <span className="h-[clamp(0.25rem,0.55vw,0.45rem)] w-[95%] rounded-full bg-[#253529]" />
        <span className="h-[clamp(0.25rem,0.55vw,0.45rem)] w-[76%] rounded-full bg-[#397f3c]" />
        <span className="h-[clamp(0.1rem,0.25vw,0.2rem)] w-[85%] rounded-full bg-[#6f716b]/45" />
        <span className="h-[clamp(0.1rem,0.25vw,0.2rem)] w-[64%] rounded-full bg-[#6f716b]/35" />

        <div className="mt-[clamp(0.15rem,0.35vw,0.3rem)] flex gap-[clamp(0.12rem,0.3vw,0.24rem)]">
          <span className="h-[clamp(0.28rem,0.65vw,0.5rem)] w-[38%] rounded-[clamp(0.12rem,0.3vw,0.25rem)] bg-[#28683a]" />
          <span className="h-[clamp(0.28rem,0.65vw,0.5rem)] w-[34%] rounded-[clamp(0.12rem,0.3vw,0.25rem)] bg-white/90" />
        </div>
      </div>

      <div className="absolute bottom-[5%] right-[6%] h-[68%] w-[38%] rounded-t-full bg-[#76aa5f]/35" />

      <div className="absolute bottom-[4%] right-[15%] h-[51%] w-[16%] rounded-t-full bg-[#dabd82]" />
      <div className="absolute bottom-[20%] right-[12%] h-[19%] w-[22%] rounded-full bg-[#d8ba79]" />
      <div className="absolute bottom-[4%] right-[12%] h-[29%] w-[22%] rounded-t-[35%] bg-[#365d79]" />
    </div>
  );
}

function ProductVisual({ product }: { product: ProductPreview }) {
  if (product.accent === "purple") {
    return <CommunityPreview />;
  }

  if (product.accent === "orange") {
    return <GamePreview />;
  }

  if (product.accent === "blue") {
    return <GrantPortalPreview />;
  }

  return <MainWebsitePreview />;
}

export function ProjectSnapshot() {
  return (
    <section
      id="products"
      className="relative z-20 mt-[clamp(-0.35rem,-0.8vw,-0.7rem)] px-[clamp(0.6rem,2vw,1.3rem)] pb-[clamp(2.8rem,6vw,5rem)]"
    >
      <div className="grants-container">
        <div className="grants-panel relative overflow-hidden p-[clamp(0.85rem,2.4vw,2rem)]">
          <div className="pointer-events-none absolute -right-[8%] -top-[30%] size-[clamp(9rem,22vw,18rem)] rounded-full bg-[#dff2bc]/45 blur-[clamp(2rem,5vw,4rem)]" />

          <div className="relative flex items-end justify-between gap-[clamp(0.75rem,2vw,1.5rem)]">
            <div>
              <span className="grants-eyebrow">
                <span aria-hidden="true">🌿</span>
                Lifetopia Ecosystem
              </span>

              <h2 className="mt-[clamp(0.65rem,1.4vw,1rem)] text-[clamp(1.25rem,3.1vw,2.5rem)] font-extrabold leading-[1] tracking-[-0.04em] text-[#172016]">
                Live Products &amp; Ecosystem
              </h2>

              <p className="mt-[clamp(0.35rem,0.8vw,0.6rem)] text-[clamp(0.62rem,0.95vw,0.86rem)] font-medium text-[#6b6253]">
                Real products. Real users. Real impact.
              </p>
            </div>

            <Link
              href="#development"
              className="shrink-0 text-[clamp(0.58rem,0.9vw,0.8rem)] font-extrabold text-[#315f31] transition hover:translate-x-1"
            >
              View development →
            </Link>
          </div>

          <div className="relative mt-[clamp(0.9rem,2vw,1.5rem)] grid grid-cols-4 gap-[clamp(0.3rem,1vw,0.85rem)]">
            {products.map((product) => {
              const accent = getAccentClasses(product.accent);

              return (
                <Link
                  key={product.href}
                  href={product.href}
                  target={product.current ? undefined : "_blank"}
                  rel={product.current ? undefined : "noreferrer"}
                  className={[
                    "group min-w-0 overflow-hidden rounded-[clamp(0.55rem,1.4vw,1.1rem)] border bg-[#fffdf7] shadow-[0_0.3rem_1.4rem_rgba(57,44,24,0.08)] transition duration-200 hover:-translate-y-[clamp(0.08rem,0.25vw,0.2rem)] hover:shadow-[0_0.8rem_2rem_rgba(57,44,24,0.13)]",
                    product.current
                      ? "border-[#65a9df] ring-1 ring-[#65a9df]/30"
                      : "border-[#755f3d]/12",
                  ].join(" ")}
                >
                  <div className="relative h-[clamp(4.4rem,12vw,9.5rem)] overflow-hidden border-b border-[#5a4b35]/10">
                    <div
                      className={`pointer-events-none absolute -right-[14%] -top-[32%] size-[65%] rounded-full blur-[clamp(1rem,3vw,2.5rem)] ${accent.glow}`}
                    />

                    <ProductVisual product={product} />

                    <div className="absolute inset-x-0 top-0 flex h-[clamp(0.7rem,1.5vw,1.15rem)] items-center gap-[clamp(0.08rem,0.25vw,0.18rem)] bg-white/75 px-[clamp(0.18rem,0.45vw,0.35rem)] backdrop-blur">
                      <span className="size-[clamp(0.12rem,0.28vw,0.22rem)] rounded-full bg-[#ff7474]" />
                      <span className="size-[clamp(0.12rem,0.28vw,0.22rem)] rounded-full bg-[#f3c85c]" />
                      <span className="size-[clamp(0.12rem,0.28vw,0.22rem)] rounded-full bg-[#78bd65]" />

                      <span className="ml-auto h-[clamp(0.12rem,0.25vw,0.2rem)] w-[34%] rounded-full bg-[#4c5a4b]/14" />
                    </div>
                  </div>

                  <div className="p-[clamp(0.45rem,1.25vw,1rem)]">
                    <div className="flex min-w-0 items-start justify-between gap-[clamp(0.25rem,0.6vw,0.5rem)]">
                      <div className="flex min-w-0 items-center gap-[clamp(0.28rem,0.65vw,0.5rem)]">
                        <span
                          className={`flex size-[clamp(1rem,2vw,1.55rem)] shrink-0 items-center justify-center rounded-[clamp(0.3rem,0.6vw,0.48rem)] text-[clamp(0.46rem,0.8vw,0.68rem)] font-black ${accent.icon}`}
                        >
                          {product.accent === "green"
                            ? "◎"
                            : product.accent === "purple"
                              ? "♟"
                              : product.accent === "orange"
                                ? "∞"
                                : "◆"}
                        </span>

                        <div className="min-w-0">
                          <h3 className="truncate text-[clamp(0.52rem,1.05vw,0.88rem)] font-extrabold leading-tight text-[#20281f]">
                            {product.label}
                          </h3>

                          <span className="mt-[clamp(0.1rem,0.25vw,0.2rem)] block truncate text-[clamp(0.38rem,0.65vw,0.56rem)] font-medium text-[#8a7f6c]">
                            {product.domain}
                          </span>
                        </div>
                      </div>

                      <span className="shrink-0 text-[clamp(0.55rem,0.85vw,0.75rem)] font-bold text-[#39743a] transition group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </div>

                    <div
                      className={`mt-[clamp(0.35rem,0.8vw,0.6rem)] h-[clamp(0.1rem,0.22vw,0.16rem)] w-[clamp(1rem,2vw,1.5rem)] rounded-full ${accent.line}`}
                    />

                    <p className="mt-[clamp(0.35rem,0.8vw,0.6rem)] line-clamp-3 text-[clamp(0.42rem,0.78vw,0.67rem)] font-medium leading-[1.5] text-[#6b6253]">
                      {product.description}
                    </p>

                    <span
                      className={[
                        "mt-[clamp(0.4rem,0.9vw,0.7rem)] inline-flex rounded-full px-[clamp(0.32rem,0.65vw,0.5rem)] py-[clamp(0.12rem,0.3vw,0.22rem)] text-[clamp(0.34rem,0.58vw,0.5rem)] font-extrabold",
                        product.current
                          ? "bg-[#e1f1ff] text-[#3479c9]"
                          : "bg-[#e8f4d8] text-[#3f843a]",
                      ].join(" ")}
                    >
                      {product.status}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="relative mt-[clamp(0.8rem,1.7vw,1.25rem)] flex items-center justify-between rounded-[clamp(0.55rem,1.1vw,0.9rem)] border border-[#5f724d]/12 bg-[#f4efe3]/80 px-[clamp(0.6rem,1.5vw,1.1rem)] py-[clamp(0.45rem,1vw,0.75rem)]">
            <div className="flex items-center gap-[clamp(0.35rem,0.8vw,0.6rem)]">
              <span className="flex size-[clamp(1rem,1.8vw,1.4rem)] items-center justify-center rounded-full bg-[#367d40] text-[clamp(0.45rem,0.75vw,0.65rem)] font-black text-white">
                ✓
              </span>

              <div>
                <p className="text-[clamp(0.5rem,0.85vw,0.75rem)] font-extrabold text-[#263526]">
                  Connected Lifetopia ecosystem
                </p>
                <p className="text-[clamp(0.38rem,0.65vw,0.56rem)] font-medium text-[#817662]">
                  One identity foundation across website, community, game, and
                  future services.
                </p>
              </div>
            </div>

            <span className="rounded-full bg-[#174d29] px-[clamp(0.45rem,0.9vw,0.7rem)] py-[clamp(0.18rem,0.4vw,0.3rem)] text-[clamp(0.38rem,0.65vw,0.55rem)] font-extrabold text-white">
              Actively Building
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}