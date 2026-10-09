import { Button } from '@/shared/components/ui/button';
import { useTranslation } from 'react-i18next';
import aiImage from '@/assets/ai.png';
import { useEffect, useState } from 'react';
import { Menu } from '@base-ui/react/menu';
import { AlignRight, Plus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom'; // LOGIN
import { cn } from '@/shared/lib/utils/tailwind-cn';
import CustomInput from '@/shared/components/custom-ui/custom-input';
import chatBg from '@/assets/ai-chat-background.jpg';
import aiPhoto from '@/assets/ai-photo.jpg';
import { loadChats, makeTitle, saveChats, type TConversation } from '../types/chat-storage';

export default function AiChat() {
  //translation
  const { t } = useTranslation();
  // const navigate = useNavigate() //LOGIN

  //state
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [conversations, setConversations] = useState<TConversation[]>(
    () => loadChats().conversations
  );
  const [activeId, setActiveId] = useState<string | null>(() => loadChats().activeId);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    saveChats({ conversations, activeId });
  }, [conversations, activeId]);

  const messages = conversations.find((c) => c.id === activeId)?.messages ?? [];

  // LOGIN
  // const FREE_MESSAGES_LIMIT = 3;
  // const isLoggedIn = false;
  // const userMessagesCount = conversations
  //   .flatMap((c) => c.messages)
  //   .filter((m) => m.role === 'user').length;
  // const isLimitReached = !isLoggedIn && userMessagesCount >= FREE_MESSAGES_LIMIT;

  //function
  const handleAiChat = () => {
    setOpenChat(!openChat);
  };

  const appendMessage = (conversationId: string, message: TMessage) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, messages: [...c.messages, message] } : c))
    );
  };

  const handleNewChat = () => {
    if (loading) return;
    setActiveId(null);
    setInput('');
  };

  const handleSendMessage = async () => {
    const content = input.trim();
    if (!content || loading) return;

    // LOGIN
    // if (isLimitReached) return;

    const userMessage: TMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    };
    const history = [...messages, userMessage];
    const conversationId = activeId ?? crypto.randomUUID();

    setConversations((prev) =>
      activeId === null
        ? [{ id: conversationId, title: makeTitle(content), messages: history }, ...prev]
        : prev.map((c) => (c.id === conversationId ? { ...c, messages: history } : c))
    );
    setActiveId(conversationId);
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

      appendMessage(conversationId, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.output,
      });
    } catch (error) {
      console.error('Chat error:', error);
      appendMessage(conversationId, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'The assistant is busy right now, please try again shortly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'fixed rtl:left-20 ltr:right-20 flex flex-col items-center',
        openChat ? ' bottom-0' : ' bottom-40'
      )}
    >
      <Button variant="ai" onClick={() => handleAiChat()}>
        <div className="absolute bottom-9.5 flex items-center justify-center">
          <div className="absolute w-24 h-24 bg-bg-primary opacity-60 blur-xl rounded-full pointer-events-none" />
          <img src={aiImage} alt="ai-icon" className="relative z-10" />
        </div>
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

            {/* dropdown menu*/}
            <Menu.Root>
              <Menu.Trigger
                type="button"
                aria-label={t('main.ai.menu')}
                className="rounded-md p-1 text-text-inverse outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-border-primary"
              >
                <AlignRight className="h-6 w-6" />
              </Menu.Trigger>

              <Menu.Portal>
                <Menu.Positioner sideOffset={8} align="end" className="z-50">
                  <Menu.Popup className="max-h-72 w-56 overflow-y-auto rounded-lg border border-border-primary bg-black/80 py-1 shadow-lg backdrop-blur-md outline-none">
                    <Menu.Item
                      onClick={handleNewChat}
                      disabled={loading}
                      className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-semibold text-text-inverse outline-none data-[highlighted]:bg-white/10 data-[disabled]:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                      {t('main.ai.chat-ai.new-chat')}
                    </Menu.Item>

                    <Menu.Separator className="my-1 h-px bg-white/20" />

                    {conversations.length === 0 ? (
                      <p className="px-4 py-2 text-sm text-text-inverse/60">
                        {t('main.ai.chat-ai.no-history')}
                      </p>
                    ) : (
                      conversations.map((conversation) => (
                        <Menu.Item
                          key={conversation.id}
                          disabled={loading}
                          onClick={() => setActiveId(conversation.id)}
                          className={cn(
                            'cursor-pointer truncate px-4 py-2 text-sm text-text-inverse outline-none data-[highlighted]:bg-white/10 data-[disabled]:opacity-50',
                            conversation.id === activeId && 'bg-white/20'
                          )}
                        >
                          {conversation.title}
                        </Menu.Item>
                      ))
                    )}
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
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

          {/* LOGIN
          {isLimitReached && (
            <div className="relative z-10 flex flex-col items-center gap-3 px-8 pb-3 text-center">
              <p className="text-sm text-text-inverse">{t('main.ai.login-required')}</p>
              <Button type="button" onClick={() => navigate('/login')}>
                {t('main.ai.login')}
              </Button>
            </div>
          )}
          */}

          <CustomInput
            variant="ai"
            className="px-8"
            value={input}
            // disabled={isLimitReached}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void handleSendMessage();
              }
            }}
          />
        </form>
      )}
    </div>
  );
}
