import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  location: string;
  stars: number;
  quote: string;
  tags: string[];
  photos: string[];
}

const TestimonialCard = ({ name, location, stars, quote, tags, photos }: TestimonialCardProps) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = () => setCurrentPhoto((p) => (p + 1) % photos.length);
  const prevPhoto = () => setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length);

  return (
    <div className="flex flex-col bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/20">
      {/* Photo carousel */}
      <div className="relative aspect-[4/3] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPhoto}
            src={photos[currentPhoto]}
            alt={`${name}'s travel experience`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Nav arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={16} className="text-foreground" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={16} className="text-foreground" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPhoto(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentPhoto ? "bg-primary-foreground w-4" : "bg-primary-foreground/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-editorial text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-accent/20 text-accent-foreground/70 border border-accent/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-3">
          {Array.from({ length: stars }).map((_, s) => (
            <svg key={s} className="w-3.5 h-3.5 text-gold fill-current" viewBox="0 0 20 20">
              <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.28l-4.77 2.51.91-5.33L2.27 6.69l5.34-.78L10 1z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <p className="font-body text-sm leading-relaxed text-foreground/70 mb-5 italic flex-1">
          "{quote}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-border/10">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
            <span className="font-impact text-sm text-accent-foreground">
              {name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-editorial text-xs tracking-[0.15em] text-foreground">{name}</p>
            <p className="font-body text-[0.65rem] text-muted-foreground">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
