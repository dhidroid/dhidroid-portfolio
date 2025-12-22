import React from "react";
import { Badge } from "../../ui/Badge";
import { ArrowRight, Clock, Calendar } from "lucide-react";

interface HomeBlogCardProps {
    BlogImage?: string;
    BlogTitle: string;
    categories: string[];
    excerpt: string;
    readingTime?: number;
    author: string;
    date: Date;
    onPress: () => void;
}

const HomeBlogCard: React.FC<HomeBlogCardProps> = ({
    BlogImage,
    BlogTitle,
    categories,
    excerpt,
    readingTime,
    author,
    date,
    onPress,
}) => {
    return (
      <div
          className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer"
          onClick={onPress}
      >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-gray-100">
              {BlogImage ? (
                  <img
                      src={BlogImage}
                      alt={BlogTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
              ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                  </div>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                  {categories.slice(0, 1).map((cat) => (
                      <Badge key={cat} className="bg-white/90 text-gray-900 backdrop-blur-sm">
                          {cat}
                      </Badge>
                  ))}
              </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-6">
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{new Date(date).toLocaleDateString()}</span>
                  </div>
                  {readingTime && (
                      <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{readingTime} min read</span>
                      </div>
                  )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {BlogTitle}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-medium text-gray-900">
                      {author}
                  </span>
                  <div className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={16} />
                  </div>
              </div>
          </div>
      </div>
  );
};

export default HomeBlogCard;
