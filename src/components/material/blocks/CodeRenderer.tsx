
import React, { useState } from 'react';
import { CodeBlock } from '@/types/materialCard';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeRendererProps {
  block: CodeBlock;
}

const CodeRenderer: React.FC<CodeRendererProps> = ({ block }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(block.content.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center bg-slate-800 text-white px-4 py-2 rounded-t-lg">
        <span className="text-sm font-mono">{block.content.language}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-b-lg overflow-x-auto">
        <code className="font-mono text-sm">{block.content.code}</code>
      </pre>
    </div>
  );
};

export default CodeRenderer;
