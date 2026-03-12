import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Fish, Moon, TreePine, Flame, Waves, Compass } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

import actRiver from "@/assets/activity-river-view.jpg";
import actExplorer from "@/assets/activity-explorer.jpg";
import actCave from "@/assets/activity-cave.jpg";
import actLodge from "@/assets/activity-lodge.jpg";
import actPetroglyphs from "@/assets/activity-petroglyphs.jpg";
import actThatched from "@/assets/activity-thatched.jpg";
import tKayakSunset from "@/assets/testimonial-kayak-sunset.jpg";

const activities = [
  {
    title: "Pesca de Pirañas",
    description: "A thrilling fishing experience deep in the river ecosystem. Travelers learn traditional techniques from local guides while fishing for piranhas in the Amazonian waters. It combines adrenaline, local knowledge, and a unique culinary experience.",
    image: actRiver,
    icon: Fish,
  },
  {
    title: "Montañismo Nocturno",
    description: "A guided nighttime climb where adventurers explore the jungle or mountain terrain under the stars. Equipped with headlamps, participants discover nocturnal wildlife, sounds of the forest, and a completely different perspective of nature.",
    image: actCave,
    icon: Moon,
  },
  {
    title: "Caminata de Flora y Cultura",
    description: "A guided walk through the surrounding ecosystem where visitors learn about medicinal plants, local flora, and cultural traditions. This activity connects travelers with indigenous knowledge and the environmental richness of the region.",
    image: actExplorer,
    icon: TreePine,
  },
  {
    title: "Fogata de Cuentos",
    description: "An intimate storytelling experience around a campfire. Local guides and community members share legends, myths, and stories of the land while participants enjoy the calm of the night and the warmth of the fire.",
    image: actThatched,
    icon: Flame,
  },
  {
    title: "Kayak por el Río Asa",
    description: "A peaceful yet adventurous kayak journey through the Asa River. Surrounded by pristine nature, participants paddle through calm waters while observing birds, vegetation, and the unique landscape of the region.",
    image: tKayakSunset,
    icon: Waves,
  },
  {
    title: "Viaje a la Estrella Fluvial de Oriente",
    description: "An expedition to one of Colombia's most extraordinary natural phenomena, where multiple rivers converge. This journey combines exploration, breathtaking landscapes, and the chance to witness a rare geographical wonder.",
    image: actLodge,
    icon: Compass,
  },
  {
    title: "Nado con Delfines Rosados",
    description: "A once-in-a-lifetime experience where travelers can observe—and in certain areas swim near—the iconic pink river dolphins in their natural habitat, guided responsibly to respect and protect wildlife.",
    image: actPetroglyphs,
    icon: Waves,
  },
];

const Activities = () => {
  return (
    <div className="bg-[hsl(var(--section-dark))] text-[hsl(var(--section-dark-foreground))] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative h-[70vh] md:h-[85vh] w-full flex items-end overflow-hidden">
        <img
          src={actRiver}
          alt="Panoramic view of the Amazon river and jungle canopy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--section-dark))] via-[hsl(var(--section-dark)/0.4)] to-transparent" />
        <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <motion.p
            className="font-editorial text-xs tracking-[0.4em] opacity-60 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Our Activities
          </motion.p>
          <motion.h1
            className="font-impact text-[clamp(2.5rem,8vw,5rem)] leading-[0.95]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            WHERE COMFORT DISAPPEARS AND ADVENTURE BEGINS
          </motion.h1>
          <motion.p
            className="font-body text-base md:text-lg opacity-60 mt-6 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Seven immersive experiences designed to connect you with the raw beauty, culture, and spirit of the Colombian Amazon.
          </motion.p>
        </div>
      </section>

      {/* ─── ACTIVITIES ─── */}
      <section className="py-24 md:py-32">
        {activities.map((activity, i) => {
          const Icon = activity.icon;
          const isReversed = i % 2 !== 0;

          return (
            <ScrollReveal key={activity.title} delay={0.05}>
              <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch mb-0`}>
                {/* Image */}
                <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden relative group">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--section-dark)/0.5)] to-transparent opacity-60" />
                  {/* Floating number */}
                  <div className="absolute top-6 left-6 font-impact text-6xl md:text-8xl opacity-10">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-20">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon size={20} className="text-[hsl(var(--accent))]" />
                  </div>

                  <h2 className="font-impact text-2xl md:text-4xl mb-6 leading-tight">
                    {activity.title}
                  </h2>

                  <p className="font-body text-sm md:text-base opacity-60 leading-relaxed mb-8">
                    {activity.description}
                  </p>

                  <div className="w-12 h-px bg-[hsl(var(--accent)/0.4)]" />
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-32 px-6 border-t border-[hsl(var(--section-dark-foreground)/0.08)]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-editorial text-xs tracking-[0.4em] opacity-40 mb-6">
              Ready to Begin?
            </p>
            <h2 className="font-impact text-[clamp(2rem,6vw,4rem)] mb-6">
              START YOUR EXPEDITION
            </h2>
            <p className="font-body text-base opacity-60 mb-10 max-w-lg mx-auto">
              Every experience is guided by locals who know the land intimately. Contact us to craft your perfect journey.
            </p>
            <Link to="/amazonas" className="btn-premium-light inline-block">
              Explore Amazonas
            </Link>
          </ScrollReveal>
        </div>
      </section>

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

export default Activities;
