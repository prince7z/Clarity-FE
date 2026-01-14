import { useState, useEffect } from "react";
import { Search, Command } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CommandBarProps {
  onAskAI: (question: string) => void;
}

export function CommandBar({ onAskAI }: CommandBarProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onAskAI(query);
      setQuery("");
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 px-4 py-2.5 bg-secondary/50 hover:bg-secondary border border-border rounded-xl text-sm text-muted-foreground transition-all duration-200 hover:shadow-soft group"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Ask AI anything...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 bg-background rounded-md text-[11px] font-medium border border-border">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 max-w-2xl overflow-hidden bg-card/95 backdrop-blur-xl border-border/50">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ask anything about your data..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
                autoFocus
              />
              <kbd className="px-2 py-1 bg-muted rounded-md text-[11px] font-medium text-muted-foreground">
                ESC
              </kbd>
            </div>
          </form>

          <div className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Suggestions
            </p>
            <div className="space-y-1">
              {[
                "What's driving revenue growth this month?",
                "Show me top performing products",
                "Compare Q3 vs Q4 performance",
                "Why did churn spike last week?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    onAskAI(suggestion);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors text-left"
                >
                  <Search className="w-4 h-4 flex-shrink-0" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
