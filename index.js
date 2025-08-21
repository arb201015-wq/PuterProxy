import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.puter.com/v1/ai/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4", // tu peux mettre "google/gemini-2.0-flash-exp:free"
        messages: [
          { role: "system", content: "You are a professional SEO blog writer." },
          { role: "user", content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));
