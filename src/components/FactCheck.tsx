
import React, { useState } from 'react';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FactCheckProps {
  title: string;
  summary: string;
}

const FactCheck: React.FC<FactCheckProps> = ({ title, summary }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const { toast } = useToast();

  const handleFactCheck = async () => {
    setLoading(true);
    
    // Simulate AI fact checking (in a real app, this would call an AI service)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a simulated AI response
      const responses = [
        "This claim appears to be accurate based on recent data from reputable sources.",
        "This claim contains partial truths but lacks important context.",
        "This claim is misleading. While technically correct in parts, it omits critical information.",
        "This claim contains significant factual errors according to multiple reliable sources.",
        "This claim needs clarification. The terminology used is ambiguous.",
      ];
      
      // Randomly select a response for demo purposes
      const aiResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setResult(aiResponse);
      setLoading(false);
    } catch (error) {
      console.error("Fact checking failed:", error);
      toast({
        title: "Error",
        description: "Failed to perform fact check. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const submitCounterpoint = () => {
    if (!userInput.trim()) {
      toast({
        title: "Input required",
        description: "Please provide your counterpoint before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Counterpoint submitted",
      description: "Your perspective has been added to the discussion.",
    });
    
    setOpen(false);
    setUserInput('');
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center text-xs text-muted-foreground hover:text-primary"
        onClick={() => setOpen(true)}
      >
        <AlertCircle className="h-3 w-3 mr-1" />
        Fact Check
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>GroqLens Fact Check</DialogTitle>
            <DialogDescription>
              Verify claims and add your perspective to this content.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Original Claim:</h3>
              <div className="rounded-md bg-muted p-3 text-sm">
                <p className="font-medium">{title}</p>
                <p className="text-muted-foreground mt-1">{summary}</p>
              </div>
            </div>
            
            {!result && !loading && (
              <Button 
                onClick={handleFactCheck} 
                className="w-full flex items-center justify-center"
              >
                <Check className="h-4 w-4 mr-2" />
                Run AI Fact Check
              </Button>
            )}
            
            {loading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2">Analyzing facts...</span>
              </div>
            )}
            
            {result && (
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  AI Analysis:
                </h3>
                <div className="rounded-md bg-secondary p-3 text-sm">
                  {result}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="font-medium">Add Your Perspective:</h3>
              <Textarea 
                placeholder="Share your research or counter perspective..." 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={submitCounterpoint}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FactCheck;
