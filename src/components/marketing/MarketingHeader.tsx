import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { marketingNav } from "@/pages/marketing/content";

function NavItem({ href, label }: { href: string; label: string }) {
  const location = useLocation();
  const isActive = useMemo(() => location.pathname === href, [location.pathname, href]);

  return (
    <Link
      to={href}
      className={cn(
        "text-sm font-medium transition-colors",
        "text-muted-foreground hover:text-foreground",
        isActive && "text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl gradient-ai shadow-sm" aria-hidden="true" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">Clarity AI</div>
            <div className="text-xs text-muted-foreground">AI PPT generation</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {marketingNav.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} />
          ))}
          {isSignedIn && (
            <Link to="/studio" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Studio
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isSignedIn ? (
            <>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-3 py-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {user?.firstName || user?.emailAddresses[0]?.emailAddress || "User"}
                </span>
              </div>

              <Button
                component={Link}
                to="/studio"
                variant="outlined"
                disableElevation
                sx={{
                  textTransform: "none",
                  borderRadius: "12px",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  paddingX: 2,
                  paddingY: 1,
                  "&:hover": {
                    borderColor: "hsl(var(--border))",
                    backgroundColor: "hsl(var(--muted) / 0.6)",
                  },
                }}
              >
                Studio
              </Button>

              <IconButton
                onClick={() => signOut()}
                size="small"
                sx={{
                  borderRadius: "12px",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/sign-in"
                variant="outlined"
                disableElevation
                sx={{
                  textTransform: "none",
                  borderRadius: "12px",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  paddingX: 2,
                  paddingY: 1,
                  "&:hover": {
                    borderColor: "hsl(var(--border))",
                    backgroundColor: "hsl(var(--muted) / 0.6)",
                  },
                }}
              >
                Sign in
              </Button>

              <Button
                component={Link}
                to="/sign-up"
                variant="contained"
                disableElevation
                sx={{
                  textTransform: "none",
                  borderRadius: "12px",
                  paddingX: 2.5,
                  paddingY: 1,
                  fontWeight: 700,
                  background: "var(--gradient-ai)",
                  "&:hover": {
                    background: "var(--gradient-ai)",
                    opacity: 0.92,
                  },
                }}
              >
                Get started
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <IconButton
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            size="small"
            sx={{
              borderRadius: "12px",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          >
            <Menu className="h-5 w-5" />
          </IconButton>
        </div>
      </div>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            backgroundColor: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            borderLeft: "1px solid hsl(var(--border))",
          },
        }}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="text-sm font-semibold">Menu</div>
          <IconButton
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            size="small"
            sx={{ color: "hsl(var(--foreground))" }}
          >
            <X className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="flex flex-col gap-4 px-4 py-5">
          {isSignedIn && (
            <div className="mb-2 rounded-xl border border-border bg-card/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {user?.firstName || user?.emailAddresses[0]?.emailAddress || "User"}
                </span>
              </div>
            </div>
          )}

          {marketingNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-foreground"
            >
              {item.label}
            </Link>
          ))}
          
          {isSignedIn && (
            <Link to="/studio" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">
              Studio
            </Link>
          )}

          <div className="border-t border-border pt-4">
            {isSignedIn ? (
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  signOut();
                }}
                fullWidth
                variant="outlined"
                disableElevation
                startIcon={<LogOut className="h-4 w-4" />}
                sx={{
                  textTransform: "none",
                  borderRadius: "12px",
                  paddingY: 1.25,
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  "&:hover": {
                    borderColor: "hsl(var(--border))",
                    backgroundColor: "hsl(var(--muted) / 0.6)",
                  },
                }}
              >
                Sign out
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  component={Link}
                  to="/sign-in"
                  onClick={() => setMobileOpen(false)}
                  fullWidth
                  variant="outlined"
                  disableElevation
                  sx={{
                    textTransform: "none",
                    borderRadius: "12px",
                    paddingY: 1.25,
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                    "&:hover": {
                      borderColor: "hsl(var(--border))",
                      backgroundColor: "hsl(var(--muted) / 0.6)",
                    },
                  }}
                >
                  Sign in
                </Button>
                <Button
                  component={Link}
                  to="/sign-up"
                  onClick={() => setMobileOpen(false)}
                  fullWidth
                  variant="contained"
                  disableElevation
                  sx={{
                    textTransform: "none",
                    borderRadius: "12px",
                    paddingY: 1.25,
                    fontWeight: 700,
                    background: "var(--gradient-ai)",
                    "&:hover": { background: "var(--gradient-ai)", opacity: 0.92 },
                  }}
                >
                  Get started
                </Button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
}
