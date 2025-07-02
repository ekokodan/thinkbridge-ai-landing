
import React from 'react';
import { MarkdownBlock } from '@/types/materialCard';

interface MarkdownRendererProps {
  block: MarkdownBlock;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ block }) => {
  return (
    <div 
      className="prose prose-slate max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: block.content.markdown }}
    />
  );
};

export default MarkdownRenderer;
