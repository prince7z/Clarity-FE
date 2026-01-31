import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { ArrowRight, BarChart3, Brush, FileSpreadsheet, FileUp, LayoutTemplate, Lock, Presentation, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="py-14 md:py-18">
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 gradient-ai-subtle" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Chip
                size="small"
                label="Enterprise-grade output"
                sx={{
                  borderRadius: "999px",
                  backgroundColor: "hsl(var(--card) / 0.7)",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  fontWeight: 600,
                }}
              />
              <Chip
                size="small"
                label="Reference-style matching"
                sx={{
                  borderRadius: "999px",
                  backgroundColor: "hsl(var(--card) / 0.7)",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  fontWeight: 600,
                }}
              />
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Features built to ship decks faster—
              <span className="gradient-ai-text"> without sacrificing polish</span>.
            </h1>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Clarity AI takes a reference PPT (or Reference ID), extracts the design language, then generates a clean slide narrative from
              structured inputs and data.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                component={Link}
                to="/studio"
                variant="contained"
                disableElevation
                endIcon={<ArrowRight className="h-4 w-4" />}
                sx={{
                  textTransform: "none",
                  borderRadius: "14px",
                  paddingX: 3,
                  paddingY: 1.5,
                  fontWeight: 800,
                  background: "var(--gradient-ai)",
                  "&:hover": { background: "var(--gradient-ai)", opacity: 0.92 },
                }}
              >
                Open Studio
              </Button>
              <Button
                component={Link}
                to="/pricing"
                variant="outlined"
                disableElevation
                sx={{
                  textTransform: "none",
                  borderRadius: "14px",
                  paddingX: 3,
                  paddingY: 1.5,
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  "&:hover": {
                    borderColor: "hsl(var(--border))",
                    backgroundColor: "hsl(var(--muted) / 0.6)",
                  },
                }}
              >
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Reference style extraction",
              desc: "Clarity AI reads typography, layout rules, spacing, and color systems from your reference deck.",
              icon: <Brush className="h-5 w-5 text-primary" />,
            },
            {
              title: "Slide blueprint generation",
              desc: "Transforms structured inputs into a coherent deck narrative: problem, solution, market, traction, and ask.",
              icon: <LayoutTemplate className="h-5 w-5 text-primary" />,
            },
            {
              title: "Data-to-charts",
              desc: "Converts financials and sheet-style data into clean, board-ready charts and KPIs.",
              icon: <BarChart3 className="h-5 w-5 text-primary" />,
            },
            {
              title: "Market insights on demand",
              desc: "Request market analysis or macro context; we integrate the findings into supporting slides.",
              icon: <Search className="h-5 w-5 text-primary" />,
            },
            {
              title: "Structured inputs",
              desc: "Company name, vision/goal, investors, business description, and optional market + financial inputs.",
              icon: <FileSpreadsheet className="h-5 w-5 text-primary" />,
            },
            {
              title: "Export-ready output",
              desc: "Produces a polished PPT draft that’s ready for stakeholders, iterations, and presentation.",
              icon: <Presentation className="h-5 w-5 text-primary" />,
            },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-2xl p-6 shadow-glass">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background shadow-sm">{item.icon}</div>
                <div className="space-y-1">
                  <div className="text-base font-semibold">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Workflow */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">From reference → enterprise deck</h2>
            <p className="text-muted-foreground">
              The fastest path to a professional PPT is consistency. Clarity AI starts with the design language and builds the deck around
              it.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Add a reference PPT or Reference ID",
                desc: "Clarity AI extracts style components and layout patterns.",
                icon: <FileUp className="h-5 w-5 text-primary" />,
              },
              {
                title: "Provide structured inputs",
                desc: "Company narrative + business description + investors + optional market and financial data.",
                icon: <Sparkles className="h-5 w-5 text-primary" />,
              },
              {
                title: "Generate a deck built to persuade",
                desc: "We deliver a clean, data-driven PPT draft with consistent visuals and charts.",
                icon: <Presentation className="h-5 w-5 text-primary" />,
              },
              {
                title: "Governance for teams",
                desc: "Enterprise plans support controls like RBAC and SSO-ready workflows.",
                icon: <Lock className="h-5 w-5 text-primary" />,
              },
            ].map((s, idx) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card/70 p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background shadow-sm">{s.icon}</div>
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-muted-foreground">Step {idx + 1}</div>
                    <div className="text-base font-semibold">{s.title}</div>
                    <div className="text-sm text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-8 shadow-glass">
            <div className="absolute inset-0 gradient-ai-subtle" aria-hidden="true" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="text-2xl font-semibold">Ready to generate a deck?</div>
                <div className="text-sm text-muted-foreground">Bring a reference PPT and ship a stakeholder-ready draft.</div>
              </div>
              <Button
                component={Link}
                to="/studio"
                variant="contained"
                disableElevation
                endIcon={<ArrowRight className="h-4 w-4" />}
                sx={{
                  textTransform: "none",
                  borderRadius: "14px",
                  paddingX: 3,
                  paddingY: 1.5,
                  fontWeight: 800,
                  background: "var(--gradient-ai)",
                  "&:hover": { background: "var(--gradient-ai)", opacity: 0.92 },
                }}
              >
                Start in Studio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
