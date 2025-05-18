
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  BookOpen, 
  Video, 
  FileText, 
  GraduationCap, 
  SquarePen, 
  Bookmark,
  Star 
} from 'lucide-react';
import { ContentItem } from '@/api/library';
import { useTutorStore } from '@/stores/useTutorStore';
import { cn } from '@/lib/utils';

interface ContentGridProps {
  items: ContentItem[];
  isLoading: boolean;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Video':
      return <Video size={16} />;
    case 'Document':
      return <FileText size={16} />;
    case 'Practice':
      return <SquarePen size={16} />;
    case 'Interactive':
      return <GraduationCap size={16} />;
    default:
      return <BookOpen size={16} />;
  }
};

const ContentGrid: React.FC<ContentGridProps> = ({ items, isLoading }) => {
  const navigate = useNavigate();
  const { viewMode } = useTutorStore();
  
  const handleViewContent = (id: string) => {
    navigate(`/library/${id}`);
  };
  
  if (isLoading) {
    return (
      <div className={cn(
        "grid gap-4 p-4",
        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-slate-200 rounded-t-md"></div>
            <CardHeader>
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            </CardHeader>
            <CardFooter>
              <div className="h-8 bg-slate-200 rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold mb-2">No Content Found</h3>
        <p className="text-gray-500 mb-6">
          Try adjusting your filters or search terms
        </p>
        <Button>Browse All Content</Button>
      </div>
    );
  }
  
  if (viewMode === 'list') {
    return (
      <div className="space-y-4 p-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewContent(item.id)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-36 md:h-auto bg-slate-100 relative flex-shrink-0">
                  {item.thumbnail ? (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  
                  {item.bookmarked && (
                    <div className="absolute top-2 right-2 text-indigo-600">
                      <Bookmark className="h-5 w-5 fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex gap-1 items-center">
                        {getTypeIcon(item.type)}
                        {item.type}
                      </Badge>
                      <Badge variant="outline">{item.difficulty}</Badge>
                    </div>
                    
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-xs ml-1">{item.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-2">{item.description}</p>
                  
                  <div className="flex items-center text-gray-500 text-xs mt-2">
                    <Clock className="h-3 w-3 mr-1" /> {item.duration} min
                    <span className="mx-2">•</span>
                    <BookOpen className="h-3 w-3 mr-1" /> {item.subject}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleViewContent(item.id)}
          >
            <div className="h-48 bg-slate-100 relative">
              {item.thumbnail ? (
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
              )}
              
              {item.bookmarked && (
                <div className="absolute top-2 right-2 text-indigo-600">
                  <Bookmark className="h-5 w-5 fill-current" />
                </div>
              )}
              
              <div className="absolute bottom-2 left-2 flex gap-2">
                <Badge variant="secondary" className="flex gap-1 items-center">
                  {getTypeIcon(item.type)}
                  {item.type}
                </Badge>
                <Badge variant="secondary">{item.difficulty}</Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-xs ml-1">{item.rating.toFixed(1)}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
              
              <div className="flex items-center text-gray-500 text-xs mt-3">
                <Clock className="h-3 w-3 mr-1" /> {item.duration} min
                <span className="mx-2">•</span>
                <BookOpen className="h-3 w-3 mr-1" /> {item.subject}
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" size="sm">
                View Content
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ContentGrid;
