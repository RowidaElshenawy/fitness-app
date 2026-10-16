import { cn } from '@/shared/lib/utils/tailwind-cn';

interface SidebarListItemProps {
  title: string;
  subtitle?: string | null;
  image?: string;
  active: boolean;
  onSelect: () => void;
  action?: boolean;
  imageError?: boolean;
  onImageError?: () => void;
}

export default function SidebarListItem({
  title,
  subtitle,
  image,
  active,
  onSelect,
  action,
  imageError,
  onImageError,
}: SidebarListItemProps) {
  return (
    <li className="border-b border-border-subtle last:border-b-0">
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg px-2 py-4 transition-colors hover:bg-bg-primary-fade',
          active && 'bg-bg-primary-fade'
        )}
      >
        <button
          type="button"
          onClick={onSelect}
          className="flex min-w-0 flex-1 items-center gap-4 text-start"
        >
          {imageError ? (
            <div aria-hidden className="size-24 shrink-0 animate-pulse rounded-3xl bg-bg-soft" />
          ) : (
            image && (
              <img
                src={image}
                alt={title}
                loading="lazy"
                onError={onImageError}
                className="size-24 shrink-0 rounded-3xl object-cover"
              />
            )
          )}

          <div className="min-w-0">
            <h4 className="line-clamp-2 text-lg font-medium text-text-plain">{title}</h4>

            {subtitle && <p className="mt-1 text-sm text-text-soft">{subtitle}</p>}
          </div>
        </button>

        {action && (
          <div className="ms-auto flex shrink-0 items-center justify-center text-primary">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM8 20L20.5 12.5L8 5V20Z"
                fill="#FF4100"
              />
            </svg>
          </div>
        )}
      </div>
    </li>
  );
}
