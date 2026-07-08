import { posts } from "@/data/posts";
import { CreatePost } from "./CreatePost";
import { PostCard } from "./PostCard";

export function Feed() {
  return (
    <>
      <CreatePost />

      <div className="mt-4 space-y-4 pb-24 md:pb-0">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </>
  );
}