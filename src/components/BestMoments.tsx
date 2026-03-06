import { useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import momentsWildlife from "@/assets/moments-wildlife.jpg";
import momentsCommunities from "@/assets/moments-communities.jpg";
import momentsSpiritual from "@/assets/moments-spiritual.jpg";
import momentsNature from "@/assets/moments-nature.jpg";

const categories = [
  {
    title: "Wildlife Encounters",
    subtitle: "Moments with the untamed",
    poster: momentsWildlife,
    video: "/videos/wildlife.mov",
  },
  {
    title: "Local Communities",
    subtitle: "Culture, people & traditions",
    poster: momentsCommunities,
    video: "/videos/communities.mp4",
  },
  {
    title: "Spiritual Connections",
    subtitle: "Rituals, reflection & sacred places",
    poster: momentsSpiritual,
    video: "/videos/spiritual.mp4",
  },
  {
    title: "Living Nature",
    subtitle: "Landscapes & natural ecosystems",
    poster: momentsNature,
    video: null,
  },
];

const MomentCard = ({
  title,
  subtitle,
  poster,
  video,
}: (typeof categories)[number]) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
    }
  };

  const handleClick = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div
      className="relative aspect-[3/4] overflow-hidden cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Poster image */}
      <img
        src={poster}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110 ${
          playing && video ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
      />

      {/* Video */}
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h3 className="font-impact text-lg md:text-xl text-primary-foreground tracking-wide">
          {title}
        </h3>
        <p className="font-editorial text-[0.65rem] text-primary-foreground/60 mt-2 tracking-[0.15em]">
          {subtitle}
        </p>
        {video && (
          <div
            className={`mt-3 flex items-center gap-2 transition-opacity duration-300 ${
              playing ? "opacity-0" : "opacity-60 group-hover:opacity-100"
            }`}
          >
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-primary-foreground" />
            <span className="font-editorial text-[0.6rem] text-primary-foreground tracking-[0.2em]">
              HOVER TO PLAY
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const BestMoments = () => {
  return (
    <section className="section-dark py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-editorial text-xs tracking-[0.4em] opacity-40 mb-6 text-center">
            Captured Experiences
          </p>
          <h2 className="font-impact text-[clamp(2rem,6vw,4rem)] text-center mb-16">
            OUR BEST MOMENTS
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={i * 0.1}>
              <MomentCard {...cat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestMoments;
