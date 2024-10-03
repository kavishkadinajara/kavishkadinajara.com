import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import { SparklesPreview } from "@/components/SparklesPreview";
import { Vortex } from "@/components/ui/Vortex";

export default function Home() {
  return (
    <section className="">
      {/* <Vortex
        backgroundColor="black"
        baseHue={120}
        className="h-full"
        particleCount={500}
        rangeY={800}
      > */}
        {/* <SparklesPreview> */}
          <Hero />
        {/* </SparklesPreview> */}
      {/* </Vortex> */}
      {/* <Vortex
        backgroundColor="black"
        baseHue={120}
        className="h-full"
        particleCount={500}
        rangeY={800}
      > */}
        {/* <SparklesPreview> */}
          <AboutMe />
        {/* </SparklesPreview> */}
      {/* </Vortex> */}
    </section>
  );
}
