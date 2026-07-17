import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

type FeedPaginationProps = {
  page: number;
  totalPages: number;
};

function getVisiblePages(
  page: number,
  totalPages: number,
) {
  const pages = new Set([
    1,
    totalPages,
    page - 1,
    page,
    page + 1,
  ]);

  return [...pages]
    .filter(
      (item) =>
        item >= 1 && item <= totalPages,
    )
    .sort((a, b) => a - b);
}

export function FeedPagination({
  page,
  totalPages,
}: FeedPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(
    page,
    totalPages,
  );

  return (
    <nav
      aria-label="Community feed pages"
      className="mt-5 flex flex-wrap items-center justify-center gap-2 pb-24 md:pb-2"
    >
      <Link
        href={`/?page=${Math.max(
          1,
          page - 1,
        )}`}
        aria-disabled={page === 1}
        className={`inline-flex min-h-10 items-center gap-1 rounded-full border border-[#e2d2b4] bg-white px-3 text-sm font-black text-[#6f5b43] transition hover:border-[#9ec879] hover:text-[#4f8124] ${
          page === 1
            ? "pointer-events-none opacity-45"
            : ""
        }`}
      >
        <ChevronLeft size={16} />
        Previous
      </Link>

      {visiblePages.map(
        (item, index) => {
          const previous =
            visiblePages[index - 1];
          const shouldShowGap =
            previous &&
            item - previous > 1;

          return (
            <span
              key={item}
              className="contents"
            >
              {shouldShowGap ? (
                <span className="px-1 text-[#9b866d]">
                  …
                </span>
              ) : null}

              <Link
                href={`/?page=${item}`}
                aria-current={
                  item === page
                    ? "page"
                    : undefined
                }
                className={`grid size-10 place-items-center rounded-full border text-sm font-black transition ${
                  item === page
                    ? "border-[#6fa83a] bg-[#6fa83a] text-white"
                    : "border-[#e2d2b4] bg-white text-[#6f5b43] hover:border-[#9ec879] hover:text-[#4f8124]"
                }`}
              >
                {item}
              </Link>
            </span>
          );
        },
      )}

      <Link
        href={`/?page=${Math.min(
          totalPages,
          page + 1,
        )}`}
        aria-disabled={
          page === totalPages
        }
        className={`inline-flex min-h-10 items-center gap-1 rounded-full border border-[#e2d2b4] bg-white px-3 text-sm font-black text-[#6f5b43] transition hover:border-[#9ec879] hover:text-[#4f8124] ${
          page === totalPages
            ? "pointer-events-none opacity-45"
            : ""
        }`}
      >
        Next
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
