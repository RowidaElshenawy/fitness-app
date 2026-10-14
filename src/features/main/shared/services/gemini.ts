export type TChatMessage = {
  id: number;
  role: 'user' | 'ai';
  text: string;
};

export async function sendToGemini(messages: TChatMessage[]): Promise<string> {
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong!');
  }

  return data.text.replace(/\*\*(.*?)\*\*/g, '$1').trim();
}
