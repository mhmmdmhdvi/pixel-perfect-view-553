import tplDate from "@/assets/tpl-date.jpg";
import tplBirthday from "@/assets/tpl-birthday.jpg";
import tplGift from "@/assets/tpl-gift.jpg";
import tplProposal from "@/assets/tpl-proposal.jpg";

export type CategoryId =
  | "date"
  | "birthday"
  | "party"
  | "gift"
  | "proposal"
  | "memories"
  | "ama"
  | "questionnaire";

export type Tone = "blush" | "honey" | "mint" | "sky" | "grape";

export type Category = {
  id: CategoryId;
  emoji: string;
  name: string;
  tagline: string;
  tone: Tone;
};

export const categories: Category[] = [
  {
    id: "date",
    emoji: "💕",
    name: "Date",
    tagline: "Ask someone special out in a fun interactive way.",
    tone: "blush",
  },
  {
    id: "birthday",
    emoji: "🎂",
    name: "Birthday",
    tagline: "Create a birthday experience they'll remember.",
    tone: "honey",
  },
  {
    id: "party",
    emoji: "🥳",
    name: "Party",
    tagline: "Create an invitation and collect RSVPs.",
    tone: "sky",
  },
  {
    id: "gift",
    emoji: "🎁",
    name: "Gift Reveal",
    tagline: "Turn your gift into a surprise experience.",
    tone: "mint",
  },
  {
    id: "proposal",
    emoji: "💍",
    name: "Proposal",
    tagline: "Create a beautiful interactive proposal.",
    tone: "blush",
  },
  {
    id: "memories",
    emoji: "📸",
    name: "Memories",
    tagline: "Turn your memories into a story.",
    tone: "grape",
  },
  {
    id: "ama",
    emoji: "❓",
    name: "Ask Me Anything",
    tagline: "Let people ask you anything.",
    tone: "sky",
  },
  {
    id: "questionnaire",
    emoji: "📝",
    name: "Questionnaire",
    tagline: "Create your own interactive questions.",
    tone: "mint",
  },
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);

export type Template = {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  rating: number;
  uses: number;
  premium: boolean;
  creator: string;
  official: boolean;
  comingSoon?: boolean;
  image: string;
  features: string[];
  createdAt: string;
};

export const templates: Template[] = [
  {
    id: "romantic-date",
    name: "Romantic Date",
    category: "date",
    description:
      "The flagship one. A shy cartoon character asks the big question, the NO button runs away, and every answer lands in your inbox.",
    rating: 4.9,
    uses: 8241,
    premium: false,
    creator: "Sendable Studio",
    official: true,
    image: tplDate,
    features: [
      "Runaway NO button",
      "Character reactions",
      "Destination picker",
      "Date & time picker",
      "Reply message",
    ],
    createdAt: "2026-05-02",
  },
  {
    id: "funny-cute-date",
    name: "Funny & Cute Date",
    category: "date",
    description:
      "Same beloved flow, sillier energy. Dramatic character faces, goofy copy and a coffee-shaped confetti finale.",
    rating: 4.8,
    uses: 5120,
    premium: false,
    creator: "Sendable Studio",
    official: true,
    image: tplDate,
    features: ["Goofy reactions", "Coffee confetti", "Custom labels"],
    createdAt: "2026-06-11",
  },
  {
    id: "big-birthday",
    name: "The Big Birthday",
    category: "birthday",
    description:
      "Blow out the candles, pop the confetti, scroll a photo gallery and finish on a handwritten letter.",
    rating: 5,
    uses: 3980,
    premium: true,
    creator: "Sendable Studio",
    official: true,
    image: tplBirthday,
    features: ["Candle blow-out", "Photo gallery", "Final letter", "Music slot"],
    createdAt: "2026-04-18",
  },
  {
    id: "party-rsvp",
    name: "House Party RSVP",
    category: "party",
    description:
      "Cover, details, map placeholder and a three-way RSVP with guest count and food preferences.",
    rating: 4.7,
    uses: 2210,
    premium: false,
    creator: "Sendable Studio",
    official: true,
    image: tplBirthday,
    features: ["Yes / Maybe / No RSVP", "Guest count", "Dietary notes"],
    createdAt: "2026-07-01",
  },
  {
    id: "mystery-gift",
    name: "Mystery Gift Reveal",
    category: "gift",
    description:
      "Three taps, three clues, one reveal. Build suspense before showing what you actually got them.",
    rating: 4.9,
    uses: 1764,
    premium: true,
    creator: "Sendable Studio",
    official: true,
    image: tplGift,
    features: ["Clue steps", "Reveal animation", "Reaction buttons"],
    createdAt: "2026-06-27",
  },
  {
    id: "cinematic-proposal",
    name: "Cinematic Proposal",
    category: "proposal",
    description:
      "Slow, elegant and emotional. Memories fade in one by one before the only question that matters.",
    rating: 5,
    uses: 942,
    premium: true,
    creator: "Sendable Studio",
    official: true,
    image: tplProposal,
    features: ["Memory scenes", "Music slot", "Cinematic transitions"],
    createdAt: "2026-03-09",
  },
  {
    id: "our-story",
    name: "Our Story Timeline",
    category: "memories",
    description:
      "A scrollable timeline of photos, dates and captions that ends with a message about the future.",
    rating: 4.8,
    uses: 1508,
    premium: false,
    creator: "mina.draws",
    official: false,
    image: tplProposal,
    features: ["Timeline", "Captions", "Photo & video slots"],
    createdAt: "2026-07-22",
  },
  {
    id: "ask-me-anything",
    name: "Ask Me Anything",
    category: "ama",
    description:
      "A playful inbox page. Pick a category, drop a question, stay anonymous if you dare.",
    rating: 4.6,
    uses: 4302,
    premium: false,
    creator: "Sendable Studio",
    official: true,
    image: tplGift,
    features: ["Anonymous mode", "Question categories", "Moderation"],
    createdAt: "2026-05-30",
  },
  {
    id: "simple-questionnaire",
    name: "Simple Questionnaire",
    category: "questionnaire",
    description:
      "Build your own flow with headings, choices, ratings and a final thank-you screen.",
    rating: 4.5,
    uses: 1122,
    premium: false,
    creator: "Sendable Studio",
    official: true,
    image: tplBirthday,
    features: ["Structured editor", "10+ blocks", "Final message"],
    createdAt: "2026-08-04",
  },
  {
    id: "ai-crafted",
    name: "AI Crafted Experience",
    category: "date",
    description:
      "Describe the moment and the person. We build the whole experience for you.",
    rating: 0,
    uses: 0,
    premium: true,
    creator: "Sendable Labs",
    official: true,
    comingSoon: true,
    image: tplDate,
    features: ["Prompt to experience", "Regenerate", "Edit before sending"],
    createdAt: "2026-08-15",
  },
];

