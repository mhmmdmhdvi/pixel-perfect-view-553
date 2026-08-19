import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { currentUser } from "@/data/mock";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Sendable" },
      {
        name: "description",
        content:
          "Manage your Sendable profile, language, notification preferences, theme and privacy settings.",
      },
      { property: "og:title", content: "Settings — Sendable" },
      { property: "og:description", content: "Profile, language, notifications and privacy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [lang, setLang] = useState<"en" | "fa">("en");
  const rtl = lang === "fa";

  return (
    <div className="min-h-screen">
      <Header />
      <main
        dir={rtl ? "rtl" : "ltr"}
        className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6"
      >
        <h1 className="font-display text-4xl">{rtl ? "تنظیمات" : "Settings"}</h1>

        <section className="rounded-3xl bg-card p-6 ink-outline shadow-pop">
          <h2 className="font-display text-2xl">{rtl ? "پروفایل" : "Profile"}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="username">{rtl ? "نام کاربری" : "Username"}</Label>
              <Input id="username" defaultValue={currentUser.username} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">{rtl ? "ایمیل" : "Email"}</Label>
              <Input id="email" type="email" defaultValue={currentUser.email} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="password">{rtl ? "رمز عبور جدید" : "New password"}</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </div>
          <Button className="mt-5" onClick={() => toast.success(rtl ? "ذخیره شد" : "Saved")}>
            {rtl ? "ذخیره" : "Save changes"}
          </Button>
        </section>

        <section className="rounded-3xl bg-card p-6 ink-outline shadow-pop">
          <h2 className="font-display text-2xl">{rtl ? "زبان" : "Language"}</h2>
          <div className="mt-4 flex gap-2">
            <Button variant={lang === "en" ? "default" : "cream"} onClick={() => setLang("en")}>
              English
            </Button>
            <Button variant={lang === "fa" ? "default" : "cream"} onClick={() => setLang("fa")}>
              فارسی
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {rtl
              ? "چیدمان و ترازبندی برای فارسی راست‌به‌چپ می‌شود."
              : "Persian switches this page to a right-to-left layout."}
          </p>
        </section>

        <section className="rounded-3xl bg-card p-6 ink-outline shadow-pop">
          <h2 className="font-display text-2xl">{rtl ? "اعلان‌ها" : "Notifications"}</h2>
          <div className="mt-4 space-y-4">
            {(rtl
              ? ["پاسخ‌های جدید", "بازدیدها", "ایمیل هفتگی"]
              : ["New responses", "Views and opens", "Weekly email digest"]
            ).map((label, i) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <Label htmlFor={`notif-${i}`}>{label}</Label>
                <Switch id={`notif-${i}`} defaultChecked={i < 2} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-card p-6 ink-outline shadow-pop">
          <h2 className="font-display text-2xl">{rtl ? "حریم خصوصی" : "Privacy"}</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="hide-brand">
                {rtl ? "حذف برند از صفحه عمومی (پرمیوم)" : "Hide Sendable branding (premium)"}
              </Label>
              <Switch id="hide-brand" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="anon">{rtl ? "پاسخ‌های ناشناس" : "Allow anonymous responses"}</Label>
              <Switch id="anon" defaultChecked />
            </div>
          </div>
          <Button
            variant="destructive"
            className="mt-6"
            onClick={() => toast("Account deletion is disabled in this demo")}
          >
            {rtl ? "حذف حساب" : "Delete account"}
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
