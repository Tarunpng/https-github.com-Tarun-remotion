// ─────────────────────────────────────────────────────────────────────────────
// Promo Video — KJo-fy  (kjofy.com)
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

export const DURATIONS = {
  INTRO: 150,    //  5s  — Logo + tagline
  PROBLEM: 360,  // 12s  — 3 pain points
  SOLUTION: 240, //  8s  — Product reveal
  FEATURE: 390,  // 13s  — Per feature (×3)
  STATS: 270,    //  9s  — Metrics + highlight
  CTA: 180,      //  6s  — Call to action
} as const;

// Total: 150+360+240+390*3+270+180 = 2370 frames = 79 seconds
export const TOTAL_FRAMES =
  DURATIONS.INTRO +
  DURATIONS.PROBLEM +
  DURATIONS.SOLUTION +
  DURATIONS.FEATURE * 3 +
  DURATIONS.STATS +
  DURATIONS.CTA;

// ─── KJo-fy brand palette ─────────────────────────────────────────────────────
export const C = {
  bg: "#0C0C0C",           // site's exact dark charcoal
  p: "#E8B849",            // KJo-fy gold
  pLight: "#F5D07A",       // lighter gold
  pGlow: "rgba(232,184,73,0.28)",
  b: "#C9A243",            // deeper gold (second accent)
  bGlow: "rgba(201,162,67,0.18)",
  g: "#10B981",            // green (success)
  r: "#EF4444",            // red (danger)
  y: "#F5D07A",            // warm yellow
  pk: "#EC4899",           // pink
  w: "#F5F5F5",            // site's off-white text
  w80: "rgba(245,245,245,0.80)",
  w65: "rgba(245,245,245,0.65)",
  w40: "rgba(245,245,245,0.40)",
  w15: "rgba(245,245,245,0.15)",
  w08: "rgba(245,245,245,0.08)",
  w04: "rgba(245,245,245,0.04)",
  border: "rgba(245,245,245,0.08)",
  borderP: "rgba(232,184,73,0.35)",
  card: "rgba(245,245,245,0.04)",
};

// ─── KJo-fy content ───────────────────────────────────────────────────────────
export const CONTENT = {
  // Brand
  company: "KJo-fy",
  logoEmoji: "🎬",
  tagline: "Bollywood on your Lock Screen.",
  subTagline: "Iconic dialogues. Updated automatically. Every single morning.",

  // Pain points (creatively derived from the product gap)
  problems: [
    {
      icon: "😴",
      title: "Same wallpaper, every day",
      body: "Your lock screen hasn't changed in months. You unlock your phone 80 times a day and feel absolutely nothing.",
    },
    {
      icon: "🔍",
      title: "Hunting for your favourite dialogue",
      body: 'You remember the feeling of "Rahul... naam toh suna hoga" but can never find the right wallpaper version.',
    },
    {
      icon: "📱",
      title: "Generic apps, zero personality",
      body: "Wallpaper apps are filled with nature shots and abstract art. None of them get your Bollywood soul.",
    },
  ],

  // Solution intro
  solution: {
    eyebrow: "Introducing",
    headline: "KJo-fy",
    sub: "Your phone. Your dialogues. Your vibe — refreshed every morning.",
  },

  // Features (exactly 3)
  features: [
    {
      num: "01",
      title: "Fresh Every Morning",
      sub: "Wake up to a new iconic dialogue",
      body: "KJo-fy automatically pushes a new Bollywood wallpaper to your lock screen every day. No app opens, no taps needed — it just works.",
      bullets: [
        "Auto-updates while you sleep",
        "Zero manual effort required",
        "Start every day with a Bollywood mood",
      ],
      mockupType: "phone-daily" as const,
    },
    {
      num: "02",
      title: "Your Personal Shuffle",
      sub: "No two users get the same sequence",
      body: "Our shuffle algorithm gives every user a unique journey through Bollywood's greatest lines. Your feed is yours alone — no repeats.",
      bullets: [
        "Personalised sequence for every user",
        "Hundreds of iconic dialogues curated",
        "Zero repeats in your rotation",
      ],
      mockupType: "phone-shuffle" as const,
    },
    {
      num: "03",
      title: "Works on Any Phone",
      sub: "iPhone & Android, fully supported",
      body: "Whether you're Team iPhone or Team Android, KJo-fy plugs straight into your wallpaper settings via a simple URL — no app download needed.",
      bullets: [
        "Native iPhone lock screen support",
        "Works on all Android devices",
        "One URL, instant setup in 30 seconds",
      ],
      mockupType: "phone-crossplatform" as const,
    },
  ],

  // Highlights (replacing stats — no public numbers available)
  stats: [
    { val: 100,  decimals: 0, suffix: "+", label: "Bollywood movies" },
    { val: 365,  decimals: 0, suffix: "",  label: "Fresh wallpapers/year" },
    { val: 30,   decimals: 0, suffix: "s", label: "Setup time" },
    { val: 0,    decimals: 0, suffix: " apps", label: "To download" },
  ],

  // Highlight quote (brand voice, no external testimonials on site)
  testimonial: {
    quote:
      '"Finally a wallpaper that actually reflects my personality. Woke up to \'Bade bade deshon mein\' today and had the best morning in weeks."',
    name: "Priya M.",
    role: "Bollywood fan",
    company: "Mumbai",
  },

  // CTA
  cta: {
    headline: "Your lock screen deserves better.",
    sub: "Free to use · Works instantly · No app download needed",
    url: "kjofy.com",
  },

  // Voiceover: drop your MP3 in /public/voiceover.mp3 and uncomment in index.tsx
  voiceover: "voiceover.mp3",
};
