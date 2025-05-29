
import React from 'react';
import { BlogPost } from '@/stores/useBlogStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

interface StandardTemplateProps {
  post: BlogPost;
}

const StandardTemplate: React.FC<StandardTemplateProps> = ({ post }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {post.title}
        </h1>
        
        <p className="text-xl text-slate-600 mb-6">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-6 text-sm text-slate-500">
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
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <Card>
        <CardContent className="p-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </CardContent>
      </Card>
    </article>
  );
};

export default StandardTemplate;
