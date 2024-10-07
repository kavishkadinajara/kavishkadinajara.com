import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import { SparklesPreview } from "@/components/SparklesPreview";
import MyProjects from "@/components/MyProjects";
import EmailSection from "@/components/EmailSection";

export default function Home() {
  return (
    <section className="">
      <SparklesPreview>
        <Hero />
      </SparklesPreview>

      <SparklesPreview>
        <AboutMe />
      </SparklesPreview>

      <SparklesPreview>
        <MyProjects />
      </SparklesPreview>

      <SparklesPreview>
        <EmailSection />
      </SparklesPreview>
    </section>
  );
}
