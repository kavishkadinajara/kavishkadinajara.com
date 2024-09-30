import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import "@/styles/scrollbar.css";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Vortex } from "@/components/ui/Vortex";
import { Navbar } from "@/components/navbar";
// import i18n from "@/lib/i18n";
// import "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen overflow-x-hidden bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#150a00] via-[#00150e] to-black overflow-auto",
          fontSans.variable,
          "font-poppins", // Add this line to apply the font globally
        )}
      >
        <Vortex
          backgroundColor="black"
          baseHue={120}
          className=""
          particleCount={500}
          rangeY={800}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col">
              <Navbar />
              <main className="">{children}</main>
            </div>
          </Providers>
        </Vortex>
      </body>
    </html>
  );
}
