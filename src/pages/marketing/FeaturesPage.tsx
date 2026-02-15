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
                label="AI-powered generation"
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
                label="Market analysis included"
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
              AI that turns your ideas into
              <span className="gradient-ai-text"> polished PowerPoint presentations</span>.
            </h1>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Clarity AI generates professional PowerPoint presentations from your descriptions, reference decks, or templates—complete with deep market analysis and full customization control.
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
              title: "AI-powered generation",
              desc: "Describe what you need in plain text and Clarity AI generates a complete PowerPoint presentation instantly.",
              icon: <Sparkles className="h-5 w-5 text-primary" />,
            },
            {
              title: "Reference-based creation",
              desc: "Upload your reference deck and we'll create a new presentation matching the exact style, layout, and design language.",
              icon: <Brush className="h-5 w-5 text-primary" />,
            },
            {
              title: "Deep market analysis",
              desc: "Automated market research and competitive analysis integrated directly into your presentation slides.",
              icon: <Search className="h-5 w-5 text-primary" />,
            },
            {
              title: "Professional templates",
              desc: "Choose from our library of presentation templates for pitch decks, LP updates, board materials, and more.",
              icon: <LayoutTemplate className="h-5 w-5 text-primary" />,
            },
            {
              title: "Full customization control",
              desc: "Set your preferred dimensions, slide count, layout preferences, and formatting—you're in complete control.",
              icon: <FileSpreadsheet className="h-5 w-5 text-primary" />,
            },
            {
              title: "Export-ready output",
              desc: "Download professional PPTX files ready for presentation, editing in PowerPoint, or sharing with stakeholders.",
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
            <h2 className="text-3xl font-semibold tracking-tight">Three ways to create presentations</h2>
            <p className="text-muted-foreground">
              Whether you start from scratch, use a reference deck, or choose a template—Clarity AI generates professional presentations tailored to your needs.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Describe what you need",
                desc: "Tell Clarity AI about your presentation in plain text—our AI generates complete slides with content and visuals.",
                icon: <Sparkles className="h-5 w-5 text-primary" />,
              },
              {
                title: "Upload a reference deck",
                desc: "Share an existing presentation and we'll create new slides matching its exact design, colors, and layout style.",
                icon: <FileUp className="h-5 w-5 text-primary" />,
              },
              {
                title: "Start from templates",
                desc: "Choose from professional templates for investor pitches, LP reports, quarterly reviews, or board presentations.",
                icon: <LayoutTemplate className="h-5 w-5 text-primary" />,
              },
              {
                title: "Customize everything",
                desc: "Control slide dimensions, count, layout, and formatting. Add market analysis and data visualizations as needed.",
                icon: <FileSpreadsheet className="h-5 w-5 text-primary" />,
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
                <div className="text-2xl font-semibold">Ready to create your presentation?</div>
                <div className="text-sm text-muted-foreground">Start with a description, reference deck, or template—get a professional PowerPoint in minutes.</div>
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
