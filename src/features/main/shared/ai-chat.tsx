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
  //state
  const [openChat, setOpenChat] = useState<boolean>(false);
  //function
  const handleAiChat = () => {
    setOpenChat(!openChat);
  };
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
          <div className="relative z-10 flex-1 px-4">
            {/* ai messages */}
            <div>
              <img
                src={aiPhoto}
                alt="ai-photo"
                className="w-9 h-9 rounded-full shadow-shadow-primary"
              />
            </div>
            {/* user messages */}
          </div>
          <CustomInput variant="ai" className="px-8" />
        </form>
      )}
    </div>
  );
}
