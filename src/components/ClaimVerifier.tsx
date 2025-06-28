
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  Upload, 
  MessageSquare,
  Shield,
  Link as LinkIcon,
  Loader2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ProofValidator from './ProofValidator';
import DebateRoom from './DebateRoom';

interface VerificationResult {
  verdict: 'True' | 'False' | 'Partially True' | 'Misleading' | 'Unverified';
  truthScore: number;
  explanation: string;
  sources: { title: string; url: string; }[];
  onChainHash?: string;
}

const ClaimVerifier = () => {
  const [claim, setClaim] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [showDebate, setShowDebate] = useState(false);
  const { toast } = useToast();

  const handleVerifyClaim = async () => {
    if (!claim.trim()) {
      toast({
        title: "Please enter a claim",
        description: "Enter a news headline or claim to verify.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate AI fact-checking process
    setTimeout(() => {
      const verdicts: VerificationResult['verdict'][] = ['True', 'False', 'Partially True', 'Misleading', 'Unverified'];
      const randomVerdict = verdicts[Math.floor(Math.random() * verdicts.length)];
      const truthScore = Math.floor(Math.random() * 100);
      
      const mockResult: VerificationResult = {
        verdict: randomVerdict,
        truthScore,
        explanation: `Based on cross-referencing multiple reliable sources, this claim has been ${randomVerdict.toLowerCase()}. The analysis considered factual accuracy, context, and source credibility.`,
        sources: [
          { title: "Reuters - Fact Check", url: "#" },
          { title: "Associated Press News", url: "#" },
          { title: "BBC News Verification", url: "#" }
        ],
        onChainHash: `0x${Math.random().toString(16).substring(2, 42)}`
      };
      
      setResult(mockResult);
      setIsVerifying(false);
      
      toast({
        title: "Verification Complete",
        description: `Claim verified with ${truthScore}% confidence.`
      });
    }, 2000);
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'True': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'False': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Partially True': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'Misleading': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          News Claim Verification
          <Badge variant="outline" className="ml-2">Powered by TruthNet</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Textarea
            placeholder="Enter a news headline or claim to verify..."
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            className="min-h-[80px]"
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleVerifyClaim} 
              disabled={isVerifying}
              className="flex-1"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Verify Claim
                </>
              )}
            </Button>
            
            {result && (
              <Button 
                variant="outline" 
                onClick={() => setShowDebate(!showDebate)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Debate
              </Button>
            )}
          </div>
        </div>

        {result && (
          <div className="space-y-4 animate-fade-in">
            <Alert className="border-l-4 border-l-primary">
              <div className="flex items-start space-x-3">
                {getVerdictIcon(result.verdict)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">✅ AI Verdict: {result.verdict}</span>
                    <span className={`font-bold ${getScoreColor(result.truthScore)}`}>
                      {result.truthScore}% Truth Score
                    </span>
                  </div>
                  <AlertDescription className="text-sm">
                    {result.explanation}
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center">
                🔗 Sources
              </h4>
              <div className="grid gap-2">
                {result.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded border hover:bg-secondary"
                  >
                    <span className="text-sm">{source.title}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {result.onChainHash && (
              <div className="p-3 bg-secondary/30 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">🧬 On-chain Verified</span>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <LinkIcon className="h-3 w-3 mr-1" />
                    View Transaction
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Hash: {result.onChainHash}
                </p>
              </div>
            )}

            <Tabs defaultValue="proofs" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="proofs">Submit Proof</TabsTrigger>
                <TabsTrigger value="debate">Join Debate</TabsTrigger>
              </TabsList>
              
              <TabsContent value="proofs">
                <ProofValidator claimId={claim} />
              </TabsContent>
              
              <TabsContent value="debate">
                {showDebate ? (
                  <DebateRoom claim={claim} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                    <p>Click "Start Debate" to begin public discussion</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClaimVerifier;
