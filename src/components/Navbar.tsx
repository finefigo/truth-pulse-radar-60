
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, MessageSquarePlus, Search, User, MenuIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "This feature will be available in the next update.",
    });
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm p-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MenuIcon className="h-6 w-6 text-muted-foreground md:hidden" />
          <div className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              WorldWatch
            </span>
            <span className="text-xl font-bold text-foreground">×</span>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
              GroqLens
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Dashboard</a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Explore</a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Debates</a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Newsletter</a>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button className="hidden md:flex">
            <MessageSquarePlus className="h-5 w-5 mr-2" />
            Create Post
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
