import React from 'react';
import { ArrowUpRight, BarChart2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FactCheck from './FactCheck';
import Comments from './Comments';
import SocialShare from './SocialShare';

type EmotionType = 'anger' | 'sadness' | 'hope' | 'calm';
type SentimentType = 'positive' | 'negative' | 'neutral';
type BiasType = 'left' | 'right' | 'neutral';

interface NewsCardProps {
  title: string;
  source: string;
  summary: string;
  timeAgo: string;
  sentiment: SentimentType;
  emotion: EmotionType;
  bias: BiasType;
  urgency: number;
  imageUrl?: string;
  url: string;
  votes: number;
  id?: number;
}

const NewsCard = ({
  id,
  title,
  source,
  summary,
  timeAgo,
  sentiment,
  emotion,
  bias,
  urgency,
  imageUrl,
  url,
  votes
}: NewsCardProps & { id?: number }) => {
  const sentimentColor = {
    positive: "gradient-positive",
    neutral: "gradient-neutral",
    negative: "gradient-negative"
  }[sentiment];
  
  const emotionColor = {
    anger: "bg-emotion-anger",
    sadness: "bg-emotion-sadness",
    hope: "bg-emotion-hope",
    calm: "bg-emotion-calm"
  }[emotion];
  
  const biasLabel = {
    left: "Left-leaning",
    right: "Right-leaning",
    neutral: "Politically neutral"
  }[bias];

  return (
    <Card className={cn("news-card overflow-hidden animate-fade-in")}>
      <div className="flex flex-col h-full">
        <div className="flex items-stretch">
          <div className={cn("w-1.5", sentimentColor)}></div>

          <div className="flex-1">
            <CardHeader className="pb-3 relative">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{source} • {timeAgo}</p>
                    <SocialShare title={title} url={url} />
                  </div>
                  <h3 className="text-lg font-semibold mt-1 pr-6 line-clamp-2">{title}</h3>
                </div>

                {imageUrl && (
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 ml-4">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              
              <div className="absolute top-3 right-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Read original article</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>

            <CardContent className="pb-3">
              <p className="text-sm text-foreground/80 line-clamp-2">{summary}</p>
            </CardContent>

            <CardFooter className="pt-0 flex-col space-y-4">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={cn("text-xs", emotionColor)}>
                    {emotion}
                  </Badge>
                  {urgency > 7 && (
                    <Badge variant="destructive" className="text-xs">
                      Breaking
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <FactCheck title={title} summary={summary} />
                  
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <button className="hover:text-green-500 transition-colors">
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    <span className="text-xs">{votes}</span>
                    <button className="hover:text-red-500 transition-colors">
                      <ThumbsDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
              
              {id && <Comments postId={id} />}
            </CardFooter>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn("w-1 bg-bias-neutral", {
                  "bg-bias-left": bias === "left",
                  "bg-bias-right": bias === "right",
                  "bg-bias-neutral": bias === "neutral",
                })}></div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{biasLabel}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
