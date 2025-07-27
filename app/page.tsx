import AboutMe from "@/components/AboutMe";
import EmailSection from "@/components/EmailSection";
import HackathonAchievement from "@/components/HackathonAchievement";
import Hero from "@/components/Hero";
import MyProjects from "@/components/MyProjects";
import { SparklesPreview } from "@/components/SparklesPreview";

export default function Home() {
  return (
    <section className="">
      <SparklesPreview>
        <Hero />
      </SparklesPreview>

      <AboutMe />

      <HackathonAchievement />

      <MyProjects />

      <EmailSection />
    </section>
  );
}

