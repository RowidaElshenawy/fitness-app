import { Button } from '@/shared/components/ui/button';
import { Mars, Venus } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface GenderStepProps {
  gender: 'male' | 'female' | null;
  onSelectGender: (gender: 'male' | 'female') => void;
}

export const GenderStep: React.FC<GenderStepProps> = ({ gender, onSelectGender }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto text-text-plain">
      <div className="flex items-center justify-center gap-8 my-4">
        <Button
          variant="ghost"
          onClick={() => onSelectGender('male')}
          className={`group flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 transition-all duration-200 outline-none  ${
            gender === 'male'
              ? 'border-border-primary bg-bg-primary/10 text-text-plain shadow-lg shadow-shadow-primary/20'
              : 'border-border-default bg-transparent hover:bg-transparent text-text-subtle hover:border-border-subtle '
          }`}
        >
          <Mars className="w-8 h-13 text-text-inverse" />
          <span className="text-xs font-semibold text-text-inverse">
            {t('custom-input.default.male')}
          </span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => onSelectGender('female')}
          className={`group flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 transition-all duration-200 outline-none ${
            gender === 'female'
              ? 'border-border-primary bg-bg-primary/10 text-text-plain shadow-lg shadow-shadow-primary/20'
              : 'border-border-default bg-transparent hover:bg-transparent text-text-subtle hover:border-border-subtle '
          }`}
        >
          <Venus className="w-8 h-13 text-text-inverse" />
          <span className="text-xs font-semibold text-text-inverse">
            {t('custom-input.default.female')}
          </span>
        </Button>
      </div>
    </div>
  );
};
