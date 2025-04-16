
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ThumbsUp, ThumbsDown, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface VotingSystemProps {
  initialTrust?: number;
  initialNeutrality?: number;
  initialClarity?: number;
  verified?: boolean;
  compact?: boolean;
}

const VotingSystem = ({
  initialTrust = 0,
  initialNeutrality = 50,
  initialClarity = 3,
  verified = false,
  compact = false
}: VotingSystemProps) => {
  const [trust, setTrust] = useState<number>(initialTrust);
  const [neutrality, setNeutrality] = useState<number>(initialNeutrality);
  const [clarity, setClarity] = useState<number>(initialClarity);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  
  const handleTrustVote = (value: number) => {
    setTrust(prev => prev + value);
    if (!hasVoted) setHasVoted(true);
  };
  
  const handleNeutralityChange = (value: number[]) => {
    setNeutrality(value[0]);
    if (!hasVoted) setHasVoted(true);
  };
  
  const handleClarityVote = (value: number) => {
    setClarity(value);
    if (!hasVoted) setHasVoted(true);
  };
  
  // Render compact version for cards
  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => handleTrustVote(1)}
        >
          <ThumbsUp className={cn("h-4 w-4", trust > 0 ? "text-positive" : "text-muted-foreground")} />
        </Button>
        <span className="text-xs">{trust}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => handleTrustVote(-1)}
        >
          <ThumbsDown className={cn("h-4 w-4", trust < 0 ? "text-negative" : "text-muted-foreground")} />
        </Button>
        
        {verified && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="ml-2">
                  <CheckCircle2 className="h-4 w-4 text-positive" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Verified by community</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  }
  
  // Render full voting system
  return (
    <div className="space-y-6 p-4 border border-border rounded-lg bg-secondary/30">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Trust Score</h3>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium">{trust}</span>
            {trust > 10 && <CheckCircle2 className="h-4 w-4 text-positive" />}
            {trust < -10 && <XCircle className="h-4 w-4 text-negative" />}
            {trust >= -10 && trust <= 10 && <AlertCircle className="h-4 w-4 text-neutral" />}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1" 
            onClick={() => handleTrustVote(-1)}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            Distrust
          </Button>
          <div className="w-4"></div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleTrustVote(1)}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Trust
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Neutrality</h3>
          <div>
            {neutrality < 40 && <span className="text-xs text-bias-left">Left-leaning</span>}
            {neutrality > 60 && <span className="text-xs text-bias-right">Right-leaning</span>}
            {neutrality >= 40 && neutrality <= 60 && <span className="text-xs text-bias-neutral">Neutral</span>}
          </div>
        </div>
        <div className="px-1">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Left</span>
            <span>Center</span>
            <span>Right</span>
          </div>
          <Slider
            defaultValue={[neutrality]}
            max={100}
            step={1}
            onValueChange={handleNeutralityChange}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Clarity</h3>
          <span className="text-xs">
            {clarity === 1 && "Very unclear"}
            {clarity === 2 && "Somewhat unclear"}
            {clarity === 3 && "Moderate"}
            {clarity === 4 && "Mostly clear"}
            {clarity === 5 && "Very clear"}
          </span>
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button 
              key={rating} 
              variant={clarity === rating ? "default" : "outline"} 
              size="sm"
              className="flex-1"
              onClick={() => handleClarityVote(rating)}
            >
              {rating}
            </Button>
          ))}
        </div>
      </div>
      
      {hasVoted && (
        <div className="pt-2 text-center text-sm text-muted-foreground animate-fade-in">
          Thank you for your vote!
        </div>
      )}
    </div>
  );
};

export default VotingSystem;
