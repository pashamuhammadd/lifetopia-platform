import { cache } from "react";

import { createClient } from "@repo/lib/supabase/server";

export type CurrentProfile = {
  id: string;
  username: string;
  displayName: string;
  avatarId: string;
  avatarSrc: string;
  role: string;
  accountType: string;
};

export const getCurrentProfile = cache(
  async (): Promise<CurrentProfile | null> => {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_id, role, account_type")
      .eq("id", user.id)
      .single();

    if (error || !profile) {
      return null;
    }

    return {
      id: profile.id,
      username: profile.username,
      displayName: profile.display_name,
      avatarId: profile.avatar_id,
      avatarSrc: `/images/avatars/${profile.avatar_id}.jpg`,
      role: profile.role,
      accountType: profile.account_type,
    };
  },
);
