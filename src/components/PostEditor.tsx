
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, CheckCircle2, AlertCircle, Info, Image as ImageIcon, Link } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

const PostEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<null | {
    clarity: number;
    bias: { type: string; score: number };
    emotional: { detected: boolean; type: string | null };
    summary: string;
  }>(null);
  const { toast } = useToast();
  
  const handleAnalyze = () => {
    if (!title || !content) {
      toast({
        title: "Missing content",
        description: "Please provide both title and content for your post.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        clarity: Math.floor(Math.random() * 30) + 70, // 70-100
        bias: { 
          type: ['left', 'right', 'neutral'][Math.floor(Math.random() * 3)], 
          score: Math.floor(Math.random() * 100) 
        },
        emotional: { 
          detected: Math.random() > 0.7, 
          type: Math.random() > 0.7 ? ['anger', 'fear', 'hope'][Math.floor(Math.random() * 3)] : null 
        },
        summary: `${title} discusses important perspectives on ${category.toLowerCase() || 'this topic'} with several key points highlighting both challenges and opportunities.`
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: "GroqLens has analyzed your content.",
      });
    }, 2000);
  };
  
  const handlePublish = () => {
    toast({
      title: "Post published successfully",
      description: "Your post is now live on WorldWatch.",
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          Create a New Post
          <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded">WorldWatch</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Input
            placeholder="Enter a clear, engaging title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-medium"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="politics">Politics</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="culture">Culture</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <ImageIcon className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Link className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="write">
          <TabsList className="mb-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write" className="pt-2">
            <Textarea
              placeholder="Write your post here. Focus on clarity and factual information. You can use markdown formatting."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
          </TabsContent>
          <TabsContent value="preview" className="pt-2">
            <div className="border rounded-md p-4 min-h-[200px] prose prose-invert max-w-none">
              {content ? (
                <div>
                  <h2>{title}</h2>
                  <p>{content}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">Write some content to see the preview</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {isAnalyzing && (
          <div className="p-4 border rounded-md flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-center text-muted-foreground">
              GroqLens is analyzing your content for clarity, bias, and emotional tone...
            </p>
            <Progress value={65} className="w-1/2" />
          </div>
        )}
        
        {analysisResults && (
          <div className="space-y-3 border rounded-md p-4 animate-fade-in">
            <h3 className="font-medium">GroqLens Analysis Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-secondary rounded-md flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Clarity Score</span>
                  <span className="text-sm">
                    {analysisResults.clarity < 70 ? "Needs work" : 
                     analysisResults.clarity < 85 ? "Good" : "Excellent"}
                  </span>
                </div>
                <Progress value={analysisResults.clarity} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {analysisResults.clarity < 70 ? 
                   "Consider simplifying language and structure." : 
                   "Your writing is clear and easy to understand."}
                </p>
              </div>
              
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Bias Detection</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    analysisResults.bias.type === 'neutral' ? 
                    'bg-bias-neutral/20 text-bias-neutral' : 
                    analysisResults.bias.type === 'left' ? 
                    'bg-bias-left/20 text-bias-left' : 
                    'bg-bias-right/20 text-bias-right'
                  }`}>
                    {analysisResults.bias.type === 'neutral' ? 'Neutral' : 
                     analysisResults.bias.type === 'left' ? 'Left-leaning' : 'Right-leaning'}
                  </span>
                </div>
                <Progress 
                  value={analysisResults.bias.type === 'left' ? 
                         25 : analysisResults.bias.type === 'right' ? 
                         75 : 50} 
                  className="mt-2" 
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {analysisResults.bias.type === 'neutral' ? 
                   "Your content presents a balanced perspective." : 
                   `Consider including more ${analysisResults.bias.type === 'left' ? 'conservative' : 'progressive'} viewpoints.`}
                </p>
              </div>
              
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Emotional Tone</span>
                  {analysisResults.emotional.detected ? (
                    <span className="text-xs px-2 py-0.5 rounded bg-destructive/20 text-destructive">
                      Detected
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded bg-positive/20 text-positive">
                      Factual
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center">
                  {analysisResults.emotional.detected ? (
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-positive" />
                  )}
                  <span className="text-sm ml-2">
                    {analysisResults.emotional.detected ? 
                     `${analysisResults.emotional.type} language detected` : 
                     "No emotional manipulation detected"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {analysisResults.emotional.detected ? 
                   "Consider using more neutral language." : 
                   "Your content maintains a factual tone."}
                </p>
              </div>
            </div>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>AI Summary</AlertTitle>
              <AlertDescription className="text-sm">
                {analysisResults.summary}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline">Save Draft</Button>
        <div className="space-x-2">
          <Button variant="secondary" onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
                Analyzing
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 mr-2" /> 
                Analyze with GroqLens
              </>
            )}
          </Button>
          <Button onClick={handlePublish} disabled={!analysisResults}>Publish</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostEditor;
