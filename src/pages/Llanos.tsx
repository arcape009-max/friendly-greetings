import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Binoculars, TreePine, Sun, Music, Footprints } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

import destLlanos from "@/assets/dest-llanos.jpg";
import llanosBirds from "@/assets/llanos-birds.jpg";
import llanosHorseback from "@/assets/llanos-horseback.jpg";
import llanosCattle from "@/assets/llanos-cattle.jpg";
import tHorses from "@/assets/testimonial-horses.jpg";
import tHorses2 from "@/assets/testimonial-horses-2.jpg";
import tCapybara from "@/assets/testimonial-capybara.jpg";
import tCattle from "@/assets/testimonial-cattle.jpg";
import tDeer from "@/assets/testimonial-deer.jpg";

const wildlife = [
  { name: "Chigüiros (Capybaras)", image: tCapybara, desc: "The world's largest rodent, often seen in herds along riverbanks and flooded plains." },
  { name: "Migratory Birds", image: llanosBirds, desc: "Roseate spoonbills, herons, and hundreds of species fill the skies and wetlands." },
  { name: "White-tailed Deer", image: tDeer, desc: "Graceful deer roaming freely across the endless golden savannas." },
  { name: "Cattle of the Plains", image: tCattle, desc: "Herds moving across the landscape, guided by generations of Llanero cowboys." },
];

const llaneroActivities = [
  { icon: Footprints, title: "Horseback Riding", desc: "Ride across vast savannas alongside experienced Llanero cowboys at sunrise." },
  { icon: Binoculars, title: "Wildlife Safari", desc: "Spot capybaras, caimans, anacondas, and giant anteaters in their natural habitat." },
  { icon: TreePine, title: "Cattle Herding", desc: "Join local cowboys in traditional cattle drives across the open plains." },
  { icon: Sun, title: "Ranch Life", desc: "Experience rural farming traditions and daily life on a working Llanero ranch." },
  { icon: Music, title: "Joropo & Culture", desc: "Feel the rhythm of Joropo—the traditional music and dance of the Llanos." },
];

const Llanos = () => {
  return (
    <div className="bg-[hsl(var(--section-dark))] text-[hsl(var(--section-dark-foreground))] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative h-screen w-full flex items-end overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={destLlanos}
        >
          <source src="/videos/llanos-safari.mov" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--section-dark))] via-[hsl(var(--section-dark)/0.35)] to-transparent" />
        <div className="relative z-10 px-6 md:px-16 pb-20 md:pb-28 max-w-5xl">
          <motion.p
            className="font-editorial text-xs tracking-[0.4em] opacity-50 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            The Colombian Safari
          </motion.p>
          <motion.h1
            className="font-impact text-[clamp(3rem,10vw,7rem)] leading-[0.9]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            LLANOS ORIENTALES
          </motion.h1>
          <motion.p
            className="font-body text-base md:text-lg opacity-55 mt-6 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Where endless golden savannas meet winding rivers, and wildlife roams free across the horizon.
          </motion.p>
        </div>
      </section>

      {/* ─── INTRO NARRATIVE ─── */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-editorial text-xs tracking-[0.4em] opacity-40 mb-8">
              The Eastern Plains
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed opacity-70">
              The Llanos Orientales offer a safari-style adventure across Colombia's immense eastern plains. 
              Endless golden savannas meet winding rivers and wetlands, creating one of the richest ecosystems 
              in the country. Here, travelers can explore remote landscapes where wildlife moves freely across the horizon.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body text-lg md:text-xl leading-relaxed opacity-70 mt-8">
              Visitors may encounter incredible species such as chigüiros (capybaras), jaguars, migratory birds, 
              giant anteaters, caimans, and even anacondas resting along riverbanks. At sunrise and sunset, 
              the plains come alive with the sounds of birds and the movement of wildlife across the savanna.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FULL-WIDTH IMAGE BREAK ─── */}
      <ScrollReveal direction="none">
        <div className="w-full aspect-[21/9] overflow-hidden relative">
          <img
            src={llanosHorseback}
            alt="Horseback riding across the Llanos savannas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--section-dark))] via-transparent to-[hsl(var(--section-dark)/0.2)]" />
          <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16">
            <p className="font-impact text-[clamp(1.5rem,4vw,3rem)] leading-tight opacity-80">
              RIDE THE HORIZON
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* ─── WILDLIFE GRID ─── */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-editorial text-xs tracking-[0.4em] opacity-40 mb-4">
              Wildlife Encounters
            </p>
            <h2 className="font-impact text-[clamp(2rem,5vw,3.5rem)] mb-16">
              THE CREATURES OF THE PLAINS
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wildlife.map((animal, i) => (
              <ScrollReveal key={animal.name} delay={i * 0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--section-dark)/0.85)] via-[hsl(var(--section-dark)/0.2)] to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-impact text-xl md:text-2xl mb-2">{animal.name}</h3>
                    <p className="font-body text-sm opacity-60">{animal.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LLANERO CULTURE ─── */}
      <section className="py-24 md:py-36 px-6 border-t border-[hsl(var(--section-dark-foreground)/0.08)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
            <div className="w-full md:w-1/2">
              <ScrollReveal>
                <p className="font-editorial text-xs tracking-[0.4em] opacity-40 mb-4">
                  Cultural Immersion
                </p>
                <h2 className="font-impact text-[clamp(2rem,5vw,3.5rem)] mb-8 leading-tight">
                  THE LLANERO WAY OF LIFE
                </h2>
                <p className="font-body text-base md:text-lg opacity-60 leading-relaxed mb-8">
                  Experience the daily life of the Llaneros—skilled cattle ranchers known for their deep 
                  connection with the land and animals. For generations, they have shaped the identity of 
                  Colombia's eastern plains, preserving traditions of horsemanship, music, and resilience 
                  that define one of the most authentic cowboy cultures in the Americas.
                </p>
                <div className="w-16 h-px bg-[hsl(var(--accent)/0.4)] mb-10" />

                <div className="space-y-8">
                  {llaneroActivities.map((act, i) => {
                    const Icon = act.icon;
                    return (
                      <ScrollReveal key={act.title} delay={i * 0.08}>
                        <div className="flex gap-4 items-start">
                          <Icon size={18} className="text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-impact text-sm tracking-wide mb-1">{act.title}</h3>
                            <p className="font-body text-sm opacity-50">{act.desc}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <ScrollReveal delay={0.1}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={tHorses2}
                    alt="Llanero cowboys on horseback"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={llanosCattle}
                    alt="Cattle running across the green savanna"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY STRIP ─── */}
      <ScrollReveal direction="none">
        <div className="flex overflow-hidden">
          {[tHorses, destLlanos, llanosBirds, llanosHorseback].map((img, i) => (
            <div key={i} className="w-1/2 md:w-1/4 aspect-square overflow-hidden flex-shrink-0">
              <img src={img} alt="Llanos gallery" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[hsl(var(--section-dark-foreground)/0.08)] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="font-impact text-lg tracking-wide">IMMERSA</Link>
          <p className="font-body text-xs opacity-30">
            © {new Date().getFullYear()} IMMERSA. All rights reserved.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Llanos;
