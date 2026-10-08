import { cn } from '@/shared/lib/utils/tailwind-cn';

type SelectableOptionProps = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
};

export default function SelectableOption({ label, isSelected, onSelect }: SelectableOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        'flex w-full items-center justify-between rounded-full border px-6 py-4 text-left text-sm font-semibold transition-all duration-200',
        isSelected
          ? 'border-border-primary bg-bg-primary/10 text-text-inverse shadow-lg shadow-shadow-primary/20'
          : 'border-border-default bg-transparent text-text-inverse hover:border-border-subtle'
      )}
    >
      {label}

      <span
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border-2',
          isSelected ? 'border-border-primary' : 'border-border-default'
        )}
      >
        {isSelected && <span className="size-2.5 rounded-full bg-bg-primary" />}
      </span>
    </button>
  );
}
