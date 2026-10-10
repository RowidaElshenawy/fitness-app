import { Button } from '@/shared/components/ui/button';
import { Mars, Venus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Gender } from '../../../types/register';

interface GenderStepProps {
  gender: Gender | null;
  onSelectGender: (gender: Gender) => void;
}

export const GenderStep = ({ gender, onSelectGender }: GenderStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-center gap-8 text-text-plain">
      <Button
        type="button"
        variant="ghost"
        aria-pressed={gender === 'male'}
        onClick={() => onSelectGender('male')}
        className={`flex size-24 flex-col items-center justify-center rounded-full border-2 ${gender === 'male' ? 'border-border-primary bg-bg-primary/10 shadow-lg shadow-shadow-primary/20' : 'border-border-default bg-transparent hover:bg-transparent'}`}
      >
        <Mars className="h-8 w-8 text-text-inverse" />
        <span className="text-xs font-semibold text-text-inverse">
          {t('custom-input.default.male')}
        </span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-pressed={gender === 'female'}
        onClick={() => onSelectGender('female')}
        className={`flex size-24 flex-col items-center justify-center rounded-full border-2 ${gender === 'female' ? 'border-border-primary bg-bg-primary/10 shadow-lg shadow-shadow-primary/20' : 'border-border-default bg-transparent hover:bg-transparent'}`}
      >
        <Venus className="h-8 w-8 text-text-inverse" />
        <span className="text-xs font-semibold text-text-inverse">
          {t('custom-input.default.female')}
        </span>
      </Button>
    </div>
  );
};
