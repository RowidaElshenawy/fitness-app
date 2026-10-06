import { useState, type UIEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardAction, CardImage, CardOverlay, CardTitle } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import type { TMuscle } from '@/features/main/types/muscle';
import { Button } from '@/shared/components/ui/button';
interface WorkoutsCarouselProps {
  items: TMuscle[];
  onExplore: (item: TMuscle) => void;
}

const ACTIVE_DOT = {
  1: 'max-md:w-9 max-md:bg-bg-primary',
  2: 'md:max-lg:w-9 md:max-lg:bg-bg-primary',
  3: 'lg:w-9 lg:bg-bg-primary',
} as const;

export default function WorkoutsCarousel({ items, onExplore }: WorkoutsCarouselProps) {
  //translation
  const { t } = useTranslation();
  //state
  const [first, setFirst] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  //derived
  const count = items.length;

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const itemWidth = (el.firstElementChild as HTMLElement | null)?.offsetWidth || 1;
    const scrolled = Math.abs(el.scrollLeft);
    setFirst(Math.round(scrolled / itemWidth));
    setAtEnd(scrolled + el.clientWidth >= el.scrollWidth - 1);
  };

  // first card of the page
  const pageStart = (perView: 1 | 2 | 3) =>
    atEnd ? Math.floor((count - 1) / perView) * perView : Math.floor(first / perView) * perView;

  const goTo = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const track = e.currentTarget.closest('[data-carousel]')?.querySelector('[data-track]');
    track?.children[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  };

  return (
    <div data-carousel>
      <div
        data-track
        onScroll={handleScroll}
        className="-mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item._id}
            className="basis-full shrink-0 snap-start px-4 md:basis-1/2 lg:basis-1/3"
          >
            <Card className="aspect-square w-full max-w-none">
              <CardImage src={item.image} alt={item.name} />
              <CardOverlay className="flex-col items-start justify-normal gap-2">
                <CardTitle className="text-lg tracking-widest">{item.name}</CardTitle>
                <CardAction className="gap-3" onClick={() => onExplore(item)}>
                  {t('main.workouts.explore')}
                </CardAction>
              </CardOverlay>
            </Card>
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <Button
              key={item._id}
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={t('main.workouts.go-to-page', { page: i + 1 })}
              onClick={(e) => goTo(e, i)}
              className={cn(
                'h-4 w-4 min-w-3 rounded-full bg-bg-inverse p-0 hover:bg-bg-inverse',
                i % 2 !== 0 && 'md:max-lg:hidden',
                i % 3 !== 0 && 'lg:hidden',
                pageStart(1) === i && ACTIVE_DOT[1],
                pageStart(2) === i && ACTIVE_DOT[2],
                pageStart(3) === i && ACTIVE_DOT[3]
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
