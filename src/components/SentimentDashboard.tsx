
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';

// Simulated data for sentiment distribution
const sentimentData = [
  { category: 'Politics', positive: 30, neutral: 45, negative: 25 },
  { category: 'Economy', positive: 20, neutral: 35, negative: 45 },
  { category: 'Technology', positive: 60, neutral: 30, negative: 10 },
  { category: 'Health', positive: 40, neutral: 40, negative: 20 },
  { category: 'Environment', positive: 15, neutral: 25, negative: 60 },
];

// Simulated data for emotion tracking
const emotionTrends = [
  { time: '9AM', anger: 20, sadness: 30, hope: 40, calm: 10 },
  { time: '12PM', anger: 25, sadness: 25, hope: 35, calm: 15 },
  { time: '3PM', anger: 35, sadness: 20, hope: 30, calm: 15 },
  { time: '6PM', anger: 30, sadness: 30, hope: 25, calm: 15 },
  { time: '9PM', anger: 15, sadness: 35, hope: 30, calm: 20 },
];

const SentimentDashboard = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Global Sentiment Overview</CardTitle>
                <CardDescription>Sentiment distribution across major news categories</CardDescription>
              </div>
              <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                <TrendingDown className="h-3 w-3 mr-1 text-negative" /> 12% negative shift today
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sentimentData} barGap={0} barCategoryGap={20}>
                <XAxis dataKey="category" tick={{ fill: '#888' }} />
                <YAxis tickFormatter={(tick) => `${tick}%`} tick={{ fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(222 47% 14%)', borderColor: 'hsl(217.2 32.6% 17.5%)', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="positive" stackId="a" fill="#1ED760" name="Positive" />
                <Bar dataKey="neutral" stackId="a" fill="#6C7192" name="Neutral" />
                <Bar dataKey="negative" stackId="a" fill="#FF4949" name="Negative" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Current Alert Level</CardTitle>
            <CardDescription>Based on urgency scores across all sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-8 border-destructive">
                <div className="absolute inset-0 rounded-full animate-pulse-slow bg-destructive/20"></div>
                <div className="text-center">
                  <AlertTriangle className="h-12 w-12 mx-auto text-destructive" />
                  <h3 className="text-2xl font-bold mt-1">HIGH</h3>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Technology</span>
                  <span>Moderate</span>
                </div>
                <Progress value={45} className="h-2 bg-muted" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Politics</span>
                  <span>Critical</span>
                </div>
                <Progress value={85} className="h-2 bg-muted" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Environment</span>
                  <span>High</span>
                </div>
                <Progress value={65} className="h-2 bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Emotion Tracking</CardTitle>
              <CardDescription>24-hour emotional trend in news coverage</CardDescription>
            </div>
            <Badge variant="outline" className="bg-secondary text-secondary-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-emotion-hope" /> Hope rising
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="pt-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={emotionTrends} barGap={0} barCategoryGap={20}>
                  <XAxis dataKey="time" tick={{ fill: '#888' }} />
                  <YAxis tickFormatter={(tick) => `${tick}%`} tick={{ fill: '#888' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(222 47% 14%)', borderColor: 'hsl(217.2 32.6% 17.5%)', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="anger" fill="#E53935" name="Anger" />
                  <Bar dataKey="sadness" fill="#42A5F5" name="Sadness" />
                  <Bar dataKey="hope" fill="#66BB6A" name="Hope" />
                  <Bar dataKey="calm" fill="#5E35B1" name="Calm" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="summary" className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary">
                  <h3 className="font-semibold mb-2 text-emotion-anger">Anger Trend</h3>
                  <p className="text-sm text-foreground/80">Rising in political news (+15%), falling in technology news (-8%). Overall stable at 25%.</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <h3 className="font-semibold mb-2 text-emotion-sadness">Sadness Trend</h3>
                  <p className="text-sm text-foreground/80">Increased in environmental coverage (+23%), stable in economic news. Overall rising trend.</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <h3 className="font-semibold mb-2 text-emotion-hope">Hope Trend</h3>
                  <p className="text-sm text-foreground/80">Significant increase in health news (+28%), growing optimism in tech sector coverage.</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <h3 className="font-semibold mb-2 text-emotion-calm">Calm Trend</h3>
                  <p className="text-sm text-foreground/80">Steady increase throughout the day (+10%), particularly in financial market coverage.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentDashboard;
