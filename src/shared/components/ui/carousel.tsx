import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

import { cn } from '@/shared/lib/utils/tailwind-cn';

interface CarouselProps {
  className?: string;
  children: React.ReactNode;
}

interface CarouselItemProps {
  className?: string;
  children: React.ReactNode;
}

function Carousel({ className, children }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'prev' | 'next') => {
    if (!ref.current) return;
    const item = ref.current.querySelector('[data-carousel-item]') as HTMLElement | null;
    const itemWidth = (item?.offsetWidth ?? 300) + 24;
    ref.current.scrollBy({
      left: direction === 'next' ? itemWidth : -itemWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className={cn('relative px-6', className)}>
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scroll('prev')}
        className="absolute left-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg-primary text-text-inverse shadow-md transition-transform hover:scale-105"
      >
        <ChevronLeft className="size-5" />
      </button>

      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Next"
        onClick={() => scroll('next')}
        className="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg-primary text-text-inverse shadow-md transition-transform hover:scale-105"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

function CarouselItem({ className, children }: CarouselItemProps) {
  return (
    <div data-carousel-item className={cn('shrink-0 snap-start', className)}>
      {children}
    </div>
  );
}

export { Carousel, CarouselItem };
