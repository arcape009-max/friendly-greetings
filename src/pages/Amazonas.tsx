import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Users, Plane, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import heroAmazonas from "@/assets/hero-amazonas.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const itinerary = [
  { day: 1, title: "Journey along the Inírida River", desc: "Explore the Honey and Handicrafts Route in the Community of La Ceiba. Continue to the Cerros de Mavicure and enjoy the landscape at sunset." },
  { day: 2, title: "Cerros de Mavicure", desc: "Early morning ascent to witness the sunrise, accompanied by Indigenous legends and stories. Afternoon safari-style hike toward Cerro Diablo at sunset." },
  { day: 3, title: "River Star of the South and Ecolodge Yupi Nai", desc: "Spend time at the beach and explore the surroundings by kayak or canoe, observing birds and fish. Evening storytelling under the stars." },
  { day: 4, title: "White Sand Savannas", desc: "Walking and canoe safari through streams with crystal-clear reddish waters. Wildlife and flora observation, including carnivorous plants and the Flor de Inírida. Encounter with river dolphins (toninas). In the afternoon, participate in an artisanal fishing experience with local communities." },
  { day: 5, title: "The Resonance of the Petroglyphs", desc: "Morning birdwatching in the forest. Navigation through the sacred landscape of the Atabapo River. Explore ancient petroglyphs while learning about ancestral myths. Night excursion to observe birds and amphibians." },
  { day: 6, title: "Trail to Piedra Yavi", desc: "Immerse yourself in diverse ecosystems on the way to the sacred forest of Piedra Yavi. Participate in a forest therapy experience with intercultural dialogue. In the afternoon, kayak and canoe along the Cuitara stream in a peaceful natural setting." },
  { day: 7, title: "The Sacred Cave of the Piaroa People", desc: "Climb to the \"Stone of the Spring,\" descend via rappelling, and explore its interior. Visit traditional agricultural plots (conucos) to learn about medicinal plants, Amazonian fruits, and cassava — a staple food of Indigenous communities. Evening integration bonfire on the beach." },
  { day: 8, title: "Departure", desc: "Return to Inírida and transfer to the airport for departure." },
];

const included = [
  "Ground and river transportation",
  "Flight(s) Bogotá–Puerto Inírida",
  "Accommodation in malokas (2 nights) and Yupi Nai Ecolodge (5 nights)",
  "3 daily meals & permanent hydration",
  "Permanent guidance and Indigenous accompaniment",
  "Tourism contribution",
  "Travel insurance",
  "English-speaking guide",
  "Hotel in Bogotá (up to 3 days)",
  "Private transportation in Bogotá",
];

const notIncluded = [
  "International flights",
  "Alcoholic beverages",
  "Tourism tax of £21",
];

const PRICE_PER_PERSON = 2250;

