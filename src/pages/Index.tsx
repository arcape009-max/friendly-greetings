import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, ShieldCheck, CreditCard, Compass, Heart, Users, BookOpen } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";
import TestimonialCard from "@/components/TestimonialCard";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import BestMoments from "@/components/BestMoments";
import heroHome from "@/assets/hero-home.jpg";
import destAmazonas from "@/assets/dest-amazonas.jpg";
import destLlanos from "@/assets/dest-llanos.jpg";
import destNuqui from "@/assets/dest-nuqui.jpg";
import tKayakSunset from "@/assets/testimonial-kayak-sunset.jpg";
import tKayakPaddle from "@/assets/testimonial-kayak-paddle.jpg";
import tThatchedSunset from "@/assets/testimonial-thatched-sunset.jpg";
import tHorses from "@/assets/testimonial-horses.jpg";
import tCanopy from "@/assets/testimonial-canopy.jpg";
import tHorses2 from "@/assets/testimonial-horses-2.jpg";
import tDeer from "@/assets/testimonial-deer.jpg";
import tLagoon from "@/assets/testimonial-lagoon.jpg";
import tCapybara from "@/assets/testimonial-capybara.jpg";
import tCattle from "@/assets/testimonial-cattle.jpg";

const Index = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Navbar />
      {/* ─── HERO ─── */}
      <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <img
          src={heroHome}
          alt="Amazon rainforest canopy at golden hour"
          className="absolute inset-0 w-full h-full object-cover" />

        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="font-impact text-[clamp(4rem,15vw,12rem)] leading-[0.9] text-primary-foreground"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}>

            IMMERSA
          </motion.h1>
          <motion.p
            className="font-editorial text-xs sm:text-sm text-primary-foreground/80 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}>AUTHENTIC TRAVEL. REAL CONNECTION. PUSHING YOURSELF.


          </motion.p>
        </div>
      </section>

      {/* ─── SCROLL-REVEAL INTRO ─── */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/80">
              We believe exploring the world's most remarkable places responsibly
              is possible. We design crew-based expeditions to extreme, remote,
              and culturally intense locations around the world. Discover new
              cultures, experience authentic transformations, and find your true
              self in deep nature.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── VALUE PROPOSITIONS ─── */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-0">
              {[
              { title: "Beyond Agencies", sub: "Raw expeditions, not packaged tours" },
              { title: "Local Experts", sub: "Guides born in the territory" },
              { title: "Co-Created", sub: "Tailor-made with bilingual locals" },
              { title: "60%+ Local Impact", sub: "Trip price benefits communities" }].
              map((item, i) =>
              <div key={i} className="text-center">
                  <div className="w-px h-8 bg-accent/40 mx-auto mb-5" />
                  <h3 className="font-impact text-sm md:text-base tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-foreground/50 leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── DESTINATIONS INTRO ─── */}
      <section className="pt-8 pb-20 md:pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-editorial text-xs tracking-[0.4em] text-muted-foreground mb-6">
              Our Destinations
            </p>
            <h2 className="font-impact text-[clamp(1.8rem,5vw,3.5rem)] leading-[1]">
              THERE ARE PLACES WHERE MAGIC BECOMES REALITY
            </h2>
            <p className="font-body text-sm text-foreground/50 mt-4">
              Discover it by your own.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── DESTINATIONS ─── */}
      <section id="destinations" className="pb-32 md:pb-48 space-y-16 md:space-y-24">
        {/* Amazonas - links to /amazonas */}
        <ScrollReveal direction="left" className="px-6 md:px-16">
          <Link to="/amazonas" className="group block relative">
            <div className="relative w-full md:w-[85%] aspect-[16/9] overflow-hidden">
              <img
                src={destAmazonas}
                alt="Indigenous community in the Amazon"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />

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
              src={destLlanos}
              alt="Horses and cattle grazing in the Colombian Llanos Orientales"
              className="w-full h-full object-cover" />

            <div className="hero-overlay absolute inset-0 opacity-40" />
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-right">
              <h2 className="font-impact text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] text-primary-foreground">
                Llanos Orientales
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
              src={destNuqui}
              alt="Humpback whale breaching near Nuquí Colombia"
              className="w-full h-full object-cover" />

            <div className="hero-overlay absolute inset-0 opacity-40" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <h2 className="font-impact text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] text-primary-foreground">
                Nuquí
              </h2>
              <p className="font-editorial text-xs text-primary-foreground/70 mt-3">
                Coming soon
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── GUEST FEEDBACK ─── */}
      <section className="py-24 md:py-32 px-6 bg-section-green">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-editorial text-xs tracking-[0.4em] text-section-green-foreground/50 mb-6 text-center">
              In Their Words
            </p>
            <h2 className="font-impact text-[clamp(2rem,6vw,4rem)] text-center mb-16 text-section-green-foreground">
              WHAT OUR GUESTS SAY
            </h2>
          </ScrollReveal>

          {(() => {
            const testimonials = [
            {
              name: "Sarah M.",
              location: "London, UK",
              stars: 5,
              tags: ["Jaguar Encounter", "Life-Changing"],
              photos: [tCattle, tThatchedSunset, tDeer],
              quote:
              "Watching a jaguar emerge from the undergrowth ten metres away rewired something in me. I came home a different person — calmer, braver, more grateful. This wasn't a tour; it was a turning point in my life."
            },
            {
              name: "David K.",
              location: "Toronto, Canada",
              stars: 5,
              tags: ["Local Guide", "Cultural Immersion"],
              photos: [tHorses, tLagoon, tCanopy],
              quote:
              "Antonio from the local community walked us through his village, explained every medicinal plant, and cooked us a meal with ingredients he'd just harvested. His warmth and knowledge made this the most meaningful travel experience I've ever had."
            },
            {
              name: "Lucía R.",
              location: "Madrid, Spain",
              stars: 5,
              tags: ["Pink Dolphins", "Local Cuisine", "River Life"],
              photos: [tKayakPaddle, tCapybara, tHorses2],
              quote:
              "The local food alone was worth the trip — fresh river fish, cassava bread, fruits I'd never even heard of. And then a pod of pink dolphins surfaced right beside our canoe. I cried. Honestly, I still can't believe it was real."
            }];

            return (
              <>
                {/* Desktop: grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-6">
                  {testimonials.map((t, i) =>
                  <ScrollReveal key={i} delay={i * 0.12}>
                      <TestimonialCard {...t} />
                    </ScrollReveal>
                  )}
                </div>

                {/* Mobile: carousel */}
                <div className="md:hidden">
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-3">
                      {testimonials.map((t, i) =>
                      <CarouselItem key={i} className="pl-3 basis-[85%]">
                          <TestimonialCard {...t} />
                        </CarouselItem>
                      )}
                    </CarouselContent>
                    <div className="flex justify-center gap-2 mt-6">
                      <CarouselPrevious className="static translate-y-0 h-8 w-8 border-section-green-foreground/20 text-section-green-foreground/60 hover:bg-section-green-foreground/10" />
                      <CarouselNext className="static translate-y-0 h-8 w-8 border-section-green-foreground/20 text-section-green-foreground/60 hover:bg-section-green-foreground/10" />
                    </div>
                  </Carousel>
                </div>
              </>);

          })()}
        </div>
      </section>

      {/* ─── CREW CTA ─── */}
      <section className="section-dark py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-editorial text-xs tracking-[0.4em] opacity-40 mb-6">
              Travel Together
            </p>
            <h2 className="font-impact text-[clamp(2rem,6vw,4rem)] mb-6">
              FIND YOUR CREW
            </h2>
            <p className="font-body text-base opacity-60 mb-10 max-w-lg mx-auto">
              Send us a range of dates and we will let you know if there are any scheduled expeditions. 
            
            </p>
            <Link to="/crew" className="btn-premium-light inline-block">
              Join a Crew
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BEST MOMENTS ─── */}
      <BestMoments />

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
      <section id="our-story" className="section-dark py-32 md:py-48 px-6">
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
              most breathtaking, off-the-grid locations on Earth. This is where
              comfort disappears and growth begins.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-background text-foreground py-20 md:py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="font-editorial text-[0.65rem] tracking-[0.5em] text-foreground/30 mb-4 text-center uppercase">
              Questions
            </p>
            <h2 className="font-impact text-lg md:text-xl tracking-wide text-center mb-14 text-foreground/70">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Accordion type="single" collapsible className="divide-y divide-border/10">
              {[
              {
                q: "How do I reserve an experience?",
                a: "Simply browse our destinations, choose your preferred experience, and click 'Book Now.' You'll be guided through a quick reservation process. If you'd like personalised help, you can also schedule a private call with our team."
              },
              {
                q: "How do I know my reservation is secure and guaranteed?",
                a: "All payments are processed through encrypted, PCI-compliant channels. Once your booking is confirmed, you'll receive a detailed itinerary and confirmation email. We also offer travel insurance options for complete peace of mind."
              },
              {
                q: "Are there any prerequisites before joining an experience?",
                a: "Most of our experiences require a reasonable level of fitness and a spirit of adventure. Specific requirements vary by destination and difficulty level — each listing includes detailed preparation guidelines. Our team is always available to help you get ready."
              },
              {
                q: "Can I schedule a private call to learn more?",
                a: "Absolutely. We encourage it. Book a private call with one of our expedition specialists to discuss your interests, ask questions, and co-create the perfect journey tailored to you."
              }].
              map((item, i) =>
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-none">
                
                  <AccordionTrigger className="font-body text-xs md:text-sm text-foreground/60 hover:text-foreground/90 hover:no-underline py-5 font-normal text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-xs text-foreground/40 leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-14 text-center">
              <a
                href="https://wa.me/447411997085?text=Hi%20IMMERSA%2C%20I'd%20like%20to%20book%20a%20private%20call"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium-light inline-block">
                
                Book a Private Call
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TRUST & INFO ─── */}
      <section id="partners" className="py-16 md:py-20 px-6 border-t border-border/15">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-impact text-xs tracking-wide mb-5 text-foreground/80">Navigate</h4>
              <ul className="space-y-3">
                {[
                { icon: BookOpen, label: "How to Book" },
                { icon: Heart, label: "Our Promise" },
                { icon: Users, label: "About Us" },
                { icon: Compass, label: "Our Guarantees" }].
                map((item) =>
                <li key={item.label}>
                    <a href="#" className="flex items-center gap-2.5 font-body text-xs text-foreground/50 hover:text-foreground transition-colors group">
                      <item.icon size={14} className="text-accent group-hover:text-foreground transition-colors" />
                      {item.label}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Trust & Security */}
            <div>
              <h4 className="font-impact text-xs tracking-wide mb-5 text-foreground/80">Trust & Security</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 font-body text-xs text-foreground/50">
                  <ShieldCheck size={14} className="text-accent" />
                  Travel Insurance
                </li>
                <li className="flex items-center gap-2.5 font-body text-xs text-foreground/50">
                  <CreditCard size={14} className="text-accent" />
                  Secure Payment
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-impact text-xs tracking-wide mb-5 text-foreground/80">Get In Touch</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:hello@immersa.co" className="flex items-center gap-2.5 font-body text-xs text-foreground/50 hover:text-foreground transition-colors">
                    <Mail size={14} className="text-accent" />
                    hello@immersa.co
                  </a>
                </li>
                <li>
                  <a href="tel:+447411997085" className="flex items-center gap-2.5 font-body text-xs text-foreground/50 hover:text-foreground transition-colors">
                    <Phone size={14} className="text-accent" />
                    +44 7411997085
                  </a>
                </li>
              </ul>
            </div>

            {/* Brand */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="font-impact text-lg tracking-wide mb-2 text-foreground/80">IMMERSA</h4>
                <p className="font-body text-[0.65rem] text-foreground/40 leading-relaxed">
                  Authentic travel. Real connection. Pushing yourself beyond the ordinary.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-border/10 text-center">
            <p className="font-editorial text-[0.6rem] tracking-[0.4em] text-muted-foreground">
              © 2026 IMMERSA. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>);

};

export default Index;