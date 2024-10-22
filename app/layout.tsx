import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import "@/styles/scrollbar.css";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

// import { Navbar } from "@/components/navbar";
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
        <link href="https://kavishkadinajara.com/" rel="canonical" />
        <meta
          content="kavishka dinajara, kavishka, Web Developer, Software Engineer, Node.js, Express.js, Next.js, Python, SQL, NoSQL, Tailwind, Redis, Responsive Web Design, Kavi, Kavishka Dinajara"
          name="keywords"
        />
        <meta content="Kavishka Dinajara" name="author" />

        {/* favicon */}
        <link
          href="favicon/dark/apple-icon-57x57.png"
          rel="apple-touch-icon"
          sizes="57x57"
        />
        <link
          href="favicon/dark/apple-icon-60x60.png"
          rel="apple-touch-icon"
          sizes="60x60"
        />
        <link
          href="favicon/dark/apple-icon-72x72.png"
          rel="apple-touch-icon"
          sizes="72x72"
        />
        <link
          href="favicon/dark/apple-icon-76x76.png"
          rel="apple-touch-icon"
          sizes="76x76"
        />
        <link
          href="favicon/dark/apple-icon-114x114.png"
          rel="apple-touch-icon"
          sizes="114x114"
        />
        <link
          href="favicon/dark/apple-icon-120x120.png"
          rel="apple-touch-icon"
          sizes="120x120"
        />
        <link
          href="favicon/dark/apple-icon-144x144.png"
          rel="apple-touch-icon"
          sizes="144x144"
        />
        <link
          href="favicon/dark/apple-icon-152x152.png"
          rel="apple-touch-icon"
          sizes="152x152"
        />
        <link
          href="favicon/dark/apple-icon-180x180.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="favicon/dark/android-icon-192x192.png"
          rel="icon"
          sizes="192x192"
          type="image/png"
        />
        <link
          href="favicon/dark/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="favicon/dark/favicon-96x96.png"
          rel="icon"
          sizes="96x96"
          type="image/png"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta content="https://kavishkadinajara.com/" property="og:url" />
        <meta content="website" property="og:type" />
        <meta content="Kavishka Dinajara" property="og:title" />
        <meta
          content="A Developer specializing in building exceptional websites, applications, and everything in between."
          property="og:description"
        />
        <meta
          content="https://kavishkadinajara.com/social-card.png"
          property="og:image"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="https://kavishkadinajara.com" name="twitter:url" />
        <meta content="Kavishka Dinajara" name="twitter:title" />
        <meta
          content="A Developer specializing in building exceptional websites, applications, and everything in between."
          name="twitter:description"
        />
        <meta
          content="https://kavishkadinajara.com/social-card.png"
          name="twitter:image"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black ",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col">
            <Navbar />
            {/* <SparklesPreview> */}
            <main className="">{children}</main>
            {/* </SparklesPreview> */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
