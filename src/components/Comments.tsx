
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: number;
  author: string;
  content: string;
  timeAgo: string;
  avatarUrl?: string;
}

interface CommentsProps {
  postId: number;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();
  
  // Simulated comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Sarah Chen",
      content: "Really insightful analysis. I'd add that recent developments in this area suggest even broader implications.",
      timeAgo: "2h ago",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: 2,
      author: "Alex Thompson",
      content: "Great perspective. Would love to see more coverage on the technical aspects of this.",
      timeAgo: "5h ago",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    }
  ]);

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment first",
        variant: "destructive"
      });
      return;
    }

    const newCommentObj: Comment = {
      id: comments.length + 1,
      author: "Current User",
      content: newComment,
      timeAgo: "Just now",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added to the discussion"
    });
  };

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <MessageSquare className="h-4 w-4" />
        {comments.length} Comments
      </Button>

      {isExpanded && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex gap-2">
            <Textarea
              placeholder="Add to the discussion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmitComment} size="sm">
              Post Comment
            </Button>
          </div>

          <div className="space-y-4 pt-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 animate-fade-in">
                <Avatar className="h-8 w-8">
                  {comment.avatarUrl && <AvatarImage src={comment.avatarUrl} alt={comment.author} />}
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
