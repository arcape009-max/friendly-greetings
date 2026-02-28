import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Mountain, CheckCircle2, Compass, Users, Plus, Zap,
  ArrowLeft, TrendingUp, Clock, MapPin
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type Crew = {
  id: string;
  name: string;
  destination: string;
  difficulty: string;
  max_members: number;
  description: string | null;
  created_by: string | null;
  departure_date: string | null;
  status: string;
  member_count?: number;
};

type CrewStats = {
  elevation_gained_m: number;
  tasks_completed: number;
  local_skills_learned: string[];
  distance_km: number;
  hours_offline: number;
};

type Tab = "my-crews" | "browse" | "create" | "ai-match";

function getLocalUser(): { name: string; phone: string } | null {
  try {
    const raw = localStorage.getItem("immersa_user");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

const CrewPage = () => {
  const localUser = getLocalUser();
  const [tab, setTab] = useState<Tab>("browse");
  const [crews, setCrews] = useState<Crew[]>([]);
  const [myCrewIds, setMyCrewIds] = useState<Set<string>>(new Set());
  const [aiMatches, setAiMatches] = useState<any[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newCrew, setNewCrew] = useState({
    name: "", destination: "Amazonas", difficulty: "moderate",
    max_members: 6, description: "", departure_date: "",
  });

  // Demo stats
  const myStats: CrewStats = {
    elevation_gained_m: 0,
    tasks_completed: 0,
    local_skills_learned: [],
    distance_km: 0,
    hours_offline: 0,
  };

  useEffect(() => {
    if (localUser) fetchCrews();
  }, []);

  const fetchCrews = async () => {
    const { data: allCrews } = await supabase
      .from("crews")
      .select("*")
      .eq("status", "recruiting");

    const { data: memberCounts } = await supabase
      .from("crew_members")
      .select("crew_id");

    const countMap: Record<string, number> = {};
    memberCounts?.forEach((m: any) => {
      countMap[m.crew_id] = (countMap[m.crew_id] || 0) + 1;
    });

    setCrews((allCrews || []).map((c: any) => ({ ...c, member_count: countMap[c.id] || 0 })));
  };

  const createCrew = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const { data: crew, error } = await supabase.from("crews").insert({
      ...newCrew,
      max_members: Number(newCrew.max_members),
      departure_date: newCrew.departure_date || null,
      created_by: null,
    }).select().single();

    if (error) { toast.error(error.message); setCreating(false); return; }

    toast.success("Crew created!");
    setMyCrewIds((prev) => new Set(prev).add(crew.id));
    setNewCrew({ name: "", destination: "Amazonas", difficulty: "moderate", max_members: 6, description: "", departure_date: "" });
    setTab("browse");
    fetchCrews();
    setCreating(false);
  };

  const joinCrew = (crewId: string) => {
    setMyCrewIds((prev) => new Set(prev).add(crewId));
    toast.success("Welcome to the crew!");
  };

  const runAiMatch = async () => {
    setAiLoading(true);
    setAiMatches([]);
    // Simple client-side matching since no auth for edge function
    const matched = crews
      .filter((c) => !myCrewIds.has(c.id) && (c.member_count || 0) < c.max_members)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => ({
        crew_id: c.id,
        crew: c,
        score: Math.floor(60 + Math.random() * 40),
        reason: `Great match for ${c.destination} — ${c.difficulty} difficulty aligns with your profile.`,
      }));
    
    setTimeout(() => {
      setAiMatches(matched);
      if (matched.length === 0) toast.info("No matches found. Try creating a crew!");
      setAiLoading(false);
    }, 1500);
  };

  const xpTotal = Math.round(
    (myStats.distance_km * 10) + (myStats.hours_offline * 5) +
    (myStats.elevation_gained_m * 0.1) + (myStats.tasks_completed * 25) +
    (myStats.local_skills_learned.length * 50)
  );

  if (!localUser) return <Navigate to="/auth" replace />;

  const myCrews = crews.filter((c) => myCrewIds.has(c.id));
  const availableCrews = crews.filter((c) => !myCrewIds.has(c.id));

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "my-crews", label: "My Crews", icon: Users },
    { key: "browse", label: "Join Crew", icon: Compass },
    { key: "create", label: "Create", icon: Plus },
    { key: "ai-match", label: "AI Match", icon: Zap },
  ];

  const inputClass = "w-full bg-transparent border border-white/20 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 focus:border-white/50 focus:outline-none transition-colors";
  const selectClass = `${inputClass} appearance-none`;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
          <ArrowLeft size={18} />
          <span className="font-editorial text-[0.65rem] tracking-[0.3em]">IMMERSA</span>
        </Link>
        <span className="font-editorial text-[0.6rem] tracking-[0.2em] text-white/40">
          {localUser.name}
        </span>
      </div>

      {/* XP Dashboard */}
      <ScrollReveal>
        <div className="px-6 py-12 border-b border-white/10">
          <div className="max-w-5xl mx-auto">
            <p className="font-editorial text-xs tracking-[0.4em] text-white/40 mb-4">YOUR EXPEDITION STATS</p>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-impact text-[clamp(3rem,10vw,6rem)] leading-none">{xpTotal}</span>
              <span className="font-editorial text-xs tracking-[0.3em] text-white/50">CREW XP</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { icon: Mountain, label: "Elevation", value: `${myStats.elevation_gained_m}m` },
                { icon: CheckCircle2, label: "Tasks", value: String(myStats.tasks_completed) },
                { icon: Compass, label: "Skills", value: String(myStats.local_skills_learned.length) },
                { icon: TrendingUp, label: "Distance", value: `${myStats.distance_km}km` },
                { icon: Clock, label: "Offline", value: `${myStats.hours_offline}h` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="border border-white/10 p-4">
                  <Icon size={16} className="text-white/30 mb-2" />
                  <p className="font-impact text-2xl">{value}</p>
                  <p className="font-editorial text-[0.6rem] tracking-[0.2em] text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => { setTab(key); if (key === "ai-match") runAiMatch(); }}
            className={`flex items-center gap-2 px-6 py-4 font-editorial text-[0.65rem] tracking-[0.2em] transition-colors whitespace-nowrap ${
              tab === key ? "text-white border-b-2 border-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {tab === "my-crews" && (
            <motion.div key="my" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {myCrews.length === 0 ? (
                <div className="text-center py-20">
                  <Users size={32} className="mx-auto text-white/20 mb-4" />
                  <p className="font-body text-white/40">You haven't joined any crews yet.</p>
                  <button onClick={() => setTab("browse")} className="btn-premium-light mt-6 inline-block text-sm">Browse Crews</button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {myCrews.map((c) => <CrewCard key={c.id} crew={c} />)}
                </div>
              )}
            </motion.div>
          )}

          {tab === "browse" && (
            <motion.div key="browse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {availableCrews.length === 0 ? (
                <div className="text-center py-20">
                  <Compass size={32} className="mx-auto text-white/20 mb-4" />
                  <p className="font-body text-white/40">No crews recruiting right now.</p>
                  <button onClick={() => setTab("create")} className="btn-premium-light mt-6 inline-block text-sm">Create One</button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {availableCrews.map((c) => (
                    <CrewCard key={c.id} crew={c}>
                      <button onClick={() => joinCrew(c.id)} className="btn-premium-light text-xs mt-4">Join Crew</button>
                    </CrewCard>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {tab === "create" && (
            <motion.div key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-lg">
              <h2 className="font-impact text-3xl mb-8">CREATE A CREW</h2>
              <form onSubmit={createCrew} className="space-y-5">
                <input placeholder="Crew name" value={newCrew.name} onChange={(e) => setNewCrew({ ...newCrew, name: e.target.value })} required className={inputClass} />
                <select value={newCrew.destination} onChange={(e) => setNewCrew({ ...newCrew, destination: e.target.value })} className={selectClass}>
                  <option value="Amazonas">Amazonas</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Safari">Safari</option>
                </select>
                <select value={newCrew.difficulty} onChange={(e) => setNewCrew({ ...newCrew, difficulty: e.target.value })} className={selectClass}>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                  <option value="extreme">Extreme</option>
                </select>
                <input type="number" min={2} max={12} value={newCrew.max_members} onChange={(e) => setNewCrew({ ...newCrew, max_members: Number(e.target.value) })} className={inputClass} placeholder="Max members" />
                <input type="date" value={newCrew.departure_date} onChange={(e) => setNewCrew({ ...newCrew, departure_date: e.target.value })} className={inputClass} />
                <textarea placeholder="Description (optional)" value={newCrew.description} onChange={(e) => setNewCrew({ ...newCrew, description: e.target.value })} rows={3} className={inputClass} />
                <button type="submit" disabled={creating} className="btn-premium-light w-full disabled:opacity-40">
                  {creating ? "Creating..." : "Launch Crew"}
                </button>
              </form>
            </motion.div>
          )}

          {tab === "ai-match" && (
            <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-4 mb-8">
                <Zap size={20} className="text-white/60" />
                <div>
                  <h2 className="font-impact text-2xl">AI AUTO-MATCH</h2>
                  <p className="font-body text-xs text-white/40">Matched based on destination, difficulty & experience</p>
                </div>
              </div>
              {aiLoading ? (
                <div className="text-center py-20">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Zap size={24} className="mx-auto text-white/40" />
                  </motion.div>
                  <p className="font-editorial text-xs tracking-[0.3em] text-white/40 mt-4">ANALYZING YOUR TRAVEL DNA...</p>
                </div>
              ) : aiMatches.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-body text-white/40">No matches found. Create a crew or check back later.</p>
                  <button onClick={runAiMatch} className="btn-premium-light mt-6 text-sm">Retry Match</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {aiMatches.map((m: any, i: number) => (
                    <div key={m.crew_id || i} className="border border-white/10 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-impact text-xl">{m.crew?.name || "Unknown Crew"}</h3>
                          <p className="font-editorial text-[0.6rem] tracking-[0.2em] text-white/40 mt-1">
                            <MapPin size={10} className="inline mr-1" />{m.crew?.destination} · {m.crew?.difficulty}
                          </p>
                        </div>
                        <span className="font-impact text-2xl text-white/80">{m.score}%</span>
                      </div>
                      <p className="font-body text-sm text-white/50 mb-4">{m.reason}</p>
                      <button onClick={() => joinCrew(m.crew_id)} className="btn-premium-light text-xs">Join This Crew</button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CrewCard = ({ crew, children }: { crew: Crew; children?: React.ReactNode }) => (
  <div className="border border-white/10 p-6 hover:border-white/25 transition-colors">
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-impact text-xl">{crew.name}</h3>
      <span className="font-editorial text-[0.55rem] tracking-[0.2em] text-white/30 uppercase">{crew.status}</span>
    </div>
    <div className="flex gap-4 font-editorial text-[0.6rem] tracking-[0.15em] text-white/40 mb-3">
      <span><MapPin size={10} className="inline mr-1" />{crew.destination}</span>
      <span>{crew.difficulty}</span>
      <span><Users size={10} className="inline mr-1" />{crew.member_count || 0}/{crew.max_members}</span>
    </div>
    {crew.description && <p className="font-body text-sm text-white/50">{crew.description}</p>}
    {crew.departure_date && (
      <p className="font-editorial text-[0.55rem] tracking-[0.15em] text-white/30 mt-2">
        Departs: {new Date(crew.departure_date).toLocaleDateString()}
      </p>
    )}
    {children}
  </div>
);

export default CrewPage;
