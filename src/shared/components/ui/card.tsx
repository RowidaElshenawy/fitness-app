import { cn } from '@/shared/lib/utils/tailwind-cn';
import { ArrowUpRight } from 'lucide-react';
import * as React from 'react';

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card relative flex aspect-square w-full max-w-md flex-col overflow-hidden rounded-2xl bg-bg-plain text-sm text-text-plain ring-1 ring-border-subtle',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-heading text-xl leading-8 font-bold tracking-wide uppercase text-text-inverse group-data-[size=sm]/card:text-sm',
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-content" className={cn('px-(--card-spacing)', className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)',
        className
      )}
      {...props}
    />
  );
}

function CardImage({ className, ...props }: React.ComponentProps<'img'>) {
  return (
    <img
      data-slot="card-image"
      loading="lazy"
      className={cn('block h-full w-full object-cover', className)}
      {...props}
    />
  );
}

function CardOverlay({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-overlay"
      className={cn(
        'absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-bg-elevated px-4 py-4 backdrop-blur-3xl',
        className
      )}
      {...props}
    />
  );
}
type CardActionProps = {
  className?: string;
  children?: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<'a'>, 'href'>)
  | ({ href?: undefined } & React.ComponentProps<'button'>)
);

function CardAction({ className, href, children, ...props }: CardActionProps) {
  const content = (
    <>
      {children}
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-bg-primary text-text-plain transition-transform group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5">
        <ArrowUpRight className="size-3.5" />
      </span>
    </>
  );

  return href ? (
    <a
      data-slot="card-action"
      href={href}
      className={cn(
        'group/action flex shrink-0 items-center  font-heading text-xl leading-none font-medium capitalize text-text-primary',
        className
      )}
      {...(props as React.ComponentProps<'a'>)}
    >
      {content}
    </a>
  ) : (
    <button
      type="button"
      data-slot="card-action"
      className={cn(
        'group/action flex shrink-0 items-center gap-4 font-heading text-xl leading-none font-medium capitalize text-text-primary',
        className
      )}
      {...(props as React.ComponentProps<'button'>)}
    >
      {content}
    </button>
  );
}
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardImage,
  CardOverlay,
};
