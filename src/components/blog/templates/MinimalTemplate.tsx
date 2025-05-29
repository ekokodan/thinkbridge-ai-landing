
import React from 'react';
import { BlogPost } from '@/stores/useBlogStore';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

interface MinimalTemplateProps {
  post: BlogPost;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ post }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      {/* Minimal Header */}
      <header className="mb-12 text-center">
        <div className="flex justify-center gap-2 mb-6">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">
          {post.title}
        </h1>
        
        <div className="flex justify-center items-center gap-4 text-sm text-slate-500">
          <span>{post.author}</span>
          <span>•</span>
          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
          {post.readTime && (
            <>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </>
          )}
        </div>
      </header>

      {/* Excerpt */}
      <div className="mb-12">
        <p className="text-lg text-slate-600 font-light leading-relaxed text-center">
          {post.excerpt}
        </p>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-12">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none font-light leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export default MinimalTemplate;
