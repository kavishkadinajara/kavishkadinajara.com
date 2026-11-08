export interface Project {
  title: string;
  tag: string;
  description: string;
  badge: string;
  badgeVariant?: "blue" | "cyan" | "green" | "yellow" | "purple";
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Sethika – Donation & Dana Sponsorship Platform",
    tag: "Social Impact · Full Stack",
    description:
      "Platform for temples, kovils, mosques, churches, elders' and children's homes to publish meal/donation needs and let donors sponsor them. Institution onboarding with legal-document verification and admin approval, and database-driven RBAC down to screen, button and action level (view, create, edit, approve, reject) across 3 user types. Next.js, .NET (C#), SQL Server, Redis.",
    badge: "In Development",
    badgeVariant: "yellow",
    // No public link yet.
  },
  {
    title: "Kotasa – Shared Expense & Budget Manager",
    tag: "FinTech · Web",
    description:
      "Office expense-splitting app for meals, rides and any shared cost, with equal/custom splits, who-owes-whom tracking, budgets with limits and weekly bills sent by SMS. Google sign-in with admin approval for unknown accounts; non-registered members still receive SMS bills and can view their breakdown. Next.js, Supabase, Vercel.",
    badge: "In Development",
    badgeVariant: "yellow",
    // No public link yet.
  },
  {
    title: "MediChainLK",
    tag: "AI-Powered · Healthcare",
    description:
      "AI pharmacy platform for Sri Lanka — Google Cloud Vision OCR + spaCy NLP for prescription reading, Firebase RBAC, PickMe/PayHere integrations. Turborepo monorepo with Next.js 15, NestJS, FastAPI, React Native Expo. AWS Mumbai.",
    badge: "In Development",
    badgeVariant: "yellow",
    liveUrl: "https://medi-chainlk-demo.vercel.app",
    liveLabel: "Demo",
  },
  {
    title: "FileFlowOne (FYP)",
    tag: "Research · AI",
    description:
      "Open-source privacy-first file converter. Research: edge-based SLMs for semantic transformation. Novel Semantic Fidelity Index (SFI): 0.35·S_structural + 0.45·S_semantic + 0.20·S_functional. FastAPI + sentence-transformers.",
    badge: "Research",
    badgeVariant: "purple",
    liveUrl: "https://fileflow-one.vercel.app",
  },
  {
    title: "VIMMIK Portfolio",
    tag: "Design · Next.js",
    description:
      'Portfolio site for Sri Lankan software company. "Mechanical Falcon" dark navy design with animated peregrine falcon SVG + Framer Motion scroll transitions.',
    badge: "Live",
    badgeVariant: "cyan",
    liveUrl: "https://vimmik.vercel.app/",
  },
  {
    title: "Eventure",
    tag: "Hackathon · Top 5",
    description:
      'Event ticketing platform — placed 5th among 100+ teams at WSO2 "Innovate with Ballerina" hackathon. QR-based verification, ticket sales, photo submissions.',
    badge: "Hackathon 🏆",
    badgeVariant: "yellow",
    // TODO: add Eventure repo URL
  },
  {
    title: "Care32",
    tag: "Healthcare · Web",
    description:
      "Dental clinic management — patient records, doctor schedules, appointments, real-time updates via Supabase. Next.js + Tailwind.",
    badge: "Live",
    badgeVariant: "green",
    // TODO: swap for the production URL if/when Care32 gets one (currently the Vercel test deployment).
    liveUrl: "https://care32test.vercel.app",
  },
  {
    title: "MinistoreX",
    tag: "Mobile · Android",
    description:
      "Kotlin + Jetpack Compose debt tracker for small shops. Bilingual (Sinhala/English), Room DB + Supabase sync, Hilt DI, built without Android Studio.",
    badge: "Mobile",
    badgeVariant: "blue",
  },
  {
    title: "EatAtNFC",
    tag: "Restaurant · Web",
    description:
      "Scalable restaurant management — NFC-based menu, Google Places integration, order tracking, cart management, custom SQL. Next.js + TypeScript.",
    badge: "Live",
    badgeVariant: "cyan",
    liveUrl: "https://nfc-self.vercel.app",
  },
];
