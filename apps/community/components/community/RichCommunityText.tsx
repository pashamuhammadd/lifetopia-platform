import Link from "next/link";
import type { ReactNode } from "react";

type RichCommunityTextProps = {
  content: string;
  className?: string;
};

const COMMUNITY_TOKEN_PATTERN = /([@#][A-Za-z0-9_]{1,40})/g;

function renderToken(token: string, index: number): ReactNode {
  if (token.startsWith("@")) {
    const username = token.slice(1);

    return (
      <Link
        key={`${token}-${index}`}
        href={`/user/${username}`}
        className="font-black text-[#4f8124] underline-offset-2 hover:underline"
      >
        {token}
      </Link>
    );
  }

  if (token.startsWith("#")) {
    const tag = token.slice(1);

    return (
      <Link
        key={`${token}-${index}`}
        href={`/?tag=${encodeURIComponent(tag)}`}
        className="font-black text-[#347ba5] underline-offset-2 hover:underline"
      >
        {token}
      </Link>
    );
  }

  return token;
}

export function RichCommunityText({
  content,
  className = "",
}: RichCommunityTextProps) {
  const parts = content.split(COMMUNITY_TOKEN_PATTERN);

  return (
    <span className={className}>
      {parts.map((part, index) => renderToken(part, index))}
    </span>
  );
}
