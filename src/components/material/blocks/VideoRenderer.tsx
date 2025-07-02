
import React, { useState } from 'react';
import { VideoBlock } from '@/types/materialCard';
import { Play } from 'lucide-react';

interface VideoRendererProps {
  block: VideoBlock;
}

const VideoRenderer: React.FC<VideoRendererProps> = ({ block }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      {!isLoaded ? (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => setIsLoaded(true)}
        >
          <img
            src={block.content.thumbnail}
            alt={block.content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <Play className="w-16 h-16 text-white" />
          </div>
        </div>
      ) : (
        <video
          controls
          className="w-full h-full"
          src={block.content.src}
          title={block.content.title}
        />
      )}
    </div>
  );
};

export default VideoRenderer;
