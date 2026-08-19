import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/mock";
import { toneBg } from "@/lib/tone";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/templates"
      search={{ category: category.id }}
      className={`group flex flex-col justify-between gap-6 rounded-3xl p-5 ink-outline shadow-pop pop-hover ${toneBg[category.tone]}`}
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-card text-2xl ink-outline transition-transform group-hover:-rotate-6">
        {category.emoji}
      </span>
      <div>
        <h3 className="font-display text-xl leading-tight">{category.name}</h3>
        <p className="mt-1 text-sm opacity-80">{category.tagline}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold">
          Start here
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
