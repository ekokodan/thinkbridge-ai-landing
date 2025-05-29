
import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogStore } from '@/stores/useBlogStore';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogListPage: React.FC = () => {
  const { actions } = useBlogStore();
  const publishedPosts = actions.getPublishedPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Insights, updates, and stories from our team and community.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {publishedPosts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              No blog posts yet
            </h2>
            <p className="text-slate-600">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                {post.featuredImage && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h2 className="text-xl font-semibold text-slate-900 line-clamp-2">
                    {post.title}
                  </h2>
                </CardHeader>
                
                <CardContent>
                  <p className="text-slate-600 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>
                    {post.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}m</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to={`/blog/${post.slug}`} className="flex items-center gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
