import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

type KycWeightFieldProps = {
  value: number;
  onSave: (weight: number) => void;
  disabled?: boolean;
};

const KycWeightField = ({ value, onSave, disabled = false }: KycWeightFieldProps) => {
  // Translation
  const { t } = useTranslation();

  // State
  const [weight, setWeight] = useState<string | null>(null);

  // Variables
  const currentWeight = weight ?? String(value);

  // Functions
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedWeight = Number(currentWeight);

    if (!currentWeight || Number.isNaN(parsedWeight) || parsedWeight === value) {
      setWeight(null);
      return;
    }

    onSave(parsedWeight);
    setWeight(null);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-36" aria-label={t('profile.weight')}>
      <div className="relative w-full">
        <Input
          id="profile-weight"
          type="number"
          min={1}
          value={currentWeight}
          onChange={(event) => setWeight(event.target.value)}
          disabled={disabled}
          aria-label={t('profile.weight')}
          className="h-8 w-full border-background bg-transparent pr-20 text-background [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none placeholder:text-background/60 focus-visible:border-background focus-visible:ring-1 focus-visible:ring-background"
        />

        <Button
          type="submit"
          disabled={disabled || !currentWeight || Number(currentWeight) === value}
          className="absolute top-1/2 right-1 h-8 -translate-y-1/2 cursor-pointer bg-bg-primary px-3 text-background hover:bg-bg-primary/80"
        >
          {disabled ? <Loader2 className="size-4 animate-spin" /> : t('profile.save')}
        </Button>
      </div>
    </form>
  );
};

export default KycWeightField;