const Amazonas = () => {
  const [people, setPeople] = useState(1);
  const [showItinerary, setShowItinerary] = useState(false);
  const [travelDate, setTravelDate] = useState("2026-06-15");

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative h-screen w-full flex items-end overflow-hidden">
        <img
          src={heroAmazonas}
          alt="Cerros de Mavecure shrouded in mist"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        <Link
          to="/"
          className="absolute top-8 left-8 z-20 flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-editorial text-xs"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24">
          <motion.h1
            className="font-impact text-[clamp(3rem,10vw,8rem)] leading-[0.9] text-primary-foreground"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Guainía,
            <br />
            Colombia
          </motion.h1>
          <motion.p
            className="font-body text-lg md:text-xl text-primary-foreground/70 mt-6 max-w-lg italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            There are places where magic becomes reality.
          </motion.p>
        </div>
      </section>

      {/* ─── LETTER ─── */}
      <section className="py-32 md:py-48 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-editorial text-xs tracking-[0.4em] text-muted-foreground mb-12">
              A letter for the future adventurer
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="font-body text-base md:text-lg leading-[2] space-y-8 text-foreground/80">
              <p className="drop-cap">
                You will travel to one of the most magical and remote places in
                the Amazon: Guainía, the land of many waters, home to the
                Indigenous peoples of Curripaco, Puinave, Tukano, and Sikuani;
                guardian of the sacred Mavecure hills, River Star of the South,
                and the white-sand beaches of the Atabapo River.
              </p>
              <p>
                You will explore unique ecosystems — the imposing Cerros de
                Mavecure, rivers and streams with dark and crystal-clear waters,
                white-sand savannas, and ancestral agroecosystems — while staying
                in Indigenous communities, sharing their daily rhythms,
                traditional cuisine, and knowledge passed down through
                generations, always in harmony with nature.
              </p>
              <p>
                You will walk through the territories of the jaguar and the
                tapir, across landscapes inhabited by monkeys, deer, and giant
                river otters. You will navigate alongside river dolphins — the
                toninas — and discover wild orchids, carnivorous plants, and the
                Flor de Inírida, the symbol of Guainía. Among ancient rocks, you
                will find petroglyphs that tell old stories, engraved long before
                maps existed.
              </p>
              <p>
                This is an authentic and transformative experience. A journey to
                immerse yourself in the deep history of the Amazon territory, its
                biodiversity, and its ancestral cultures; to listen more and move
                slowly; to remember that nature is not a stage, but a shared
                home. Here you will not find manufactured experiences. Everything
                is authentic, everything is real. It is community-based tourism,
                built with respect in sacred and ancestral territories that are
                visited with humility and remembered forever.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="px-6 md:px-16 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[gallery1, gallery2, gallery3, gallery4].map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`overflow-hidden ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
                <img
                  src={img}
                  alt={`Guainía gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── PACKAGE BUILDER ─── */}
      <section className="section-dark py-32 md:py-40 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-editorial text-xs tracking-[0.4em] opacity-60 mb-4">
              Concierge
            </p>
            <h2 className="font-impact text-[clamp(2rem,5vw,3.5rem)] mb-16">
              Design Your Own Package
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Days */}
              <div>
                <label className="font-editorial text-[0.65rem] tracking-[0.3em] opacity-60 block mb-3">
                  <Clock size={14} className="inline mr-2 -mt-0.5" />
                  How many days?
                </label>
                <select className="w-full bg-transparent border border-section-dark-foreground/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-section-dark-foreground/50 transition-colors">
                  <option value="8">8 Days</option>
                </select>
              </div>

              {/* Flights */}
              <div>
                <label className="font-editorial text-[0.65rem] tracking-[0.3em] opacity-60 block mb-3">
                  <Plane size={14} className="inline mr-2 -mt-0.5" />
                  Local flights included?
                </label>
                <select className="w-full bg-transparent border border-section-dark-foreground/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-section-dark-foreground/50 transition-colors">
                  <option>Yes (Bogotá - Puerto Inírida)</option>
                </select>
              </div>

              {/* People */}
              <div>
                <label className="font-editorial text-[0.65rem] tracking-[0.3em] opacity-60 block mb-3">
                  <Users size={14} className="inline mr-2 -mt-0.5" />
                  How many people?
                </label>
                <input
                  type="number"
                  min={1}
                  value={people}
                  onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-transparent border border-section-dark-foreground/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-section-dark-foreground/50 transition-colors"
                />
              </div>

              {/* Date */}
              <div>
                <label className="font-editorial text-[0.65rem] tracking-[0.3em] opacity-60 block mb-3">
                  <Calendar size={14} className="inline mr-2 -mt-0.5" />
                  When do you want to go?
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-transparent border border-section-dark-foreground/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-section-dark-foreground/50 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={() => setShowItinerary(true)}
              className="btn-premium-light w-full md:w-auto"
            >
              View My Itinerary & Price
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── ITINERARY & PRICING (revealed) ─── */}
      <AnimatePresence>
        {showItinerary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Itinerary */}
            <section className="py-32 md:py-40 px-6">
              <div className="max-w-3xl mx-auto">
                <ScrollReveal>
                  <p className="font-editorial text-xs tracking-[0.4em] text-muted-foreground mb-4">
                    Your Journey
                  </p>
                  <h2 className="font-impact text-[clamp(2rem,5vw,3.5rem)] mb-20">
                    8-Day Itinerary
                  </h2>
                </ScrollReveal>

                <div className="relative pl-10 md:pl-16">
                  <div className="timeline-line ml-3" />
                  {itinerary.map((item, i) => (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <div className="mb-14 relative">
                        <div className="absolute -left-10 md:-left-16 top-1 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        </div>
                        <p className="font-editorial text-[0.6rem] tracking-[0.3em] text-muted-foreground mb-2">
                          Day {item.day}
                        </p>
                        <h3 className="font-impact text-xl md:text-2xl mb-3">
                          {item.title}
                        </h3>
                        <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="section-dark py-32 md:py-40 px-6">
              <div className="max-w-3xl mx-auto">
                <ScrollReveal>
                  <div className="grid md:grid-cols-2 gap-16 mb-20">
                    <div>
                      <p className="font-editorial text-[0.65rem] tracking-[0.3em] opacity-60 mb-6">
                        What's Included
                      </p>
                      <ul className="space-y-3">
                        {included.map((item, i) => (
                          <li key={i} className="font-body text-sm opacity-80 flex items-start gap-3">
                            <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-editorial text-[0.65rem] tracking-[0.3em] opacity-60 mb-6">
                        Not Included
                      </p>
                      <ul className="space-y-3">
                        {notIncluded.map((item, i) => (
                          <li key={i} className="font-body text-sm opacity-60 flex items-start gap-3">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="border-t border-section-dark-foreground/10 pt-16 text-center">
                    <p className="font-editorial text-[0.65rem] tracking-[0.3em] opacity-60 mb-3">
                      Price per person
                    </p>
                    <p className="font-impact text-4xl md:text-5xl mb-2">
                      £{PRICE_PER_PERSON.toLocaleString()}
                    </p>
                    <p className="font-body text-sm opacity-60 mb-3">
                      {people} {people === 1 ? "person" : "people"}
                    </p>
                    <p className="font-impact text-5xl md:text-6xl mb-16">
                      Total: £{(PRICE_PER_PERSON * people).toLocaleString()}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="btn-paypal">
                        Pay with PayPal
                      </button>
                      <button className="btn-card">
                        Pay with Credit Card
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FOOTER ─── */}
      <footer className="py-16 px-6 text-center">
        <p className="font-editorial text-[0.6rem] tracking-[0.4em] text-muted-foreground">
          © 2026 IMMERSA. All rights reserved.
        </p>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Amazonas;
