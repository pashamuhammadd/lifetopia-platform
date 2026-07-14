import {
  getAllDocumentSlugs,
  getDocumentBySlug,
} from "@repo/docs-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocumentContent } from "../../components/docs";

type DocumentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const docsSiteUrl =
  "https://docs.lifetopiaworld.io";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDocumentSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: DocumentPageProps): Promise<Metadata> {
  const { slug } = await params;

  const document = getDocumentBySlug(
    slug,
    "en",
  );

  if (!document) {
    return {
      title: "Document Not Found",

      description:
        "The requested Lifetopia documentation page could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: document.title,
    description: document.description,

    alternates: {
      canonical: `/${document.slug}`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "article",
      url: `/${document.slug}`,

      title: document.title,
      description: document.description,

      siteName: "Lifetopia Docs",
      locale: "en_US",

      modifiedTime: new Date(
        `${document.updatedAt}T00:00:00Z`,
      ).toISOString(),

      authors: [document.owner],
    },

    twitter: {
      card: "summary_large_image",
      title: document.title,
      description: document.description,
    },

    other: {
      "document:status": document.status,
      "document:version": document.version,
      "document:owner": document.owner,
    },
  };
}

export default async function DocumentPage({
  params,
}: DocumentPageProps) {
  const { slug } = await params;

  const document = getDocumentBySlug(
    slug,
    "en",
  );

  if (!document) {
    notFound();
  }

  const documentUrl =
    `${docsSiteUrl}/${document.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: document.title,
    description: document.description,

    url: documentUrl,
    mainEntityOfPage: documentUrl,

    dateModified: document.updatedAt,

    inLanguage: "en",
    isAccessibleForFree: true,

    author: {
      "@type": "Person",
      name: document.owner,
    },

    publisher: {
      "@type": "Organization",
      name: "Lifetopia World",
      url: "https://lifetopiaworld.io",
    },

    about: [
      "Lifetopia World",
      "Game Development",
      "Solana",
      "Web3",
    ],

    articleSection: document.category,

    version: document.version,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <DocumentContent
        slug={document.slug}
      />
    </>
  );
}