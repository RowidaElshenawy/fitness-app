import { useTranslation } from 'react-i18next';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

type KycOption = {
  value: string;
  labelKey: string;
};

type KycSelectFieldProps = {
  label: string;
  value: string;
  options: readonly KycOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

function KycSelectField({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: KycSelectFieldProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-white">{label}</span>

      <Select
        value={value}
        onValueChange={(value) => {
          if (value !== null) {
            onChange(value);
          }
        }}
        disabled={disabled}
      >
        <SelectTrigger className="w-48 text-white">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {t(option.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default KycSelectField;
