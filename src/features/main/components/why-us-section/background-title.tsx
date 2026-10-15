// components/BackgroundTitle.tsx
import { useId } from 'react';

type BackgroundTitleProps = {
  text: string;
  className?: string;
};

export default function BackgroundTitle({ text, className = '' }: BackgroundTitleProps) {
  const gradientId = useId();

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 224 77"
      className={`pointer-events-none select-none w-56 h-[77px] overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--border-plain)" />
          <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <text
        x="0"
        y="58"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        className="font-sans font-bold uppercase"
        style={{ fontSize: 64, letterSpacing: 0 }}
      >
        {text}
      </text>
    </svg>
  );
}
