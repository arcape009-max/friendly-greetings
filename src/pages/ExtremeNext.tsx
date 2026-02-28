import { useState, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  X,
  Flame,
  Compass,
  Globe,
  MapPin,
  Calendar,
  Mountain,
  Loader2,
  Trophy,
  Zap,
  Shield,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const POPULAR_DESTINATIONS = [
  "Bali", "Iceland", "Costa Rica", "Swiss Alps", "Dubai", "Sahara",
  "Patagonia", "New Zealand", "Norway", "Thailand", "Peru", "Japan",
  "Morocco", "Kenya", "Nepal", "Vietnam", "Colombia", "Greece",
];

const EXTREMITY_LEVELS = [
  { value: "moderate", label: "Bold Explorer", icon: Globe, emoji: "🌍" },
  { value: "hardcore", label: "Extreme Adventurer", icon: Compass, emoji: "🧭" },
  { value: "survival", label: "Elite Expedition", icon: Flame, emoji: "🔥" },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "text-green-400",
  Moderate: "text-yellow-400",
  Challenging: "text-orange-400",
  Extreme: "text-red-400",
  Survival: "text-red-600",
};

interface Recommendation {
  name: string;
  country: string;
  matchReason: string;
  extremeFactor: string;
  bestTime: string;
  activities: string[];
  difficulty: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

interface AIResponse {
  adventureScore: number;
  tier: string;
  patterns: string[];
  recommendations: Recommendation[];
}

const ExtremeNext = () => {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [extremity, setExtremity] = useState("moderate");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AIResponse | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = POPULAR_DESTINATIONS.filter(
    (d) =>
      d.toLowerCase().includes(inputValue.toLowerCase()) &&
      !destinations.includes(d) &&
      inputValue.length > 0
  );

  const addDestination = (dest: string) => {
    const trimmed = dest.trim();
    if (trimmed && !destinations.includes(trimmed)) {
      setDestinations((prev) => [...prev, trimmed]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeDestination = (dest: string) => {
    setDestinations((prev) => prev.filter((d) => d !== dest));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addDestination(inputValue);
    }
    if (e.key === "Backspace" && !inputValue && destinations.length > 0) {
      removeDestination(destinations[destinations.length - 1]);
    }
  };

  const handleDiscover = async () => {
    if (destinations.length === 0) {
      toast.error("Add at least one destination you've visited.");
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke("extreme-next", {
        body: { destinations, extremityLevel: extremity },
      });

      if (error) throw error;

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setResults(data as AIResponse);
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err?.message || "Failed to generate recommendations. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-section-dark text-section-dark-foreground overflow-x-hidden">
      {/* ─── HEADER ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity font-editorial text-xs"
        >
          <ArrowLeft size={16} />
          IMMERSA
        </Link>
      </header>

      {/* ─── HERO ─── */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 pt-24 pb-12">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-editorial text-[0.6rem] tracking-[0.5em] opacity-40 mb-6">
            AI-Powered Discovery
          </p>
          <h1 className="font-impact text-[clamp(3rem,10vw,7rem)] leading-[0.9] mb-6">
            EXTREME
            <br />
            <span className="text-accent">NEXT</span>
          </h1>
          <p className="font-body text-base md:text-lg opacity-60 max-w-xl mx-auto">
            Tell us where you've been. We'll show you where you need to go next.
          </p>
        </motion.div>
      </section>

      {/* ─── INPUT SECTION ─── */}
      <section className="px-6 pb-16">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Destination Input */}
          <div className="mb-8">
            <label className="font-editorial text-[0.6rem] tracking-[0.3em] opacity-40 block mb-4">
              Where have you traveled?
            </label>
            <div className="border border-section-dark-foreground/15 p-4 focus-within:border-accent/50 transition-colors">
              {/* Chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                <AnimatePresence>
                  {destinations.map((dest) => (
                    <motion.span
                      key={dest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 text-accent text-xs font-editorial tracking-wider"
                    >
                      <MapPin size={10} />
                      {dest}
                      <button
                        onClick={() => removeDestination(dest)}
                        className="ml-1 opacity-60 hover:opacity-100"
                      >
                        <X size={12} />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
              {/* Input */}
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder={
                    destinations.length === 0
                      ? "Type a city, country, or region..."
                      : "Add another destination..."
                  }
                  className="w-full bg-transparent text-sm font-body outline-none placeholder:opacity-30"
                />
                {/* Autocomplete */}
                <AnimatePresence>
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute top-full left-0 right-0 mt-2 border border-section-dark-foreground/15 bg-section-dark z-20 max-h-40 overflow-y-auto"
                    >
                      {filteredSuggestions.map((s) => (
                        <button
                          key={s}
                          onMouseDown={() => addDestination(s)}
                          className="w-full text-left px-4 py-2.5 text-sm font-body opacity-70 hover:opacity-100 hover:bg-accent/10 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Extremity Toggle */}
          <div className="mb-10">
            <label className="font-editorial text-[0.6rem] tracking-[0.3em] opacity-40 block mb-4">
              How extreme do you want to go?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {EXTREMITY_LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setExtremity(level.value)}
                  className={`border p-4 text-center transition-all duration-300 ${
                    extremity === level.value
                      ? "border-accent bg-accent/10"
                      : "border-section-dark-foreground/15 hover:border-section-dark-foreground/30"
                  }`}
                >
                  <span className="text-2xl block mb-2">{level.emoji}</span>
                  <span className="font-editorial text-[0.55rem] tracking-[0.2em] block">
                    {level.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleDiscover}
            disabled={isLoading || destinations.length === 0}
            className="btn-premium-light w-full flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Analyzing your travel DNA...
              </>
            ) : (
              <>
                <Zap size={16} />
                Discover My Extreme Next
              </>
            )}
          </button>
        </motion.div>
      </section>

      {/* ─── RESULTS ─── */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Adventure Score & Patterns */}
            <section className="px-6 py-20 border-t border-section-dark-foreground/10">
              <div className="max-w-3xl mx-auto text-center">
                <ScrollReveal>
                  <p className="font-editorial text-[0.6rem] tracking-[0.4em] opacity-40 mb-6">
                    Your Travel DNA
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <Trophy size={28} className="text-gold" />
                    <span className="font-impact text-6xl md:text-7xl">
                      {results.adventureScore}
                    </span>
                    <span className="font-editorial text-[0.6rem] tracking-[0.2em] opacity-50 self-end mb-3">
                      / 100
                    </span>
                  </div>
                  <p className="font-impact text-xl md:text-2xl mb-8 text-accent">
                    {results.tier}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {results.patterns.map((pattern, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 border border-section-dark-foreground/15 text-xs font-editorial tracking-wider opacity-60"
                      >
                        {pattern}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* Recommendations */}
            <section className="px-6 pb-32">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <p className="font-editorial text-[0.6rem] tracking-[0.4em] opacity-40 mb-4">
                    Your Extreme Destinations
                  </p>
                  <h2 className="font-impact text-[clamp(2rem,5vw,3.5rem)] mb-16">
                    Where To Go Next
                  </h2>
                </ScrollReveal>

                <div className="space-y-20">
                  {results.recommendations.map((rec, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                      <motion.div
                        className="border border-section-dark-foreground/10 p-8 md:p-12 hover:border-accent/30 transition-colors duration-500"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <span className="font-editorial text-[0.55rem] tracking-[0.3em] opacity-40 block mb-2">
                              Recommendation {i + 1}
                            </span>
                            <h3 className="font-impact text-3xl md:text-4xl">
                              {rec.name}
                            </h3>
                            <p className="font-editorial text-[0.6rem] tracking-[0.3em] opacity-50 mt-1">
                              {rec.country}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`font-impact text-sm ${
                                DIFFICULTY_COLORS[rec.difficulty] || "opacity-70"
                              }`}
                            >
                              {rec.difficulty}
                            </span>
                          </div>
                        </div>

                        <p className="font-body text-base md:text-lg opacity-80 leading-relaxed mb-8 italic">
                          "{rec.description}"
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                          <div>
                            <p className="font-editorial text-[0.55rem] tracking-[0.2em] opacity-40 mb-2">
                              Why it matches you
                            </p>
                            <p className="font-body text-sm opacity-70">
                              {rec.matchReason}
                            </p>
                          </div>
                          <div>
                            <p className="font-editorial text-[0.55rem] tracking-[0.2em] opacity-40 mb-2">
                              The extreme factor
                            </p>
                            <p className="font-body text-sm opacity-70">
                              {rec.extremeFactor}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-xs font-editorial tracking-wider opacity-50">
                          <span className="flex items-center gap-2">
                            <Calendar size={12} />
                            {rec.bestTime}
                          </span>
                          <span className="flex items-center gap-2">
                            <Mountain size={12} />
                            {rec.activities.slice(0, 3).join(" · ")}
                          </span>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA to restart */}
            <section className="px-6 pb-24 text-center">
              <button
                onClick={() => {
                  setResults(null);
                  setDestinations([]);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn-premium-light"
              >
                <Shield size={14} className="inline mr-2 -mt-0.5" />
                Start a New Discovery
              </button>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FOOTER ─── */}
      <footer className="py-16 px-6 text-center border-t border-section-dark-foreground/5">
        <p className="font-editorial text-[0.6rem] tracking-[0.4em] opacity-30">
          © 2026 IMMERSA. All rights reserved.
        </p>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default ExtremeNext;
