
import React, { useState } from 'react';
import { BlogPost } from '@/stores/useBlogStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryTemplateProps {
  post: BlogPost;
}

const GalleryTemplate: React.FC<GalleryTemplateProps> = ({ post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = post.gallery || [post.featuredImage].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <article className="max-w-6xl mx-auto px-4 py-8">
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

      {/* Gallery */}
      {images.length > 0 && (
        <div className="mb-8">
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt={`${post.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-96 md:h-[500px] object-cover rounded-lg"
            />
            
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded border-2 transition-all ${
                    index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          )}
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

export default GalleryTemplate;
