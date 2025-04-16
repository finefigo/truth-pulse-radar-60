
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquareText, 
  Award, 
  BarChart2, 
  Filter, 
  ChevronDown,
  Link as LinkIcon,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Sample debate data
const debateData = [
  {
    id: 1,
    title: "Should AI-generated content be regulated?",
    description: "Discussing the ethical implications of AI content creation and potential regulatory frameworks.",
    participants: 28,
    arguments: 45,
    votesFor: 124,
    votesAgainst: 86,
    status: "active",
    createdAt: "2 days ago"
  },
  {
    id: 2,
    title: "Is remote work more productive than office work?",
    description: "Examining the pros and cons of remote work versus traditional office environments.",
    participants: 42,
    arguments: 67,
    votesFor: 195,
    votesAgainst: 173,
    status: "active",
    createdAt: "4 days ago"
  },
  {
    id: 3,
    title: "Should social media platforms be legally responsible for user content?",
    description: "Discussing the legal and ethical responsibilities of platforms regarding user-generated content.",
    participants: 37,
    arguments: 52,
    votesFor: 142,
    votesAgainst: 128,
    status: "active",
    createdAt: "1 week ago"
  },
  {
    id: 4,
    title: "Is universal basic income a viable economic policy?",
    description: "Examining the economic and social implications of implementing universal basic income.",
    participants: 31,
    arguments: 49,
    votesFor: 112,
    votesAgainst: 98,
    status: "closed",
    createdAt: "2 weeks ago"
  }
];

const DebateCard = ({ debate }: { debate: typeof debateData[0] }) => {
  const { toast } = useToast();
  
  return (
    <Card className="p-5 hover:bg-muted/20 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg">{debate.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          debate.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
        }`}>
          {debate.status === "active" ? "Active" : "Closed"}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{debate.description}</p>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-1">{debate.participants}</span>
          <span className="text-xs text-muted-foreground">participants</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-1">{debate.arguments}</span>
          <span className="text-xs text-muted-foreground">arguments</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-1">{debate.createdAt}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <div className="h-4 bg-blue-500 rounded-l" style={{ width: `${(debate.votesFor / (debate.votesFor + debate.votesAgainst)) * 100}px` }}></div>
          <div className="h-4 bg-red-500 rounded-r" style={{ width: `${(debate.votesAgainst / (debate.votesFor + debate.votesAgainst)) * 100}px` }}></div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-4">
              <MessageSquareText className="h-4 w-4 mr-2" />
              Join Debate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Join Debate: {debate.title}</DialogTitle>
              <DialogDescription>
                Share your perspective with evidence and sources.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="stance" className="col-span-4">
                  Your Stance
                </Label>
                <div className="col-span-4 flex gap-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ThumbsUp className="h-4 w-4 mr-2" /> Support
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Neutral
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ThumbsDown className="h-4 w-4 mr-2" /> Oppose
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="argument" className="col-span-4">
                  Your Argument
                </Label>
                <Textarea
                  id="argument"
                  placeholder="Enter your argument with clear reasoning..."
                  className="col-span-4"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="source" className="col-span-4">
                  Source URL (Required)
                </Label>
                <div className="col-span-4 flex">
                  <div className="bg-muted p-2 rounded-l-md flex items-center">
                    <LinkIcon className="h-4 w-4" />
                  </div>
                  <Input
                    id="source"
                    placeholder="https://example.com/article"
                    className="rounded-l-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground col-span-4">
                  All arguments must be backed by at least one credible source.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tos" />
                <Label htmlFor="tos" className="text-xs">
                  I agree to maintain a respectful tone and acknowledge that AI will analyze my argument for factual accuracy.
                </Label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
              <Button onClick={() => {
                toast({
                  title: "Argument Submitted",
                  description: "Your argument is being analyzed by GroqLens and will appear shortly.",
                });
              }}>Submit Argument</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

const Debates = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">WorldWatch Debates</h1>
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="flex items-center mr-2">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
                <Button variant="default" size="sm">
                  <MessageSquareText className="h-4 w-4 mr-2" />
                  Start Debate
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Debates</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4 space-y-4">
                {debateData.map((debate) => (
                  <DebateCard key={debate.id} debate={debate} />
                ))}
              </TabsContent>
              
              <TabsContent value="active" className="mt-4 space-y-4">
                {debateData.filter(d => d.status === "active").map((debate) => (
                  <DebateCard key={debate.id} debate={debate} />
                ))}
              </TabsContent>
              
              <TabsContent value="closed" className="mt-4 space-y-4">
                {debateData.filter(d => d.status === "closed").map((debate) => (
                  <DebateCard key={debate.id} debate={debate} />
                ))}
              </TabsContent>
              
              <TabsContent value="popular" className="mt-4 space-y-4">
                {debateData.sort((a, b) => (b.votesFor + b.votesAgainst) - (a.votesFor + a.votesAgainst)).map((debate) => (
                  <DebateCard key={debate.id} debate={debate} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-secondary/30 border border-border p-4 space-y-4">
              <h3 className="font-medium">How Debates Work</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded mr-3">
                    <MessageSquareText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Present Arguments</h4>
                    <p className="text-xs text-muted-foreground">Post your perspective with evidence and sources.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded mr-3">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Vote on Best Points</h4>
                    <p className="text-xs text-muted-foreground">Upvote arguments based on clarity and evidence, not opinion.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded mr-3">
                    <BarChart2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">AI Analysis</h4>
                    <p className="text-xs text-muted-foreground">GroqLens analyzes arguments for factual accuracy and fallacies.</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                View Debate Guidelines
              </Button>
            </Card>
            
            <Card className="bg-secondary/30 border border-border p-4 space-y-4">
              <h3 className="font-medium">Top Debaters</h3>
              <div className="space-y-2">
                {[
                  { name: "Sarah Jensen", score: 827, rank: "#1" },
                  { name: "Michael Thompson", score: 756, rank: "#2" },
                  { name: "Aisha Patel", score: 701, rank: "#3" },
                  { name: "Devon Rodriguez", score: 658, rank: "#4" },
                  { name: "Jane Carter", score: 612, rank: "#5" },
                ].map((debater, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded hover:bg-secondary cursor-pointer">
                    <div className="flex items-center">
                      <span className="text-xs font-medium mr-2">{debater.rank}</span>
                      <span>{debater.name}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20">
                      {debater.score} pts
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">View All Debaters</Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Debates;
