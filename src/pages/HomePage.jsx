import { useEffect } from "react";
import Hero from "../components/home/Hero";
import CaseStudy from "../components/home/CaseStudy";
import SelectedWork from "../components/home/SelectedWork";
import HomeExperience from "../components/home/HomeExperience";
import ContactCta from "../components/home/ContactCta";
import Footer from "../components/Footer";
import { useContact } from "../context/ContactContext";

const HomePage = () => {
  const { openContact } = useContact();

  // Keep the tab title correct when navigating back to home within the SPA
  // (the prerendered <title> already covers first load and crawlers).
  useEffect(() => {
    document.title = "Jjay Fabor — Software Engineer, AI Engineering & Automation";
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Hero onOpenContact={openContact} />
      <main>
        <CaseStudy />
        <SelectedWork />
        <HomeExperience />
        <ContactCta onOpenContact={openContact} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
