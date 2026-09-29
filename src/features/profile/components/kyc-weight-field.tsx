import CustomInput from '@/shared/components/custom-ui/custom-input';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type KycWeightFieldProps = {
  value: number;
  onSave: (weight: number) => void;
  disabled?: boolean;
};

function KycWeightField({ value, onSave, disabled = false }: KycWeightFieldProps) {
  const { t } = useTranslation();
  const [weight, setWeight] = useState(String(value));

  const handleBlur = () => {
    const parsedWeight = Number(weight);

    if (!weight || Number.isNaN(parsedWeight) || parsedWeight === value) {
      setWeight(String(value));
      return;
    }

    onSave(parsedWeight);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-white">{t('profile.weight')}</span>

      <CustomInput
        variant="default"
        value={weight}
        onChange={(event) => setWeight(event.target.value)}
        onBlur={handleBlur}
        disabled={disabled}
        className="w-48"
      />
    </div>
  );
}

export default KycWeightField;
