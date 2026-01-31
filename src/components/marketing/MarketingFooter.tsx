import { Link } from "react-router-dom";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl gradient-ai" aria-hidden="true" />
              <div>
                <div className="text-sm font-semibold">Clarity AI</div>
                <div className="text-xs text-muted-foreground">Investor-ready decks, on demand</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate enterprise-grade PPTs that match your reference style—clean layouts, strong visuals, and data-driven slides.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Product</div>
            <div className="flex flex-col gap-2 text-sm">
              <Link className="text-muted-foreground hover:text-foreground" to="/features">
                Features
              </Link>
              <Link className="text-muted-foreground hover:text-foreground" to="/pricing">
                Pricing
              </Link>
              <Link className="text-muted-foreground hover:text-foreground" to="/studio">
                Studio
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Company</div>
            <div className="flex flex-col gap-2 text-sm">
              <Link className="text-muted-foreground hover:text-foreground" to="/contact">
                Contact
              </Link>
              <a className="text-muted-foreground hover:text-foreground" href="#" onClick={(e) => e.preventDefault()}>
                Security
              </a>
              <a className="text-muted-foreground hover:text-foreground" href="#" onClick={(e) => e.preventDefault()}>
                Terms
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Get started</div>
            <p className="text-sm text-muted-foreground">
              Have a reference deck? Start with the Studio and generate a first draft in minutes.
            </p>
            <Link
              to="/studio"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-primary-foreground gradient-ai hover:opacity-90"
            >
              Generate a deck
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Clarity AI. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
