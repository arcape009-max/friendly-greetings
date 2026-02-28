import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Auth = () => {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();

  if (loading) return <div className="min-h-screen bg-black" />;
  if (user) return <Navigate to="/crew" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) toast.error(error.message);
    } else {
      const { error } = await signUp(email, password, displayName || "Explorer");
      if (error) toast.error(error.message);
      else toast.success("Check your email to confirm your account!");
    }
    setSubmitting(false);
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
          {isLogin ? "WELCOME BACK" : "JOIN THE CREW"}
        </h1>
        <p className="font-editorial text-xs tracking-[0.3em] text-center text-white/50 mb-12">
          {isLogin ? "Sign in to your account" : "Create your explorer profile"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <input
                  type="text"
                  placeholder="Explorer name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-transparent border border-white/20 px-5 py-4 font-body text-sm tracking-wider placeholder:text-white/30 focus:border-white/60 focus:outline-none transition-colors"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border border-white/20 px-5 py-4 font-body text-sm tracking-wider placeholder:text-white/30 focus:border-white/60 focus:outline-none transition-colors"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full bg-transparent border border-white/20 px-5 py-4 font-body text-sm tracking-wider placeholder:text-white/30 focus:border-white/60 focus:outline-none transition-colors"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-premium-light disabled:opacity-40"
          >
            {submitting ? "..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-8 font-editorial text-[0.65rem] tracking-[0.3em] text-white/40 hover:text-white/70 transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </motion.div>
    </div>
  );
};

export default Auth;
