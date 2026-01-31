import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AICopilotInput } from "@/components/ai/AICopilotInput";
import { AIResponseCard } from "@/components/ai/AIResponseCard";
import { MetricCard } from "@/components/metrics/MetricCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentInsights } from "@/components/dashboard/RecentInsights";
import { DollarSign, Users, ShoppingCart, Activity } from "lucide-react";

interface AIConversation {
  question: string;
  answer: string;
  chartData?: { label: string; value: number; change?: number }[];
  suggestions?: string[];
}

const sampleConversations: AIConversation[] = [
  {
    question: "What's driving revenue growth this month?",
    answer: "Revenue is up 23% this month, primarily driven by three factors: 1) Enterprise segment showing exceptional performance with 45% higher deal sizes, 2) The holiday campaign launched last week is converting at 2.3x the baseline rate, and 3) Self-serve upgrades increased by 18% following the new pricing tier introduction.",
    chartData: [
      { label: "Enterprise", value: 85, change: 45 },
      { label: "Mid-Market", value: 72, change: 12 },
      { label: "SMB", value: 58, change: -3 },
      { label: "Self-Serve", value: 64, change: 18 },
    ],
    suggestions: ["Drill deeper into Enterprise", "Compare to last quarter", "Show customer breakdown"],
  },
];

const metrics = [
  {
    title: "Monthly Revenue",
    value: "$1.24M",
    change: 23,
    confidence: 94,
    aiInsight: "Revenue is trending 15% above forecast. Enterprise segment is the primary driver.",
    icon: <DollarSign className="w-4 h-4" />,
  },
  {
    title: "Active Users",
    value: "48.2K",
    change: 8,
    confidence: 89,
    aiInsight: "User growth is healthy but slightly below last month's pace. Consider re-engagement campaigns.",
    icon: <Users className="w-4 h-4" />,
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    change: 12,
    confidence: 92,
    aiInsight: "Conversion is at an all-time high. New onboarding flow is performing exceptionally well.",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  {
    title: "Health Score",
    value: "87",
    change: 5,
    confidence: 78,
    aiInsight: "Overall platform health is strong. Minor infrastructure concerns flagged for review.",
    icon: <Activity className="w-4 h-4" />,
  },
];

export default function Index() {
  const [currentPath, setCurrentPath] = useState("/");
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = (question: string) => {
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const newConversation: AIConversation = {
        question,
        answer: `Based on my analysis of your data, I found several interesting patterns related to "${question}". The data shows positive momentum across key metrics, with particular strength in the Enterprise segment. I recommend focusing on the areas showing the highest growth potential while monitoring the SMB segment for any concerning trends.`,
        chartData: [
          { label: "Performance", value: Math.floor(Math.random() * 30) + 70, change: Math.floor(Math.random() * 20) - 5 },
          { label: "Engagement", value: Math.floor(Math.random() * 30) + 60, change: Math.floor(Math.random() * 15) },
          { label: "Retention", value: Math.floor(Math.random() * 20) + 75, change: Math.floor(Math.random() * 10) },
        ],
        suggestions: ["Show detailed breakdown", "Compare periods", "Export analysis"],
      };
      
      setConversations((prev) => [newConversation, ...prev]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar currentPath={currentPath} onNavigate={setCurrentPath} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onAskAI={handleAskAI} />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2 animate-fade-in">
              <h1 className="text-3xl font-semibold text-foreground">
                Good morning, Alex
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your business today.
              </p>
            </div>

            {/* Quick Actions */}
            <QuickActions onActionClick={handleAskAI} />

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={metric.title}
                  {...metric}
                  animationDelay={index * 50}
                />
              ))}
            </div>

            {/* AI Copilot Section */}
            <div className="space-y-6">
              <AICopilotInput onSubmit={handleAskAI} isLoading={isLoading} />

              {/* Loading State */}
              {isLoading && (
                <div className="glass-card rounded-2xl p-6 shadow-glass animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-ai animate-pulse-soft" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-secondary rounded w-3/4" />
                      <div className="h-4 bg-secondary rounded w-1/2" />
                    </div>
                  </div>
                </div>
              )}

              {/* Conversations */}
              {conversations.map((conv, index) => (
                <AIResponseCard
                  key={index}
                  question={conv.question}
                  answer={conv.answer}
                  chartData={conv.chartData}
                  suggestions={conv.suggestions}
                  onSuggestionClick={handleAskAI}
                  animationDelay={0}
                />
              ))}

              {/* Sample Conversation */}
              {conversations.length === 0 && !isLoading && (
                <AIResponseCard
                  question={sampleConversations[0].question}
                  answer={sampleConversations[0].answer}
                  chartData={sampleConversations[0].chartData}
                  suggestions={sampleConversations[0].suggestions}
                  onSuggestionClick={handleAskAI}
                  animationDelay={300}
                />
              )}
            </div>

            {/* Recent Insights */}
            <RecentInsights />

            {/* Pricing Section */}
            <div id="pricing-section" className="space-y-6 pt-12">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-semibold text-foreground">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-muted-foreground">
                  Choose the plan that's right for your business
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* Starter Plan */}
                <div className="glass-card rounded-2xl p-6 shadow-glass hover:shadow-xl transition-shadow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Starter</h3>
                      <div className="mt-2">
                        <span className="text-4xl font-bold text-foreground">$29</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">Perfect for small businesses getting started</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Up to 5 users</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Basic analytics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">AI insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Email support</span>
                      </li>
                    </ul>
                    <button className="w-full py-2.5 px-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors font-medium">
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Professional Plan */}
                <div className="glass-card rounded-2xl p-6 shadow-glass hover:shadow-xl transition-shadow border-2 border-primary relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    POPULAR
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Professional</h3>
                      <div className="mt-2">
                        <span className="text-4xl font-bold text-foreground">$99</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">For growing teams that need more power</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Up to 20 users</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Advanced analytics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Advanced AI insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Priority support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Custom integrations</span>
                      </li>
                    </ul>
                    <button className="w-full py-2.5 px-4 rounded-xl gradient-ai text-primary-foreground hover:opacity-90 transition-opacity font-medium">
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Enterprise Plan */}
                <div className="glass-card rounded-2xl p-6 shadow-glass hover:shadow-xl transition-shadow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Enterprise</h3>
                      <div className="mt-2">
                        <span className="text-4xl font-bold text-foreground">Custom</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">For large organizations with custom needs</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Unlimited users</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Enterprise analytics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Custom AI models</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">24/7 dedicated support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">Custom SLA</span>
                      </li>
                    </ul>
                    <button className="w-full py-2.5 px-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors font-medium">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
