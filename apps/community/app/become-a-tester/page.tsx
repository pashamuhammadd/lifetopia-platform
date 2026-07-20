import type { Metadata } from "next";

import { PlayTesterRegistrationForm } from "@/components/play-testing/PlayTesterRegistrationForm";

export const metadata: Metadata = {
  title: "Become a CommunityHub Tester",
  description:
    "Register to join the CommunityHub closed test on Google Play.",
  alternates: {
    canonical: "https://community.lifetopiaworld.io/become-a-tester",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BecomeATesterPage() {
  return (
    <main className="min-h-dvh bg-[#fff7e8] px-4 py-8 text-[#352219] sm:px-6 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[30px] border border-[#e5cda2] bg-[#f4f9e9] p-7 shadow-[0_24px_80px_rgba(89,57,27,0.10)] sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#4f8124]">
            CommunityHub for Android
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Help shape the CommunityHub app.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#765739]">
            Join our Google Play closed test, explore CommunityHub on your Android
            device, and help us make the Lifetopia World community experience
            better before its public release.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              ["1", "Register", "Use the email connected to Google Play."],
              ["2", "Get access", "We add approved testers to the closed test."],
              ["3", "Test", "Join, install, and share useful feedback."],
            ].map(([number, title, description]) => (
              <div
                className="rounded-2xl border border-[#d6e6bb] bg-white/80 p-5"
                key={number}
              >
                <span className="grid size-9 place-items-center rounded-full bg-[#4f8124] font-black text-white">
                  {number}
                </span>
                <h2 className="mt-4 text-lg font-black">{title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#765739]">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#efc76b] bg-[#fff8dc] p-5 text-sm font-semibold leading-6 text-[#674b33]">
            Registration does not grant instant access. After your email is added,
            you must accept the Google Play testing invitation and remain enrolled
            during the testing period.
          </div>
        </section>

        <section className="rounded-[30px] border border-[#e5cda2] bg-[#fffdf9] p-7 shadow-[0_24px_80px_rgba(89,57,27,0.10)] sm:p-10">
          <h2 className="text-3xl font-black">Join the tester list</h2>
          <p className="mt-3 font-semibold leading-7 text-[#765739]">
            Enter the Google Account email currently used by Google Play on your
            Android device.
          </p>
          <PlayTesterRegistrationForm startedAt={Date.now()} />
        </section>
      </div>
    </main>
  );
}
