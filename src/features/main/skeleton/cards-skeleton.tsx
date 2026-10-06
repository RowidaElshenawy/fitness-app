import { cn } from '@/shared/lib/utils/tailwind-cn';

export default function CardsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className={cn(
            'aspect-square w-full animate-pulse rounded-2xl bg-bg-soft',
            i === 1 && 'hidden md:block',
            i === 2 && 'hidden lg:block'
          )}
        />
      ))}
    </div>
  );
}
