import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("Amazonas");
  const [difficulty, setDifficulty] = useState("moderate");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { data, error } = await supabase
      .from("travelers")
      .insert({ name, phone, destination, difficulty })
      .select()
      .single();

    if (error) {
      toast.error("Something went wrong. Try again.");
      setSubmitting(false);
      return;
    }

    localStorage.setItem("immersa_user", JSON.stringify({
      id: data.id, name, phone, destination, difficulty,
    }));
    navigate("/crew");
  };

  const inputClass = "w-full bg-transparent border border-white/20 px-5 py-4 font-body text-sm tracking-wider placeholder:text-white/30 focus:border-white/60 focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-impact text-[clamp(2.5rem,8vw,4rem)] text-center mb-2">
          JOIN THE CREW
        </h1>
        <p className="font-editorial text-xs tracking-[0.3em] text-center text-white/50 mb-12">
          Tell us where you're headed
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={inputClass}
          />
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="Amazonas">Amazonas</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Safari">Safari</option>
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
            <option value="extreme">Extreme</option>
          </select>
          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-premium-light disabled:opacity-40"
          >
            {submitting ? "..." : "Find My Crew"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
