import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import { SparklesPreview } from "@/components/SparklesPreview";
// import { MyProjects } from "@/components/MyProjects";

export default function Home() {
  return (
    <section className="">
      <SparklesPreview>
        <Hero />
      </SparklesPreview>

      <SparklesPreview>
        <AboutMe />
      </SparklesPreview>

      {/* <SparklesPreview>
        <MyProjects />
      </SparklesPreview> */}
    </section>
  );
}
