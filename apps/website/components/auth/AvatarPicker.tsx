import type { PlayerAvatar } from "@repo/types/auth";
import Image from "next/image";

type AvatarPickerProps = {
  avatars: PlayerAvatar[];
  selectedAvatarId: string;
  onSelectAvatar: (avatarId: string) => void;
};

export function AvatarPicker({
  avatars,
  selectedAvatarId,
  onSelectAvatar,
}: AvatarPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-[clamp(0.45rem,1.4vw,1rem)]">
      {avatars.map((avatar) => {
        const isSelected =
          selectedAvatarId === avatar.id;

        return (
          <button
            key={avatar.id}
            type="button"
            onClick={() =>
              onSelectAvatar(avatar.id)
            }
            aria-label={`Select ${avatar.name} avatar`}
            aria-pressed={isSelected}
            className={`group rounded-[clamp(0.8rem,2vw,1.5rem)] border p-[clamp(0.35rem,1vw,0.75rem)] transition duration-300 hover:-translate-y-1 ${
              isSelected
                ? "border-[#4f8124] bg-[#fff8e8] shadow-[0_14px_40px_rgba(79,129,36,0.22)]"
                : "border-white/80 bg-white/75 shadow-sm hover:bg-white"
            }`}
          >
            <div className="relative aspect-square overflow-hidden rounded-[clamp(0.65rem,1.6vw,1.15rem)] bg-[#fff7e8]">
              <Image
                src={avatar.image}
                alt={avatar.name}
                fill
                sizes="(max-width: 640px) 20vw, 8rem"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}