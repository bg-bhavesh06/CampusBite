const express = require('express');
const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    const GROQ_KEY = process.env.GROQ_API_KEY;

    // If no API key, return friendly message
    if (!GROQ_KEY || GROQ_KEY === 'gsk_YOUR_GROQ_KEY_HERE') {
      return res.json({ reply: "AI is not configured yet. Add GROQ_API_KEY to your .env file! 🤖" });
    }

    const messages = [
      {
        role: 'system',
        content: `You are FoodieAI, a fun food assistant for CampusBite campus food delivery app.
Help students pick food, suggest by mood, tell food jokes, recommend from campus stalls.
Campus stalls: Dominos, Lapinoz, Ajays, Brownico, Jagdish, Indian Salt, Size-Zero, Day Night Vada Pav, Mr Puff, Marcos Pizza, Kudrati Kahumbo, Santushti, Boba91, Belgium Waffle, Zorko.
Orders: 9AM-5PM daily. Delivery: 7PM-9PM. Charge: Rs5 per item.
Keep replies short (2-3 lines), friendly, use emojis occasionally.`
      },
      ...history.slice(-6),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 250,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq error:', response.status, err);
      return res.json({ reply: "AI is having trouble. Check your GROQ_API_KEY in .env file! 🤔" });
    }

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error('AI route error:', err.message);
    res.status(500).json({ reply: "Oops! Something went wrong. Try again! 😅" });
  }
});

module.exports = router;
