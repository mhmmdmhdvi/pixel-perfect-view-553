import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Star } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TemplateCard } from "@/components/site/TemplateCard";
import { Button } from "@/components/ui/button";
import { categoryById, templateById, templates } from "@/data/mock";
import { toneChip } from "@/lib/tone";

export const Route = createFileRoute("/templates/$id")({
  loader: ({ params }) => {
    const template = templateById(params.id);
    if (!template) throw notFound();
    return { template };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.template.name ?? "Template";
    const description = loaderData?.template.description ?? "An interactive Sendable template.";
    return {
      meta: [
        { title: `${name} — Sendable template` },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: `${name} — Sendable template` },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TemplateDetail,
});

function TemplateDetail() {
  const { template } = Route.useLoaderData();
  const category = categoryById(template.category);
  const related = templates
    .filter((t) => t.category === template.category && t.id !== template.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Link to="/templates" className="text-sm font-bold text-muted-foreground hover:text-primary">
          ← Back to templates
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="overflow-hidden rounded-4xl bg-card ink-outline shadow-pop-lg">
            <img
              src={template.image}
              alt={`${template.name} large preview`}
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${toneChip[category.tone]}`}>
                  {category.emoji} {category.name}
                </span>
              )}
              <span
                className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-widest ink-outline ${
                  template.premium ? "bg-honey text-honey-foreground" : "bg-card"
                }`}
              >
                {template.premium ? "Premium" : "Free"}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">
                {template.official ? "Official template" : `Community · ${template.creator}`}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl leading-tight">{template.name}</h1>
            <p className="mt-3 text-muted-foreground">{template.description}</p>

            <div className="mt-4 flex items-center gap-4 text-sm font-bold">
              <span className="flex items-center gap-1">
                <Star className="size-4 text-primary" fill="currentColor" />
                {template.rating.toFixed(1)}
              </span>
              <span>❤️ {template.uses.toLocaleString()} uses</span>
            </div>

            <ul className="mt-6 space-y-2">
              {template.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm font-bold">
                  <span className="grid size-6 place-items-center rounded-full bg-mint ink-outline">
                    <Check className="size-3.5 text-mint-foreground" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {template.premium ? (
                <>
                  <Button asChild variant="cream" size="lg">
                    <Link to="/p/$slug" params={{ slug: "demo-preview" }}>
                      Preview
                    </Link>
                  </Button>
                  <Button asChild variant="hero" size="lg">
                    <Link to="/create/$templateId" params={{ templateId: template.id }}>
                      Customize
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="hero" size="lg">
                    <Link to="/create/$templateId" params={{ templateId: template.id }}>
                      Use Free
                    </Link>
                  </Button>
                  <Button asChild variant="cream" size="lg">
                    <Link to="/create/$templateId" params={{ templateId: template.id }}>
                      Customize
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {template.premium && (
              <p className="mt-4 rounded-2xl bg-honey p-4 text-sm font-bold text-honey-foreground ink-outline">
                Premium unlocks advanced animations, music, extra media and custom links.
              </p>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl">More like this</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
