import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";

const SOCIAL = [
  { icon: IconBrandGithub,   href: "https://github.com/KavishkaDinajara",      label: "GitHub"   },
  { icon: IconBrandLinkedin, href: "https://www.linkedin.com/in/kavishka-dinajara", label: "LinkedIn" },
  { icon: IconMail,          href: "mailto:hello@kavishkadinajara.com",         label: "Email"    },
];

export default function Footer() {
  return (
    <footer className="bg-[#140D09] border-t border-[rgba(192,133,82,0.12)] py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Logo */}
          <img
            alt="Kavishka Dinajara"
            className="h-8 w-auto object-contain"
            src="/logo.png"
            style={{ filter: "brightness(1.1)" }}
          />

          {/* Credit */}
          <p className="font-mono text-xs text-[#A8927F] text-center">
            Built with Next.js + caffeine ☕ by Kavishka Dinajara &nbsp;·&nbsp; © 2025
          </p>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                aria-label={label}
                className="text-[#A8927F] hover:text-[#C08552] transition-colors duration-200"
                href={href}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                target={href.startsWith("http") ? "_blank" : undefined}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Legal links row */}
        <div className="mt-6 pt-5 border-t border-[rgba(192,133,82,0.06)] flex items-center justify-center gap-6">
          <Link
            className="font-mono text-xs text-[#A8927F] hover:text-[#C08552] transition-colors"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <span className="text-[rgba(168,146,127,0.3)] text-xs">·</span>
          <Link
            className="font-mono text-xs text-[#A8927F] hover:text-[#C08552] transition-colors"
            href="/terms"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
