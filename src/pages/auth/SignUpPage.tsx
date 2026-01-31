import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-xl gradient-ai shadow-lg" aria-hidden="true" />
          <h1 className="text-2xl font-semibold tracking-tight">Join Clarity AI</h1>
          <p className="mt-2 text-sm text-muted-foreground">Start generating enterprise-grade presentations in minutes</p>
        </div>

        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "glass-card shadow-glass border border-border",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-border hover:bg-muted/60",
              formButtonPrimary: "gradient-ai hover:opacity-90 text-white font-semibold",
              footerActionLink: "text-primary hover:text-primary/80",
              formFieldInput: "border-border focus:border-ring",
            },
          }}
          routing="hash"
          signInUrl="/sign-in"
          afterSignUpUrl="/studio"
          redirectUrl="/studio"
        />
      </div>
    </div>
  );
}
