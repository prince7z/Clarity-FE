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

              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Generate investor-ready decks in minutes—
                <span className="gradient-ai-text"> matching any reference style</span>.
              </h1>

              <p className="max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
                Upload a reference PPT (or use a Reference ID), add your structured company data, and Clarity AI generates a clean,
                enterprise-grade presentation with strong visuals, charts, and optional market insights.
              </p>

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
                  See pricing
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
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">How Clarity AI works</h2>
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
          <h2 className="text-3xl font-semibold tracking-tight">Built for enterprise-grade decks</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Modern visuals, clean hierarchy, and data clarity—without spending hours nudging boxes in PowerPoint.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Style & layout extraction",
              desc: "Matches your reference deck: typography, spacing, layout rules, and color theme.",
              icon: <Brush className="h-5 w-5 text-primary" />,
            },
            {
              title: "AI-powered live editing",
              desc: "Tap any element and tell the AI what to change. Instant preview, smart suggestions, and no manual formatting.",
              icon: <MessageSquare className="h-5 w-5 text-primary" />,
            },
            {
              title: "Charts that tell the story",
              desc: "Turn sheet-like inputs into clear graphs, comparisons, and KPIs. AI picks the best visualization type.",
              icon: <LineChart className="h-5 w-5 text-primary" />,
            },
            {
              title: "Market & economy insights",
              desc: "Request market analysis and relevant macro context—integrated directly into slides with citations.",
              icon: <Gauge className="h-5 w-5 text-primary" />,
            },
            {
              title: "Narrative-ready slide structures",
              desc: "Problem → solution → traction → financials → ask, assembled in a clean flow.",
              icon: <Presentation className="h-5 w-5 text-primary" />,
            },
            {
              title: "Real-time collaboration",
              desc: "Edit together, leave comments, and review changes with version history across the whole deck.",
              icon: <Users2 className="h-5 w-5 text-primary" />,
            },
            {
              title: "Smart content suggestions",
              desc: "Improve clarity, tighten language, and optimize slide layouts for your audience—automatically.",
              icon: <Sparkles className="h-5 w-5 text-primary" />,
            },
            {
              title: "Presentation templates",
              desc: "Board decks, LP updates, pitch decks, QBRs—built-in structures you can customize and reuse.",
              icon: <LayoutTemplate className="h-5 w-5 text-primary" />,
            },
            {
              title: "Enterprise controls",
              desc: "Governance-ready workflows for large teams (SSO/RBAC/audit trails/approvals on Enterprise).",
              icon: <ShieldCheck className="h-5 w-5 text-primary" />,
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

      {/* AI Live Editing */}
      <Section id="ai-editing">
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
          <h2 className="text-3xl font-semibold tracking-tight">Advanced capabilities for enterprise teams</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Built-in intelligence that goes beyond templates—real AI that understands context, brand, and business narrative.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6 shadow-glass">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Intelligent data visualization</h3>
            <p className="text-sm text-muted-foreground">
              AI automatically selects the best chart type for your data—whether it's showing trends, comparisons, or
              distributions.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-glass">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Brush className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Brand consistency enforcement</h3>
            <p className="text-sm text-muted-foreground">
              Upload a reference deck once. Every generated slide follows typography, spacing, colors, and layout rules
              automatically.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-glass">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Context-aware content generation</h3>
            <p className="text-sm text-muted-foreground">
              Clarity AI understands your industry, audience, and narrative flow—suggesting content that fits your story.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-glass">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Version control & collaboration</h3>
            <p className="text-sm text-muted-foreground">
              Track changes, compare versions, and collaborate in real-time. Enterprise includes approvals and audit trails.
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

      {/* Pricing preview */}
      <Section id="pricing-preview">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Pricing that scales with your deck volume</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">Clear limits, stronger value at higher tiers, and enterprise controls when you need them.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlight
                  ? "relative rounded-3xl border-2 border-primary bg-card/70 p-6 shadow-glass"
                  : "relative rounded-3xl border border-border bg-card/70 p-6 shadow-glass"
              }
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </div>
              )}

              <div className="space-y-2">
                <div className="text-lg font-semibold">{plan.name}</div>
                <div className="text-3xl font-semibold tracking-tight">{plan.priceLabel}</div>
                <div className="text-sm text-muted-foreground">{plan.tagline}</div>
              </div>

              <div className="mt-5 space-y-3">
                {plan.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-sm">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button
                  component={Link}
                  to={plan.ctaHref}
                  fullWidth
                  variant={plan.highlight ? "contained" : "outlined"}
                  disableElevation
                  sx={{
                    textTransform: "none",
                    borderRadius: "14px",
                    paddingY: 1.25,
                    fontWeight: 800,
                    ...(plan.highlight
                      ? {
                          background: "var(--gradient-ai)",
                          "&:hover": { background: "var(--gradient-ai)", opacity: 0.92 },
                        }
                      : {
                          borderColor: "hsl(var(--border))",
                          color: "hsl(var(--foreground))",
                          "&:hover": {
                            borderColor: "hsl(var(--border))",
                            backgroundColor: "hsl(var(--muted) / 0.6)",
                          },
                        }),
                  }}
                >
                  {plan.ctaLabel}
                </Button>

                {plan.finePrint && <div className="mt-3 text-xs text-muted-foreground">{plan.finePrint}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/pricing" className="text-sm font-semibold text-foreground hover:opacity-90">
            Compare plans →
          </Link>
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

          <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-glass">
            <div className="space-y-4">
              <div className="text-sm font-semibold">What teams say</div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-background/70 p-5">
                  <div className="text-sm text-muted-foreground">
                    “We used a previous investor deck as the reference and Clarity AI matched the style perfectly. The charts and layout quality
                    saved us hours.”
                  </div>
                  <div className="mt-3 text-xs font-semibold">Founder, B2B SaaS</div>
                </div>
                <div className="rounded-2xl bg-background/70 p-5">
                  <div className="text-sm text-muted-foreground">
                    “The narrative flow and visual consistency made leadership reviews easier—less time formatting, more time refining the story.”
                  </div>
                  <div className="mt-3 text-xs font-semibold">Strategy Lead, Enterprise</div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border bg-background/70 p-5">
                <div className="space-y-1">
                  <div className="text-sm font-semibold">Ready to ship your next deck?</div>
                  <div className="text-sm text-muted-foreground">Start with your reference PPT and structured inputs.</div>
                </div>
                <Button
                  component={Link}
                  to="/sign-up"
                  variant="contained"
                  disableElevation
                  sx={{
                    textTransform: "none",
                    borderRadius: "14px",
                    fontWeight: 800,
                    background: "var(--gradient-ai)",
                    "&:hover": { background: "var(--gradient-ai)", opacity: 0.92 },
                  }}
                >
                  Get started
                </Button>
              </div>
            </div>
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
