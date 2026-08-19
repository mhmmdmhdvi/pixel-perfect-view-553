import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { dateDestinations } from "@/data/mock";
import heroCouple from "@/assets/hero-couple.png";

export type DateConfig = {
  recipient: string;
  sender: string;
  question: string;
  yesLabel: string;
  noLabel: string;
  finalMessage: string;
  tone: "blush" | "honey" | "mint" | "sky" | "grape";
};

export const defaultDateConfig: DateConfig = {
  recipient: "Sara",
  sender: "Mehdi",
  question: "Go out on a date?",
  yesLabel: "YES ❤️",
  noLabel: "NO",
  finalMessage: "Can't wait ❤️",
  tone: "blush",
};

const faces = ["🙂", "😯", "😕", "😣", "🥺", "😭"];
const faceLines = [
  "asks, very casually",
  "did not expect that",
  "is a little confused",
  "is getting nervous",
  "is begging now",
  "has fully given up on dignity",
];

const toneSurface: Record<DateConfig["tone"], string> = {
  blush: "bg-blush",
  honey: "bg-honey",
  mint: "bg-mint",
  sky: "bg-sky",
  grape: "bg-grape",
};

type Step = "ask" | "where" | "when" | "done";

export function DateExperience({ config }: { config: DateConfig }) {
  const [attempts, setAttempts] = useState(0);
  const [step, setStep] = useState<Step>("ask");
  const [destination, setDestination] = useState<string | null>(null);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const faceIndex = Math.min(attempts, faces.length - 1);
  const yesScale = 1 + attempts * 0.13;
  const noGone = attempts >= 5;

  const noOffset = useMemo(() => {
    if (attempts === 0) return { x: 0, y: 0, r: 0 };
    const seed = attempts * 47;
    return {
      x: ((seed % 7) - 3) * 26,
      y: ((seed % 5) - 2) * 22,
      r: ((seed % 9) - 4) * 4,
    };
  }, [attempts]);

  return (
    <div
      className={`min-h-screen ${toneSurface[config.tone]} paper-dots flex items-center justify-center px-4 py-10`}
    >
      <div className="w-full max-w-md rounded-4xl bg-card p-6 ink-outline shadow-pop-lg sm:p-8">
        {step === "ask" && (
          <div className="text-center">
            <img
              src={heroCouple}
              alt="Cartoon couple holding a heart"
              width={1024}
              height={1024}
              className="mx-auto h-40 w-40 object-contain animate-float-soft"
            />
            <p className="mt-2 text-sm font-bold text-muted-foreground">
              <span className="text-2xl">{faces[faceIndex]}</span> {config.sender}{" "}
              {faceLines[faceIndex]}
            </p>
            <h1 className="mt-3 font-display text-3xl leading-tight">
              {config.recipient}, {config.question}
            </h1>

            <div className="relative mt-8 flex min-h-36 flex-col items-center gap-4">
              <button
                onClick={() => setStep("where")}
                style={{ transform: `scale(${yesScale})` }}
                className="w-full max-w-xs rounded-full bg-primary px-6 py-4 font-display text-lg font-extrabold text-primary-foreground ink-outline shadow-pop transition-transform duration-300 hover:-translate-y-0.5"
              >
                {config.yesLabel}
              </button>

              {!noGone && (
                <button
                  onMouseEnter={() => setAttempts((a) => a + 1)}
                  onClick={() => setAttempts((a) => a + 1)}
                  style={{
                    transform: `translate(${noOffset.x}px, ${noOffset.y}px) rotate(${noOffset.r}deg)`,
                  }}
                  className="rounded-full bg-muted px-6 py-3 font-display font-bold text-muted-foreground ink-outline transition-transform duration-200"
                >
                  {config.noLabel}
                </button>
              )}
              {noGone && (
                <p className="animate-pop-in text-sm font-bold text-muted-foreground">
                  The NO button ran away. It happens.
                </p>
              )}
            </div>
          </div>
        )}

        {step === "where" && (
          <div className="animate-pop-in">
            <h2 className="text-center font-display text-2xl">Where should we go?</h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {dateDestinations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setDestination(d.label);
                    setStep("when");
                  }}
                  className={`rounded-2xl px-3 py-4 text-sm font-bold ink-outline shadow-pop pop-hover ${
                    destination === d.label ? "bg-primary text-primary-foreground" : "bg-card"
                  }`}
                >
                  <span className="block text-2xl">{d.emoji}</span>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "when" && (
          <form
            className="animate-pop-in space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStep("done");
            }}
          >
            <h2 className="text-center font-display text-2xl">A few little details</h2>
            <div className="space-y-1.5">
              <Label htmlFor="day">Pick a date</Label>
              <Input
                id="day"
                type="date"
                required
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="time">Pick a time (optional)</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">How can I reach you?</Label>
              <Input
                id="phone"
                type="tel"
                required
                placeholder="0912 345 6789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="note">Anything you want to say?</Label>
              <Textarea
                id="note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">
              Send my answer
            </Button>
          </form>
        )}

        {step === "done" && (
          <div className="animate-pop-in text-center">
            <div className="relative mx-auto h-40 w-40">
              <img
                src={heroCouple}
                alt="Cartoon couple celebrating"
                width={1024}
                height={1024}
                className="h-40 w-40 object-contain animate-wobble"
              />
              {["0s", "0.4s", "0.8s"].map((delay, i) => (
                <span
                  key={delay}
                  style={{ animationDelay: delay, left: `${20 + i * 28}%` }}
                  className="absolute bottom-0 animate-heart-rise text-2xl"
                >
                  ❤️
                </span>
              ))}
            </div>
            <h2 className="mt-4 font-display text-3xl">{config.finalMessage}</h2>
            <div className="mt-6 space-y-2 rounded-3xl bg-secondary p-4 text-left text-sm ink-outline">
              <p>
                <strong>Answer:</strong> {config.yesLabel}
              </p>
              <p>
                <strong>Where:</strong> {destination ?? "Surprise me"}
              </p>
              <p>
                <strong>When:</strong> {day || "to be decided"} {time}
              </p>
              {note && (
                <p>
                  <strong>Note:</strong> {note}
                </p>
              )}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {config.sender} has been notified. Made with Sendable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
