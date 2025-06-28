
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProofItem {
  id: string;
  type: 'link' | 'text' | 'file';
  content: string;
  validation?: {
    strength: 'Strong' | 'Weak' | 'Irrelevant' | 'Fake';
    reason: string;
  };
}

interface ProofValidatorProps {
  claimId: string;
}

const ProofValidator: React.FC<ProofValidatorProps> = ({ claimId }) => {
  const [proofs, setProofs] = useState<ProofItem[]>([]);
  const [linkInput, setLinkInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [validating, setValidating] = useState<string | null>(null);
  const { toast } = useToast();

  const addProof = (type: 'link' | 'text', content: string) => {
    if (!content.trim()) return;

    const newProof: ProofItem = {
      id: Date.now().toString(),
      type,
      content: content.trim()
    };

    setProofs(prev => [...prev, newProof]);
    validateProof(newProof);

    if (type === 'link') setLinkInput('');
    if (type === 'text') setTextInput('');
  };

  const validateProof = async (proof: ProofItem) => {
    setValidating(proof.id);

    // Simulate AI validation
    setTimeout(() => {
      const strengths: ProofItem['validation']['strength'][] = ['Strong', 'Weak', 'Irrelevant', 'Fake'];
      const randomStrength = strengths[Math.floor(Math.random() * strengths.length)];
      
      const reasons = {
        'Strong': 'Evidence is from a credible source and directly supports the claim.',
        'Weak': 'Evidence has some relevance but lacks strong credibility or context.',
        'Irrelevant': 'Evidence does not relate to the specific claim being verified.',
        'Fake': 'Evidence appears to be fabricated or from an unreliable source.'
      };

      setProofs(prev => prev.map(p => 
        p.id === proof.id 
          ? { ...p, validation: { strength: randomStrength, reason: reasons[randomStrength] } }
          : p
      ));

      setValidating(null);

      toast({
        title: "Proof Validated",
        description: `Evidence strength: ${randomStrength}`
      });
    }, 1500);
  };

  const getStrengthBadge = (strength: string) => {
    const config = {
      'Strong': { variant: 'default' as const, color: 'bg-green-500' },
      'Weak': { variant: 'secondary' as const, color: 'bg-yellow-500' },
      'Irrelevant': { variant: 'outline' as const, color: 'bg-gray-500' },
      'Fake': { variant: 'destructive' as const, color: 'bg-red-500' }
    };

    return config[strength as keyof typeof config] || config.Weak;
  };

  const getStrengthIcon = (strength: string) => {
    switch (strength) {
      case 'Strong': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Weak': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'Irrelevant': return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      case 'Fake': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h3 className="font-medium">📎 Submit Supporting Evidence</h3>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Paste a link to supporting evidence..."
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addProof('link', linkInput)}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addProof('link', linkInput)}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Textarea
              placeholder="Quote or describe supporting evidence..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="min-h-[60px]"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addProof('text', textInput)}
            >
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {proofs.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Submitted Evidence</h4>
          <div className="space-y-2">
            {proofs.map((proof) => (
              <Card key={proof.id} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {proof.type === 'link' ? <LinkIcon className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                        <span className="text-sm font-medium">
                          {proof.type === 'link' ? 'Link Evidence' : 'Text Evidence'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground break-words">
                        {proof.content}
                      </p>
                      
                      {proof.validation && (
                        <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
                          <div className="flex items-center gap-2 mb-1">
                            {getStrengthIcon(proof.validation.strength)}
                            <span className="font-medium">AI Validation: {proof.validation.strength}</span>
                          </div>
                          <p>{proof.validation.reason}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-2 flex flex-col items-end gap-2">
                      {validating === proof.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : proof.validation ? (
                        <Badge {...getStrengthBadge(proof.validation.strength)}>
                          {proof.validation.strength}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProofValidator;
