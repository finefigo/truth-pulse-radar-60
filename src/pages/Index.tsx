
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import NewsCard from '@/components/NewsCard';
import SentimentDashboard from '@/components/SentimentDashboard';
import AskGroq from '@/components/AskGroq';
import UserProfile from '@/components/UserProfile';
import PostEditor from '@/components/PostEditor';
import VotingSystem from '@/components/VotingSystem';
import ClaimVerifier from '@/components/ClaimVerifier';
import UserValidation from '@/components/UserValidation';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  Filter, 
  Globe, 
  MessageSquareText, 
  RefreshCcw,
  ChevronDown,
  Shield
} from 'lucide-react';

// Sample news data
const newsData = [
  {
    id: 1,
    title: "Global Tech Summit Addresses AI Regulation Concerns",
    source: "Tech Chronicle",
    summary: "Leaders from major tech companies gathered to discuss potential frameworks for AI regulation and responsible development.",
    timeAgo: "2 hours ago",
    sentiment: "neutral",
    emotion: "calm",
    bias: "neutral",
    urgency: 4,
    votes: 56,
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Climate Crisis: Record Temperatures Reported Across Europe",
    source: "Environmental Report",
    summary: "Scientists warn of catastrophic consequences as temperature records continue to break across southern European countries.",
    timeAgo: "5 hours ago",
    sentiment: "negative",
    emotion: "anger",
    bias: "left",
    urgency: 8,
    votes: 124,
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1581215524789-9d9a1734bb3f?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Breakthrough in Clean Energy Technology Shows Promise",
    source: "Science Daily",
    summary: "Researchers have developed a new solar cell material that could increase efficiency by up to 40%, potentially revolutionizing renewable energy.",
    timeAgo: "1 day ago",
    sentiment: "positive",
    emotion: "hope",
    bias: "neutral",
    urgency: 5,
    votes: 78,
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1473308822086-710304d7d30c?q=80&w=2062&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Global Markets Tumble Amid Economic Uncertainty",
    source: "Financial Times",
    summary: "Major stock indices fell sharply as investors worry about inflation data and central bank policies. Tech stocks were particularly affected.",
    timeAgo: "3 hours ago",
    sentiment: "negative",
    emotion: "sadness",
    bias: "right",
    urgency: 7,
    votes: 42,
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Healthcare Reform Bill Passes with Bipartisan Support",
    source: "Policy Wire",
    summary: "After months of negotiation, lawmakers have reached agreement on comprehensive healthcare legislation aimed at reducing costs.",
    timeAgo: "7 hours ago",
    sentiment: "positive",
    emotion: "hope",
    bias: "neutral",
    urgency: 6,
    votes: 93,
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop"
  }
];

