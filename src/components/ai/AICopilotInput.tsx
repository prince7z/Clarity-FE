import { useState } from "react";
import { Sparkles, ArrowUp, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface AICopilotInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}

export function AICopilotInput({ onSubmit, isLoading }: AICopilotInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="glass-card rounded-2xl p-2 shadow-glass-lg">
        <div className="flex items-start gap-3 p-3">
          <div className="w-10 h-10 rounded-xl gradient-ai flex items-center justify-center flex-shrink-0 animate-float">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything about your data..."
            rows={1}
            className={cn(
              "flex-1 bg-transparent resize-none text-lg placeholder:text-muted-foreground outline-none py-2 min-h-[40px] max-h-32",
              "focus:placeholder:text-muted-foreground/50 transition-colors"
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>

            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className={cn(
                "p-2.5 rounded-xl transition-all duration-200",
                message.trim() && !isLoading
                  ? "gradient-ai text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
                  : "bg-secondary text-muted-foreground cursor-not-allowed"
              )}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
