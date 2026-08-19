import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Template } from "@/data/mock";
import { categoryById } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { toneChip } from "@/lib/tone";

export function TemplateCard({ template }: { template: Template }) {
  const category = categoryById(template.category);

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-card ink-outline shadow-pop pop-hover">
      <Link to="/templates/$id" params={{ id: template.id }} className="block">
        <div className="relative border-b-[2.5px] border-border">
          <img
            src={template.image}
            alt={`${template.name} template preview`}
            loading="lazy"
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover"
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ink-outline ${
              template.premium ? "bg-honey text-honey-foreground" : "bg-card text-foreground"
            }`}
          >
            {template.premium ? "Premium" : "Free"}
          </span>
          {template.comingSoon && (
            <span className="absolute right-3 top-3 rounded-full bg-grape px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-grape-foreground ink-outline">
              Coming soon
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg leading-tight">{template.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {template.official ? "Official" : `by ${template.creator}`}
            </p>
          </div>
          {category && (
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${toneChip[category.tone]}`}
            >
              {category.emoji} {category.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
          {template.comingSoon ? (
            <span>Not released yet</span>
          ) : (
            <>
              <span className="flex items-center gap-1">
                <Star className="size-3.5 text-primary" fill="currentColor" />
                {template.rating.toFixed(1)}
              </span>
              <span>❤️ {template.uses.toLocaleString()} uses</span>
            </>
          )}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
          {template.comingSoon ? (
            <Button variant="cream" size="sm" className="col-span-2" disabled>
              Coming soon
            </Button>
          ) : (
            <>
              <Button asChild variant="cream" size="sm">
                <Link to="/templates/$id" params={{ id: template.id }}>
                  {template.premium ? "Preview" : "Use Free"}
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/create/$templateId" params={{ templateId: template.id }}>
                  Customize
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
