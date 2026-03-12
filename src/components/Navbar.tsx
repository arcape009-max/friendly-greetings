import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Experiences", href: "#destinations" },
  { label: "Our Activities", href: "/activities", isPage: true },
  { label: "Who Are We?", href: "#founders" },
];


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const location = useLocation();
  
  const handleAnchor = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        window.location.href = "/" + href;
        return;
      }
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ?
      "bg-[hsl(var(--section-dark)/0.92)] backdrop-blur-md shadow-lg" :
      "bg-transparent"}`
      }>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-14 md:h-16">
        {/* Brand */}
        




        

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) =>
            'isPage' in item && item.isPage ? (
              <Link
                key={item.label}
                to={item.href}
                className="font-editorial text-[0.65rem] tracking-[0.3em] text-[hsl(var(--primary-foreground)/0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleAnchor(item.href)}
                className="font-editorial text-[0.65rem] tracking-[0.3em] text-[hsl(var(--primary-foreground)/0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                {item.label}
              </button>
            )
          )}
          <Link
            to="/auth"
            className="font-editorial text-[0.65rem] tracking-[0.3em] text-[hsl(var(--primary-foreground)/0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors border border-[hsl(var(--primary-foreground)/0.25)] px-5 py-1.5 hover:border-[hsl(var(--primary-foreground)/0.6)]">
            
            Log In
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[hsl(var(--primary-foreground))]"
          aria-label="Toggle menu">
          
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[hsl(var(--section-dark)/0.95)] backdrop-blur-md overflow-hidden">
          
            <div className="flex flex-col items-center gap-6 py-8">
              {navItems.map((item) =>
                'isPage' in item && item.isPage ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-editorial text-xs tracking-[0.3em] text-[hsl(var(--primary-foreground)/0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleAnchor(item.href)}
                    className="font-editorial text-xs tracking-[0.3em] text-[hsl(var(--primary-foreground)/0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors">
                    {item.label}
                  </button>
                )
              )}
              <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="font-editorial text-xs tracking-[0.3em] text-[hsl(var(--primary-foreground)/0.7)] hover:text-[hsl(var(--primary-foreground))] transition-colors border border-[hsl(var(--primary-foreground)/0.25)] px-6 py-2">
              
                Log In
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

};

export default Navbar;