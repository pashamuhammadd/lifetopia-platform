"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { accountFeatures, mockAccountUser } from "@repo/data/account";
import { createClient } from "@repo/lib/supabase/client";
import { AccountFeatureGrid } from "@/components/home/account/AccountFeatureGrid";
import { AccountPreviewCard } from "@/components/home/account/AccountPreviewCard";

type Profile = {
  id: string;
  user_id: string;
  email: string | null;
  username: string | null;
  display_name: string | null;
  avatar_id: string | null;
  country: string | null;
  gender: string | null;
};

const guestAccountUser = {
  ...mockAccountUser,
  avatar: "/images/avatars/avatar-01.jpg",
};

export function AccountSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select(
          "id, user_id, email, username, display_name, avatar_id, country, gender",
        )
        .eq("user_id", user.id)
        .single();

      if (data) setProfile(data);

      setIsLoading(false);
    };

    loadProfile();
  }, []);

  const avatarSrc = profile?.avatar_id
    ? `/images/avatars/${profile.avatar_id}.jpg`
    : "/images/avatars/avatar-01.jpg";

  return (
    <section
      id="account"
      className="relative bg-[#fff7e8] px-[clamp(14px,6vw,96px)] pb-[clamp(24px,3vw,48px)] pt-[clamp(20px,3vw,40px)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="lt-badge px-[clamp(10px,1.2vw,18px)] py-[clamp(5px,0.55vw,8px)] text-[clamp(0.58rem,0.78vw,0.85rem)]">
            Lifetopian Platform 🍃
          </span>

          <h2 className="lt-title mt-[clamp(8px,1vw,14px)] text-[clamp(1.25rem,2.6vw,3rem)] leading-tight">
            Your Lifetopia Account
          </h2>

          <p className="mx-auto mt-[clamp(4px,0.7vw,10px)] max-w-2xl text-[clamp(0.58rem,0.9vw,0.95rem)] font-semibold leading-[1.5] text-[#7a5635]">
            Access your profile, inventory, quests, achievements, wallet, and
            rewards from one cozy platform.
          </p>
        </div>

        <div className="mt-[clamp(14px,1.8vw,24px)] grid grid-cols-[1.1fr_1fr] gap-[clamp(10px,1.5vw,24px)] max-lg:grid-cols-1">
          {!profile ? (
            <div className="space-y-[clamp(10px,1.2vw,16px)]">
              <AccountPreviewCard user={guestAccountUser} />

              {!isLoading && (
                <div className="rounded-[clamp(16px,1.6vw,24px)] border border-white/80 bg-white/65 p-[clamp(10px,1.4vw,18px)] shadow-[0_14px_34px_rgba(88,60,28,0.1)]">
                  <h3 className="text-[clamp(0.8rem,1.25vw,1.2rem)] font-black text-[#2f1b12]">
                    Ready to Begin Your Journey?
                  </h3>

                  <p className="mt-1.5 text-[clamp(0.5rem,0.78vw,0.82rem)] font-semibold leading-[1.55] text-[#7a5635]">
                    Create your account, log in, or prepare your wallet to make
                    your Lifetopia identity real.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href="/register"
                      className="lt-button-primary px-[clamp(12px,1.4vw,22px)] py-[clamp(7px,0.75vw,11px)] text-[clamp(0.52rem,0.78vw,0.86rem)]"
                    >
                      Create Account
                    </Link>

                    <Link
                      href="/login"
                      className="lt-button-secondary px-[clamp(12px,1.4vw,22px)] py-[clamp(7px,0.75vw,11px)] text-[clamp(0.52rem,0.78vw,0.86rem)]"
                    >
                      Login
                    </Link>

                    <button
                      type="button"
                      disabled
                      className="cursor-not-allowed rounded-full border border-[#d9c99f] bg-white/60 px-[clamp(12px,1.4vw,22px)] py-[clamp(7px,0.75vw,11px)] text-[clamp(0.52rem,0.78vw,0.86rem)] font-black text-[#7a5635]/60"
                    >
                      Wallet Soon
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-[clamp(10px,1.2vw,16px)]">
              <div className="relative overflow-hidden rounded-[clamp(18px,2vw,30px)] border border-white/80 bg-gradient-to-br from-[#f5fbdf] via-white to-[#fff3df] p-[clamp(10px,1.5vw,22px)] shadow-[0_18px_48px_rgba(88,60,28,0.14)]">
                <div className="absolute right-0 top-0 h-[clamp(70px,10vw,150px)] w-[clamp(70px,10vw,150px)] rounded-bl-full bg-[#8cc84b]/18 blur-2xl" />

                <div className="relative z-10 flex items-center gap-[clamp(10px,1.3vw,18px)]">
                  <Image
                    src={avatarSrc}
                    alt={profile.display_name || "Lifetopian Avatar"}
                    width={96}
                    height={96}
                    className="h-[clamp(46px,6vw,90px)] w-[clamp(46px,6vw,90px)] rounded-full border border-white/80 bg-white object-contain p-[clamp(5px,0.7vw,10px)] shadow-[0_12px_28px_rgba(88,60,28,0.14)]"
                  />

                  <div>
                    <div className="text-[clamp(0.45rem,0.75vw,0.85rem)] font-black text-[#6fa83a]">
                      Welcome Back
                    </div>

                    <h3 className="mt-[clamp(2px,0.35vw,5px)] text-[clamp(0.9rem,2vw,2rem)] font-black leading-tight text-[#2f1b12]">
                      Good Day, {profile.display_name || "Lifetopian"}!
                    </h3>

                    <p className="mt-[clamp(2px,0.45vw,6px)] text-[clamp(0.48rem,0.82vw,0.9rem)] font-bold text-[#7a5635]">
                      @{profile.username || "lifetopian"}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-[clamp(10px,1.5vw,18px)] grid grid-cols-2 gap-[clamp(7px,0.9vw,12px)]">
                  <div className="rounded-[clamp(12px,1.2vw,18px)] border border-white/80 bg-white/65 p-[clamp(7px,0.9vw,13px)]">
                    <p className="text-[clamp(0.4rem,0.7vw,0.75rem)] font-black text-[#7a5635]">
                      Country
                    </p>
                    <p className="mt-1 text-[clamp(0.56rem,0.95vw,0.9rem)] font-black text-[#2f1b12]">
                      {profile.country || "Not set"}
                    </p>
                  </div>

                  <div className="rounded-[clamp(12px,1.2vw,18px)] border border-white/80 bg-white/65 p-[clamp(7px,0.9vw,13px)]">
                    <p className="text-[clamp(0.4rem,0.7vw,0.75rem)] font-black text-[#7a5635]">
                      Gender
                    </p>
                    <p className="mt-1 text-[clamp(0.56rem,0.95vw,0.9rem)] font-black text-[#2f1b12]">
                      {profile.gender || "Not set"}
                    </p>
                  </div>

                  <div className="col-span-2 rounded-[clamp(12px,1.2vw,18px)] border border-white/80 bg-white/65 p-[clamp(7px,0.9vw,13px)]">
                    <p className="text-[clamp(0.4rem,0.7vw,0.75rem)] font-black text-[#7a5635]">
                      Email
                    </p>
                    <p className="mt-1 truncate text-[clamp(0.56rem,0.95vw,0.9rem)] font-black text-[#2f1b12]">
                      {profile.email || "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/dashboard"
                className="lt-button-primary inline-flex w-fit px-[clamp(14px,1.6vw,24px)] py-[clamp(8px,0.85vw,12px)] text-[clamp(0.56rem,0.82vw,0.9rem)]"
              >
                Go to Dashboard
              </Link>
            </div>
          )}

          <AccountFeatureGrid features={accountFeatures} />
        </div>
      </div>
    </section>
  );
}