// Sample community posts
const communityPosts = [
  {
    id: 1,
    title: "Why We Need to Rethink Education in the AI Age",
    author: "Sarah Jensen",
    summary: "As AI continues to transform industries, our education system must evolve to prepare students for collaboration with intelligent systems.",
    timeAgo: "6 hours ago",
    sentiment: "positive",
    emotion: "hope",
    bias: "neutral",
    urgency: 5,
    votes: 132,
    verified: true,
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Overlooked Environmental Impact of Cryptocurrency Mining",
    author: "Marcus Lee",
    summary: "While blockchain technology offers promising applications, the energy consumption of cryptocurrency mining poses serious environmental challenges.",
    timeAgo: "1 day ago",
    sentiment: "negative",
    emotion: "anger",
    bias: "left",
    urgency: 6,
    votes: 86,
    verified: false,
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Investigating Food Supply Chain Vulnerabilities Post-Pandemic",
    author: "Aisha Patel",
    summary: "My six-month investigation reveals critical weaknesses in our global food distribution systems that still haven't been addressed since COVID-19.",
    timeAgo: "2 days ago",
    sentiment: "neutral",
    emotion: "calm",
    bias: "neutral",
    urgency: 7,
    votes: 214,
    verified: true,
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1519996409144-56c88c9aa612?q=80&w=2013&auto=format&fit=crop"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("ai-feed");
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area (spans 2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">TruthNet</h1>
                <p className="text-sm text-muted-foreground">Powered by TruthNet</p>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="flex items-center mr-2">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Claim Verification Section */}
            <ClaimVerifier />
            
            {/* Feed Tabs */}
            <Tabs defaultValue="ai-feed" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="ai-feed" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    GroqLens AI Feed
                  </TabsTrigger>
                  <TabsTrigger value="community-feed" className="flex items-center">
                    <MessageSquareText className="h-4 w-4 mr-2" />
                    TruthNet Community
                  </TabsTrigger>
                  <TabsTrigger value="dashboard" className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Truth Timeline
                  </TabsTrigger>
                  <TabsTrigger value="verification" className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Claim Verification
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="ai-feed" className="mt-4 space-y-4 animate-fade-in">
                <p className="text-muted-foreground text-sm">
                  GroqLens is analyzing news from 200+ global sources. Updated every 15 minutes.
                </p>
                
                <div className="space-y-4">
                  {newsData.map((news) => (
                    <NewsCard
                      key={news.id}
                      id={news.id}
                      title={news.title}
                      source={news.source}
                      summary={news.summary}
                      timeAgo={news.timeAgo}
                      sentiment={news.sentiment as any}
                      emotion={news.emotion as any}
                      bias={news.bias as any}
                      urgency={news.urgency}
                      votes={news.votes}
                      url={news.url}
                      imageUrl={news.imageUrl}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="community-feed" className="mt-4 space-y-4 animate-fade-in">
                <p className="text-muted-foreground text-sm">
                  Community journalism verified by readers. Posts are analyzed by GroqLens for clarity and bias.
                </p>
                
                <div className="space-y-4">
                  {communityPosts.map((post) => (
                    <NewsCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      source={`Author: ${post.author}`}
                      summary={post.summary}
                      timeAgo={post.timeAgo}
                      sentiment={post.sentiment as any}
                      emotion={post.emotion as any}
                      bias={post.bias as any}
                      urgency={post.urgency}
                      votes={post.votes}
                      url={post.url}
                      imageUrl={post.imageUrl}
                    />
                  ))}
                  
                  <div className="flex justify-center py-4">
                    <Button>
                      Load More Verified Claims
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="dashboard" className="mt-4 animate-fade-in">
                <SentimentDashboard />
              </TabsContent>

              <TabsContent value="verification" className="mt-4 space-y-6 animate-fade-in">
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h2 className="text-xl font-bold mb-2">Advanced Claim Verification</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Use our AI-powered fact-checking system to verify news claims, submit evidence, and participate in public debates.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar (spans 1 column) */}
          <div className="space-y-6">
            <UserValidation 
              score={86}
              username="Current User"
              recentActivity={{
                correctClaims: 12,
                incorrectClaims: 2,
                debatesWon: 5
              }}
            />

            <AskGroq />
            
            {activeTab === "community-feed" && (
              <UserProfile 
                name="Aisha Patel"
                avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2487&auto=format&fit=crop"
                rank="Trusted"
                xp={745}
                totalViews={24692}
                supportCount={128}
                verifiedPosts={8}
                joinedDate="June 2023"
                bio="Investigative journalist covering global food systems, supply chains, and economic policy. Former researcher at Global Food Security Institute."
              />
            )}
            
            {activeTab === "ai-feed" && (
              <Card className="bg-secondary/30 border border-border p-4 space-y-4">
                <h3 className="font-medium">Top Trending Topics</h3>
                <div className="space-y-2">
                  {["Climate Policy", "Tech Regulation", "Healthcare", "Market Volatility", "Energy Crisis"].map((topic, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 rounded hover:bg-secondary cursor-pointer">
                      <span>{topic}</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 200) + 20} stories
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">View All Topics</Button>
              </Card>
            )}
            
            {activeTab === "dashboard" && (
              <Card className="bg-secondary/30 border border-border p-4 space-y-4">
                <h3 className="font-medium">Emotion Timeline</h3>
                <p className="text-xs text-muted-foreground">24-hour trend of dominant emotions in news coverage</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-1/4 text-xs">12 AM - 6 AM</div>
                    <div className="w-3/4 h-4 bg-emotion-sadness rounded-md" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4 text-xs">6 AM - 12 PM</div>
                    <div className="w-3/4 h-4 bg-emotion-anger rounded-md" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4 text-xs">12 PM - 6 PM</div>
                    <div className="w-3/4 h-4 bg-emotion-hope rounded-md" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4 text-xs">6 PM - 12 AM</div>
                    <div className="w-3/4 h-4 bg-emotion-calm rounded-md" />
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">View Full Timeline</Button>
              </Card>
            )}
            
            {activeTab === "community-feed" && (
              <VotingSystem 
                initialTrust={86}
                initialNeutrality={45}
                initialClarity={4}
                verified={true}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
