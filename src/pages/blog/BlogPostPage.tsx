
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useBlogStore } from '@/stores/useBlogStore';
import StandardTemplate from '@/components/blog/templates/StandardTemplate';
import FeaturedTemplate from '@/components/blog/templates/FeaturedTemplate';
import GalleryTemplate from '@/components/blog/templates/GalleryTemplate';
import MinimalTemplate from '@/components/blog/templates/MinimalTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { actions } = useBlogStore();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = actions.getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (post.template) {
      case 'featured':
        return <FeaturedTemplate post={post} />;
      case 'gallery':
        return <GalleryTemplate post={post} />;
      case 'minimal':
        return <MinimalTemplate post={post} />;
      default:
        return <StandardTemplate post={post} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Blog Content */}
      {renderTemplate()}
    </div>
  );
};

export default BlogPostPage;
