import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/tailwind-cn';

interface SidebarListItemProps {
  title: string;
  subtitle?: string | null;
  image?: string;
  active: boolean;
  onSelect: () => void;
  action?: ReactNode;
}

export default function SidebarListItem({
  title,
  subtitle,
  image,
  onSelect,
}: SidebarListItemProps) {
  return (
    <li className="border-b border-border-subtle last:border-b-0">
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg px-2 py-4 transition-colors hover:bg-bg-primary-fade'
        )}
      >
        <button
          type="button"

          onClick={onSelect}
          className="flex min-w-0 flex-1 items-center gap-4 text-start"
        >
          {image && (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="size-24 shrink-0 rounded-3xl object-cover"
            />
          )}
          <div className="min-w-0">
            <h4 className="line-clamp-2 text-lg font-medium text-text-plain">{title}</h4>
            {subtitle && <p className="mt-1 text-sm text-text-soft">{subtitle}</p>}
          </div>
        </button>
      </div>
    </li>
  );
}
