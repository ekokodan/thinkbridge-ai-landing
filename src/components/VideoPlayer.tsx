
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { CheckCircle, FileText, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useProgressStore } from '@/stores/useProgressStore';

interface VideoPlayerProps {
  videoUrl: string;
  transcript: string;
  lessonId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, transcript, lessonId }) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const { progress, actions } = useProgressStore();
  const isCompleted = progress[lessonId]?.completed || false;
  
  const handleComplete = () => {
    actions.markLessonComplete(lessonId);
  };
  
  return (
    <div className="space-y-4">
      <div className="aspect-video rounded-lg overflow-hidden bg-black shadow-md">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          config={{
            youtube: {
              playerVars: { modestbranding: 1 }
            }
          }}
        />
      </div>
      
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center gap-2"
          >
            <FileText size={16} />
            {showTranscript ? 'Hide' : 'Show'} Transcript
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <HelpCircle size={16} />
                  Ask a Question
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>AI assistance coming soon!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <label 
            htmlFor="completed" 
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Checkbox 
              id="completed" 
              checked={isCompleted} 
              onCheckedChange={handleComplete} 
            />
            <span>Mark as Complete</span>
          </label>
        </div>
      </div>
      
      {showTranscript && (
        <Card className="p-4 bg-gray-50">
          <h3 className="font-medium mb-2">Transcript</h3>
          <div className="text-sm whitespace-pre-line">
            {transcript || "No transcript available for this video."}
          </div>
        </Card>
      )}
    </div>
  );
};

export default VideoPlayer;
