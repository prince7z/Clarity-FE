import { TrendingUp, AlertTriangle, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  color: "primary" | "success" | "warning" | "destructive";
}

const actions: QuickAction[] = [
  {
    icon: TrendingUp,
    label: "View Top Performers",
    description: "See what's driving growth",
    color: "success",
  },
  {
    icon: AlertTriangle,
    label: "3 Anomalies Detected",
    description: "Review flagged metrics",
    color: "warning",
  },
  {
    icon: Target,
    label: "Goal Progress",
    description: "Q4 targets at 78%",
    color: "primary",
  },
  {
    icon: Zap,
    label: "Quick Forecast",
    description: "Run a 30-day simulation",
    color: "primary",
  },
];

const colorMap = {
  primary: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
  success: "bg-success/10 text-success border-success/20 hover:bg-success/15",
  warning: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/15",
  destructive: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15",
};

interface QuickActionsProps {
  onActionClick?: (action: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {actions.map((action, index) => (
        <button
          key={action.label}
          onClick={() => onActionClick?.(action.label)}
          className={cn(
            "flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 text-left animate-slide-up",
            colorMap[action.color]
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <action.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">{action.label}</p>
            <p className="text-xs opacity-70 mt-0.5">{action.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
