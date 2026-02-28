import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Auth = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("immersa_user", JSON.stringify({ name, phone }));
    navigate("/crew");
  };

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
          Enter your details to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-transparent border border-white/20 px-5 py-4 font-body text-sm tracking-wider placeholder:text-white/30 focus:border-white/60 focus:outline-none transition-colors"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-transparent border border-white/20 px-5 py-4 font-body text-sm tracking-wider placeholder:text-white/30 focus:border-white/60 focus:outline-none transition-colors"
          />
          <button type="submit" className="w-full btn-premium-light">
            Continue
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
