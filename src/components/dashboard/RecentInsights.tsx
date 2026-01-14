import { Sparkles, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  type: "opportunity" | "risk" | "neutral";
}

const insights: Insight[] = [
  {
    id: "1",
    title: "Revenue Acceleration Detected",
    summary: "Enterprise segment showing 23% higher conversion rate than predicted. Consider reallocating marketing budget.",
    timestamp: "2 hours ago",
    type: "opportunity",
  },
  {
    id: "2",
    title: "Churn Risk in SMB Segment",
    summary: "14 accounts showing disengagement patterns similar to churned customers. Early intervention recommended.",
    timestamp: "4 hours ago",
    type: "risk",
  },
  {
    id: "3",
    title: "Campaign Performance Update",
    summary: "Q4 holiday campaign outperforming baseline by 18%. Current trajectory suggests $2.3M additional revenue.",
    timestamp: "6 hours ago",
    type: "opportunity",
  },
];

const typeStyles = {
  opportunity: "border-l-success",
  risk: "border-l-destructive",
  neutral: "border-l-primary",
};

export function RecentInsights() {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-glass animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-ai flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">AI-Generated Insights</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors">
          View all
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              "p-4 bg-secondary/30 rounded-xl border-l-4 hover:bg-secondary/50 transition-colors cursor-pointer",
              typeStyles[insight.type]
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.summary}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                <Clock className="w-3 h-3" />
                {insight.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
