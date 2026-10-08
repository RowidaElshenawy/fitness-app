import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: './services/.env' });

// ---------- Constants ----------
const PORT = 3000;
const CLIENT_ORIGIN = 'http://localhost:5173';
const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const MAX_MESSAGES = 50;
const MAX_TEXT_LENGTH = 3000;

const SYSTEM_PROMPT = `
You are Smart Coach, a friendly fitness and nutrition assistant.

Rules:
- Answer only fitness, workout, and nutrition questions.
- Keep answers short, practical, and clear.
- Reply in the same language the user writes in.
- If a question is medical, advise the user to see a doctor.
`;

// ---------- Types ----------
type TChatMessage = {
  id: number;
  role: 'user' | 'ai';
  text: string;
};

type TGeminiContent = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

type TGeminiResponse = {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
  error?: { message?: string };
};

// ---------- Validation helpers ----------
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isChatMessage = (value: unknown): value is TChatMessage =>
  isRecord(value) &&
  typeof value.id === 'number' &&
  (value.role === 'user' || value.role === 'ai') &&
  typeof value.text === 'string' &&
  value.text.length <= MAX_TEXT_LENGTH;

const isValidMessages = (value: unknown): value is TChatMessage[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.length <= MAX_MESSAGES &&
  value.every(isChatMessage);

// ---------- App ----------
const app = express();

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: '50kb' }));

app.post('/api/chat', async (req, res) => {
  try {
    const body: unknown = req.body;
    const messages = isRecord(body) ? body.messages : undefined;

    if (!isValidMessages(messages)) {
      res.status(400).json({ error: 'Invalid messages' });
      return;
    }

    const contents: TGeminiContent[] = messages
      .filter((message) => message.id !== 0)
      .map((message) => ({
        role: message.role === 'ai' ? 'model' : 'user',
        parts: [{ text: message.text }],
      }));

    if (contents.length === 0) {
      res.status(400).json({ error: 'No user messages' });
      return;
    }

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY ?? '',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
      }),
    });

    const data = (await response.json()) as TGeminiResponse;

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      res.status(response.status).json({
        error: data.error?.message ?? 'Gemini API error',
      });
      return;
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    res.json({ text });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Something went wrong on the server' });
  }
});

app.listen(PORT, () => {
  console.log(`AI Server running on http://localhost:${PORT}`);
});
