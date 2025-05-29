
import React from 'react';
import { BlogPost } from '@/stores/useBlogStore';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

interface FeaturedTemplateProps {
  post: BlogPost;
}

const FeaturedTemplate: React.FC<FeaturedTemplateProps> = ({ post }) => {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: post.featuredImage ? `url(${post.featuredImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <div className="flex justify-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-white border-white">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {post.excerpt}
          </p>
          
          <div className="flex justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
};

export default FeaturedTemplate;
