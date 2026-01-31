import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { LogOut, User, Home } from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";

export function StudioHeader() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl gradient-ai shadow-sm" aria-hidden="true" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">Clarity AI</div>
            <div className="text-xs text-muted-foreground">Studio</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            component={Link}
            to="/"
            variant="text"
            disableElevation
            startIcon={<Home className="h-4 w-4" />}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              color: "hsl(var(--foreground))",
              paddingX: 2,
              paddingY: 1,
              "&:hover": {
                backgroundColor: "hsl(var(--muted) / 0.6)",
              },
            }}
          >
            Home
          </Button>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-3 py-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {user?.firstName || user?.emailAddresses[0]?.emailAddress || "User"}
            </span>
          </div>

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
        </div>
      </div>
    </header>
  );
}
