
import React, { useState } from 'react';
import { InteractiveBlock } from '@/types/materialCard';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InteractiveRendererProps {
  block: InteractiveBlock;
}

const InteractiveRenderer: React.FC<InteractiveRendererProps> = ({ block }) => {
  const [isFullWidth, setIsFullWidth] = useState(false);

  return (
    <div className={`relative ${isFullWidth ? 'w-full' : 'max-w-4xl mx-auto'}`}>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFullWidth(!isFullWidth)}
        >
          {isFullWidth ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </Button>
      </div>
      <iframe
        src={block.content.iframeSrc}
        style={{ height: `${block.content.height}px` }}
        className="w-full border rounded-lg"
        sandbox="allow-scripts allow-same-origin"
        title="Interactive Content"
      />
    </div>
  );
};

export default InteractiveRenderer;
