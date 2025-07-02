
import React from 'react';
import { ImageBlock } from '@/types/materialCard';

interface ImageRendererProps {
  block: ImageBlock;
}

const ImageRenderer: React.FC<ImageRendererProps> = ({ block }) => {
  return (
    <figure className="w-full">
      <img
        src={block.content.src}
        alt={block.content.alt}
        className="w-full max-w-full h-auto rounded-lg"
        loading="lazy"
      />
      {block.content.caption && (
        <figcaption className="text-sm text-slate-600 mt-2 text-center">
          {block.content.caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageRenderer;
