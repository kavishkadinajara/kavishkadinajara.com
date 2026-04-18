"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconSend, IconCircleCheck } from "@tabler/icons-react";
import SectionTitle from "@/components/portfolio/ui/SectionTitle";

const CONTACT_LINKS = [
  {
    icon: IconMail,
    label: "Email",
    value: "hello@kavishkadinajara.com",
    href: "mailto:hello@kavishkadinajara.com",
    color: "text-[#0EA5E9]",
    border: "border-[rgba(14,165,233,0.2)]",
    bg: "bg-[rgba(14,165,233,0.08)]",
  },
  {
    icon: IconBrandGithub,
    label: "GitHub",
    value: "github.com/KavishkaDinajara",
    href: "https://github.com/KavishkaDinajara",
    color: "text-[#F0F4FF]",
    border: "border-[rgba(240,244,255,0.1)]",
    bg: "bg-[rgba(240,244,255,0.04)]",
  },
  {
    icon: IconBrandLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/KavishkaDinajara",
    href: "https://linkedin.com/in/KavishkaDinajara",
    color: "text-[#06B6D4]",
    border: "border-[rgba(6,182,212,0.2)]",
    bg: "bg-[rgba(6,182,212,0.08)]",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#050810] grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle prefix="ping kavishka.dev --connect" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="mb-8">
              <h3 className="font-display font-bold text-2xl text-[#F0F4FF] mb-3">
                {"Let's build something."}
              </h3>
              <p className="font-body text-[#8B9EC0] leading-relaxed">
                I&apos;m open to interesting projects, collaborations, and
                conversations about software, science, or anything in between.
              </p>
            </div>

            {CONTACT_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`hover-glow flex items-center gap-4 p-4 rounded-xl border ${link.border} ${link.bg} group transition-all duration-200`}
                >
                  <div className={`shrink-0 ${link.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[#8B9EC0] tracking-wider uppercase">
                      {link.label}
                    </div>
                    <div className={`font-body text-sm mt-0.5 ${link.color} group-hover:underline`}>
                      {link.value}
                    </div>
                  </div>
                </a>
              );
            })}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            {status === "sent" ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                <IconCircleCheck size={48} className="text-[#10B981]" />
                <h4 className="font-display font-bold text-xl text-[#F0F4FF]">Message sent!</h4>
                <p className="font-body text-[#8B9EC0]">
                  {"I'll get back to you soon."}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 font-mono text-sm text-[#0EA5E9] hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-[#8B9EC0] tracking-wider uppercase mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-[#8B9EC0] tracking-wider uppercase mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-[#8B9EC0] tracking-wider uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    required
                    rows={5}
                    className="form-input resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="font-mono text-xs text-red-400">
                    Something went wrong. Try emailing directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0EA5E9] hover:bg-[#0284C7] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-medium text-sm rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
                >
                  <IconSend size={16} />
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
