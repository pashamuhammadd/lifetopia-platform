import type {
  LifetopiaRole,
  LifetopiaTitle,
  PostCategory,
} from "@/types/post";
import type { CommunityComment } from "@/data/community/comments";

export type CommunityPost = {
  id: string;
  content: string;
  category: PostCategory;
  createdAt: string;
  createdAtIso: string;
  isOwner: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatarSrc: string;
    role: LifetopiaRole;
    title?: LifetopiaTitle;
  };
  likes: number;
  comments: number;
  commentItems: CommunityComment[];
};

export type CommunityFeedResult = {
  posts: CommunityPost[];
  page: number;
  totalPages: number;
  totalPosts: number;
  activeTag: string | null;
  error: string | null;
};
