
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Award, Heart, Newspaper, Star, Users } from "lucide-react";

interface UserProfileProps {
  name: string;
  avatarUrl?: string;
  rank: string;
  xp: number;
  totalViews: number;
  supportCount: number;
  verifiedPosts: number;
  joinedDate: string;
  bio: string;
}

const UserProfile = ({
  name,
  avatarUrl,
  rank,
  xp,
  totalViews,
  supportCount,
  verifiedPosts,
  joinedDate,
  bio
}: UserProfileProps) => {
  // Calculate progress to next level (just for display)
  const nextLevelThreshold = 1000;
  const progress = Math.min(100, (xp % nextLevelThreshold) / nextLevelThreshold * 100);
  
  // Define color based on rank
  const getRankColor = () => {
    switch (rank.toLowerCase()) {
      case 'beginner': return 'bg-muted text-muted-foreground';
      case 'contributor': return 'bg-blue-600 text-white';
      case 'trusted': return 'bg-yellow-500 text-black';
      case 'verified reporter': return 'bg-gradient-to-r from-green-500 to-emerald-700 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold mr-2">{name}</h2>
              <Badge className={getRankColor()}>{rank}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Member since {joinedDate}</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Newspaper className="h-3 w-3 mr-1 text-primary" />
                <span>{verifiedPosts} verified</span>
              </div>
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1 text-primary" />
                <span>{totalViews.toLocaleString()} views</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-3 w-3 mr-1 text-primary" />
                <span>{supportCount} support</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        <div>
          <p className="text-sm">{bio}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Award className="h-4 w-4 mr-1 text-yellow-500" />
              <span>XP: {xp}</span>
            </div>
            <span className="text-xs text-muted-foreground">{Math.round(progress)}% to next level</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
        
        <div className="pt-2 flex space-x-3">
          <Button size="sm" className="flex-1">
            <Heart className="h-4 w-4 mr-2" />
            Support
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Star className="h-4 w-4 mr-2" />
            Follow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
