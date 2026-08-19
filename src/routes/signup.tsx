import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Sendable" },
      {
        name: "description",
        content:
          "Sign up for Sendable and make your first interactive invitation, surprise or gift reveal today.",
      },
      { property: "og:title", content: "Create your account — Sendable" },
      {
        property: "og:description",
        content: "Let's create your first experience — it takes about four minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "onboarding">("form");

  return (
    <div className="min-h-screen">
      <Header />
      <main className="paper-dots flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-4xl bg-card p-6 ink-outline shadow-pop-lg sm:p-8">
          {step === "form" ? (
            <>
              <h1 className="text-center font-display text-3xl">Make your first one</h1>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Free forever for the classics.
              </p>
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("onboarding");
                }}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" required placeholder="mehdi" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="mehdi@example.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input id="confirm" type="password" required placeholder="••••••••" />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Create account
                </Button>
              </form>
              <p className="mt-5 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </>
          ) : (
            <div className="animate-pop-in text-center">
              <p className="text-5xl">🎉</p>
              <h1 className="mt-3 font-display text-3xl">Let's create your first experience.</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Pick a category and we'll take it from there.
              </p>
              <div className="mt-6 grid gap-2">
                <Button asChild variant="hero" size="lg">
                  <Link to="/templates" search={{ category: "date" }}>
                    💕 Ask someone out
                  </Link>
                </Button>
                <Button asChild variant="honey" size="lg">
                  <Link to="/templates" search={{ category: "birthday" }}>
                    🎂 Make a birthday page
                  </Link>
                </Button>
                <Button
                  variant="cream"
                  size="lg"
                  onClick={() => {
                    toast.success("Account created (demo)");
                    navigate({ to: "/dashboard" });
                  }}
                >
                  Skip to my dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
