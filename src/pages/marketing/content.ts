export type PricingPlan = {
  name: string;
  priceLabel: string;
  tagline: string;
  highlight?: boolean;
  ctaLabel: string;
  ctaHref: string;
  bullets: string[];
  finePrint?: string;
};

export const marketingNav = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    priceLabel: "₹399 / month",
    tagline: "For founders validating the story and the deck.",
    ctaLabel: "Start generating",
    ctaHref: "/studio",
    bullets: [
      "20 PPT generations / month",
      "Up to 15 slides per deck",
      "1 reference style per project",
      "Basic visuals + core chart types",
      "5 market insights / month",
      "Email support",
    ],
    finePrint: "Best for early-stage founders and quick iterations.",
  },
  {
    name: "Growth",
    priceLabel: "₹999 / month",
    tagline: "For teams building investor-ready narratives at speed.",
    highlight: true,
    ctaLabel: "Upgrade to Growth",
    ctaHref: "/studio",
    bullets: [
      "45 PPT generations / month",
      "Up to 30 slides per deck",
      "Up to 5 reference styles",
      "Advanced charts + richer layouts",
      "50 market insights / month",
      "Priority processing",
    ],
    finePrint: "Most popular for startups and consultants.",
  },
  {
    name: "Enterprise",
    priceLabel: "As you go",
    tagline: "For enterprises that need scale, governance, and data depth.",
    ctaLabel: "Talk to sales",
    ctaHref: "/contact",
    bullets: [
      "Pay-as-you-go PPT creation",
      "Unlimited slides (fair use)",
      "Full market + economy analysis",
      "Premium visuals + brand controls",
      "SSO/RBAC/audit-ready workflows",
      "SLA + priority support",
    ],
    finePrint: "Custom contracts available for large teams and deployments.",
  },
];

export const trustStats = [
  {
    label: "Time saved",
    value: "70%+",
    description: "Reduce deck production time with reusable style extraction.",
  },
  {
    label: "Consistency",
    value: "Brand-true",
    description: "Layouts, typography, and colors match your reference deck.",
  },
  {
    label: "Clarity",
    value: "Data-first",
    description: "Charts and tables built from structured inputs—no manual polishing.",
  },
];
