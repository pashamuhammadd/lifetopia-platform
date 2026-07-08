import Image from "next/image";

type AvatarProps = {
  initials: string;
  src?: string;
  alt?: string;
  size?: number;
};

export function Avatar({ initials, src, alt = "Avatar", size = 48 }: AvatarProps) {
  if (src) {
    return (
      <Image
  src={src}
  alt={alt}
  width={size}
  height={size}
  className="shrink-0 rounded-full object-cover ring-2 ring-white/80"
  style={{
    width: size,
    height: size,
  }}
/>
    );
  }

  return (
    <div
      className="grid shrink-0 rounded-full bg-gradient-to-br from-[#8bc34a] to-[#4f8124] font-black text-white ring-2 ring-white/80"
      style={{
        width: size,
        height: size,
        fontSize: size / 2.4,
        placeItems: "center",
      }}
    >
      {initials}
    </div>
  );
}