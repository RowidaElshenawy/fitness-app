interface SectionBgWordProps {
  children: React.ReactNode;
}

export default function SectionBgWord({ children }: SectionBgWordProps) {
  return (
    <span
      aria-hidden
      className="absolute top-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-5xl leading-none font-black tracking-wide text-transparent uppercase md:text-6xl [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]"
    >
      {children}
    </span>
  );
}
