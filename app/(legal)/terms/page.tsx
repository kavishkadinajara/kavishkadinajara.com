"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconArrowLeft,
  IconClock,
  IconGavel,
  IconLock,
  IconPencil,
  IconUserShield,
} from "@tabler/icons-react";

const SECTIONS = [
  {
    body: "By accessing or using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using this site.",
    color: "text-[#C08552]",
    icon: IconGavel,
    title: "Acceptance of Terms",
  },
  {
    body: "You are responsible for your actions on this site. You must not use the website for illegal purposes, or post or transmit any harmful, offensive, or infringing content.",
    color: "text-[#10B981]",
    icon: IconUserShield,
    title: "User Responsibilities",
  },
  {
    body: "All content and materials available on this site are protected by copyright, trademark, and other intellectual property laws. You may not use, copy, or distribute any content without explicit permission.",
    color: "text-[#F59E0B]",
    icon: IconLock,
    title: "Intellectual Property",
  },
  {
    body: "We reserve the right to modify, suspend, or discontinue the service at any time without notice. We are not liable for any changes or interruptions to our services.",
    color: "text-[#D4A373]",
    icon: IconClock,
    title: "Modifications to Service",
  },
  {
    body: "We may terminate or suspend your access to the website at any time, without notice, for conduct that violates these terms or is harmful to other users or our business.",
    color: "text-[#8B5CF6]",
    icon: IconPencil,
    title: "Termination",
  },
];

export default function TermsOfServicePage() {
  return (
    <div
      className="min-h-screen bg-[#0A0705] text-[#F5EDE6]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(192,133,82,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(192,133,82,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          className="inline-flex items-center gap-2 font-mono text-sm text-[#A8927F] hover:text-[#C08552] transition-colors mb-12"
          href="/"
        >
          <IconArrowLeft size={16} />
          Back to portfolio
        </Link>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <span className="font-mono text-sm text-[#C08552] tracking-widest uppercase">
              legal
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-[#F5EDE6] mt-2">
              Terms of Service
            </h1>
            <p className="font-mono text-sm text-[#A8927F] mt-3">
              Last updated: October 25, 2024
            </p>
            <div className="mt-5 h-px bg-gradient-to-r from-[#C08552] via-[#D4A373] to-transparent" />
          </div>

          <div className="space-y-6">
            {SECTIONS.map(({ body, color, icon: Icon, title }, i) => (
              <motion.div
                key={title}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#1C110B] border border-[rgba(192,133,82,0.12)] rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={color} size={20} />
                  <h2 className="font-display font-semibold text-lg text-[#F5EDE6]">
                    {title}
                  </h2>
                </div>
                <p className="font-body text-[#A8927F] leading-relaxed text-sm">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.65 }}
          >
            <p className="font-mono text-sm text-[#A8927F]">Questions?</p>
            <a
              className="font-mono text-[#C08552] hover:text-[#D4A373] transition-colors mt-1 inline-block"
              href="mailto:hello@kavishkadinajara.com"
            >
              hello@kavishkadinajara.com
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-16 pt-6 border-t border-[rgba(192,133,82,0.1)] flex items-center justify-between">
          <Link href="/">
            <img
              alt="Kavishka Dinajara"
              className="h-8 w-auto object-contain"
              src="/logo.png"
            />
          </Link>
          <Link
            className="font-mono text-xs text-[#A8927F] hover:text-[#F5EDE6] transition-colors"
            href="/privacy-policy"
          >
            Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
