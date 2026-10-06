import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardAction, CardImage, CardOverlay, CardTitle } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import type { TMuscle } from '@/features/main/types/muscle';

interface WorkoutsCarouselProps {
  items: TMuscle[];
  onExplore: (item: TMuscle) => void;
}

const getItemsPerView = () => {
  if (window.matchMedia('(min-width: 1024px)').matches) return 3;
  if (window.matchMedia('(min-width: 768px)').matches) return 2;
  return 1;
};

function useItemsPerView() {
  const [perView, setPerView] = useState(getItemsPerView);

  useEffect(() => {
    const onResize = () => setPerView(getItemsPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return perView;
}

export default function WorkoutsCarousel({ items, onExplore }: WorkoutsCarouselProps) {
  //translation
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  //state
  const perView = useItemsPerView();
  const [page, setPage] = useState(0);
  //derived
  const pages = Math.max(1, Math.ceil(items.length / perView));
  const currentPage = Math.min(page, pages - 1);
  const offset = currentPage * 100 * (isRtl ? 1 : -1);

  return (
    <div>
      <div className="-mx-4 overflow-hidden py-2">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${offset}%)` }}
        >
          {items.map((item) => (
            <div
              key={item._id}
              className="shrink-0 px-4"
              style={{ flexBasis: `${100 / perView}%` }}
            >
              <Card className="max-w-none">
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
      </div>

      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={t('main.workouts.go-to-page', { page: i + 1 })}
              aria-current={i === currentPage}
              onClick={() => setPage(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === currentPage ? 'w-6 bg-bg-primary' : 'w-2 bg-bg-inverse'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
