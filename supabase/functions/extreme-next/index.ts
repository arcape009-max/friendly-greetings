import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destinations, extremityLevel } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    if (!destinations || !Array.isArray(destinations) || destinations.length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide at least one destination." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const extremityMap: Record<string, string> = {
      moderate: "Bold Explorer — moderately adventurous, off-the-beaten-path but still accessible",
      hardcore: "Extreme Adventurer — remote, physically demanding, requires preparation",
      survival: "Elite Expedition — survival-level, extremely remote, potentially dangerous, for seasoned explorers only",
    };

    const level = extremityMap[extremityLevel] || extremityMap.moderate;

    const systemPrompt = `You are an elite extreme travel advisor for IMMERSA, a premium adventure travel company. You analyze travelers' past destinations to identify patterns and recommend progressively more extreme destinations.

Your analysis style:
- Detect climate preferences (tropical vs arctic vs arid vs temperate)
- Terrain patterns (mountain vs ocean vs desert vs jungle)
- Adventure style (urban exploration vs remote wilderness vs cultural immersion vs physical challenge)
- Identify what they HAVEN'T experienced and suggest destinations that push their boundaries

The user's extremity preference is: ${level}

For each recommendation, respond with EXACTLY this JSON structure (no markdown, no code blocks, just raw JSON):
{
  "adventureScore": <number 1-100>,
  "tier": "<one of: Bold Explorer, Extreme Adventurer, Elite Expedition>",
  "patterns": ["<detected pattern 1>", "<detected pattern 2>", ...],
  "recommendations": [
    {
      "name": "<destination name>",
      "country": "<country>",
      "matchReason": "<why it matches their travel pattern, 1-2 sentences>",
      "extremeFactor": "<what makes it extreme, 1-2 sentences>",
      "bestTime": "<best time to visit>",
      "activities": ["<activity 1>", "<activity 2>", "<activity 3>"],
      "difficulty": "<Easy | Moderate | Challenging | Extreme | Survival>",
      "description": "<2-3 sentence inspiring cinematic description that makes them want to go>",
      "coordinates": { "lat": <number>, "lng": <number> }
    }
  ]
}

Return exactly 4 recommendations, ordered from least to most extreme. Make them vivid, specific, and inspiring.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `I have traveled to: ${destinations.join(", ")}. Based on my travel history and my extremity preference (${extremityLevel}), recommend extreme destinations for my next adventure.`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate recommendations." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No response from AI." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON from the AI response, stripping markdown code blocks if present
    let parsed;
    try {
      const cleaned = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({ error: "Failed to parse recommendations." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("extreme-next error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
