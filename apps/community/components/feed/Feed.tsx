import { getCommunityPosts } from "@/data/community/posts";

import { CreatePost } from "./CreatePost";
import { PostCard } from "./PostCard";

export async function Feed() {
  const posts = await getCommunityPosts();

  return (
    <>
      <CreatePost />

      <div className="mt-4 space-y-4 pb-24 md:pb-0">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}