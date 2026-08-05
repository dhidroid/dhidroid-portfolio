import React from "react";
import { Link } from "react-router";
import { User, ArrowRight } from "lucide-react";
import { PortableText } from "@portabletext/react";

interface Author {
  _id?: string;
  name?: string;
  image?: { asset?: { url?: string } };
  slug?: { current?: string };
  bio?: any;
}

interface BlogAuthorBylineProps {
  author?: Author | null;
}

export const BlogAuthorByline: React.FC<BlogAuthorBylineProps> = ({ author }) => {
  const authorName = author?.name || "Dhinesh Kumar";
  const authorImageUrl = author?.image?.asset?.url;
  const authorBio = author?.bio;

  return (
    <div className="my-14 p-6 md:p-8 border border-border bg-slate-50/50 dark:bg-zinc-900/30 rounded-sm relative overflow-hidden">
      {/* Editorial top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#5235F6]" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Author Image / Avatar */}
        <div className="relative shrink-0">
          {authorImageUrl ? (
            <img
              src={authorImageUrl}
              alt={authorName}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-border shadow-md"
            />
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#5235F6]/10 border-2 border-border flex items-center justify-center text-[#5235F6]">
              <User className="w-10 h-10 opacity-70" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 bg-[#5235F6] text-white p-1 rounded-full text-[9px] font-mono px-1.5 border border-white dark:border-zinc-900">
            VERIFIED
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#5235F6]">
            <span>AUTHOR SPOTLIGHT</span>
            <span>•</span>
            <span className="text-slate-400 dark:text-zinc-500">EDITORIAL BOARD</span>
          </div>

          <h4 className="text-xl md:text-2xl font-bold font-display text-foreground tracking-tight">
            {authorName}
          </h4>

          {authorBio ? (
            <div className="text-sm text-slate-600 dark:text-zinc-400 font-body leading-relaxed max-w-2xl">
              {Array.isArray(authorBio) ? (
                <PortableText value={authorBio} />
              ) : typeof authorBio === 'string' ? (
                <p>{authorBio}</p>
              ) : (
                <p>Software Engineer & Mobile Specialist crafting high-performance applications and cloud ecosystem tools.</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-600 dark:text-zinc-400 font-body leading-relaxed max-w-2xl">
              Software Engineer & Mobile Specialist based in Chennai. Writing about React Native, Go, Cloud Ecosystems, and building scalable modern software applications.
            </p>
          )}

          <div className="pt-2 flex items-center gap-4">
            <Link
              to="/blog/authors"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#5235F6] hover:underline"
            >
              <span>Meet All Blog Authors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAuthorByline;
