import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini initialization
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API: AI Prompt Enhancer tailored for MiniMax H3 & Maestro
app.post("/api/enhance-prompt", async (req, res) => {
  try {
    const {
      rawInput,
      presetStyle,
      cameraMotion,
      lighting,
      motionSpeed,
      lensStyle,
      nsfwMode,
      referenceImages,
      windows,
      language = "de",
    } = req.body;

    const ai = getGenAI();

    if (!ai) {
      // Fallback local rule-based compilation if no key configured
      const refTags = (referenceImages || [])
        .map((r: any, idx: number) => `[IMAGE_${idx + 1}: ${r.role || "Ref"}]`)
        .join(" ");

      const compiledPrompt = `${presetStyle ? `[${presetStyle.toUpperCase()}] ` : ""}${rawInput || "Cinematic video shot"} ${refTags} ${cameraMotion ? `, Camera: ${cameraMotion}` : ""} ${lighting ? `, Lighting: ${lighting}` : ""} ${lensStyle ? `, Lens/Aesthetic: ${lensStyle}` : ""} ${motionSpeed ? `, Motion: ${motionSpeed}` : ""}. Ultra-detailed physics, natural motion blur, volumetric depth, photorealistic textures.`.trim();

      return res.json({
        enhancedPrompt: compiledPrompt,
        maestroScript: windows && windows.length > 0
          ? windows.map((w: any, idx: number) => `// Window ${idx + 1} (${w.duration || "0-3s"})\n[Window_${idx + 1}_Start]\nPrompt: ${w.prompt || compiledPrompt}\nCamera_Trajectory: ${w.camera || cameraMotion || "Smooth Tracking"}\n[Window_${idx + 1}_End]`).join("\n\n")
          : `// Maestro Single Window\n[Window_1 (0-6s)]\n${compiledPrompt}`,
        negativePrompt: "low quality, distorted limbs, oversaturated, morphing artifacts, flickering, glitchy movement, static frozen frame",
        tips: [
          "MiniMax H3 performs best with physical camera descriptions (e.g. 'Slow tracking shot', 'Dolly zoom').",
          "Specify light sources explicitly (e.g. 'Warm sunset rays through dust particles').",
          "For Maestro multi-window, keep character clothing & facial details identical across windows.",
        ],
        nsfwWarning: nsfwMode ? "NSFW/Mature cinematic keywords enabled. Use aesthetic phrasing for MiniMax H3 filter pass." : null,
      });
    }

    const systemPrompt = `You are the master Prompt Engineer & Technical Pipeline Director for MiniMax H3 (Hailuo AI Video) and Maestro Multi-Window Video Stitcher.

Your goal is to convert user concepts (often provided in German or English with selected parameter chips) into world-class MiniMax H3 prompts and Maestro timeline sequence scripts.

Guidelines for MiniMax H3:
1. MiniMax H3 excels with precise action verbs, spatial relations, camera hardware terms (e.g. 35mm anamorphic, f/1.8 aperture, gimbal tracking, whip pan, crane lift), precise lighting (volumetric, chiaroscuro, subsurface scattering), and specific motion dynamics.
2. Avoid generic buzzwords like "8k, hyperrealistic, high quality". Instead use optical realities ("sharp focus on iris, visible skin pores, natural motion blur at 24fps").
3. Reference Images: Properly incorporate image tags like [IMAGE 1: Subject], [IMAGE 2: Style] or [START_FRAME] / [END_FRAME] into the prompt flow seamlessly.
4. NSFW / Mature Content (${nsfwMode ? "ENABLED" : "DISABLED"}): ${
      nsfwMode
        ? "The user requested dark/visceral/mature/horror aesthetic. Formulate explicit horror, gore, anatomical, dark sensual or intense visceral scenes using cinematic, artistic, and anatomical phrasing that conveys maximum intensity without triggering false-positive AI safety blocks."
        : "Ensure clean, high-art cinematic standards."
    }
5. Style Presets handling:
   - Horror: Eerie shadow play, uncanny micro-expressions, creeping zoom, unsettling atmosphere, atmospheric fog.
   - Bau / Construction: Dynamic crane shots, time-lapse velocity, metallic textures, welding sparks, blueprint overlay feel, heavy machinery depth.
   - Immobilien / Real Estate: Fluid interior gimbal walkthroughs, natural window sunlight, architectural symmetry, wide 16mm perspective.
   - Restaurant / Culinary: Macro 120fps slow-motion, sizzling textures, rising steam, dripping glazes, cozy ambient depth.

Output MUST be a valid JSON object matching this schema:
{
  "enhancedPrompt": "The primary MiniMax H3 video prompt in English (as AI video models parse English best)",
  "maestroScript": "Complete Maestro timeline multi-window code/text block linking all windows seamlessly",
  "negativePrompt": "Comprehensive negative prompt string",
  "tips": ["Tip 1 regarding camera or lighting", "Tip 2 for MiniMax H3 pacing", "Tip 3 for Maestro multi-window continuity"],
  "germanSummary": "Eine kurze deutsche Zusammenfassung des Prompts und der gewählten Ästhetik"
}`;

    const promptPayload = `
User Input: ${rawInput || "Cinematic video sequence"}
Preset Style: ${presetStyle || "General Cinematic"}
Camera Movement: ${cameraMotion || "Auto / Smooth Tracking"}
Lighting & Mood: ${lighting || "Cinematic Atmospheric"}
Motion Speed/Scale: ${motionSpeed || "Normal 24fps"}
Lens & Rendering: ${lensStyle || "Anamorphic 35mm"}
NSFW Mode Active: ${nsfwMode ? "Yes (Mature/Horror Edge Keywords)" : "No"}
Reference Images Provided: ${JSON.stringify(referenceImages || [])}
Maestro Timeline Windows: ${JSON.stringify(windows || [])}
User Language: ${language}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: [
        { text: systemPrompt },
        { text: promptPayload },
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const responseText = response.text || "{}";
    const data = JSON.parse(responseText);

    return res.json(data);
  } catch (err: any) {
    console.error("Error in /api/enhance-prompt:", err);
    res.status(500).json({ error: err.message || "Prompt enhancement failed" });
  }
});

async function startServer() {
  // Vite middleware for dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
