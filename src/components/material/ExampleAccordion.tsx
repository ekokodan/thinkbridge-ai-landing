
import React, { useState } from 'react';
import { Example } from '@/types/materialCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

interface ExampleAccordionProps {
  examples: Example[];
}

const ExampleAccordion: React.FC<ExampleAccordionProps> = ({ examples }) => {
  const [revealedSteps, setRevealedSteps] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const toggleSteps = (exampleId: string) => {
    setRevealedSteps(prev => ({ ...prev, [exampleId]: !prev[exampleId] }));
  };

  const toggleAnswer = (exampleId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [exampleId]: !prev[exampleId] }));
  };

  if (examples.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Examples</h3>
      <Accordion type="single" collapsible>
        {examples.map((example) => (
          <AccordionItem key={example.id} value={example.id}>
            <AccordionTrigger className="text-left">
              {example.problem}
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Solution Steps</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSteps(example.id)}
                  >
                    {revealedSteps[example.id] ? 'Hide Steps' : 'Reveal Steps'}
                  </Button>
                </div>
                {revealedSteps[example.id] && (
                  <ol className="list-decimal list-inside space-y-2 bg-slate-50 p-4 rounded-lg">
                    {example.steps.map((step, index) => (
                      <li key={index} className="text-sm">{step}</li>
                    ))}
                  </ol>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Final Answer</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAnswer(example.id)}
                  >
                    {revealedAnswers[example.id] ? 'Hide Answer' : 'Reveal Answer'}
                  </Button>
                </div>
                {revealedAnswers[example.id] && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="font-mono">{example.answer}</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ExampleAccordion;
