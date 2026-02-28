import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import heroHome from "@/assets/hero-home.jpg";
import heroAmazonas from "@/assets/hero-amazonas.jpg";
import destAntarctica from "@/assets/dest-antarctica.jpg";
import destSafari from "@/assets/dest-safari.jpg";

const Index = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <img
          src={heroHome}
          alt="Amazon rainforest canopy at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="font-impact text-[clamp(4rem,15vw,12rem)] leading-[0.9] text-primary-foreground"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            IMMERSA
          </motion.h1>
          <motion.p
            className="font-editorial text-xs sm:text-sm text-primary-foreground/80 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Authentic Travel. Real Connection. Deep Nature.
          </motion.p>
        </div>
      </section>

      {/* ─── SCROLL-REVEAL INTRO ─── */}
      <section className="py-32 md:py-48 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/80">
              We believe exploring the world's most remarkable places responsibly
              is possible. We offer community-based, sustainable tourism that
              takes you to the most wonderful places on Earth. Discover new
              cultures, experience authentic transformations, and find your true
              self in deep nature.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── DESTINATIONS ─── */}
      <section className="pb-32 md:pb-48 space-y-16 md:space-y-24">
        {/* Amazonas - links to /amazonas */}
        <ScrollReveal direction="left" className="px-6 md:px-16">
          <Link to="/amazonas" className="group block relative">
            <div className="relative w-full md:w-[85%] aspect-[16/9] overflow-hidden">
              <img
                src={heroAmazonas}
                alt="Cerros de Mavecure, Amazonas"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="hero-overlay absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                <h2 className="font-impact text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] text-primary-foreground">
                  Amazonas
                </h2>
                <p className="font-editorial text-xs text-primary-foreground/70 mt-3">
                  Explore the journey →
                </p>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* Antarctica */}
        <ScrollReveal direction="right" className="px-6 md:px-16 flex justify-end">
          <div className="relative w-full md:w-[85%] aspect-[16/9] overflow-hidden">
            <img
              src={destAntarctica}
              alt="Antarctic icebergs"
              className="w-full h-full object-cover"
            />
            <div className="hero-overlay absolute inset-0 opacity-40" />
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-right">
              <h2 className="font-impact text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] text-primary-foreground">
                Antarctica
              </h2>
              <p className="font-editorial text-xs text-primary-foreground/70 mt-3">
                Coming soon
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Safari */}
        <ScrollReveal direction="left" className="px-6 md:px-16">
          <div className="relative w-full md:w-[85%] aspect-[16/9] overflow-hidden">
            <img
              src={destSafari}
              alt="African safari at sunset"
              className="w-full h-full object-cover"
            />
            <div className="hero-overlay absolute inset-0 opacity-40" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <h2 className="font-impact text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] text-primary-foreground">
                Safari
              </h2>
              <p className="font-editorial text-xs text-primary-foreground/70 mt-3">
                Coming soon
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── EXTREME NEXT CTA ─── */}
      <section className="section-dark py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-editorial text-xs tracking-[0.4em] opacity-40 mb-6">
              AI-Powered Discovery
            </p>
            <h2 className="font-impact text-[clamp(2rem,6vw,4rem)] mb-6">
              EXTREME NEXT
            </h2>
            <p className="font-body text-base opacity-60 mb-10 max-w-lg mx-auto">
              Tell us where you've been. Our AI analyzes your travel DNA and
              recommends extreme destinations that push your boundaries.
            </p>
            <Link to="/extreme-next" className="btn-premium-light inline-block">
              Discover Your Next Adventure
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="section-dark py-32 md:py-48 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-editorial text-xs tracking-[0.4em] mb-10 opacity-60">
              Our Story
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-lg md:text-xl leading-relaxed opacity-80">
              IMMERSA was born from a University College London (UCL) project
              with a singular vision: to connect passionate travelers with the
              most breathtaking, off-the-grid locations on Earth, ensuring that
              tourism creates a profound, positive social impact on local
              communities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CONTACT / FOOTER ─── */}
      <footer className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-impact text-[clamp(2rem,6vw,4rem)] text-center mb-16">
              Get In Touch
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 font-body text-base">
              <a
                href="mailto:hello@immersa.co"
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Mail size={18} />
                hello@immersa.co
              </a>
              <a
                href="tel:+447411997085"
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Phone size={18} />
                +44 7411997085
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="text-center mt-20">
              <p className="font-editorial text-[0.65rem] tracking-[0.4em] text-muted-foreground">
                © 2026 IMMERSA. All rights reserved.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Index;
