import { TechnologyIcon } from "@/components/TechnologyIcon";

const pipelineSteps = [
  {
    name: "GitHub",
    description: "Source code pushed",
    icon: "mdi:github",
    status: "Connected",
  },
  {
    name: "GitHub Actions",
    description: "Build and deployment triggered",
    icon: "simple-icons:githubactions",
    status: "Automated",
  },
  {
    name: "Supabase",
    description: "Development data synchronized",
    icon: "simple-icons:supabase",
    status: "Synced",
  },
  {
    name: "Grants Portal",
    description: "Progress published publicly",
    icon: "mdi:web",
    status: "Live",
  },
];

const executionStatus = [
  {
    label: "Repository",
    value: "Connected",
  },
  {
    label: "Auto Deployment",
    value: "Enabled",
  },
  {
    label: "Development Log",
    value: "Synced",
  },
];

export function ExecutionPipeline() {
  return (
    <section className="overflow-hidden rounded-[clamp(0.65rem,1.2vw,0.95rem)] border border-white/10 bg-[#141b16]">
      <div className="flex items-center justify-between gap-[clamp(0.4rem,0.9vw,0.7rem)] border-b border-white/[0.07] px-[clamp(0.65rem,1.25vw,0.95rem)] py-[clamp(0.5rem,0.9vw,0.7rem)]">
        <div className="min-w-0">
          <p className="font-mono text-[clamp(0.34rem,0.58vw,0.5rem)] font-black uppercase tracking-[0.08em] text-[#8fa095]">
            Execution Pipeline
          </p>

          <p className="mt-[clamp(0.12rem,0.28vw,0.2rem)] truncate font-mono text-[clamp(0.3rem,0.52vw,0.44rem)] text-white/45">
            From source code to public delivery
          </p>
        </div>

        <span className="flex shrink-0 items-center gap-[clamp(0.2rem,0.42vw,0.34rem)] rounded-full bg-[#60c443]/14 px-[clamp(0.38rem,0.72vw,0.56rem)] py-[clamp(0.12rem,0.26vw,0.2rem)] font-mono text-[clamp(0.3rem,0.52vw,0.44rem)] font-black text-[#7fdf60]">
          <span className="size-[clamp(0.24rem,0.42vw,0.34rem)] animate-pulse rounded-full bg-[#71da50]" />
          LIVE
        </span>
      </div>

      <div className="p-[clamp(0.65rem,1.25vw,0.95rem)]">
        <div className="relative">
          <div className="absolute bottom-[clamp(1.2rem,2.2vw,1.7rem)] left-[clamp(1.03rem,1.8vw,1.35rem)] top-[clamp(1.2rem,2.2vw,1.7rem)] w-px bg-gradient-to-b from-[#79d75c]/70 via-[#79d75c]/35 to-[#79d75c]/10" />

          <div className="relative flex flex-col gap-[clamp(0.42rem,0.9vw,0.68rem)]">
            {pipelineSteps.map((step, index) => (
              <div
                key={step.name}
                className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[clamp(0.48rem,0.95vw,0.72rem)] rounded-[clamp(0.5rem,0.9vw,0.72rem)] border border-white/[0.07] bg-white/[0.03] px-[clamp(0.52rem,1vw,0.76rem)] py-[clamp(0.48rem,0.92vw,0.7rem)] transition duration-300 hover:-translate-y-[0.06rem] hover:border-[#79d75c]/20 hover:bg-white/[0.045]"
              >
                <div className="relative z-10 flex size-[clamp(2rem,3.5vw,2.7rem)] items-center justify-center rounded-[clamp(0.5rem,0.9vw,0.7rem)] border border-[#7bd960]/18 bg-[#68c94a]/10 shadow-[0_0_1.2rem_rgba(104,201,74,0.06)]">
                  <TechnologyIcon icon={step.icon} label={step.name} />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-[clamp(0.24rem,0.5vw,0.38rem)]">
                    <h3 className="truncate font-mono text-[clamp(0.42rem,0.74vw,0.62rem)] font-black text-white">
                      {step.name}
                    </h3>

                    <span className="rounded-full bg-[#69c94a]/10 px-[clamp(0.28rem,0.52vw,0.42rem)] py-[clamp(0.07rem,0.18vw,0.13rem)] font-mono text-[clamp(0.26rem,0.46vw,0.4rem)] font-bold text-[#84dc69]">
                      {step.status}
                    </span>
                  </div>

                  <p className="mt-[clamp(0.1rem,0.24vw,0.18rem)] truncate font-mono text-[clamp(0.3rem,0.52vw,0.44rem)] text-white/45">
                    {step.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-[clamp(0.2rem,0.42vw,0.34rem)]">
                  <span className="font-mono text-[clamp(0.26rem,0.46vw,0.4rem)] text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex size-[clamp(0.7rem,1.2vw,0.95rem)] items-center justify-center rounded-full border border-[#79d75c]/20 bg-[#79d75c]/10">
                    <span className="size-[clamp(0.22rem,0.38vw,0.3rem)] rounded-full bg-[#79d75c]" />
                  </span>
                </div>

                {index < pipelineSteps.length - 1 ? (
                  <span className="absolute bottom-[-0.56rem] left-[clamp(0.86rem,1.58vw,1.18rem)] z-20 flex size-[clamp(0.34rem,0.6vw,0.48rem)] items-center justify-center rounded-full bg-[#141b16] font-mono text-[clamp(0.3rem,0.5vw,0.42rem)] text-[#75ce5b]">
                    ↓
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(0.65rem,1.15vw,0.88rem)] rounded-[clamp(0.5rem,0.9vw,0.72rem)] border border-white/[0.07] bg-[#101612] p-[clamp(0.5rem,0.95vw,0.72rem)]">
          <div className="flex items-center justify-between gap-[clamp(0.35rem,0.75vw,0.58rem)]">
            <p className="font-mono text-[clamp(0.32rem,0.54vw,0.46rem)] font-black uppercase tracking-[0.07em] text-[#8fa095]">
              Execution Status
            </p>

            <span className="flex items-center gap-[clamp(0.16rem,0.34vw,0.26rem)] font-mono text-[clamp(0.28rem,0.5vw,0.42rem)] font-bold text-[#72d654]">
              <span className="size-[clamp(0.2rem,0.36vw,0.3rem)] animate-pulse rounded-full bg-[#70d651]" />
              Operational
            </span>
          </div>

          <div className="mt-[clamp(0.38rem,0.75vw,0.58rem)] grid gap-[clamp(0.28rem,0.58vw,0.44rem)] sm:grid-cols-3">
            {executionStatus.map((item) => (
              <div
                key={item.label}
                className="min-w-0 rounded-[clamp(0.4rem,0.72vw,0.56rem)] border border-white/[0.05] bg-white/[0.03] px-[clamp(0.42rem,0.8vw,0.62rem)] py-[clamp(0.36rem,0.68vw,0.52rem)]"
              >
                <p className="truncate font-mono text-[clamp(0.26rem,0.46vw,0.4rem)] uppercase tracking-[0.05em] text-white/35">
                  {item.label}
                </p>

                <p className="mt-[clamp(0.1rem,0.22vw,0.16rem)] flex items-center gap-[clamp(0.16rem,0.34vw,0.26rem)] truncate font-mono text-[clamp(0.3rem,0.52vw,0.44rem)] font-bold text-[#86dc6b]">
                  <span className="size-[clamp(0.2rem,0.36vw,0.3rem)] shrink-0 rounded-full bg-[#70d651]" />
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