export const templateById = (id: string) => templates.find((t) => t.id === id);

export type Experience = {
  id: string;
  title: string;
  category: CategoryId;
  slug: string;
  status: "live" | "draft" | "archived";
  views: number;
  responses: number;
  image: string;
  updated: string;
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Sara, coffee on Friday?",
    category: "date",
    slug: "sara-coffee-friday",
    status: "live",
    views: 42,
    responses: 1,
    image: tplDate,
    updated: "2 hours ago",
  },
  {
    id: "exp-2",
    title: "Nima turns 27 🎂",
    category: "birthday",
    slug: "nima-27",
    status: "live",
    views: 186,
    responses: 14,
    image: tplBirthday,
    updated: "yesterday",
  },
  {
    id: "exp-3",
    title: "Rooftop party — bring snacks",
    category: "party",
    slug: "rooftop-party",
    status: "live",
    views: 310,
    responses: 28,
    image: tplGift,
    updated: "3 days ago",
  },
  {
    id: "exp-4",
    title: "Something for you 🎁",
    category: "gift",
    slug: "something-for-you",
    status: "draft",
    views: 0,
    responses: 0,
    image: tplGift,
    updated: "last week",
  },
];

export type ResponseItem = {
  id: string;
  experienceId: string;
  experienceTitle: string;
  category: CategoryId;
  name: string;
  when: string;
  fields: { label: string; value: string }[];
  unread: boolean;
};

export const responses: ResponseItem[] = [
  {
    id: "r-1",
    experienceId: "exp-1",
    experienceTitle: "Romantic Date",
    category: "date",
    name: "Sara",
    when: "Today, 18:42",
    unread: true,
    fields: [
      { label: "Answer", value: "YES ❤️" },
      { label: "Destination", value: "☕ Coffee" },
      { label: "Date", value: "Friday" },
      { label: "Phone", value: "0912 ••• ••34" },
      { label: "Message", value: "Can't wait ❤️" },
    ],
  },
  {
    id: "r-2",
    experienceId: "exp-2",
    experienceTitle: "Nima turns 27",
    category: "birthday",
    name: "Ali",
    when: "Today, 12:10",
    unread: true,
    fields: [
      { label: "Answer", value: "Going 🎉" },
      { label: "Guests", value: "2" },
      { label: "Food", value: "Vegetarian" },
      { label: "Message", value: "Bringing the cake!" },
    ],
  },
  {
    id: "r-3",
    experienceId: "exp-3",
    experienceTitle: "Rooftop party",
    category: "party",
    name: "Parisa",
    when: "Yesterday, 21:03",
    unread: false,
    fields: [
      { label: "Answer", value: "Maybe 🤔" },
      { label: "Message", value: "Depends on my shift, I'll try!" },
    ],
  },
];

export type Notification = {
  id: string;
  emoji: string;
  text: string;
  when: string;
  experience: string;
  unread: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n-1",
    emoji: "❤️",
    text: "Sara accepted your Date invitation.",
    when: "18:42",
    experience: "Sara, coffee on Friday?",
    unread: true,
  },
  {
    id: "n-2",
    emoji: "🎂",
    text: "New RSVP received — 2 guests.",
    when: "12:10",
    experience: "Nima turns 27",
    unread: true,
  },
  {
    id: "n-3",
    emoji: "🎁",
    text: "Someone opened your Gift Reveal.",
    when: "Yesterday",
    experience: "Something for you",
    unread: false,
  },
  {
    id: "n-4",
    emoji: "❓",
    text: "New question received.",
    when: "2 days ago",
    experience: "Ask me anything",
    unread: false,
  },
];

export const currentUser = {
  name: "Mehdi",
  username: "mehdi",
  email: "mehdi@example.com",
};

export const stats = [
  { label: "Active experiences", value: "3", emoji: "✨" },
  { label: "Total responses", value: "43", emoji: "💌" },
  { label: "New responses", value: "2", emoji: "🔔" },
  { label: "Total views", value: "538", emoji: "👀" },
];

export const dateDestinations = [
  { id: "coffee", emoji: "☕", label: "Coffee" },
  { id: "restaurant", emoji: "🍕", label: "Restaurant" },
  { id: "cinema", emoji: "🎬", label: "Cinema" },
  { id: "park", emoji: "🌳", label: "Park" },
  { id: "dessert", emoji: "🍰", label: "Dessert" },
  { id: "surprise", emoji: "✨", label: "Surprise me" },
];
