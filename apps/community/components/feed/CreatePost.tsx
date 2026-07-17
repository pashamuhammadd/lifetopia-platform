import { getCurrentProfile } from "@/data/profile/current-profile";

import { CreatePostForm } from "./CreatePostForm";

export async function CreatePost() {
  const profile = await getCurrentProfile();

  return (
    <CreatePostForm
      displayName={profile?.displayName ?? "Guest"}
      avatarSrc={profile?.avatarSrc}
      isAuthenticated={Boolean(profile)}
    />
  );
}
