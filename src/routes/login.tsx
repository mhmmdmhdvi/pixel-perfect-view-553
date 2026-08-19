import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import heroCouple from "@/assets/hero-couple.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Sendable" },
      {
        name: "description",
        content: "Log in to Sendable to manage your interactive experiences and see new responses.",
      },
      { property: "og:title", content: "Log in — Sendable" },
      { property: "og:description", content: "Welcome back to your little experience workshop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="paper-dots flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-4xl bg-card p-6 ink-outline shadow-pop-lg sm:p-8">
          <img
            src={heroCouple}
            alt="Cartoon couple waving hello"
            loading="lazy"
            width={1024}
            height={1024}
            className="mx-auto h-28 w-28 object-contain"
          />
          <h1 className="mt-2 text-center font-display text-3xl">Welcome back</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Someone is probably waiting for a link.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                toast.success("Signed in (demo)");
                navigate({ to: "/dashboard" });
              }, 700);
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="identifier">Username or email</Label>
              <Input id="identifier" required placeholder="mehdi@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-bold">
                <Checkbox id="remember" /> Remember me
              </label>
              <button type="button" className="text-sm font-bold text-primary hover:underline">
                Forgot password?
              </button>
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Log in"}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
