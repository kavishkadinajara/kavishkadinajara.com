import dynamic from "next/dynamic";

import Navbar from "@/components/portfolio/layout/Navbar";
import Hero from "@/components/portfolio/sections/Hero";
import About from "@/components/portfolio/sections/About";
import Experience from "@/components/portfolio/sections/Experience";
import Projects from "@/components/portfolio/sections/Projects";
import Skills from "@/components/portfolio/sections/Skills";
import Achievements from "@/components/portfolio/sections/Achievements";
import BlogLatestSection from "@/components/blog/BlogLatestSection";
import Contact from "@/components/portfolio/sections/Contact";
import Footer from "@/components/portfolio/layout/Footer";

const ParticleBackground = dynamic(
  () => import("@/components/portfolio/ui/ParticleBackground"),
  { ssr: false },
);

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <BlogLatestSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
