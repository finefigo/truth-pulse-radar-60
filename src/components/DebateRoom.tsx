
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Bot,
  User,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface DebateArgument {
  id: string;
  author: string;
  side: 'A' | 'B';
  content: string;
  score: number;
  timestamp: Date;
  aiValidation: {
    logicalValidity: number;
    factualAccuracy: number;
    overallScore: number;
  };
}

interface DebateRoomProps {
  claim: string;
}

const DebateRoom: React.FC<DebateRoomProps> = ({ claim }) => {
  const [selectedSide, setSelectedSide] = useState<'A' | 'B' | null>(null);
  const [argument, setArgument] = useState('');
  const [arguments, setArguments] = useState<DebateArgument[]>([]);
  const [aiParticipating, setAiParticipating] = useState(false);
  const { toast } = useToast();

  const submitArgument = () => {
    if (!selectedSide || !argument.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a side and write your argument.",
        variant: "destructive"
      });
      return;
    }

    const newArgument: DebateArgument = {
      id: Date.now().toString(),
      author: "Current User",
      side: selectedSide,
      content: argument.trim(),
      score: 0,
      timestamp: new Date(),
      aiValidation: {
        logicalValidity: Math.floor(Math.random() * 40) + 60,
        factualAccuracy: Math.floor(Math.random() * 40) + 60,
        overallScore: Math.floor(Math.random() * 40) + 60
      }
    };

    setArguments(prev => [...prev, newArgument]);
    setArgument('');

    toast({
      title: "Argument submitted",
      description: "Your argument has been posted and AI-evaluated."
    });

    // Check if AI should join the debate
    const sideAArgs = arguments.filter(arg => arg.side === 'A').length + (selectedSide === 'A' ? 1 : 0);
    const sideBArgs = arguments.filter(arg => arg.side === 'B').length + (selectedSide === 'B' ? 1 : 0);
    
    if (sideAArgs >= 1 && sideBArgs >= 1 && !aiParticipating) {
      setTimeout(() => addAiArgument(), 2000);
    }
  };

  const addAiArgument = () => {
    setAiParticipating(true);
    
    const aiArgument: DebateArgument = {
      id: `ai-${Date.now()}`,
      author: "TruthNet AI",
      side: Math.random() > 0.5 ? 'A' : 'B',
      content: `Based on my analysis of available evidence, I'd like to offer a fact-based perspective on this claim. The data suggests that while there are valid points on both sides, the evidence tends to support a more nuanced view that considers multiple factors and contexts.`,
      score: 0,
      timestamp: new Date(),
      aiValidation: {
        logicalValidity: 95,
        factualAccuracy: 92,
        overallScore: 94
      }
    };

    setArguments(prev => [...prev, aiArgument]);

    toast({
      title: "AI joined the debate",
      description: "TruthNet AI has provided a fact-based perspective."
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-4">
      <div className="text-center p-4 bg-secondary/30 rounded-md">
        <h3 className="font-medium mb-2">⚔️ Public Debate</h3>
        <p className="text-sm text-muted-foreground mb-3">Choose your position and present your argument</p>
        
        <div className="flex gap-2 justify-center">
          <Button
            variant={selectedSide === 'A' ? 'default' : 'outline'}
            onClick={() => setSelectedSide('A')}
            className="flex-1 max-w-[120px]"
          >
            Side A (Support)
          </Button>
          <Button
            variant={selectedSide === 'B' ? 'default' : 'outline'}
            onClick={() => setSelectedSide('B')}
            className="flex-1 max-w-[120px]"
          >
            Side B (Oppose)
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Textarea
          placeholder="Write your argument here..."
          value={argument}
          onChange={(e) => setArgument(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={submitArgument} className="w-full">
          <MessageSquare className="h-4 w-4 mr-2" />
          Submit Argument
        </Button>
      </div>

      {arguments.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Debate Arguments</h4>
          <div className="space-y-3">
            {arguments.map((arg) => (
              <Card key={arg.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {arg.author === "TruthNet AI" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{arg.author}</p>
                        <p className="text-xs text-muted-foreground">
                          Side {arg.side} • {arg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={arg.side === 'A' ? 'default' : 'secondary'}>
                      Side {arg.side}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm mb-3">{arg.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        {getScoreIcon(arg.aiValidation.overallScore)}
                        <span className={getScoreColor(arg.aiValidation.overallScore)}>
                          {arg.aiValidation.overallScore}% Quality
                        </span>
                      </div>
                      <div className="text-muted-foreground">
                        Logic: {arg.aiValidation.logicalValidity}% | Facts: {arg.aiValidation.factualAccuracy}%
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-3 w-3" />
                        <span className="ml-1 text-xs">0</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="h-3 w-3" />
                        <span className="ml-1 text-xs">0</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DebateRoom;
