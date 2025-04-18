
import React from 'react';
import { Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  title: string;
  url: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  const { toast } = useToast();
  
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "URL has been copied to clipboard"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-[#1DA1F2] transition-colors"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-[#4267B2] transition-colors"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-[#0077b5] transition-colors"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-4 w-4 p-0"
        onClick={handleCopyLink}
      >
        <Link2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
      </Button>
    </div>
  );
};

export default SocialShare;
