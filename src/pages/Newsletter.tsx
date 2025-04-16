
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Newspaper, 
  Sliders,
  Send,
  Heart
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Newsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("daily");
  
  // Topics state
  const [selectedTopics, setSelectedTopics] = useState([
    { id: 1, name: "Global News", selected: true },
    { id: 2, name: "Technology", selected: true },
    { id: 3, name: "Climate", selected: false },
    { id: 4, name: "Politics", selected: false },
    { id: 5, name: "Business", selected: false },
    { id: 6, name: "Health", selected: true },
    { id: 7, name: "Science", selected: false },
    { id: 8, name: "Culture", selected: false }
  ]);
  
  // Emotion preferences state
  const [emotionPrefs, setEmotionPrefs] = useState([
    { id: 1, name: "Hopeful", selected: true },
    { id: 2, name: "Neutral", selected: true },
    { id: 3, name: "Controversial", selected: false }
  ]);
  
  const handleTopicToggle = (id: number) => {
    setSelectedTopics(selectedTopics.map(topic => 
      topic.id === id ? { ...topic, selected: !topic.selected } : topic
    ));
  };
  
  const handleEmotionToggle = (id: number) => {
    setEmotionPrefs(emotionPrefs.map(emotion => 
      emotion.id === id ? { ...emotion, selected: !emotion.selected } : emotion
    ));
  };
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    const selectedTopicNames = selectedTopics
      .filter(topic => topic.selected)
      .map(topic => topic.name);
      
    if (selectedTopicNames.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one topic",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: `You've subscribed to the ${frequency} newsletter.`,
      action: (
        <div className="flex items-center">
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-1" />
        </div>
      ),
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">WorldWatch Newsletter</h1>
            </div>
            
            <Card className="p-6 border border-border bg-card">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-xl font-semibold mb-4">Subscribe to the Newsletter</h2>
                  <p className="text-muted-foreground mb-6">
                    Get personalized AI-curated news delivered to your inbox. Choose topics you care about, 
                    preferred emotional tone, and delivery frequency.
                  </p>
                  
                  <form onSubmit={handleSubscribe} className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex">
                        <Input 
                          id="email"
                          type="email" 
                          placeholder="your@email.com" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Delivery Frequency</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          type="button"
                          variant={frequency === "daily" ? "default" : "outline"} 
                          className="flex items-center justify-center"
                          onClick={() => setFrequency("daily")}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Daily
                        </Button>
                        <Button 
                          type="button"
                          variant={frequency === "weekly" ? "default" : "outline"} 
                          className="flex items-center justify-center"
                          onClick={() => setFrequency("weekly")}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Weekly
                        </Button>
                        <Button 
                          type="button"
                          variant={frequency === "monthly" ? "default" : "outline"} 
                          className="flex items-center justify-center"
                          onClick={() => setFrequency("monthly")}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Monthly
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full flex items-center justify-center">
                      <Mail className="h-5 w-5 mr-2" />
                      Subscribe Now
                    </Button>
                  </form>
                </div>
                
                <div className="md:w-1/2">
                  <h3 className="font-medium mb-3">Select Topics</h3>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {selectedTopics.map((topic) => (
                      <Button 
                        key={topic.id}
                        type="button"
                        variant={topic.selected ? "default" : "outline"} 
                        className="flex items-center justify-center"
                        onClick={() => handleTopicToggle(topic.id)}
                      >
                        {topic.name}
                      </Button>
                    ))}
                  </div>
                  
                  <h3 className="font-medium mb-3">Content Preferences</h3>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {emotionPrefs.map((emotion) => (
                      <Button 
                        key={emotion.id}
                        type="button"
                        variant={emotion.selected ? "default" : "outline"} 
                        className="flex items-center justify-center"
                        onClick={() => handleEmotionToggle(emotion.id)}
                      >
                        {emotion.name}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                    <h4 className="flex items-center font-medium">
                      <Heart className="h-4 w-4 mr-2 text-red-400" />
                      Why Subscribe?
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        AI-curated content based on your preferences
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        Sentiment analysis and emotional impact insights
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        Most trusted community stories and debates
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Editions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: 1, 
                    title: "Global Tech Shifts & Climate Innovation", 
                    date: "Jun 15, 2025", 
                    topics: ["Technology", "Climate"],
                    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
                  },
                  {
                    id: 2, 
                    title: "Health Breakthroughs & Global News Roundup", 
                    date: "Jun 8, 2025", 
                    topics: ["Health", "Global News"],
                    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
                  },
                  {
                    id: 3, 
                    title: "Technology Transformations & Community Voices", 
                    date: "Jun 1, 2025", 
                    topics: ["Technology", "Community"],
                    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                  },
                  {
                    id: 4, 
                    title: "Global Affairs & Science Innovations", 
                    date: "May 25, 2025", 
                    topics: ["Global News", "Science"],
                    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop"
                  }
                ].map(edition => (
                  <Card key={edition.id} className="overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-md transition-shadow">
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={edition.imageUrl} 
                        alt={edition.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-medium">{edition.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-2 mb-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {edition.date}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {edition.topics.map((topic, idx) => (
                          <span key={idx} className="text-xs bg-primary/10 px-2 py-0.5 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">View All Archives</Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-secondary/30 border border-border p-4 space-y-4">
              <h3 className="font-medium">Newsletter Features</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded mr-3">
                    <Sliders className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Fully Customizable</h4>
                    <p className="text-xs text-muted-foreground">Select topics, emotions, and frequency.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded mr-3">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Time-Saving</h4>
                    <p className="text-xs text-muted-foreground">Get curated content delivered directly to you.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded mr-3">
                    <Newspaper className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">AI-Powered Insights</h4>
                    <p className="text-xs text-muted-foreground">GroqLens analyzes sentiment across all content.</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 space-y-4 bg-gradient-to-br from-primary/10 to-accent/5 border border-border">
              <h3 className="font-medium">This Week's Spotlight</h3>
              <p className="text-sm text-muted-foreground">
                Our weekly digest highlighted the rise in climate-focused innovation and the growing public interest in sustainable technologies.
              </p>
              <div className="flex justify-between">
                <div className="text-xs">
                  <span className="block">Sentiment:</span>
                  <span className="font-medium text-green-400">Hopeful</span>
                </div>
                <div className="text-xs">
                  <span className="block">Top Readers:</span>
                  <span className="font-medium">3,274</span>
                </div>
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Read Sample
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Newsletter;
