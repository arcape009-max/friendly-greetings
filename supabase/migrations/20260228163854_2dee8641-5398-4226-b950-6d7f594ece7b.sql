
-- Travelers table - stores people who want to travel
CREATE TABLE public.travelers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  destination TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'moderate',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.travelers ENABLE ROW LEVEL SECURITY;

-- Public read but hide phone numbers via a view
CREATE POLICY "Anyone can insert travelers" ON public.travelers FOR INSERT WITH CHECK (true);
CREATE POLICY "No direct select on travelers" ON public.travelers FOR SELECT USING (false);

-- Public view without phone
CREATE VIEW public.travelers_public
WITH (security_invoker = on) AS
  SELECT id, name, destination, difficulty, created_at
  FROM public.travelers;
