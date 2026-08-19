import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { z } from "zod";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TemplateCard } from "@/components/site/TemplateCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories, templates } from "@/data/mock";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/templates")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Templates — Sendable" },
      {
        name: "description",
        content:
          "Browse interactive templates for dates, birthdays, parties, gift reveals, proposals, memories and more.",
      },
      { property: "og:title", content: "Sendable templates" },
      {
        property: "og:description",
        content: "A shelf of hand-drawn interactive templates, free and premium.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Templates,
});

type SortKey = "featured" | "popular" | "newest" | "rated" | "free" | "premium";

const sorts: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "popular", label: "Popular" },
  { key: "newest", label: "Newest" },
  { key: "rated", label: "Highest rated" },
  { key: "free", label: "Free" },
  { key: "premium", label: "Premium" },
];

function Templates() {
  const { category } = Route.useSearch();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  let list = templates.filter((t) => {
    const matchesCategory = !category || t.category === category;
    const matchesQuery =
      !query ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  if (sort === "popular") list = [...list].sort((a, b) => b.uses - a.uses);
  if (sort === "rated") list = [...list].sort((a, b) => b.rating - a.rating);
  if (sort === "newest")
    list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (sort === "free") list = list.filter((t) => !t.premium);
  if (sort === "premium") list = list.filter((t) => t.premium);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="paper-dots border-b-[2.5px] border-border py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h1 className="font-display text-4xl sm:text-5xl">Pick your starting point</h1>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Every template is ready to send in one tap — or open it up and change everything.
            </p>
            <div className="relative mt-6 max-w-md">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates…"
                aria-label="Search templates"
                className="bg-card pl-11"
              />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-wrap gap-2">
            <Link
              to="/templates"
              className={`rounded-full px-4 py-2 text-sm font-bold ink-outline ${
                !category ? "bg-primary text-primary-foreground" : "bg-card"
              }`}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/templates"
                search={{ category: c.id }}
                className={`rounded-full px-4 py-2 text-sm font-bold ink-outline ${
                  category === c.id ? "bg-primary text-primary-foreground" : "bg-card"
                }`}
              >
                {c.emoji} {c.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t-[2.5px] border-border pt-4">
            {sorts.map((s) => (
              <button
                key={s.key}
                onClick={() => setSort(s.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide ${
                  sort === s.key
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="mt-12 rounded-3xl bg-card p-10 text-center ink-outline shadow-pop">
              <p className="text-5xl">🫥</p>
              <h2 className="mt-3 font-display text-2xl">Nothing here yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                No template matches that. Try another category or clear your search.
              </p>
              <Button
                variant="cream"
                className="mt-5"
                onClick={() => {
                  setQuery("");
                  setSort("featured");
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
