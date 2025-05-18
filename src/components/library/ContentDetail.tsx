
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Calendar, 
  Video, 
  FileText, 
  GraduationCap, 
  SquarePen, 
  Star,
  Eye,
  Check,
  Plus
} from 'lucide-react';
import { ContentItem } from '@/api/library';
import { useNavigate } from 'react-router-dom';

interface ContentDetailProps {
  item: ContentItem;
  isAdmin?: boolean;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Video':
      return <Video size={18} />;
    case 'Document':
      return <FileText size={18} />;
    case 'Practice':
      return <SquarePen size={18} />;
    case 'Interactive':
      return <GraduationCap size={18} />;
    default:
      return null;
  }
};

const ContentDetail: React.FC<ContentDetailProps> = ({ item, isAdmin = false }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState<boolean>(!!item.bookmarked);
  const [completed, setCompleted] = useState<boolean>(!!item.completed);
  
  const handleBack = () => {
    navigate('/library');
  };
  
  const renderContent = () => {
    if (item.type === 'Video') {
      return (
        <div className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center mb-8">
          <Video className="h-16 w-16 text-white opacity-50" />
          <span className="sr-only">Video placeholder</span>
        </div>
      );
    }
    
    if (item.content.startsWith('http')) {
      return (
        <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center mb-8">
          <p className="text-slate-500">External content at: {item.content}</p>
        </div>
      );
    }
    
    // For markdown content
    return (
      <div className="prose prose-indigo max-w-none mb-8">
        <div className="rounded-xl bg-white border p-6">
          {item.content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) {
              return <h1 key={i}>{line.substring(2)}</h1>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={i}>{line.substring(3)}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={i}>{line.substring(4)}</h3>;
            }
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Library
      </Button>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Badge variant="outline" className="flex items-center gap-1">
            {getTypeIcon(item.type)}
            {item.type}
          </Badge>
          <Badge variant="outline">{item.difficulty}</Badge>
          <Badge variant="outline">{item.language}</Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {item.duration} minutes
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            Added {new Date(item.dateCreated).toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">{item.title}</h1>
          
          <div className="flex items-center gap-1">
            <div className="flex items-center text-yellow-500 mr-2">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-medium ml-1">{item.rating.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center text-gray-500 mr-2">
              <Eye className="h-5 w-5" />
              <span className="font-medium ml-1">{item.views}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-lg mb-8">{item.description}</p>
        
        {renderContent()}
        
        <div className="flex flex-wrap gap-4">
          {!isAdmin && (
            <>
              <Button
                variant={bookmarked ? "secondary" : "outline"}
                onClick={() => setBookmarked(!bookmarked)}
              >
                {bookmarked ? (
                  <>
                    <BookmarkCheck className="mr-2 h-5 w-5" />
                    Bookmarked
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-5 w-5" />
                    Bookmark
                  </>
                )}
              </Button>
              
              <Button
                variant={completed ? "secondary" : "outline"}
                onClick={() => setCompleted(!completed)}
              >
                {completed ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Completed
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Mark as Completed
                  </>
                )}
              </Button>
            </>
          )}
          
          <Button>
            <Plus className="mr-2 h-5 w-5" />
            Add to Lesson
          </Button>
          
          {isAdmin && (
            <Button variant="outline" onClick={() => navigate(`/tutor/library-admin/edit/${item.id}`)}>
              Edit Content
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ContentDetail;
