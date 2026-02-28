
-- Allow anonymous reads on crews
DROP POLICY IF EXISTS "Anyone authenticated can view crews" ON public.crews;
CREATE POLICY "Anyone can view crews" ON public.crews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create crews" ON public.crews;
CREATE POLICY "Anyone can create crews" ON public.crews FOR INSERT WITH CHECK (true);

-- Allow anonymous reads on crew_members
DROP POLICY IF EXISTS "Authenticated can view crew members" ON public.crew_members;
CREATE POLICY "Anyone can view crew members" ON public.crew_members FOR SELECT USING (true);
