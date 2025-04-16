
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lightbulb, ArrowRight, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const AskGroq = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);
  const { toast } = useToast();

  const exampleQueries = [
    'Why is sentiment negative in tech today?',
    'What events caused hope to rise this week?',
    'Summarize the current political climate',
    'Which news source shows the most bias?'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Please enter a question",
        description: "Your question cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setResponse(null);
    
    // Simulate API call to Groq
    setTimeout(() => {
      const responses = [
        "The negative sentiment in tech today is primarily driven by recent layoffs at major tech companies and concerns about AI regulation. Several tech giants announced workforce reductions this week, and there's increasing regulatory scrutiny around AI safety standards.",
        "Environmental news is showing rising hope indicators (+23% this week) due to new breakthrough announcements in renewable energy technology and several countries exceeding their emissions reduction targets.",
        "The current political climate shows heightened polarization (bias divergence +34%) ahead of upcoming elections, with economic policies and healthcare being the most divisive topics according to our sentiment analysis.",
        "Based on our bias detection algorithms, smaller independent outlets currently demonstrate more neutral coverage (avg. 72% neutrality score) compared to larger corporate media (avg. 48%)."
      ];
      
      setResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="border border-primary/20 overflow-hidden">
      <CardHeader className="bg-secondary/50">
        <CardTitle className="flex items-center text-lg">
          <Lightbulb className="h-5 w-5 mr-2 text-primary" />
          Ask GroqLens AI
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask about current news trends, sentiment, or bias..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !query}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
        
        {!response && !isLoading && (
          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((exampleQuery, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => setQuery(exampleQuery)}
                >
                  {exampleQuery}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">GroqLens is analyzing...</span>
          </div>
        )}
        
        {response && (
          <div className="mt-4 p-4 bg-secondary/50 rounded-lg border border-border animate-fade-in">
            <p className="text-foreground">{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AskGroq;
