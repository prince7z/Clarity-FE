import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Sparkles,
  BarChart3,
  TrendingUp,
  LineChart,
  FlaskConical,
  FileText,
  ChevronLeft,
  Settings,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Sparkles, label: "AI Copilot", href: "/copilot", badge: "AI" },
  { icon: BarChart3, label: "Metrics", href: "/metrics" },
  { icon: TrendingUp, label: "Trends", href: "/trends" },
  { icon: LineChart, label: "Forecasts", href: "/forecasts" },
  { icon: FlaskConical, label: "Experiments", href: "/experiments" },
  { icon: FileText, label: "Reports", href: "/reports" },
];

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-ai flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-sidebar-foreground">
              DecisionAI
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <button
              key={item.href}
              onClick={() => onNavigate(item.href)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded gradient-ai text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
          )}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 flex-shrink-0 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
