type NumberPickerProps = {
  title: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

export default function NumberPicker({ title, min, max, value, onChange }: NumberPickerProps) {
  const selectedIndex = value - min;
  const visibleNumbers = Array.from(
    { length: Math.min(7, max - min + 1) },
    (_, index) => Math.min(max - 3, Math.max(min + 3, value)) - 3 + index
  ).filter((number) => number >= min && number <= max);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-medium text-bg-primary">{title}</h2>
      <div className="mt-10 flex items-center gap-6">
        {visibleNumbers.map((number) => {
          const distance = Math.abs(number - value);
          return (
            <button
              key={number}
              type="button"
              aria-pressed={number === value}
              onClick={() => onChange(number)}
              className={`min-w-8 transition-all duration-200 ${number === value ? 'scale-125 text-5xl font-bold text-bg-primary' : distance === 1 ? 'text-3xl font-bold text-white/70' : distance === 2 ? 'text-2xl font-bold text-white/45' : 'text-xl font-bold text-white/25'}`}
            >
              {number}
            </button>
          );
        })}
      </div>
      <div className="mt-5 h-0 w-0 border-b-10 border-r-8 border-l-8 border-l-transparent border-r-transparent border-b-bg-primary" />
      <input
        aria-label={title}
        className="sr-only"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="sr-only">{selectedIndex}</span>
    </div>
  );
}
