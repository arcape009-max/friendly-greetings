
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  preferred_destinations TEXT[] DEFAULT '{}',
  experience_level TEXT NOT NULL DEFAULT 'beginner' CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'extreme')),
  difficulty_preference TEXT NOT NULL DEFAULT 'moderate' CHECK (difficulty_preference IN ('easy', 'moderate', 'hard', 'extreme')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', 'Explorer'));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Crews table
CREATE TABLE public.crews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  destination TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'moderate' CHECK (difficulty IN ('easy', 'moderate', 'hard', 'extreme')),
  max_members INT NOT NULL DEFAULT 6,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  departure_date DATE,
  status TEXT NOT NULL DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'full', 'active', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.crews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view crews" ON public.crews FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create crews" ON public.crews FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Creators can update their crews" ON public.crews FOR UPDATE TO authenticated USING (auth.uid() = created_by);
CREATE POLICY "Creators can delete their crews" ON public.crews FOR DELETE TO authenticated USING (auth.uid() = created_by);

-- Crew members table
CREATE TABLE public.crew_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crew_id UUID REFERENCES public.crews(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('leader', 'member')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(crew_id, user_id)
);

ALTER TABLE public.crew_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view crew members" ON public.crew_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can join crews" ON public.crew_members FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Members can leave crews" ON public.crew_members FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Crew stats table (per member per crew)
CREATE TABLE public.crew_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crew_id UUID REFERENCES public.crews(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  elevation_gained_m INT NOT NULL DEFAULT 0,
  tasks_completed INT NOT NULL DEFAULT 0,
  local_skills_learned TEXT[] DEFAULT '{}',
  distance_km NUMERIC(10,2) NOT NULL DEFAULT 0,
  hours_offline NUMERIC(10,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(crew_id, user_id)
);

ALTER TABLE public.crew_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view stats" ON public.crew_stats FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert own stats" ON public.crew_stats FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON public.crew_stats FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crews_updated_at BEFORE UPDATE ON public.crews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crew_stats_updated_at BEFORE UPDATE ON public.crew_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
