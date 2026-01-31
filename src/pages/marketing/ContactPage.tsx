import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";

function fieldSx() {
  return {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: "hsl(var(--card) / 0.6)",
      color: "hsl(var(--foreground))",
      "& fieldset": {
        borderColor: "hsl(var(--border))",
      },
      "&:hover fieldset": {
        borderColor: "hsl(var(--border))",
      },
      "&.Mui-focused fieldset": {
        borderColor: "hsl(var(--ring))",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: "hsl(var(--muted-foreground))",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "hsl(var(--foreground))",
    },
    "& .MuiFormHelperText-root": {
      color: "hsl(var(--muted-foreground))",
    },
  } as const;
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(() => {
    return name.trim().length > 1 && email.trim().includes("@");
  }, [name, email]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Thanks — we’ll reach out shortly.", {
      description: "Your message was captured (mock form).",
    });

    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
  };

  return (
    <MarketingLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">Contact Clarity AI</h1>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Book a demo, request an Enterprise plan, or ask anything about reference-style matching, chart generation, or market insights.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-glass">
              <div className="space-y-2">
                <div className="text-lg font-semibold">Send a message</div>
                <div className="text-sm text-muted-foreground">We typically respond within 1 business day.</div>
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <TextField
                  label="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                  sx={fieldSx()}
                />
                <TextField
                  label="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  sx={fieldSx()}
                />
                <TextField
                  label="Company (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  fullWidth
                  sx={fieldSx()}
                />
                <TextField
                  label="What are you trying to build?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  fullWidth
                  multiline
                  minRows={4}
                  sx={fieldSx()}
                  helperText="Tell us your use case: pitch deck, enterprise update, consultant deck, market analysis needs, etc."
                />

                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  disabled={!canSubmit}
                  endIcon={<ArrowRight className="h-4 w-4" />}
                  sx={{
                    width: "100%",
                    textTransform: "none",
                    borderRadius: "14px",
                    paddingY: 1.4,
                    fontWeight: 800,
                    background: "var(--gradient-ai)",
                    "&:hover": { background: "var(--gradient-ai)", opacity: 0.92 },
                    "&.Mui-disabled": {
                      background: "hsl(var(--muted))",
                      color: "hsl(var(--muted-foreground))",
                    },
                  }}
                >
                  Submit
                </Button>

                <div className="text-xs text-muted-foreground">
                  This is a mock form for the website design. We can wire it to your backend/email provider next.
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-glass">
                <div className="text-lg font-semibold">Sales & Partnerships</div>
                <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    sales@clarity.ai (example)
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    +91 90000 00000 (example)
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-glass">
                <div className="text-lg font-semibold">What to include</div>
                <div className="mt-3 grid gap-3 text-sm text-muted-foreground">
                  <div>• Your reference deck style (or Reference ID)</div>
                  <div>• Approx. slide count + deck frequency</div>
                  <div>• Market analysis depth needed</div>
                  <div>• Any enterprise requirements (SSO/RBAC/SLA)</div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-glass">
                <div className="text-lg font-semibold">Prefer self-serve?</div>
                <div className="mt-2 text-sm text-muted-foreground">You can jump straight into the Studio and generate a first draft.</div>
                <div className="mt-4">
                  <Button
                    component={Link}
                    to="/studio"
                    variant="outlined"
                    disableElevation
                    sx={{
                      textTransform: "none",
                      borderRadius: "14px",
                      paddingX: 3,
                      paddingY: 1.25,
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                      "&:hover": {
                        borderColor: "hsl(var(--border))",
                        backgroundColor: "hsl(var(--muted) / 0.6)",
                      },
                    }}
                  >
                    Open Studio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
