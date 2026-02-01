import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pricingPlans } from "@/pages/marketing/content";

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-14 md:py-18">
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">Pricing designed for deck velocity</h1>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Choose a plan based on how many decks you generate, how deep your data needs to go, and whether you require enterprise
              controls.
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
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
      </Section>

      {/* Comparison */}
      <Section>
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight">Plan comparison</h2>
          <p className="text-muted-foreground">A practical view of limits and value-based differentiation.</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card/70 shadow-glass">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="px-5 py-4 font-semibold">Capability</th>
                  <th className="px-5 py-4 font-semibold">Starter</th>
                  <th className="px-5 py-4 font-semibold">Growth</th>
                  <th className="px-5 py-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  {
                    cap: "PPT generations",
                    starter: "20 / month",
                    growth: "45 / month",
                    ent: "Pay-as-you-go",
                  },
                  {
                    cap: "Slides per deck",
                    starter: "Up to 15",
                    growth: "Up to 30",
                    ent: "Unlimited (fair use)",
                  },
                  {
                    cap: "Reference styles",
                    starter: "1 per project",
                    growth: "Up to 5",
                    ent: "Custom brand kits",
                  },
                  {
                    cap: "Charting & visuals",
                    starter: "Core chart types",
                    growth: "Advanced charts",
                    ent: "Premium visuals + templates",
                  },
                  {
                    cap: "Market & economy analysis",
                    starter: "Minimal",
                    growth: "Moderate",
                    ent: "Full analysis",
                  },
                  {
                    cap: "Support",
                    starter: "Email",
                    growth: "Priority",
                    ent: "SLA + dedicated support",
                  },
                  {
                    cap: "Enterprise controls",
                    starter: "—",
                    growth: "—",
                    ent: "SSO/RBAC/audit-ready",
                  },
                ].map((row) => (
                  <tr key={row.cap} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-4 font-medium text-foreground">{row.cap}</td>
                    <td className="px-5 py-4">{row.starter}</td>
                    <td className="px-5 py-4">{row.growth}</td>
                    <td className="px-5 py-4">{row.ent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-xs text-muted-foreground">
          Limits are designed for fairness and predictable performance. Enterprise plans can be customized based on volume and governance
          needs.
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
          <p className="text-muted-foreground">Common questions from founders, teams, and enterprise buyers.</p>
        </div>

        <div className="mt-8 grid gap-3">
          {[
            {
              q: "What is a Reference ID?",
              a: "A Reference ID is a shortcut to a previously uploaded reference deck. It helps Clarity AI reuse the same style extraction for future decks.",
            },
            {
              q: "Do you generate charts automatically?",
              a: "Yes. Provide structured data (numbers, KPIs, tables), and Clarity AI produces clean charts and graphs directly inside the deck.",
            },
            {
              q: "How does market analysis work?",
              a: "When requested, Clarity AI fetches and summarizes relevant market and macro insights, then places the results into dedicated slides.",
            },
            {
              q: "Can enterprise plans support governance needs?",
              a: "Enterprise plans are designed for large teams and can include controls like SSO, RBAC, and audit-oriented workflows.",
            },
          ].map((item) => (
            <Accordion
              key={item.q}
              disableGutters
              elevation={0}
              sx={{
                border: "1px solid hsl(var(--border))",
                borderRadius: "16px",
                backgroundColor: "hsl(var(--card) / 0.7)",
                color: "hsl(var(--foreground))",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown className="h-4 w-4" />}
                sx={{
                  paddingX: 2,
                  paddingY: 1.25,
                  "& .MuiAccordionSummary-content": { margin: 0, fontWeight: 700 },
                }}
              >
                {item.q}
              </AccordionSummary>
              <AccordionDetails sx={{ paddingX: 2, paddingBottom: 2, color: "hsl(var(--muted-foreground))" }}>
                {item.a}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-8 shadow-glass">
            <div className="absolute inset-0 gradient-ai-subtle" aria-hidden="true" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="text-2xl font-semibold">Want an Enterprise plan tailored to your team?</div>
                <div className="text-sm text-muted-foreground">We’ll align limits, data depth, and governance requirements.</div>
              </div>
              <Button
                component={Link}
                to="/contact"
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
                Talk to sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
