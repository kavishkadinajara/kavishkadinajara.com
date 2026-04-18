import "@/styles/globals.css";
import "@/styles/scrollbar.css";
import { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/portfolio/ui/CustomCursor"),
  { ssr: false },
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kavishka Dinajara — Associate Software Engineer",
    template: "%s | Kavishka Dinajara",
  },
  description:
    "Associate Software Engineer from Sri Lanka specializing in ERP systems, AI platforms, and full-stack development with React, Next.js, and .NET Core.",
  keywords: [
    "Kavishka Dinajara",
    "Kaviska",
    "Associate Software Engineer",
    "Dinajara",
    "Software Engineer Sri Lanka",
    "Full Stack Developer Sri Lanka",
    "React Developer",
    "Next.js Developer",
    ".NET Core Developer",
    "C# Developer",
    "ERP Developer",
    "AgriGen ERP",
    "Agrithmics",
    "Portfolio",
    "Galle Sri Lanka",
  ],
  authors: [{ name: "Kavishka Dinajara", url: "https://kavishkadinajara.com" }],
  creator: "Kavishka Dinajara",
  publisher: "Kavishka Dinajara",

  metadataBase: new URL("https://kavishkadinajara.com"),

  alternates: {
    canonical: "https://kavishkadinajara.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kavishkadinajara.com",
    title: "Kavishka Dinajara — Associate Software Engineer",
    description:
      "Associate Software Engineer from Sri Lanka specializing in ERP systems, AI platforms, and full-stack development.",
    siteName: "Kavishka Dinajara",
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "Kavishka Dinajara — Associate Software Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kavishka Dinajara — Associate Software Engineer",
    description:
      "Associate Software Engineer from Sri Lanka specializing in ERP systems, AI platforms, and full-stack development.",
    images: ["/social-card.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/dark/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/dark/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/favicon/dark/apple-icon-180x180.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large", // ✅ Google image preview size
      "max-snippet": -1,            // ✅ Full snippet allow
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-code",
  },

  // ✅ Category
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050810",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      lang="en"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kavishka Dinajara",
              url: "https://kavishkadinajara.com",
              jobTitle: "Associate Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Agrithmics",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "LK",
                addressRegion: "Central Province",
              },
              sameAs: [
                "https://github.com/kavishkadinajara",
                "https://linkedin.com/in/kavishkadinajara",
              ],
              knowsAbout: [
                "React", "Next.js", ".NET Core", "C#", "ERP Systems",
                "SQL Server", "TypeScript", "Full Stack Development"
              ],
            }),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#050810] text-[#F0F4FF] font-body antialiased">
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}