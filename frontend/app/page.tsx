import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AIPreview from "@/components/AIPreview";
import Stats from "@/components/Stats";
import Feature from "@/components/Feature";
import Workflow from "@/components/workflow";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQs";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AIPreview />
      <Stats />
      <Feature/>
      <Workflow/>
      <Pricing/>
      <Footer/>

    </>
  );
}