import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/feed/PostCard";
import { AppLayout } from "@/components/layout/AppLayout";
import { QuestPostViewTracker } from "@/components/quest/QuestPostViewTracker";
import { getCommunityPostById } from "@/data/community/posts";
type CommunityPostPageProps = { params: Promise<{ postId: string }> };
function createPostDescription(content: string) {
  const normalized = content.replace(/\s+/g, " ").trim();
  return normalized.length <= 155 ? normalized : `${normalized.slice(0, 152)}...`;
}
export async function generateMetadata({ params }: CommunityPostPageProps): Promise<Metadata> {
  const { postId } = await params;
  const post = await getCommunityPostById(postId);
  if (!post) return { title: "Post Not Found", robots: { index: false, follow: false } };
  const title = `${post.author.displayName} on Lifetopia Community`;
  const description = createPostDescription(post.content);
  const canonical = `/post/${post.id}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      publishedTime: post.createdAtIso,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
export default async function CommunityPostPage({ params }: CommunityPostPageProps) {
  const { postId } = await params;
  const post = await getCommunityPostById(postId);
  if (!post) notFound();
  return (
    <AppLayout>
      <QuestPostViewTracker postId={post.id} />
      <div className="mx-auto max-w-3xl pb-24 md:pb-4">
        <div className="mb-4">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-[#7f9b66]">
            Shared Community Post
          </p>
          <h1 className="mt-1 text-2xl font-black text-[#2f2418]">Lifetopia Conversation</h1>
        </div>
        <PostCard post={post} />
      </div>
    </AppLayout>
  );
}
