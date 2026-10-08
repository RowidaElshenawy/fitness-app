import { Button } from '@/shared/components/ui/button';
import { useTranslation } from 'react-i18next';
import aiImage from '@/assets/ai.png';
import { useState, useRef, useEffect, type FormEvent } from 'react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import CustomInput from '@/shared/components/custom-ui/custom-input';
import chatBg from '@/assets/ai-chat-background.jpg';
import aiPhoto from '@/assets/ai-photo.jpg';
import { sendToGemini } from './services/gemini';

type TChatMessage = {
  id: number;
  role: 'user' | 'ai';
  text: string;
};

export default function AiChat() {
  const { t } = useTranslation();

  const [openChat, setOpenChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<TChatMessage[]>([
    { id: 0, role: 'ai', text: 'Hello How Can I Assist You Today ?' },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  const handleAiChat = () => {
    setOpenChat(!openChat);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: TChatMessage = { id: Date.now(), role: 'user', text };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const reply = await sendToGemini(newMessages);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'ai', text: reply }]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred while connecting.';

      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'ai', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll
  useEffect(() => {
    if (openChat) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, openChat]);

  return (
    <div
      className={cn(
        'fixed rtl:left-20 ltr:right-20 flex flex-col items-center  ',
        openChat ? 'bottom-0' : 'bottom-40'
      )}
    >
      <Button variant="ai" onClick={handleAiChat} className="relative">
        <div className="absolute bottom-9.5 flex items-center justify-center">
          <div className="absolute w-24 h-24 bg-bg-primary opacity-60 blur-xl rounded-full pointer-events-none" />

          <img src={aiImage} alt="ai-icon" className="relative z-10" />
        </div>

        {openChat ? t('main.ai.close') : t('main.ai.ask')}
      </Button>
      {openChat && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col pt-10 pb-8 relative w-93.75 h-115 rounded-lg border-2 border-border-primary overflow-hidden bg-cover bg-center before:absolute before:inset-0 before:backdrop-blur-xs before:content-['']"
          style={{ backgroundImage: `url(${chatBg})` }}
        >
          {/* Header */}
          <div className="relative z-10 flex justify-between items-center px-4 pb-4">
            <h2 className="font-bold text-2xl text-text-inverse font-sans">
              {t('main.ai.smart-coach')}
            </h2>
            <div>R</div>
          </div>

          {/* Messages Container */}
          <div className="relative z-10 flex-1 px-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {messages.map((msg) =>
              msg.role === 'ai' ? (
                <div key={msg.id} className="flex gap-4 pb-6 justify-start">
                  <img
                    src={aiPhoto}
                    alt="ai-photo"
                    className="w-9 h-9 rounded-full shadow-shadow-primary shrink-0"
                  />
                  <p className="text-text-inverse font-normal text-lg max-w-[210px] rounded-tr-lg rounded-b-lg p-2 gap-2 bg-bg-ai-chat backdrop-blur-ai-chat shadow-shadow-ai-chat break-words">
                    {msg.text}
                  </p>
                </div>
              ) : (
                <div key={msg.id} className="flex gap-4 pb-6 justify-end">
                  <p className="text-text-inverse font-normal text-lg max-w-[210px] rounded-tl-lg rounded-b-lg p-2 gap-2 bg-bg-chat-user backdrop-blur-chat-user shadow-shadow-chat-user break-words">
                    {msg.text}
                  </p>
                  <img
                    src={aiPhoto}
                    alt="user-photo"
                    className="w-9 h-9 rounded-full shadow-shadow-primary shrink-0"
                  />
                </div>
              )
            )}
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-4 pb-6 justify-start">
                <img
                  src={aiPhoto}
                  alt="ai-photo"
                  className="w-9 h-9 rounded-full shadow-shadow-primary shrink-0 animate-pulse"
                />
                <p className="text-text-inverse font-normal text-sm rounded-tr-lg rounded-b-lg p-2 bg-bg-ai-chat backdrop-blur-ai-chat animate-pulse">
                  Thinking...
                </p>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Field */}
          <div className="relative z-10 px-8 mt-2">
            <CustomInput
              variant="ai"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </form>
      )}
    </div>
  );
}
