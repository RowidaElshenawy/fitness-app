import { Button } from '@/shared/components/ui/button';
import { useTranslation } from 'react-i18next';
import aiImage from '@/assets/ai.png';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import CustomInput from '@/shared/components/custom-ui/custom-input';
import chatBg from '@/assets/ai-chat-background.jpg';
import aiPhoto from '@/assets/ai-photo.jpg';
export default function AiChat() {
  //translation
  const { t } = useTranslation();
  //variables
  // const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;
  //state
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // const [sessionId] = useState(() => crypto.randomUUID());
  //function
  const handleAiChat = () => {
    setOpenChat(!openChat);
  };
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: TMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
    };
    const history = [...messages, userMessage];

    setMessages(history);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) throw new Error(String(response.status));

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: data.output },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'The assistant is busy right now, please try again shortly.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  // const handleSendMessage = async () => {
  //   if (!input.trim() || loading) return;

  //   const userMessage = input.trim();

  //   setMessages((prev) => [
  //     ...prev,
  //     {
  //       id: crypto.randomUUID(),
  //       role: 'user',
  //       content: userMessage,
  //     },
  //   ]);

  //   setInput('');
  //   setLoading(true);

  //   try {
  //     const response = await fetch(N8N_WEBHOOK_URL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         action: 'sendMessage',
  //         chatInput: userMessage,
  //         sessionId,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to send message');
  //     }

  //     const data = await response.json();

  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         id: crypto.randomUUID(),
  //         role: 'assistant',
  //         content: data.output,
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error('Chat error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // h-188.25
  return (
    <div
      className={cn(
        'fixed rtl:left-20 ltr:right-20 flex flex-col items-center',
        openChat ? ' bottom-0' : ' bottom-40'
      )}
    >
      <Button variant="ai" onClick={() => handleAiChat()}>
        <img src={aiImage} className="absolute bottom-9.5 " />
        {openChat ? t('main.ai.close') : t('main.ai.ask')}
      </Button>
      {openChat && (
        <form
          className="flex flex-col pt-10 pb-8 relative w-93.75 h-115 rounded-lg border-2 border-border-primary overflow-hidden  bg-cover bg-center  before:absolute
                before:inset-0
                before:backdrop-blur-xs
                before:content-[''] "
          style={{ backgroundImage: `url(${chatBg})` }}
        >
          <div className="relative z-10 flex justify-between items-center px-4 pb-10">
            <h2 className="font-bold text-2xl text-text-inverse font-sans ">
              {t('main.ai.smart-coach')}
            </h2>
            {/* dropdown menu */}
            <div>R</div>
          </div>
          <div className="relative z-10 flex-1 px-4 overflow-y-auto scrollbar-hide">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-4 pb-6',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <img
                    src={aiPhoto}
                    alt="ai-photo"
                    className="w-9 h-9 rounded-full shadow-shadow-primary"
                  />
                )}

                <p
                  className={cn(
                    'text-text-inverse font-normal text-lg w-52.5 p-2 gap-2 whitespace-pre-wrap break-words',
                    message.role === 'assistant'
                      ? 'rounded-tr-lg rounded-b-lg bg-bg-ai-chat backdrop-blur-ai-chat shadow-shadow-ai-chat'
                      : 'rounded-tl-lg rounded-b-lg bg-bg-chat-user backdrop-blur-chat-user shadow-shadow-chat-user'
                  )}
                >
                  {message.content}
                </p>

                {message.role === 'user' && (
                  <img
                    src={aiPhoto}
                    alt="user-photo"
                    className="w-9 h-9 rounded-full shadow-shadow-primary"
                  />
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-4 pb-6 justify-start">
                <img
                  src={aiPhoto}
                  alt="ai-photo"
                  className="w-9 h-9 rounded-full shadow-shadow-primary"
                />
                <p className="text-text-inverse text-lg rounded-tr-lg rounded-b-lg p-2 bg-bg-ai-chat backdrop-blur-ai-chat shadow-shadow-ai-chat animate-pulse">
                  ...
                </p>
              </div>
            )}
          </div>
          <CustomInput
            variant="ai"
            className="px-8"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
        </form>
      )}
    </div>
  );
}
