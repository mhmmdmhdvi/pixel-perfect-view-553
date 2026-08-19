import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Monitor, QrCode, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { templateById } from "@/data/mock";
import { DateExperience, defaultDateConfig, type DateConfig } from "@/components/experience/DateExperience";

export const Route = createFileRoute("/create/$templateId")({
  loader: ({ params }) => {
    const template = templateById(params.templateId);
    if (!template) throw notFound();
    return { template };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.template.name ?? "Editor";
    return {
      meta: [
        { title: `Customize ${name} — Sendable` },
        {
          name: "description",
          content: `Personalize the ${name} experience with your own words, colors and photos, then publish it as a link.`,
        },
        { property: "og:title", content: `Customize ${name} — Sendable` },
        {
          property: "og:description",
          content: "Edit on the left, watch it change on the right, publish when it feels right.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Editor,
});

const tones: { id: DateConfig["tone"]; label: string; swatch: string }[] = [
  { id: "blush", label: "Blush", swatch: "bg-blush" },
  { id: "honey", label: "Honey", swatch: "bg-honey" },
  { id: "mint", label: "Mint", swatch: "bg-mint" },
  { id: "sky", label: "Sky", swatch: "bg-sky" },
  { id: "grape", label: "Grape", swatch: "bg-grape" },
];

function Editor() {
  const { template } = Route.useLoaderData();
  const [config, setConfig] = useState<DateConfig>(defaultDateConfig);
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [published, setPublished] = useState(false);

  const slug = `${config.recipient.toLowerCase().replace(/\s+/g, "-") || "someone"}-${template.id}`;
  const url = `https://sendable.app/p/${slug}`;
  const set = (patch: Partial<DateConfig>) => setConfig((c) => ({ ...c, ...patch }));

  const controls = (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="recipient">Recipient name</Label>
        <Input
          id="recipient"
          value={config.recipient}
          onChange={(e) => set({ recipient: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sender">Your name</Label>
        <Input id="sender" value={config.sender} onChange={(e) => set({ sender: e.target.value })} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="question">The question</Label>
        <Input
          id="question"
          value={config.question}
          onChange={(e) => set({ question: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="yes">YES label</Label>
          <Input id="yes" value={config.yesLabel} onChange={(e) => set({ yesLabel: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="no">NO label</Label>
          <Input id="no" value={config.noLabel} onChange={(e) => set({ noLabel: e.target.value })} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="final">Final message</Label>
        <Textarea
          id="final"
          rows={2}
          value={config.finalMessage}
          onChange={(e) => set({ finalMessage: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Background mood</Label>
        <div className="flex gap-2">
          {tones.map((t) => (
            <button
              key={t.id}
              onClick={() => set({ tone: t.id })}
              aria-label={t.label}
              aria-pressed={config.tone === t.id}
              className={`size-10 rounded-full ink-outline ${t.swatch} ${
                config.tone === t.id ? "shadow-pop" : ""
              }`}
            />
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-honey p-4 text-sm font-bold text-honey-foreground ink-outline">
        Photos, music and custom animations are premium. 🍯
      </div>
      <Button variant="hero" size="lg" className="w-full" onClick={() => setPublished(true)}>
        Publish
      </Button>
    </div>
  );

  const preview = (
    <div
      className={`mx-auto w-full overflow-hidden rounded-3xl ink-outline shadow-pop ${
        device === "mobile" ? "max-w-[390px]" : "max-w-full"
      }`}
    >
      <div className="max-h-[720px] overflow-y-auto">
        <DateExperience config={config} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary">
      <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b-[2.5px] border-border bg-background px-4 py-3">
        <div>
          <Link to="/templates" className="text-xs font-bold text-muted-foreground">
            ← Templates
          </Link>
          <h1 className="font-display text-xl leading-tight">Customizing {template.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden gap-1 rounded-full bg-secondary p-1 ink-outline lg:flex">
            <button
              onClick={() => setDevice("mobile")}
              aria-label="Mobile preview"
              className={`grid size-8 place-items-center rounded-full ${device === "mobile" ? "bg-card" : ""}`}
            >
              <Smartphone className="size-4" />
            </button>
            <button
              onClick={() => setDevice("desktop")}
              aria-label="Desktop preview"
              className={`grid size-8 place-items-center rounded-full ${device === "desktop" ? "bg-card" : ""}`}
            >
              <Monitor className="size-4" />
            </button>
          </div>
          <Button variant="cream" size="sm" onClick={() => setPublished(true)}>
            Publish
          </Button>
        </div>
      </header>

      {/* Desktop: controls + live preview */}
      <div className="hidden lg:grid lg:grid-cols-[360px_1fr]">
        <aside className="h-[calc(100vh-64px)] overflow-y-auto border-r-[2.5px] border-border bg-background p-5">
          {controls}
        </aside>
        <section className="p-6">{preview}</section>
      </div>

      {/* Mobile: edit / preview tabs */}
      <div className="lg:hidden">
        <Tabs defaultValue="edit" className="p-4">
          <TabsList className="w-full">
            <TabsTrigger value="edit" className="flex-1">
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex-1">
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="mt-4 rounded-3xl bg-background p-4 ink-outline">
            {controls}
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            {preview}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={published} onOpenChange={setPublished}>
        <DialogContent className="rounded-3xl ink-outline">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Your experience is ready! 🎉
            </DialogTitle>
            <DialogDescription>
              Send this link to {config.recipient}. They don't need an account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 rounded-2xl bg-secondary p-3 ink-outline">
            <code className="flex-1 truncate text-sm font-bold">{url}</code>
            <Button
              size="sm"
              variant="cream"
              onClick={() => {
                navigator.clipboard?.writeText(url);
                toast.success("Link copied");
              }}
            >
              <Copy className="size-4" /> Copy
            </Button>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-card p-4 ink-outline">
            <span className="grid size-20 place-items-center rounded-xl bg-secondary ink-outline">
              <QrCode className="size-10" />
            </span>
            <p className="text-sm text-muted-foreground">
              QR code ready for printed cards and invitations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="mint" onClick={() => toast("Shared to WhatsApp (demo)")}>
              WhatsApp
            </Button>
            <Button variant="sky" onClick={() => toast("Shared to Telegram (demo)")}>
              Telegram
            </Button>
            <Button asChild variant="cream" className="col-span-2">
              <Link to="/p/$slug" params={{ slug }}>
                Open the live experience
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
