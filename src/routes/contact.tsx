import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — Sendable" },
      {
        name: "description",
        content:
          "Questions, template ideas or partnership requests? Send the Sendable team a message and we'll reply soon.",
      },
      { property: "og:title", content: "Contact us — Sendable" },
      { property: "og:description", content: "Talk to the humans behind Sendable." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <h1 className="font-display text-4xl sm:text-5xl">Say hello 👋</h1>
        <p className="mt-3 text-muted-foreground">
          Template ideas, bugs, or just want to show us what you sent? We read everything.
        </p>

        <div className="mt-8 rounded-4xl bg-card p-6 ink-outline shadow-pop sm:p-8">
          {sent ? (
            <div className="animate-pop-in text-center">
              <p className="text-5xl">💌</p>
              <h2 className="mt-3 font-display text-2xl">Message sent!</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We usually reply within a day. Thanks for writing.
              </p>
              <Button variant="cream" className="mt-5" onClick={() => setSent(false)}>
                Send another
              </Button>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="Optional" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} required placeholder="Tell us everything" />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Submit
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
