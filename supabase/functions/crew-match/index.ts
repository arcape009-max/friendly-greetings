import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error("Unauthorized");

    // Get user's profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!profile) throw new Error("Profile not found");

    // Get recruiting crews that match user preferences
    const { data: crews } = await supabase
      .from("crews")
      .select("*, crew_members(user_id)")
      .eq("status", "recruiting");

    if (!crews || crews.length === 0) {
      return new Response(JSON.stringify({ matches: [], message: "No recruiting crews found. Try creating one!" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use AI to rank crews
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const crewSummaries = crews.map((c: any) => ({
      id: c.id,
      name: c.name,
      destination: c.destination,
      difficulty: c.difficulty,
      members: c.crew_members?.length || 0,
      max: c.max_members,
      departure: c.departure_date,
      description: c.description,
    }));

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You match travelers with expedition crews. Given a user profile and available crews, return the best matches ranked by compatibility. Consider destination preferences, difficulty alignment, and crew capacity. Always respond using the provided tool.`,
          },
          {
            role: "user",
            content: `User profile: ${JSON.stringify({
              experience: profile.experience_level,
              difficulty: profile.difficulty_preference,
              destinations: profile.preferred_destinations,
            })}\n\nAvailable crews: ${JSON.stringify(crewSummaries)}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "rank_crews",
              description: "Return ranked crew matches with compatibility scores and reasons",
              parameters: {
                type: "object",
                properties: {
                  matches: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        crew_id: { type: "string" },
                        score: { type: "number", description: "0-100 compatibility" },
                        reason: { type: "string", description: "Brief reason for match" },
                      },
                      required: ["crew_id", "score", "reason"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["matches"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "rank_crews" } },
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "AI rate limited, please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI error:", aiResponse.status, await aiResponse.text());
      // Fallback: return all crews unranked
      return new Response(JSON.stringify({
        matches: crewSummaries.map((c: any) => ({ crew_id: c.id, score: 50, reason: "Auto-suggested" })),
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    let matches = [];

    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      matches = parsed.matches || [];
    }

    // Enrich matches with crew data
    const enriched = matches.map((m: any) => {
      const crew = crews.find((c: any) => c.id === m.crew_id);
      return { ...m, crew };
    }).filter((m: any) => m.crew);

    return new Response(JSON.stringify({ matches: enriched }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("crew-match error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
