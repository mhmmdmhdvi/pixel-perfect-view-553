import { createFileRoute } from "@tanstack/react-router";
import { DateExperience, defaultDateConfig } from "@/components/experience/DateExperience";

export const Route = createFileRoute("/p/$slug")({
  head: () => ({
    meta: [
      { title: "Someone made something for you — Sendable" },
      {
        name: "description",
        content:
          "A little interactive invitation is waiting for you. Open it, answer it, make someone's day.",
      },
      { property: "og:title", content: "Someone made something for you" },
      {
        property: "og:description",
        content: "A little interactive invitation is waiting for you on Sendable.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PublicExperience,
});

function PublicExperience() {
  const { slug } = Route.useParams();
  const recipient = slug.split("-")[0] ?? "you";
  const config = {
    ...defaultDateConfig,
    recipient: recipient.charAt(0).toUpperCase() + recipient.slice(1),
  };

  return <DateExperience config={config} />;
}
