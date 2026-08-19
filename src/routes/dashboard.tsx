import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  categoryById,
  currentUser,
  experiences,
  notifications,
  responses,
  stats,
} from "@/data/mock";
import { toneChip } from "@/lib/tone";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your workshop — Sendable dashboard" },
      {
        name: "description",
        content:
          "Track your live experiences, read new responses, and follow every notification in one warm little workspace.",
      },
      { property: "og:title", content: "Your Sendable workshop" },
      {
        property: "og:description",
        content: "Experiences, responses and notifications, all in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl">Good morning, {currentUser.name}</h1>
            <p className="mt-2 text-muted-foreground">
              Two new responses are waiting. Someone said yes. ❤️
            </p>
          </div>
          <Button asChild variant="hero">
            <Link to="/templates">Create something new</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-card p-5 ink-outline shadow-pop">
              <span className="text-2xl">{s.emoji}</span>
              <p className="mt-2 font-display text-3xl">{s.value}</p>
              <p className="text-sm font-bold text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="experiences" className="mt-10">
          <TabsList className="flex-wrap">
            <TabsTrigger value="experiences">My experiences</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="experiences" className="mt-6 space-y-4">
            {experiences.map((e) => {
              const category = categoryById(e.category);
              return (
                <article
                  key={e.id}
                  className="flex flex-col gap-4 rounded-3xl bg-card p-4 ink-outline shadow-pop sm:flex-row sm:items-center"
                >
                  <img
                    src={e.image}
                    alt={`${e.title} thumbnail`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-24 w-full rounded-2xl object-cover ink-outline sm:w-32"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-xl">{e.title}</h2>
                      {category && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${toneChip[category.tone]}`}
                        >
                          {category.emoji} {category.name}
                        </span>
                      )}
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-extrabold uppercase">
                        {e.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {e.views} views · {e.responses} responses · updated {e.updated}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="cream">
                      <Link to="/p/$slug" params={{ slug: e.slug }}>
                        Preview
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="cream"
                      onClick={() => {
                        navigator.clipboard?.writeText(`https://sendable.app/p/${e.slug}`);
                        toast.success("Link copied");
                      }}
                    >
                      Share
                    </Button>
                    <Button asChild size="sm">
                      <Link to="/create/$templateId" params={{ templateId: "romantic-date" }}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </TabsContent>

          <TabsContent value="responses" className="mt-6 grid gap-4 md:grid-cols-2">
            {responses.map((r) => {
              const category = categoryById(r.category);
              return (
                <article
                  key={r.id}
                  className={`rounded-3xl p-5 ink-outline shadow-pop ${
                    r.unread ? "bg-blush" : "bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold uppercase tracking-widest">
                      {category?.emoji} {r.experienceTitle}
                    </p>
                    {r.unread && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold text-primary-foreground">
                        NEW
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 font-display text-2xl">{r.name}</h2>
                  <p className="text-xs text-muted-foreground">{r.when}</p>
                  <dl className="mt-4 space-y-2 rounded-2xl bg-card/70 p-4 text-sm ink-outline">
                    {r.fields.map((f) => (
                      <div key={f.label} className="flex justify-between gap-4">
                        <dt className="font-bold text-muted-foreground">{f.label}</dt>
                        <dd className="text-right font-bold">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              );
            })}
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-4 rounded-3xl p-4 ink-outline ${
                  n.unread ? "bg-honey" : "bg-card"
                }`}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-card text-xl ink-outline">
                  {n.emoji}
                </span>
                <div className="flex-1">
                  <p className="font-bold">{n.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {n.experience} · {n.when}
                  </p>
                </div>
                {n.unread && <span className="mt-2 size-2.5 rounded-full bg-primary" />}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
