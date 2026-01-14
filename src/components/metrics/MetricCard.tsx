import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  confidence?: number;
  aiInsight?: string;
  icon?: React.ReactNode;
  animationDelay?: number;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel = "vs last period",
  confidence,
  aiInsight,
  icon,
  animationDelay = 0,
}: MetricCardProps) {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return "bg-success";
    if (conf >= 60) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div
      className="glass-card rounded-xl p-5 shadow-soft hover:shadow-glass transition-all duration-300 group animate-slide-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
        </div>

        {aiInsight && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-all">
                <Info className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs bg-popover border-border">
              <p className="text-sm">{aiInsight}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-semibold text-foreground mb-1">{value}</p>

          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "flex items-center gap-0.5 text-sm font-medium",
                  change > 0
                    ? "text-success"
                    : change < 0
                    ? "text-destructive"
                    : "text-muted-foreground"
                )}
              >
                {change > 0 ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : change < 0 ? (
                  <TrendingDown className="w-3.5 h-3.5" />
                ) : (
                  <Minus className="w-3.5 h-3.5" />
                )}
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          )}
        </div>

        {confidence !== undefined && (
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Confidence
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    getConfidenceColor(confidence)
                  )}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {confidence}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
