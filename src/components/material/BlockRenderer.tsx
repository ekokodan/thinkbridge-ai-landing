
import React from 'react';
import { CardBlock } from '@/types/materialCard';
import MarkdownRenderer from './blocks/MarkdownRenderer';
import ImageRenderer from './blocks/ImageRenderer';
import VideoRenderer from './blocks/VideoRenderer';
import InteractiveRenderer from './blocks/InteractiveRenderer';
import CodeRenderer from './blocks/CodeRenderer';

interface BlockRendererProps {
  blocks: CardBlock[];
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  const renderBlock = (block: CardBlock) => {
    switch (block.type) {
      case 'markdown':
        return <MarkdownRenderer key={block.id} block={block} />;
      case 'image':
        return <ImageRenderer key={block.id} block={block} />;
      case 'video':
        return <VideoRenderer key={block.id} block={block} />;
      case 'interactive':
        return <InteractiveRenderer key={block.id} block={block} />;
      case 'code':
        return <CodeRenderer key={block.id} block={block} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {blocks.map(renderBlock)}
    </div>
  );
};

export default BlockRenderer;
