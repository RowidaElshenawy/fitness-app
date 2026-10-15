import { Card, CardAction, CardImage, CardOverlay, CardTitle } from '@/shared/components/ui/card';

import CardsSkeleton from '../../skeleton/cards-skeleton';

export type CardGridItem = {
  id: string;
  title: string;
  image: string;
  href: string;
};

type CardGridProps = {
  items: CardGridItem[];
  isLoading?: boolean;
  actionLabel: string;
  onItemClick: (item: CardGridItem) => void;
};

export default function CardGrid({ items, isLoading, actionLabel, onItemClick }: CardGridProps) {
  if (isLoading) return <CardsSkeleton />;

  return (
    <div className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="basis-full shrink-0 snap-start px-3 md:basis-1/2 lg:basis-1/3"
        >
          <Card className="relative aspect-square w-full max-w-none overflow-hidden rounded-2xl border-0 shadow-md">
            {/* Photo fills the whole card */}
            <CardImage
              src={item.image}
              alt={item.title}
              className="absolute inset-0 size-full object-cover p-0"
            />

            {/* Frosted-glass strip at the bottom */}
            <CardOverlay className="absolute inset-x-0 bottom-0 flex-col items-start justify-normal gap-1 bg-white/55 px-4 py-3 backdrop-blur-md">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-neutral-900">
                {item.title}
              </CardTitle>

              <CardAction
                className="gap-2 text-sm font-medium text-orange-600"
                onClick={() => onItemClick(item)}
              >
                {actionLabel}
              </CardAction>
            </CardOverlay>
          </Card>
        </div>
      ))}
    </div>
  );
}
