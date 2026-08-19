import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Star } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CategoryCard } from "@/components/site/CategoryCard";
import { TemplateCard } from "@/components/site/TemplateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, templates } from "@/data/mock";
import heroCouple from "@/assets/hero-couple.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sendable — Create something worth sending" },
      {
        name: "description",
        content:
          "Make interactive invitations, birthday surprises, gift reveals and proposals in minutes. Share one link, collect the replies.",
      },
      { property: "og:title", content: "Sendable — Create something worth sending" },
      {
        property: "og:description",
        content:
          "Interactive invitations and surprises you can send with a single link. Cute, playful, made in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const steps = [
  { n: "01", title: "Choose a template", text: "Browse a shelf of hand-drawn experiences." },
  { n: "02", title: "Make it yours", text: "Names, colors, photos, questions — all yours." },
  { n: "03", title: "Publish & share", text: "Get a link and a QR code instantly." },
  { n: "04", title: "Get responses", text: "Their answers land in your dashboard." },
];

function Home() {
  const featured = templates.filter((t) => !t.comingSoon).slice(0, 6);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero */}
        <section className="paper-dots border-b-[2.5px] border-border">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-honey px-3 py-1.5 text-xs font-extrabold text-honey-foreground ink-outline">
                <Sparkles className="size-3.5" /> Made for one person in particular
              </span>
              <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
                Create something worth sending.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Create beautiful interactive invitations, surprises, memories and experiences in
                minutes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/templates">Create Something</Link>
                </Button>
                <Button asChild variant="cream" size="xl">
                  <Link to="/templates">Explore Templates</Link>
                </Button>
              </div>
              <p className="mt-5 text-sm font-bold text-muted-foreground">
                ⭐ 4.9 average across 12,000+ sent experiences
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-3 -rotate-3 rounded-4xl bg-blush ink-outline" />
              <div className="relative rounded-4xl bg-card p-6 text-center ink-outline shadow-pop-lg">
                <img
                  src={heroCouple}
                  alt="Cartoon couple holding a big heart"
                  width={1024}
                  height={1024}
                  className="mx-auto h-48 w-48 object-contain animate-float-soft"
                />
                <h2 className="mt-2 font-display text-2xl">Sara, go out on a date?</h2>
                <p className="mt-1 text-sm text-muted-foreground">Friday. Coffee. You and me.</p>
                <div className="mt-5 space-y-3">
                  <span className="block rounded-full bg-primary px-6 py-3 font-display font-extrabold text-primary-foreground ink-outline shadow-pop">
                    YES ❤️
                  </span>
                  <span className="ml-10 inline-block -rotate-6 rounded-full bg-muted px-5 py-2 font-display font-bold text-muted-foreground ink-outline">
                    NO
                  </span>
                </div>
                <Button asChild variant="cream" size="sm" className="mt-5">
                  <Link to="/p/$slug" params={{ slug: "sara-coffee-friday" }}>
                    Try the live demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">What are you making?</h2>
          <p className="mt-2 text-muted-foreground">
            Every category has its own look, its own mood, its own little story.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </section>

        {/* Templates */}
        <section className="border-y-[2.5px] border-border bg-secondary py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl">Popular templates</h2>
                <p className="mt-2 text-muted-foreground">
                  Use one as-is, or make it unrecognisably yours.
                </p>
              </div>
              <Button asChild variant="cream">
                <Link to="/templates">See all templates</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">How it works</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-3xl bg-card p-5 ink-outline shadow-pop">
                <span className="font-display text-3xl text-primary">{s.n}</span>
                <h3 className="mt-2 font-display text-xl">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI teaser */}
        <section className="border-t-[2.5px] border-border bg-blush py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span className="inline-block rounded-full bg-card px-3 py-1 text-xs font-extrabold uppercase tracking-widest ink-outline">
              Coming soon
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">AI Template Generator</h2>
            <p className="mt-3 text-blush-foreground/80">Tell us what you want to create.</p>
            <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
              <Input
                readOnly
                aria-label="Describe what you want to create"
                value="I want to make a romantic date invitation for Sara. Make it cute, funny and coffee themed."
                className="bg-card"
              />
              <Button variant="cream" disabled className="shrink-0">
                Generate
              </Button>
            </div>
            <div className="mx-auto mt-8 max-w-xs rounded-3xl bg-card p-5 ink-outline shadow-pop">
              <p className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
                Generated preview
              </p>
              <p className="mt-3 font-display text-xl">Sara, coffee o'clock? ☕</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground">
                <Star className="size-3.5 text-primary" fill="currentColor" /> AI draft · editable
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
