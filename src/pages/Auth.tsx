import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";

const Auth = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) {
      toast.error("Select a destination");
      return;
    }
    if (!dateRange.from || !dateRange.to) {
      toast.error("Selecciona un rango de fechas");
      return;
    }
    setSubmitting(true);

    const { error } = await supabase
      .from("travelers")
      .insert({
        name,
        phone,
        destination,
        difficulty: `${format(dateRange.from, "yyyy-MM-dd")} → ${format(dateRange.to, "yyyy-MM-dd")}`,
      });

    if (error) {
      toast.error("Algo salió mal. Intenta de nuevo.");
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  const inputClass =
    "w-full bg-transparent border border-white/20 px-5 py-4 font-body text-sm tracking-wider placeholder:text-white/30 focus:border-white/60 focus:outline-none transition-colors";

  const destinations = [
    { value: "Guainía", label: "Guainía" },
    { value: "Safari", label: "Safari" },
    { value: "Nuquí", label: "Nuquí" },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <motion.div
          className="w-full max-w-md text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle2 size={48} className="mx-auto text-white/60 mb-6" />
          <h1 className="font-impact text-[clamp(2rem,6vw,3rem)] mb-3">
            ¡RECIBIDO!
          </h1>
          <p className="font-body text-sm text-white/50 mb-2">
            Gracias, <span className="text-white">{name}</span>. Hemos recibido tu solicitud.
          </p>
          <p className="font-body text-sm text-white/40 mb-8">
            Nuestro equipo se pondrá en contacto contigo pronto para coordinar tu aventura a <span className="text-white/70">{destination}</span>.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-editorial text-[0.65rem] tracking-[0.3em] text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            VOLVER AL INICIO
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-editorial text-[0.6rem] tracking-[0.2em] text-white/40 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          IMMERSA
        </Link>

        <h1 className="font-impact text-[clamp(2.5rem,8vw,4rem)] mb-2">
          JOIN THE CREW
        </h1>
        <p className="font-editorial text-xs tracking-[0.3em] text-white/50 mb-12">
          Tell us where you want to go
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-editorial text-[0.55rem] tracking-[0.2em] text-white/40 mb-2 block">
              NAME
            </label>
            <input
              type="text"
              placeholder="your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="font-editorial text-[0.55rem] tracking-[0.2em] text-white/40 mb-2 block">
              PHONE
            </label>
            <input
              type="tel"
              placeholder="+57 300 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="font-editorial text-[0.55rem] tracking-[0.2em] text-white/40 mb-2 block">
              DESTINATION
            </label>
            <div className="grid grid-cols-3 gap-3">
              {destinations.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDestination(d.value)}
                  className={cn(
                    "border px-4 py-3 font-body text-sm tracking-wider transition-all text-center",
                    destination === d.value
                      ? "border-white bg-white/10 text-white"
                      : "border-white/20 text-white/40 hover:border-white/40 hover:text-white/60"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-editorial text-[0.55rem] tracking-[0.2em] text-white/40 mb-2 block">
              DATES
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    inputClass,
                    "flex items-center justify-between text-left",
                    !dateRange.from && "text-white/30"
                  )}
                >
                  {dateRange.from ? (
                    dateRange.to ? (
                      <span>
                        {format(dateRange.from, "dd MMM yyyy")} — {format(dateRange.to, "dd MMM yyyy")}
                      </span>
                    ) : (
                      <span>{format(dateRange.from, "dd MMM yyyy")}</span>
                    )
                  ) : (
                    <span>Select your dates</span>
                  )}
                  <CalendarIcon size={16} className="text-white/30" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-black border-white/20"
                align="start"
              >
                <Calendar
                  mode="range"
                  selected={dateRange.from ? { from: dateRange.from, to: dateRange.to } : undefined}
                  onSelect={(range) =>
                    setDateRange({ from: range?.from, to: range?.to })
                  }
                  disabled={(date) => date < new Date()}
                  numberOfMonths={1}
                  className={cn(
                    "p-3 pointer-events-auto",
                    "[&_.rdp-day_selected]:bg-white [&_.rdp-day_selected]:text-black"
                  )}
                />
              </PopoverContent>
            </Popover>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-premium-light disabled:opacity-40 mt-4"
          >
            {submitting ? "Sending..." : "Submit request"}
          </button>

          <p className="font-body text-[0.65rem] text-white/25 text-center mt-4">
            We'll reach out to confirm availability and details.
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
