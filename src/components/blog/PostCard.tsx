import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-1 w-full bg-gradient-to-r from-eotechne-green to-eotechne-blue opacity-0 transition group-hover:opacity-100" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="inline-block w-fit rounded-full bg-eotechne-green/10 px-3 py-1 text-xs font-semibold text-eotechne-blue-dark">
          {post.category}
        </span>
        <h2 className="mt-4 text-lg font-bold text-eotechne-blue-dark transition group-hover:text-eotechne-green sm:text-xl">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
          {post.description}
        </p>
        <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 font-semibold text-eotechne-green transition group-hover:gap-2"
          >
            Leer
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
