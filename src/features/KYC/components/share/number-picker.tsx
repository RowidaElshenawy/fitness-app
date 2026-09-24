import { useState } from 'react';
type NumberPickerProps = {
  title: string;
  min: number;
  max: number;
  value?: number;
  onChange?: (value: number) => void;
};
export default function NumberPicker({
  title,
  min,
  max,
  value = min,
  onChange,
}: NumberPickerProps) {
  const [selectedValue, setSelectedValue] = useState(value);
  const numbers = Array.from({ length: max - min + 1 }, (_, index) => min + index);
  const handleSelect = (number: number) => {
    setSelectedValue(number);
    onChange?.(number);
  };
  const selectedIndex = selectedValue - min;
  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <h2 className="text-xl font-medium text-bg-primary"> {title} </h2>
      {/* Numbers */}
      <div className="mt-10 flex items-center gap-6">
        {numbers.slice(Math.max(0, selectedIndex - 3), selectedIndex + 4).map((number) => {
          const distance = Math.abs(number - selectedValue);
          return (
            <button
              key={number}
              type="button"
              onClick={() => handleSelect(number)}
              className={` min-w-8 transition-all duration-200 ${number === selectedValue ? 'scale-125 text-5xl font-bold text-bg-primary' : distance === 1 ? 'text-3xl font-bold text-white/70' : distance === 2 ? 'text-2xl font-bold text-white/45' : 'text-xl font-bold text-white/25'} `}
            >
              {number}
            </button>
          );
        })}
      </div>
      {/* Indicator */}
      <div className=" mt-5 h-0 w-0 border-b-10 border-r-8 border-l-8 border-l-transparent border-r-transparent border-b-bg-primary " />{' '}
    </div>
  );
}
