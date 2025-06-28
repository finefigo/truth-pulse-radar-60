
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, TrendingUp, TrendingDown, Award } from 'lucide-react';

interface UserValidationProps {
  score: number;
  username: string;
  avatarUrl?: string;
  recentActivity?: {
    correctClaims: number;
    incorrectClaims: number;
    debatesWon: number;
  };
}

const UserValidation: React.FC<UserValidationProps> = ({ 
  score, 
  username, 
  avatarUrl,
  recentActivity = { correctClaims: 0, incorrectClaims: 0, debatesWon: 0 }
}) => {
  const getValidationTier = (score: number) => {
    if (score >= 85) return { tier: 'Expert', color: 'bg-blue-500', badge: 'default' as const };
    if (score >= 70) return { tier: 'Trusted', color: 'bg-green-500', badge: 'default' as const };
    if (score >= 50) return { tier: 'Regular', color: 'bg-yellow-500', badge: 'secondary' as const };
    return { tier: 'New', color: 'bg-red-500', badge: 'destructive' as const };
  };

  const validation = getValidationTier(score);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          👤 User Validation Level
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{username}</h3>
              <Badge variant={validation.badge} className="text-xs">
                {validation.tier}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={score} className="flex-1 h-2" />
              <span className="text-sm font-medium">{score}/100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-lg font-bold text-green-500">{recentActivity.correctClaims}</span>
            </div>
            <p className="text-xs text-muted-foreground">Correct Claims</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-lg font-bold text-red-500">{recentActivity.incorrectClaims}</span>
            </div>
            <p className="text-xs text-muted-foreground">Flagged Posts</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Award className="h-4 w-4 text-blue-500" />
              <span className="text-lg font-bold text-blue-500">{recentActivity.debatesWon}</span>
            </div>
            <p className="text-xs text-muted-foreground">Debates Won</p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Validation score increases with accurate posts and quality arguments</p>
          <p>• Score decreases when posts are flagged as misleading</p>
          <p>• Participate in debates to improve your reputation</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserValidation;
