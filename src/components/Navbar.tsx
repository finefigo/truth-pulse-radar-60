
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, LogOut, MessageSquarePlus, Menu, Search, User, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const Navbar = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "This feature will be available in the next update.",
    });
  };
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    if (!supabase) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to log out. Supabase configuration is missing.",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while logging out.",
      });
    }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm p-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Menu className="h-6 w-6 text-muted-foreground md:hidden" />
          <Link to="/" className="flex items-center flex-col">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                TruthNet
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Powered by Truth Pulse Engine
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {supabase?.auth.getUser() ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full cursor-pointer">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log in
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="hidden md:flex">
            <MessageSquarePlus className="h-5 w-5 mr-2" />
            Submit News Claim
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
