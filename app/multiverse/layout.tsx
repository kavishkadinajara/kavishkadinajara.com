import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Multiverse Journey | Kavishka Dinajara",
  description:
    "An immersive 3D fly-through portfolio experience. Scroll to explore coding, literature, rugby, videography, and cooking — the five dimensions of my multiverse.",
};

export default function MultiverseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Override body styles for full-screen 3D — no navbar/footer */}
      <style>{`
        nav, footer { display: none !important; }
      `}</style>
      {children}
    </>
  );
}
