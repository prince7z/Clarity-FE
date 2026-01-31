import { Bell, User } from "lucide-react";
import { CommandBar } from "./CommandBar";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAskAI: (question: string) => void;
}

const scrollToPricing = () => {
  const pricingSection = document.getElementById('pricing-section');
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export function Header({ onAskAI }: HeaderProps) {
  return (
    <header className="h-16 bg-card/50 backdrop-blur-sm border-b border-border flex items-center justify-between px-6">
      <div className="flex-1 max-w-xl">
        <CommandBar onAskAI={onAskAI} />
      </div>

      <div className="flex items-center gap-3">
        <Button 
          onClick={scrollToPricing}
          variant="outline"
        >
          Pricing
        </Button>
        
        <button className="relative p-2.5 rounded-xl hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </button>

        <button className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl hover:bg-secondary transition-colors">
          <div className="w-8 h-8 rounded-lg gradient-ai flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground hidden sm:inline">
            Alex Chen
          </span>
        </button>
      </div>
    </header>
  );
}
