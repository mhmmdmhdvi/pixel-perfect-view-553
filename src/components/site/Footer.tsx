import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-[2.5px] border-border bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-primary ink-outline">
            <Heart className="size-4 text-primary-foreground" fill="currentColor" />
          </span>
          <p className="font-display text-lg font-extrabold">Sendable</p>
        </div>
        <p className="max-w-xs text-sm text-muted-foreground">
          Little interactive experiences, made to be sent to one person in particular.
        </p>
        <nav className="flex flex-wrap gap-4 text-sm font-bold">
          <Link to="/templates" className="hover:text-primary">
            Templates
          </Link>
          <Link to="/contact" className="hover:text-primary">
            Contact
          </Link>
          <Link to="/settings" className="hover:text-primary">
            Settings
          </Link>
        </nav>
      </div>
    </footer>
  );
}
