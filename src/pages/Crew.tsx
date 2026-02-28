import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Mountain, CheckCircle2, Compass, Users, Plus, Zap,
  ArrowLeft, TrendingUp, Clock, MapPin, UserPlus
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type Traveler = {
  id: string;
  name: string;
  destination: string;
  difficulty: string;
  created_at: string;
};

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

type Tab = "travelers" | "my-crews" | "browse" | "create" | "ai-match";

function getLocalUser() {
  try {
    const raw = localStorage.getItem("immersa_user");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

const CrewPage = () => {
  const localUser = getLocalUser();
  const [tab, setTab] = useState<Tab>("travelers");
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [crews, setCrews] = useState<Crew[]>([]);
  const [myCrewIds, setMyCrewIds] = useState<Set<string>>(new Set());
  const [aiMatches, setAiMatches] = useState<any[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedTravelers, setSelectedTravelers] = useState<Set<string>>(new Set());
  const [crewName, setCrewName] = useState("");
  const [showFormCrew, setShowFormCrew] = useState(false);

  const [newCrew, setNewCrew] = useState({
    name: "", destination: localUser?.destination || "Amazonas", difficulty: localUser?.difficulty || "moderate",
    max_members: 6, description: "", departure_date: "",
  });

  useEffect(() => {
    if (localUser) {
      fetchTravelers();
      fetchCrews();
    }
  }, []);

  const fetchTravelers = async () => {
    const { data } = await supabase
      .from("travelers_public" as any)
      .select("*");
    const all = (data || []) as unknown as Traveler[];
    // Exclude self
    setTravelers(all.filter((t) => t.id !== localUser?.id));
  };

  const fetchCrews = async () => {
    const { data: allCrews } = await supabase.from("crews").select("*").eq("status", "recruiting");
    const { data: memberCounts } = await supabase.from("crew_members").select("crew_id");
    const countMap: Record<string, number> = {};
    memberCounts?.forEach((m: any) => { countMap[m.crew_id] = (countMap[m.crew_id] || 0) + 1; });
    setCrews((allCrews || []).map((c: any) => ({ ...c, member_count: countMap[c.id] || 0 })));
  };

  const toggleTraveler = (id: string) => {
    setSelectedTravelers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const formCrewFromSelected = async () => {
    if (!crewName.trim()) { toast.error("Give your crew a name"); return; }
    setCreating(true);
    const { data: crew, error } = await supabase.from("crews").insert({
      name: crewName,
      destination: localUser?.destination || "Amazonas",
      difficulty: localUser?.difficulty || "moderate",
      max_members: selectedTravelers.size + 1,
      description: `Crew formed by ${localUser?.name}`,
      created_by: null,
    }).select().single();

    if (error) { toast.error(error.message); setCreating(false); return; }

    setMyCrewIds((prev) => new Set(prev).add(crew.id));
    toast.success(`Crew "${crewName}" created with ${selectedTravelers.size + 1} members!`);
    setSelectedTravelers(new Set());
    setCrewName("");
    setShowFormCrew(false);
    setCreating(false);
    fetchCrews();
    setTab("my-crews");
  };

  const createCrew = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const { data: crew, error } = await supabase.from("crews").insert({
      ...newCrew, max_members: Number(newCrew.max_members),
      departure_date: newCrew.departure_date || null, created_by: null,
    }).select().single();
    if (error) { toast.error(error.message); setCreating(false); return; }
    setMyCrewIds((prev) => new Set(prev).add(crew.id));
    toast.success("Crew created!");
    setNewCrew({ name: "", destination: localUser?.destination || "Amazonas", difficulty: localUser?.difficulty || "moderate", max_members: 6, description: "", departure_date: "" });
    setTab("my-crews");
    fetchCrews();
    setCreating(false);
  };

  const joinCrew = (crewId: string) => {
    setMyCrewIds((prev) => new Set(prev).add(crewId));
    toast.success("Welcome to the crew!");
  };

  const runAiMatch = () => {
    setAiLoading(true);
    setAiMatches([]);
    // Match travelers going to same destination
    const sameDest = travelers.filter((t) => t.destination === localUser?.destination);
    const matched = sameDest.slice(0, 5).map((t) => ({
      traveler: t,
      score: Math.floor(60 + Math.random() * 40),
      reason: `${t.name} is heading to ${t.destination} at ${t.difficulty} difficulty — great crew match.`,
    }));
    setTimeout(() => {
      setAiMatches(matched);
      if (matched.length === 0) toast.info("No travelers matched your destination yet.");
      setAiLoading(false);
    }, 1500);
  };

  if (!localUser) return <Navigate to="/auth" replace />;

  const myCrews = crews.filter((c) => myCrewIds.has(c.id));
  const availableCrews = crews.filter((c) => !myCrewIds.has(c.id));

  // Group travelers by destination
  const grouped: Record<string, Traveler[]> = {};
  travelers.forEach((t) => {
    if (!grouped[t.destination]) grouped[t.destination] = [];
    grouped[t.destination].push(t);
  });

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "travelers", label: "Travelers", icon: Users },
    { key: "my-crews", label: "My Crews", icon: Compass },
    { key: "browse", label: "Join", icon: MapPin },
    { key: "create", label: "Create", icon: Plus },
    { key: "ai-match", label: "AI Match", icon: Zap },
  ];

  const inputClass = "w-full bg-transparent border border-white/20 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 focus:border-white/50 focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
          <ArrowLeft size={18} />
          <span className="font-editorial text-[0.65rem] tracking-[0.3em]">IMMERSA</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-editorial text-[0.6rem] tracking-[0.2em] text-white/40">{localUser.name}</span>
          <span className="font-editorial text-[0.55rem] tracking-[0.15em] text-white/20">→ {localUser.destination}</span>
        </div>
      </div>

      {/* XP Dashboard */}
      <ScrollReveal>
        <div className="px-6 py-12 border-b border-white/10">
          <div className="max-w-5xl mx-auto">
            <p className="font-editorial text-xs tracking-[0.4em] text-white/40 mb-4">YOUR EXPEDITION STATS</p>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-impact text-[clamp(3rem,10vw,6rem)] leading-none">0</span>
              <span className="font-editorial text-xs tracking-[0.3em] text-white/50">CREW XP</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { icon: Mountain, label: "Elevation", value: "0m" },
                { icon: CheckCircle2, label: "Tasks", value: "0" },
                { icon: Compass, label: "Skills", value: "0" },
                { icon: TrendingUp, label: "Distance", value: "0km" },
                { icon: Clock, label: "Offline", value: "0h" },
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

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">

          {/* TRAVELERS */}
          {tab === "travelers" && (
            <motion.div key="travelers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {travelers.length === 0 ? (
                <div className="text-center py-20">
                  <Users size={32} className="mx-auto text-white/20 mb-4" />
                  <p className="font-body text-white/40">No other travelers yet. Share the link and check back!</p>
                </div>
              ) : (
                <>
                  {selectedTravelers.size > 0 && (
                    <div className="mb-8 border border-white/20 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <p className="font-body text-sm text-white/60">
                        <span className="text-white font-medium">{selectedTravelers.size}</span> selected
                      </p>
                      {!showFormCrew ? (
                        <button onClick={() => setShowFormCrew(true)} className="btn-premium-light text-xs flex items-center gap-2">
                          <UserPlus size={14} /> Form a Crew
                        </button>
                      ) : (
                        <div className="flex gap-3 flex-1 w-full">
                          <input
                            value={crewName}
                            onChange={(e) => setCrewName(e.target.value)}
                            placeholder="Crew name"
                            className="flex-1 bg-transparent border border-white/20 px-4 py-2 font-body text-sm text-white placeholder:text-white/30 focus:border-white/50 focus:outline-none"
                          />
                          <button onClick={formCrewFromSelected} disabled={creating} className="btn-premium-light text-xs disabled:opacity-40">
                            {creating ? "..." : "Create"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {Object.entries(grouped).map(([dest, list]) => (
                    <div key={dest} className="mb-10">
                      <h3 className="font-impact text-2xl mb-4 flex items-center gap-3">
                        <MapPin size={18} className="text-white/40" /> {dest}
                        <span className="font-editorial text-[0.55rem] tracking-[0.2em] text-white/30 ml-2">{list.length} traveler{list.length > 1 ? "s" : ""}</span>
                      </h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {list.map((t) => {
                          const selected = selectedTravelers.has(t.id);
                          return (
                            <button
                              key={t.id}
                              onClick={() => toggleTraveler(t.id)}
                              className={`text-left border p-5 transition-all ${
                                selected ? "border-white bg-white/5" : "border-white/10 hover:border-white/25"
                              }`}
                            >
                              <p className="font-impact text-lg">{t.name}</p>
                              <p className="font-editorial text-[0.55rem] tracking-[0.15em] text-white/40 mt-1">
                                {t.difficulty} · joined {new Date(t.created_at).toLocaleDateString()}
                              </p>
                              {selected && (
                                <p className="font-editorial text-[0.5rem] tracking-[0.2em] text-white/70 mt-2">✓ SELECTED</p>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </motion.div>
          )}

          {/* MY CREWS */}
          {tab === "my-crews" && (
            <motion.div key="my" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {myCrews.length === 0 ? (
                <div className="text-center py-20">
                  <Compass size={32} className="mx-auto text-white/20 mb-4" />
                  <p className="font-body text-white/40">No crews yet. Browse travelers or create one.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {myCrews.map((c) => <CrewCard key={c.id} crew={c} />)}
                </div>
              )}
            </motion.div>
          )}

          {/* BROWSE */}
          {tab === "browse" && (
            <motion.div key="browse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {availableCrews.length === 0 ? (
                <div className="text-center py-20">
                  <MapPin size={32} className="mx-auto text-white/20 mb-4" />
                  <p className="font-body text-white/40">No crews recruiting. Create one!</p>
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

          {/* CREATE */}
          {tab === "create" && (
            <motion.div key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-lg">
              <h2 className="font-impact text-3xl mb-8">CREATE A CREW</h2>
              <form onSubmit={createCrew} className="space-y-5">
                <input placeholder="Crew name" value={newCrew.name} onChange={(e) => setNewCrew({ ...newCrew, name: e.target.value })} required className={inputClass} />
                <select value={newCrew.destination} onChange={(e) => setNewCrew({ ...newCrew, destination: e.target.value })} className={`${inputClass} appearance-none`}>
                  <option value="Amazonas">Amazonas</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Safari">Safari</option>
                </select>
                <select value={newCrew.difficulty} onChange={(e) => setNewCrew({ ...newCrew, difficulty: e.target.value })} className={`${inputClass} appearance-none`}>
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

          {/* AI MATCH */}
          {tab === "ai-match" && (
            <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-4 mb-8">
                <Zap size={20} className="text-white/60" />
                <div>
                  <h2 className="font-impact text-2xl">AI AUTO-MATCH</h2>
                  <p className="font-body text-xs text-white/40">Travelers heading to {localUser.destination} who match your difficulty</p>
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
                  <p className="font-body text-white/40">No matches yet. Share the link so others can join!</p>
                  <button onClick={runAiMatch} className="btn-premium-light mt-6 text-sm">Retry</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {aiMatches.map((m: any, i: number) => (
                    <div key={i} className="border border-white/10 p-6 flex items-start justify-between">
                      <div>
                        <h3 className="font-impact text-xl">{m.traveler.name}</h3>
                        <p className="font-body text-sm text-white/50 mt-1">{m.reason}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-impact text-2xl text-white/80">{m.score}%</span>
                        <p className="font-editorial text-[0.5rem] tracking-[0.2em] text-white/30 mt-1">MATCH</p>
                      </div>
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
