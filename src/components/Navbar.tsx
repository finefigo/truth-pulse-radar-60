
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, MessageSquarePlus, Search, User, MenuIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "This feature will be available in the next update.",
    });
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm p-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MenuIcon className="h-6 w-6 text-muted-foreground md:hidden" />
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              WorldWatch
            </span>
            <span className="text-xl font-bold text-foreground">×</span>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
              GroqLens
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`transition-colors ${isActive('/') ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/debates" 
            className={`transition-colors ${isActive('/debates') ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}
          >
            Debates
          </Link>
          <Link 
            to="/newsletter" 
            className={`transition-colors ${isActive('/newsletter') ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}
          >
            Newsletter
          </Link>
          <Link 
            to="#" 
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Explore
          </Link>
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
