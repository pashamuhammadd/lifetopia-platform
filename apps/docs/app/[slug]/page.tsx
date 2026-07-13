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
    };
  }

  return {
    title: document.title,
    description: document.description,
    alternates: {
      canonical: `/${document.slug}`,
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

  return (
    <DocumentContent slug={document.slug} />
  );
}