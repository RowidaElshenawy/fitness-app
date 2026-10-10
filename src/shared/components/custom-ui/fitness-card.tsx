import { Card, CardAction, CardImage, CardOverlay, CardTitle } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils/tailwind-cn';

interface FitnessCardProps {
  title: string;
  image?: string | null;
  actionLabel?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function FitnessCard({
  title,
  image,
  actionLabel = 'Explore',
  onClick,
  href,
  className,
}: FitnessCardProps) {
  return (
    <Card
      className={cn('aspect-square max-w-none cursor-pointer h-96', className)}
      onClick={onClick}
    >
      {image ? <CardImage src={image} alt={title} /> : <div className="h-full w-full bg-bg-soft" />}
      <CardOverlay className="flex-col items-start justify-normal gap-2">
        <CardTitle className="line-clamp-1 text-lg tracking-widest">{title}</CardTitle>
        <CardAction href={href} className="gap-3">
          {actionLabel}
        </CardAction>
      </CardOverlay>
    </Card>
  );
}
