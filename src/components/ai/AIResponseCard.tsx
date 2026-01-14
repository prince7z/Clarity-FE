import { Sparkles, TrendingUp, TrendingDown, Minus, BarChart3, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartData {
  label: string;
  value: number;
  change?: number;
}

interface AIResponseCardProps {
  question: string;
  answer: string;
  chartData?: ChartData[];
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  animationDelay?: number;
}

export function AIResponseCard({
  question,
  answer,
  chartData,
  suggestions,
  onSuggestionClick,
  animationDelay = 0,
}: AIResponseCardProps) {
  return (
    <div
      className="glass-card rounded-2xl p-6 shadow-glass animate-slide-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Question */}
      <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border/50">
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium">AC</span>
        </div>
        <p className="text-foreground pt-1">{question}</p>
      </div>

      {/* AI Response */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg gradient-ai flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-foreground leading-relaxed">{answer}</p>

          {/* Chart */}
          {chartData && chartData.length > 0 && (
            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Performance Overview</span>
              </div>

              <div className="space-y-3">
                {chartData.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground w-24 flex-shrink-0">
                      {item.label}
                    </span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-ai rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 w-20 justify-end">
                      <span className="text-sm font-medium">{item.value}%</span>
                      {item.change !== undefined && (
                        <span
                          className={cn(
                            "flex items-center text-xs",
                            item.change > 0
                              ? "text-success"
                              : item.change < 0
                              ? "text-destructive"
                              : "text-muted-foreground"
                          )}
                        >
                          {item.change > 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : item.change < 0 ? (
                            <TrendingDown className="w-3 h-3" />
                          ) : (
                            <Minus className="w-3 h-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className="px-3 py-1.5 text-sm bg-secondary/50 hover:bg-secondary text-foreground rounded-full border border-border/50 hover:border-primary/30 transition-all duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
