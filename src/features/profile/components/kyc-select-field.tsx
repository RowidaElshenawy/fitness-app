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

const KycSelectField = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: KycSelectFieldProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center justify-between gap-4">
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
        <SelectTrigger className="h-10 w-full max-w-48 cursor-pointer border border-white bg-transparent text-white">
          <SelectValue />
        </SelectTrigger>

        <SelectContent
          side="bottom"
          align="start"
          sideOffset={4}
          className="border border-white bg-bg-plain"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer text-text-plain hover:bg-bg-subtle hover:text-text-plain"
            >
              {t(option.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default KycSelectField;
