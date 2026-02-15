import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import {
  ArrowRight,
  BarChart3,
  Brush,
  Building2,
  FileUp,
  Gauge,
  LayoutTemplate,
  LineChart,
  MessageSquare,
  Presentation,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  Users2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pricingPlans, trustStats } from "@/pages/marketing/content";

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-ai-subtle" aria-hidden="true" />
        <div className="absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-16 md:pt-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Chip
                  size="small"
                  label="AI-powered PPT generation"
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
                  label="Brand-matched layouts"
                  sx={{
                    borderRadius: "999px",
                    backgroundColor: "hsl(var(--card) / 0.7)",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))",
                    fontWeight: 600,
                  }}
                />
              </div>

              <h1 className="text-balance text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
                Generate investor-ready decks in minutes—
                <span className="gradient-ai-text"> matching any reference style</span>
              </h1>

            

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  component={Link}
                  to="/sign-up"
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
                  Get started free
                </Button>

                <Button
                  component={Link}
                  to="/"
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
                  GoForDemo
                </Button>
              </div>

              <div className="grid gap-3 pt-3 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-card/70 p-2 shadow-sm">
                    <Brush className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Style extraction</div>
                    <div className="text-sm text-muted-foreground">Typography, color theme, layouts.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-card/70 p-2 shadow-sm">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Data-driven slides</div>
                    <div className="text-sm text-muted-foreground">Charts & graphs from your inputs.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual mock */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-xl shadow-glass">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-foreground/20" />
                    <div className="h-3 w-3 rounded-full bg-foreground/20" />
                    <div className="h-3 w-3 rounded-full bg-foreground/20" />
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground">Deck Preview</div>
                </div>

                <div className="grid gap-4 p-6">
                  <div className="rounded-2xl border border-border bg-background/70 p-5">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-muted-foreground">Clarity AI</div>
                        <div className="text-lg font-semibold">Series A Pitch</div>
                      </div>
                      <div className="rounded-xl gradient-ai px-3 py-2 text-xs font-semibold text-primary-foreground">Investor-ready</div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-muted/60 p-3">
                        <div className="text-xs font-semibold">Problem</div>
                        <div className="mt-1 h-2 w-4/5 rounded bg-foreground/10" />
                        <div className="mt-2 h-2 w-2/3 rounded bg-foreground/10" />
                      </div>
                      <div className="rounded-xl bg-muted/60 p-3">
                        <div className="text-xs font-semibold">Solution</div>
                        <div className="mt-1 h-2 w-4/5 rounded bg-foreground/10" />
                        <div className="mt-2 h-2 w-2/3 rounded bg-foreground/10" />
                      </div>
                    </div>
                    <div className="mt-4 rounded-xl bg-muted/60 p-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold">Traction</div>
                        <div className="text-xs text-muted-foreground">Auto-generated charts</div>
                      </div>
                      <div className="mt-3 grid grid-cols-6 items-end gap-2">
                        {[35, 55, 44, 78, 62, 88].map((h, idx) => (
                          <div key={idx} className="rounded-md bg-primary/70" style={{ height: `${h}px` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-background/70 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <FileUp className="h-4 w-4 text-primary" />
                        Reference PPT
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">Extract style & layout.</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/70 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <LineChart className="h-4 w-4 text-primary" />
                        Structured data
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">Charts from numbers.</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/70 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Presentation className="h-4 w-4 text-primary" />
                        PPT output
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">Clean, polished slides.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section id="how-it-works">
        <div className="items-center">
          <div className="space-y-3">
            <h2 className="text-center text-3xl font-semibold tracking-tight">How Clarity AI works</h2>
            <p className="text-muted-foreground">
              Built for speed and consistency: you bring the story and the numbers, Clarity AI handles the design system and the slide
              craftsmanship.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Provide a Reference ID or reference PPT",
                desc: "We extract visual style, layouts, typography, and color theme—so every slide feels on-brand.",
                icon: <FileUp className="h-5 w-5 text-primary" />,
              },
              {
                title: "Add structured company data",
                desc: "Company name, vision, investors, business narrative, and optional market + financial data.",
                icon: <Sparkles className="h-5 w-5 text-primary" />,
              },
              {
                title: "Generate, review, and export",
                desc: "Get a clean, enterprise-grade deck with visuals, charts, and data-driven slides—ready for stakeholders.",
                icon: <Presentation className="h-5 w-5 text-primary" />,
              },
            ].map((step, idx) => (
              <div key={step.title} className="glass-card rounded-2xl p-5 shadow-glass">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background shadow-sm">
                    {step.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">Step {idx + 1}</span>
                    </div>
                    <div className="text-base font-semibold">{step.title}</div>
                    <div className="text-sm text-muted-foreground">{step.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section id="features">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Everything you need to create presentations</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From AI-powered generation to deep market analysis—professional PowerPoint presentations in minutes, not hours.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "AI-powered generation",
              desc: "Describe your presentation needs in plain text and let AI create complete slides with content and visuals.",
              icon: <Sparkles className="h-5 w-5 text-primary" />,
            },
            {
              title: "Reference-based creation",
              desc: "Upload an existing deck and we'll match its design language—typography, colors, spacing, and layout.",
              icon: <Brush className="h-5 w-5 text-primary" />,
            },
            {
              title: "Deep market analysis",
              desc: "Automated market research and competitive analysis integrated directly into your slides with data-backed insights.",
              icon: <Gauge className="h-5 w-5 text-primary" />,
            },
            {
              title: "Professional templates",
              desc: "Start with templates for pitch decks, LP updates, board materials, quarterly reviews, and more.",
              icon: <LayoutTemplate className="h-5 w-5 text-primary" />,
            },
            {
              title: "Full customization",
              desc: "Control dimensions, slide count, layouts, and formatting—customize every aspect to match your needs.",
              icon: <Settings className="h-5 w-5 text-primary" />,
            },
            {
              title: "Export to PowerPoint",
              desc: "Download professional PPTX files ready for presentation, further editing, or sharing with stakeholders.",
              icon: <Presentation className="h-5 w-5 text-primary" />,
            },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-2xl p-6 shadow-glass">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background shadow-sm">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <div className="text-base font-semibold">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            component={Link}
            to="/features"
            variant="text"
            disableElevation
            endIcon={<ArrowRight className="h-4 w-4" />}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              color: "hsl(var(--foreground))",
              fontWeight: 700,
            }}
          >
            Explore all features
          </Button>
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-10 shadow-glass md:p-14">
          <div className="absolute inset-0 gradient-ai-subtle" aria-hidden="true" />
          <div className="relative">
            <div className="text-center space-y-3 mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Three Ways to Create
              </div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Start from <span className="gradient-ai-text">anywhere</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you have a clear vision, an existing deck to match, or want to start from a template—Clarity AI has you covered.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-4 p-6 rounded-2xl border border-border bg-background/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Describe Your Needs</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us what you need: "Create a pitch deck for a fintech startup" or "LP update for Q4 2024"—our AI generates complete slides with content and visuals.
                </p>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI-powered generation
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-6 rounded-2xl border border-border bg-background/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <FileUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Upload a Reference</h3>
                <p className="text-sm text-muted-foreground">
                  Share an existing presentation and we'll analyze its design language—matching typography, colors, spacing, and layout for brand consistency.
                </p>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                    <Brush className="h-3.5 w-3.5" />
                    Style matching
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-6 rounded-2xl border border-border bg-background/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <LayoutTemplate className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Choose a Template</h3>
                <p className="text-sm text-muted-foreground">
                  Start with professional templates for investor pitches, board materials, LP reports, or quarterly reviews—customize to fit your story.
                </p>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                    <LayoutTemplate className="h-3.5 w-3.5" />
                    Pre-built structures
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground mb-4">Every method includes deep market analysis and full customization control</p>
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
                Try it now
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Advanced Features */}
      <Section id="advanced-features">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-10 shadow-glass md:p-14">
          <div className="absolute inset-0 gradient-ai-subtle" aria-hidden="true" />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                AI-Powered Editing
              </div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Edit presentations with <span className="gradient-ai-text">natural language</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Tap any slide element and tell the AI what you want to change. No design skills needed—Clarity AI understands your
                intent and updates layouts, content, and visuals instantly.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20">
                    <MessageSquare className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Conversational editing</div>
                    <div className="text-sm text-muted-foreground">
                      “Make this chart bigger” or “Change the color to blue”—AI understands and executes.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Smart suggestions</div>
                    <div className="text-sm text-muted-foreground">
                      AI recommends improvements based on presentation best practices and your brand style.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20">
                    <LayoutTemplate className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Real-time preview</div>
                    <div className="text-sm text-muted-foreground">See changes instantly before applying them to your final deck.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-glass">
                <div className="border-b border-border bg-card/50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">AI Editor</span>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="rounded-2xl rounded-tl-sm bg-muted/80 px-4 py-2.5">
                        <p className="text-sm">Make the revenue chart larger and change it to a bar chart</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full gradient-ai">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-2.5">
                        <p className="mb-3 text-sm text-foreground">✓ Updated chart size to 40% larger</p>
                        <p className="mb-3 text-sm text-foreground">✓ Converted line chart to bar chart</p>
                        <div className="rounded-xl bg-muted/50 p-3">
                          <div className="mb-2 text-xs font-semibold text-muted-foreground">Revenue Preview</div>
                          <div className="grid grid-cols-4 items-end gap-2">
                            {[65, 78, 85, 92].map((h, i) => (
                              <div key={i} className="rounded-md bg-primary/70" style={{ height: `${h}px` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Advanced Features */}
      <Section id="advanced-features">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Powered by AI, designed for professionals</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Advanced features that understand your business context and deliver presentations that look professionally designed.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6 shadow-glass">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Natural language generation</h3>
            <p className="text-sm text-muted-foreground">
              Simply describe what you need and AI creates complete presentations with relevant content, layout, and visuals.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-glass">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Brush className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Style consistency</h3>
            <p className="text-sm text-muted-foreground">
              Upload a reference deck and every generated slide follows its typography, spacing, colors, and layout rules automatically.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-glass">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Gauge className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Market intelligence</h3>
            <p className="text-sm text-muted-foreground">
              Automated research and market analysis integrated into your presentations—delivering data-backed insights and competitive context.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-glass">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <LayoutTemplate className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Template library</h3>
            <p className="text-sm text-muted-foreground">
              Professional templates for every use case—investor pitches, board materials, LP updates, and quarterly reviews.
            </p>
          </div>
        </div>
      </Section>

      {/* Use cases */}
      <Section id="use-cases">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">Use cases that convert</h2>
            <p className="text-muted-foreground">
              Whether you're fundraising, updating leadership, or delivering client work—Clarity AI produces decks that look and read
              like they were designed by a top team.
            </p>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            Launch quickly, stay on-brand, and ship narratives backed by data.
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Startups",
              desc: "Pitch decks, investor updates, product narratives.",
              icon: <Sparkles className="h-5 w-5 text-primary" />,
            },
            {
              title: "Enterprises",
              desc: "Strategy decks, quarterly business reviews, internal leadership updates.",
              icon: <Building2 className="h-5 w-5 text-primary" />,
            },
            {
              title: "Consultants",
              desc: "Client decks with consistent branding and polished visuals.",
              icon: <Users2 className="h-5 w-5 text-primary" />,
            },
          ].map((card) => (
            <div key={card.title} className="rounded-3xl border border-border bg-card/70 p-6 shadow-glass">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background shadow-sm">
                  {card.icon}
                </div>
                <div className="space-y-1">
                  <div className="text-base font-semibold">{card.title}</div>
                  <div className="text-sm text-muted-foreground">{card.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust */}
      <Section id="trust">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight">Credibility that feels enterprise-ready</h2>
        <p className="text-muted-foreground">
          Your deck is a decision artifact. Clarity AI optimizes for clarity, consistency, and the kind of visual confidence that wins
          stakeholder trust.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {trustStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
          <div className="text-xs font-semibold text-muted-foreground">{s.label}</div>
          <div className="mt-1 text-lg font-semibold">{s.value}</div>
          <div className="mt-2 text-xs text-muted-foreground">{s.description}</div>
            </div>
          ))}
        </div>
          </div>

          <div className="space-y-4">
        <div className="text-sm font-semibold">What teams say</div>
        
        {[
          {
            quote: "We used a previous investor deck as the reference and Clarity AI matched the style perfectly. The charts and layout quality saved us hours.",
            author: "Founder, B2B SaaS",
            initials: "FB",
          },
          {
            quote: "The narrative flow and visual consistency made leadership reviews easier—less time formatting, more time refining the story.",
            author: "Strategy Lead, Enterprise",
            initials: "SL",
          },
        ].map((testimonial, idx) => (
            <div
              key={idx}
              className="testimonial-card relative rounded-2xl border border-border bg-gradient-to-br from-primary/20 to-card/40 p-6 shadow-glass backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl"
              style={{ animation: `fadeInUp 0.7s ${0.1 + idx * 0.15}s both` }}
            >
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-ai text-sm font-bold text-white shadow-lg">
                  {testimonial.initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">{testimonial.author}</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground italic">"{testimonial.quote}"</p>
              {/* Animated gradient border effect */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary/30 via-transparent to-primary/10 opacity-60 blur-sm" />
            </div>
        ))}
        </div>
        </div>

      </Section>

      {/* CTA banner */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-8 shadow-glass">
            <div className="absolute inset-0 gradient-ai-subtle" aria-hidden="true" />
            <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
              <div className="space-y-2">
                <div className="text-2xl font-semibold tracking-tight">Decks that look enterprise-grade—every time.</div>
                <div className="text-sm text-muted-foreground">
                  Use a reference PPT to lock in the style, then generate a full narrative with charts and optional market analysis.
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Button
                  component={Link}
                  to="/contact"
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
                  Book a demo
                </Button>
                <Button
                  component={Link}
                  to="/sign-up"
                  variant="contained"
                  disableElevation
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
                  Get started free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
